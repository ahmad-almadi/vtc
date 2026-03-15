import { useEffect, useState } from 'react';
import LandingPage from './components/LandingPage';
import ProjectDashboard from './components/ProjectDashboard';
import SeoHead from './components/SeoHead';
import { resolveAppView } from './lib/appRoutes';
import './global.css';

function App() {
  const [view, setView] = useState(() => resolveAppView());

  useEffect(() => {
    const syncView = () => {
      setView(resolveAppView());
    };

    window.addEventListener('hashchange', syncView);
    window.addEventListener('popstate', syncView);

    return () => {
      window.removeEventListener('hashchange', syncView);
      window.removeEventListener('popstate', syncView);
    };
  }, []);

  const pageKey = view === 'dashboard' ? 'dashboard' : 'home';

  return (
    <>
      <SeoHead pageKey={pageKey} />
      {pageKey === 'dashboard' ? <ProjectDashboard /> : <LandingPage />}
    </>
  );
}

export default App;
