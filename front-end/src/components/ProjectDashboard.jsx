import { useEffect, useState } from 'react';
import { verifySession } from '../lib/authApi';
import { listAdminProjects, getProjectSliderSettings } from '../lib/projectsApi';
import { listContacts } from '../lib/contactApi';
import DashboardLogin from './DashboardLogin';
import DashboardSidebar from './DashboardSidebar';
import DashboardOverview from './DashboardOverview';
import ProjectsManager from './ProjectsManager';
import ContactMessages from './ContactMessages';
import DashboardSettings from './DashboardSettings';

const ProjectDashboard = () => {
  const [authed, setAuthed] = useState(null); // null = checking, true/false
  const [activeTab, setActiveTab] = useState('overview');
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [sliderSettings, setSliderSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifySession().then((valid) => setAuthed(valid));
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [projRes, contactRes, settingsRes] = await Promise.allSettled([
      listAdminProjects(),
      listContacts(),
      getProjectSliderSettings(),
    ]);
    if (projRes.status === 'fulfilled') setProjects(projRes.value);
    if (contactRes.status === 'fulfilled') setContacts(contactRes.value);
    if (settingsRes.status === 'fulfilled') setSliderSettings(settingsRes.value);
    setLoading(false);
  };

  useEffect(() => {
    if (authed) void loadData();
  }, [authed]);

  if (authed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-vtc-bg">
        <div className="text-sm text-vtc-muted">Checking session...</div>
      </div>
    );
  }

  if (!authed) {
    return <DashboardLogin onLogin={() => setAuthed(true)} />;
  }

  const renderContent = () => {
    if (loading) {
      return <div className="text-sm text-vtc-muted">Loading dashboard data...</div>;
    }
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview projects={projects} contacts={contacts} onNavigate={setActiveTab} />;
      case 'projects':
        return <ProjectsManager projects={projects} onRefresh={loadData} />;
      case 'contacts':
        return <ContactMessages contacts={contacts} />;
      case 'settings':
        return <DashboardSettings sliderSettings={sliderSettings} onSliderUpdate={setSliderSettings} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-vtc-bg text-vtc-text">
      <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={() => setAuthed(false)} />
      <main className="flex-1 overflow-y-auto p-4 pt-16 lg:p-8 lg:pt-8">
        <div className="mx-auto max-w-6xl">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default ProjectDashboard;
