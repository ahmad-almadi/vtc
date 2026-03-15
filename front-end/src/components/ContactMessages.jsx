import { Mail, User, Calendar } from 'lucide-react';

const panelClass = 'rounded-[28px] border border-vtc-border bg-vtc-card/65 p-6 shadow-glow backdrop-blur-xl';

const ContactMessages = ({ contacts }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Messages</h1>
        <p className="mt-2 text-sm text-vtc-muted">{contacts.length} contact form submissions</p>
      </div>

      <div className={panelClass}>
        {contacts.length === 0 ? (
          <p className="rounded-xl border border-vtc-border bg-vtc-bg/60 p-4 text-sm text-vtc-muted">
            No messages yet.
          </p>
        ) : (
          <div className="space-y-4">
            {contacts.map((c) => (
              <div key={c.id} className="rounded-2xl border border-vtc-border bg-vtc-bg/60 p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-vtc-indigo/15 text-vtc-indigo">
                      <User size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-vtc-text">{c.name}</p>
                      <a href={`mailto:${c.email}`} className="flex items-center gap-1 text-xs text-vtc-indigo hover:underline">
                        <Mail size={12} /> {c.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-vtc-muted">
                    <Calendar size={12} />
                    {new Date(c.createdAt).toLocaleString()}
                  </div>
                </div>
                <p className="mt-4 whitespace-pre-wrap rounded-xl border border-vtc-border bg-vtc-bg/40 p-4 text-sm leading-relaxed text-vtc-muted">
                  {c.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactMessages;
