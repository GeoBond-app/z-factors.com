'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL ? createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
) : null;

const T='#1D9E75';const A='#BA7517';const R='#E24B4A';const P='#7F77DD';const BL='#378ADD';const BD='rgba(128,128,128,0.15)';
const SIGNAL_MAKERS=["Economist's Signal","Realtor's Insight","Farmer's Insight","Contract Watch","City Council Watch","Water Authority Watch","First Responder Watch","Government's Position","Community's Voice"];
const W_REPORTS=[{id:'W1',title:'Water Crisis Report',updated:'Jun 20',live:true},{id:'W2',title:'Wastewater Systems',updated:'Jun 18',live:false},{id:'W3',title:'Waste Disposal',updated:'Jun 15',live:false},{id:'W4',title:'Universal Water Bill Comparison',updated:'Jun 20',live:true},{id:'W5',title:'Construction Permit Approval Times',updated:'Jun 19',live:false},{id:'W6',title:'Seismic + Emergency Response',updated:'Jun 20',live:true}];

function slugify(str:string){return(str||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/-+/g,'-').slice(0,80).replace(/-$/,'');}
function ZBadge({score}:{score:number}){const bg=score>=9.5?R:score>=9?T:score>=8?A:P;return(<span style={{fontSize:'10px',padding:'1px 6px',borderRadius:'3px',fontWeight:600,color:'#fff',background:bg,flexShrink:0}}>Z {score}</span>);}

interface Article{id:string;headline:string;subheadline:string;publish_date:string;z_factor_score:number;teaser_question:string;track2a_feeling:string;track2b_question:string;original_source:string;series:string;sub_tag:string;status:string;}

