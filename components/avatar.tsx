'use client';
export const portraitNames=['The Queen','The Oracle','The Guardian','The Rogue','The Seer','The Pharaoh','The Explorer','The Scholar','The Jackal','The Lion','The Owl','The Serpent'];
export function Avatar({value=0,className=''}:{value?:number;className?:string}){
 const index=Number.isInteger(value)&&value>=0&&value<12?value:0;
 return <span className={'avatar portrait '+className} role="img" aria-label={portraitNames[index]} style={{backgroundImage:'url(/art/portraits.png)',backgroundSize:'400% 300%',backgroundPosition:`${(index%4)*100/3}% ${Math.floor(index/4)*50}%`}}/>;
}
export function AvatarPicker({value,onChange}:{value:number;onChange:(value:number)=>void}){
 return <fieldset className="avatar-picker"><legend>Choose your portrait <span>{portraitNames[value]}</span></legend><div className="portrait-grid">{portraitNames.map((name,i)=><button type="button" key={name} aria-label={name} aria-pressed={value===i} className={value===i?'chosen':''} onClick={()=>onChange(i)}><Avatar value={i}/><span className="portrait-selected" aria-hidden="true">✓</span></button>)}</div></fieldset>;
}
