import Link from 'next/link';

export const metadata = {
  title: 'Beyond the Gas Pump: The Real Cost of Conflict-Driven Inflation | Z-Factors',
  description: 'Five questions about how war-driven energy costs really land on families and communities.',
};

export default function TA005() {
  return (
    <main className="max-w-3xl mx-auto px-8 py-12 space-y-10">

      <header className="border-b border-neutral-200 pb-8">
        <Link href="/" className="text-xs font-mono text-neutral-400 hover:text-neutral-900">
          Back Home
        </Link>
        <div className="flex items-center gap-3 mt-6 mb-3">
          <span className="text-xs font-mono text-neutral-400">TA-005 · 2026-06-11</span>
          <span className="text-xs font-mono font-medium px-2 py-0.5 rounded" style={{background:"#EEEDFE",color:"#3C3489"}}>Commentary</span>
          <span className="text-xs font-mono px-2 py-0.5 rounded" style={{background:"#EEEDFE",color:"#3C3489"}}>Small Town</span>
        </div>
        <h1 className="text-4xl font-serif font-normal mt-2 leading-tight">
          Beyond the Gas Pump: The Real Cost of Conflict-Driven Inflation on Human Lives
        </h1>
        <p className="text-xl text-neutral-700 mt-4 leading-relaxed">
          Five questions about how war-driven energy costs really land on families and communities.
        </p>
      </header>

      <section className="space-y-5">
        <div className="flex items-center gap-3 pb-2 border-b border-neutral-100">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:"#7F77DD"}}></div>
          <div>
            <div className="text-sm font-semibold">The real feeling.</div>
            <div className="text-xs text-neutral-400 italic">How it really lands on people.</div>
          </div>
        </div>
        <div className="space-y-4 text-neutral-900 leading-relaxed">
          <p>Global markets are bracing for a significant surge in energy and commodity prices. While headlines focus on percentage increases and economic projections, the real issue is how this translates into a human crisis — eroding purchasing power, escalating food insecurity, and impossible choices for millions navigating an increasingly unaffordable world.</p>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-3 pb-2 border-b border-neutral-100">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:"#BA7517"}}></div>
          <div>
            <div className="text-sm font-semibold">The real response.</div>
            <div className="text-xs text-neutral-400 italic">What we can do together.</div>
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-sm font-semibold text-neutral-600 uppercase tracking-wide">Five questions worth asking</p>
          <div className="space-y-4">
            <div className="border-l-2 pl-4" style={{borderColor:"#BA7517"}}>
              <p className="font-medium text-neutral-800">1. Who actually absorbs the cost when energy prices spike?</p>
              <p className="text-sm text-neutral-500 mt-1">Not all households feel it equally. Lower-income families spend proportionally more on energy and food.</p>
            </div>
            <div className="border-l-2 pl-4" style={{borderColor:"#BA7517"}}>
              <p className="font-medium text-neutral-800">2. Why do relief programs reach so few people who need them?</p>
              <p className="text-sm text-neutral-500 mt-1">The eligibility gap between those who qualify and those who suffer is rarely discussed.</p>
            </div>
            <div className="border-l-2 pl-4" style={{borderColor:"#BA7517"}}>
              <p className="font-medium text-neutral-800">3. What happens to small businesses that cannot pass costs to customers?</p>
              <p className="text-sm text-neutral-500 mt-1">Margins disappear. Owners absorb or close. The community loses anchors.</p>
            </div>
            <div className="border-l-2 pl-4" style={{borderColor:"#BA7517"}}>
              <p className="font-medium text-neutral-800">4. How does prolonged financial stress change community behavior?</p>
              <p className="text-sm text-neutral-500 mt-1">Research shows chronic economic pressure increases isolation, anxiety, and social fracture.</p>
            </div>
            <div className="border-l-2 pl-4" style={{borderColor:"#BA7517"}}>
              <p className="font-medium text-neutral-800">5. What would it look like if communities organized around shared energy costs?</p>
              <p className="text-sm text-neutral-500 mt-1">Collective purchasing, community solar, mutual aid — options that exist but rarely scale.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 rounded-lg p-5 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Signal Score</span>
          <span className="text-sm font-bold" style={{color:"#7F77DD"}}>7/10</span>
        </div>
        <p className="text-sm text-neutral-600">High community relevance. Every household affected. Questions that help people understand their real situation.</p>
      </section>

      <footer className="border-t pt-6 flex justify-between text-sm text-neutral-500">
        <span className="font-mono text-xs">TA-005 · Z-Factors · Commentary</span>
        <Link href="/archive" className="hover:text-neutral-900 text-xs">View Archive</Link>
      </footer>

    </main>
  );
}
