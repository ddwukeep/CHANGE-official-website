import { useEffect, useRef, useState } from 'react'

const regions = [
  ['NORTH AMERICA','124,892','+12.4%','na'], ['EUROPE','98,431','+8.7%','eu'],
  ['ASIA','206,315','+15.2%','as'], ['SOUTH AMERICA','67,124','+11.1%','sa'],
  ['MIDDLE EAST','53,621','+9.3%','me'], ['AFRICA','41,327','+10.6%','af'],
]

export default function Globe() {
  const ref = useRef(null), wrap = useRef(null), [shift,setShift] = useState({x:0,y:0})
  useEffect(() => {
    const canvas=ref.current, ctx=canvas.getContext('2d'); let frame,t=0
    const dots=Array.from({length:1250},(_,i)=>({lat:Math.acos(1-2*(i+.5)/1250)-Math.PI/2,lon:Math.PI*(1+Math.sqrt(5))*i}))
    const resize=()=>{const d=Math.min(devicePixelRatio,1.7),s=canvas.clientWidth;canvas.width=s*d;canvas.height=s*d;ctx.setTransform(d,0,0,d,0,0)}
    const draw=()=>{const s=canvas.clientWidth,c=s/2,r=s*.425;ctx.clearRect(0,0,s,s);t+=.0015
      const g=ctx.createRadialGradient(c-r*.3,c-r*.35,r*.03,c,c,r*1.12);g.addColorStop(0,'rgba(155,255,110,.22)');g.addColorStop(.7,'rgba(28,180,24,.11)');g.addColorStop(.9,'rgba(16,90,12,.06)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(c,c,r*1.12,0,7);ctx.fill()
      ctx.shadowColor='#64ff35';ctx.shadowBlur=12;ctx.strokeStyle='rgba(115,255,70,.75)';ctx.lineWidth=.8;ctx.beginPath();ctx.arc(c,c,r,0,7);ctx.stroke();ctx.shadowBlur=0
      for(let j=1;j<6;j++){ctx.strokeStyle='rgba(104,255,58,.13)';ctx.beginPath();ctx.ellipse(c,c,r*Math.cos(j*Math.PI/12),r,0,0,7);ctx.stroke();ctx.beginPath();ctx.ellipse(c,c,r,r*Math.cos(j*Math.PI/12),0,0,7);ctx.stroke()}
      const p=[];dots.forEach((d,i)=>{const q=d.lon+t,x=Math.cos(d.lat)*Math.sin(q),y=Math.sin(d.lat),z=Math.cos(d.lat)*Math.cos(q);if(z>-.08){const px=c+x*r,py=c-y*r;p.push([px,py,z,i]);const hot=(Math.sin(d.lon*3+d.lat*7)+Math.cos(d.lon*5-d.lat*4))>1.05;ctx.fillStyle=`rgba(${hot?'160,255,105':'83,255,42'},${.22+Math.max(z,0)*.72})`;const size=hot&&z>.25?1.8:1;ctx.fillRect(px,py,size,size)}})
      for(let i=0;i<38;i++){const a=p[(i*29+17)%p.length],b=p[(i*61+133)%p.length];if(!a||!b)continue;const mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2-r*(.18+(i%5)*.035);ctx.strokeStyle=`rgba(125,255,79,${.1+(i%4)*.035})`;ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.quadraticCurveTo(mx,my,b[0],b[1]);ctx.stroke();const u=(t*55+i*.137)%1,ix=(1-u)*(1-u)*a[0]+2*(1-u)*u*mx+u*u*b[0],iy=(1-u)*(1-u)*a[1]+2*(1-u)*u*my+u*u*b[1];ctx.shadowColor='#8cff55';ctx.shadowBlur=8;ctx.fillStyle='#d7ffc2';ctx.beginPath();ctx.arc(ix,iy,1.3,0,7);ctx.fill();ctx.shadowBlur=0}
      for(let i=0;i<14;i++){const a=p[(i*73+Math.floor(t*500))%p.length];if(!a)continue;const pulse=3+(Math.sin(t*38+i)+1)*3.5;ctx.strokeStyle='rgba(140,255,91,.65)';ctx.beginPath();ctx.arc(a[0],a[1],pulse,0,7);ctx.stroke();ctx.shadowColor='#8cff45';ctx.shadowBlur=13;ctx.fillStyle='#d4ffc2';ctx.beginPath();ctx.arc(a[0],a[1],2.5,0,7);ctx.fill();ctx.shadowBlur=0}
      frame=requestAnimationFrame(draw)}
    resize();draw();addEventListener('resize',resize);return()=>{cancelAnimationFrame(frame);removeEventListener('resize',resize)}
  },[])
  const move=e=>{const b=wrap.current.getBoundingClientRect();setShift({x:(e.clientX-b.left-b.width/2)/b.width*12,y:(e.clientY-b.top-b.height/2)/b.height*12})}
  return <div className="globe-wrap" ref={wrap} onMouseMove={move} onMouseLeave={()=>setShift({x:0,y:0})} style={{transform:`translate(${shift.x}px,${shift.y}px)`}}><div className="globe-halo"/><div className="orbit orbit-a"/><div className="orbit orbit-b"/><canvas ref={ref}/>{regions.map(([name,nodes,gain,pos])=><div className={`globe-tag ${pos}`} key={name}><span>{name}</span><b>{nodes} NODES</b><em>{gain}</em><i>▂▄▆█</i></div>)}<div className="mock-badge">SIMULATED NETWORK VISUALIZATION</div></div>
}
