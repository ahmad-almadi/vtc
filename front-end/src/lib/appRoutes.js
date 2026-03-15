export const DASHBOARD_ROUTE = '/dashboard';
export const DASHBOARD_HASH_ROUTE = '#/dashboard';
export const HOME_HASH_ROUTE = '#/';

export const resolveAppView = () => {
  if (typeof window === 'undefined') {
    return 'site';
  }

  const hashRoute = window.location.hash.replace(/^#/, '');

  if (hashRoute) {
    return hashRoute.startsWith(DASHBOARD_ROUTE) ? 'dashboard' : 'site';
  }

  return window.location.pathname.startsWith(DASHBOARD_ROUTE) ? 'dashboard' : 'site';
};
