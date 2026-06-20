'use client';
import { useState, useEffect } from 'react';

type City = { id:string; name:string; state:string; region:string; x:number; y:number; count:number; sources:string[]; };
type LocalSignal = { id:string; city:string; source:string; question:string; z:number; date:string; };
type UserSource = { url:string; name:string; city:string; };

const CITIES: City[] = [
  { id:'sf',  name:'San Francisco', state:'CA', region:'Bay Area', x:68,  y:128, count:4, sources:['sfchronicle.com','mercurynews.com','kron4.com'] },
  { id:'la',  name:'Los Angeles',   state:'CA', region:'LA',       x:82,  y:158, count:2, sources:['latimes.com','laist.com'] },
  { id:'sea', name:'Seattle',       state:'WA', region:'West',     x:75,  y:78,  count:1, sources:['seattletimes.com'] },
  { id:'den', name:'Denver',        state:'CO', region:'West',     x:195, y:138, count:1, sources:['denverpost.com'] },
  { id:'chi', name:'Chicago',       state:'IL', region:'Midwest',  x:298, y:108, count:2, sources:['chicagotribune.com'] },
  { id:'hou', name:'Houston',       state:'TX', region:'Texas',    x:250, y:208, count:1, sources:['houstonchronicle.com'] },
  { id:'dal', name:'Dallas',        state:'TX', region:'Texas',    x:238, y:188, count:1, sources:['dallasnews.com'] },
  { id:'nyc', name:'New York',      state:'NY', region:'NYC',      x:388, y:102, count:5, sources:['nytimes.com','nypost.com','gothamist.com'] },
  { id:'dc',  name:'Washington DC', state:'DC', region:'DC',       x:372, y:128, count:3, sources:['washingtonpost.com','dcist.com'] },
  { id:'mia', name:'Miami',         state:'FL', region:'South',    x:352, y:238, count:1, sources:['miamiherald.com'] },
  { id:'atl', name:'Atlanta',       state:'GA', region:'South',    x:330, y:188, count:1, sources:['ajc.com'] },
  { id:'bos', name:'Boston',        state:'MA', region:'NYC',      x:408, y:88,  count:2, sources:['bostonglobe.com'] },
  { id:'phx', name:'Phoenix',       state:'AZ', region:'West',     x:128, y:168, count:1, sources:['azcentral.com'] },
  { id:'por', name:'Portland',      state:'OR', region:'West',     x:72,  y:95,  count:1, sources:['oregonlive.com'] },
];

const REGIONS = ['All','Bay Area','LA','West','Texas','NYC','DC','Midwest','South'];

const SIGNALS: Record<string, LocalSignal[]> = {
  sf: [
    { id:'l1', city:'sf', source:'SF Chronicle', question:'After three straight rate hikes, at what point does a water district become a tax with better PR?', z:8.8, date:'Jun 19' },
    { id:'l2', city:'sf', source:'Mercury News', question:'When the Bay Bridge retrofit is still incomplete after 30 years, what exactly have we been waiting for?', z:8.4, date:'Jun 18' },
    { id:'l3', city:'sf', source:'KRON4', question:'If BART cuts late night service for the shift workers who built its ridership, who exactly is it still public for?', z:8.1, date:'Jun 17' },
    { id:'l4', city:'sf', source:'SF Chronicle', question:'Oakland housing permit backlog is now 18 months. What is the cost of that wait to the person who needs the unit?', z:7.9, date:'Jun 16' },
  ],
  nyc: [
    { id:'n1', city:'nyc', source:'NY Times', question:'When the MTA raises fares for the fourth time and service frequency drops, who exactly is the system being maintained for?', z:9.0, date:'Jun 19' },
    { id:'n2', city:'nyc', source:'Gothamist', question:'If Rikers Island stays open past every deadline, at what point does the deadline become the policy?', z:8.7, date:'Jun 18' },
    { id:'n3', city:'nyc', source:'NY Times', question:'What does it mean when the largest public school system in America cannot fill half its teacher vacancies?', z:8.9, date:'Jun 17' },
    { id:'n4', city:'nyc', source:'Gothamist', question:'If the city owns the land under a third of its parking lots, who decided not to build housing there?', z:9.1, date:'Jun 16' },
    { id:'n5', city:'nyc', source:'NY Post', question:'When a studio in Brooklyn costs more than a two-bedroom in most of America, what exactly is the housing market allocating?', z:8.3, date:'Jun 15' },
  ],
  dc: [
    { id:'d1', city:'dc', source:'Washington Post', question:'When the agency meant to protect consumers is the one being dismantled, who is protecting consumers?', z:9.2, date:'Jun 19' },
    { id:'d2', city:'dc', source:'DCist', question:'If DC statehood has majority public support and zero Senate votes, what exactly is the Senate representing?', z:8.8, date:'Jun 18' },
    { id:'d3', city:'dc', source:'Washington Post', question:'When metro maintenance delays cost the regional economy more than the maintenance itself, who made that calculation?', z:8.1, date:'Jun 17' },
  ],
  la: [
    { id:'a1', city:'la', source:'LA Times', question:'If insurers can exit California without consequence, who holds the risk that stays behind?', z:9.0, date:'Jun 19' },
    { id:'a2', city:'la', source:'LAist', question:'When a city rebuilds after wildfire without addressing the conditions that caused it, what exactly is it rebuilding?', z:8.6, date:'Jun 18' },
  ],
  chi: [
    { id:'c1', city:'chi', source:'Chicago Tribune', question:'If Chicago closes a school every year and opens a charter with the same zip code, what exactly changed?', z:8.5, date:'Jun 19' },
    { id:'c2', city:'chi', source:'Chicago Tribune', question:'When violence is concentrated in eight zip codes and the budget is not, what does that say about the priority?', z:9.0, date:'Jun 18' },
  ],
};

