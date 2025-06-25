'use client';
import React, { useState, useEffect } from 'react';

// Type definitions
interface UserData {
  user_id: string;
  user_name: string;
  email: string;
  user_shortname: string;
  user_type: string;
  broker: string;
  avatar_url: string;
}

export default function KiteLoginPage() {
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  // Check for existing session on page load
  useEffect(() => {
    const token = localStorage.getItem('kite_session');
    if (token) {
      setSessionToken(token);
      fetchUserProfile(token);
    }

    // Check if we're coming back from Kite with request_token
    const urlParams = new URLSearchParams(window.location.search);
    const requestToken = urlParams.get('request_token');
    const status = urlParams.get('status');
    
    if (requestToken && status === 'success') {
      handleKiteCallback(requestToken);
    } else if (status === 'error') {
      setError('Authentication was cancelled or failed');
    }
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    setStatus('Fetching login URL...');

    try {
      const response = await fetch('/api/kite-auth?action=login-url');
      const data = await response.json();

      if (data.success) {
        setStatus('Redirecting to Kite...');
        window.location.href = data.login_url;
      } else {
        setError(data.error || 'Failed to get login URL');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleKiteCallback = async (requestToken: string) => {
    setLoading(true);
    setError('');
    setStatus('Completing authentication...');

    try {
      const response = await fetch('/api/kite-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ request_token: requestToken }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('kite_session', data.session_token);
        setSessionToken(data.session_token);
        setUserData(data.user);
        setStatus('Login successful!');
        
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
      } else {
        setError(data.error || 'Authentication failed');
      }
    } catch (err) {
      setError('Failed to complete authentication');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async (token: string) => {
    setLoading(true);
    setError('');
    setStatus('Fetching user profile...');

    try {
      const response = await fetch('/api/kite-auth?action=profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setUserData(data.user);
        setStatus('Profile loaded successfully');
      } else {
        setError(data.error || 'Failed to fetch profile');
        if (data.error === 'Session expired') {
          handleLogout();
        }
      }
    } catch (err) {
      setError('Failed to fetch user profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setStatus('Logging out...');

    try {
      if (sessionToken) {
        await fetch('/api/kite-auth', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${sessionToken}`,
          },
        });
      }
    } catch (err) {
      // Ignore logout errors
    } finally {
      localStorage.removeItem('kite_session');
      setSessionToken(null);
      setUserData(null);
      setLoading(false);
      setStatus('Logged out successfully');
      setError('');
    }
  };

  const refreshProfile = () => {
    if (sessionToken) {
      fetchUserProfile(sessionToken);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-mono">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">KITE CONNECT</h1>
          <div className="w-16 h-0.5 bg-blue-600 mx-auto"></div>
          <p className="text-sm text-gray-600 mt-2">Trading API Authentication</p>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 mb-4 text-sm">
            ERROR: {error}
          </div>
        )}

        {status && !error && (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 mb-4 text-sm">
            STATUS: {status}
          </div>
        )}

        {/* Main Content */}
        <div className="border border-gray-300 bg-white">
          {!sessionToken ? (
            /* Login Section */
            <div className="p-8 text-center">
              <div className="mb-6">
                <div className="text-6xl mb-4">🔐</div>
                <h2 className="text-xl mb-2">Authentication Required</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Connect your Kite account to access trading data
                </p>
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 text-sm font-medium transition-colors duration-200 min-w-32"
              >
                {loading ? 'CONNECTING...' : 'LOGIN WITH KITE'}
              </button>

              <div className="mt-6 text-xs text-gray-500">
                <p>• You will be redirected to Kite for authentication</p>
                <p>• Your session will be valid for 24 hours</p>
                <p>• No passwords are stored locally</p>
              </div>
            </div>
          ) : (
            /* Dashboard Section */
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl mb-1">Dashboard</h2>
                  <div className="text-xs text-gray-600">
                    Session Active • {new Date().toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white px-4 py-2 text-xs transition-colors duration-200"
                >
                  LOGOUT
                </button>
              </div>

              {userData ? (
                <div className="space-y-4">
                  {/* User Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="border border-gray-200 p-4">
                      <div className="text-xs text-gray-500 mb-1">USER ID</div>
                      <div className="font-medium">{userData.user_id}</div>
                    </div>
                    <div className="border border-gray-200 p-4">
                      <div className="text-xs text-gray-500 mb-1">NAME</div>
                      <div className="font-medium">{userData.user_name}</div>
                    </div>
                    <div className="border border-gray-200 p-4">
                      <div className="text-xs text-gray-500 mb-1">EMAIL</div>
                      <div className="font-medium">{userData.email}</div>
                    </div>
                    <div className="border border-gray-200 p-4">
                      <div className="text-xs text-gray-500 mb-1">BROKER</div>
                      <div className="font-medium">{userData.broker}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4">
                    <button
                      onClick={refreshProfile}
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 text-xs transition-colors duration-200"
                    >
                      {loading ? 'LOADING...' : 'REFRESH PROFILE'}
                    </button>
                  </div>

                  {/* API Status */}
                  <div className="border-t border-gray-200 pt-4 mt-6">
                    <div className="text-xs text-gray-500 mb-2">API STATUS</div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Connected to Kite API</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <div className="text-2xl mb-2">⏳</div>
                  <p className="text-sm">Loading user data...</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-gray-400">
          <p>Powered by Kite Connect API • Secure Authentication</p>
        </div>
      </div>
    </div>
  );
}