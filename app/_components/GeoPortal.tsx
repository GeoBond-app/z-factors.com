'use client';
import { useState } from 'react';

type Signal = { q:string; z:number; src:string; date:string };
type City   = { name:string; state:string; count:number; sources:string[]; signals:Signal[] };
type Region = { states:string[]; cities:City[] };

const DATA: Record<string,Region> = {
  'West Coast': {
    states:['CA','OR','WA','AZ','NV'],
    cities:[
      { name:'San Francisco', state:'CA', count:4, sources:['SF Chronicle','Mercury News','KRON4'], signals:[
        { q:'After three straight rate hikes, at what point does a water district become a tax with better PR?', z:8.8, src:'SF Chronicle', date:'Jun 19' },
        { q:'When the Bay Bridge retrofit is still incomplete after 30 years, what exactly have we been waiting for?', z:8.4, src:'Mercury News', date:'Jun 18' },
        { q:'If BART cuts late night service for the shift workers who built its ridership, who exactly is it still public for?', z:8.1, src:'KRON4', date:'Jun 17' },
        { q:'Oakland housing permit backlog is now 18 months. What is the cost of that wait to the person who needs the unit?', z:7.9, src:'SF Chronicle', date:'Jun 16' },
      ]},
      { name:'Los Angeles', state:'CA', count:2, sources:['LA Times','LAist'], signals:[
        { q:'If insurers can exit California without consequence, who holds the risk that stays behind?', z:9.0, src:'LA Times', date:'Jun 19' },
        { q:'When a city rebuilds after wildfire without addressing the conditions that caused it, what exactly is it rebuilding?', z:8.6, src:'LAist', date:'Jun 18' },
      ]},
      { name:'Seattle', state:'WA', count:1, sources:['Seattle Times'], signals:[
        { q:'When Amazon adds a million square feet of office space and the city adds zero affordable units, who exactly is the city planning for?', z:8.3, src:'Seattle Times', date:'Jun 19' },
      ]},
      { name:'Portland', state:'OR', count:1, sources:['Oregon Live'], signals:[
        { q:'If Portland decriminalizes and then recriminalizes the same substances within four years, what exactly was the policy?', z:8.7, src:'Oregon Live', date:'Jun 18' },
      ]},
      { name:'Phoenix', state:'AZ', count:1, sources:['AZ Central'], signals:[
        { q:'When a city in the desert grows by 100,000 people per year, who approved the water supply to sustain it?', z:9.1, src:'AZ Central', date:'Jun 19' },
      ]},
    ]},
  'Northeast': {
    states:['NY','MA','CT','NJ','PA','DC'],
    cities:[
      { name:'New York City', state:'NY', count:5, sources:['NY Times','Gothamist','NY Post'], signals:[
        { q:'When the MTA raises fares for the fourth time and service frequency drops, who exactly is the system being maintained for?', z:9.0, src:'NY Times', date:'Jun 19' },
        { q:'If Rikers Island stays open past every deadline, at what point does the deadline become the policy?', z:8.7, src:'Gothamist', date:'Jun 18' },
        { q:'What does it mean when the largest public school system in America cannot fill half its teacher vacancies?', z:8.9, src:'NY Times', date:'Jun 17' },
        { q:'If the city owns the land under a third of its parking lots, who decided not to build housing there?', z:9.1, src:'Gothamist', date:'Jun 16' },
        { q:'When a studio in Brooklyn costs more than a two-bedroom in most of America, what exactly is the housing market allocating?', z:8.3, src:'NY Post', date:'Jun 15' },
      ]},
      { name:'Washington DC', state:'DC', count:3, sources:['Washington Post','DCist'], signals:[
        { q:'When the agency meant to protect consumers is the one being dismantled, who is protecting consumers?', z:9.2, src:'Washington Post', date:'Jun 19' },
        { q:'If DC statehood has majority public support and zero Senate votes, what exactly is the Senate representing?', z:8.8, src:'DCist', date:'Jun 18' },
        { q:'When metro maintenance delays cost the regional economy more than the maintenance itself, who made that calculation?', z:8.1, src:'Washington Post', date:'Jun 17' },
      ]},
      { name:'Boston', state:'MA', count:2, sources:['Boston Globe'], signals:[
        { q:'When Boston ranks first in education spending and last in Black student graduation rates, what exactly is the spending doing?', z:9.0, src:'Boston Globe', date:'Jun 19' },
        { q:'If the Big Dig cost three times its budget and took twice as long, why is the same firm designing the new transit expansion?', z:8.4, src:'Boston Globe', date:'Jun 18' },
      ]},
    ]},
  'Midwest': {
    states:['IL','OH','MI','MN','WI','IN'],
    cities:[
      { name:'Chicago', state:'IL', count:2, sources:['Chicago Tribune'], signals:[
        { q:'If Chicago closes a school every year and opens a charter with the same zip code, what exactly changed?', z:8.5, src:'Chicago Tribune', date:'Jun 19' },
        { q:'When violence is concentrated in eight zip codes and the budget is not, what does that say about the priority?', z:9.0, src:'Chicago Tribune', date:'Jun 18' },
      ]},
      { name:'Detroit', state:'MI', count:1, sources:['Detroit Free Press'], signals:[
        { q:'When the city that built the American auto industry cannot afford to fix its own traffic lights, who exactly owns the outcome?', z:8.8, src:'Detroit Free Press', date:'Jun 19' },
      ]},
    ]},
  'Mountain & Texas': {
    states:['CO','TX','NM','AZ','UT'],
    cities:[
      { name:'Houston', state:'TX', count:1, sources:['Houston Chronicle'], signals:[
        { q:'When a city with no zoning codes builds the most sprawl in America, is that freedom or is that a choice someone made for you?', z:8.2, src:'Houston Chronicle', date:'Jun 19' },
      ]},
      { name:'Dallas', state:'TX', count:1, sources:['Dallas Morning News'], signals:[
        { q:'If Texas deregulated its power grid and 250 people died in a winter storm, who holds the liability?', z:9.3, src:'Dallas Morning News', date:'Jun 18' },
      ]},
      { name:'Denver', state:'CO', count:1, sources:['Denver Post'], signals:[
        { q:'When Colorado legalizes and taxes cannabis and the tax revenue goes to schools, why are the schools still underfunded?', z:8.6, src:'Denver Post', date:'Jun 19' },
      ]},
    ]},
  'South': {
    states:['FL','GA','TX','NC','SC','VA'],
    cities:[
      { name:'Miami', state:'FL', count:1, sources:['Miami Herald'], signals:[
        { q:'When sea level rise projections make a city uninsurable in 30 years, what exactly are new condo buyers purchasing?', z:9.2, src:'Miami Herald', date:'Jun 19' },
      ]},
      { name:'Atlanta', state:'GA', count:1, sources:['AJC'], signals:[
        { q:'If Atlanta has more Fortune 500 headquarters than any Southern city and a 25% poverty rate, what exactly is the prosperity doing?', z:8.9, src:'AJC', date:'Jun 18' },
      ]},
    ]},
};

