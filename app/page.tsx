import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Z-Factors | Community Portal',
  description: 'Community signals for the Bay Area and beyond.',
  viewport: 'width=device-width, initial-scale=1',
};
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

function getArticles() {
  const analysisDir = path.join(process.cwd(), 'app/analysis');
  try {
    const folders = fs.readdirSync(analysisDir)
      .filter((f: string) => f.match(/^ta-\d+$/i))
      .sort((a: string, b: string) => parseInt(b.replace(/ta-/i,'')) - parseInt(a.replace(/ta-/i,'')));
    return folders.map((folder: string) => {
      try {
        const content = fs.readFileSync(path.join(analysisDir, folder, 'page.tsx'), 'utf8');
        const titleMatch = content.match(/title: ['"]([^'"]+) \| Z-Factors['"]/);
        const scoreMatch = content.match(/Signal[:\s]+(\d+(?:\.\d+)?)\/10/);
        const dateMatch = content.match(/(\d{4}-\d{2}-\d{2})/);
        const isCommentary = /Commentary/i.test(content);
        return {
          id: folder.toUpperCase(),
          slug: folder.toLowerCase(),
          headline: titleMatch?.[1]?.trim() || folder,
          score: scoreMatch?.[1] || '0',
          date: dateMatch?.[1] || '',
          type: isCommentary ? 'Small Town' : 'Big City'
        };
      } catch {
        return { id: folder.toUpperCase(), slug: folder, headline: folder, score: '0', date: '', type: 'Big City' };
      }
    });
  } catch { return []; }
}

const T = '#1D9E75'; const TL = '#E1F5EE'; const TD = '#085041';
const P = '#7F77DD'; const PL = '#EEEDFE'; const PD = '#3C3489';
const A = '#BA7517'; const AL = '#FAEEDA'; const AD = '#633806';
const BL = '#378ADD';
const BD = '#DDDDDD'; const BG = '#FAFAFA';
const TX = '#121212'; const TX3 = '#555555'; const TX4 = '#777777';

function ScoreBadge({ val }: { val: string }) {
  const v = parseFloat(val);
  const bg = v >= 9 ? T : v >= 7 ? A : P;
  return <span style={{fontSize:'10px',fontWeight:500,padding:'1px 6px',borderRadius:'3px',background:bg,color:'#fff',display:'inline-block'}}>{val}/10</span>;
}

function PillarHeader({ color, title, sub, link, href, headerBg }: { color:string, title:string, sub?:string, link:string, href:string, headerBg:string }) {
  return (
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'9px 16px',background:headerBg,borderBottom:`0.5px solid ${BD}`,borderLeft:`3px solid ${color}`}}>
      <div style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'12px',fontWeight:500}}>
        <div style={{width:'6px',height:'6px',borderRadius:'50%',background:color}}></div>
        {title}
        {sub && <span style={{fontSize:'10px',padding:'1px 6px',background:'rgba(255,255,255,0.7)',color:color,borderRadius:'3px',fontWeight:500}}>{sub}</span>}
      </div>
      <a href={href} style={{fontSize:'11px',color:color,textDecoration:'none',fontWeight:500}}>{link}</a>
    </div>
  );
}

