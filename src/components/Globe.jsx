import { useEffect, useRef } from 'react'

export default function Globe() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current, ctx = canvas.getContext('2d'); let frame, t = 0
    const dots = Array.from({length: 240}, (_,i) => ({lat: Math.acos(1-2*(i+.5)/240)-Math.PI/2, lon: Math.PI*(1+Math.sqrt(5))*i}))
    const resize = () => { const d=Math.min(devicePixelRatio,2), s=canvas.clientWidth; canvas.width=s*d; canvas.height=s*d; ctx.setTransform(d,0,0,d,0,0) }
    const draw = () => { const s=canvas.clientWidth, c=s/2, r=s*.37; ctx.clearRect(0,0,s,s); t+=.002
      const projected=[]; dots.forEach((p,i)=>{ const lon=p.lon+t, x=Math.cos(p.lat)*Math.sin(lon), y=Math.sin(p.lat), z=Math.cos(p.lat)*Math.cos(lon); if(z>-.15){ projected.push([c+x*r,c-y*r,z,i]); ctx.fillStyle=`rgba(183,255,42,${.12+z*.55})`; ctx.beginPath();ctx.arc(c+x*r,c-y*r, z>.75?1.7:1,0,7);ctx.fill() } })
      ctx.strokeStyle='rgba(183,255,42,.15)'; ctx.lineWidth=.7; for(let i=0;i<projected.length-12;i+=17){const a=projected[i],b=projected[(i+37)%projected.length];ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.quadraticCurveTo(c,c-r*.35,b[0],b[1]);ctx.stroke()}
      const pulse=4+Math.sin(t*25)*2; [[.62,.32],[.73,.48],[.34,.42],[.56,.63]].forEach(([x,y])=>{ctx.strokeStyle='rgba(183,255,42,.5)';ctx.beginPath();ctx.arc(s*x,s*y,pulse,0,7);ctx.stroke();ctx.fillStyle='#b7ff2a';ctx.fillRect(s*x-1,s*y-1,2,2)})
      frame=requestAnimationFrame(draw) }
    resize(); draw(); addEventListener('resize',resize); return()=>{cancelAnimationFrame(frame);removeEventListener('resize',resize)}
  },[])
  return <div className="globe-wrap"><div className="orbit orbit-a"/><div className="orbit orbit-b"/><canvas ref={ref}/><div className="globe-tag gt1">NORTH AMERICA <b>●</b></div><div className="globe-tag gt2">EUROPE <b>●</b></div><div className="globe-tag gt3">ASIA <b>●</b></div><div className="globe-coord">43° 08' 56.4" N<br/>12° 32' 14.9" E</div></div>
}