const REGIONS: Record<string,{x:number;y:number;w:number;h:number;signals:number}> = {
  'West Coast':       {x:52, y:58, w:100,h:160,signals:9},
  'Mountain & Texas': {x:155,y:100,w:110,h:140,signals:4},
  'Midwest':          {x:230,y:75, w:100,h:110,signals:3},
  'Northeast':        {x:355,y:60, w:80, h:80, signals:10},
  'South':            {x:265,y:170,w:115,h:75, signals:3},
};

const DOTS = [
  {name:'San Francisco', x:68,  y:128, delay:'0.0s'},
  {name:'Los Angeles',   x:82,  y:158, delay:'0.3s'},
  {name:'Seattle',       x:75,  y:78,  delay:'0.6s'},
  {name:'Portland',      x:72,  y:95,  delay:'0.9s'},
  {name:'Phoenix',       x:128, y:168, delay:'1.2s'},
  {name:'Denver',        x:195, y:138, delay:'0.4s'},
  {name:'Chicago',       x:298, y:108, delay:'0.7s'},
  {name:'Detroit',       x:318, y:98,  delay:'1.0s'},
  {name:'New York City', x:388, y:102, delay:'0.2s'},
  {name:'Washington DC', x:372, y:128, delay:'0.5s'},
  {name:'Boston',        x:408, y:88,  delay:'0.8s'},
  {name:'Houston',       x:250, y:208, delay:'1.1s'},
  {name:'Dallas',        x:238, y:188, delay:'1.4s'},
  {name:'Miami',         x:352, y:238, delay:'1.3s'},
  {name:'Atlanta',       x:330, y:188, delay:'0.1s'},
];

type Level = 'us'|'region'|'city';
const G = '#1D9E75';
const eb: React.CSSProperties = {fontSize:'10px',letterSpacing:'.12em',color:'rgba(242,242,240,.35)',textTransform:'uppercase' as const};
const inp: React.CSSProperties = {width:'100%',background:'rgba(242,242,240,.05)',border:'0.5px solid rgba(242,242,240,.15)',borderRadius:'8px',color:'#F2F2F0',fontFamily:'system-ui',fontSize:'13px',padding:'8px 10px'};

