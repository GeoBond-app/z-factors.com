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

function slugify(str:string){return(str||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/-+/g,'-').slice(0,200).replace(/-$/,'');}
function ZBadge({score}:{score:number}){const bg=score>=9.5?R:score>=9?T:score>=8?A:P;return(<span style={{fontSize:'11px',padding:'2px 8px',borderRadius:'3px',fontWeight:600,color:'#fff',background:bg,flexShrink:0}}>Z {score}</span>);}

export default function ArticlePage(){
  const params=useParams();const slug=params?.slug as string;
  const [article,setArticle]=useState<any>(null);
  const [related,setRelated]=useState<any[]>([]);
  const [top5,setTop5]=useState<any[]>([]);
  const [tab,setTab]=useState<'signal'|'related'>('signal');
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    async function load(){
      if(!supabase){setLoading(false);return;}
      const{data}=await supabase.from('articles').select('*').order('z_factor_score',{ascending:false}).limit(200);
      const all=data||[];
      setTop5(all.slice(0,5));
      let match=all.find((a:any)=>slugify(a.headline)===slug);
      if(!match)match=all.find((a:any)=>slugify(a.headline).startsWith(slug.slice(0,60)));
      if(!match&&slug.length===36)match=all.find((a:any)=>a.id===slug);
      setArticle(match||null);
      if(match){setRelated(all.filter((a:any)=>a.id!==match.id&&((match.series_slug&&a.series_slug===match.series_slug)||Math.abs((a.z_factor_score||0)-(match.z_factor_score||0))<=1)).slice(0,5));}
      setLoading(false);
    }
    load();
  },[slug]);

  if(loading)return<main style={{fontFamily:'var(--font-geist-sans,system-ui,sans-serif)',padding:'40px',opacity:0.4,fontSize:'13px'}}>Loading signal...</main>;
  if(!article)return<main style={{fontFamily:'var(--font-geist-sans,system-ui,sans-serif)',padding:'20px'}}><Link href="/" style={{fontSize:'12px',opacity:0.5,textDecoration:'none',color:'inherit'}}>← Back</Link><div style={{marginTop:'20px',opacity:0.4,fontSize:'13px'}}>Signal not found.</div></main>;

  const bodyParagraphs:string[]=Array.isArray(article.body)&&article.body.length>0?article.body:Array.isArray(article.track1)&&article.track1.length>0?article.track1:typeof article.body==='string'&&article.body?[article.body]:[];
  const perspective1a=article.perspective_1a_wins_loses||article.track2a_feeling||'';
  const perspective1b=article.perspective_1b_average_person||article.track2b_question||'';
  const sources=article.original_source?article.original_source.split(/[·,]/).map((s:string)=>s.trim()).filter(Boolean):[];
  const tabBtn=(t:string,label:string)=>(<button onClick={()=>setTab(t as any)} style={{fontSize:'11px',padding:'6px 14px',cursor:'pointer',borderTop:'none',borderLeft:'none',borderRight:'none',borderBottom:tab===t?`2px solid ${T}`:'2px solid transparent',color:tab===t?T:'inherit',fontWeight:tab===t?600:400,background:'none'}}>{label}</button>);

  return(
    <main style={{minHeight:'100vh',fontFamily:'var(--font-geist-sans,system-ui,sans-serif)',fontSize:'13px'}}>
      <header style={{padding:'8px 16px',borderBottom:`0.5px solid ${BD}`,display:'flex',justifyContent:'space-between',alignItems:'center',position:'sticky',top:0,zIndex:50,background:'var(--background,#fff)'}}>
        <div><Link href="/" style={{textDecoration:'none',color:'inherit'}}><div style={{fontSize:'16px',fontWeight:600,letterSpacing:'-0.3px'}}>Z-Factors</div></Link><div style={{fontSize:'9px',opacity:0.5}}>The score behind every story.</div></div>
        <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
          <Link href="/" style={{fontSize:'11px',opacity:0.5,textDecoration:'none',color:'inherit'}}>← All signals</Link>
          <a href="https://z-factoring.com" style={{fontSize:'10px',padding:'3px 9px',background:P,color:'#fff',borderRadius:'4px',textDecoration:'none'}}>Gov</a>
          <a href="https://geobond.app" style={{fontSize:'10px',padding:'3px 9px',background:T,color:'#fff',borderRadius:'4px',textDecoration:'none'}}>Biz</a>
        </div>
      </header>
      <div style={{display:'grid',gridTemplateColumns:'1fr 280px',minHeight:'calc(100vh - 50px)'}}>
        <div style={{borderRight:`0.5px solid ${BD}`,padding:'20px 24px'}}>
          <div style={{paddingBottom:'16px',borderBottom:`0.5px solid ${BD}`,marginBottom:'20px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'12px',flexWrap:'wrap'}}>
              <ZBadge score={article.z_factor_score}/>
              {article.article_type&&<span style={{fontSize:'9px',letterSpacing:'1px',textTransform:'uppercase',opacity:0.5,border:`0.5px solid ${BD}`,padding:'1px 6px',borderRadius:'3px'}}>{article.article_type}</span>}
              {article.sub_tag&&<span style={{fontSize:'9px',letterSpacing:'1px',textTransform:'uppercase',opacity:0.5,border:`0.5px solid ${BD}`,padding:'1px 6px',borderRadius:'3px'}}>{article.sub_tag}</span>}
              <span style={{fontSize:'10px',opacity:0.4,marginLeft:'auto'}}>{article.publish_date}</span>
            </div>
            <h1 style={{fontSize:'24px',fontWeight:600,lineHeight:1.3,margin:'0 0 10px',letterSpacing:'-0.3px'}}>{article.headline}</h1>
            {article.subheadline&&<div style={{fontSize:'16px',opacity:0.65,lineHeight:1.6,marginBottom:'10px'}}>{article.subheadline}</div>}
            {sources.length>0&&<div style={{fontSize:'11px',opacity:0.4}}>Source: {sources.join(' · ')}</div>}
          </div>
          <div style={{display:'flex',borderBottom:`0.5px solid ${BD}`,marginBottom:'24px'}}>
            {tabBtn('signal','Signal')}
            {tabBtn('related',`Related${related.length>0?' ('+related.length+')':''}`)}
          </div>
          {tab==='signal'&&(
            <div>
              {article.teaser_question&&<div style={{fontSize:'18px',fontStyle:'italic',lineHeight:1.7,borderLeft:`3px solid ${T}`,paddingLeft:'16px',marginBottom:'28px',opacity:0.85}}>{article.teaser_question}</div>}
              {bodyParagraphs.length>0&&<div style={{marginBottom:'28px'}}><div style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'1.5px',color:T,fontWeight:600,marginBottom:'14px',opacity:0.7}}>What really happened</div>{bodyParagraphs.map((p:string,i:number)=><p key={i} style={{fontSize:'15px',lineHeight:1.85,marginBottom:'16px',opacity:0.85}}>{p}</p>)}</div>}
              {bodyParagraphs.length===0&&<div style={{marginBottom:'28px',padding:'16px',background:'rgba(128,128,128,0.04)',borderRadius:'6px',border:`0.5px solid ${BD}`}}><div style={{fontSize:'11px',opacity:0.4,marginBottom:'8px'}}>Full body coming soon · Signal framework active</div>{article.subheadline&&<p style={{fontSize:'15px',lineHeight:1.85,opacity:0.85,margin:0}}>{article.subheadline}</p>}</div>}
              <div style={{height:'0.5px',background:BD,margin:'24px 0'}}/>
              {perspective1a&&<div style={{marginBottom:'20px'}}><div style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'1.5px',color:T,fontWeight:600,marginBottom:'10px',opacity:0.7}}>Our insight</div><div style={{borderLeft:`2px solid ${T}`,paddingLeft:'14px',fontSize:'15px',lineHeight:1.8,opacity:0.85}}>{perspective1a}</div></div>}
              {perspective1b&&<div style={{marginBottom:'20px'}}><div style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'1.5px',opacity:0.4,fontWeight:600,marginBottom:'10px'}}>The question</div><div style={{borderLeft:'2px solid rgba(128,128,128,0.25)',paddingLeft:'14px',fontSize:'15px',fontStyle:'italic',lineHeight:1.8,opacity:0.75}}>{perspective1b}</div></div>}
              <div style={{height:'0.5px',background:BD,margin:'24px 0'}}/>
              <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'6px'}}><div style={{flex:1,height:'4px',background:'rgba(128,128,128,0.1)',borderRadius:'2px',overflow:'hidden'}}><div style={{width:`${(article.z_factor_score/10)*100}%`,height:'4px',background:article.z_factor_score>=9.5?R:article.z_factor_score>=9?T:A,borderRadius:'2px'}}/></div><ZBadge score={article.z_factor_score}/></div>
              <div style={{fontSize:'11px',opacity:0.4,marginBottom:'20px'}}>Z-score measures meaning. Not certainty.</div>
              {article.topic_tags?.length>0&&<div style={{display:'flex',flexWrap:'wrap',gap:'5px',marginBottom:'20px'}}>{(article.topic_tags as string[]).map((t:string,i:number)=><span key={i} style={{fontSize:'11px',border:`0.5px solid ${BD}`,padding:'2px 8px',borderRadius:'20px',opacity:0.6}}>{t}</span>)}</div>}
              <div style={{padding:'14px',border:`0.5px solid ${BD}`,borderRadius:'6px',background:'rgba(128,128,128,0.03)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}><div style={{fontSize:'11px',opacity:0.6}}>Full intelligence report on z-factoring.com</div><a href="https://z-factoring.com" style={{fontSize:'11px',padding:'5px 12px',border:`0.5px solid ${P}`,borderRadius:'4px',color:P,textDecoration:'none'}}>Government intelligence →</a></div>
            </div>
          )}
          {tab==='related'&&(
            <div>
              <div style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'1.5px',opacity:0.5,fontWeight:600,marginBottom:'12px'}}>Related signals</div>
              {related.length>0?related.map((a:any,i:number)=>(<Link key={i} href={`/article/${slugify(a.headline)}`} style={{textDecoration:'none',color:'inherit',display:'flex',gap:'10px',alignItems:'flex-start',padding:'12px 0',borderBottom:`0.5px solid ${BD}`}}><ZBadge score={a.z_factor_score}/><div><div style={{fontSize:'14px',fontWeight:500,marginBottom:'3px',lineHeight:1.35}}>{a.headline}</div><div style={{fontSize:'10px',opacity:0.4}}>{a.publish_date} · {a.original_source}</div></div></Link>)):<div style={{opacity:0.4,fontSize:'13px'}}>No related signals found.</div>}
            </div>
          )}
        </div>
        <div style={{position:'sticky',top:0,height:'100vh',overflowY:'auto',fontSize:'11px',borderLeft:`0.5px solid ${BD}`}}>
          <div style={{padding:'8px 10px',borderBottom:`0.5px solid ${BD}`}}>
            <div style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'1.2px',opacity:0.5,fontWeight:600,marginBottom:'6px'}}>Signal leaderboard</div>
            {top5.map((a:any,i:number)=>(<Link key={i} href={`/article/${slugify(a.headline)}`} style={{textDecoration:'none',color:'inherit',display:'flex',justifyContent:'space-between',alignItems:'center',padding:'4px 0',borderBottom:`0.5px solid ${BD}`}}><div style={{display:'flex',alignItems:'center',gap:'4px'}}><span style={{fontSize:'9px',opacity:0.4}}>#{i+1}</span><span style={{opacity:0.7,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:'140px',fontSize:'10px'}}>{a.headline.split(' ').slice(0,5).join(' ')}…</span></div><span style={{color:a.z_factor_score>=9.5?R:a.z_factor_score>=9?T:A,fontWeight:500,flexShrink:0,marginLeft:'4px',fontSize:'10px'}}>{a.z_factor_score}</span></Link>))}
          </div>
          <div style={{height:'100px',borderBottom:`0.5px solid ${BD}`,background:'rgba(128,128,128,0.03)',display:'flex',alignItems:'center',justifyContent:'center'}}><span style={{fontSize:'10px',opacity:0.3,border:`0.5px dashed ${BD}`,padding:'8px 12px',borderRadius:'4px',textAlign:'center'}}>300×250{'\n'}GeoBond B2B</span></div>
          {related.length>0&&<div style={{padding:'8px 10px',borderBottom:`0.5px solid ${BD}`}}><div style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'1.2px',opacity:0.5,fontWeight:600,marginBottom:'6px'}}>Related signals</div>{related.slice(0,4).map((a:any,i:number)=>(<Link key={i} href={`/article/${slugify(a.headline)}`} style={{textDecoration:'none',color:'inherit',display:'flex',gap:'6px',alignItems:'flex-start',padding:'5px 0',borderBottom:`0.5px solid ${BD}`}}><ZBadge score={a.z_factor_score}/><span style={{opacity:0.7,fontSize:'10px',lineHeight:1.4}}>{a.headline.split(' ').slice(0,6).join(' ')}…</span></Link>))}</div>}
          <div style={{padding:'8px 10px',borderBottom:`0.5px solid ${BD}`}}><div style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'1.2px',opacity:0.5,fontWeight:600,marginBottom:'6px'}}>Platform access</div><div style={{display:'grid',gap:'5px'}}><a href="https://z-factoring.com" style={{fontSize:'10px',padding:'5px 8px',border:`0.5px solid ${P}`,borderRadius:'4px',color:P,textAlign:'center',textDecoration:'none'}}>Register your government</a><a href="https://geobond.app" style={{fontSize:'10px',padding:'5px 8px',border:`0.5px solid ${A}`,borderRadius:'4px',color:A,textAlign:'center',textDecoration:'none'}}>Register your business</a><Link href="/submit" style={{fontSize:'10px',padding:'5px 8px',border:`0.5px solid ${T}`,borderRadius:'4px',color:T,textAlign:'center',textDecoration:'none',display:'block'}}>Submit a signal</Link></div></div>
          <div style={{padding:'8px 10px'}}><Link href="/" style={{fontSize:'11px',color:T,textDecoration:'none'}}>← Back to all signals</Link></div>
        </div>
      </div>
      <footer style={{padding:'14px 20px',borderTop:`0.5px solid ${BD}`,fontSize:'10px',opacity:0.4,display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:'8px'}}>
        <span>Z-Factors · Part of Etherom · The score behind every story.</span>
        <div style={{display:'flex',gap:'12px'}}><Link href="/archive" style={{color:'inherit',textDecoration:'none'}}>Archive</Link><a href="https://z-factoring.com" style={{color:'inherit',textDecoration:'none'}}>Z-Factoring</a><a href="https://geobond.app" style={{color:'inherit',textDecoration:'none'}}>GeoBond</a><a href="https://etherom.com" style={{color:'inherit',textDecoration:'none'}}>Etherom</a></div>
      </footer>
    </main>
  );
}
