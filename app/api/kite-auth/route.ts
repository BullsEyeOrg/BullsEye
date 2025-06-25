// app/api/kite-auth/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Types for Kite Connect API
interface KiteLoginResponse {
  access_token: string;
  refresh_token?: string;
  user_id: string;
  user_name: string;
  user_shortname: string;
  email: string;
  user_type: string;
  broker: string;
  exchanges: string[];
  products: string[];
  order_types: string[];
  avatar_url: string;
}

interface KiteTokenRequest {
  api_key: string;
  request_token: string;
  api_secret: string;
}

interface SessionData {
  access_token: string;
  user_id: string;
  user_name: string;
  email: string;
  expires_at: number;
  created_at: number;
}

// In-memory session store (use Redis/Database in production)
const sessionStore = new Map<string, SessionData>();

// Environment variables needed:
// KITE_API_KEY=your_kite_api_key
// KITE_API_SECRET=your_kite_api_secret
// SESSION_SECRET=your_session_secret (for signing session tokens)

const KITE_API_KEY = process.env.KITE_API_KEY;
const KITE_API_SECRET = process.env.KITE_API_SECRET;
const SESSION_SECRET = process.env.SESSION_SECRET || 'your-session-secret';

// Generate session token
function generateSessionToken(userId: string): string {
  const payload = `${userId}:${Date.now()}`;
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payload)
    .digest('hex');
  return `${Buffer.from(payload).toString('base64')}.${signature}`;
}

// Verify session token
function verifySessionToken(token: string): { userId: string; timestamp: number } | null {
  try {
    const [payloadBase64, signature] = token.split('.');
    const payload = Buffer.from(payloadBase64, 'base64').toString();
    
    const expectedSignature = crypto
      .createHmac('sha256', SESSION_SECRET)
      .update(payload)
      .digest('hex');
    
    if (signature !== expectedSignature) {
      return null;
    }
    
    const [userId, timestamp] = payload.split(':');
    return { userId, timestamp: parseInt(timestamp) };
  } catch {
    return null;
  }
}

// Generate checksum for Kite API
function generateChecksum(apiKey: string, requestToken: string, apiSecret: string): string {
  const data = apiKey + requestToken + apiSecret;
  return crypto.createHash('sha256').update(data).digest('hex');
}

// Login endpoint - Step 1: Get login URL
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    
    if (action === 'login-url') {
      if (!KITE_API_KEY) {
        return NextResponse.json(
          { error: 'Kite API key not configured' },
          { status: 500 }
        );
      }
      
      const loginUrl = `https://kite.trade/connect/login?api_key=${KITE_API_KEY}&v=3`;
      
      return NextResponse.json({
        success: true,
        login_url: loginUrl,
        message: 'Redirect user to this URL for authentication'
      });
    }
    
    // Get user data using session token
    if (action === 'profile') {
      const authHeader = request.headers.get('authorization');
      const sessionToken = authHeader?.replace('Bearer ', '');
      
      if (!sessionToken) {
        return NextResponse.json(
          { error: 'Session token required' },
          { status: 401 }
        );
      }
      
      const tokenData = verifySessionToken(sessionToken);
      if (!tokenData) {
        return NextResponse.json(
          { error: 'Invalid session token' },
          { status: 401 }
        );
      }
      
      const sessionData = sessionStore.get(tokenData.userId);
      if (!sessionData) {
        return NextResponse.json(
          { error: 'Session expired' },
          { status: 401 }
        );
      }
      
      // Check if session is expired (24 hours)
      if (Date.now() > sessionData.expires_at) {
        sessionStore.delete(tokenData.userId);
        return NextResponse.json(
          { error: 'Session expired' },
          { status: 401 }
        );
      }
      
      // Fetch fresh user data from Kite
      try {
        const profileResponse = await fetch('https://api.kite.trade/user/profile', {
          headers: {
            'Authorization': `token ${KITE_API_KEY}:${sessionData.access_token}`,
            'X-Kite-Version': '3'
          }
        });
        
        if (!profileResponse.ok) {
          throw new Error('Failed to fetch profile');
        }
        
        const profileData = await profileResponse.json();
        
        return NextResponse.json({
          success: true,
          user: profileData.data,
          session_info: {
            user_id: sessionData.user_id,
            expires_at: sessionData.expires_at
          }
        });
      } catch (error) {
        return NextResponse.json(
          { error: 'Failed to fetch user profile' },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Invalid action parameter' },
      { status: 400 }
    );
    
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Login endpoint - Step 2: Exchange request token for access token
export async function POST(request: NextRequest) {
  try {
    const body: KiteTokenRequest = await request.json();
    const { request_token } = body;
    
    if (!request_token) {
      return NextResponse.json(
        { error: 'Request token is required' },
        { status: 400 }
      );
    }
    
    if (!KITE_API_KEY || !KITE_API_SECRET) {
      return NextResponse.json(
        { error: 'Kite API credentials not configured' },
        { status: 500 }
      );
    }
    
    // Generate checksum
    const checksum = generateChecksum(KITE_API_KEY, request_token, KITE_API_SECRET);
    
    // Exchange request token for access token
    const tokenResponse = await fetch('https://api.kite.trade/session/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Kite-Version': '3'
      },
      body: new URLSearchParams({
        api_key: KITE_API_KEY,
        request_token: request_token,
        checksum: checksum
      })
    });
    
    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      return NextResponse.json(
        { error: errorData.message || 'Authentication failed' },
        { status: 400 }
      );
    }
    
    const tokenData: { data: KiteLoginResponse } = await tokenResponse.json();
    const kiteUser = tokenData.data;
    
    // Create session
    const sessionToken = generateSessionToken(kiteUser.user_id);
    const expiresAt = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
    
    const sessionData: SessionData = {
      access_token: kiteUser.access_token,
      user_id: kiteUser.user_id,
      user_name: kiteUser.user_name,
      email: kiteUser.email,
      expires_at: expiresAt,
      created_at: Date.now()
    };
    
    // Store session (use Redis/Database in production)
    sessionStore.set(kiteUser.user_id, sessionData);
    
    return NextResponse.json({
      success: true,
      session_token: sessionToken,
      user: {
        user_id: kiteUser.user_id,
        user_name: kiteUser.user_name,
        email: kiteUser.email,
        user_shortname: kiteUser.user_shortname,
        user_type: kiteUser.user_type,
        broker: kiteUser.broker,
        avatar_url: kiteUser.avatar_url
      },
      expires_at: expiresAt,
      message: 'Login successful'
    });
    
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Logout endpoint
export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const sessionToken = authHeader?.replace('Bearer ', '');
    
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Session token required' },
        { status: 401 }
      );
    }
    
    const tokenData = verifySessionToken(sessionToken);
    if (tokenData) {
      sessionStore.delete(tokenData.userId);
    }
    
    return NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });
    
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}