export default function GeoPortal() {
  const [level,    setLevel]    = useState<Level>('us');
  const [region,   setRegion]   = useState('');
  const [city,     setCity]     = useState<City|null>(null);
  const [showAdd,  setShowAdd]  = useState(false);
  const [newCity,  setNewCity]  = useState('');
  const [newUrl,   setNewUrl]   = useState('');
  const [addedMsg, setAddedMsg] = useState('');

  function drillRegion(r:string){setRegion(r);setLevel('region');}
  function drillCity(c:City){setCity(c);setLevel('city');}
  function backToUS(){setLevel('us');setRegion('');setCity(null);}
  function backToRegion(){setLevel('region');setCity(null);}

  function addSource(){
    if(!newCity.trim()||!newUrl.trim()) return;
    setAddedMsg(`Added ${newUrl} for ${newCity}. Pipeline Z-Factors local signals within 24h.`);
    setNewCity('');setNewUrl('');setShowAdd(false);
    setTimeout(()=>setAddedMsg(''),5000);
  }

  const cities = DATA[region]?.cities ?? [];

  return (
    <section style={{marginBottom:'20px'}}>
      <style>{`
        @keyframes geopulse {
          0%,100% { opacity:0.8; r:2.5; }
          50%      { opacity:0.2; r:5;   }
        }
      `}</style>

      <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'12px',flexWrap:'wrap'}}>
        <span style={eb}>§2 · Local news portal · geographic</span>
        <span style={{fontSize:'11px',color:G,background:'rgba(29,158,117,.1)',padding:'2px 8px',borderRadius:'999px',border:`0.5px solid rgba(29,158,117,.3)`}}>GeoBond · AR ready</span>
        <button onClick={()=>setShowAdd(!showAdd)} style={{marginLeft:'auto',fontSize:'11px',color:G,background:'none',border:`0.5px solid rgba(29,158,117,.3)`,borderRadius:'999px',padding:'2px 10px',cursor:'pointer',fontFamily:'inherit'}}>+ add your city</button>
      </div>

      {level!=='us'&&(
        <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'12px',fontSize:'12px',flexWrap:'wrap'}}>
          <button onClick={backToUS} style={{color:G,background:'none',border:'none',cursor:'pointer',fontFamily:'inherit',fontSize:'12px'}}>🇺🇸 United States</button>
          {level==='region'&&<><span style={{color:'rgba(242,242,240,.35)'}}>›</span><span style={{color:'#F2F2F0',fontWeight:500}}>{region}</span></>}
          {level==='city'&&<><span style={{color:'rgba(242,242,240,.35)'}}>›</span><button onClick={backToRegion} style={{color:G,background:'none',border:'none',cursor:'pointer',fontFamily:'inherit',fontSize:'12px'}}>{region}</button><span style={{color:'rgba(242,242,240,.35)'}}>›</span><span style={{color:'#F2F2F0',fontWeight:500}}>{city?.name}</span></>}
        </div>
      )}

      {level==='us'&&(
        <div style={{border:'0.5px solid rgba(242,242,240,.1)',borderRadius:'12px',background:'rgba(242,242,240,.02)',overflow:'hidden'}}>
          <div style={{padding:'10px 14px',borderBottom:'0.5px solid rgba(242,242,240,.08)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <span style={{fontSize:'13px',fontWeight:500}}>United States</span>
            <span style={{fontSize:'11px',color:'rgba(242,242,240,.4)'}}>Click a region to drill in →</span>
          </div>
          <div style={{padding:'8px 12px'}}>
            <svg viewBox="0 0 480 270" width="100%" role="img" aria-label="US map click region to navigate">
              <title>Z-Factors US local news map</title>
              <path d="M58,55 L415,55 L435,75 L445,115 L435,155 L415,195 L375,215 L335,225 L295,235 L255,240 L215,235 L175,225 L135,215 L95,195 L65,165 L50,135 L48,95 Z" fill="rgba(242,242,240,.03)" stroke="rgba(242,242,240,.1)" strokeWidth="1"/>
              <path d="M315,215 L335,225 L345,255 L335,268 L325,263 L315,250 L310,230 Z" fill="rgba(242,242,240,.03)" stroke="rgba(242,242,240,.1)" strokeWidth="1"/>
              <line x1="195" y1="55" x2="195" y2="235" stroke="rgba(242,242,240,.05)" strokeWidth="0.5"/>
              <line x1="295" y1="55" x2="295" y2="235" stroke="rgba(242,242,240,.05)" strokeWidth="0.5"/>
              <line x1="48"  y1="148" x2="445" y2="148" stroke="rgba(242,242,240,.05)" strokeWidth="0.5"/>

              {Object.entries(REGIONS).map(([name,pos])=>(
                <g key={name} onClick={()=>drillRegion(name)} style={{cursor:'pointer'}}>
                  <rect x={pos.x} y={pos.y} width={pos.w} height={pos.h} rx="4"
                    fill="rgba(29,158,117,.05)" stroke="rgba(29,158,117,.2)" strokeWidth="0.5"/>
                  <text x={pos.x+pos.w/2} y={pos.y+pos.h/2-6} textAnchor="middle" fontSize="9" fill="rgba(29,158,117,.8)" fontFamily="system-ui">{name}</text>
                  <text x={pos.x+pos.w/2} y={pos.y+pos.h/2+7} textAnchor="middle" fontSize="8" fill="rgba(29,158,117,.5)" fontFamily="system-ui">{pos.signals} signals ›</text>
                </g>
              ))}

              {DOTS.map(dot=>(
                <circle
                  key={dot.name}
                  cx={dot.x}
                  cy={dot.y}
                  r="3"
                  fill={G}
                  style={{
                    animation:`geopulse 2s ease-in-out infinite`,
                    animationDelay: dot.delay,
                  }}
                />
              ))}

              <text x="52" y="260" fontSize="8" fill="rgba(242,242,240,.3)" fontFamily="system-ui">● live signals · click region · AR layer → GeoBond</text>
            </svg>
          </div>
          <div style={{padding:'10px 14px',borderTop:'0.5px solid rgba(242,242,240,.08)',display:'flex',gap:'20px',flexWrap:'wrap'}}>
            <span style={{fontSize:'11px',color:'rgba(242,242,240,.6)'}}>🟢 <strong style={{color:G}}>29</strong> signals today</span>
            <span style={{fontSize:'11px',color:'rgba(242,242,240,.6)'}}>📍 <strong>15</strong> cities tracked</span>
            <span style={{fontSize:'11px',color:'rgba(242,242,240,.6)'}}>📰 <strong>38</strong> local sources</span>
            <span style={{fontSize:'11px',color:'rgba(242,242,240,.4)',marginLeft:'auto',fontStyle:'italic'}}>AR · B2B banner → GeoBond</span>
          </div>
        </div>
      )}

      {level==='region'&&(
        <div style={{border:'0.5px solid rgba(242,242,240,.1)',borderRadius:'12px',overflow:'hidden'}}>
          <div style={{padding:'12px 14px',borderBottom:'0.5px solid rgba(242,242,240,.08)'}}>
            <div style={{fontSize:'13px',fontWeight:500,marginBottom:'10px'}}>Select a city in {region}</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:'8px'}}>
              {cities.map(c=>(
                <button key={c.name} onClick={()=>drillCity(c)}
                  style={{padding:'10px 12px',borderRadius:'10px',border:'0.5px solid rgba(242,242,240,.12)',background:'rgba(242,242,240,.03)',cursor:'pointer',fontFamily:'inherit',textAlign:'left' as const}}>
                  <div style={{display:'flex',alignItems:'center',gap:'7px',marginBottom:'4px'}}>
                    <span style={{width:'7px',height:'7px',borderRadius:'50%',background:G,display:'inline-block',flexShrink:0}}/>
                    <span style={{fontSize:'13px',fontWeight:500,color:'#F2F2F0'}}>{c.name}, {c.state}</span>
                  </div>
                  <div style={{fontSize:'11px',color:'rgba(242,242,240,.4)',paddingLeft:'14px'}}>{c.count} signal{c.count>1?'s':''} · {c.sources[0]}</div>
                </button>
              ))}
            </div>
          </div>
          <div style={{padding:'10px 14px',fontSize:'11px',color:'rgba(242,242,240,.4)'}}>
            Don't see your city?{' '}
            <button onClick={()=>setShowAdd(true)} style={{color:G,background:'none',border:'none',cursor:'pointer',fontFamily:'inherit',fontSize:'11px'}}>+ add it →</button>
          </div>
        </div>
      )}

      {level==='city'&&city&&(
        <div style={{border:'0.5px solid rgba(242,242,240,.1)',borderRadius:'12px',overflow:'hidden'}}>
          <div style={{padding:'12px 14px',borderBottom:'0.5px solid rgba(242,242,240,.08)',display:'flex',alignItems:'center',gap:'10px',flexWrap:'wrap'}}>
            <div style={{width:'8px',height:'8px',borderRadius:'50%',background:G,flexShrink:0}}/>
            <span style={{fontSize:'13px',fontWeight:500,color:G}}>{city.name}, {city.state}</span>
            <span style={{fontSize:'11px',color:'rgba(242,242,240,.4)'}}>· {city.count} signals today</span>
            <span style={{fontSize:'10px',color:'rgba(242,242,240,.3)',marginLeft:'auto'}}>{city.sources.join(' · ')}</span>
          </div>
          <div style={{padding:'5px 14px 0',...eb,paddingTop:'7px'}}>
            <div style={{display:'grid',gridTemplateColumns:'22px minmax(0,1fr) 44px',gap:'8px'}}>
              <div/><div>Signal · source · date</div><div style={{textAlign:'center'}}>Z</div>
            </div>
          </div>
          {city.signals.map((s,i)=>(
            <div key={i} style={{display:'grid',gridTemplateColumns:'22px minmax(0,1fr) 44px',gap:'8px',padding:'11px 14px',borderTop:'0.5px solid rgba(242,242,240,.08)',alignItems:'start'}}>
              <div style={{fontSize:'12px',fontWeight:600,color:G,paddingTop:'2px'}}>L{i+1}</div>
              <div>
                <div style={{fontFamily:'Georgia,serif',fontSize:'15px',lineHeight:1.4,color:'#F2F2F0'}}>{s.q}</div>
                <div style={{fontSize:'10px',color:'rgba(242,242,240,.35)',marginTop:'5px'}}>{s.src} · {s.date}</div>
              </div>
              <div style={{textAlign:'center'}}>
                <span style={{fontSize:'11px',fontWeight:500,padding:'2px 7px',borderRadius:'6px',background:'rgba(29,158,117,.12)',color:G}}>{s.z}</span>
              </div>
            </div>
          ))}
          <div style={{padding:'10px 14px',borderTop:'0.5px solid rgba(242,242,240,.08)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
            <span style={{fontSize:'10px',color:'rgba(242,242,240,.3)'}}>Z-Factored · AR banner layer → GeoBond B2B</span>
            <button onClick={backToRegion} style={{fontSize:'11px',color:G,background:'none',border:'none',cursor:'pointer',fontFamily:'inherit'}}>← back to {region}</button>
          </div>
        </div>
      )}

      {showAdd&&(
        <div style={{marginTop:'10px',border:`0.5px solid rgba(29,158,117,.3)`,borderRadius:'12px',padding:'16px',background:'rgba(29,158,117,.04)'}}>
          <div style={{fontSize:'13px',fontWeight:500,marginBottom:'12px'}}>Add your city or local source</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'10px'}}>
            <div><label style={{...eb,display:'block',marginBottom:'6px'}}>City name</label><input value={newCity} onChange={e=>setNewCity(e.target.value)} placeholder="e.g. Austin, TX" style={inp}/></div>
            <div><label style={{...eb,display:'block',marginBottom:'6px'}}>News source URL</label><input value={newUrl} onChange={e=>setNewUrl(e.target.value)} placeholder="e.g. statesman.com" style={inp}/></div>
          </div>
          <div style={{display:'flex',gap:'8px'}}>
            <button onClick={addSource} style={{padding:'8px 16px',background:G,color:'#fff',border:'none',borderRadius:'8px',fontSize:'13px',cursor:'pointer',fontFamily:'inherit'}}>Add source →</button>
            <button onClick={()=>setShowAdd(false)} style={{padding:'8px 16px',background:'transparent',color:'rgba(242,242,240,.4)',border:'0.5px solid rgba(242,242,240,.15)',borderRadius:'8px',fontSize:'13px',cursor:'pointer',fontFamily:'inherit'}}>Cancel</button>
          </div>
          <div style={{fontSize:'11px',color:'rgba(242,242,240,.3)',marginTop:'8px'}}>Browser only · no account · no tracking</div>
        </div>
      )}

      {addedMsg&&(
        <div style={{marginTop:'10px',padding:'10px 14px',borderRadius:'8px',background:'rgba(29,158,117,.1)',border:`0.5px solid rgba(29,158,117,.3)`,fontSize:'12px',color:G}}>{addedMsg}</div>
      )}

    </section>
  );
}
