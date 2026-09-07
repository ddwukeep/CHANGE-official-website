import { useEffect, useState } from 'react'
import { ArrowRight, ArrowUpRight, Crosshair, Menu, Play, Wallet, X } from 'lucide-react'
import Globe from './components/Globe'
import { dataProvider } from './services/dataProvider'
import { protocolFeatures, roadmap } from './data/mockData'

const nav = ['HOME','NETWORK','PROTOCOL','EXCHANGE','ROADMAP','DOCS']
function Spark({points}) { const max=Math.max(...points), d=points.map((p,i)=>`${i?'L':'M'}${i*14},${30-p/max*26}`).join(' '); return <svg className="spark" viewBox="0 0 100 32"><path d={d}/></svg> }
function Label({children,n='SYS'}) { return <div className="eyebrow"><span>[ {n} ]</span>{children}</div> }

const telemetry = [
 ['ACTIVE CPU NODES','589,431','↗ +12.4%'], ['AVAILABLE COMPUTE','24,736','PH/s  ↗ +18.7%'],
 ['COMPUTE SHARED','1.28M','CPU-H  ↗ +31.2%'], ['ACTIVE REGIONS','6 / 6',''],
 ['$CHANGE HOLDERS','12,463','↗ +9.1%'],
]

function SiteHeader({onWallet,onMenu,mobile}) { return <header className="command-header">
 <a className="brand" href="#home"><img src={`${import.meta.env.BASE_URL}assets/logo-placeholder.svg`}/><span>CHANGE<small>MEME-POWERED COMPUTE NETWORK</small></span></a>
 <nav>{nav.map((x,i)=><a className={i===0?'active':''} key={x} href={`#${x.toLowerCase()}`}>{x}</a>)}</nav>
 <div className="head-actions"><span className="online"><b/> NETWORK ONLINE</span><i/><button onClick={onWallet}><Wallet size={20}/> CONNECT WALLET</button></div>
 <button className="menu" onClick={onMenu}>{mobile?<X/>:<Menu/>}</button>
 </header> }

function HeroCopy({onVision}) { return <div className="hero-copy">
 <div className="hero-kicker">// IDLE CPUs. REAL VALUE. A BRIGHTER TOMORROW.</div>
 <h1>TURN IDLE CPU<br/><span>INTO VALUE.</span></h1>
 <h2>$CHANGE — MEME-POWERED COMPUTE NETWORK</h2>
 <p>Connect idle computing power to the CHANGE network.<br/>Share resources. Power the network. Earn through participation.<br/>A global community. A more open, more efficient future.</p>
 <div className="hero-actions"><a className="join" href="#network">JOIN THE NETWORK <ArrowRight/></a><button onClick={onVision}><i><Play size={20}/></i><span>WATCH<br/>OUR VISION</span></button></div>
 <div className="hero-mantra"><span>MORE CPUs</span><b/><span>MORE PEOPLE</span><b/><span>MORE MEMES</span><b/><span>A MORE OPEN WORLD</span></div>
 </div> }

function HudRail() { return <aside className="brand-rail">
 <div className="rail-top">GLOBAL<br/>DECENTRALIZED<br/>COMPUTE<br/>NETWORK<i/></div>
 <div className="rail-words"><span>ADAPT</span><span>EVOLVE</span><span>CONNECT</span><span>SCALE</span><strong>CHANGE</strong><i/></div>
 <div className="rail-statement">THE WORLD<br/>HAS BILLIONS OF<br/>IDLE CPUs.<strong>CHANGE PUTS<br/>THEM TO WORK.</strong></div>
 </aside> }

function MetricsDashboard({tick,points}) { return <section className="telemetry" id="network">
 <div className="telemetry-note">SIMULATED NETWORK DATA</div>
 <div className="metrics">{telemetry.map(([label,value,change],i)=><article className="metric" key={label}><div className="metric-label"><span>{['◉','▣','◎','⊕','♧'][i]}</span>{label}</div><div className="metric-row"><strong>{i===0?(589431+tick%4).toLocaleString():i===4?(12463+tick%3).toLocaleString():value}</strong><em>{change}</em></div>{i===3?<div className="region-bars"><i/><i/><i/></div>:<Spark points={points[i]?.points || [2,4,3,7,6,9,8,12]}/>}</article>)}
 <article className="live-card"><strong><b/> LIVE</strong><div><span>BLOCK<b>#12,584,221</b></span><span>TPS<b>3,428</b></span><span>LATENCY<b>428ms</b></span></div></article></div>
 </section> }

