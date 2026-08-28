import type { Metadata } from "next";
import Link from "next/link";
import { containerShell } from "../../components/ui/Section";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What this site records about your visit, including the analytics cookie and the IP lookup, who it is shared with, and how to have it removed.",
  alternates: { canonical: "https://www.luislozoya.com/privacy" },
  robots: { index: true, follow: true },
};

/**
 * What this site records, written from the code rather than from a template.
 *
 * The site had no privacy page while `/api/track` was writing a row per page
 * view holding an IP address, a city, an ISP name and a one-year visitor
 * cookie, and while two routes were posting text to OpenAI.
 *
 * **Writing the page is what got the tracking removed**, which is the useful
 * order: describing the columns out loud made it obvious that none of them was
 * being read. The cookie, the IP, the city and the ISP lookup are gone, so
 * most of this page is now a short description of a thin row rather than a
 * long disclosure of a fat one.
 *
 * **Each claim corresponds to a line of this repository.** The column list is
 * the insert in `api/track/route.ts`, the in-memory page-load id is
 * `PageTracker.tsx`, and the two model calls are `api/chat` and
 * `api/fit-assessment`. If the tracking changes, this page changes in the same
 * commit: a policy describing an older version of a site is a specific untrue
 * statement rather than a missing one.
 */

type Section = { title: string; body: React.ReactNode };

const SECTIONS: Section[] = [
  {
    title: "The short version",
    body: (
      <>
        <p>
          This site keeps its own analytics rather than handing them to Google.
          That means a row per page view in a database I control, and it is
          deliberately a thin row: <strong>no cookies, no IP address, and
          nothing that can recognise you on a second visit.</strong>
        </p>
        <p>
          It used to store an IP address, a city, an internet provider and a
          year-long identifier in a cookie. All of that is gone, because none
          of it was being read and keeping it made this a tracking site rather
          than a counter. What follows is the whole of what is left.
        </p>
      </>
    ),
  },
  {
    title: "Cookies",
    body: (
      <>
        <p>
          <strong>None.</strong> This site sets no cookies: not for
          advertising, not for analytics, not for anything.
        </p>
        <p>
          There was one, <code>_vid</code>, holding a random identifier with a
          one-year expiry so repeat visits could be recognised. It was removed
          rather than disclosed. Nothing here needed to know you had been
          before, and an unconsented year-long identifier is not something an
          application security portfolio should be shipping.
        </p>
        <p>
          A random id still travels with each page view, but it is generated in
          memory, lasts until you navigate away, and is never written to your
          browser. It exists so a page view and the note of how long you stayed
          can find each other. It cannot join two pages, and it certainly
          cannot join two visits.
        </p>
      </>
    ),
  },
  {
    title: "What each page view records",
    body: (
      <>
        <p>Every row holds, where the browser or the request provides it:</p>
        <ul>
          <li>The path you visited, and where you arrived from</li>
          <li>Your country, from an edge header. Not your city, not your IP</li>
          <li>Browser, operating system, device type and window width</li>
          <li>Your browser language and timezone</li>
          <li>How long you stayed on the page</li>
          <li>
            Any <code>utm_</code> campaign parameters in the link you followed
          </li>
        </ul>
        <p>
          It is stored in a Postgres database hosted by Supabase, in the United
          States, and only I can read it. It exists so I can tell whether
          anything here is being read, which is the whole reason it was built,
          and it turns out that question never needed a name attached to it.
        </p>
        <p>
          Your IP address is read while the request is being served, to rate
          limit the endpoint and to skip my own visits. It is used in memory
          and is not written anywhere.
        </p>
      </>
    ),
  },
  {
    title: "Who else sees it",
    body: (
      <>
        <p>
          <strong>OpenAI</strong> receives the text you type into either of the
          two tools on this site: the chat, and the fit assessment, where you
          paste a job description. Those are sent to the{" "}
          <code>gpt-4o-mini</code> model to produce a reply and are handled
          under OpenAI&apos;s terms. Neither is written to my database.
        </p>
        <p>
          Do not paste anything confidential into either box. A job description
          that has not been published, or anything your employer would call
          internal, should not go into a text field on a stranger&apos;s
          website. Mine included.
        </p>
        <p>
          <strong>Vercel</strong> hosts the site and, like any web host, sees
          requests as they are served.
        </p>
      </>
    ),
  },
  {
    title: "What is not collected",
    body: (
      <p>
        No account, because there is nothing to sign in to. No contact form, so
        no name or email unless you choose to send one. No advertising network,
        no Google Analytics, no social pixels, no fingerprinting, and nothing
        recording what you type as you type it.
      </p>
    ),
  },
  {
    title: "Your rights, and how to use them",
    body: (
      <>
        <p>
          If you are in the EU or the UK, the GDPR gives you the right to see
          what is held about you, to have it corrected, and to have it deleted.
        </p>
        <p>
          <strong>There is nothing here to find.</strong> Since no cookie is
          set, no IP is stored and no identifier survives a page load, no row
          in that table can be traced back to you, by me or by anyone with the
          database in front of them. That is the point of having removed them:
          a request I cannot fulfil because the data does not exist is a better
          answer than a process for handling one.
        </p>
        <p>
          If you want to ask anyway, or you think something here is wrong,
          email{" "}
          <a href="mailto:luis.lozoya.tech@gmail.com">
            luis.lozoya.tech@gmail.com
          </a>
          .
        </p>
      </>
    ),
  },
  {
    title: "Who holds it",
    body: (
      <p>
        Luis Javier Lozoya, Charleston, South Carolina. This is a personal site
        rather than a company one, and the database sits in a personal account.
      </p>
    ),
  },
  {
    title: "Changes",
    body: (
      <p>
        If what is recorded changes, this page changes in the same commit. The
        date below is when it was last true.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className={containerShell()}>
      <div className="max-w-2xl mx-auto py-16 sm:py-24">
        <p className="font-mono text-xs uppercase tracking-wide text-amber-700 dark:text-amber-400 mb-4">
          Privacy
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-gray-50 mb-6">
          What this site records
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-16">
          Written from the code rather than from a template, so it is longer
          than it would otherwise be. The site keeps its own analytics, and that
          means saying what is in them.
        </p>

        <div className="space-y-12">
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">
                {s.title}
              </h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_code]:font-mono [&_code]:text-sm [&_a]:underline [&_a]:underline-offset-4">
                {s.body}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500">
          Last updated 28 August 2026.{" "}
          <Link href="/" className="underline underline-offset-4">
            Back to the site
          </Link>
        </p>
      </div>
    </main>
  );
}
