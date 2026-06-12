import Link from 'next/link';

export const dynamic = 'force-dynamic';
import fs from 'fs';
import path from 'path';

function getArticles() {
  const analysisDir = path.join(process.cwd(), 'app/analysis');
  try {
    const folders = fs.readdirSync(analysisDir)
      .filter(f => f.match(/^ta-\d+$/i))
      .sort((a, b) => parseInt(b.replace(/ta-/i,'')) - parseInt(a.replace(/ta-/i,'')));
    return folders.map(folder => {
      try {
        const content = fs.readFileSync(path.join(analysisDir, folder, 'page.tsx'), 'utf8');
        const titleMatch = content.match(/title: ['"]([^'"]+) \| Z-Factors['"]/);
        const descMatch = content.match(/description: ['"]([^'"]+)['"]/);
        const scoreMatch = content.match(/Signal[:\s]+(\d+)\/10/);
        const dateMatch = content.match(/(\d{4}-\d{2}-\d{2})/);
        const isCommentary = /Commentary/i.test(content);
        return {
          id: folder.toUpperCase(),
          slug: folder.toLowerCase(),
          headline: titleMatch?.[1]?.trim() || folder,
          description: descMatch?.[1] || '',
          score: scoreMatch?.[1] || '0',
          date: dateMatch?.[1] || '',
          type: isCommentary ? 'SMALL TOWN' : 'BIG CITY'
        };
      } catch { return { id: folder.toUpperCase(), slug: folder, headline: folder, description: '', score: '0', date: '', type: 'BIG CITY' }; }
    });
  } catch { return []; }
}

const R = {
  story:    { color: '#1D9E75', light: '#E1F5EE', dark: '#085041', short: 'The real story.',    long: 'What really happened.' },
  feeling:  { color: '#7F77DD', light: '#EEEDFE', dark: '#3C3489', short: 'The real feeling.',  long: 'How it really lands on people.' },
  response: { color: '#BA7517', light: '#FAEEDA', dark: '#633806', short: 'The real response.', long: 'What we can do together.' },
};

