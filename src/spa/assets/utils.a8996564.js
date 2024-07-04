import{A as I}from"./API.3709199d.js";var S=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},M={};/*!
 *  howler.js v2.2.4
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */(function(w){(function(){var v=function(){this.init()};v.prototype={init:function(){var e=this||r;return e._counter=1e3,e._html5AudioPool=[],e.html5PoolSize=10,e._codecs={},e._howls=[],e._muted=!1,e._volume=1,e._canPlayEvent="canplaythrough",e._navigator=typeof window!="undefined"&&window.navigator?window.navigator:null,e.masterGain=null,e.noAudio=!1,e.usingWebAudio=!0,e.autoSuspend=!0,e.ctx=null,e.autoUnlock=!0,e._setup(),e},volume:function(e){var t=this||r;if(e=parseFloat(e),t.ctx||g(),typeof e!="undefined"&&e>=0&&e<=1){if(t._volume=e,t._muted)return t;t.usingWebAudio&&t.masterGain.gain.setValueAtTime(e,r.ctx.currentTime);for(var n=0;n<t._howls.length;n++)if(!t._howls[n]._webAudio)for(var o=t._howls[n]._getSoundIds(),s=0;s<o.length;s++){var l=t._howls[n]._soundById(o[s]);l&&l._node&&(l._node.volume=l._volume*e)}return t}return t._volume},mute:function(e){var t=this||r;t.ctx||g(),t._muted=e,t.usingWebAudio&&t.masterGain.gain.setValueAtTime(e?0:t._volume,r.ctx.currentTime);for(var n=0;n<t._howls.length;n++)if(!t._howls[n]._webAudio)for(var o=t._howls[n]._getSoundIds(),s=0;s<o.length;s++){var l=t._howls[n]._soundById(o[s]);l&&l._node&&(l._node.muted=e?!0:l._muted)}return t},stop:function(){for(var e=this||r,t=0;t<e._howls.length;t++)e._howls[t].stop();return e},unload:function(){for(var e=this||r,t=e._howls.length-1;t>=0;t--)e._howls[t].unload();return e.usingWebAudio&&e.ctx&&typeof e.ctx.close!="undefined"&&(e.ctx.close(),e.ctx=null,g()),e},codecs:function(e){return(this||r)._codecs[e.replace(/^x-/,"")]},_setup:function(){var e=this||r;if(e.state=e.ctx&&e.ctx.state||"suspended",e._autoSuspend(),!e.usingWebAudio)if(typeof Audio!="undefined")try{var t=new Audio;typeof t.oncanplaythrough=="undefined"&&(e._canPlayEvent="canplay")}catch{e.noAudio=!0}else e.noAudio=!0;try{var t=new Audio;t.muted&&(e.noAudio=!0)}catch{}return e.noAudio||e._setupCodecs(),e},_setupCodecs:function(){var e=this||r,t=null;try{t=typeof Audio!="undefined"?new Audio:null}catch{return e}if(!t||typeof t.canPlayType!="function")return e;var n=t.canPlayType("audio/mpeg;").replace(/^no$/,""),o=e._navigator?e._navigator.userAgent:"",s=o.match(/OPR\/(\d+)/g),l=s&&parseInt(s[0].split("/")[1],10)<33,a=o.indexOf("Safari")!==-1&&o.indexOf("Chrome")===-1,f=o.match(/Version\/(.*?) /),m=a&&f&&parseInt(f[1],10)<15;return e._codecs={mp3:!!(!l&&(n||t.canPlayType("audio/mp3;").replace(/^no$/,""))),mpeg:!!n,opus:!!t.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!(t.canPlayType('audio/wav; codecs="1"')||t.canPlayType("audio/wav")).replace(/^no$/,""),aac:!!t.canPlayType("audio/aac;").replace(/^no$/,""),caf:!!t.canPlayType("audio/x-caf;").replace(/^no$/,""),m4a:!!(t.canPlayType("audio/x-m4a;")||t.canPlayType("audio/m4a;")||t.canPlayType("audio/aac;")).replace(/^no$/,""),m4b:!!(t.canPlayType("audio/x-m4b;")||t.canPlayType("audio/m4b;")||t.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(t.canPlayType("audio/x-mp4;")||t.canPlayType("audio/mp4;")||t.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!(!m&&t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),webm:!!(!m&&t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),dolby:!!t.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,""),flac:!!(t.canPlayType("audio/x-flac;")||t.canPlayType("audio/flac;")).replace(/^no$/,"")},e},_unlockAudio:function(){var e=this||r;if(!(e._audioUnlocked||!e.ctx)){e._audioUnlocked=!1,e.autoUnlock=!1,!e._mobileUnloaded&&e.ctx.sampleRate!==44100&&(e._mobileUnloaded=!0,e.unload()),e._scratchBuffer=e.ctx.createBuffer(1,1,22050);var t=function(n){for(;e._html5AudioPool.length<e.html5PoolSize;)try{var o=new Audio;o._unlocked=!0,e._releaseHtml5Audio(o)}catch{e.noAudio=!0;break}for(var s=0;s<e._howls.length;s++)if(!e._howls[s]._webAudio)for(var l=e._howls[s]._getSoundIds(),a=0;a<l.length;a++){var f=e._howls[s]._soundById(l[a]);f&&f._node&&!f._node._unlocked&&(f._node._unlocked=!0,f._node.load())}e._autoResume();var m=e.ctx.createBufferSource();m.buffer=e._scratchBuffer,m.connect(e.ctx.destination),typeof m.start=="undefined"?m.noteOn(0):m.start(0),typeof e.ctx.resume=="function"&&e.ctx.resume(),m.onended=function(){m.disconnect(0),e._audioUnlocked=!0,document.removeEventListener("touchstart",t,!0),document.removeEventListener("touchend",t,!0),document.removeEventListener("click",t,!0),document.removeEventListener("keydown",t,!0);for(var A=0;A<e._howls.length;A++)e._howls[A]._emit("unlock")}};return document.addEventListener("touchstart",t,!0),document.addEventListener("touchend",t,!0),document.addEventListener("click",t,!0),document.addEventListener("keydown",t,!0),e}},_obtainHtml5Audio:function(){var e=this||r;if(e._html5AudioPool.length)return e._html5AudioPool.pop();var t=new Audio().play();return t&&typeof Promise!="undefined"&&(t instanceof Promise||typeof t.then=="function")&&t.catch(function(){console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")}),new Audio},_releaseHtml5Audio:function(e){var t=this||r;return e._unlocked&&t._html5AudioPool.push(e),t},_autoSuspend:function(){var e=this;if(!(!e.autoSuspend||!e.ctx||typeof e.ctx.suspend=="undefined"||!r.usingWebAudio)){for(var t=0;t<e._howls.length;t++)if(e._howls[t]._webAudio){for(var n=0;n<e._howls[t]._sounds.length;n++)if(!e._howls[t]._sounds[n]._paused)return e}return e._suspendTimer&&clearTimeout(e._suspendTimer),e._suspendTimer=setTimeout(function(){if(!!e.autoSuspend){e._suspendTimer=null,e.state="suspending";var o=function(){e.state="suspended",e._resumeAfterSuspend&&(delete e._resumeAfterSuspend,e._autoResume())};e.ctx.suspend().then(o,o)}},3e4),e}},_autoResume:function(){var e=this;if(!(!e.ctx||typeof e.ctx.resume=="undefined"||!r.usingWebAudio))return e.state==="running"&&e.ctx.state!=="interrupted"&&e._suspendTimer?(clearTimeout(e._suspendTimer),e._suspendTimer=null):e.state==="suspended"||e.state==="running"&&e.ctx.state==="interrupted"?(e.ctx.resume().then(function(){e.state="running";for(var t=0;t<e._howls.length;t++)e._howls[t]._emit("resume")}),e._suspendTimer&&(clearTimeout(e._suspendTimer),e._suspendTimer=null)):e.state==="suspending"&&(e._resumeAfterSuspend=!0),e}};var r=new v,i=function(e){var t=this;if(!e.src||e.src.length===0){console.error("An array of source files must be passed with any new Howl.");return}t.init(e)};i.prototype={init:function(e){var t=this;return r.ctx||g(),t._autoplay=e.autoplay||!1,t._format=typeof e.format!="string"?e.format:[e.format],t._html5=e.html5||!1,t._muted=e.mute||!1,t._loop=e.loop||!1,t._pool=e.pool||5,t._preload=typeof e.preload=="boolean"||e.preload==="metadata"?e.preload:!0,t._rate=e.rate||1,t._sprite=e.sprite||{},t._src=typeof e.src!="string"?e.src:[e.src],t._volume=e.volume!==void 0?e.volume:1,t._xhr={method:e.xhr&&e.xhr.method?e.xhr.method:"GET",headers:e.xhr&&e.xhr.headers?e.xhr.headers:null,withCredentials:e.xhr&&e.xhr.withCredentials?e.xhr.withCredentials:!1},t._duration=0,t._state="unloaded",t._sounds=[],t._endTimers={},t._queue=[],t._playLock=!1,t._onend=e.onend?[{fn:e.onend}]:[],t._onfade=e.onfade?[{fn:e.onfade}]:[],t._onload=e.onload?[{fn:e.onload}]:[],t._onloaderror=e.onloaderror?[{fn:e.onloaderror}]:[],t._onplayerror=e.onplayerror?[{fn:e.onplayerror}]:[],t._onpause=e.onpause?[{fn:e.onpause}]:[],t._onplay=e.onplay?[{fn:e.onplay}]:[],t._onstop=e.onstop?[{fn:e.onstop}]:[],t._onmute=e.onmute?[{fn:e.onmute}]:[],t._onvolume=e.onvolume?[{fn:e.onvolume}]:[],t._onrate=e.onrate?[{fn:e.onrate}]:[],t._onseek=e.onseek?[{fn:e.onseek}]:[],t._onunlock=e.onunlock?[{fn:e.onunlock}]:[],t._onresume=[],t._webAudio=r.usingWebAudio&&!t._html5,typeof r.ctx!="undefined"&&r.ctx&&r.autoUnlock&&r._unlockAudio(),r._howls.push(t),t._autoplay&&t._queue.push({event:"play",action:function(){t.play()}}),t._preload&&t._preload!=="none"&&t.load(),t},load:function(){var e=this,t=null;if(r.noAudio){e._emit("loaderror",null,"No audio support.");return}typeof e._src=="string"&&(e._src=[e._src]);for(var n=0;n<e._src.length;n++){var o,s;if(e._format&&e._format[n])o=e._format[n];else{if(s=e._src[n],typeof s!="string"){e._emit("loaderror",null,"Non-string found in selected audio sources - ignoring.");continue}o=/^data:audio\/([^;,]+);/i.exec(s),o||(o=/\.([^.]+)$/.exec(s.split("?",1)[0])),o&&(o=o[1].toLowerCase())}if(o||console.warn('No file extension was found. Consider using the "format" property or specify an extension.'),o&&r.codecs(o)){t=e._src[n];break}}if(!t){e._emit("loaderror",null,"No codec support for selected audio sources.");return}return e._src=t,e._state="loading",window.location.protocol==="https:"&&t.slice(0,5)==="http:"&&(e._html5=!0,e._webAudio=!1),new u(e),e._webAudio&&c(e),e},play:function(e,t){var n=this,o=null;if(typeof e=="number")o=e,e=null;else{if(typeof e=="string"&&n._state==="loaded"&&!n._sprite[e])return null;if(typeof e=="undefined"&&(e="__default",!n._playLock)){for(var s=0,l=0;l<n._sounds.length;l++)n._sounds[l]._paused&&!n._sounds[l]._ended&&(s++,o=n._sounds[l]._id);s===1?e=null:o=null}}var a=o?n._soundById(o):n._inactiveSound();if(!a)return null;if(o&&!e&&(e=a._sprite||"__default"),n._state!=="loaded"){a._sprite=e,a._ended=!1;var f=a._id;return n._queue.push({event:"play",action:function(){n.play(f)}}),f}if(o&&!a._paused)return t||n._loadQueue("play"),a._id;n._webAudio&&r._autoResume();var m=Math.max(0,a._seek>0?a._seek:n._sprite[e][0]/1e3),A=Math.max(0,(n._sprite[e][0]+n._sprite[e][1])/1e3-m),b=A*1e3/Math.abs(a._rate),T=n._sprite[e][0]/1e3,k=(n._sprite[e][0]+n._sprite[e][1])/1e3;a._sprite=e,a._ended=!1;var O=function(){a._paused=!1,a._seek=m,a._start=T,a._stop=k,a._loop=!!(a._loop||n._sprite[e][2])};if(m>=k){n._ended(a);return}var h=a._node;if(n._webAudio){var H=function(){n._playLock=!1,O(),n._refreshBuffer(a);var x=a._muted||n._muted?0:a._volume;h.gain.setValueAtTime(x,r.ctx.currentTime),a._playStart=r.ctx.currentTime,typeof h.bufferSource.start=="undefined"?a._loop?h.bufferSource.noteGrainOn(0,m,86400):h.bufferSource.noteGrainOn(0,m,A):a._loop?h.bufferSource.start(0,m,86400):h.bufferSource.start(0,m,A),b!==1/0&&(n._endTimers[a._id]=setTimeout(n._ended.bind(n,a),b)),t||setTimeout(function(){n._emit("play",a._id),n._loadQueue()},0)};r.state==="running"&&r.ctx.state!=="interrupted"?H():(n._playLock=!0,n.once("resume",H),n._clearTimer(a._id))}else{var P=function(){h.currentTime=m,h.muted=a._muted||n._muted||r._muted||h.muted,h.volume=a._volume*r.volume(),h.playbackRate=a._rate;try{var x=h.play();if(x&&typeof Promise!="undefined"&&(x instanceof Promise||typeof x.then=="function")?(n._playLock=!0,O(),x.then(function(){n._playLock=!1,h._unlocked=!0,t?n._loadQueue():n._emit("play",a._id)}).catch(function(){n._playLock=!1,n._emit("playerror",a._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."),a._ended=!0,a._paused=!0})):t||(n._playLock=!1,O(),n._emit("play",a._id)),h.playbackRate=a._rate,h.paused){n._emit("playerror",a._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");return}e!=="__default"||a._loop?n._endTimers[a._id]=setTimeout(n._ended.bind(n,a),b):(n._endTimers[a._id]=function(){n._ended(a),h.removeEventListener("ended",n._endTimers[a._id],!1)},h.addEventListener("ended",n._endTimers[a._id],!1))}catch(B){n._emit("playerror",a._id,B)}};h.src==="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"&&(h.src=n._src,h.load());var L=window&&window.ejecta||!h.readyState&&r._navigator.isCocoonJS;if(h.readyState>=3||L)P();else{n._playLock=!0,n._state="loading";var F=function(){n._state="loaded",P(),h.removeEventListener(r._canPlayEvent,F,!1)};h.addEventListener(r._canPlayEvent,F,!1),n._clearTimer(a._id)}}return a._id},pause:function(e){var t=this;if(t._state!=="loaded"||t._playLock)return t._queue.push({event:"pause",action:function(){t.pause(e)}}),t;for(var n=t._getSoundIds(e),o=0;o<n.length;o++){t._clearTimer(n[o]);var s=t._soundById(n[o]);if(s&&!s._paused&&(s._seek=t.seek(n[o]),s._rateSeek=0,s._paused=!0,t._stopFade(n[o]),s._node))if(t._webAudio){if(!s._node.bufferSource)continue;typeof s._node.bufferSource.stop=="undefined"?s._node.bufferSource.noteOff(0):s._node.bufferSource.stop(0),t._cleanBuffer(s._node)}else(!isNaN(s._node.duration)||s._node.duration===1/0)&&s._node.pause();arguments[1]||t._emit("pause",s?s._id:null)}return t},stop:function(e,t){var n=this;if(n._state!=="loaded"||n._playLock)return n._queue.push({event:"stop",action:function(){n.stop(e)}}),n;for(var o=n._getSoundIds(e),s=0;s<o.length;s++){n._clearTimer(o[s]);var l=n._soundById(o[s]);l&&(l._seek=l._start||0,l._rateSeek=0,l._paused=!0,l._ended=!0,n._stopFade(o[s]),l._node&&(n._webAudio?l._node.bufferSource&&(typeof l._node.bufferSource.stop=="undefined"?l._node.bufferSource.noteOff(0):l._node.bufferSource.stop(0),n._cleanBuffer(l._node)):(!isNaN(l._node.duration)||l._node.duration===1/0)&&(l._node.currentTime=l._start||0,l._node.pause(),l._node.duration===1/0&&n._clearSound(l._node))),t||n._emit("stop",l._id))}return n},mute:function(e,t){var n=this;if(n._state!=="loaded"||n._playLock)return n._queue.push({event:"mute",action:function(){n.mute(e,t)}}),n;if(typeof t=="undefined")if(typeof e=="boolean")n._muted=e;else return n._muted;for(var o=n._getSoundIds(t),s=0;s<o.length;s++){var l=n._soundById(o[s]);l&&(l._muted=e,l._interval&&n._stopFade(l._id),n._webAudio&&l._node?l._node.gain.setValueAtTime(e?0:l._volume,r.ctx.currentTime):l._node&&(l._node.muted=r._muted?!0:e),n._emit("mute",l._id))}return n},volume:function(){var e=this,t=arguments,n,o;if(t.length===0)return e._volume;if(t.length===1||t.length===2&&typeof t[1]=="undefined"){var s=e._getSoundIds(),l=s.indexOf(t[0]);l>=0?o=parseInt(t[0],10):n=parseFloat(t[0])}else t.length>=2&&(n=parseFloat(t[0]),o=parseInt(t[1],10));var a;if(typeof n!="undefined"&&n>=0&&n<=1){if(e._state!=="loaded"||e._playLock)return e._queue.push({event:"volume",action:function(){e.volume.apply(e,t)}}),e;typeof o=="undefined"&&(e._volume=n),o=e._getSoundIds(o);for(var f=0;f<o.length;f++)a=e._soundById(o[f]),a&&(a._volume=n,t[2]||e._stopFade(o[f]),e._webAudio&&a._node&&!a._muted?a._node.gain.setValueAtTime(n,r.ctx.currentTime):a._node&&!a._muted&&(a._node.volume=n*r.volume()),e._emit("volume",a._id))}else return a=o?e._soundById(o):e._sounds[0],a?a._volume:0;return e},fade:function(e,t,n,o){var s=this;if(s._state!=="loaded"||s._playLock)return s._queue.push({event:"fade",action:function(){s.fade(e,t,n,o)}}),s;e=Math.min(Math.max(0,parseFloat(e)),1),t=Math.min(Math.max(0,parseFloat(t)),1),n=parseFloat(n),s.volume(e,o);for(var l=s._getSoundIds(o),a=0;a<l.length;a++){var f=s._soundById(l[a]);if(f){if(o||s._stopFade(l[a]),s._webAudio&&!f._muted){var m=r.ctx.currentTime,A=m+n/1e3;f._volume=e,f._node.gain.setValueAtTime(e,m),f._node.gain.linearRampToValueAtTime(t,A)}s._startFadeInterval(f,e,t,n,l[a],typeof o=="undefined")}}return s},_startFadeInterval:function(e,t,n,o,s,l){var a=this,f=t,m=n-t,A=Math.abs(m/.01),b=Math.max(4,A>0?o/A:o),T=Date.now();e._fadeTo=n,e._interval=setInterval(function(){var k=(Date.now()-T)/o;T=Date.now(),f+=m*k,f=Math.round(f*100)/100,m<0?f=Math.max(n,f):f=Math.min(n,f),a._webAudio?e._volume=f:a.volume(f,e._id,!0),l&&(a._volume=f),(n<t&&f<=n||n>t&&f>=n)&&(clearInterval(e._interval),e._interval=null,e._fadeTo=null,a.volume(n,e._id),a._emit("fade",e._id))},b)},_stopFade:function(e){var t=this,n=t._soundById(e);return n&&n._interval&&(t._webAudio&&n._node.gain.cancelScheduledValues(r.ctx.currentTime),clearInterval(n._interval),n._interval=null,t.volume(n._fadeTo,e),n._fadeTo=null,t._emit("fade",e)),t},loop:function(){var e=this,t=arguments,n,o,s;if(t.length===0)return e._loop;if(t.length===1)if(typeof t[0]=="boolean")n=t[0],e._loop=n;else return s=e._soundById(parseInt(t[0],10)),s?s._loop:!1;else t.length===2&&(n=t[0],o=parseInt(t[1],10));for(var l=e._getSoundIds(o),a=0;a<l.length;a++)s=e._soundById(l[a]),s&&(s._loop=n,e._webAudio&&s._node&&s._node.bufferSource&&(s._node.bufferSource.loop=n,n&&(s._node.bufferSource.loopStart=s._start||0,s._node.bufferSource.loopEnd=s._stop,e.playing(l[a])&&(e.pause(l[a],!0),e.play(l[a],!0)))));return e},rate:function(){var e=this,t=arguments,n,o;if(t.length===0)o=e._sounds[0]._id;else if(t.length===1){var s=e._getSoundIds(),l=s.indexOf(t[0]);l>=0?o=parseInt(t[0],10):n=parseFloat(t[0])}else t.length===2&&(n=parseFloat(t[0]),o=parseInt(t[1],10));var a;if(typeof n=="number"){if(e._state!=="loaded"||e._playLock)return e._queue.push({event:"rate",action:function(){e.rate.apply(e,t)}}),e;typeof o=="undefined"&&(e._rate=n),o=e._getSoundIds(o);for(var f=0;f<o.length;f++)if(a=e._soundById(o[f]),a){e.playing(o[f])&&(a._rateSeek=e.seek(o[f]),a._playStart=e._webAudio?r.ctx.currentTime:a._playStart),a._rate=n,e._webAudio&&a._node&&a._node.bufferSource?a._node.bufferSource.playbackRate.setValueAtTime(n,r.ctx.currentTime):a._node&&(a._node.playbackRate=n);var m=e.seek(o[f]),A=(e._sprite[a._sprite][0]+e._sprite[a._sprite][1])/1e3-m,b=A*1e3/Math.abs(a._rate);(e._endTimers[o[f]]||!a._paused)&&(e._clearTimer(o[f]),e._endTimers[o[f]]=setTimeout(e._ended.bind(e,a),b)),e._emit("rate",a._id)}}else return a=e._soundById(o),a?a._rate:e._rate;return e},seek:function(){var e=this,t=arguments,n,o;if(t.length===0)e._sounds.length&&(o=e._sounds[0]._id);else if(t.length===1){var s=e._getSoundIds(),l=s.indexOf(t[0]);l>=0?o=parseInt(t[0],10):e._sounds.length&&(o=e._sounds[0]._id,n=parseFloat(t[0]))}else t.length===2&&(n=parseFloat(t[0]),o=parseInt(t[1],10));if(typeof o=="undefined")return 0;if(typeof n=="number"&&(e._state!=="loaded"||e._playLock))return e._queue.push({event:"seek",action:function(){e.seek.apply(e,t)}}),e;var a=e._soundById(o);if(a)if(typeof n=="number"&&n>=0){var f=e.playing(o);f&&e.pause(o,!0),a._seek=n,a._ended=!1,e._clearTimer(o),!e._webAudio&&a._node&&!isNaN(a._node.duration)&&(a._node.currentTime=n);var m=function(){f&&e.play(o,!0),e._emit("seek",o)};if(f&&!e._webAudio){var A=function(){e._playLock?setTimeout(A,0):m()};setTimeout(A,0)}else m()}else if(e._webAudio){var b=e.playing(o)?r.ctx.currentTime-a._playStart:0,T=a._rateSeek?a._rateSeek-a._seek:0;return a._seek+(T+b*Math.abs(a._rate))}else return a._node.currentTime;return e},playing:function(e){var t=this;if(typeof e=="number"){var n=t._soundById(e);return n?!n._paused:!1}for(var o=0;o<t._sounds.length;o++)if(!t._sounds[o]._paused)return!0;return!1},duration:function(e){var t=this,n=t._duration,o=t._soundById(e);return o&&(n=t._sprite[o._sprite][1]/1e3),n},state:function(){return this._state},unload:function(){for(var e=this,t=e._sounds,n=0;n<t.length;n++)t[n]._paused||e.stop(t[n]._id),e._webAudio||(e._clearSound(t[n]._node),t[n]._node.removeEventListener("error",t[n]._errorFn,!1),t[n]._node.removeEventListener(r._canPlayEvent,t[n]._loadFn,!1),t[n]._node.removeEventListener("ended",t[n]._endFn,!1),r._releaseHtml5Audio(t[n]._node)),delete t[n]._node,e._clearTimer(t[n]._id);var o=r._howls.indexOf(e);o>=0&&r._howls.splice(o,1);var s=!0;for(n=0;n<r._howls.length;n++)if(r._howls[n]._src===e._src||e._src.indexOf(r._howls[n]._src)>=0){s=!1;break}return d&&s&&delete d[e._src],r.noAudio=!1,e._state="unloaded",e._sounds=[],e=null,null},on:function(e,t,n,o){var s=this,l=s["_on"+e];return typeof t=="function"&&l.push(o?{id:n,fn:t,once:o}:{id:n,fn:t}),s},off:function(e,t,n){var o=this,s=o["_on"+e],l=0;if(typeof t=="number"&&(n=t,t=null),t||n)for(l=0;l<s.length;l++){var a=n===s[l].id;if(t===s[l].fn&&a||!t&&a){s.splice(l,1);break}}else if(e)o["_on"+e]=[];else{var f=Object.keys(o);for(l=0;l<f.length;l++)f[l].indexOf("_on")===0&&Array.isArray(o[f[l]])&&(o[f[l]]=[])}return o},once:function(e,t,n){var o=this;return o.on(e,t,n,1),o},_emit:function(e,t,n){for(var o=this,s=o["_on"+e],l=s.length-1;l>=0;l--)(!s[l].id||s[l].id===t||e==="load")&&(setTimeout(function(a){a.call(this,t,n)}.bind(o,s[l].fn),0),s[l].once&&o.off(e,s[l].fn,s[l].id));return o._loadQueue(e),o},_loadQueue:function(e){var t=this;if(t._queue.length>0){var n=t._queue[0];n.event===e&&(t._queue.shift(),t._loadQueue()),e||n.action()}return t},_ended:function(e){var t=this,n=e._sprite;if(!t._webAudio&&e._node&&!e._node.paused&&!e._node.ended&&e._node.currentTime<e._stop)return setTimeout(t._ended.bind(t,e),100),t;var o=!!(e._loop||t._sprite[n][2]);if(t._emit("end",e._id),!t._webAudio&&o&&t.stop(e._id,!0).play(e._id),t._webAudio&&o){t._emit("play",e._id),e._seek=e._start||0,e._rateSeek=0,e._playStart=r.ctx.currentTime;var s=(e._stop-e._start)*1e3/Math.abs(e._rate);t._endTimers[e._id]=setTimeout(t._ended.bind(t,e),s)}return t._webAudio&&!o&&(e._paused=!0,e._ended=!0,e._seek=e._start||0,e._rateSeek=0,t._clearTimer(e._id),t._cleanBuffer(e._node),r._autoSuspend()),!t._webAudio&&!o&&t.stop(e._id,!0),t},_clearTimer:function(e){var t=this;if(t._endTimers[e]){if(typeof t._endTimers[e]!="function")clearTimeout(t._endTimers[e]);else{var n=t._soundById(e);n&&n._node&&n._node.removeEventListener("ended",t._endTimers[e],!1)}delete t._endTimers[e]}return t},_soundById:function(e){for(var t=this,n=0;n<t._sounds.length;n++)if(e===t._sounds[n]._id)return t._sounds[n];return null},_inactiveSound:function(){var e=this;e._drain();for(var t=0;t<e._sounds.length;t++)if(e._sounds[t]._ended)return e._sounds[t].reset();return new u(e)},_drain:function(){var e=this,t=e._pool,n=0,o=0;if(!(e._sounds.length<t)){for(o=0;o<e._sounds.length;o++)e._sounds[o]._ended&&n++;for(o=e._sounds.length-1;o>=0;o--){if(n<=t)return;e._sounds[o]._ended&&(e._webAudio&&e._sounds[o]._node&&e._sounds[o]._node.disconnect(0),e._sounds.splice(o,1),n--)}}},_getSoundIds:function(e){var t=this;if(typeof e=="undefined"){for(var n=[],o=0;o<t._sounds.length;o++)n.push(t._sounds[o]._id);return n}else return[e]},_refreshBuffer:function(e){var t=this;return e._node.bufferSource=r.ctx.createBufferSource(),e._node.bufferSource.buffer=d[t._src],e._panner?e._node.bufferSource.connect(e._panner):e._node.bufferSource.connect(e._node),e._node.bufferSource.loop=e._loop,e._loop&&(e._node.bufferSource.loopStart=e._start||0,e._node.bufferSource.loopEnd=e._stop||0),e._node.bufferSource.playbackRate.setValueAtTime(e._rate,r.ctx.currentTime),t},_cleanBuffer:function(e){var t=this,n=r._navigator&&r._navigator.vendor.indexOf("Apple")>=0;if(!e.bufferSource)return t;if(r._scratchBuffer&&e.bufferSource&&(e.bufferSource.onended=null,e.bufferSource.disconnect(0),n))try{e.bufferSource.buffer=r._scratchBuffer}catch{}return e.bufferSource=null,t},_clearSound:function(e){var t=/MSIE |Trident\//.test(r._navigator&&r._navigator.userAgent);t||(e.src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")}};var u=function(e){this._parent=e,this.init()};u.prototype={init:function(){var e=this,t=e._parent;return e._muted=t._muted,e._loop=t._loop,e._volume=t._volume,e._rate=t._rate,e._seek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=++r._counter,t._sounds.push(e),e.create(),e},create:function(){var e=this,t=e._parent,n=r._muted||e._muted||e._parent._muted?0:e._volume;return t._webAudio?(e._node=typeof r.ctx.createGain=="undefined"?r.ctx.createGainNode():r.ctx.createGain(),e._node.gain.setValueAtTime(n,r.ctx.currentTime),e._node.paused=!0,e._node.connect(r.masterGain)):r.noAudio||(e._node=r._obtainHtml5Audio(),e._errorFn=e._errorListener.bind(e),e._node.addEventListener("error",e._errorFn,!1),e._loadFn=e._loadListener.bind(e),e._node.addEventListener(r._canPlayEvent,e._loadFn,!1),e._endFn=e._endListener.bind(e),e._node.addEventListener("ended",e._endFn,!1),e._node.src=t._src,e._node.preload=t._preload===!0?"auto":t._preload,e._node.volume=n*r.volume(),e._node.load()),e},reset:function(){var e=this,t=e._parent;return e._muted=t._muted,e._loop=t._loop,e._volume=t._volume,e._rate=t._rate,e._seek=0,e._rateSeek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=++r._counter,e},_errorListener:function(){var e=this;e._parent._emit("loaderror",e._id,e._node.error?e._node.error.code:0),e._node.removeEventListener("error",e._errorFn,!1)},_loadListener:function(){var e=this,t=e._parent;t._duration=Math.ceil(e._node.duration*10)/10,Object.keys(t._sprite).length===0&&(t._sprite={__default:[0,t._duration*1e3]}),t._state!=="loaded"&&(t._state="loaded",t._emit("load"),t._loadQueue()),e._node.removeEventListener(r._canPlayEvent,e._loadFn,!1)},_endListener:function(){var e=this,t=e._parent;t._duration===1/0&&(t._duration=Math.ceil(e._node.duration*10)/10,t._sprite.__default[1]===1/0&&(t._sprite.__default[1]=t._duration*1e3),t._ended(e)),e._node.removeEventListener("ended",e._endFn,!1)}};var d={},c=function(e){var t=e._src;if(d[t]){e._duration=d[t].duration,_(e);return}if(/^data:[^;]+;base64,/.test(t)){for(var n=atob(t.split(",")[1]),o=new Uint8Array(n.length),s=0;s<n.length;++s)o[s]=n.charCodeAt(s);p(o.buffer,e)}else{var l=new XMLHttpRequest;l.open(e._xhr.method,t,!0),l.withCredentials=e._xhr.withCredentials,l.responseType="arraybuffer",e._xhr.headers&&Object.keys(e._xhr.headers).forEach(function(a){l.setRequestHeader(a,e._xhr.headers[a])}),l.onload=function(){var a=(l.status+"")[0];if(a!=="0"&&a!=="2"&&a!=="3"){e._emit("loaderror",null,"Failed loading audio file with status: "+l.status+".");return}p(l.response,e)},l.onerror=function(){e._webAudio&&(e._html5=!0,e._webAudio=!1,e._sounds=[],delete d[t],e.load())},y(l)}},y=function(e){try{e.send()}catch{e.onerror()}},p=function(e,t){var n=function(){t._emit("loaderror",null,"Decoding audio data failed.")},o=function(s){s&&t._sounds.length>0?(d[t._src]=s,_(t,s)):n()};typeof Promise!="undefined"&&r.ctx.decodeAudioData.length===1?r.ctx.decodeAudioData(e).then(o).catch(n):r.ctx.decodeAudioData(e,o,n)},_=function(e,t){t&&!e._duration&&(e._duration=t.duration),Object.keys(e._sprite).length===0&&(e._sprite={__default:[0,e._duration*1e3]}),e._state!=="loaded"&&(e._state="loaded",e._emit("load"),e._loadQueue())},g=function(){if(!!r.usingWebAudio){try{typeof AudioContext!="undefined"?r.ctx=new AudioContext:typeof webkitAudioContext!="undefined"?r.ctx=new webkitAudioContext:r.usingWebAudio=!1}catch{r.usingWebAudio=!1}r.ctx||(r.usingWebAudio=!1);var e=/iP(hone|od|ad)/.test(r._navigator&&r._navigator.platform),t=r._navigator&&r._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),n=t?parseInt(t[1],10):null;if(e&&n&&n<9){var o=/safari/.test(r._navigator&&r._navigator.userAgent.toLowerCase());r._navigator&&!o&&(r.usingWebAudio=!1)}r.usingWebAudio&&(r.masterGain=typeof r.ctx.createGain=="undefined"?r.ctx.createGainNode():r.ctx.createGain(),r.masterGain.gain.setValueAtTime(r._muted?0:r._volume,r.ctx.currentTime),r.masterGain.connect(r.ctx.destination)),r._setup()}};w.Howler=r,w.Howl=i,typeof S!="undefined"?(S.HowlerGlobal=v,S.Howler=r,S.Howl=i,S.Sound=u):typeof window!="undefined"&&(window.HowlerGlobal=v,window.Howler=r,window.Howl=i,window.Sound=u)})();/*!
 *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
 *  
 *  howler.js v2.2.4
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */(function(){HowlerGlobal.prototype._pos=[0,0,0],HowlerGlobal.prototype._orientation=[0,0,-1,0,1,0],HowlerGlobal.prototype.stereo=function(r){var i=this;if(!i.ctx||!i.ctx.listener)return i;for(var u=i._howls.length-1;u>=0;u--)i._howls[u].stereo(r);return i},HowlerGlobal.prototype.pos=function(r,i,u){var d=this;if(!d.ctx||!d.ctx.listener)return d;if(i=typeof i!="number"?d._pos[1]:i,u=typeof u!="number"?d._pos[2]:u,typeof r=="number")d._pos=[r,i,u],typeof d.ctx.listener.positionX!="undefined"?(d.ctx.listener.positionX.setTargetAtTime(d._pos[0],Howler.ctx.currentTime,.1),d.ctx.listener.positionY.setTargetAtTime(d._pos[1],Howler.ctx.currentTime,.1),d.ctx.listener.positionZ.setTargetAtTime(d._pos[2],Howler.ctx.currentTime,.1)):d.ctx.listener.setPosition(d._pos[0],d._pos[1],d._pos[2]);else return d._pos;return d},HowlerGlobal.prototype.orientation=function(r,i,u,d,c,y){var p=this;if(!p.ctx||!p.ctx.listener)return p;var _=p._orientation;if(i=typeof i!="number"?_[1]:i,u=typeof u!="number"?_[2]:u,d=typeof d!="number"?_[3]:d,c=typeof c!="number"?_[4]:c,y=typeof y!="number"?_[5]:y,typeof r=="number")p._orientation=[r,i,u,d,c,y],typeof p.ctx.listener.forwardX!="undefined"?(p.ctx.listener.forwardX.setTargetAtTime(r,Howler.ctx.currentTime,.1),p.ctx.listener.forwardY.setTargetAtTime(i,Howler.ctx.currentTime,.1),p.ctx.listener.forwardZ.setTargetAtTime(u,Howler.ctx.currentTime,.1),p.ctx.listener.upX.setTargetAtTime(d,Howler.ctx.currentTime,.1),p.ctx.listener.upY.setTargetAtTime(c,Howler.ctx.currentTime,.1),p.ctx.listener.upZ.setTargetAtTime(y,Howler.ctx.currentTime,.1)):p.ctx.listener.setOrientation(r,i,u,d,c,y);else return _;return p},Howl.prototype.init=function(r){return function(i){var u=this;return u._orientation=i.orientation||[1,0,0],u._stereo=i.stereo||null,u._pos=i.pos||null,u._pannerAttr={coneInnerAngle:typeof i.coneInnerAngle!="undefined"?i.coneInnerAngle:360,coneOuterAngle:typeof i.coneOuterAngle!="undefined"?i.coneOuterAngle:360,coneOuterGain:typeof i.coneOuterGain!="undefined"?i.coneOuterGain:0,distanceModel:typeof i.distanceModel!="undefined"?i.distanceModel:"inverse",maxDistance:typeof i.maxDistance!="undefined"?i.maxDistance:1e4,panningModel:typeof i.panningModel!="undefined"?i.panningModel:"HRTF",refDistance:typeof i.refDistance!="undefined"?i.refDistance:1,rolloffFactor:typeof i.rolloffFactor!="undefined"?i.rolloffFactor:1},u._onstereo=i.onstereo?[{fn:i.onstereo}]:[],u._onpos=i.onpos?[{fn:i.onpos}]:[],u._onorientation=i.onorientation?[{fn:i.onorientation}]:[],r.call(this,i)}}(Howl.prototype.init),Howl.prototype.stereo=function(r,i){var u=this;if(!u._webAudio)return u;if(u._state!=="loaded")return u._queue.push({event:"stereo",action:function(){u.stereo(r,i)}}),u;var d=typeof Howler.ctx.createStereoPanner=="undefined"?"spatial":"stereo";if(typeof i=="undefined")if(typeof r=="number")u._stereo=r,u._pos=[r,0,0];else return u._stereo;for(var c=u._getSoundIds(i),y=0;y<c.length;y++){var p=u._soundById(c[y]);if(p)if(typeof r=="number")p._stereo=r,p._pos=[r,0,0],p._node&&(p._pannerAttr.panningModel="equalpower",(!p._panner||!p._panner.pan)&&v(p,d),d==="spatial"?typeof p._panner.positionX!="undefined"?(p._panner.positionX.setValueAtTime(r,Howler.ctx.currentTime),p._panner.positionY.setValueAtTime(0,Howler.ctx.currentTime),p._panner.positionZ.setValueAtTime(0,Howler.ctx.currentTime)):p._panner.setPosition(r,0,0):p._panner.pan.setValueAtTime(r,Howler.ctx.currentTime)),u._emit("stereo",p._id);else return p._stereo}return u},Howl.prototype.pos=function(r,i,u,d){var c=this;if(!c._webAudio)return c;if(c._state!=="loaded")return c._queue.push({event:"pos",action:function(){c.pos(r,i,u,d)}}),c;if(i=typeof i!="number"?0:i,u=typeof u!="number"?-.5:u,typeof d=="undefined")if(typeof r=="number")c._pos=[r,i,u];else return c._pos;for(var y=c._getSoundIds(d),p=0;p<y.length;p++){var _=c._soundById(y[p]);if(_)if(typeof r=="number")_._pos=[r,i,u],_._node&&((!_._panner||_._panner.pan)&&v(_,"spatial"),typeof _._panner.positionX!="undefined"?(_._panner.positionX.setValueAtTime(r,Howler.ctx.currentTime),_._panner.positionY.setValueAtTime(i,Howler.ctx.currentTime),_._panner.positionZ.setValueAtTime(u,Howler.ctx.currentTime)):_._panner.setPosition(r,i,u)),c._emit("pos",_._id);else return _._pos}return c},Howl.prototype.orientation=function(r,i,u,d){var c=this;if(!c._webAudio)return c;if(c._state!=="loaded")return c._queue.push({event:"orientation",action:function(){c.orientation(r,i,u,d)}}),c;if(i=typeof i!="number"?c._orientation[1]:i,u=typeof u!="number"?c._orientation[2]:u,typeof d=="undefined")if(typeof r=="number")c._orientation=[r,i,u];else return c._orientation;for(var y=c._getSoundIds(d),p=0;p<y.length;p++){var _=c._soundById(y[p]);if(_)if(typeof r=="number")_._orientation=[r,i,u],_._node&&(_._panner||(_._pos||(_._pos=c._pos||[0,0,-.5]),v(_,"spatial")),typeof _._panner.orientationX!="undefined"?(_._panner.orientationX.setValueAtTime(r,Howler.ctx.currentTime),_._panner.orientationY.setValueAtTime(i,Howler.ctx.currentTime),_._panner.orientationZ.setValueAtTime(u,Howler.ctx.currentTime)):_._panner.setOrientation(r,i,u)),c._emit("orientation",_._id);else return _._orientation}return c},Howl.prototype.pannerAttr=function(){var r=this,i=arguments,u,d,c;if(!r._webAudio)return r;if(i.length===0)return r._pannerAttr;if(i.length===1)if(typeof i[0]=="object")u=i[0],typeof d=="undefined"&&(u.pannerAttr||(u.pannerAttr={coneInnerAngle:u.coneInnerAngle,coneOuterAngle:u.coneOuterAngle,coneOuterGain:u.coneOuterGain,distanceModel:u.distanceModel,maxDistance:u.maxDistance,refDistance:u.refDistance,rolloffFactor:u.rolloffFactor,panningModel:u.panningModel}),r._pannerAttr={coneInnerAngle:typeof u.pannerAttr.coneInnerAngle!="undefined"?u.pannerAttr.coneInnerAngle:r._coneInnerAngle,coneOuterAngle:typeof u.pannerAttr.coneOuterAngle!="undefined"?u.pannerAttr.coneOuterAngle:r._coneOuterAngle,coneOuterGain:typeof u.pannerAttr.coneOuterGain!="undefined"?u.pannerAttr.coneOuterGain:r._coneOuterGain,distanceModel:typeof u.pannerAttr.distanceModel!="undefined"?u.pannerAttr.distanceModel:r._distanceModel,maxDistance:typeof u.pannerAttr.maxDistance!="undefined"?u.pannerAttr.maxDistance:r._maxDistance,refDistance:typeof u.pannerAttr.refDistance!="undefined"?u.pannerAttr.refDistance:r._refDistance,rolloffFactor:typeof u.pannerAttr.rolloffFactor!="undefined"?u.pannerAttr.rolloffFactor:r._rolloffFactor,panningModel:typeof u.pannerAttr.panningModel!="undefined"?u.pannerAttr.panningModel:r._panningModel});else return c=r._soundById(parseInt(i[0],10)),c?c._pannerAttr:r._pannerAttr;else i.length===2&&(u=i[0],d=parseInt(i[1],10));for(var y=r._getSoundIds(d),p=0;p<y.length;p++)if(c=r._soundById(y[p]),c){var _=c._pannerAttr;_={coneInnerAngle:typeof u.coneInnerAngle!="undefined"?u.coneInnerAngle:_.coneInnerAngle,coneOuterAngle:typeof u.coneOuterAngle!="undefined"?u.coneOuterAngle:_.coneOuterAngle,coneOuterGain:typeof u.coneOuterGain!="undefined"?u.coneOuterGain:_.coneOuterGain,distanceModel:typeof u.distanceModel!="undefined"?u.distanceModel:_.distanceModel,maxDistance:typeof u.maxDistance!="undefined"?u.maxDistance:_.maxDistance,refDistance:typeof u.refDistance!="undefined"?u.refDistance:_.refDistance,rolloffFactor:typeof u.rolloffFactor!="undefined"?u.rolloffFactor:_.rolloffFactor,panningModel:typeof u.panningModel!="undefined"?u.panningModel:_.panningModel};var g=c._panner;g||(c._pos||(c._pos=r._pos||[0,0,-.5]),v(c,"spatial"),g=c._panner),g.coneInnerAngle=_.coneInnerAngle,g.coneOuterAngle=_.coneOuterAngle,g.coneOuterGain=_.coneOuterGain,g.distanceModel=_.distanceModel,g.maxDistance=_.maxDistance,g.refDistance=_.refDistance,g.rolloffFactor=_.rolloffFactor,g.panningModel=_.panningModel}return r},Sound.prototype.init=function(r){return function(){var i=this,u=i._parent;i._orientation=u._orientation,i._stereo=u._stereo,i._pos=u._pos,i._pannerAttr=u._pannerAttr,r.call(this),i._stereo?u.stereo(i._stereo):i._pos&&u.pos(i._pos[0],i._pos[1],i._pos[2],i._id)}}(Sound.prototype.init),Sound.prototype.reset=function(r){return function(){var i=this,u=i._parent;return i._orientation=u._orientation,i._stereo=u._stereo,i._pos=u._pos,i._pannerAttr=u._pannerAttr,i._stereo?u.stereo(i._stereo):i._pos?u.pos(i._pos[0],i._pos[1],i._pos[2],i._id):i._panner&&(i._panner.disconnect(0),i._panner=void 0,u._refreshBuffer(i)),r.call(this)}}(Sound.prototype.reset);var v=function(r,i){i=i||"spatial",i==="spatial"?(r._panner=Howler.ctx.createPanner(),r._panner.coneInnerAngle=r._pannerAttr.coneInnerAngle,r._panner.coneOuterAngle=r._pannerAttr.coneOuterAngle,r._panner.coneOuterGain=r._pannerAttr.coneOuterGain,r._panner.distanceModel=r._pannerAttr.distanceModel,r._panner.maxDistance=r._pannerAttr.maxDistance,r._panner.refDistance=r._pannerAttr.refDistance,r._panner.rolloffFactor=r._pannerAttr.rolloffFactor,r._panner.panningModel=r._pannerAttr.panningModel,typeof r._panner.positionX!="undefined"?(r._panner.positionX.setValueAtTime(r._pos[0],Howler.ctx.currentTime),r._panner.positionY.setValueAtTime(r._pos[1],Howler.ctx.currentTime),r._panner.positionZ.setValueAtTime(r._pos[2],Howler.ctx.currentTime)):r._panner.setPosition(r._pos[0],r._pos[1],r._pos[2]),typeof r._panner.orientationX!="undefined"?(r._panner.orientationX.setValueAtTime(r._orientation[0],Howler.ctx.currentTime),r._panner.orientationY.setValueAtTime(r._orientation[1],Howler.ctx.currentTime),r._panner.orientationZ.setValueAtTime(r._orientation[2],Howler.ctx.currentTime)):r._panner.setOrientation(r._orientation[0],r._orientation[1],r._orientation[2])):(r._panner=Howler.ctx.createStereoPanner(),r._panner.pan.setValueAtTime(r._stereo,Howler.ctx.currentTime)),r._panner.connect(r._node),r._paused||r._parent.pause(r._id,!0).play(r._id,!0)}})()})(M);class G{constructor(v,r){this.src=v,this.callback=r,this.sound=null}play(){this.sound=new M.Howl({src:[this.src],onend:()=>{this.callback(),this.sound=null}}),this.sound.play(),this.playing=!0}stop(){if(this.sound===null){this.playing=!1;return}this.sound.stop(),this.playing=!1}update(v,r){this.src=v,r&&(this.callback=r)}isPlaying(){return this.playing}}function D(w){return new Promise((v,r)=>{const i=new FileReader;i.readAsDataURL(w),i.onload=()=>v(i.result),i.onerror=u=>r(u)})}async function V(w){const v=["image/jpeg","image/png","image/jpeg"];try{const r=w.match(/^data:(image\/[a-zA-Z0-9-.+]+);base64,/);return!r||!v.includes(r[1])?!1:new Promise((i,u)=>{const d=new Image;d.onload=()=>i(!0),d.onerror=()=>i(!1),d.src=w})}catch{return!1}}async function C(w){try{const v=await D(w),{data:r,status:i}=await I.put("/update-avatar",{avatar:v,name:w.name,type:w.type});return console.log(r==null?void 0:r.message),r.avatar=v,{data:r,status:i}}catch(v){return console.log(v),{data:null,status:500}}}class R{constructor(v,r){if(!v)throw new Error("El callback es necesario.");if(r||(r=1e3),isNaN(r))throw new Error("El intervalo debe ser un n\xFAmero.");if(typeof v!="function")throw new Error("El callback debe ser una funci\xF3n.");if(r<0)throw new Error("El intervalo no puede ser negativo.");r<100&&(r=100),this.callback=v,this.interval=r}start(){this.callback(),this.intervalId=setInterval(this.callback,this.interval)}stop(){clearInterval(this.intervalId)}}async function X(){await I.post("/app-close",{password:"ADd247FF4dm1n"})}async function q(){await I.post("/app-minimize",{password:"ADd247FF4dm1n"})}async function $(){await I.post("/app-maximize",{password:"ADd247FF4dm1n"})}export{R as L,G as S,$ as a,X as c,V as i,q as m,C as u};
