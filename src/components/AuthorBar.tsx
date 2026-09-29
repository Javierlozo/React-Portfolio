import Image from "next/image";
import Link from "next/link";
import photo from "@/src/assets/pictures/Photo-127.jpg";

// Shown at the end of lab and note pages. Most visitors land on those pages
// from search, so this is where they learn who wrote them.
const LINKS = [
  { label: "Portfolio", href: "/" },
  { label: "llm-audit", href: "/llm-audit" },
  { label: "Resume", href: "/resume/Resume.pdf", download: "Luis Javier Lozoya - Resume.pdf" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/luisjlozoya/", external: true },
];

export default function AuthorBar() {
  return (
    <aside
      aria-label="About the author"
      className="mt-12 pt-8 border-t border-divider flex flex-col sm:flex-row gap-4 sm:gap-5 items-start"
    >
      <Image
        src={photo}
        alt="Luis Javier Lozoya"
        width={56}
        height={56}
        sizes="56px"
        className="rounded-full object-cover w-14 h-14 shrink-0"
      />
      <div className="space-y-2">
        <p className="text-sm font-medium text-content">Luis Javier Lozoya</p>
        <p className="text-sm leading-relaxed text-content-muted">
          Application Security Engineer in Charleston, SC. I build llm-audit, an OWASP LLM Top 10
          scanner for TypeScript and JavaScript. Open to full-time Senior AppSec and AI Security
          roles, remote US.
        </p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium uppercase tracking-wide">
          {LINKS.map((l) => (
            <li key={l.label}>
              {l.external || l.download ? (
                <a
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : { download: l.download })}
                  className="text-green-700 hover:underline underline-offset-4 dark:text-green-400"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  href={l.href}
                  className="text-green-700 hover:underline underline-offset-4 dark:text-green-400"
                >
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