function ExchangeTicker({activity}) { const feed=activity.length?activity:[{id:'mock',time:'14:23',row:['','','US-West','7f3a']}]; return <section className="exchange-strip">
 <div className="exchange-heading"><span>// REAL-TIME CPU COMPUTE EXCHANGE</span><b>MOCK NETWORK ACTIVITY</b><em>CPU-H&nbsp;&nbsp;&nbsp; REGION&nbsp;&nbsp;&nbsp; NODE&nbsp;&nbsp;&nbsp; $CHANGE REWARD&nbsp;&nbsp;&nbsp; STATUS</em></div>
 <div className="ticker-track">{[...feed,...feed,...feed].map((a,i)=><i key={`${a.id}-${i}`}>[{a.time}] &nbsp;<b>{[128,320,64,512,96,240][i%6]} CPU-H</b>&nbsp; | &nbsp;{a.row[2]}&nbsp; | &nbsp;node-{a.row[3]}&nbsp; | &nbsp;<em>+{(6.4+i*3.1).toFixed(1)} $CHANGE</em>&nbsp; | &nbsp;<strong>COMPLETED</strong></i>)}</div>
 </section> }

export default function App(){
 const [mobile,setMobile]=useState(false), [modal,setModal]=useState(false), [metrics,setMetrics]=useState([]), [activity,setActivity]=useState([]), [tick,setTick]=useState(0)
 useEffect(()=>{dataProvider.getMetrics().then(setMetrics); dataProvider.getActivity().then(setActivity)},[])
 useEffect(()=>{if(!activity.length)return;const id=setInterval(()=>setActivity(items=>dataProvider.refreshActivity(items)),3500);return()=>clearInterval(id)},[activity.length])
 useEffect(()=>{const id=setInterval(()=>setTick(x=>x+1),2400);return()=>clearInterval(id)},[])
 useEffect(()=>{const obs=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('visible')),{threshold:.12});document.querySelectorAll('.reveal').forEach(x=>obs.observe(x));return()=>obs.disconnect()},[])
 return <main>
  <div className="noise"/><SiteHeader onWallet={()=>setModal(true)} onMenu={()=>setMobile(!mobile)} mobile={mobile}/>
  {mobile&&<div className="mobile-nav">{nav.map(x=><a key={x} onClick={()=>setMobile(false)} href={`#${x.toLowerCase()}`}>{x}</a>)}</div>}
  <section className="hero" id="home"><div className="ambient"/><div className="hud-sweep"/><div className="hero-stage"><HeroCopy onVision={()=>setModal(true)}/><div className="hero-visual"><Globe/></div><HudRail/></div><MetricsDashboard tick={tick} points={metrics}/><ExchangeTicker activity={activity}/></section>
  <section className="network section reveal"><div className="section-title"><div><Label n="NET.02">REAL-TIME DATA STREAM</Label><h2>LIVE<br/><em>NETWORK</em></h2></div><p>Distributed activity across the CHANGE network.<br/><span>Simulation feed / mock data</span></p></div><div className="table"><div className="tr th"><span>AMOUNT</span><span>ACTIVITY</span><span>REGION</span><span>NODE</span><span>STATUS</span><span>TIME</span></div>{activity.map(({id,row,time})=><div className="tr" key={id}>{row.map((v,i)=><span key={i} className={i===4?'status':''}>{i===4&&<b/>}{v}</span>)}<span>{time}</span></div>)}</div><div className="ticker">CHANGE NETWORK <i>●</i> ALL SYSTEMS OPERATIONAL <i>●</i> GLOBAL NODE FABRIC <i>●</i> MOCK DATA STREAM</div></section>
  <section className="protocol section" id="protocol"><div className="section-title reveal"><div><Label n="PRT.03">CORE SYSTEM</Label><h2>BUILT TO<br/><em>ADAPT.</em></h2></div><p>Modular infrastructure for an open,<br/>connected and continuously evolving world.</p></div><div className="feature-grid">{protocolFeatures.map(([n,t,d])=><article className="feature reveal" key={t}><span>[{n}]</span><Crosshair/><h3>{t}</h3><p>{d}</p><ArrowUpRight className="arrow"/></article>)}</div></section>
  <Exchange/>
  <section className="roadmap section" id="roadmap"><div className="section-title reveal"><div><Label n="MAP.05">SYSTEM EVOLUTION</Label><h2>THE PATH<br/><em>FORWARD.</em></h2></div><p>Six phases. One continuously<br/>expanding network.</p></div><div className="phases">{roadmap.map(([n,t,d],i)=><article className="phase reveal" key={t}><div><span>PHASE {n}</span><b className={i<2?'active':''}>{i<2?'ACTIVE':'QUEUED'}</b></div><strong>{t}</strong><p>{d}</p><i>0{roadmap.length-i}</i></article>)}</div></section>
  <section className="docs section" id="docs"><Label n="DOC.06">KNOWLEDGE BASE</Label><div className="docs-grid"><div><h2>READ THE<br/><em>SYSTEM.</em></h2><p>An evolving technical overview of the CHANGE vision, network, protocol and open ecosystem.</p><button onClick={()=>setModal(true)}>OPEN WHITEPAPER <ArrowUpRight/></button></div><div className="doc-list">{['INTRODUCTION','VISION','NETWORK','PROTOCOL','CHANGE','ECOSYSTEM','ROADMAP'].map((x,i)=><div key={x}><span>0{i+1}</span>{x}<small>OVERVIEW</small><ArrowUpRight/></div>)}</div></div></section>
  <footer><div className="footer-brand"><img src={`${import.meta.env.BASE_URL}assets/logo-placeholder.svg`}/><strong>CHANGE</strong></div><p>EVERYTHING CHANGES.<br/>BUILD FOR WHAT COMES NEXT.</p><div><span>© 2026 CHANGE NETWORK</span><span>SIMULATED PRODUCT CONCEPT</span></div></footer>
  {modal&&<div className="modal" onClick={()=>setModal(false)}><div onClick={e=>e.stopPropagation()}><button onClick={()=>setModal(false)}><X/></button><Label n="STATUS">PRODUCT UPDATE</Label><h2>COMING<br/><em>SOON.</em></h2><p>The CHANGE network is currently in development.<br/>No wallet or funds are connected.</p><span className="blink">● STANDBY</span></div></div>}
 </main>
}

