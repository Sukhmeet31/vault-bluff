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
 lobby:["All right! Who's got the best poker face?","Come on in. Let's see what you've got.","Oh, this should be good. Ready?"],
 claim:["Okay... sell me that story.","Six gems? Bold. I like it.","Go on. Make them believe you.","Ten seconds. Trust that poker face!"],
 judge:["Hmm... would you trust that face?","Oh, really? I'm not so sure.","Your call. Honest... or bluffing?","Something feels fishy. What do you think?"],
 reveal:["Oh! Now that's a reveal.","Ha! Somebody's poker face needs work.","Well played. I did not see that coming.","And there it is! The truth comes out."],
 finished:["What a game! Take a bow.","Now that's how you win a vault. Again?","We have a champion! Fancy a rematch?"]
};
function bestVoice(voices:SpeechSynthesisVoice[]){
 const english=voices.filter(v=>/^en([_-]|$)/i.test(v.lang));
 const score=(v:SpeechSynthesisVoice)=>/natural|neural|premium|enhanced/i.test(v.name)?100:/Google (US|UK) English/i.test(v.name)?80:/Samantha|Ava|Serena|Daniel|Aria|Jenny/i.test(v.name)?60:v.default?20:0;
 return english.sort((a,b)=>score(b)-score(a))[0];
}
export function Oracle({phase,round,sound,paused}:{phase:string;round:number;sound:boolean;paused:boolean}){
 const [talking,setTalking]=useState(false);
 const choices=lines[phase]||lines.lobby,text=choices[round%choices.length];
 useEffect(()=>{
  if(paused){setTalking(false);return;}
  let disposed=false,started=false,timer:ReturnType<typeof setTimeout>|undefined;
  const synth='speechSynthesis' in window?window.speechSynthesis:null;
  const stop=()=>{if(!disposed)setTalking(false);};
  function speak(){if(disposed||started||!synth)return;started=true;
   const speech=new SpeechSynthesisUtterance(text),voice=bestVoice(synth.getVoices());
   if(voice){speech.voice=voice;speech.lang=voice.lang;}else speech.lang='en-US';
   // Let the chosen voice keep its natural register; short phrases carry the expression.
   speech.rate=phase==='finished'?1.08:1.02;speech.pitch=1;speech.volume=.85;
   speech.onstart=()=>{if(!disposed)setTalking(true);};speech.onend=stop;speech.onerror=stop;
   synth.cancel();synth.speak(speech);
  }
  if(sound&&synth){if(synth.getVoices().length)speak();else{synth.addEventListener('voiceschanged',speak);timer=setTimeout(speak,500);}}
  else{setTalking(true);timer=setTimeout(stop,2300);}
  return()=>{disposed=true;clearTimeout(timer);synth?.removeEventListener('voiceschanged',speak);synth?.cancel();};
 },[text,sound,paused,phase]);
 return <div className={'oracle '+(talking&&!paused?'speaking':'')}><div className="oracle-portrait"><Avatar value={1}/><span className="voice-bars" aria-hidden="true"><i/><i/><i/></span></div><div><strong>The Oracle</strong><p role="status">{text}</p></div></div>;
}
