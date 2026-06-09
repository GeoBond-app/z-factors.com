import Link from 'next/link';

export default function AboutPage() {
  return (
    <article className="min-h-screen bg-white text-neutral-950 space-y-10 max-w-2xl mx-auto px-8 py-12 leading-relaxed">
      <header className="space-y-4 border-b border-neutral-200 pb-6">
        <div className="text-xs text-neutral-400">
          <Link href="/" className="hover:text-neutral-700">
            ← Back to Index
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-normal tracking-tight text-neutral-950">
          About Z-Factors
        </h1>
      </header>

      <div className="space-y-8 text-lg">
        <section className="space-y-3">
          <p>
            Z-Factors is an independent intelligence publication focused on interpreting the hidden structural forces behind public events.
          </p>
          <p>
            We analyze events through human impact, economic pressure, institutional behavior, and community consequence.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
            Editorial Protocol
          </h2>
          <p className="italic font-medium text-neutral-950">
            People first. World second.
          </p>
          <p>
            Most news reports what happened. Z-Factors asks what it means, who is affected, and how people are carrying it together.
          </p>
        </section>

        <section className="space-y-3 bg-neutral-100 p-6 border-l border-neutral-900 rounded-r">
          <h2 className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">
            Human Reality Lens
          </h2>
          <p className="text-sm text-neutral-700 leading-relaxed">
            Every story is viewed through visible reality, human reality, and shared reality: the facts, the people affected, and the community response.
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
