'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL ? createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
) : null;

const T='#1D9E75';const A='#BA7517';const R='#E24B4A';const P='#7F77DD';const BD='rgba(128,128,128,0.15)';

function slugify(str:string){return(str||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/-+/g,'-').slice(0,80).replace(/-$/,'');}
function ZBadge({score}:{score:number}){const bg=score>=9.5?R:score>=9?T:score>=8?A:P;return(<span style={{fontSize:'11px',padding:'2px 8px',borderRadius:'3px',fontWeight:600,color:'#fff',background:bg,flexShrink:0}}>Z {score}</span>);}

export default function ArticlePage(){
  const params=useParams();const slug=params?.slug as string;
  const [article,setArticle]=useState<any>(null);
  const [related,setRelated]=useState<any[]>([]);
  const [archive,setArchive]=useState<any[]>([]);
  const [top5,setTop5]=useState<any[]>([]);
  const [tab,setTab]=useState<'signal'|'sources'|'related'|'archive'>('signal');
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    async function load(){
      if(!supabase){setLoading(false);return;}
      const{data}=await supabase.from('articles').select('*').eq('status','published').order('z_factor_score',{ascending:false}).limit(100);
      const all=data||[];
      setTop5(all.slice(0,5));
      const match=all.find((a:any)=>slugify(a.headline)===slug);
      setArticle(match||null);
      if(match){
        setRelated(all.filter((a:any)=>a.id!==match.id&&((match.series&&a.series===match.series)||Math.abs(a.z_factor_score-match.z_factor_score)<=1)).slice(0,5));
        setArchive(all.filter((a:any)=>a.id!==match.id&&match.series&&a.series===match.series).slice(0,10));
      }
      setLoading(false);
    }
    load();
  },[slug]);

  if(loading)return<main style={{fontFamily:'var(--font-geist-sans,system-ui,sans-serif)',padding:'20px',opacity:0.4,fontSize:'13px'}}>Loading signal...</main>;
  if(!article)return<main style={{fontFamily:'var(--font-geist-sans,system-ui,sans-serif)',padding:'20px'}}><Link href="/" style={{fontSize:'12px',opacity:0.5,textDecoration:'none',color:'inherit'}}>← Back</Link><div style={{marginTop:'20px',opacity:0.4}}>Signal not found.</div></main>;

  const hasViews=article.track2a_feeling&&article.track2b_question;
  const formatType=hasViews?'A':'B';
  const paras:string[]=Array.isArray(article.body)?article.body:Array.isArray(article.track1)?article.track1:article.subheadline?[article.subheadline]:[];
  const sources=article.original_source?article.original_source.split(/[·,]/).map((s:string)=>s.trim()).filter(Boolean):[];

  const tabBtn=(t:string,label:string)=>(
    <button onClick={()=>setTab(t as any)} style={{fontSize:'11px',padding:'6px 14px',cursor:'pointer',borderTop:'none',borderLeft:'none',borderRight:'none',borderBottom:tab===t?`2px solid ${T}`:'2px solid transparent',color:tab===t?T:'inherit',fontWeight:tab===t?600:400,background:'none'}}>
      {label}
    </button>
  );

  return(
    <main style={{minHeight:'100vh',fontFamily:'var(--font-geist-sans,system-ui,sans-serif)',fontSize:'12px'}}>

      <header style={{padding:'8px 16px',borderBottom:`0.5px solid ${BD}`,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div><div style={{fontSize:'16px',fontWeight:600,letterSpacing:'-0.3px'}}>Z-Factors</div><div style={{fontSize:'9px',opacity:0.5}}>The score behind every story.</div></div>
        <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
          <Link href="/" style={{fontSize:'11px',opacity:0.5,textDecoration:'none',color:'inherit'}}>← All signals</Link>
          <a href="https://z-factoring.com" style={{fontSize:'10px',padding:'3px 9px',background:P,color:'#fff',borderRadius:'4px',textDecoration:'none'}}>For government</a>
          <a href="https://geobond.app" style={{fontSize:'10px',padding:'3px 9px',background:T,color:'#fff',borderRadius:'4px',textDecoration:'none'}}>For business</a>
        </div>
      </header>

      <div style={{display:'grid',gridTemplateColumns:'1fr 280px',minHeight:'calc(100vh - 50px)'}}>

        <div style={{borderRight:`0.5px solid ${BD}`,padding:'20px 24px'}}>

          <div style={{paddingBottom:'14px',borderBottom:`0.5px solid ${BD}`,marginBottom:'16px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'10px',flexWrap:'wrap'}}>
              <ZBadge score={article.z_factor_score}/>
              {article.series&&<span style={{fontSize:'9px',letterSpacing:'1px',textTransform:'uppercase',opacity:0.5,border:`0.5px solid ${BD}`,padding:'1px 6px',borderRadius:'3px'}}>{article.series}</span>}
              {article.sub_tag&&<span style={{fontSize:'9px',letterSpacing:'1px',textTransform:'uppercase',opacity:0.5,border:`0.5px solid ${BD}`,padding:'1px 6px',borderRadius:'3px'}}>{article.sub_tag}</span>}
              <span style={{fontSize:'10px',opacity:0.4,marginLeft:'auto'}}>{article.publish_date}</span>
            </div>
            <h1 style={{fontSize:'22px',fontWeight:600,lineHeight:1.35,margin:'0 0 8px'}}>{article.headline}</h1>
            {sources.length>0&&<div style={{fontSize:'11px',opacity:0.4}}>Sources: {sources.join(' · ')}</div>}
          </div>

          <div style={{display:'flex',borderBottom:`0.5px solid ${BD}`,marginBottom:'20px'}}>
            {tabBtn('signal','Z-Factors Signal')}
            {tabBtn('sources','Sources')}
            {tabBtn('related',`Related${related.length>0?' ('+related.length+')':''}`)}
            {tabBtn('archive','Archive')}
          </div>

          {tab==='signal'&&(
            <div>
              <div style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'1.5px',color:T,fontWeight:600,marginBottom:'10px',opacity:0.7}}>What really happened · 5th grade English</div>
              {paras.map((p,i)=><p key={i} style={{fontSize:'15px',lineHeight:1.85,marginBottom:'16px',opacity:0.85}}>{p}</p>)}
              {paras.length===0&&article.subheadline&&<p style={{fontSize:'15px',lineHeight:1.85,marginBottom:'16px',opacity:0.85}}>{article.subheadline}</p>}
              <div style={{height:'0.5px',background:BD,margin:'20px 0'}}/>
              {formatType==='A'&&(
                <>
                  <div style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'1.5px',color:T,fontWeight:600,marginBottom:'12px',opacity:0.7}}>Two views</div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'20px'}}>
                    <div style={{background:'rgba(29,158,117,0.08)',borderRadius:'6px',padding:'14px'}}>
                      <div style={{fontSize:'11px',fontWeight:600,color:T,marginBottom:'6px'}}>Who benefits</div>
                      <div style={{fontSize:'13px',lineHeight:1.65,opacity:0.8}}>{article.track2a_feeling}</div>
                    </div>
                    <div style={{background:'rgba(226,75,74,0.08)',borderRadius:'6px',padding:'14px'}}>
                      <div style={{fontSize:'11px',fontWeight:600,color:R,marginBottom:'6px'}}>Who loses</div>
                      <div style={{fontSize:'13px',lineHeight:1.65,opacity:0.8}}>{article.track2b_question}</div>
                    </div>
                  </div>
                </>
              )}
              {formatType==='B'&&(article.teaser_question||article.track2b_question)&&(
                <>
                  <div style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'1.5px',color:T,fontWeight:600,marginBottom:'12px',opacity:0.7}}>The question</div>
                  <div style={{fontSize:'16px',fontStyle:'italic',borderLeft:`3px solid ${T}`,paddingLeft:'14px',lineHeight:1.7,opacity:0.85,marginBottom:'20px'}}>{article.teaser_question||article.track2b_question}</div>
                </>
              )}
              <div style={{height:'0.5px',background:BD,margin:'20px 0'}}/>
              <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'6px'}}>
                <div style={{flex:1,height:'4px',background:'rgba(128,128,128,0.1)',borderRadius:'2px',overflow:'hidden'}}>
                  <div style={{width:`${(article.z_factor_score/10)*100}%`,height:'4px',background:article.z_factor_score>=9.5?R:article.z_factor_score>=9?T:A,borderRadius:'2px'}}/>
                </div>
                <ZBadge score={article.z_factor_score}/>
              </div>
              <div style={{fontSize:'11px',opacity:0.4,marginBottom:'20px'}}>Z-score measures meaning. Not certainty.</div>
              {article.key_entities?.length>0&&(
                <div style={{display:'flex',flexWrap:'wrap',gap:'5px',marginBottom:'16px'}}>
                  {(article.key_entities as string[]).map((e,i)=>(
                    <span key={i} style={{fontSize:'11px',border:`0.5px solid ${BD}`,padding:'2px 8px',borderRadius:'20px',opacity:0.6}}>{typeof e==='string'?e:JSON.stringify(e)}</span>
                  ))}
                </div>
              )}
              <div style={{padding:'12px 14px',border:`0.5px solid ${BD}`,borderRadius:'6px',background:'rgba(128,128,128,0.03)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px',marginTop:'8px'}}>
                <div style={{fontSize:'11px',opacity:0.6}}>Full intelligence report available on z-factoring.com</div>
                <a href="https://z-factoring.com" style={{fontSize:'11px',padding:'5px 12px',border:`0.5px solid ${P}`,borderRadius:'4px',color:P,textDecoration:'none'}}>Government intelligence →</a>
              </div>
            </div>
          )}

          {tab==='sources'&&(
            <div>
              <div style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'1.5px',opacity:0.5,fontWeight:600,marginBottom:'12px'}}>Primary sources</div>
              {sources.length>0?sources.map((src:string,i:number)=>(
                <div key={i} style={{padding:'10px 0',borderBottom:`0.5px solid ${BD}`,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span style={{fontWeight:500,fontSize:'13px'}}>{src}</span>
                  <span style={{fontSize:'10px',color:T}}>Z-weight: high</span>
                </div>
              )):<div style={{opacity:0.4,fontSize:'13px'}}>No sources listed.</div>}
            </div>
          )}

          {tab==='related'&&(
            <div>
              <div style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'1.5px',opacity:0.5,fontWeight:600,marginBottom:'12px'}}>Related signals</div>
              {related.length>0?related.map((a,i)=>(
                <Link key={i} href={`/article/${slugify(a.headline)}`} style={{textDecoration:'none',color:'inherit',display:'flex',gap:'10px',alignItems:'flex-start',padding:'10px 0',borderBottom:`0.5px solid ${BD}`}}>
                  <ZBadge score={a.z_factor_score}/>
                  <div><div style={{fontSize:'13px',fontWeight:500,marginBottom:'2px'}}>{a.headline}</div><div style={{fontSize:'10px',opacity:0.4}}>{a.publish_date} · {a.original_source}</div></div>
                </Link>
              )):<div style={{opacity:0.4,fontSize:'13px'}}>No related signals found.</div>}
            </div>
          )}

          {tab==='archive'&&(
            <div>
              <div style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'1.5px',opacity:0.5,fontWeight:600,marginBottom:'12px'}}>{article.series?`${article.series} · full archive`:'Signal archive'}</div>
              {archive.length>0?archive.map((a,i)=>(
                <Link key={i} href={`/article/${slugify(a.headline)}`} style={{textDecoration:'none',color:'inherit',display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:`0.5px solid ${BD}`}}>
                  <div><div style={{fontSize:'13px',fontWeight:500,marginBottom:'1px'}}>{a.headline}</div><div style={{fontSize:'10px',opacity:0.4}}>{a.publish_date}</div></div>
                  <ZBadge score={a.z_factor_score}/>
                </Link>
              )):<div style={{opacity:0.4,fontSize:'13px'}}>No archive entries yet.</div>}
              <div style={{marginTop:'16px'}}><Link href="/archive" style={{fontSize:'11px',color:T,textDecoration:'none'}}>View full signal archive →</Link></div>
            </div>
          )}

        </div>

        <div style={{position:'sticky',top:0,height:'100vh',overflowY:'auto',fontSize:'11px',borderLeft:`0.5px solid ${BD}`}}>

          <div style={{padding:'8px 10px',borderBottom:`0.5px solid ${BD}`}}>
            <div style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'1.2px',opacity:0.5,fontWeight:600,marginBottom:'6px'}}>Signal leaderboard</div>
            {top5.map((a,i)=>(
              <Link key={i} href={`/article/${slugify(a.headline)}`} style={{textDecoration:'none',color:'inherit',display:'flex',justifyContent:'space-between',alignItems:'center',padding:'4px 0',borderBottom:`0.5px solid ${BD}`}}>
                <div style={{display:'flex',alignItems:'center',gap:'4px'}}>
                  <span style={{fontSize:'9px',opacity:0.4}}>#{i+1}</span>
                  <span style={{opacity:0.7,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:'140px',fontSize:'10px'}}>{a.headline.split(' ').slice(0,5).join(' ')}…</span>
                </div>
                <span style={{color:a.z_factor_score>=9.5?R:a.z_factor_score>=9?T:A,fontWeight:500,flexShrink:0,marginLeft:'4px',fontSize:'10px'}}>{a.z_factor_score}</span>
              </Link>
            ))}
          </div>

          <div style={{height:'100px',borderBottom:`0.5px solid ${BD}`,background:'rgba(128,128,128,0.03)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            <span style={{fontSize:'10px',opacity:0.3,border:`0.5px dashed ${BD}`,padding:'8px 12px',borderRadius:'4px',textAlign:'center'}}>300×250<br/>GeoBond B2B</span>
          </div>

          {related.length>0&&(
            <div style={{padding:'8px 10px',borderBottom:`0.5px solid ${BD}`}}>
              <div style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'1.2px',opacity:0.5,fontWeight:600,marginBottom:'6px'}}>Related signals</div>
              {related.slice(0,4).map((a,i)=>(
                <Link key={i} href={`/article/${slugify(a.headline)}`} style={{textDecoration:'none',color:'inherit',display:'flex',gap:'6px',alignItems:'flex-start',padding:'4px 0',borderBottom:`0.5px solid ${BD}`}}>
                  <ZBadge score={a.z_factor_score}/>
                  <span style={{opacity:0.7,fontSize:'10px',lineHeight:1.4}}>{a.headline.split(' ').slice(0,6).join(' ')}…</span>
                </Link>
              ))}
            </div>
          )}

          {archive.length>0&&(
            <div style={{padding:'8px 10px',borderBottom:`0.5px solid ${BD}`}}>
              <div style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'1.2px',opacity:0.5,fontWeight:600,marginBottom:'6px'}}>{article.series} · series</div>
              {archive.slice(0,5).map((a,i)=>(
                <Link key={i} href={`/article/${slugify(a.headline)}`} style={{textDecoration:'none',color:'inherit',display:'flex',justifyContent:'space-between',padding:'4px 0',borderBottom:`0.5px solid ${BD}`,fontSize:'10px'}}>
                  <span style={{opacity:0.7,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:'140px'}}>{a.headline.split(' ').slice(0,5).join(' ')}…</span>
                  <span style={{color:T,flexShrink:0,marginLeft:'4px'}}>{a.z_factor_score}</span>
                </Link>
              ))}
            </div>
          )}

          <div style={{padding:'8px 10px',borderBottom:`0.5px solid ${BD}`}}>
            <div style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'1.2px',opacity:0.5,fontWeight:600,marginBottom:'6px'}}>Intelligence access</div>
            <div style={{display:'grid',gap:'5px'}}>
              <a href="https://z-factoring.com" style={{fontSize:'10px',padding:'5px 8px',border:`0.5px solid ${P}`,borderRadius:'4px',color:P,textAlign:'center',textDecoration:'none'}}>Government · z-factoring.com</a>
              <a href="https://geobond.app" style={{fontSize:'10px',padding:'5px 8px',border:`0.5px solid ${A}`,borderRadius:'4px',color:A,textAlign:'center',textDecoration:'none'}}>Business · geobond.app</a>
              <Link href="/submit" style={{fontSize:'10px',padding:'5px 8px',border:`0.5px solid ${T}`,borderRadius:'4px',color:T,textAlign:'center',textDecoration:'none',display:'block'}}>Submit a signal</Link>
            </div>
          </div>

          <div style={{padding:'8px 10px'}}>
            <Link href="/" style={{fontSize:'11px',color:T,textDecoration:'none'}}>← Back to all signals</Link>
          </div>

        </div>
      </div>

      <footer style={{padding:'14px 20px',borderTop:`0.5px solid ${BD}`,fontSize:'10px',opacity:0.4,display:'flex',justifyContent:'space-between'}}>
        <span>Z-Factors · Part of Etherom · The score behind every story.</span>
        <div style={{display:'flex',gap:'12px'}}>
          <Link href="/archive" style={{color:'inherit',textDecoration:'none'}}>Archive</Link>
          <a href="https://z-factoring.com" style={{color:'inherit',textDecoration:'none'}}>Z-Factoring</a>
          <a href="https://geobond.app" style={{color:'inherit',textDecoration:'none'}}>GeoBond</a>
        </div>
      </footer>

    </main>
  );
}
