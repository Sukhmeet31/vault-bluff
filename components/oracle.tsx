'use client';
import {useEffect,useState} from 'react';
import {Avatar} from './avatar';

let context:AudioContext|undefined;
export function unlockAudio(){try{context??=new AudioContext();void context.resume();}catch{}}
export function effect(kind='tap'){
 try{if(!context||context.state!=='running')return;
 const notes:Record<string,number[]>={tap:[540,760],claim:[330,440,660],judge:[392,294],reveal:[262,330,392,523],finished:[392,523,659,784],lobby:[440,554,659],tick:[880]};
 (notes[kind]||notes.tap).forEach((hz,i)=>{const t=context!.currentTime+i*.11,o=context!.createOscillator(),g=context!.createGain();o.type=kind==='judge'?'triangle':'sine';o.frequency.setValueAtTime(hz,t);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.065,t+.01);g.gain.exponentialRampToValueAtTime(.001,t+.24);o.connect(g);g.connect(context!.destination);o.start(t);o.stop(t+.25);});
 }catch{}
}
const lines:Record<string,string[]>={
 lobby:['Welcome, treasure seekers. Who brought their poker face?','Gather your friends. The vault can wait.'],
 claim:['Your gems, your secret. Make your story convincing.','A little confidence goes a long way in this temple.'],
 judge:['Trust your instincts. Or question absolutely everything.','That claim sounds bold. Is it too bold?'],
 reveal:['The vault has spoken. How good was your poker face?','Some legends are built on very convincing lies.'],
 finished:['A crown for the cleverest. Shall we tempt fate again?','The treasure has a new keeper. Rematch, anyone?']
};
export function Oracle({phase,round,sound,paused}:{phase:string;round:number;sound:boolean;paused:boolean}){
 const [beat,setBeat]=useState(0),[talking,setTalking]=useState(false);
 const text=(lines[phase]||lines.lobby)[(round+beat)%2];
 useEffect(()=>{setBeat(0);const timer=setInterval(()=>setBeat(n=>n+1),14000);return()=>clearInterval(timer);},[phase,round]);
 useEffect(()=>{if(paused)return;setTalking(true);let timer=setTimeout(()=>setTalking(false),4000);
 if(sound&&'speechSynthesis' in window){const speech=new SpeechSynthesisUtterance(text);speech.rate=.94;speech.pitch=.85;speech.volume=.8;speech.onend=()=>setTalking(false);speech.onerror=()=>setTalking(false);window.speechSynthesis.cancel();window.speechSynthesis.speak(speech);}
 return()=>{clearTimeout(timer);if('speechSynthesis' in window)window.speechSynthesis.cancel();};
 },[text,sound,paused]);
 return <div className={'oracle '+(talking&&!paused?'speaking':'')}><div className="oracle-portrait"><Avatar value={1}/><span className="voice-bars" aria-hidden="true"><i/><i/><i/></span></div><div><strong>The Oracle</strong><p role="status">{text}</p></div></div>;
}
