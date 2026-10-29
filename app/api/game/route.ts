import {env} from 'cloudflare:workers';
import {createRoom,joinRoom,act,advance,touch,view,type Room} from '../../../lib/game';
export const dynamic='force-dynamic';
const json=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
export async function POST(req:Request){
 try{
 if(req.headers.get('origin')&&req.headers.get('origin')!==new URL(req.url).origin)return json({error:'Invalid origin.'},403);
 if(Number(req.headers.get('content-length')||0)>4096)return json({error:'Request too large.'},413);
 const b=await req.json() as Record<string,any>;const db=env.DB!;const now=Date.now();
 if(b.action==='create'){
 const token=typeof b.token==='string'&&/^[a-f0-9-]{36}$/.test(b.token)?b.token:crypto.randomUUID();const existing=await db.prepare("SELECT state,revision FROM rooms WHERE json_extract(state,'$.players[0].token')=? AND created>? LIMIT 1").bind(token,now-86400000).first<{state:string;revision:number}>();if(existing){const r=JSON.parse(existing.state);return json({token,revision:existing.revision,...view(r,token,now)});}for(let i=0;i<5;i++){const chars='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';const code=Array.from(crypto.getRandomValues(new Uint8Array(5)),v=>chars[v%chars.length]).join('');const r=createRoom(code,token,b.name,now);const saved=await db.prepare('INSERT OR IGNORE INTO rooms(code,state,revision,created) VALUES(?,?,0,?)').bind(code,JSON.stringify(r),now).run();if(saved.meta.changes)return json({token,revision:0,...view(r,token,now)});}throw Error('Please try creating a room again.');
 }
 const code=String(b.code||'').toUpperCase().replace(/\s/g,'');if(!/^[A-Z2-9]{5}$/.test(code))throw Error('Enter the five-character room code.');
 const token=String(b.token||'');if(!/^[a-f0-9-]{36}$/.test(token))throw Error('Invalid player session.');
 for(let attempt=0;attempt<12;attempt++){
 const row=await db.prepare('SELECT state,revision FROM rooms WHERE code=?').bind(code).first<{state:string;revision:number}>();if(!row)throw Error('Room not found. Check the code and try again.');
 const r=JSON.parse(row.state) as Room;if(now-r.created>86400000)throw Error('This room has expired. Create a new room.');advance(r,now);
 if(b.action==='join'){if(r.players.some(p=>p.token===token))touch(r,token,now);else joinRoom(r,token,b.name,now);}else{const player=touch(r,token,now);if(b.action==='leave'){if(r.phase==='lobby'){r.players=r.players.filter(p=>p.id!==player.id);if(r.host===player.id)r.host=r.players[0]?.id||'';}else{player.lastSeen=0;if(r.host===player.id)r.host=r.players.find(p=>p.id!==player.id&&now-p.lastSeen<15000)?.id||r.host;}}else if(b.action!=='sync'){if(b.round!==r.round||b.phase!==r.phase)throw Error('The round has moved on. Your screen will refresh.');act(r,token,b.action,b.value,now);}}
 const result=await db.prepare('UPDATE rooms SET state=?,revision=revision+1 WHERE code=? AND revision=?').bind(JSON.stringify(r),code,row.revision).run();
 if(result.meta.changes&&b.action==='leave')return json({left:true});if(result.meta.changes)return json({revision:row.revision+1,...(b.action==='join'?{token}:{}),...view(r,token,now)});
 }
 return json({error:'Room is busy. Please try again.'},409);
 }catch(e){return json({error:e instanceof Error?e.message:'Something went wrong.'},400);}
}
