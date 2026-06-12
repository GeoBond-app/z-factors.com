import Link from 'next/link';

export const metadata = {
  title: 'Contact | Z-Factors',
  description: 'Contact Z-Factors for editorial feedback, corrections, or general inquiries.',
};

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-8 py-12 space-y-10" style={{fontFamily:'ui-sans-serif,system-ui,-apple-system,sans-serif'}}>

      <header className="border-b pb-8" style={{borderColor:'#DDDDDD'}}>
        <Link href="/" className="text-xs font-mono hover:underline" style={{color:'#777777'}}>
          Back Home
        </Link>
        <div className="flex items-center gap-3 mt-6 mb-3">
          <span className="text-xs font-mono" style={{color:'#777777'}}>Contact</span>
          <span className="text-xs font-mono font-medium px-2 py-0.5 rounded" style={{background:'#E1F5EE',color:'#085041'}}>Z-Factors</span>
        </div>
        <h1 className="text-4xl font-serif font-normal mt-2 leading-tight" style={{color:'#121212'}}>
          Contact
        </h1>
        <p className="text-xl mt-4 leading-relaxed" style={{color:'#333333'}}>
          Editorial feedback, corrections, source notes, and inquiries.
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
          <p>Z-Factors welcomes editorial feedback, correction requests, source notes, and general inquiries about analysis, attribution, or publication standards.</p>
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
        <div className="rounded-lg p-6 space-y-4" style={{background:'#FAFAFA',border:'0.5px solid #DDDDDD'}}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-xs uppercase tracking-widest mb-2" style={{color:'#777777'}}>Administrative Lead</div>
              <div className="font-medium text-base" style={{color:'#121212'}}>Terrence Lee</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest mb-2" style={{color:'#777777'}}>Email</div>
              <a href="mailto:terry@geobond.app" className="font-medium underline text-base" style={{color:'#1D9E75'}}>
                terry@geobond.app
              </a>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest mb-2" style={{color:'#777777'}}>Publication</div>
              <div className="font-medium text-base" style={{color:'#121212'}}>Z-Factors</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest mb-2" style={{color:'#777777'}}>Part of</div>
              <div className="font-medium text-base" style={{color:'#121212'}}>Etherom</div>
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
          <p className="text-base leading-relaxed font-serif italic" style={{color:'#333333'}}>
            This site uses a static publishing structure and does not currently use contact forms or public comment databases. All inquiries are handled directly.
          </p>
        </div>
      </section>

      <footer className="border-t pt-6 flex justify-between text-xs" style={{borderColor:'#DDDDDD',color:'#777777'}}>
        <span className="font-mono">Z-Factors · Track A · Etherom</span>
        <Link href="/archive" className="hover:underline">View Archive →</Link>
      </footer>

    </main>
  );
}
