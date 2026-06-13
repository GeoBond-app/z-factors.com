import Link from 'next/link';

export const metadata = {
  title: 'Boeing Under Scrutiny Again: FAA Investigates After 737 MAX Dutch Roll Incident | Z-Factors',
  description: 'New safety concerns surface following a potentially serious mid-flight control issue on a Southwest Airlines 737 MAX. Boeings quality control faces renewed questions.',
};

export default function TA022() {
  return (
    <main className="max-w-3xl mx-auto px-8 py-12 space-y-10">

      <header className="border-b border-neutral-200 pb-8">
        <Link href="/" className="text-xs font-mono text-neutral-400 hover:text-neutral-700">
          ← Back Home
        </Link>
        <div className="flex items-center gap-3 mt-6 mb-3">
          <span className="text-xs font-mono text-neutral-400">TA-022 · 2026-06-13</span>
          <span className="text-xs font-mono font-medium px-2 py-0.5 rounded" style={{background:'#E1F5EE',color:'#085041'}}>Signal 8.5/10</span>
          <span className="text-xs font-mono px-2 py-0.5 rounded" style={{background:'#E1F5EE',color:'#085041'}}>Big City</span>
        </div>
        <h1 className="text-4xl font-serif font-normal mt-2 leading-tight">
          Boeing Under Scrutiny Again: FAA Investigates After 737 MAX 'Dutch Roll' Incident
        </h1>
        <p className="text-xl text-neutral-600 mt-4 leading-relaxed">
          New safety concerns surface following a potentially serious mid-flight control issue on a Southwest Airlines 737 MAX. Boeing's quality control faces renewed questions.
        </p>
        <div className="text-xs text-neutral-400 mt-3">
          Source: <a href="#" target="_blank" rel="noopener noreferrer" className="underline">Reuters</a>
        </div>
      </header>

      <section className="space-y-5">
        <div className="flex items-center gap-3 pb-2 border-b border-neutral-100">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:'#1D9E75'}}></div>
          <div>
            <div className="text-sm font-semibold">The real story.</div>
            <div className="text-xs text-neutral-400 italic">What really happened.</div>
          </div>
        </div>
        <div className="space-y-4 text-neutral-800 leading-relaxed">
          <p>The Federal Aviation Administration (FAA) has launched an investigation into a &apos;Dutch roll&apos; incident involving a Southwest Airlines Boeing 737 MAX 8. The event, which occurred on May 25 at an altitude of 34,000 feet, saw the aircraft experience a rare and potentially dangerous yawing and rolling motion. This mechanical issue, affecting the jet&apos;s rudder and ailerons, was detected during a routine post-flight inspection in Honolulu, Hawaii, when maintenance crews discovered damage to structural components related to the standby power control unit.</p>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-3 pb-2 border-b border-neutral-100">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:'#7F77DD'}}></div>
          <div>
            <div className="text-sm font-semibold">The real feeling.</div>
            <div className="text-xs text-neutral-400 italic">How it really lands on people.</div>
          </div>
        </div>
        <div className="space-y-4 text-neutral-800 leading-relaxed">
          <p>A mandatory inspection of the flight control system following the incident revealed &apos;visible damage&apos; to a critical component, raising immediate alarms. Sources within the FAA, speaking to Reuters anonymously due to the ongoing nature of the investigation, confirmed the agency&apos;s involvement. The crew reported no issues during the flight itself, suggesting the damage may have been subtle until detected on the ground. Boeing has been informed and is cooperating with the investigation, as is Southwest Airlines, which has confirmed the incident and their involvement in the ongoing analysis.</p>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-3 pb-2 border-b border-neutral-100">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:'#BA7517'}}></div>
          <div>
            <div className="text-sm font-semibold">The real response.</div>
            <div className="text-xs text-neutral-400 italic">What we can do together.</div>
          </div>
        </div>
        <div className="space-y-4 text-neutral-800 leading-relaxed">
          <p>This latest incident adds to a troubling pattern for Boeing, whose 737 MAX program has been under intense scrutiny following two fatal crashes in 2018 and 2019, and subsequent quality control issues. The FAA&apos;s heightened oversight of Boeing continues, with this &apos;Dutch roll&apos; event prompting further questions about manufacturing consistency and safety protocols. The full extent of the damage and its implications for the broader 737 MAX fleet are currently being assessed by aviation authorities and Boeing&apos;s technical teams.</p>
        </div>
        <div className="border-l-4 pl-5 py-2" style={{borderColor:'#BA7517'}}>
          <p className="text-base leading-relaxed text-neutral-700 italic font-serif">
            An FAA investigation into a &apos;Dutch roll&apos; on a Southwest 737 MAX highlights renewed safety and quality control concerns for Boeing, impacting public trust in air travel.
          </p>
        </div>
      </section>

      <section className="bg-neutral-50 rounded-lg p-5 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Signal Score</span>
          <span className="text-sm font-bold" style={{color:'#1D9E75'}}>8.5/10</span>
        </div>
        <p className="text-sm text-neutral-600"></p>
        <p className="text-xs text-neutral-400 pt-1">Key entities: Federal Aviation Administration (FAA), Boeing, Southwest Airlines, 737 MAX 8, 'Dutch roll' incident, Honolulu, Hawaii</p>
      </section>

      <section className="space-y-4">
        <button
          id="track2-btn-TA-022"
          className="text-sm font-medium border-b border-neutral-900 pb-0.5 hover:text-neutral-500 hover:border-neutral-500 transition-colors bg-transparent cursor-pointer"
          style={{background:'none',padding:'0',textAlign:'left'}}
          data-target="track2-TA-022"
        >
          + See the insight →
        </button>
        <script dangerouslySetInnerHTML={{__html: `
          document.getElementById('track2-btn-TA-022').addEventListener('click', function() {
            var el = document.getElementById('track2-TA-022');
            var btn = document.getElementById('track2-btn-TA-022');
            if (el.style.display === 'none' || el.style.display === '') {
              el.style.display = 'block';
              btn.textContent = '− Hide the insight';
            } else {
              el.style.display = 'none';
              btn.textContent = '+ See the insight →';
            }
          });
        `}} />

        <div id="track2-TA-022" style={{display:'none'}}>
          
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 pb-2 border-b border-neutral-100">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:"#7F77DD"}}></div>
              <div>
                <div className="text-sm font-semibold">The real feeling.</div>
                <div className="text-xs text-neutral-400 italic">How it really lands on people.</div>
              </div>
            </div>
            <p className="text-neutral-800 leading-relaxed">Every time this happens, a chill runs down the spine of frequent flyers. The trust in a seemingly safe journey feels increasingly fragile, replaced by a lurking anxiety over every flight.</p>
          </div>

          
          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-3 pb-2 border-b border-neutral-100">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:"#BA7517"}}></div>
              <div>
                <div className="text-sm font-semibold">The real response.</div>
                <div className="text-xs text-neutral-400 italic">What we can do together.</div>
              </div>
            </div>
            <p className="text-lg font-serif italic leading-relaxed" style={{color:"#BA7517"}}>How might we fundamentally rebuild public trust in aerospace manufacturing and ensure systemic accountability that prioritizes safety above all else?</p>
          </div>
        </div>
      </section>

      <footer className="border-t pt-6 flex justify-between text-sm text-neutral-500">
        <span className="font-mono text-xs">TA-022 · Z-Factors · Track A</span>
        <Link href="/archive" className="hover:text-neutral-700 text-xs">
          View Archive →
        </Link>
      </footer>

    </main>
  );
}
