function a(n){const{text:e,fallback:r}=n;if(typeof e!="string"||e==="")return r!==void 0?`-${r}`:"";let t=e.replace(/\s+/g,"");return t=t.replace(/[^a-zA-Z0-9]/g,"_"),`-${t}`}export{a as g};