export default function HomePage(){
  const [articles,setArticles]=useState<Article[]>([]);
  const [activeFilter,setActiveFilter]=useState('all');
  const [city,setCity]=useState('San Francisco Bay Area');
  const [cityOpen,setCityOpen]=useState(false);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    async function load(){
      if(!supabase){setLoading(false);return;}
      const{data}=await supabase.from('articles').select('*').order('z_factor_score',{ascending:false}).limit(50);
      setArticles(data||[]);
      setLoading(false);
    }
    load();
  },[]);

  const filtered=articles.filter(a=>{
    if(activeFilter==='all')return true;
    const text=(a.headline+' '+(a.subheadline||'')+' '+(a.sub_tag||'')+' '+(a.series||'')).toLowerCase();
    return text.includes(activeFilter.toLowerCase().replace(/[^a-z ]/g,'').trim().split(' ')[0]);
  });
  const top5=articles.slice(0,5);

  return(
    <main style={{minHeight:'100vh',fontFamily:'var(--font-geist-sans,system-ui,sans-serif)',fontSize:'13px'}}>
      <style>{`
        .zf-grid{display:grid;grid-template-columns:1fr 190px}
        .zf-sidebar{display:block;font-size:11px;border-left:0.5px solid rgba(128,128,128,0.15);position:sticky;top:0;height:100vh;overflow-y:auto}
        .zf-filter{display:flex;gap:5px;padding:6px 14px;border-bottom:0.5px solid rgba(128,128,128,0.15);background:rgba(128,128,128,0.03);overflow-x:auto;scrollbar-width:none}
        .zf-ticker{padding:5px 16px;display:flex;gap:12px;align-items:center;overflow-x:auto;scrollbar-width:none;border-bottom:0.5px solid rgba(128,128,128,0.15)}
        @media(max-width:768px){
          .zf-grid{grid-template-columns:1fr}
          .zf-sidebar{display:none}
        }
      `}</style>

      <header style={{padding:'8px 16px',borderBottom:`0.5px solid ${BD}`,display:'flex',justifyContent:'space-between',alignItems:'center',position:'sticky',top:0,zIndex:50,background:'var(--background,#fff)'}}>
        <div><div style={{fontSize:'16px',fontWeight:600,letterSpacing:'-0.3px'}}>Z-Factors</div><div style={{fontSize:'9px',opacity:0.5}}>The score behind every story.</div></div>
        <div style={{display:'flex',gap:'6px',alignItems:'center'}}>
          <Link href="/archive" style={{fontSize:'10px',opacity:0.5,textDecoration:'none',color:'inherit'}}>Archive</Link>
          <a href="https://z-factoring.com" style={{fontSize:'10px',padding:'3px 9px',background:P,color:'#fff',borderRadius:'4px',textDecoration:'none'}}>Gov</a>
          <a href="https://geobond.app" style={{fontSize:'10px',padding:'3px 9px',background:T,color:'#fff',borderRadius:'4px',textDecoration:'none'}}>Biz</a>
        </div>
      </header>

      <div style={{padding:'4px 16px',borderBottom:`0.5px solid ${BD}`,background:'rgba(128,128,128,0.04)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontSize:'10px',opacity:0.5,fontStyle:'italic'}}>We read the world's signals so you don't have to. We summarize. We score. You decide.</span>
        <span style={{fontSize:'9px',color:T}}>Daily</span>
      </div>

      <div className="zf-ticker">
        <div style={{display:'flex',alignItems:'center',gap:'4px',flexShrink:0}}>
          <div style={{width:'5px',height:'5px',borderRadius:'50%',background:T}}/>
          <span style={{fontSize:'9px',letterSpacing:'1px',textTransform:'uppercase',color:T,fontWeight:600}}>Live</span>
        </div>
        {top5.map((a,i)=>(
          <Link key={i} href={`/article/${slugify(a.headline)}`} style={{textDecoration:'none',color:'inherit',flexShrink:0,display:'flex',alignItems:'center',gap:'6px'}}>
            <span style={{fontSize:'11px',opacity:0.6,maxWidth:'160px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{a.headline}</span>
            <ZBadge score={a.z_factor_score}/>
          </Link>
        ))}
      </div>

      <div className="zf-grid">
        <div style={{borderRight:`0.5px solid ${BD}`}}>

          <div className="zf-filter">
            <button onClick={()=>setActiveFilter('all')} style={{fontSize:'10px',padding:'2px 8px',borderRadius:'10px',border:`0.5px solid ${activeFilter==='all'?T:BD}`,background:activeFilter==='all'?T:'transparent',color:activeFilter==='all'?'#fff':'inherit',cursor:'pointer',flexShrink:0}}>All</button>
            {SIGNAL_MAKERS.map(sm=><button key={sm} onClick={()=>setActiveFilter(activeFilter===sm?'all':sm)} style={{fontSize:'10px',padding:'2px 8px',borderRadius:'10px',border:`0.5px solid ${activeFilter===sm?T:BD}`,background:activeFilter===sm?T:'transparent',color:activeFilter===sm?'#fff':'inherit',cursor:'pointer',whiteSpace:'nowrap',flexShrink:0}}>{sm}</button>)}
          </div>

          <div style={{padding:'7px 14px',borderBottom:`0.5px solid ${BD}`,borderLeft:`3px solid ${T}`,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
              <span style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'1.2px',opacity:0.5,fontWeight:600}}>§1 · Top signals</span>
              <span style={{fontSize:'10px',color:T,fontWeight:500}}>· {city}</span>
            </div>
            <span style={{fontSize:'9px',opacity:0.4}}>Trends</span>
          </div>

          {loading&&<div style={{padding:'20px 14px',opacity:0.4,fontSize:'13px'}}>Loading signals...</div>}
          {!loading&&filtered.length===0&&<div style={{padding:'20px 14px',opacity:0.4,fontSize:'13px'}}>No signals yet.</div>}

          {filtered.slice(0,10).map((a,i)=>(
            <div key={a.id||i} style={{padding:'14px 14px',borderBottom:`0.5px solid ${BD}`}}>

              <div style={{display:'flex',alignItems:'center',gap:'6px',marginBottom:'6px',flexWrap:'wrap'}}>
                <span style={{color:T,fontSize:'10px',fontWeight:600}}>#{i+1}</span>
                <ZBadge score={a.z_factor_score}/>
                {a.original_source&&<span style={{fontSize:'10px',opacity:0.5}}>{a.original_source}</span>}
                <span style={{fontSize:'10px',opacity:0.4,marginLeft:'auto'}}>{a.publish_date}</span>
              </div>

              <Link href={`/article/${slugify(a.headline)}`} style={{textDecoration:'none',color:'inherit'}}>
                <div style={{fontSize:'15px',fontWeight:500,lineHeight:1.4,marginBottom:'6px'}}>{a.headline}</div>
              </Link>

              {a.subheadline&&(
                <div style={{fontSize:'12px',opacity:0.6,lineHeight:1.6,marginBottom:'10px'}}>{a.subheadline}</div>
              )}

              {a.track2a_feeling&&(
                <div style={{borderLeft:`2px solid ${T}`,paddingLeft:'10px',marginBottom:'10px'}}>
                  <div style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'1px',color:T,fontWeight:600,marginBottom:'4px',opacity:0.7}}>Our insight</div>
                  <div style={{fontSize:'12px',lineHeight:1.75,opacity:0.85}}>{a.track2a_feeling}</div>
                </div>
              )}

              {a.track2b_question&&(
                <div style={{borderLeft:`2px solid rgba(128,128,128,0.25)`,paddingLeft:'10px',marginBottom:'8px'}}>
                  <div style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'1px',opacity:0.4,fontWeight:600,marginBottom:'4px'}}>The question</div>
                  <div style={{fontSize:'12px',fontStyle:'italic',lineHeight:1.75,opacity:0.75}}>{a.track2b_question}</div>
                </div>
              )}

              {a.teaser_question&&!a.track2a_feeling&&(
                <div style={{borderLeft:`2px solid rgba(128,128,128,0.25)`,paddingLeft:'10px',marginBottom:'8px'}}>
                  <div style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'1px',opacity:0.4,fontWeight:600,marginBottom:'4px'}}>The question</div>
                  <div style={{fontSize:'12px',fontStyle:'italic',lineHeight:1.75,opacity:0.75}}>{a.teaser_question}</div>
                </div>
              )}

              <div style={{display:'flex',gap:'8px',alignItems:'center',flexWrap:'wrap',marginTop:'4px'}}>
                {a.sub_tag&&<span style={{fontSize:'9px',padding:'1px 6px',border:`0.5px solid ${BD}`,borderRadius:'10px',opacity:0.5}}>{a.sub_tag}</span>}
                {a.series&&<span style={{fontSize:'9px',padding:'1px 6px',border:`0.5px solid ${BD}`,borderRadius:'10px',opacity:0.5}}>{a.series}</span>}
                <Link href={`/article/${slugify(a.headline)}`} style={{fontSize:'10px',color:T,textDecoration:'none',marginLeft:'auto'}}>Read full signal →</Link>
              </div>
            </div>
          ))}

          <div style={{height:'50px',borderBottom:`0.5px solid ${BD}`,background:'rgba(128,128,128,0.04)',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span style={{fontSize:'10px',opacity:0.3,border:`0.5px dashed ${BD}`,padding:'4px 12px',borderRadius:'4px'}}>Advertisement · 728×90</span>
          </div>

          <div style={{padding:'7px 14px',borderBottom:`0.5px solid ${BD}`,borderLeft:`3px solid ${BL}`,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <span style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'1.2px',opacity:0.5,fontWeight:600}}>§2 · Local news portal</span>
            <Link href="/portal" style={{fontSize:'9px',color:BL,textDecoration:'none'}}>Map ↗</Link>
          </div>
          <div style={{padding:'10px 14px',borderBottom:`0.5px solid ${BD}`,display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'6px'}}>
            {['San Francisco','Oakland','San Jose'].map(c=>(
              <div key={c} onClick={()=>setCity(c)} style={{padding:'7px',border:`0.5px solid ${BD}`,borderRadius:'4px',cursor:'pointer'}}>
                <div style={{fontSize:'10px',opacity:0.5,marginBottom:'2px'}}>{c}</div>
                <div style={{fontSize:'12px',fontWeight:500}}>— signals</div>
              </div>
            ))}
            <div style={{gridColumn:'1/-1',fontSize:'10px',color:BL,paddingTop:'2px'}}><Link href="/portal" style={{color:BL,textDecoration:'none'}}>All local signals → Show map ↗</Link></div>
          </div>

          <div style={{padding:'7px 14px',borderBottom:`0.5px solid ${BD}`,borderLeft:`3px solid ${P}`}}>
            <span style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'1.2px',opacity:0.5,fontWeight:600}}>§3 · World signal watch</span>
          </div>
          <div style={{padding:'10px 14px',borderBottom:`0.5px solid ${BD}`}}>
            {articles.filter(a=>/global|world|international|china|europe/i.test(a.headline+(a.subheadline||''))).slice(0,3).map((a,i)=>(
              <Link key={i} href={`/article/${slugify(a.headline)}`} style={{textDecoration:'none',color:'inherit',display:'flex',gap:'8px',alignItems:'flex-start',marginBottom:'8px'}}>
                <ZBadge score={a.z_factor_score}/>
                <div><div style={{fontSize:'12px',fontWeight:500,marginBottom:'2px'}}>{a.headline}</div><div style={{fontSize:'10px',opacity:0.5}}>{a.original_source}</div></div>
              </Link>
            ))}
            {articles.filter(a=>/global|world|international/i.test(a.headline)).length===0&&<div style={{fontSize:'11px',opacity:0.4}}>World signals loading…</div>}
          </div>

          <div style={{padding:'7px 14px',borderBottom:`0.5px solid ${BD}`,borderLeft:`3px solid ${R}`,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <span style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'1.2px',opacity:0.5,fontWeight:600}}>§4 · Z-Factors editorial</span>
            <div style={{display:'flex',gap:'4px'}}>{['Suppressed','Pattern','Classified'].map(t=><span key={t} style={{fontSize:'9px',padding:'1px 6px',border:`0.5px solid ${BD}`,borderRadius:'10px',opacity:0.5}}>{t}</span>)}</div>
          </div>
          <div style={{padding:'10px 14px',borderBottom:`0.5px solid ${BD}`,display:'grid',gap:'10px'}}>
            {articles.filter(a=>a.z_factor_score>=9.5).slice(0,3).map((a,i)=>(
              <Link key={i} href={`/article/${slugify(a.headline)}`} style={{textDecoration:'none',color:'inherit',display:'flex',gap:'8px',alignItems:'flex-start'}}>
                <ZBadge score={a.z_factor_score}/>
                <div>
                  <div style={{fontSize:'12px',fontWeight:500,marginBottom:'4px'}}>{a.headline}</div>
                  {a.track2b_question&&<div style={{fontSize:'11px',fontStyle:'italic',opacity:0.6,lineHeight:1.6}}>{a.track2b_question}</div>}
                </div>
              </Link>
            ))}
            {articles.filter(a=>a.z_factor_score>=9.5).length===0&&<div style={{fontSize:'11px',opacity:0.4}}>Editorial signals loading…</div>}
          </div>

          <div style={{height:'50px',borderBottom:`0.5px solid ${BD}`,background:'rgba(128,128,128,0.04)',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span style={{fontSize:'10px',opacity:0.3,border:`0.5px dashed ${BD}`,padding:'4px 12px',borderRadius:'4px'}}>Advertisement · 728×90</span>
          </div>

          <div style={{padding:'7px 14px',borderBottom:`0.5px solid ${BD}`,borderLeft:`3px solid ${A}`}}>
            <span style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'1.2px',opacity:0.5,fontWeight:600}}>§5 · Heroes in action</span>
          </div>
          <div style={{padding:'10px 14px',borderBottom:`0.5px solid ${BD}`,display:'flex',gap:'8px'}}>
            <span style={{fontSize:'10px',padding:'1px 6px',borderRadius:'3px',fontWeight:600,color:'#fff',background:A,flexShrink:0,alignSelf:'flex-start'}}>Z 8.5</span>
            <div>
              <div style={{fontSize:'12px',fontWeight:500,marginBottom:'3px'}}>The community carrying the weight nobody counted</div>
              <div style={{fontSize:'11px',opacity:0.6,lineHeight:1.5}}>Signal from the ground. Before it becomes news.</div>
              <Link href="/archive" style={{fontSize:'10px',color:A,textDecoration:'none',display:'block',marginTop:'4px'}}>All human signals →</Link>
            </div>
          </div>

          <div style={{padding:'7px 14px',borderBottom:`0.5px solid ${BD}`,borderLeft:`3px solid ${BL}`,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
              <span style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'1.2px',opacity:0.5,fontWeight:600}}>§6 · Local government report</span>
              <span style={{fontSize:'9px',padding:'1px 6px',borderRadius:'3px',background:'rgba(55,138,221,0.12)',color:BL,fontWeight:500}}>Ongoing</span>
            </div>
            <a href="https://z-factoring.com" style={{fontSize:'9px',color:P,textDecoration:'none'}}>Full intel →</a>
          </div>
          <div style={{padding:'4px 14px',borderBottom:`0.5px solid ${BD}`,background:'rgba(128,128,128,0.03)'}}>
            <span style={{fontSize:'10px',opacity:0.5}}>Permanent research · local first · available to all local news sites</span>
          </div>
          {W_REPORTS.map(w=>(
            <div key={w.id} style={{padding:'10px 14px',borderBottom:`0.5px solid ${BD}`,display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer'}}>
              <div style={{display:'flex',gap:'8px',alignItems:'flex-start'}}>
                <span style={{fontSize:'9px',padding:'2px 6px',borderRadius:'3px',background:'rgba(55,138,221,0.12)',color:BL,fontWeight:500,flexShrink:0}}>{w.id}</span>
                <div><div style={{fontSize:'12px',fontWeight:500,marginBottom:'2px'}}>{w.title}</div><div style={{fontSize:'10px',opacity:0.5}}>Updated {w.updated}</div></div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:'4px',flexShrink:0}}>
                {w.live&&<div style={{width:'5px',height:'5px',borderRadius:'50%',background:T}}/>}
                <span style={{fontSize:'10px',color:BL}}>→</span>
              </div>
            </div>
          ))}

          <footer style={{padding:'14px 16px',borderTop:`0.5px solid ${BD}`,display:'flex',justifyContent:'space-between',fontSize:'10px',opacity:0.4,flexWrap:'wrap',gap:'8px'}}>
            <span>Z-Factors · Part of Etherom · The score behind every story.</span>
            <div style={{display:'flex',gap:'12px'}}>
              <Link href="/archive" style={{color:'inherit',textDecoration:'none'}}>Archive</Link>
              <a href="https://z-factoring.com" style={{color:'inherit',textDecoration:'none'}}>Z-Factoring</a>
              <a href="https://geobond.app" style={{color:'inherit',textDecoration:'none'}}>GeoBond</a>
              <a href="https://etherom.com" style={{color:'inherit',textDecoration:'none'}}>Etherom</a>
            </div>
          </footer>
        </div>

        <div className="zf-sidebar">
          <div style={{padding:'6px 10px',borderBottom:`0.5px solid ${BD}`,background:'rgba(128,128,128,0.04)'}}>
            <div style={{display:'flex',alignItems:'center',gap:'4px'}}>
              <span style={{color:T}}>📍</span>
              <span style={{fontSize:'11px',fontWeight:500}}>{city}</span>
            </div>
            <div style={{fontSize:'10px',color:T,cursor:'pointer',paddingLeft:'16px'}} onClick={()=>setCityOpen(v=>!v)}>Change location {cityOpen?'▴':'▾'}</div>
          </div>
          {cityOpen&&(
            <div style={{borderBottom:`0.5px solid ${BD}`}}>
              {[{label:'California',cities:['San Francisco','Oakland','San Jose','Sacramento']},{label:'West Coast',cities:['Los Angeles','Seattle','Portland']},{label:'Major Cities',cities:['New York','Chicago','Houston','Miami']}].map(g=>(
                <div key={g.label} style={{padding:'6px 10px',borderBottom:`0.5px solid ${BD}`}}>
                  <div style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'1.2px',opacity:0.5,fontWeight:600,marginBottom:'4px'}}>{g.label}</div>
                  {g.cities.map(c=><div key={c} onClick={()=>{setCity(c);setCityOpen(false);}} style={{fontSize:'11px',padding:'3px 0',cursor:'pointer',color:c===city?T:'inherit',borderBottom:`0.5px solid ${BD}`}}>{c}</div>)}
                </div>
              ))}
            </div>
          )}
          <div style={{padding:'8px 10px',borderBottom:`0.5px solid ${BD}`}}>
            <div style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'1.2px',opacity:0.5,fontWeight:600,marginBottom:'6px'}}>Signal leaderboard</div>
            {top5.length===0&&<div style={{fontSize:'10px',opacity:0.4}}>Loading…</div>}
            {top5.map((a,i)=>(
              <Link key={i} href={`/article/${slugify(a.headline)}`} style={{textDecoration:'none',color:'inherit',display:'flex',justifyContent:'space-between',alignItems:'center',padding:'4px 0',borderBottom:`0.5px solid ${BD}`}}>
                <div style={{display:'flex',alignItems:'center',gap:'4px'}}>
                  <span style={{fontSize:'9px',opacity:0.4}}>#{i+1}</span>
                  <span style={{opacity:0.7,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:'100px',fontSize:'10px'}}>{a.headline.split(' ').slice(0,4).join(' ')}…</span>
                </div>
                <span style={{color:a.z_factor_score>=9.5?R:a.z_factor_score>=9?T:A,fontWeight:500,flexShrink:0,marginLeft:'4px',fontSize:'10px'}}>{a.z_factor_score}</span>
              </Link>
            ))}
          </div>
          <div style={{height:'100px',borderBottom:`0.5px solid ${BD}`,background:'rgba(128,128,128,0.03)',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span style={{fontSize:'10px',opacity:0.3,border:`0.5px dashed ${BD}`,padding:'8px 12px',borderRadius:'4px',textAlign:'center'}}>300×250{'\n'}GeoBond B2B</span>
          </div>
          <div style={{padding:'8px 10px',borderBottom:`0.5px solid ${BD}`}}>
            <div style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'1.2px',opacity:0.5,fontWeight:600,marginBottom:'6px'}}>Signal makers</div>
            {SIGNAL_MAKERS.map(sm=>(
              <div key={sm} onClick={()=>setActiveFilter(activeFilter===sm?'all':sm)} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'4px 0',borderBottom:`0.5px solid ${BD}`,cursor:'pointer',color:activeFilter===sm?T:'inherit',fontWeight:activeFilter===sm?500:400}}>
                <span style={{opacity:activeFilter===sm?1:0.7,fontSize:'10px'}}>{sm}</span>
                <span style={{opacity:0.3,fontSize:'10px'}}>›</span>
              </div>
            ))}
          </div>
          <div style={{padding:'8px 10px',borderBottom:`0.5px solid ${BD}`}}>
            <div style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'1.2px',opacity:0.5,fontWeight:600,marginBottom:'6px'}}>Top sources</div>
            {['WSJ','NYT','Reuters','AP News','SF Chronicle'].map((src,i)=>(
              <div key={src} style={{display:'flex',justifyContent:'space-between',padding:'3px 0',borderBottom:`0.5px solid ${BD}`,fontSize:'10px'}}>
                <span style={{opacity:0.7}}>{src}</span>
                <span style={{color:T}}>{5-i}</span>
              </div>
            ))}
          </div>
          <div style={{padding:'8px 10px'}}>
            <div style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'1.2px',opacity:0.5,fontWeight:600,marginBottom:'6px'}}>Platform access</div>
            <div style={{display:'grid',gap:'5px'}}>
              <a href="https://z-factoring.com" style={{fontSize:'10px',padding:'5px 8px',border:`0.5px solid ${P}`,borderRadius:'4px',color:P,textAlign:'center',textDecoration:'none'}}>Register your government</a>
              <a href="https://geobond.app" style={{fontSize:'10px',padding:'5px 8px',border:`0.5px solid ${A}`,borderRadius:'4px',color:A,textAlign:'center',textDecoration:'none'}}>Register your business</a>
              <Link href="/submit" style={{fontSize:'10px',padding:'5px 8px',border:`0.5px solid ${T}`,borderRadius:'4px',color:T,textAlign:'center',textDecoration:'none',display:'block'}}>Submit a signal</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
