import Link from 'next/link';

export const metadata = {
  title: 'California Insurance Crisis: The Collapse of the Safety Net | Z-Factors',
  description: 'Major insurers are exiting California, leaving homeowners without affordable options. Z-Factors examines the human reality behind the headlines.',
};

export default function TA001() {
  return (
    <main className="max-w-3xl mx-auto px-8 py-12 space-y-10">

      <header className="border-b border-neutral-200 pb-6">
        <Link href="/" className="text-xs font-mono text-neutral-400 hover:text-neutral-700">
          ← Back Home
        </Link>
        <div className="text-xs uppercase tracking-widest text-neutral-500 mt-6 mb-2">
          TA-001 · June 5, 2026 · Confidence: 92%
        </div>
        <h1 className="text-4xl font-serif mt-2 leading-tight">
          California Insurance Crisis: The Collapse of the Safety Net
        </h1>
        <p className="text-xl text-neutral-600 mt-4">
          Major insurers are exiting California. For millions of homeowners,
          the safety net is disappearing — and the alternatives are worse.
        </p>
      </header>

      <section className="space-y-6 text-neutral-800 leading-relaxed">
        <h2 className="text-xl font-semibold">What Happened</h2>
        <p>
          State Farm, Allstate, and several other major insurance carriers have
          announced they will no longer issue new homeowner policies in California.
          The stated reason is wildfire risk and the inability to price policies
          profitably under California&apos;s rate regulations. The result is a
          shrinking market where remaining options are either unaffordable or
          inadequate.
        </p>
        <p>
          California&apos;s FAIR Plan — the insurer of last resort — has seen
          enrollment surge by over 60% in two years. It was designed for
          high-risk properties that cannot get private coverage. It was never
          designed to be the primary insurer for entire neighborhoods.
        </p>
      </section>

      <section className="space-y-6 text-neutral-800 leading-relaxed">
        <h2 className="text-xl font-semibold">How People Are Carrying It</h2>
        <p>
          Homeowners in fire-adjacent communities are facing annual premium
          increases of 30 to 50 percent — when they can find coverage at all.
          For many, particularly older residents on fixed incomes, the choice
          is between insurance and other necessities. Some are going uninsured
          entirely, one wildfire away from financial ruin.
        </p>
        <p>
          The burden falls unevenly. Wealthier homeowners can absorb higher
          premiums or self-insure. Working families and retirees cannot.
          Communities that were already economically stressed are now facing
          an additional structural pressure that compounds every other challenge.
        </p>
      </section>

      <section className="border-l-4 border-black pl-6 py-2 space-y-3">
        <div className="text-xs uppercase tracking-widest text-neutral-500">
          Z-Factor Interpretation
        </div>
        <p className="text-lg leading-relaxed">
          The insurance crisis is not only about wildfire risk. It exposes
          the gap between individual responsibility and institutional risk
          models. When private markets exit, the public absorbs the cost —
          but the public infrastructure was never built for this load.
          The real question is not why insurers are leaving. It is who
          was supposed to catch people when they did.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Signal Score: 9/10</h2>
        <p className="text-neutral-600">
          High community intelligence value. Affects housing stability,
          economic security, and long-term community resilience across
          California.
        </p>
      </section>

      <footer className="border-t pt-6 flex justify-between text-sm text-neutral-500">
        <span>TA-001 · Z-Factors · Track A</span>
        <Link href="/archive" className="hover:text-neutral-700">
          View Archive →
        </Link>
      </footer>

    </main>
  );
}
