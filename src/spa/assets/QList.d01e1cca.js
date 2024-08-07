import{l as r,c as o,h as i,$ as d,v as u,y as s,m as g,g as c}from"./index.b0e7c966.js";const b=["top","middle","bottom"];var m=r({name:"QBadge",props:{color:String,textColor:String,floating:Boolean,transparent:Boolean,multiLine:Boolean,outline:Boolean,rounded:Boolean,label:[Number,String],align:{type:String,validator:e=>b.includes(e)}},setup(e,{slots:a}){const l=o(()=>e.align!==void 0?{verticalAlign:e.align}:null),n=o(()=>{const t=e.outline===!0&&e.color||e.textColor;return`q-badge flex inline items-center no-wrap q-badge--${e.multiLine===!0?"multi":"single"}-line`+(e.outline===!0?" q-badge--outline":e.color!==void 0?` bg-${e.color}`:"")+(t!==void 0?` text-${t}`:"")+(e.floating===!0?" q-badge--floating":"")+(e.rounded===!0?" q-badge--rounded":"")+(e.transparent===!0?" q-badge--transparent":"")});return()=>i("div",{class:n.value,style:l.value,role:"status","aria-label":e.label},d(a.default,e.label!==void 0?[e.label]:[]))}}),q=r({name:"QList",props:{...u,bordered:Boolean,dense:Boolean,separator:Boolean,padding:Boolean,tag:{type:String,default:"div"}},setup(e,{slots:a}){const l=c(),n=s(e,l.proxy.$q),t=o(()=>"q-list"+(e.bordered===!0?" q-list--bordered":"")+(e.dense===!0?" q-list--dense":"")+(e.separator===!0?" q-list--separator":"")+(n.value===!0?" q-list--dark":"")+(e.padding===!0?" q-list--padding":""));return()=>i(e.tag,{class:t.value},g(a.default))}});export{m as Q,q as a};