const defaultSignals = (city: City): LocalSignal[] => [
  { id:`${city.id}-1`, city:city.id, source:city.sources[0]?.split('.')[0] ?? 'Local', question:`What is happening in ${city.name} that the national press is not covering?`, z:7.8, date:'Jun 19' },
];

const G = '#1D9E75', P = '#534AB7';
const eb: React.CSSProperties = { fontSize:'10px', letterSpacing:'.12em', color:'rgba(242,242,240,.35)', textTransform:'uppercase' as const };

export default function GeoPortal() {
  const [sel, setSel]           = useState<City>(CITIES[0]);
  const [region, setRegion]     = useState('All');
  const [userSrc, setUserSrc]   = useState<UserSource[]>([]);
  const [showAdd, setShowAdd]   = useState(false);
  const [newUrl, setNewUrl]     = useState('');
  const [newCity, setNewCity]   = useState('');

  useEffect(() => {
    try { const s = localStorage.getItem('zf_user_sources'); if(s) setUserSrc(JSON.parse(s)); } catch {}
  }, []);

  function save() {
    if(!newUrl.trim()||!newCity.trim()) return;
    const s: UserSource = { url:newUrl.trim().replace(/^https?:\/\//,''), name:newUrl.trim().replace(/^https?:\/\//,'').split('/')[0], city:newCity.trim() };
    const u = [...userSrc, s];
    setUserSrc(u);
    localStorage.setItem('zf_user_sources', JSON.stringify(u));
    setNewUrl(''); setNewCity(''); setShowAdd(false);
  }

  const cities = region === 'All' ? CITIES : CITIES.filter(c => c.region === region);
  const signals = SIGNALS[sel.id] ?? defaultSignals(sel);
  const allSrc  = [...sel.sources, ...userSrc.filter(s => s.city.toLowerCase()===sel.name.toLowerCase()).map(s=>s.url)];

  const inp: React.CSSProperties = { width:'100%', background:'rgba(242,242,240,.05)', border:'0.5px solid rgba(242,242,240,.15)', borderRadius:'8px', color:'#F2F2F0', fontFamily:'system-ui', fontSize:'13px', padding:'8px 10px' };

  return (
    <section style={{ marginBottom:'20px' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'12px', flexWrap:'wrap' }}>
        <span style={eb}>§2 · Local news portal · geographic</span>
        <span style={{ fontSize:'11px', color:G, background:'rgba(29,158,117,.1)', padding:'2px 8px', borderRadius:'999px', border:`0.5px solid rgba(29,158,117,.3)` }}>GeoBond layer</span>
        <button onClick={() => setShowAdd(!showAdd)} style={{ marginLeft:'auto', fontSize:'11px', color:G, background:'none', border:`0.5px solid rgba(29,158,117,.3)`, borderRadius:'999px', padding:'2px 10px', cursor:'pointer', fontFamily:'inherit' }}>+ add your city</button>
      </div>

      <div style={{ border:'0.5px solid rgba(242,242,240,.1)', borderRadius:'12px', background:'rgba(242,242,240,.02)', overflow:'hidden', marginBottom:'10px' }}>
        <div style={{ padding:'10px 14px', borderBottom:'0.5px solid rgba(242,242,240,.08)', display:'flex', gap:'6px', overflowX:'auto' as const }}>
          {REGIONS.map(r => (
            <button key={r} onClick={() => setRegion(r)} style={{ fontSize:'11px', padding:'3px 10px', borderRadius:'999px', whiteSpace:'nowrap' as const, border:`0.5px solid ${region===r?'rgba(29,158,117,.4)':'rgba(242,242,240,.12)'}`, background:region===r?'rgba(29,158,117,.15)':'transparent', color:region===r?G:'rgba(242,242,240,.45)', cursor:'pointer', fontFamily:'inherit' }}>{r}</button>
          ))}
        </div>

        <div style={{ background:'rgba(242,242,240,.02)', padding:'8px 12px' }}>
          <svg viewBox="0 0 480 270" width="100%" role="img" aria-label="US map with local signal city dots">
            <title>Z-Factors US local news map</title>
            <path d="M58,55 L415,55 L435,75 L445,115 L435,155 L415,195 L375,215 L335,225 L295,235 L255,240 L215,235 L175,225 L135,215 L95,195 L65,165 L50,135 L48,95 Z" fill="rgba(242,242,240,.03)" stroke="rgba(242,242,240,.12)" strokeWidth="1"/>
            <path d="M315,215 L335,225 L345,255 L335,268 L325,263 L315,250 L310,230 Z" fill="rgba(242,242,240,.03)" stroke="rgba(242,242,240,.12)" strokeWidth="1"/>
            <line x1="195" y1="55" x2="195" y2="235" stroke="rgba(242,242,240,.05)" strokeWidth="0.5"/>
            <line x1="295" y1="55" x2="295" y2="235" stroke="rgba(242,242,240,.05)" strokeWidth="0.5"/>
            <line x1="48"  y1="148" x2="445" y2="148" stroke="rgba(242,242,240,.05)" strokeWidth="0.5"/>
            {CITIES.map(city => {
              const isSelected = sel.id === city.id;
              const isFiltered = region === 'All' || city.region === region;
              const dotSize    = Math.max(5, Math.min(10, 4 + city.count * 1.5));
              const color      = isSelected ? G : (isFiltered ? 'rgba(29,158,117,.7)' : 'rgba(242,242,240,.2)');
              return (
                <g key={city.id} onClick={() => setSel(city)} style={{ cursor:'pointer' }} opacity={isFiltered ? 1 : 0.25}>
                  {city.count >= 3 && isFiltered && (
                    <circle cx={city.x} cy={city.y} r={dotSize+4} fill="none" stroke={G} strokeWidth="1" opacity="0.3">
                      <animate attributeName="r" values={`${dotSize+2};${dotSize+7};${dotSize+2}`} dur="2s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite"/>
                    </circle>
                  )}
                  {isSelected && <circle cx={city.x} cy={city.y} r={dotSize+5} fill="none" stroke={G} strokeWidth="1.5" opacity="0.6"/>}
                  <circle cx={city.x} cy={city.y} r={dotSize} fill={color} stroke={isSelected?G:'rgba(242,242,240,.2)'} strokeWidth="1"/>
                  {city.count > 1 && <text x={city.x} y={city.y+0.5} textAnchor="middle" dominantBaseline="middle" fontSize="6" fill="rgba(11,11,12,.9)" fontWeight="bold" fontFamily="system-ui">{city.count}</text>}
                  <text x={city.x} y={city.y-dotSize-4} textAnchor="middle" fontSize="8" fill={isSelected?G:'rgba(242,242,240,.5)'} fontFamily="system-ui">{city.name.split(' ')[0]}</text>
                </g>
              );
            })}
            <circle cx="55" cy="258" r="5" fill="rgba(29,158,117,.6)" stroke="rgba(242,242,240,.15)" strokeWidth="1"/>
            <text x="65" y="261" fontSize="8" fill="rgba(242,242,240,.3)" fontFamily="system-ui">signals</text>
            <circle cx="105" cy="258" r="8" fill="rgba(29,158,117,.8)" stroke="rgba(242,242,240,.15)" strokeWidth="1"/>
            <text x="118" y="261" fontSize="8" fill="rgba(242,242,240,.3)" fontFamily="system-ui">3+ pulsing · click city to select</text>
          </svg>
        </div>

        <div style={{ padding:'10px 14px', borderTop:'0.5px solid rgba(242,242,240,.08)', background:'rgba(29,158,117,.04)', display:'flex', alignItems:'center', gap:'10px', flexWrap:'wrap' }}>
          <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:G, flexShrink:0 }}/>
          <span style={{ fontSize:'13px', fontWeight:500, color:G }}>{sel.name}, {sel.state}</span>
          <span style={{ fontSize:'11px', color:'rgba(242,242,240,.4)' }}>· {sel.count} signals today</span>
          <span style={{ fontSize:'10px', color:'rgba(242,242,240,.3)', marginLeft:'auto' }}>{allSrc.join(' · ')}</span>
        </div>
      </div>

      <div style={{ border:'0.5px solid rgba(242,242,240,.1)', borderRadius:'12px', overflow:'hidden' }}>
        <div style={{ display:'grid', gridTemplateColumns:'22px minmax(0,1fr) 44px', gap:'8px', padding:'7px 14px 5px', ...eb }}>
          <div/><div>Signal · source · date</div><div style={{ textAlign:'center' }}>Z</div>
        </div>
        {signals.map((s, i) => (
          <div key={s.id} style={{ display:'grid', gridTemplateColumns:'22px minmax(0,1fr) 44px', gap:'8px', padding:'11px 14px', borderTop:'0.5px solid rgba(242,242,240,.08)', alignItems:'start' }}>
            <div style={{ fontSize:'12px', fontWeight:600, color:G, paddingTop:'2px' }}>L{i+1}</div>
            <div>
              <div style={{ fontFamily:'Georgia,serif', fontSize:'15px', lineHeight:1.4, color:'#F2F2F0' }}>{s.question}</div>
              <div style={{ fontSize:'10px', color:'rgba(242,242,240,.35)', marginTop:'5px' }}>{s.source} · {s.date}</div>
            </div>
            <div style={{ textAlign:'center' }}>
              <span style={{ fontSize:'11px', fontWeight:500, padding:'2px 7px', borderRadius:'6px', background:'rgba(29,158,117,.12)', color:G }}>{s.z}</span>
            </div>
          </div>
        ))}
        <div style={{ padding:'8px 14px', borderTop:'0.5px solid rgba(242,242,240,.08)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontSize:'10px', color:'rgba(242,242,240,.3)' }}>Z-Factored from {sel.name} sources</span>
          <span style={{ fontSize:'11px', color:G }}>click map to switch city</span>
        </div>
      </div>

      {showAdd && (
        <div style={{ marginTop:'10px', border:`0.5px solid rgba(29,158,117,.3)`, borderRadius:'12px', padding:'16px', background:'rgba(29,158,117,.04)' }}>
          <div style={{ fontSize:'13px', fontWeight:500, marginBottom:'12px' }}>Add your city or local source</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'10px' }}>
            <div>
              <label style={{ ...eb, display:'block', marginBottom:'6px' }}>City name</label>
              <input value={newCity} onChange={e => setNewCity(e.target.value)} placeholder="e.g. Austin" style={inp}/>
            </div>
            <div>
              <label style={{ ...eb, display:'block', marginBottom:'6px' }}>News source URL</label>
              <input value={newUrl} onChange={e => setNewUrl(e.target.value)} placeholder="e.g. statesman.com" style={inp}/>
            </div>
          </div>
          <div style={{ display:'flex', gap:'8px' }}>
            <button onClick={save} style={{ padding:'8px 16px', background:G, color:'#fff', border:'none', borderRadius:'8px', fontSize:'13px', cursor:'pointer', fontFamily:'inherit' }}>Add source →</button>
            <button onClick={() => setShowAdd(false)} style={{ padding:'8px 16px', background:'transparent', color:'rgba(242,242,240,.4)', border:'0.5px solid rgba(242,242,240,.15)', borderRadius:'8px', fontSize:'13px', cursor:'pointer', fontFamily:'inherit' }}>Cancel</button>
          </div>
          <div style={{ fontSize:'11px', color:'rgba(242,242,240,.3)', marginTop:'8px' }}>Saved in your browser only · no account needed · no tracking</div>
        </div>
      )}

      {userSrc.length > 0 && (
        <div style={{ marginTop:'10px', padding:'10px 14px', border:'0.5px solid rgba(242,242,240,.08)', borderRadius:'8px', fontSize:'11px', color:'rgba(242,242,240,.4)' }}>
          <span style={{ color:'rgba(242,242,240,.6)', marginRight:'8px' }}>Your added sources:</span>
          {userSrc.map((s,i) => <span key={i} style={{ marginRight:'10px' }}>{s.name} ({s.city})</span>)}
        </div>
      )}
    </section>
  );
}
