import { FolderKanban, Eye, EyeOff, MessageSquare, ExternalLink } from 'lucide-react';
import { getProjectFallbackImage } from '../lib/projectImage';

const panelClass = 'rounded-[28px] border border-vtc-border bg-vtc-card/65 p-6 shadow-glow backdrop-blur-xl';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className={panelClass}>
    <div className="flex items-center gap-3">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-vtc-text">{value}</p>
        <p className="text-xs uppercase tracking-[0.25em] text-vtc-muted">{label}</p>
      </div>
    </div>
  </div>
);

const DashboardOverview = ({ projects, contacts, onNavigate }) => {
  const published = projects.filter((p) => p.isPublished);
  const drafts = projects.filter((p) => !p.isPublished);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
        <p className="mt-2 text-sm text-vtc-muted">Overview of your portfolio site</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={FolderKanban} label="Total Projects" value={projects.length} color="bg-vtc-indigo" />
        <StatCard icon={Eye} label="Published" value={published.length} color="bg-green-600" />
        <StatCard icon={EyeOff} label="Drafts" value={drafts.length} color="bg-yellow-600" />
        <StatCard icon={MessageSquare} label="Messages" value={contacts.length} color="bg-vtc-violet" />
      </div>

      {/* Featured / Published Projects */}
      <div className={panelClass}>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-vtc-text">Featured Projects</h2>
            <p className="mt-1 text-sm text-vtc-muted">Currently live on your portfolio</p>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="rounded-full border border-vtc-border px-4 py-2 text-xs font-semibold text-vtc-muted transition hover:border-vtc-indigo hover:text-vtc-indigo"
          >
            Manage all
          </button>
        </div>

        {published.length === 0 && (
          <p className="rounded-xl border border-vtc-border bg-vtc-bg/60 p-4 text-sm text-vtc-muted">
            No published projects yet.
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {published.map((project) => (
            <div
              key={project.id}
              className="overflow-hidden rounded-2xl border border-vtc-border bg-vtc-bg/60 transition hover:border-vtc-indigo/40"
            >
              <img
                src={project.thumbnailUrl || getProjectFallbackImage(project.title)}
                alt={project.title}
                className="h-36 w-full object-cover"
                onError={(e) => { e.currentTarget.src = getProjectFallbackImage(project.title); }}
              />
              <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-vtc-text">{project.title}</h3>
                  <span className="text-xs text-vtc-muted">#{project.displayOrder}</span>
                </div>
                <p className="mb-3 line-clamp-2 text-xs text-vtc-muted">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-vtc-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-vtc-muted"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-[10px] text-vtc-muted">+{project.techStack.length - 3}</span>
                  )}
                </div>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs text-vtc-indigo hover:underline"
                  >
                    <ExternalLink size={12} /> Live
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Messages */}
      <div className={panelClass}>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-vtc-text">Recent Messages</h2>
            <p className="mt-1 text-sm text-vtc-muted">Latest contact form submissions</p>
          </div>
          <button
            onClick={() => onNavigate('contacts')}
            className="rounded-full border border-vtc-border px-4 py-2 text-xs font-semibold text-vtc-muted transition hover:border-vtc-indigo hover:text-vtc-indigo"
          >
            View all
          </button>
        </div>

        {contacts.length === 0 ? (
          <p className="rounded-xl border border-vtc-border bg-vtc-bg/60 p-4 text-sm text-vtc-muted">
            No messages yet.
          </p>
        ) : (
          <div className="space-y-3">
            {contacts.slice(0, 5).map((c) => (
              <div key={c.id} className="rounded-xl border border-vtc-border bg-vtc-bg/60 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-vtc-text">{c.name}</p>
                  <p className="text-xs text-vtc-muted">{new Date(c.createdAt).toLocaleDateString()}</p>
                </div>
                <p className="text-xs text-vtc-indigo">{c.email}</p>
                <p className="mt-2 line-clamp-2 text-sm text-vtc-muted">{c.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;
