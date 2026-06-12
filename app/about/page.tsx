import Link from 'next/link';

export const metadata = {
  title: 'About | Z-Factors',
  description: 'Z-Factors is a community intelligence publication. The real story. The real feeling. The real response.',
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-8 py-12 space-y-10" style={{fontFamily:'ui-sans-serif,system-ui,-apple-system,sans-serif'}}>

      <header className="border-b pb-8" style={{borderColor:'#DDDDDD'}}>
        <Link href="/" className="text-xs font-mono hover:underline" style={{color:'#777777'}}>
          Back Home
        </Link>
        <div className="flex items-center gap-3 mt-6 mb-3">
          <span className="text-xs font-mono" style={{color:'#777777'}}>About</span>
          <span className="text-xs font-mono font-medium px-2 py-0.5 rounded" style={{background:'#E1F5EE',color:'#085041'}}>Z-Factors</span>
        </div>
        <h1 className="text-4xl font-serif font-normal mt-2 leading-tight" style={{color:'#121212'}}>
          About Z-Factors
        </h1>
        <p className="text-xl mt-4 leading-relaxed" style={{color:'#333333'}}>
          Community intelligence. Three realities. One platform.
        </p>
      </header>

      <section className="space-y-5">
        <div className="flex items-center gap-3 pb-2 border-b" style={{borderColor:'#F0F0F0'}}>
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:'#1D9E75'}}></div>
          <div>
            <div className="text-sm font-semibold" style={{color:'#121212'}}>The real story.</div>
            <div className="text-xs italic" style={{color:'#777777'}}>What really happened.</div>
          </div>
        </div>
        <div className="space-y-4 leading-relaxed text-lg" style={{color:'#222222'}}>
          <p>Z-Factors is an independent community intelligence publication focused on interpreting the hidden structural forces behind public events.</p>
          <p>We analyze events through human impact, economic pressure, institutional behavior, and community consequence. Most news reports what happened. Z-Factors asks what it means — and how people are carrying it together.</p>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-3 pb-2 border-b" style={{borderColor:'#F0F0F0'}}>
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:'#7F77DD'}}></div>
          <div>
            <div className="text-sm font-semibold" style={{color:'#121212'}}>The real feeling.</div>
            <div className="text-xs italic" style={{color:'#777777'}}>How it really lands on people.</div>
          </div>
        </div>
        <div className="space-y-4 leading-relaxed text-lg" style={{color:'#222222'}}>
          <p>Every story is viewed through three connected realities.</p>
          <div className="space-y-3 pl-4">
            <div className="border-l-2 pl-4" style={{borderColor:'#1D9E75'}}>
              <div className="font-semibold text-sm" style={{color:'#121212'}}>The real story.</div>
              <div className="text-sm" style={{color:'#555555'}}>Facts, events, economics, policies. What can be verified.</div>
            </div>
            <div className="border-l-2 pl-4" style={{borderColor:'#7F77DD'}}>
              <div className="font-semibold text-sm" style={{color:'#121212'}}>The real feeling.</div>
              <div className="text-sm" style={{color:'#555555'}}>Who absorbs the impact. What it costs in human terms.</div>
            </div>
            <div className="border-l-2 pl-4" style={{borderColor:'#BA7517'}}>
              <div className="font-semibold text-sm" style={{color:'#121212'}}>The real response.</div>
              <div className="text-sm" style={{color:'#555555'}}>Community action. Collective strength. What comes next.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-3 pb-2 border-b" style={{borderColor:'#F0F0F0'}}>
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:'#BA7517'}}></div>
          <div>
            <div className="text-sm font-semibold" style={{color:'#121212'}}>The real response.</div>
            <div className="text-xs italic" style={{color:'#777777'}}>What we can do together.</div>
          </div>
        </div>
        <div className="border-l-4 pl-5 py-2" style={{borderColor:'#BA7517'}}>
          <p className="text-lg leading-relaxed font-serif italic" style={{color:'#333333'}}>
            Technology is a tool. Community is the outcome. People are the destination.
          </p>
        </div>
        <p className="leading-relaxed" style={{color:'#222222'}}>
          Z-Factors is part of Etherom — a community intelligence ecosystem built on one belief: when people understand their community better, they carry less weight alone.
        </p>
      </section>

      <footer className="border-t pt-6 flex justify-between text-xs" style={{borderColor:'#DDDDDD',color:'#777777'}}>
        <span className="font-mono">Z-Factors · Track A · Etherom</span>
        <Link href="/archive" className="hover:underline">View Archive →</Link>
      </footer>

    </main>
  );
}