export default function HomePage() {
  const articles = getArticles();
  const top5 = articles.slice(0, 5);

  return (
    <main style={{minHeight:'100vh',background:'#fff',color:TX,fontFamily:'ui-sans-serif,system-ui,-apple-system,sans-serif',fontSize:'13px'}}>
      <style>{`
        @media (max-width: 768px) {
          .main-grid { grid-template-columns: 1fr !important; }
          .news-grid { grid-template-columns: 1fr !important; }
          .gov-grid { grid-template-columns: repeat(2,1fr) !important; }
          .biz-grid { grid-template-columns: repeat(2,1fr) !important; }
          .ent-grid { grid-template-columns: repeat(2,1fr) !important; }
          .sidebar { display: none !important; }
          .right-rail { display: none !important; }
          .nav-links { display: none !important; }
          .intro-ctas { flex-direction: column !important; }
          .signal-bar { overflow-x: auto !important; }
        }
      `}</style>

      <nav style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'11px 20px',borderBottom:`0.5px solid ${BD}`}}>
        <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
          <div>
            <div style={{fontSize:'17px',fontWeight:500,letterSpacing:'-0.3px'}}>Z-Factors</div>
            <div style={{fontSize:'10px',letterSpacing:'0.14em',textTransform:'uppercase',color:TX4,marginTop:'1px'}}>Community Portal</div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'6px',fontSize:'12px',color:TX3,border:`0.5px solid ${BD}`,padding:'4px 10px',borderRadius:'6px'}}>
            Bay Area - San Francisco
          </div>
        </div>
        <div style={{display:'flex',gap:'16px',alignItems:'center',fontSize:'12px',color:TX3}}>
          <Link href="/archive" style={{color:TX3,textDecoration:'none'}}>Signals</Link>
          <Link href="/about" style={{color:TX3,textDecoration:'none'}}>About</Link>
          <a href="https://z-factoring.com" style={{fontSize:'11px',padding:'5px 12px',background:P,color:'#fff',borderRadius:'5px',textDecoration:'none',fontWeight:500}}>For government</a>
          <a href="https://geobond.app" style={{fontSize:'11px',padding:'5px 12px',background:T,color:'#fff',borderRadius:'5px',textDecoration:'none',fontWeight:500}}>For business</a>
        </div>
      </nav>

      <div style={{display:'flex',alignItems:'center',borderBottom:`0.5px solid ${BD}`,background:BG,overflowX:'auto'}}>
        <div style={{display:'flex',alignItems:'center',gap:'5px',padding:'7px 14px',borderRight:`0.5px solid ${BD}`,flexShrink:0}}>
          <div style={{width:'5px',height:'5px',borderRadius:'50%',background:T}}></div>
          <span style={{fontSize:'10px',letterSpacing:'0.1em',textTransform:'uppercase',color:T,fontWeight:500}}>Live</span>
        </div>
        {top5.slice(0,4).map((a, i) => (
          <Link key={a.id} href={`/analysis/${a.slug}`} style={{textDecoration:'none',color:'inherit',flexShrink:0}}>
            <div style={{display:'flex',alignItems:'center',gap:'8px',padding:'7px 14px',borderRight:`0.5px solid ${BD}`}}>
              <div style={{width:'5px',height:'5px',borderRadius:'50%',background:i===0?T:i===1?A:P,flexShrink:0}}></div>
              <span style={{fontSize:'11px',color:TX3,whiteSpace:'nowrap',maxWidth:'200px',overflow:'hidden',textOverflow:'ellipsis'}}>{a.headline}</span>
              <ScoreBadge val={a.score} />
            </div>
          </Link>
        ))}
      </div>

      <div style={{padding:'12px 20px',borderBottom:`0.5px solid ${BD}`,background:BG,display:'flex',justifyContent:'space-between',alignItems:'center',gap:'20px'}}>
        <p style={{fontSize:'12px',color:TX3,lineHeight:'1.6',maxWidth:'480px',margin:0}}>
          Z-Factors surfaces community signals before they become crises. Ranked by meaning not clicks. Serving government agencies, local businesses, and the communities they shape.
        </p>
        <div style={{display:'flex',gap:'8px',flexShrink:0,flexWrap:'wrap'}}>
          <a href="https://z-factoring.com" style={{fontSize:'11px',padding:'5px 10px',border:`0.5px solid ${P}`,borderRadius:'5px',color:P,textDecoration:'none',whiteSpace:'nowrap'}}>Government agency access</a>
          <a href="https://geobond.app" style={{fontSize:'11px',padding:'5px 10px',border:`0.5px solid ${A}`,borderRadius:'5px',color:A,textDecoration:'none',whiteSpace:'nowrap'}}>List your business</a>
          <Link href="/about" style={{fontSize:'11px',padding:'5px 10px',border:`0.5px solid ${T}`,borderRadius:'5px',color:T,textDecoration:'none',whiteSpace:'nowrap'}}>Register publication</Link>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr',minHeight:'auto'}}>

        <div style={{borderRight:`0.5px solid ${BD}`}}>
          <div style={{padding:'12px 14px',borderBottom:`0.5px solid ${BD}`}}>
            <div style={{fontSize:'10px',letterSpacing:'0.14em',textTransform:'uppercase',color:TX4,marginBottom:'10px'}}>Location</div>
            {[
              {label:'San Francisco',tag:'Metro'},
              {label:'Oakland',tag:'Metro'},
              {label:'San Jose',tag:'Metro'},
              {label:'Surrounding cities',tag:'->'},
              {label:'Small towns',tag:'->'},
              {label:'Counties',tag:'->'},
            ].map(item => (
              <div key={item.label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'5px 0',borderBottom:`0.5px solid ${BD}`,cursor:'pointer'}}>
                <span style={{fontSize:'12px',color:TX3}}>{item.label}</span>
                <span style={{fontSize:'10px',padding:'1px 5px',borderRadius:'3px',background:item.tag==='Metro'?TL:BG,color:item.tag==='Metro'?TD:TX4}}>{item.tag}</span>
              </div>
            ))}
          </div>
          <div style={{padding:'12px 14px',borderBottom:`0.5px solid ${BD}`}}>
            <div style={{fontSize:'10px',letterSpacing:'0.14em',textTransform:'uppercase',color:TX4,marginBottom:'10px'}}>Signal categories</div>
            {[
              {label:'Water + Environment',val:'10'},
              {label:'Housing + Policy',val:'9'},
              {label:'Economy + Markets',val:'8'},
              {label:'Safety + Emergency',val:'7'},
              {label:'Community + Health',val:'6'},
            ].map(item => (
              <div key={item.label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'5px 0',borderBottom:`0.5px solid ${BD}`,cursor:'pointer'}}>
                <span style={{fontSize:'12px',color:TX3}}>{item.label}</span>
                <ScoreBadge val={item.val} />
              </div>
            ))}
          </div>
          <div style={{padding:'12px 14px'}}>
            <div style={{fontSize:'10px',letterSpacing:'0.14em',textTransform:'uppercase',color:TX4,marginBottom:'10px'}}>Entity type</div>
            {['Government','Business','Publications','Community orgs'].map(item => (
              <div key={item} style={{fontSize:'12px',color:TX3,padding:'5px 0',borderBottom:`0.5px solid ${BD}`,cursor:'pointer'}}>{item}</div>
            ))}
          </div>
        </div>

        <div>
          <div style={{borderBottom:`0.5px solid ${BD}`}}>
            <PillarHeader color={T} title="News - Signals" sub={`Top ${Math.min(5,articles.length)} today`} link="View all signals" href="/archive" headerBg="#E1F5EE" />
            <div style={{display:'grid',gridTemplateColumns:'1fr',background:'#fff'}}>
              {top5.map((a, i) => (
                <Link key={a.id} href={`/analysis/${a.slug}`} style={{textDecoration:'none',color:'inherit'}}>
                  <div style={{padding:'11px 14px',borderBottom:`0.5px solid ${BD}`,borderRight:i%2===0?`0.5px solid ${BD}`:'none',cursor:'pointer'}}>
                    <div style={{display:'flex',alignItems:'center',gap:'6px',marginBottom:'4px'}}>
                      <span style={{color:T,fontWeight:500,fontSize:'10px'}}>#{i+1}</span>
                      <span style={{fontSize:'11px',color:TX4}}>{a.type}</span>
                      <ScoreBadge val={a.score} />
                    </div>
                    <div style={{fontSize:'13px',fontFamily:'Georgia,serif',lineHeight:'1.4',color:TX,marginBottom:'4px'}}>{a.headline}</div>
                    <div style={{fontSize:'11px',color:TX4}}>{a.date}</div>
                  </div>
                </Link>
              ))}
              <div style={{padding:'11px 14px',background:BG,borderBottom:`0.5px solid ${BD}`}}>
                <div style={{fontSize:'11px',color:TX4,marginBottom:'4px'}}>Your publication</div>
                <div style={{fontSize:'13px',fontFamily:'Georgia,serif',color:TX4,fontStyle:'italic',marginBottom:'6px'}}>Register your local publication to be ranked here</div>
                <Link href="/about" style={{fontSize:'11px',color:T,textDecoration:'none'}}>Register now</Link>
              </div>
            </div>
          </div>

          <div style={{borderBottom:`0.5px solid ${BD}`}}>
            <PillarHeader color={P} title="Government - Services" link="View all agencies" href="https://z-factoring.com" headerBg="#EEEDFE" />
            <div className='gov-grid' style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',background:'#FAFAFA'}}>
              {[
                {name:'City Hall',sig:'7',bg:PL},
                {name:'Police Dept',sig:'8',bg:'#FCEBEB'},
                {name:'Fire Dept',sig:'9',bg:AL},
                {name:'Food Banks',sig:'9',bg:TL},
                {name:'Animal Shelter',sig:'6',bg:'#FBEAF0'},
                {name:'Health Services',sig:'7',bg:'#E6F1FB'},
                {name:'Public Works',sig:'8',bg:'#EAF3DE'},
                {name:'Schools',sig:'8',bg:PL},
              ].map((g, i) => (
                <div key={g.name} style={{padding:'12px 14px',borderRight:i%4<3?`0.5px solid ${BD}`:'none',borderBottom:`0.5px solid ${BD}`,cursor:'pointer'}}>
                  <div style={{width:'28px',height:'28px',borderRadius:'6px',background:g.bg,marginBottom:'7px'}}></div>
                  <div style={{fontSize:'12px',fontWeight:500,color:TX,marginBottom:'2px'}}>{g.name}</div>
                  <div style={{fontSize:'10px',color:TX4}}>Signal <ScoreBadge val={g.sig} /></div>
                </div>
              ))}
            </div>
            <a href="https://z-factoring.com" style={{display:'block',margin:'10px 16px',padding:'7px 12px',border:`0.5px solid ${P}`,borderRadius:'6px',fontSize:'11px',color:P,textAlign:'center',textDecoration:'none'}}>Is your agency listed? Apply for Z-Factoring access</a>
          </div>

          <div style={{borderBottom:`0.5px solid ${BD}`}}>
            <PillarHeader color={A} title="Business - Directory" sub="Ranked by signal" link="View all businesses" href="https://geobond.app" headerBg="#FAEEDA" />
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',background:'#fff'}}>
              {[
                {cat:'Restaurants',sig:'8',bar:85,color:T,status:'Food cost: HIGH'},
                {cat:'Real estate',sig:'7',bar:75,color:P,status:'Policy: RISING'},
                {cat:'Banks',sig:'6',bar:65,color:A,status:'Rate: WATCH'},
                {cat:'Insurance',sig:'9',bar:90,color:'#E24B4A',status:'Home: CRITICAL'},
                {cat:'Healthcare',sig:'8',bar:80,color:T,status:'Demand: HIGH'},
                {cat:'Professional',sig:'6',bar:60,color:P,status:'Regulatory: MED'},
              ].map((b, i) => (
                <div key={b.cat} style={{padding:'12px 14px',borderRight:i%3<2?`0.5px solid ${BD}`:'none',borderBottom:`0.5px solid ${BD}`,cursor:'pointer'}}>
                  <div style={{fontSize:'10px',color:TX4,marginBottom:'4px'}}>{b.cat}</div>
                  <div style={{fontSize:'12px',fontWeight:500,color:TX,marginBottom:'2px'}}>Top 5 near you</div>
                  <div style={{fontSize:'11px',color:TX4,marginBottom:'5px'}}>{b.status}</div>
                  <div style={{height:'2px',borderRadius:'1px',background:BD,marginBottom:'3px'}}>
                    <div style={{height:'2px',borderRadius:'1px',background:b.color,width:`${b.bar}%`}}></div>
                  </div>
                  <div style={{fontSize:'10px',color:b.color}}>Signal {b.sig}/10</div>
                </div>
              ))}
            </div>
            <a href="https://geobond.app" style={{display:'block',margin:'10px 16px',padding:'7px 12px',border:`0.5px solid ${A}`,borderRadius:'6px',fontSize:'11px',color:A,textAlign:'center',textDecoration:'none'}}>Get your business ranked here - Apply for GeoBond</a>
          </div>

          <div>
            <PillarHeader color={BL} title="Entertainment - Events" link="Coming soon" href="/about" headerBg="#E6F1FB" />
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',background:'#FAFAFA'}}>
              {[
                {cat:'Sports signals',name:'Warriors home game tonight',meta:'Foot traffic signal: HIGH - businesses near Chase Center',sig:'9'},
                {cat:'Concert signals',name:'3 concerts this week Bay Area',meta:'Venue district signal: RISING - nearby business alert',sig:'8'},
                {cat:'Casino signals',name:'Local casino events this week',meta:'Demand signal: HIGH - parking + dining alert',sig:'7'},
                {cat:'Community signals',name:'5 community events this week',meta:'Government + business signal: ACTIVE - post your notice',sig:'8'},
              ].map((e, i) => (
                <div key={e.cat} style={{padding:'12px 14px',borderRight:i<3?`0.5px solid ${BD}`:'none',cursor:'pointer'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'4px'}}>
                    <div style={{fontSize:'10px',letterSpacing:'0.1em',textTransform:'uppercase',color:TX4}}>{e.cat}</div>
                    <ScoreBadge val={e.sig} />
                  </div>
                  <div style={{fontSize:'12px',fontWeight:500,color:TX,marginBottom:'3px'}}>{e.name}</div>
                  <div style={{fontSize:'11px',color:TX4,lineHeight:'1.5'}}>{e.meta}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{borderLeft:`0.5px solid ${BD}`}}>
          <div style={{padding:'12px 14px',borderBottom:`0.5px solid ${BD}`}}>
            <div style={{fontSize:'10px',letterSpacing:'0.14em',textTransform:'uppercase',color:TX4,marginBottom:'10px'}}>Today signals</div>
            {[
              {label:'Water - Bay Area',val:'10',trend:'+',c:T},
              {label:'Aquifer - AZ',val:'10',trend:'+',c:T},
              {label:'Wild horses - NV',val:'9',trend:'+',c:A},
              {label:'Insurance - CA',val:'9',trend:'+',c:'#E24B4A'},
              {label:'Schools - Oakland',val:'8',trend:'=',c:A},
              {label:'Boeing - Safety',val:'8',trend:'+',c:A},
            ].map(item => (
              <div key={item.label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'5px 0',borderBottom:`0.5px solid ${BD}`,fontSize:'11px'}}>
                <span style={{color:TX3}}>{item.label}</span>
                <span style={{fontWeight:500,color:item.c}}>{item.val} {item.trend}</span>
              </div>
            ))}
          </div>
          <div style={{padding:'12px 14px',borderBottom:`0.5px solid ${BD}`}}>
            <div style={{fontSize:'10px',letterSpacing:'0.14em',textTransform:'uppercase',color:TX4,marginBottom:'10px'}}>Trending entities</div>
            {[
              {name:'SFPUC',val:'12 signals'},
              {name:'Oakland USD',val:'8 signals'},
              {name:'Fed Reserve',val:'7 signals'},
              {name:'CA FAIR Plan',val:'6 signals'},
              {name:'BLM Nevada',val:'5 signals'},
            ].map(item => (
              <div key={item.name} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'5px 0',borderBottom:`0.5px solid ${BD}`,fontSize:'11px'}}>
                <span style={{color:TX3}}>{item.name}</span>
                <span style={{fontWeight:500,color:TX}}>{item.val}</span>
              </div>
            ))}
          </div>
          <div style={{padding:'12px 14px',borderBottom:`0.5px solid ${BD}`}}>
            <div style={{fontSize:'10px',letterSpacing:'0.14em',textTransform:'uppercase',color:TX4,marginBottom:'10px'}}>Publications</div>
            {[
              {name:'SF Chronicle',val:'10/10',c:T},
              {name:'AP News',val:'10/10',c:T},
              {name:'Reuters',val:'9/10',c:A},
              {name:'East Bay Times',val:'8/10',c:A},
              {name:'Oaklandside',val:'8/10',c:A},
            ].map(item => (
              <div key={item.name} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'5px 0',borderBottom:`0.5px solid ${BD}`,fontSize:'11px'}}>
                <span style={{color:TX3}}>{item.name}</span>
                <span style={{fontWeight:500,color:item.c}}>{item.val}</span>
              </div>
            ))}
          </div>
          <div style={{padding:'12px 14px'}}>
            <div style={{fontSize:'10px',letterSpacing:'0.14em',textTransform:'uppercase',color:TX4,marginBottom:'10px'}}>Platform access</div>
            <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
              <a href="https://z-factoring.com" style={{padding:'8px',border:`0.5px solid ${P}`,borderRadius:'6px',fontSize:'11px',color:P,textAlign:'center',textDecoration:'none'}}>Government access</a>
              <a href="https://geobond.app" style={{padding:'8px',border:`0.5px solid ${A}`,borderRadius:'6px',fontSize:'11px',color:A,textAlign:'center',textDecoration:'none'}}>Business access</a>
              <Link href="/about" style={{padding:'8px',border:`0.5px solid ${T}`,borderRadius:'6px',fontSize:'11px',color:T,textAlign:'center',textDecoration:'none',display:'block'}}>Register publication</Link>
              <Link href="/contact" style={{padding:'8px',border:`0.5px solid ${BD}`,borderRadius:'6px',fontSize:'11px',color:TX4,textAlign:'center',textDecoration:'none',display:'block'}}>Submit a signal</Link>
            </div>
          </div>
        </div>

      </div>

      <footer style={{padding:'14px 20px',borderTop:`0.5px solid ${BD}`,display:'flex',justifyContent:'space-between',alignItems:'center',background:BG}}>
        <span style={{fontSize:'11px',color:TX4}}>Z-Factors - Community Portal - Part of Etherom</span>
        <div style={{display:'flex',gap:'16px',fontSize:'11px'}}>
          <Link href="/archive" style={{color:TX4,textDecoration:'none'}}>Archive</Link>
          <Link href="/about" style={{color:TX4,textDecoration:'none'}}>About</Link>
          <Link href="/contact" style={{color:TX4,textDecoration:'none'}}>Contact</Link>
          <a href="https://z-factoring.com" style={{color:TX4,textDecoration:'none'}}>Z-Factoring</a>
          <a href="https://geobond.app" style={{color:TX4,textDecoration:'none'}}>GeoBond</a>
          <a href="https://etherom.com" style={{color:TX4,textDecoration:'none'}}>Etherom</a>
        </div>
      </footer>

    </main>
  );
}
