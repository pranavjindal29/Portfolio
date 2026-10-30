import { Code2, Github, Linkedin, Mail } from 'lucide-react';
import { socialLinks } from '../data/portfolio';

const icons = { GitHub: Github, LinkedIn: Linkedin, Email: Mail, LeetCode: Code2 };

export default function SocialSidebar({ onCopyEmail }) {
  return (
    <aside className="social-sidebar" aria-label="Social profiles">
      {socialLinks.map(({ name, href, action }) => {
        const Icon = icons[name];
        if (action === 'copy-email') {
          return (
            <button key={name} type="button" onClick={onCopyEmail} className="icon-button" aria-label="Copy email address" title="Copy email address">
              <Icon size={18} aria-hidden="true" />
            </button>
          );
        }
        const external = href.startsWith('https:');
        return (
          <a key={name} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className="icon-button" aria-label={name} title={name}>
            <Icon size={18} aria-hidden="true" />
          </a>
        );
      })}
      <span className="h-20 w-px bg-[var(--line)]" aria-hidden="true" />
    </aside>
  );
}
