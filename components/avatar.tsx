'use client';
import {useRef,type CSSProperties} from 'react';
export const portraitNames=['The Queen','The Oracle','The Guardian','The Rogue','The Seer','The Pharaoh','The Explorer','The Scholar','The Jackal','The Lion','The Owl','The Serpent'];
export function Avatar({value=0,className=''}:{value?:number;className?:string}){
 const index=Number.isInteger(value)&&value>=0&&value<12?value:0;
 return <span className={'avatar portrait '+className} role="img" aria-label={portraitNames[index]} style={{backgroundImage:'url(/art/portraits.png)',backgroundSize:'400% 300%',backgroundPosition:`${(index%4)*100/3}% ${Math.floor(index/4)*50}%`}}/>;
}
export function AvatarPicker({value,onChange}:{value:number;onChange:(value:number)=>void}){
 const preview=useRef<HTMLDivElement>(null);
 function tilt(x:number,y:number){preview.current?.style.setProperty('--look-x',`${x}deg`);preview.current?.style.setProperty('--look-y',`${y}deg`);}
 return <fieldset className="avatar-picker"><legend>Choose your portrait</legend><div className="portrait-choice-layout"><div className="portrait-grid">{portraitNames.map((name,i)=><button type="button" key={name} aria-label={name} aria-pressed={value===i} className={value===i?'chosen':''} onClick={()=>onChange(i)}><Avatar value={i}/><span className="portrait-selected" aria-hidden="true">✓</span></button>)}</div><div className="portrait-preview" key={value} ref={preview} onPointerMove={e=>{const r=e.currentTarget.getBoundingClientRect();tilt((e.clientX-r.left-r.width/2)/r.width*18,-(e.clientY-r.top-r.height/2)/r.height*12);}} onPointerLeave={()=>tilt(0,0)}><div className="portrait-aura"/><div className="portrait-orbit" aria-hidden="true"/><div className="living-portrait"><Avatar value={value}/><span className="portrait-shimmer" aria-hidden="true"/></div><div className="portrait-sparks" aria-hidden="true">{Array.from({length:5},(_,i)=><i key={i} style={{'--spark':i} as CSSProperties}/>)}</div><strong>{portraitNames[value]}</strong></div></div></fieldset>;
}
