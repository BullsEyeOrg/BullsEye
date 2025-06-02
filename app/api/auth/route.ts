// pages/api/kite-login.ts or app/api/kite-login/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface KiteLoginRequest {
  user_id: string;
  password: string;
  twofa?: string;
}

interface KiteLoginResponse {
  success: boolean;
  user_uuid?: string;
  access_token?: string;
  message?: string;
}

// Generate checksum for Kite API
function generateChecksum(data: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<KiteLoginResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { user_id, password, twofa }: KiteLoginRequest = req.body;

    if (!user_id || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'User ID and password are required' 
      });
    }

    // Check if user already exists in our database
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('user_uuid, kite_user_id')
      .eq('kite_user_id', user_id)
      .single();

    let userUuid: string;

    if (existingUser && !fetchError) {
      // User exists, use existing UUID
      userUuid = existingUser.user_uuid;
    } else {
      // New user, generate UUID
      userUuid = uuidv4();
    }

    // Kite Connect login API call
    const kiteApiKey = process.env.KITE_API_KEY!;
    const kiteApiSecret = process.env.KITE_API_SECRET!;

    // Step 1: Login to get request_token (this is simplified - in reality you'd need to handle the OAuth flow)
    const loginData = {
      user_id: user_id,
      password: password,
      twofa: twofa || ''
    };

    // Note: This is a simplified version. In production, you'd need to:
    // 1. Redirect user to Kite login page
    // 2. Handle the callback with request_token
    // 3. Exchange request_token for access_token

    const loginResponse = await fetch('https://kite.zerodha.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Kite-Version': '3'
      },
      body: new URLSearchParams(loginData)
    });

    if (!loginResponse.ok) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid Kite credentials' 
      });
    }

    const loginResult = await loginResponse.json();
    
    // Assuming we get a request_token, exchange it for access_token
    const requestToken = loginResult.data?.request_token;
    
    if (!requestToken) {
      return res.status(401).json({ 
        success: false, 
        message: 'Failed to get request token from Kite' 
      });
    }

    // Generate access token
    const checksumData = `${kiteApiKey}${requestToken}${kiteApiSecret}`;
    const checksum = generateChecksum(checksumData, kiteApiSecret);

    const sessionResponse = await fetch('https://api.kite.trade/session/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        api_key: kiteApiKey,
        request_token: requestToken,
        checksum: checksum
      })
    });

    const sessionResult = await sessionResponse.json();
    
    if (!sessionResult.data?.access_token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Failed to generate access token' 
      });
    }

    const accessToken = sessionResult.data.access_token;

    // Save or update user in Supabase
    const userData = {
      user_uuid: userUuid,
      kite_user_id: user_id,
      kite_access_token: accessToken,
      last_login: new Date().toISOString(),
      created_at: existingUser ? existingUser.created_at : new Date().toISOString()
    };

    const { error: upsertError } = await supabase
      .from('users')
      .upsert(userData, { 
        onConflict: 'kite_user_id',
        ignoreDuplicates: false 
      });

    if (upsertError) {
      console.error('Database error:', upsertError);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to save user data' 
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      user_uuid: userUuid,
      access_token: accessToken,
      message: existingUser ? 'User logged in successfully' : 'New user created and logged in'
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}