function Exchange(){const bars=[40,68,52,80,58,92,76,105,88,120,98,135,115,142,128,158];return <section className="exchange section" id="exchange"><div className="section-title reveal"><div><Label n="EXC.04">PRODUCT PREVIEW</Label><h2>CHANGE<br/><em>EXCHANGE.</em></h2></div><p>A precision terminal for a market<br/>that never stops moving.</p></div><div className="terminal reveal"><div className="term-head"><span>CHG / USD <b>+4.27%</b></span><span>MARKET <i>● LIVE PREVIEW</i></span><strong>COMING SOON</strong></div><div className="chart"><div className="price"><small>CHANGE PRICE</small><b>$ 0.08472</b><span>+$0.0034 (4.27%)</span></div><svg viewBox="0 0 800 260" preserveAspectRatio="none"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#b7ff2a" stopOpacity=".2"/><stop offset="1" stopColor="#b7ff2a" stopOpacity="0"/></linearGradient></defs><path className="area" d="M0 220 C90 210 100 145 180 170 S280 120 340 150 S430 90 500 115 S620 30 800 52 L800 260 L0 260Z"/><path d="M0 220 C90 210 100 145 180 170 S280 120 340 150 S430 90 500 115 S620 30 800 52"/></svg><div className="volume">{bars.map((h,i)=><i style={{height:h}} key={i}/>)}</div></div><div className="order"><h4>ORDER BOOK <span>CHG/USD</span></h4>{[['0.08488','12,840'],['0.08482','8,441'],['0.08479','21,084'],['0.08472','—'],['0.08468','17,400'],['0.08461','7,309']].map((r,i)=><div key={r[0]} className={i<3?'sell':'buy'}><span>{r[0]}</span><span>{r[1]}</span></div>)}</div><div className="trade"><h4>PLACE ORDER <span>LIMIT</span></h4><label>AVAILABLE <span>0.00 USD</span></label><div>PRICE <b>$ 0.08472</b></div><div>AMOUNT <b>0 CHG</b></div><button>CONNECT WALLET</button><small>Preview only. Trading is not active.</small></div></div></section>}
