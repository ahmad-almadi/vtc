import { useState } from 'react';
import { Lock, LogIn, Eye, EyeOff } from 'lucide-react';
import { login } from '../lib/authApi';

const DashboardLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    setError('');
    try {
      await login(password);
      onLogin();
    } catch (err) {
      setError(err.message || 'Invalid password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-vtc-bg px-4">
      <div className="w-full max-w-md rounded-[28px] border border-vtc-border bg-vtc-card/65 p-8 shadow-glow backdrop-blur-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-vtc-indigo to-vtc-violet">
            <Lock size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold gradient-text">Dashboard Access</h1>
          <p className="mt-2 text-sm text-vtc-muted">Enter your admin password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              className="w-full rounded-2xl border border-vtc-border bg-vtc-bg/80 px-4 py-3 pr-12 outline-none transition focus:border-vtc-indigo"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-vtc-muted hover:text-vtc-text"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password.trim()}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-vtc-indigo to-vtc-violet px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            <LogIn size={16} />
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardLogin;