export default function HomePage() {
  const articles = getArticles();
  const featured = articles[0];
  const bigCity = articles.filter(a => a.type === 'BIG CITY').slice(0,1);
  const smallTown = articles.filter(a => a.type === 'SMALL TOWN').slice(0,1);

  return (
    <main style={{minHeight:'100vh',background:'#fff',color:'#121212',fontFamily:'ui-sans-serif,system-ui,-apple-system,sans-serif'}}>

      <nav style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px 24px',borderBottom:'0.5px solid #e5e5e5'}}>
        <div>
          <div style={{fontSize:'20px',fontWeight:'500',letterSpacing:'-0.4px'}}>Z-Factors</div>
          <div style={{fontSize:'10px',letterSpacing:'0.18em',textTransform:'uppercase',color:'#555555',marginTop:'2px'}}>The real story · The real feeling · The real response</div>
        </div>
        <div style={{display:'flex',gap:'20px',fontSize:'13px',color:'#222222'}}>
          <Link href="/archive" style={{color:'#222222',textDecoration:'none'}}>Archive</Link>
          <Link href="/about" style={{color:'#222222',textDecoration:'none'}}>About</Link>
          <Link href="/contact" style={{color:'#222222',textDecoration:'none'}}>Contact</Link>
        </div>
      </nav>

      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',borderBottom:'0.5px solid #e5e5e5'}}>
        {[R.story,R.feeling,R.response].map((r,i) => (
          <div key={r.short} style={{padding:'10px 16px',display:'flex',alignItems:'center',gap:'8px',borderRight:i<2?'0.5px solid #e5e5e5':'none'}}>
            <div style={{width:'7px',height:'7px',borderRadius:'50%',background:r.color,flexShrink:0}}></div>
            <div>
              <div style={{fontSize:'11px',fontWeight:'500',color:'#1A1A1A'}}>{r.short}</div>
              <div style={{fontSize:'10px',color:'#555555'}}>{r.long}</div>
            </div>
          </div>
        ))}
      </div>

      {featured && (
        <div style={{display:'flex',alignItems:'center',gap:'10px',padding:'9px 24px',borderBottom:'0.5px solid #e5e5e5',background:'#FAFAFA'}}>
          <div style={{display:'flex',alignItems:'center',gap:'5px',fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',color:'#1D9E75',flexShrink:0}}>
            <div style={{width:'5px',height:'5px',borderRadius:'50%',background:'#1D9E75'}}></div>Live
          </div>
          <span style={{fontSize:'13px',color:'#222222',flex:1,lineHeight:'1.4'}}>{featured.headline}</span>
          <span style={{fontSize:'10px',fontWeight:'500',padding:'2px 8px',background:'#1D9E75',color:'#fff',borderRadius:'3px',flexShrink:0}}>{featured.score}/10</span>
        </div>
      )}

      <section style={{padding:'44px 24px 40px',borderBottom:'0.5px solid #e5e5e5',maxWidth:'580px'}}>
        <div style={{fontSize:'11px',letterSpacing:'0.14em',textTransform:'uppercase',color:'#555555',marginBottom:'20px'}}>Community Portal · Bay Area + Global</div>
        <div style={{display:'flex',flexDirection:'column',gap:'16px',marginBottom:'28px'}}>
          {[R.story,R.feeling,R.response].map(r => (
            <div key={r.short} style={{paddingLeft:'16px',borderLeft:`2px solid ${r.color}`}}>
              <div style={{fontSize:'20px',fontWeight:'500',fontFamily:'Georgia,Cambria,serif',letterSpacing:'-0.2px',color:'#121212'}}>{r.short}</div>
              <div style={{fontSize:'14px',color:'#222222',fontFamily:'Georgia,Cambria,serif',fontStyle:'italic'}}>{r.long}</div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
          {[R.story,R.feeling,R.response].map(r => (
            <span key={r.short} style={{fontSize:'11px',padding:'4px 12px',borderRadius:'999px',fontWeight:'500',background:r.light,color:r.dark}}>{r.short.replace('.','')}</span>
          ))}
        </div>
      </section>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',borderBottom:'0.5px solid #e5e5e5'}}>
        <Link href="/archive" style={{textDecoration:'none',color:'inherit'}}>
          <div style={{padding:'32px 24px',position:'relative',borderRight:'0.5px solid #e5e5e5',cursor:'pointer'}}>
            <div style={{position:'absolute',top:0,left:0,width:'3px',height:'100%',background:`linear-gradient(180deg,#1D9E75 0%,#7F77DD 100%)`}}></div>
            <div style={{fontSize:'10px',letterSpacing:'0.16em',textTransform:'uppercase',color:'#555555',marginBottom:'10px',paddingLeft:'6px'}}>Top-down · Global signals</div>
            <div style={{fontSize:'22px',fontWeight:'600',letterSpacing:'-0.4px',marginBottom:'6px',paddingLeft:'6px',color:'#121212'}}>Big City</div>
            <div style={{fontSize:'13px',color:'#222222',lineHeight:'1.65',marginBottom:'16px',paddingLeft:'6px',maxWidth:'210px'}}>Data. Markets. Policy. Scale. For the fact-driven mind.</div>
            <div style={{display:'flex',flexDirection:'column',gap:'6px',marginBottom:'16px',paddingLeft:'6px'}}>
              {[R.story,R.feeling].map(r => (
                <div key={r.short} style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'12px'}}>
                  <div style={{width:'5px',height:'5px',borderRadius:'50%',background:r.color,flexShrink:0}}></div>
                  <span style={{fontWeight:'500',color:'#1A1A1A'}}>{r.short}</span>
                  <span style={{color:'#555555'}}>{r.long}</span>
                </div>
              ))}
            </div>
            {bigCity[0] && (
              <div style={{padding:'12px',border:'0.5px solid #e5e5e5',borderRadius:'6px',marginBottom:'16px'}}>
                <div style={{fontSize:'10px',letterSpacing:'0.1em',textTransform:'uppercase',color:'#555555',marginBottom:'5px'}}>Latest · {bigCity[0].score}/10</div>
                <div style={{fontSize:'12px',color:'#222222',lineHeight:'1.5'}}>{bigCity[0].headline}</div>
              </div>
            )}
            <div style={{fontSize:'13px',fontWeight:'500',paddingLeft:'6px'}}>Enter →</div>
          </div>
        </Link>

        <Link href="/archive" style={{textDecoration:'none',color:'inherit'}}>
          <div style={{padding:'32px 24px',position:'relative',cursor:'pointer'}}>
            <div style={{position:'absolute',top:0,left:0,width:'3px',height:'100%',background:`linear-gradient(180deg,#7F77DD 0%,#BA7517 100%)`}}></div>
            <div style={{fontSize:'10px',letterSpacing:'0.16em',textTransform:'uppercase',color:'#555555',marginBottom:'10px',paddingLeft:'6px'}}>Bottom-up · Human stories</div>
            <div style={{fontSize:'22px',fontWeight:'600',letterSpacing:'-0.4px',marginBottom:'6px',paddingLeft:'6px',color:'#121212'}}>Small Town</div>
            <div style={{fontSize:'13px',color:'#222222',lineHeight:'1.65',marginBottom:'16px',paddingLeft:'6px',maxWidth:'210px'}}>People. Stories. Questions. For the human-driven heart.</div>
            <div style={{display:'flex',flexDirection:'column',gap:'6px',marginBottom:'16px',paddingLeft:'6px'}}>
              {[R.feeling,R.response].map(r => (
                <div key={r.short} style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'12px'}}>
                  <div style={{width:'5px',height:'5px',borderRadius:'50%',background:r.color,flexShrink:0}}></div>
                  <span style={{fontWeight:'500',color:'#1A1A1A'}}>{r.short}</span>
                  <span style={{color:'#555555'}}>{r.long}</span>
                </div>
              ))}
            </div>
            {smallTown[0] && (
              <div style={{padding:'12px',border:'0.5px solid #e5e5e5',borderRadius:'6px',marginBottom:'16px'}}>
                <div style={{fontSize:'10px',letterSpacing:'0.1em',textTransform:'uppercase',color:'#555555',marginBottom:'5px'}}>Latest commentary</div>
                <div style={{fontSize:'12px',color:'#222222',lineHeight:'1.5'}}>{smallTown[0].headline}</div>
              </div>
            )}
            <div style={{fontSize:'13px',fontWeight:'500',paddingLeft:'6px'}}>Enter →</div>
          </div>
        </Link>
      </div>

      {articles.length > 0 && (
        <section style={{padding:'24px',borderBottom:'0.5px solid #e5e5e5'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'14px'}}>
            <div style={{fontSize:'10px',letterSpacing:'0.16em',textTransform:'uppercase',color:'#555555'}}>Latest Intelligence</div>
            <Link href="/archive" style={{fontSize:'12px',color:'#222222',textDecoration:'underline'}}>View all →</Link>
          </div>
          {articles.slice(0,6).map(article => {
            const r = article.type === 'BIG CITY' ? R.story : R.feeling;
            return (
              <Link key={article.id} href={`/analysis/${article.slug}`} style={{textDecoration:'none',color:'inherit'}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'11px 0',borderBottom:'0.5px solid #f5f5f5'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'10px',flex:1,minWidth:0}}>
                    <div style={{width:'5px',height:'5px',borderRadius:'50%',flexShrink:0,background:r.color}}></div>
                    <span style={{fontSize:'10px',fontWeight:'500',padding:'1px 6px',borderRadius:'3px',flexShrink:0,background:r.light,color:r.dark}}>{article.type}</span>
                    <span style={{fontSize:'15px',fontFamily:'Georgia,serif',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',color:'#121212',fontWeight:'400'}}>{article.headline}</span>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:'10px',flexShrink:0,marginLeft:'12px'}}>
                    <span style={{fontSize:'11px',fontWeight:'500',color:r.color}}>{article.score}/10</span>
                    <span style={{fontSize:'11px',color:'#d4d4d4'}}>{article.date}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      )}

      <section style={{padding:'28px 24px',background:'#FAFAFA',borderBottom:'0.5px solid #e5e5e5'}}>
        <div style={{fontSize:'10px',letterSpacing:'0.16em',textTransform:'uppercase',color:'#555555',marginBottom:'20px'}}>Editorial DNA</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'20px',marginBottom:'20px'}}>
          {[
            {...R.story, body:'Facts, data, events, sources. What can be verified and reported.'},
            {...R.feeling, body:'Who absorbs the impact. What it costs in human terms. How it feels.'},
            {...R.response, body:'Community action. Collective strength. What comes next together.'}
          ].map(r => (
            <div key={r.short} style={{borderLeft:`2px solid ${r.color}`,paddingLeft:'14px'}}>
              <div style={{fontSize:'13px',fontWeight:'500',marginBottom:'3px'}}>{r.short}</div>
              <div style={{fontSize:'13px',color:'#222222',fontStyle:'italic',fontFamily:'Georgia,serif',marginBottom:'6px'}}>{r.long}</div>
              <div style={{fontSize:'11px',color:'#555555',lineHeight:'1.6'}}>{r.body}</div>
            </div>
          ))}
        </div>
        <div style={{fontSize:'13px',fontStyle:'italic',color:'#555555',fontFamily:'Georgia,serif',paddingTop:'16px',borderTop:'0.5px solid #e5e5e5'}}>
          &ldquo;Technology is a tool. Community is the outcome. People are the destination.&rdquo; — Etherom
        </div>
      </section>

      <footer style={{padding:'16px 24px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontSize:'11px',color:'#555555'}}>Z-Factors · Community Portal · Part of Etherom</span>
        <div style={{display:'flex',gap:'16px',fontSize:'11px'}}>
          <Link href="/archive" style={{color:'#555555',textDecoration:'none'}}>Archive</Link>
          <Link href="/about" style={{color:'#555555',textDecoration:'none'}}>About</Link>
          <Link href="/privacy" style={{color:'#555555',textDecoration:'none'}}>Privacy</Link>
        </div>
      </footer>

    </main>
  );
}
