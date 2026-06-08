import Link from 'next/link';

export default function ContactPage() {
  return (
    <article className="space-y-10 max-w-2xl mx-auto px-8 py-12 text-neutral-800 leading-relaxed">
      <header className="space-y-4 border-b border-neutral-200 pb-6">
        <div className="text-xs text-neutral-400">
          <Link href="/" className="hover:text-neutral-700">
            ← Back to Index
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-normal tracking-tight text-neutral-950">
          Contact
        </h1>
      </header>

      <div className="space-y-8 text-lg">
        <section className="space-y-3">
          <p>
            Z-Factors welcomes editorial feedback, correction requests, source notes, and general inquiries.
          </p>
          <p>
            For questions about analysis, attribution, or publication standards, contact the administrative lead below.
          </p>
        </section>

        <section className="space-y-4 border-t border-b border-neutral-100 py-6">
          <div className="grid grid-cols-1 gap-y-4 text-sm sm:grid-cols-2">
            <div>
              <span className="block text-xs uppercase text-neutral-400 tracking-wider mb-1">
                Administrative Lead
              </span>
              <strong className="text-neutral-900 font-medium">
                Terrence Lee
              </strong>
            </div>

            <div>
              <span className="block text-xs uppercase text-neutral-400 tracking-wider mb-1">
                Email
              </span>
              <a
                href="mailto:terry@geobond.app"
                className="underline text-neutral-800 font-medium"
              >
                terry@geobond.app
              </a>
            </div>
          </div>
        </section>

        <section className="space-y-3 bg-neutral-50 p-6 border-l border-neutral-900 rounded-r">
          <h2 className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">
            Note
          </h2>
          <p className="text-sm text-neutral-700 leading-relaxed">
            This site uses a static publishing structure and does not currently use contact forms or public comment databases.
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
