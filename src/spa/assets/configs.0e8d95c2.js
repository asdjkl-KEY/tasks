import{A as o}from"./API.cd016945.js";async function f(){const{data:t,status:n}=await o.get("/configuration?configuration=language");return t==null?void 0:t.configuration}async function l(t,n){const{data:a,status:u}=await o.post("/configuration",{configuration:t,value:n});return{data:a,status:u}}async function p(t){const{data:n}=await o.get(`/configuration?configuration=${t}`);return n==null?void 0:n.configuration}async function y(t=1,n="00:00",a="00:00",u=["satur","sun"],i=5,e=0,c=0){const{data:s,status:r}=await o.put("/update-schedule",{weight:t,time_start:n,time_end:a,weekdays:u,minutes:i,hours:e,days:c});return console.log(s==null?void 0:s.message),{data:s,status:r}}async function d(t){const{data:n,status:a}=await o.get(`/get-schedule?priority=${t}`);return{data:n,status:a}}export{p as a,d as b,f as g,l as s,y as u};
