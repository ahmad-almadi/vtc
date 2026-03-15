import { useState } from 'react';
import { Eye, EyeOff, Pencil, Plus, Save, Trash2, Upload, CloudUpload } from 'lucide-react';
import { getProjectFallbackImage } from '../lib/projectImage';
import { createProject, deleteProject, updateProject } from '../lib/projectsApi';
import { uploadImage } from '../lib/uploadApi';

const panelClass = 'rounded-[28px] border border-vtc-border bg-vtc-card/65 p-6 shadow-glow backdrop-blur-xl';

const emptyForm = {
  title: '', description: '', thumbnailUrl: '', liveUrl: '',
  githubUrl: '', techStack: '', displayOrder: '0', isPublished: true,
};

const ProjectsManager = ({ projects, onRefresh }) => {
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (field, value) => setForm((f) => ({ ...f, [field]: value }));
  const resetForm = () => { setForm(emptyForm); setEditingId(null); };

  const handleEdit = (p) => {
    setEditingId(p.id);
    setForm({
      title: p.title, description: p.description, thumbnailUrl: p.thumbnailUrl,
      liveUrl: p.liveUrl || '', githubUrl: p.githubUrl || '',
      techStack: Array.isArray(p.techStack) ? p.techStack.join(', ') : '',
      displayOrder: String(p.displayOrder ?? 0), isPublished: Boolean(p.isPublished),
    });
    setStatus(`Editing ${p.title}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloudflareUpload = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { setStatus('Max file size is 10MB'); return; }
    setIsUploading(true);
    try {
      const result = await uploadImage(file);
      handleChange('thumbnailUrl', result.url);
      setStatus(`Uploaded to Cloudflare: ${file.name}`);
    } catch (err) {
      setStatus(err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const payload = {
      ...form,
      displayOrder: parseInt(form.displayOrder, 10) || 0,
      techStack: form.techStack.split(',').map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (editingId) {
        await updateProject(editingId, payload);
        setStatus('Project updated');
      } else {
        await createProject(payload);
        setStatus('Project created');
        resetForm();
      }
      await onRefresh();
    } catch (err) {
      setStatus(err.message || 'Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (p) => {
    if (!window.confirm(`Delete "${p.title}"?`)) return;
    try {
      await deleteProject(p.id);
      setStatus(`"${p.title}" deleted`);
      if (editingId === p.id) resetForm();
      await onRefresh();
    } catch (err) {
      setStatus(err.message || 'Failed to delete');
    }
  };

  const ordered = [...projects].sort((a, b) =>
    a.displayOrder !== b.displayOrder
      ? a.displayOrder - b.displayOrder
      : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Projects</h1>
        <p className="mt-2 text-sm text-vtc-muted">Create, edit, and manage your portfolio projects</p>
      </div>

      {status && (
        <div className="rounded-2xl border border-vtc-border bg-vtc-card/65 px-4 py-3 text-sm text-vtc-text">
          {status}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[400px_minmax(0,1fr)]">
        {/* Form */}
        <section className={panelClass}>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-vtc-text">{editingId ? 'Edit Project' : 'Add Project'}</h2>
            <button onClick={resetForm} className="inline-flex items-center gap-2 rounded-full border border-vtc-border bg-vtc-bg/80 px-3 py-1.5 text-xs font-semibold transition hover:border-vtc-indigo hover:text-vtc-indigo">
              <Plus size={14} /> New
            </button>
          </div>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <input value={form.title} onChange={(e) => handleChange('title', e.target.value)} className="w-full rounded-2xl border border-vtc-border bg-vtc-bg/80 px-4 py-3 outline-none transition focus:border-vtc-indigo" placeholder="Project name" required />
            <textarea value={form.description} onChange={(e) => handleChange('description', e.target.value)} className="min-h-24 w-full rounded-2xl border border-vtc-border bg-vtc-bg/80 px-4 py-3 outline-none transition focus:border-vtc-indigo" placeholder="Project summary" required />

            {/* Thumbnail URL + Upload */}
            <input value={form.thumbnailUrl} onChange={(e) => handleChange('thumbnailUrl', e.target.value)} className="w-full rounded-2xl border border-vtc-border bg-vtc-bg/80 px-4 py-3 outline-none transition focus:border-vtc-indigo" placeholder="Thumbnail URL" required />
            <label className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-vtc-border bg-vtc-bg/80 px-4 py-3 text-sm font-semibold transition hover:border-vtc-indigo hover:text-vtc-indigo">
              <CloudUpload size={16} />
              {isUploading ? 'Uploading to Cloudflare...' : 'Upload to Cloudflare Images'}
              <input type="file" accept="image/*" className="hidden" onChange={handleCloudflareUpload} />
            </label>

            <input value={form.liveUrl} onChange={(e) => handleChange('liveUrl', e.target.value)} className="w-full rounded-2xl border border-vtc-border bg-vtc-bg/80 px-4 py-3 outline-none transition focus:border-vtc-indigo" placeholder="Live URL" />
            <input value={form.githubUrl} onChange={(e) => handleChange('githubUrl', e.target.value)} className="w-full rounded-2xl border border-vtc-border bg-vtc-bg/80 px-4 py-3 outline-none transition focus:border-vtc-indigo" placeholder="GitHub URL" />
            <input value={form.techStack} onChange={(e) => handleChange('techStack', e.target.value)} className="w-full rounded-2xl border border-vtc-border bg-vtc-bg/80 px-4 py-3 outline-none transition focus:border-vtc-indigo" placeholder="Tech stack, comma separated" />
            <input type="number" value={form.displayOrder} onChange={(e) => handleChange('displayOrder', e.target.value)} className="w-full rounded-2xl border border-vtc-border bg-vtc-bg/80 px-4 py-3 outline-none transition focus:border-vtc-indigo" placeholder="Display order" />

            <div className="flex items-center justify-between rounded-2xl border border-vtc-border bg-vtc-bg/70 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-vtc-text">Published</p>
                <p className="text-xs text-vtc-muted">Hide drafts from the public slider.</p>
              </div>
              <button type="button" onClick={() => handleChange('isPublished', !form.isPublished)} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ${form.isPublished ? 'bg-vtc-indigo text-white' : 'bg-vtc-border/80 text-vtc-muted'}`}>
                {form.isPublished ? <Eye size={14} /> : <EyeOff size={14} />}
                {form.isPublished ? 'Live' : 'Draft'}
              </button>
            </div>

            {/* Preview */}
            <div className="overflow-hidden rounded-2xl border border-vtc-border bg-vtc-bg/80">
              <img src={form.thumbnailUrl || getProjectFallbackImage(form.title || 'Preview')} alt={form.title || 'Preview'} className="h-36 w-full object-cover" onError={(e) => { e.currentTarget.src = getProjectFallbackImage(form.title || 'Preview'); }} />
              <div className="p-3">
                <p className="text-sm font-semibold text-vtc-text">{form.title || 'Project preview'}</p>
                <p className="mt-1 text-xs text-vtc-muted">{form.description || 'Preview updates while you edit.'}</p>
              </div>
            </div>

            <button type="submit" disabled={isSaving || isUploading} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-vtc-indigo to-vtc-violet px-5 py-3 text-sm font-semibold text-white disabled:opacity-60">
              <Save size={16} />
              {isSaving ? 'Saving...' : editingId ? 'Save changes' : 'Create project'}
            </button>
          </form>
        </section>

        {/* Project List */}
        <section className={panelClass}>
          <h2 className="text-xl font-bold text-vtc-text">All Projects ({projects.length})</h2>
          <p className="mt-1 text-sm text-vtc-muted">Sorted by display order</p>

          <div className="mt-5 space-y-4">
            {ordered.length === 0 && (
              <p className="rounded-xl border border-vtc-border bg-vtc-bg/60 p-4 text-sm text-vtc-muted">No projects yet.</p>
            )}
            {ordered.map((p) => (
              <article key={p.id} className="overflow-hidden rounded-2xl border border-vtc-border bg-vtc-bg/60">
                <div className="grid gap-0 md:grid-cols-[160px_minmax(0,1fr)]">
                  <img src={p.thumbnailUrl || getProjectFallbackImage(p.title)} alt={p.title} className="h-full min-h-40 w-full object-cover" onError={(e) => { e.currentTarget.src = getProjectFallbackImage(p.title); }} />
                  <div className="p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="mb-2 flex flex-wrap gap-2 text-xs uppercase tracking-[0.25em] text-vtc-muted">
                          <span>#{p.displayOrder}</span>
                          <span>{p.isPublished ? 'Published' : 'Draft'}</span>
                        </div>
                        <h3 className="text-lg font-bold text-vtc-text">{p.title}</h3>
                        <p className="mt-2 line-clamp-2 text-sm text-vtc-muted">{p.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button onClick={() => handleEdit(p)} className="inline-flex items-center gap-1.5 rounded-full border border-vtc-border bg-vtc-card px-3 py-1.5 text-xs font-semibold transition hover:border-vtc-indigo hover:text-vtc-indigo">
                          <Pencil size={14} /> Edit
                        </button>
                        <button onClick={() => void handleDelete(p)} className="inline-flex items-center gap-1.5 rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-300">
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.techStack.map((tech) => (
                        <span key={`${p.id}-${tech}`} className="rounded-full border border-vtc-border bg-vtc-card px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-vtc-muted">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectsManager;
