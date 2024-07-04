import{Q as $}from"./QImg.aea72398.js";import{k as y,_ as v,d as _,r as l,q as V,bn as S,H as q,I as g,P as f,K as h,L as u,M as n,j as i,O as c,J as Q,V as P,F as U,N as k,Q as B,aG as C,aH as D}from"./index.1526ceda.js";import{Q as b}from"./QSelect.bc0c6282.js";import{Q as I}from"./QForm.e88a91f9.js";import{Q as L}from"./QPage.49364285.js";import{A,a as O}from"./configs.3bfa595d.js";import{l as R}from"./bbel_full_logo.7dac59d7.js";import{s as w,L as z}from"./utils.1e00f14b.js";import"./format.e5b37dc8.js";async function E(e,r,t,a,d,m,o){const{data:s,status:p}=await A.post("/new-user",{username:e,email:r,password:t,ddd:a,ph_number:d,ph_type:m,avatar_url:o});return s.token?(y.set("token",s.token,{expires:365,secure:!0,sameSite:"strict"}),delete s.token,console.log(s.message),{status:p,res:!0}):(console.log(s.message),{status:p,res:!1})}const N=_({data(){var o;const e=l((o=w.get("theme"))!=null?o:"dark"),r=new z(()=>{var s;e.value=(s=w.get("theme"))!=null?s:"dark"});r.start(),V(()=>{r.stop()}),this.$i18n.locale=localStorage.getItem("lang")||"en-US";const t=S();y.get("token")&&t.push("/main/tasks");const a={invalidUsername:this.$t("pages.register.messages.invalid_username"),invalidEmail:this.$t("pages.register.messages.invalid_email"),invalidPassword:this.$t("pages.register.messages.invalid_password"),equalPasswords:this.$t("pages.register.messages.equal_passwords"),invalidDDD:this.$t("pages.register.messages.invalid_ddd"),invalidPhone:this.$t("pages.register.messages.invalid_phone")},d=[{label:this.$t("pages.register.inputs.labels.username"),type:"text",model:"username",icon:"person",error:"username","error-message":a.invalidUsername,class:"49%"},{label:this.$t("pages.register.inputs.labels.email"),type:"email",model:"email",icon:"email",error:"email","error-message":a.invalidEmail,class:"49%",margin:"2%"},{label:this.$t("pages.register.inputs.labels.password"),type:"password",model:"password",icon:"lock",error:"password","error-message":a.invalidPassword,class:"49%"},{label:this.$t("pages.register.inputs.labels.confirm_password"),type:"password",model:"confirm_password",icon:"lock",error:"confirm_password","error-message":a.equalPasswords,class:"49%",margin:"2%"},{label:this.$t("pages.register.inputs.labels.phone_ddd"),type:"text",model:"phone_ddd",icon:"phone",error:"phone_ddd","error-message":a.invalidDDD,class:"10%"},{label:this.$t("pages.register.inputs.labels.phone_number"),type:"text",model:"phone_number",icon:"phone",error:"phone_number","error-message":a.invalidPhone,class:"49%",margin:"1%"}],m=l({username:"",email:"",password:"",confirm_password:"",phone_ddd:"",phone_number:"",phone_type:{label:this.$t("pages.register.inputs.options.phone_types.cellphone"),value:"cellphone"}});return{theme:e,logo:R,valids:l({username:!0,email:!0,password:!0,confirm_password:!0,phone_ddd:!0,phone_number:!0}),user:m,inputs:d,error:l(""),loading:l(!1),phoneOptions:[{label:this.$t("pages.register.inputs.options.phone_types.cellphone"),value:"cellphone"},{label:this.$t("pages.register.inputs.options.phone_types.home"),value:"home"},{label:this.$t("pages.register.inputs.options.phone_types.work"),value:"work"}],lang:l(localStorage.getItem("lang")||"en-US"),langOptions:["en-US","es-ES","pt-BR"]}},methods:{register(){this.error="",this.loading=!0;const e={username:/^[a-zA-Z0-9]{3,}$/,email:/.+@.+\..+/,password:/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,64}$/,phone_ddd:/^[0-9]{2}$/,phone_number:/^[0-9]{8,9}$/};for(const r in e){if(!e[r].test(this.user[r])){this.valids[r]=!1,this.loading=!1;return}this.valids[r]=!0}if(this.user.password!==this.user.confirm_password){this.valids.confirm_password=!1,this.loading=!1;return}E(this.user.username,this.user.email,this.user.password,this.user.phone_ddd,this.user.phone_number,this.user.phone_type.value).then(({status:r,res:t})=>{if(r===409){this.error=this.$t("pages.register.messages.user_already_exists"),this.loading=!1;return}if(!t){this.error=this.$t("pages.register.messages.invalid_data"),this.loading=!1;return}console.log("Register success",t),this.loading=!1,O("language").then(a=>{this.$i18n.locale=a,this.$router.push("/main/tasks")})}).catch(r=>{console.log("Register error",r),this.loading=!1,this.error=r.message})},changeLang(e){localStorage.setItem("lang",e),this.$i18n.locale=e}}}),F={class:"{'column': true, 'text-white': theme === 'dark', 'text-dark': theme !== 'dark'",style:{"min-width":"600px"}},j={class:"flex flex-center justify-center row",style:{width:"100vw",height:"180px","border-radius":"50%"}},H={class:"absolute-bottom-right"};function Z(e,r,t,a,d,m){const o=q("router-link");return g(),f(L,{class:u({"t-login-bg":!0,"t-light":e.theme!=="dark"}),style:{"overflow-y":"auto","max-height":"100vh",background:"#1e1e1e","overflow-x":"hidden"}},{default:h(()=>[n("div",F,[n("div",j,[i($,{src:e.logo,style:{width:"195px",height:"150px"},ratio:16/9},null,8,["src"])]),n("div",{class:u({"text-h5 q-mb-md flex flex-center":!0,"text-dark":e.theme==="dark"})},c(e.$t("pages.register.titles.register_to_continue")),3),i(I,{onSubmit:e.register,style:{width:"70%","margin-left":"15%"},class:"flex q-pl-xl q-pr-xl"},{default:h(()=>[(g(!0),Q(U,null,P(e.inputs,s=>(g(),f(C,{key:s.model,modelValue:e.user[s.model],"onUpdate:modelValue":p=>e.user[s.model]=p,label:s.label,type:s.type,error:!e.valids[s.error],"error-message":s["error-message"],dark:e.theme==="dark",color:e.theme==="dark"?"white":"dark",icon:s.icon,style:D(`display: inline-block; width: ${s.class}; ${s.margin?"margin-left: "+s.margin:""}`)},null,8,["modelValue","onUpdate:modelValue","label","type","error","error-message","dark","color","icon","style"]))),128)),i(b,{modelValue:e.user.phone_type,"onUpdate:modelValue":r[0]||(r[0]=s=>e.user.phone_type=s),options:e.phoneOptions,label:e.$t("pages.register.inputs.labels.phone_type"),dark:e.theme==="dark",style:{width:"39%","margin-left":"1%"},color:e.theme==="dark"?"white":"dark"},null,8,["modelValue","options","label","dark","color"]),n("small",{style:{width:"100%"},class:u({"text-dark":e.theme==="dark"})},[k(c(e.$t("pages.register.messages.already_an_account"))+" ",1),i(o,{to:"/auth/login"},{default:h(()=>[k(c(e.$t("pages.register.titles.login")),1)]),_:1})],2),i(B,{color:"accent",style:{color:"white",width:"40%","margin-left":"30%"},label:e.$t("pages.register.buttons.register"),class:"q-mb-md q-mt-sm",onClick:e.register,loading:e.loading,percentage:0},null,8,["label","onClick","loading"])]),_:1},8,["onSubmit"])]),n("div",H,[i(b,{label:e.$t("pages.login.inputs.labels.language"),outlined:"",dense:"",modelValue:e.lang,"onUpdate:modelValue":[r[1]||(r[1]=s=>e.lang=s),r[2]||(r[2]=s=>e.changeLang(s))],options:e.langOptions,color:e.theme==="dark"?"white":"dark",dark:e.theme==="dark",class:"q-mb-sm q-mr-sm",style:{"min-width":"140px"}},null,8,["label","modelValue","options","color","dark"])])]),_:1},8,["class"])}var ee=v(N,[["render",Z]]);export{ee as default};