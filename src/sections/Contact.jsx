import { useState } from 'react';
import { ArrowRight, Code2, Github, Linkedin, Mail, Phone } from 'lucide-react';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import { profile, socialLinks } from '../data/portfolio';

const socialIconMap = {
  GitHub: Github,
  LinkedIn: Linkedin,
  LeetCode: Code2,
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    website: '',
  });
  const [submissionState, setSubmissionState] = useState({ status: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copyState, setCopyState] = useState({ type: '', message: '' });

  const externalLinks = socialLinks.filter((link) => link.href);

  const handleCopy = async (type, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyState({
        type,
        message: type === 'Mail' ? 'Email copied to clipboard' : 'Phone number copied to clipboard',
      });
      window.setTimeout(() => {
        setCopyState((current) => (current.type === type ? { type: '', message: '' } : current));
      }, 1800);
    } catch (error) {
      setCopyState({
        type,
        message: type === 'Mail' ? 'Unable to copy email right now' : 'Unable to copy phone number right now',
      });
      window.setTimeout(() => {
        setCopyState((current) => (current.type === type ? { type: '', message: '' } : current));
      }, 1800);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setSubmissionState({ status: 'idle', message: '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      company: formData.company.trim(),
      message: formData.message.trim(),
      website: formData.website.trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setSubmissionState({
        status: 'error',
        message: 'Please add your name, email, and a short message before sending.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Unable to send your message right now.');
      }

      setSubmissionState({
        status: 'success',
        message: 'Message sent successfully. It has been delivered straight to my inbox.',
      });
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
        website: '',
      });
    } catch (error) {
      setSubmissionState({
        status: 'error',
        message: error.message || 'Unable to send your message right now.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-shell scroll-mt-6 pt-2 pb-12 lg:scroll-mt-8 lg:pt-3 lg:pb-14">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-[12%] h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl dark:bg-sky-300/12" />
      </div>

      <div className="content-container relative">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              If my work resonates with you,
              <br />
              I’d be glad to connect.
            </>
          }
          className="max-w-none"
        />

        <div className="mt-5 grid items-stretch gap-5 sm:mt-6 sm:gap-6 xl:grid-cols-[380px_minmax(0,1fr)] 2xl:grid-cols-[420px_minmax(0,1fr)] min-[1920px]:grid-cols-[450px_minmax(0,1fr)]">
          <Reveal className="h-full">
            <article className="surface-panel flex h-full flex-col p-5 sm:p-7">
              <span className="section-eyebrow w-fit self-start">Get In Touch</span>
              <h3 className="mt-4 text-2xl font-semibold text-[var(--text)]">
                Always happy to connect.
              </h3>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                I enjoy conversations around software, ML systems, data work, and research-led builds.
                If something here connects with what you are working on, feel free to reach out.
              </p>

              <div className="mt-10 space-y-4 xl:mt-auto xl:pt-8">
                <button
                  type="button"
                  onClick={() => handleCopy('Mobile', profile.phone)}
                  className="flex h-[4.75rem] w-full items-center justify-between gap-3 rounded-[20px] border border-[var(--surface-border)] bg-[var(--surface-strong)] px-4 py-3.5 text-sm text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] sm:rounded-[22px]"
                  aria-label="Copy phone number"
                >
                  <span className="flex items-center gap-3">
                    <Phone size={16} />
                    <span>Phone</span>
                  </span>
                  <span className="max-w-[58%] truncate text-right text-xs text-[var(--muted)] sm:text-sm">
                    {profile.phone}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopy('Mail', profile.email)}
                  className="flex h-[4.75rem] w-full items-center justify-between gap-3 rounded-[20px] border border-[var(--surface-border)] bg-[var(--surface-strong)] px-4 py-3.5 text-sm text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] sm:rounded-[22px]"
                  aria-label="Copy email address"
                >
                  <span className="flex items-center gap-3">
                    <Mail size={16} />
                    <span>Email</span>
                  </span>
                  <span className="max-w-[58%] truncate text-right text-xs text-[var(--muted)] sm:text-sm">
                    {profile.email}
                  </span>
                </button>
              </div>

              {copyState.message ? (
                <div
                  className={`mt-4 rounded-2xl border px-4 py-3 text-sm leading-6 ${
                    copyState.message.startsWith('Unable')
                      ? 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300'
                      : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  {copyState.message}
                </div>
              ) : null}

              <div className="mt-5 grid gap-2.5 md:hidden">
                <div className="flex items-center justify-center gap-4 rounded-[20px] border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-3.5">
                  {externalLinks.map((link) => {
                    const IconComponent = socialIconMap[link.name];

                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.name}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--surface-border)] bg-[var(--surface-strong)] text-[var(--text)] shadow-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      >
                        <IconComponent size={18} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal className="h-full">
            <form onSubmit={handleSubmit} className="surface-panel flex h-full flex-col p-5 sm:p-8">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="meta-label">Name</span>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field mt-2"
                    placeholder="Your name"
                  />
                </label>
                <label className="block">
                  <span className="meta-label">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field mt-2"
                    placeholder="you@company.com"
                  />
                </label>
              </div>

              <label className="mt-4 block">
                <span className="meta-label">Company</span>
                <input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="input-field mt-2"
                  placeholder="Team, studio, or organization"
                />
              </label>

              <label className="hidden" aria-hidden="true">
                <span>Website</span>
                <input
                  tabIndex="-1"
                  autoComplete="off"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                />
              </label>

              <label className="mt-4 block">
                <span className="meta-label">Message</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  required
                  className="input-field mt-2 min-h-[118px] resize-none xl:min-h-[82px]"
                  placeholder="Tell me a little about what you would like to discuss."
                />
              </label>

              {submissionState.status !== 'idle' ? (
                <div
                  className={`mt-5 rounded-2xl border px-4 py-3 text-sm leading-7 ${
                    submissionState.status === 'success'
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                      : 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300'
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  {submissionState.message}
                </div>
              ) : null}

              <div className="mt-auto flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-7 text-[var(--muted)]">
                  Messages sent here go straight to my inbox.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="primary-button w-full shadow-[0_10px_20px_rgba(37,99,235,0.16)] dark:shadow-[0_12px_22px_rgba(14,165,233,0.1)] sm:w-auto disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
