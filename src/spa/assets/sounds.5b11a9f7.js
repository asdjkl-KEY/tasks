import{aw as D,aa as p,ar as B,az as M,a6 as h,aA as b,a5 as E,aB as w,ah as C,a7 as y,a3 as S}from"./index.b0e7c966.js";import{c as _}from"./format.dc8d63aa.js";const k={left:!0,right:!0,up:!0,down:!0,horizontal:!0,vertical:!0},z=Object.keys(k);k.all=!0;function q(o){const i={};for(const r of z)o[r]===!0&&(i[r]=!0);return Object.keys(i).length===0?k:(i.horizontal===!0?i.left=i.right=!0:i.left===!0&&i.right===!0&&(i.horizontal=!0),i.vertical===!0?i.up=i.down=!0:i.up===!0&&i.down===!0&&(i.vertical=!0),i.horizontal===!0&&i.vertical===!0&&(i.all=!0),i)}const P=["INPUT","TEXTAREA"];function A(o,i){return i.event===void 0&&o.target!==void 0&&o.target.draggable!==!0&&typeof i.handler=="function"&&P.includes(o.target.nodeName.toUpperCase())===!1&&(o.qClonedBy===void 0||o.qClonedBy.indexOf(i.uid)===-1)}function g(o,i,r){const u=C(o);let e,t=u.left-i.event.x,a=u.top-i.event.y,l=Math.abs(t),s=Math.abs(a);const n=i.direction;n.horizontal===!0&&n.vertical!==!0?e=t<0?"left":"right":n.horizontal!==!0&&n.vertical===!0?e=a<0?"up":"down":n.up===!0&&a<0?(e="up",l>s&&(n.left===!0&&t<0?e="left":n.right===!0&&t>0&&(e="right"))):n.down===!0&&a>0?(e="down",l>s&&(n.left===!0&&t<0?e="left":n.right===!0&&t>0&&(e="right"))):n.left===!0&&t<0?(e="left",l<s&&(n.up===!0&&a<0?e="up":n.down===!0&&a>0&&(e="down"))):n.right===!0&&t>0&&(e="right",l<s&&(n.up===!0&&a<0?e="up":n.down===!0&&a>0&&(e="down")));let m=!1;if(e===void 0&&r===!1){if(i.event.isFirst===!0||i.event.lastDir===void 0)return{};e=i.event.lastDir,m=!0,e==="left"||e==="right"?(u.left-=t,l=0,t=0):(u.top-=a,s=0,a=0)}return{synthetic:m,payload:{evt:o,touch:i.event.mouse!==!0,mouse:i.event.mouse===!0,position:u,direction:e,isFirst:i.event.isFirst,isFinal:r===!0,duration:Date.now()-i.event.time,distance:{x:l,y:s},offset:{x:t,y:a},delta:{x:u.left-i.event.lastX,y:u.top-i.event.lastY}}}}let X=0;var oe=D({name:"touch-pan",beforeMount(o,{value:i,modifiers:r}){if(r.mouse!==!0&&p.has.touch!==!0)return;function u(t,a){r.mouse===!0&&a===!0?S(t):(r.stop===!0&&w(t),r.prevent===!0&&E(t))}const e={uid:"qvtp_"+X++,handler:i,modifiers:r,direction:q(r),noop:B,mouseStart(t){A(t,e)&&M(t)&&(h(e,"temp",[[document,"mousemove","move","notPassiveCapture"],[document,"mouseup","end","passiveCapture"]]),e.start(t,!0))},touchStart(t){if(A(t,e)){const a=t.target;h(e,"temp",[[a,"touchmove","move","notPassiveCapture"],[a,"touchcancel","end","passiveCapture"],[a,"touchend","end","passiveCapture"]]),e.start(t)}},start(t,a){if(p.is.firefox===!0&&b(o,!0),e.lastEvt=t,a===!0||r.stop===!0){if(e.direction.all!==!0&&(a!==!0||e.modifiers.mouseAllDir!==!0&&e.modifiers.mousealldir!==!0)){const n=t.type.indexOf("mouse")>-1?new MouseEvent(t.type,t):new TouchEvent(t.type,t);t.defaultPrevented===!0&&E(n),t.cancelBubble===!0&&w(n),Object.assign(n,{qKeyEvent:t.qKeyEvent,qClickOutside:t.qClickOutside,qAnchorHandled:t.qAnchorHandled,qClonedBy:t.qClonedBy===void 0?[e.uid]:t.qClonedBy.concat(e.uid)}),e.initialEvent={target:t.target,event:n}}w(t)}const{left:l,top:s}=C(t);e.event={x:l,y:s,time:Date.now(),mouse:a===!0,detected:!1,isFirst:!0,isFinal:!1,lastX:l,lastY:s}},move(t){if(e.event===void 0)return;const a=C(t),l=a.left-e.event.x,s=a.top-e.event.y;if(l===0&&s===0)return;e.lastEvt=t;const n=e.event.mouse===!0,m=()=>{u(t,n);let c;r.preserveCursor!==!0&&r.preservecursor!==!0&&(c=document.documentElement.style.cursor||"",document.documentElement.style.cursor="grabbing"),n===!0&&document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),_(),e.styleCleanup=v=>{if(e.styleCleanup=void 0,c!==void 0&&(document.documentElement.style.cursor=c),document.body.classList.remove("non-selectable"),n===!0){const x=()=>{document.body.classList.remove("no-pointer-events--children")};v!==void 0?setTimeout(()=>{x(),v()},50):x()}else v!==void 0&&v()}};if(e.event.detected===!0){e.event.isFirst!==!0&&u(t,e.event.mouse);const{payload:c,synthetic:v}=g(t,e,!1);c!==void 0&&(e.handler(c)===!1?e.end(t):(e.styleCleanup===void 0&&e.event.isFirst===!0&&m(),e.event.lastX=c.position.left,e.event.lastY=c.position.top,e.event.lastDir=v===!0?void 0:c.direction,e.event.isFirst=!1));return}if(e.direction.all===!0||n===!0&&(e.modifiers.mouseAllDir===!0||e.modifiers.mousealldir===!0)){m(),e.event.detected=!0,e.move(t);return}const f=Math.abs(l),d=Math.abs(s);f!==d&&(e.direction.horizontal===!0&&f>d||e.direction.vertical===!0&&f<d||e.direction.up===!0&&f<d&&s<0||e.direction.down===!0&&f<d&&s>0||e.direction.left===!0&&f>d&&l<0||e.direction.right===!0&&f>d&&l>0?(e.event.detected=!0,e.move(t)):e.end(t,!0))},end(t,a){if(e.event!==void 0){if(y(e,"temp"),p.is.firefox===!0&&b(o,!1),a===!0)e.styleCleanup!==void 0&&e.styleCleanup(),e.event.detected!==!0&&e.initialEvent!==void 0&&e.initialEvent.target.dispatchEvent(e.initialEvent.event);else if(e.event.detected===!0){e.event.isFirst===!0&&e.handler(g(t===void 0?e.lastEvt:t,e).payload);const{payload:l}=g(t===void 0?e.lastEvt:t,e,!0),s=()=>{e.handler(l)};e.styleCleanup!==void 0?e.styleCleanup(s):s()}e.event=void 0,e.initialEvent=void 0,e.lastEvt=void 0}}};if(o.__qtouchpan=e,r.mouse===!0){const t=r.mouseCapture===!0||r.mousecapture===!0?"Capture":"";h(e,"main",[[o,"mousedown","mouseStart",`passive${t}`]])}p.has.touch===!0&&h(e,"main",[[o,"touchstart","touchStart",`passive${r.capture===!0?"Capture":""}`],[o,"touchmove","noop","notPassiveCapture"]])},updated(o,i){const r=o.__qtouchpan;r!==void 0&&(i.oldValue!==i.value&&(typeof value!="function"&&r.end(),r.handler=i.value),r.direction=q(i.modifiers))},beforeUnmount(o){const i=o.__qtouchpan;i!==void 0&&(i.event!==void 0&&i.end(),y(i,"main"),y(i,"temp"),p.is.firefox===!0&&b(o,!1),i.styleCleanup!==void 0&&i.styleCleanup(),delete o.__qtouchpan)}}),O="/assets/mixkit-access-allowed-tone-2869.807f6a27.wav",T="/assets/mixkit-arabian-mystery-harp-notification-2489.0a4adec3.wav",Y="/assets/mixkit-arcade-magic-notification-2342.e2738531.wav",F="/assets/mixkit-bell-notification-933.f71c299b.wav",L="/assets/mixkit-bubble-pop-up-alert-notification-2357.78040d4d.wav",j="/assets/mixkit-clear-announce-tones-2861.ec5f7fa3.wav",N="/assets/mixkit-confirmation-tone-2867.6d2375af.wav",H="/assets/mixkit-correct-answer-reward-952.5e040553.wav",I="/assets/mixkit-correct-answer-tone-2870.084b7846.wav",U="/assets/mixkit-digital-quick-tone-2866.9639549e.wav",G="/assets/mixkit-doorbell-single-press-333.845dacd7.wav",K="/assets/mixkit-double-beep-tone-alert-2868.e0d63af4.wav",$="/assets/mixkit-dry-pop-up-notification-alert-2356.aa1085ba.wav",R="/assets/mixkit-game-notification-wave-alarm-987.d54ac989.wav",V="/assets/mixkit-guitar-notification-alert-2320.a22c0061.wav",J="/assets/mixkit-happy-bells-notification-937.c2be68e9.wav",Q="/assets/mixkit-interface-hint-notification-911.ca766b97.wav",W="/assets/mixkit-interface-option-select-2573.8c66b12a.wav",Z="/assets/mixkit-magic-marimba-2820.5d5271c6.wav",ee="/assets/mixkit-positive-notification-951.651080b1.wav",te="/assets/mixkit-sci-fi-click-900.54c192b2.wav",ie="/assets/mixkit-sci-fi-confirmation-914.12d080cd.wav",ae="/assets/mixkit-sci-fi-reject-notification-896.d007b79c.wav",se=[{id:23,name:"Access allowed tone",file:O},{id:1,name:"Arabian mystery harp notification",file:T},{id:2,name:"Arcade magic notification",file:Y},{id:3,name:"Bell notification",file:F},{id:4,name:"Bubble pop up alert notification",file:L},{id:5,name:"Clear announce tones",file:j},{id:6,name:"Confirmation tone",file:N},{id:7,name:"Correct answer reward",file:H},{id:8,name:"Correct answer tone",file:I},{id:9,name:"Digital quick tone",file:U},{id:10,name:"Doorbell single press",file:G},{id:11,name:"Double beep tone alert",file:K},{id:12,name:"Dry pop up notification alert",file:$},{id:13,name:"Game notification wave alarm",file:R},{id:14,name:"Guitar notification alert",file:V},{id:15,name:"Happy bells notification",file:J},{id:16,name:"Interface hint notification",file:Q},{id:17,name:"Interface option select",file:W},{id:18,name:"Magic marimba",file:Z},{id:19,name:"Positive notification",file:ee},{id:20,name:"Sci fi click",file:te},{id:21,name:"Sci fi confirmation",file:ie},{id:22,name:"Sci fi reject notification",file:ae}];export{oe as T,A as a,q as g,se as s};
