export const getProjectFallbackImage = (title = 'Project') => {
  const label = title || 'Project';

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10182c" />
          <stop offset="50%" stop-color="#18244a" />
          <stop offset="100%" stop-color="#5b5cf6" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" rx="48" fill="url(#bg)" />
      <circle cx="965" cy="160" r="150" fill="rgba(255,255,255,0.08)" />
      <circle cx="210" cy="620" r="220" fill="rgba(255,255,255,0.08)" />
      <text x="80" y="640" fill="#f5f7ff" font-family="Segoe UI, Arial, sans-serif" font-size="72" font-weight="700">
        ${label}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};
