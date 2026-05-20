import { useState } from 'react';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import { profile } from '../data/portfolio';

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
    <section id="contact" className="section-shell scroll-mt-6 lg:scroll-mt-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-[12%] h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl dark:bg-sky-300/12" />
      </div>

      <div className="content-container relative">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s talk about building thoughtful products and strong engineering teams."
          description="If you’re hiring for software, ML, data, or platform work, I’d be happy to connect. The form below now sends directly to my inbox."
        />

        <div className="mt-10 grid items-stretch gap-5 sm:mt-12 sm:gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
          <Reveal className="h-full">
            <article className="surface-panel flex h-full flex-col p-5 sm:p-7">
              <span className="section-eyebrow">Get In Touch</span>
              <h3 className="mt-4 text-2xl font-semibold text-[var(--text)]">
                Open to strong engineering conversations.
              </h3>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                I am currently open to software engineering, machine learning, data, and platform opportunities.
                If you are hiring for teams that value solid execution, product thinking, and dependable problem
                solving, I would be glad to connect.
              </p>

              <div className="mt-8 space-y-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex flex-col items-start gap-2 rounded-[20px] border border-[var(--surface-border)] bg-[var(--surface-strong)] px-4 py-4 text-sm text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:rounded-[22px]"
                >
                  <span className="flex items-center gap-3">
                    <Mail size={16} />
                    <span>Email</span>
                  </span>
                  <span className="break-all text-left text-xs text-[var(--muted)] sm:text-right sm:text-sm">{profile.email}</span>
                </a>

                <a
                  href={`tel:${profile.phone}`}
                  className="flex flex-col items-start gap-2 rounded-[20px] border border-[var(--surface-border)] bg-[var(--surface-strong)] px-4 py-4 text-sm text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:rounded-[22px]"
                >
                  <span className="flex items-center gap-3">
                    <Phone size={16} />
                    <span>Phone</span>
                  </span>
                  <span className="text-left text-xs text-[var(--muted)] sm:text-right sm:text-sm">{profile.phone}</span>
                </a>
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
                  placeholder="Team or company"
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
                  rows="6"
                  required
                  className="input-field mt-2 min-h-[180px] resize-none"
                  placeholder="Tell me a little about the role, team, or project."
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

              <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-7 text-[var(--muted)]">
                  Messages are submitted securely through the site and delivered directly to my inbox.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="primary-button w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-70"
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
