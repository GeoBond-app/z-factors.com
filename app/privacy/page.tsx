import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <article className="space-y-10 max-w-2xl mx-auto px-8 py-12 text-neutral-800 leading-relaxed">
      <header className="space-y-4 border-b border-neutral-200 pb-6">
        <div className="text-xs text-neutral-400">
          <Link href="/" className="hover:text-neutral-700">
            ← Back to Index
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-normal tracking-tight text-neutral-950">
          Privacy Policy
        </h1>
      </header>

      <div className="space-y-8 text-lg">
        <section className="space-y-3">
          <p className="text-xs text-neutral-400 tracking-wider">
            Effective Date: June 8, 2026
          </p>
          <p>
            Z-Factors is a minimal-footprint independent publication. We do not require user accounts, public comments, personal profiles, or newsletter registration to read the site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
            Information We Collect
          </h2>
          <p>
            This site does not directly collect personal information through forms or account systems. If you contact us by email, we may receive the information you choose to provide in that message.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
            Analytics
          </h2>
          <p>
            We may use analytics tools in the future to understand aggregate traffic patterns, page performance, referring pages, device categories, and general site usage. Analytics data is used to improve the publication and is not used to create user accounts on this site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
            Cookies & Advertising
          </h2>
          <p>
            This site may support cookies or third-party advertising tools in the future, including services such as Google AdSense. If advertising is added, third-party vendors may use cookies to serve and measure ads according to their own policies.
          </p>
          <p>
            Visitors can manage cookies through their browser settings and may adjust personalized advertising preferences through the relevant advertising provider controls.
          </p>
        </section>

        <section className="space-y-3 bg-neutral-50 p-6 border-l border-neutral-900 rounded-r">
          <h2 className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">
            Contact
          </h2>
          <p className="text-sm text-neutral-700 leading-relaxed">
            For privacy-related questions, contact us at terry@geobond.app.
          </p>
        </section>
      </div>

      <footer className="border-t border-neutral-200 pt-6 text-xs text-neutral-400 flex justify-between">
        <span>Z-Factors // Track A</span>
        <Link href="/" className="underline hover:text-neutral-700">
          Return Home
        </Link>
      </footer>
    </article>
  );
}
