import { useState } from 'react';
import { Save, Lock, Eye, EyeOff, TimerReset } from 'lucide-react';
import { changePassword } from '../lib/authApi';
import { updateProjectSliderSettings } from '../lib/projectsApi';

const panelClass = 'rounded-[28px] border border-vtc-border bg-vtc-card/65 p-6 shadow-glow backdrop-blur-xl';

const DashboardSettings = ({ sliderSettings, onSliderUpdate }) => {
  const [sliderForm, setSliderForm] = useState({
    autoplaySeconds: String((sliderSettings?.autoplayDelayMs ?? 3000) / 1000),
    pauseOnHover: sliderSettings?.pauseOnHover ?? true,
  });
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
  const [sliderStatus, setSliderStatus] = useState('');
  const [pwStatus, setPwStatus] = useState('');
  const [savingSlider, setSavingSlider] = useState(false);
  const [savingPw, setSavingPw] = useState(false);

  const handleSliderSubmit = async (e) => {
    e.preventDefault();
    const seconds = parseFloat(sliderForm.autoplaySeconds);
    if (!Number.isFinite(seconds) || seconds < 1 || seconds > 20) {
      setSliderStatus('Autoplay must be between 1 and 20 seconds');
      return;
    }
    setSavingSlider(true);
    try {
      const updated = await updateProjectSliderSettings({
        autoplayDelayMs: Math.round(seconds * 1000),
        pauseOnHover: sliderForm.pauseOnHover,
      });
      setSliderForm({
        autoplaySeconds: String((updated?.autoplayDelayMs ?? 3000) / 1000),
        pauseOnHover: updated?.pauseOnHover ?? true,
      });
      setSliderStatus('Slider settings saved');
      if (onSliderUpdate) onSliderUpdate(updated);
    } catch (err) {
      setSliderStatus(err.message || 'Failed to save');
    } finally {
      setSavingSlider(false);
    }
  };

  const handlePwSubmit = async (e) => {
    e.preventDefault();
    if (pwForm.newPw !== pwForm.confirm) { setPwStatus('Passwords do not match'); return; }
    if (pwForm.newPw.length < 4) { setPwStatus('New password must be at least 4 characters'); return; }
    setSavingPw(true);
    try {
      await changePassword(pwForm.current, pwForm.newPw);
      setPwStatus('Password updated successfully');
      setPwForm({ current: '', newPw: '', confirm: '' });
    } catch (err) {
      setPwStatus(err.message || 'Failed to change password');
    } finally {
      setSavingPw(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Settings</h1>
        <p className="mt-2 text-sm text-vtc-muted">Slider configuration and admin password</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Slider Settings */}
        <section className={panelClass}>
          <h2 className="text-xl font-bold text-vtc-text">Slider Settings</h2>
          <p className="mt-1 text-sm text-vtc-muted">Autoplay timing and hover behavior</p>
          {sliderStatus && <p className="mt-3 rounded-xl border border-vtc-border bg-vtc-bg/60 px-4 py-2 text-sm text-vtc-text">{sliderStatus}</p>}
          <form className="mt-4 space-y-4" onSubmit={handleSliderSubmit}>
            <label className="block">
              <span className="mb-1 block text-sm text-vtc-muted">Autoplay seconds</span>
              <div className="relative">
                <TimerReset className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-vtc-muted" size={16} />
                <input type="number" min="1" max="20" step="0.5" value={sliderForm.autoplaySeconds} onChange={(e) => setSliderForm((f) => ({ ...f, autoplaySeconds: e.target.value }))} className="w-full rounded-2xl border border-vtc-border bg-vtc-bg/80 px-11 py-3 outline-none transition focus:border-vtc-indigo" />
              </div>
            </label>
            <div className="flex items-center justify-between rounded-2xl border border-vtc-border bg-vtc-bg/70 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-vtc-text">Pause on hover</p>
                <p className="text-xs text-vtc-muted">Desktop only</p>
              </div>
              <button type="button" onClick={() => setSliderForm((f) => ({ ...f, pauseOnHover: !f.pauseOnHover }))} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ${sliderForm.pauseOnHover ? 'bg-vtc-indigo text-white' : 'bg-vtc-border/80 text-vtc-muted'}`}>
                {sliderForm.pauseOnHover ? <Eye size={14} /> : <EyeOff size={14} />}
                {sliderForm.pauseOnHover ? 'Enabled' : 'Disabled'}
              </button>
            </div>
            <button type="submit" disabled={savingSlider} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-vtc-indigo to-vtc-violet px-5 py-3 text-sm font-semibold text-white disabled:opacity-60">
              <Save size={16} /> {savingSlider ? 'Saving...' : 'Save settings'}
            </button>
          </form>
        </section>

        {/* Password Change */}
        <section className={panelClass}>
          <div className="mb-1 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-vtc-violet/20">
              <Lock size={20} className="text-vtc-violet" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-vtc-text">Change Password</h2>
              <p className="text-sm text-vtc-muted">Update your admin password</p>
            </div>
          </div>
          {pwStatus && <p className="mt-3 rounded-xl border border-vtc-border bg-vtc-bg/60 px-4 py-2 text-sm text-vtc-text">{pwStatus}</p>}
          <form className="mt-4 space-y-4" onSubmit={handlePwSubmit}>
            <input type="password" value={pwForm.current} onChange={(e) => setPwForm((f) => ({ ...f, current: e.target.value }))} className="w-full rounded-2xl border border-vtc-border bg-vtc-bg/80 px-4 py-3 outline-none transition focus:border-vtc-indigo" placeholder="Current password" required />
            <input type="password" value={pwForm.newPw} onChange={(e) => setPwForm((f) => ({ ...f, newPw: e.target.value }))} className="w-full rounded-2xl border border-vtc-border bg-vtc-bg/80 px-4 py-3 outline-none transition focus:border-vtc-indigo" placeholder="New password" required />
            <input type="password" value={pwForm.confirm} onChange={(e) => setPwForm((f) => ({ ...f, confirm: e.target.value }))} className="w-full rounded-2xl border border-vtc-border bg-vtc-bg/80 px-4 py-3 outline-none transition focus:border-vtc-indigo" placeholder="Confirm new password" required />
            <button type="submit" disabled={savingPw} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-vtc-indigo to-vtc-violet px-5 py-3 text-sm font-semibold text-white disabled:opacity-60">
              <Save size={16} /> {savingPw ? 'Saving...' : 'Update password'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default DashboardSettings;
