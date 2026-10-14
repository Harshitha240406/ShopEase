import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  KeyRound,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

const Login = () => {
  const { login, isLoading, error, clearError, isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('johnd');
  const [password, setPassword] = useState('m38rmF$');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');

  const from = location.state?.from?.pathname || '/shop';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    clearError();

    if (!username.trim() || !password.trim()) {
      setFormError('Please enter both username and password.');
      return;
    }

    try {
      await login(username.trim(), password.trim());
      navigate(from, { replace: true });
    } catch {
      // Error handled in context state
    }
  };

  const fillDemoCredentials = () => {
    setUsername('johnd');
    setPassword('m38rmF$');
    clearError();
    setFormError('');
  };

  // If already logged in, show authenticated account card
  if (isAuthenticated && user) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-slate-50">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            Logged in as {user.name || user.username}
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Demo session active with token: <span className="font-mono text-slate-700">{user.token.slice(0, 16)}...</span>
          </p>

          <div className="space-y-3">
            <Link
              to="/shop"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-colors shadow-sm"
            >
              <span>Go to Shop Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={logout}
              className="w-full py-2.5 px-4 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors border border-transparent"
            >
              Sign out from demo session
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white mx-auto mb-4 shadow-md shadow-indigo-200">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Sign In to ShopEase
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Frontend demonstration powered by Fake Store API demo authentication
          </p>
        </div>

        {/* Demo Credentials Quick Fill Banner */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 text-xs text-indigo-900 space-y-2">
          <div className="flex items-center justify-between font-semibold">
            <span className="flex items-center gap-1.5 text-indigo-700">
              <ShieldCheck className="w-4 h-4" />
              Demo Credentials Available
            </span>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="text-[11px] font-bold text-indigo-700 hover:text-indigo-900 underline transition-colors"
            >
              Auto-fill demo user
            </button>
          </div>
          <div className="text-[11px] text-indigo-700 font-mono bg-white/70 p-2 rounded-lg border border-indigo-100 flex justify-between">
            <span>Username: <strong>johnd</strong></span>
            <span>Password: <strong>m38rmF$</strong></span>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          {/* Error Message */}
          {(formError || error) && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{formError || error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter demo username (e.g. johnd)"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-slate-900"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-indigo-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <span>Verifying credentials...</span>
              ) : (
                <>
                  <span>Sign In (Demo)</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <Link
              to="/shop"
              className="text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors"
            >
              Continue browsing as guest →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
