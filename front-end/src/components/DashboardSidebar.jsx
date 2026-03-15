import { LayoutDashboard, FolderKanban, MessageSquare, Settings, LogOut, ArrowLeft, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { HOME_HASH_ROUTE } from '../lib/appRoutes';
import { logout } from '../lib/authApi';

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'contacts', label: 'Messages', icon: MessageSquare },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const DashboardSidebar = ({ activeTab, onTabChange, onLogout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    onLogout();
  };

  const handleNav = (id) => {
    onTabChange(id);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.35em] text-vtc-muted">Admin</p>
        <h2 className="mt-1 text-lg font-bold gradient-text">VTC Dashboard</h2>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => handleNav(id)}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
              activeTab === id
                ? 'bg-vtc-indigo/15 text-vtc-indigo'
                : 'text-vtc-muted hover:bg-vtc-bg/60 hover:text-vtc-text'
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </nav>

      <div className="space-y-1 border-t border-vtc-border p-3">
        <a
          href={HOME_HASH_ROUTE}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-vtc-muted transition hover:bg-vtc-bg/60 hover:text-vtc-text"
        >
          <ArrowLeft size={18} />
          Back to site
        </a>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed left-4 top-4 z-50 rounded-xl border border-vtc-border bg-vtc-card p-2 text-vtc-text lg:hidden"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-vtc-border bg-vtc-card/90 backdrop-blur-xl transition-transform lg:static lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default DashboardSidebar;
