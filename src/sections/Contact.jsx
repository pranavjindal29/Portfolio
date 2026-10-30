import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Copy, Github, Linkedin, Mail } from 'lucide-react';
import Reveal from '../components/Reveal';
import { contact } from '../data/portfolio';

const icons = { Email: Mail, LinkedIn: Linkedin, GitHub: Github };
const emptyForm = { name: '', email: '', message: '', website: '' };

export default function Contact({ onCopyEmail }) {
  const [formData, setFormData] = useState(emptyForm);
  const [submission, setSubmission] = useState({ status: 'idle', message: '' });
  const isSubmitting = submission.status === 'sending';

  const handleChange = (event) => {
    setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }));
    if (!isSubmitting) setSubmission({ status: 'idle', message: '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    const payload = Object.fromEntries(Object.entries(formData).map(([key, value]) => [key, value.trim()]));
    if (!payload.name || !payload.email || !payload.message) {
      setSubmission({ status: 'error', message: 'Please add your name, email, and message.' });
      return;
    }
    setSubmission({ status: 'sending', message: '' });
    let timeoutId;
    try {
      const controller = new AbortController();
      timeoutId = window.setTimeout(() => controller.abort(), 15000);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || contact.errorMessage);
      setSubmission({ status: 'success', message: contact.successMessage });
      setFormData(emptyForm);
    } catch {
      setSubmission({ status: 'error', message: contact.errorMessage });
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  return (
    <section id="contact" tabIndex={-1} className="section-shell contact-section" aria-labelledby="contact-title">
      <div className="content-container contact-grid">
        <Reveal>
          <p className="section-number">04 / Contact</p>
          <h2 id="contact-title" className="mt-5 max-w-md font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{contact.title}</h2>
          <p className="mt-5 max-w-md text-[var(--muted)]">{contact.description}</p>
          <div className="mt-8 space-y-3">
            {contact.links.map(({ name, href, detail, action }) => {
              const Icon = icons[name];
              if (action === 'copy-email') {
                return (
                  <button key={name} type="button" onClick={onCopyEmail} className="contact-link" aria-label={`Copy email address: ${detail}`} title="Copy email address">
                    <Icon size={17} className="shrink-0 text-[var(--accent)]" aria-hidden="true" /><span>{detail}</span><Copy size={15} className="shrink-0 text-[var(--muted)]" aria-hidden="true" />
                  </button>
                );
              }
              const external = href.startsWith('https:');
              return (
                <a key={name} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className="contact-link" aria-label={`${name}: ${detail}`}>
                  <Icon size={17} className="shrink-0 text-[var(--accent)]" aria-hidden="true" /><span>{name === 'Email' ? detail : name}</span><ArrowUpRight size={15} className="text-[var(--muted)]" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <form onSubmit={handleSubmit} className="contact-form" aria-label={contact.formTitle} aria-busy={isSubmitting}>
            <h3 className="text-lg font-semibold">{contact.formTitle}</h3>
            <fieldset disabled={isSubmitting} className="mt-5 grid gap-4">
              <legend className="sr-only">Your contact details and message</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label htmlFor="contact-name">Name</label><input id="contact-name" name="name" autoComplete="name" value={formData.name} onChange={handleChange} required maxLength={120} className="input-field" placeholder="Your name" /></div>
                <div><label htmlFor="contact-email">Email</label><input id="contact-email" type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} required maxLength={254} className="input-field" placeholder="you@company.com" /></div>
              </div>
              <div><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" value={formData.message} onChange={handleChange} rows={4} required maxLength={5000} className="input-field resize-y" placeholder="Tell me about the role or what you’re building." /></div>
              <div hidden aria-hidden="true"><label>Website<input name="website" value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete="off" /></label></div>
            </fieldset>
            <p role="status" aria-live="polite" aria-atomic="true" className={`form-status ${submission.status === 'error' ? 'is-error' : ''}`}>{submission.message}</p>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-[22ch] text-xs leading-6 text-[var(--muted)]">{contact.formNote}</p>
              <button type="submit" disabled={isSubmitting} className="primary-button">{isSubmitting ? 'Sending…' : contact.submitLabel}<ArrowRight size={16} aria-hidden="true" /></button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
