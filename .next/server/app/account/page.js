(()=>{var a={};a.id=298,a.ids=[298],a.modules={261:a=>{"use strict";a.exports=require("next/dist/shared/lib/router/utils/app-paths")},3295:a=>{"use strict";a.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},14985:a=>{"use strict";a.exports=require("dns")},19121:a=>{"use strict";a.exports=require("next/dist/server/app-render/action-async-storage.external.js")},19771:a=>{"use strict";a.exports=require("process")},21820:a=>{"use strict";a.exports=require("os")},26713:a=>{"use strict";a.exports=require("next/dist/shared/lib/router/utils/is-bot")},27910:a=>{"use strict";a.exports=require("stream")},28354:a=>{"use strict";a.exports=require("util")},29021:a=>{"use strict";a.exports=require("fs")},29294:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-async-storage.external.js")},33873:a=>{"use strict";a.exports=require("path")},34631:a=>{"use strict";a.exports=require("tls")},36721:(a,b,c)=>{Promise.resolve().then(c.bind(c,36876))},36876:(a,b,c)=>{"use strict";c.r(b),c.d(b,{default:()=>k});var d=c(21124),e=c(95627),f=c.n(e),g=c(38301),h=c(58554),i=c(9553),j=c(43006);function k(){let[a,b]=(0,g.useState)(null),[c,e]=(0,g.useState)("login"),[k,m]=(0,g.useState)(""),[n,o]=(0,g.useState)(""),[p,q]=(0,g.useState)(""),[r,s]=(0,g.useState)(""),[t,u]=(0,g.useState)(""),[v,w]=(0,g.useState)(""),[x,y]=(0,g.useState)(!0),[z,A]=(0,g.useState)(""),[B,C]=(0,g.useState)(""),[D,E]=(0,g.useState)(!1);function F(a,b){A(a),C(b)}async function G(){if(!k.trim()||!n)return void F("Please enter your email and password.","error");try{y(!0),A(""),await (0,h.oM)(j.j2,h.F0),await (0,h.x9)(j.j2,k.trim(),n),F("Login successful ✅","success")}catch(a){console.error(a),a?.code==="auth/invalid-credential"?F("Invalid email or password.","error"):a?.code==="auth/user-not-found"?F("Account not found. Please create an account.","error"):a?.code==="auth/wrong-password"?F("Wrong password.","error"):a?.code==="auth/too-many-requests"?F("Too many attempts. Please try again later.","error"):F(a?.message||"Login failed.","error")}finally{y(!1)}}async function H(){if(!k.trim()||!n)return void F("Please enter your email and password.","error");if(n.length<6)return void F("Password must contain at least 6 characters.","error");try{y(!0),A(""),await (0,h.oM)(j.j2,h.F0);let a=await (0,h.eJ)(j.j2,k.trim(),n);await (0,i.BN)((0,i.H9)(j.db,"users",a.user.uid),{uid:a.user.uid,email:a.user.email||"",name:"",address:"",city:"",pincode:"",createdAt:(0,i.O5)()}),b(a.user),F("Account created successfully ✅","success")}catch(a){console.error(a),a?.code==="auth/email-already-in-use"?F("This email is already registered. Please login.","error"):a?.code==="auth/invalid-email"?F("Please enter a valid email address.","error"):a?.code==="auth/weak-password"?F("Password is too weak. Use at least 6 characters.","error"):F(a?.message||"Account creation failed.","error")}finally{y(!1)}}async function I(){if(!k.trim())return void F("Enter your email address first.","error");try{y(!0),A(""),await (0,h.J1)(j.j2,k.trim()),F("Password reset link sent to your email \uD83D\uDCE7","success"),E(!1)}catch(a){console.error(a),a?.code==="auth/user-not-found"?F("No account found with this email.","error"):a?.code==="auth/invalid-email"?F("Please enter a valid email address.","error"):F(a?.message||"Could not send password reset email.","error")}finally{y(!1)}}async function J(){if(a){if(!p.trim())return void F("Please enter your name.","error");if(!r.trim())return void F("Please enter your delivery address.","error");if(!t.trim())return void F("Please enter your city.","error");if(6!==v.trim().length)return void F("Please enter a valid 6-digit pincode.","error");try{y(!0),A(""),await (0,h.r7)(a,{displayName:p.trim()}),await (0,i.BN)((0,i.H9)(j.db,"users",a.uid),{uid:a.uid,name:p.trim(),email:a.email||"",address:r.trim(),city:t.trim(),pincode:v.trim(),updatedAt:(0,i.O5)()},{merge:!0}),F("Profile saved successfully ✅","success")}catch(a){console.error(a),F(a?.message||"Could not save profile.","error")}finally{y(!1)}}}async function K(){try{await (0,h.CI)(j.j2),b(null),q(""),s(""),u(""),w(""),m(""),o(""),A(""),C(""),e("login")}catch(a){F(a?.message||"Logout failed.","error")}}return x&&!a?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(f(),{id:l.__hash,children:l}),(0,d.jsx)("main",{className:`jsx-${l.__hash} account-page`,children:(0,d.jsxs)("div",{className:`jsx-${l.__hash} loading-card`,children:[(0,d.jsx)("div",{className:`jsx-${l.__hash} loader`}),(0,d.jsx)("p",{className:`jsx-${l.__hash}`,children:"Loading your account..."})]})})]}):a?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(f(),{id:l.__hash,children:l}),(0,d.jsx)("main",{className:`jsx-${l.__hash} account-page`,children:(0,d.jsxs)("div",{className:`jsx-${l.__hash} account-card`,children:[(0,d.jsxs)("div",{className:`jsx-${l.__hash} account-heading`,children:[(0,d.jsx)("p",{className:`jsx-${l.__hash} brand`,children:"ROCK STYLES"}),(0,d.jsx)("h1",{className:`jsx-${l.__hash}`,children:"MY ACCOUNT"}),(0,d.jsx)("p",{className:`jsx-${l.__hash} account-email`,children:a.email})]}),(0,d.jsxs)("div",{className:`jsx-${l.__hash} profile-fields`,children:[(0,d.jsxs)("div",{className:`jsx-${l.__hash} field`,children:[(0,d.jsx)("label",{className:`jsx-${l.__hash}`,children:"FULL NAME"}),(0,d.jsx)("input",{type:"text",placeholder:"Enter your full name",value:p,onChange:a=>q(a.target.value),className:`jsx-${l.__hash}`})]}),(0,d.jsxs)("div",{className:`jsx-${l.__hash} field`,children:[(0,d.jsx)("label",{className:`jsx-${l.__hash}`,children:"EMAIL ADDRESS"}),(0,d.jsx)("input",{type:"email",value:a.email||"",disabled:!0,className:`jsx-${l.__hash}`}),(0,d.jsx)("small",{className:`jsx-${l.__hash}`,children:"Email cannot be changed here."})]}),(0,d.jsxs)("div",{className:`jsx-${l.__hash} field`,children:[(0,d.jsx)("label",{className:`jsx-${l.__hash}`,children:"DELIVERY ADDRESS"}),(0,d.jsx)("textarea",{placeholder:"House No, Street, Area",rows:4,value:r,onChange:a=>s(a.target.value),className:`jsx-${l.__hash}`})]}),(0,d.jsxs)("div",{className:`jsx-${l.__hash} profile-row`,children:[(0,d.jsxs)("div",{className:`jsx-${l.__hash} field`,children:[(0,d.jsx)("label",{className:`jsx-${l.__hash}`,children:"CITY"}),(0,d.jsx)("input",{type:"text",placeholder:"City",value:t,onChange:a=>u(a.target.value),className:`jsx-${l.__hash}`})]}),(0,d.jsxs)("div",{className:`jsx-${l.__hash} field`,children:[(0,d.jsx)("label",{className:`jsx-${l.__hash}`,children:"PINCODE"}),(0,d.jsx)("input",{type:"text",inputMode:"numeric",maxLength:6,placeholder:"600001",value:v,onChange:a=>{w(a.target.value.replace(/\D/g,"").slice(0,6))},className:`jsx-${l.__hash}`})]})]})]}),(0,d.jsx)("button",{type:"button",onClick:J,disabled:x,className:`jsx-${l.__hash} primary-btn`,children:x?"SAVING...":"SAVE PROFILE"}),(0,d.jsx)("button",{type:"button",onClick:K,className:`jsx-${l.__hash} logout-btn`,children:"LOG OUT"}),z&&(0,d.jsx)("p",{className:`jsx-${l.__hash} message ${B}`,children:z})]})})]}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(f(),{id:l.__hash,children:l}),(0,d.jsx)("main",{className:`jsx-${l.__hash} account-page`,children:(0,d.jsxs)("div",{className:`jsx-${l.__hash} account-card`,children:[(0,d.jsxs)("div",{className:`jsx-${l.__hash} account-heading`,children:[(0,d.jsx)("p",{className:`jsx-${l.__hash} brand`,children:"ROCK STYLES"}),(0,d.jsx)("h1",{className:`jsx-${l.__hash}`,children:"login"===c?"WELCOME BACK":"CREATE ACCOUNT"}),(0,d.jsx)("p",{className:`jsx-${l.__hash}`,children:"login"===c?"Login to continue shopping.":"Create your Rock Styles account."})]}),(0,d.jsxs)("div",{className:`jsx-${l.__hash} tabs`,children:[(0,d.jsx)("button",{type:"button",onClick:()=>{e("login"),A("")},className:`jsx-${l.__hash} `+(("login"===c?"active":"")||""),children:"LOGIN"}),(0,d.jsx)("button",{type:"button",onClick:()=>{e("signup"),A("")},className:`jsx-${l.__hash} `+(("signup"===c?"active":"")||""),children:"CREATE ACCOUNT"})]}),(0,d.jsxs)("div",{className:`jsx-${l.__hash} auth-form`,children:[(0,d.jsxs)("div",{className:`jsx-${l.__hash} field`,children:[(0,d.jsx)("label",{className:`jsx-${l.__hash}`,children:"EMAIL ADDRESS"}),(0,d.jsx)("input",{type:"email",placeholder:"your@email.com",value:k,autoComplete:"email",onChange:a=>m(a.target.value),className:`jsx-${l.__hash}`})]}),(0,d.jsxs)("div",{className:`jsx-${l.__hash} field`,children:[(0,d.jsx)("label",{className:`jsx-${l.__hash}`,children:"PASSWORD"}),(0,d.jsx)("input",{type:"password",placeholder:"Minimum 6 characters",value:n,autoComplete:"login"===c?"current-password":"new-password",onChange:a=>o(a.target.value),className:`jsx-${l.__hash}`})]}),(0,d.jsx)("button",{type:"button",onClick:"login"===c?G:H,disabled:x,className:`jsx-${l.__hash} primary-btn`,children:x?"PLEASE WAIT...":"login"===c?"LOGIN":"CREATE ACCOUNT"}),"login"===c&&(0,d.jsx)("button",{type:"button",onClick:()=>{E(!D),A("")},className:`jsx-${l.__hash} forgot-btn`,children:"FORGOT PASSWORD?"}),D&&(0,d.jsxs)("div",{className:`jsx-${l.__hash} forgot-box`,children:[(0,d.jsx)("p",{className:`jsx-${l.__hash}`,children:"We'll send a password reset link to your email."}),(0,d.jsx)("button",{type:"button",onClick:I,disabled:x,className:`jsx-${l.__hash} reset-btn`,children:x?"SENDING...":"SEND RESET LINK"})]})]}),z&&(0,d.jsx)("p",{className:`jsx-${l.__hash} message ${B}`,children:z}),(0,d.jsx)("p",{className:`jsx-${l.__hash} security-note`,children:"\uD83D\uDD12 Your account is securely protected by Firebase."})]})})]})}let l=`
  * {
    box-sizing: border-box;
  }

  .account-page {
    min-height: calc(100vh - 80px);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 60px 20px 100px;
    background:
      radial-gradient(
        circle at top,
        #f7f7f7 0%,
        #ffffff 45%,
        #eeeeee 100%
      );
    font-family:
      Arial,
      Helvetica,
      sans-serif;
  }

  .account-card {
    width: 100%;
    max-width: 520px;
    background: #ffffff;
    border: 1px solid #e5e5e5;
    border-radius: 22px;
    padding: 38px;
    box-shadow:
      0 20px 60px rgba(0,0,0,0.08);
  }

  .account-heading {
    text-align: center;
    margin-bottom: 30px;
  }

  .brand {
    margin: 0 0 10px;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 0.2em;
  }

  .account-heading h1 {
    margin: 0;
    font-size: 34px;
    line-height: 1;
    font-weight: 900;
    letter-spacing: -0.04em;
    color: #111111;
  }

  .account-heading > p:not(.brand) {
    margin: 12px 0 0;
    color: #777777;
    font-size: 14px;
  }

  .account-email {
    margin-top: 12px;
    color: #555555;
    font-size: 14px;
    word-break: break-word;
  }

  .tabs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom: 1px solid #dddddd;
    margin-bottom: 28px;
  }

  .tabs button {
    border: 0;
    background: transparent;
    padding: 14px 8px;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: #888888;
    cursor: pointer;
    position: relative;
  }

  .tabs button.active {
    color: #111111;
  }

  .tabs button.active::after {
    content: "";
    position: absolute;
    left: 15%;
    right: 15%;
    bottom: -1px;
    height: 2px;
    background: #111111;
  }

  .auth-form,
  .profile-fields {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .field label {
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.12em;
    color: #333333;
  }

  .field input,
  .field textarea {
    width: 100%;
    border: 1px solid #d8d8d8;
    border-radius: 12px;
    padding: 14px 15px;
    background: #ffffff;
    color: #111111;
    font-size: 15px;
    outline: none;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;
  }

  .field textarea {
    resize: vertical;
    min-height: 105px;
  }

  .field input:focus,
  .field textarea:focus {
    border-color: #111111;
    box-shadow:
      0 0 0 3px rgba(0,0,0,0.06);
  }

  .field input:disabled {
    background: #f5f5f5;
    color: #666666;
    cursor: not-allowed;
  }

  .field small {
    color: #888888;
    font-size: 11px;
  }

  .profile-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }

  .primary-btn {
    width: 100%;
    margin-top: 26px;
    border: none;
    border-radius: 12px;
    background: #111111;
    color: #ffffff;
    padding: 16px;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.12em;
    cursor: pointer;
    transition:
      transform 0.2s ease,
      opacity 0.2s ease;
  }

  .primary-btn:hover {
    transform: translateY(-1px);
  }

  .primary-btn:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
  }

  .forgot-btn {
    border: none;
    background: transparent;
    color: #555555;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    cursor: pointer;
    padding: 5px;
  }

  .forgot-btn:hover {
    color: #000000;
    text-decoration: underline;
  }

  .forgot-box {
    padding: 16px;
    border-radius: 12px;
    background: #f6f6f6;
    border: 1px solid #e5e5e5;
  }

  .forgot-box p {
    margin: 0 0 12px;
    font-size: 12px;
    color: #666666;
    line-height: 1.5;
  }

  .reset-btn {
    width: 100%;
    border: 1px solid #111111;
    background: #ffffff;
    color: #111111;
    border-radius: 10px;
    padding: 12px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.08em;
    cursor: pointer;
  }

  .reset-btn:hover {
    background: #111111;
    color: #ffffff;
  }

  .logout-btn {
    width: 100%;
    margin-top: 12px;
    padding: 14px;
    border: 1px solid #dddddd;
    border-radius: 12px;
    background: #ffffff;
    color: #222222;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.12em;
    cursor: pointer;
  }

  .logout-btn:hover {
    border-color: #111111;
  }

  .message {
    margin: 20px 0 0;
    padding: 13px 15px;
    border-radius: 10px;
    text-align: center;
    font-size: 13px;
    line-height: 1.5;
  }

  .message.success {
    background: #eef9f0;
    color: #24713a;
    border: 1px solid #ccebd2;
  }

  .message.error {
    background: #fff1f1;
    color: #a72c2c;
    border: 1px solid #f0cccc;
  }

  .security-note {
    margin: 25px 0 0;
    text-align: center;
    color: #999999;
    font-size: 11px;
    line-height: 1.5;
  }

  .loading-card {
    width: 100%;
    max-width: 420px;
    padding: 50px 30px;
    background: #ffffff;
    border: 1px solid #eeeeee;
    border-radius: 20px;
    text-align: center;
    box-shadow:
      0 20px 60px rgba(0,0,0,0.06);
  }

  .loading-card p {
    color: #777777;
    font-size: 13px;
    margin-top: 20px;
  }

  .loader {
    width: 35px;
    height: 35px;
    margin: auto;
    border: 3px solid #eeeeee;
    border-top-color: #111111;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 600px) {
    .account-page {
      padding: 30px 14px 90px;
    }

    .account-card {
      padding: 25px 18px;
      border-radius: 18px;
    }

    .account-heading h1 {
      font-size: 28px;
    }

    .profile-row {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .tabs button {
      font-size: 10px;
    }
  }
`},37393:(a,b,c)=>{Promise.resolve().then(c.bind(c,87510))},41025:a=>{"use strict";a.exports=require("next/dist/server/app-render/dynamic-access-async-storage.external.js")},43006:(a,b,c)=>{"use strict";c.d(b,{db:()=>k,j2:()=>j});var d=c(34410),e=c(58554),f=c(9553),g=c(69477),h=c(77211);let i=(0,d.Dk)().length?(0,d.Sx)():(0,d.Wp)({apiKey:"AIzaSyD6UQzfydjevfd5JQm1jvwTmqU9JZQPMTY",authDomain:"rock-styles-tamil-001.firebaseapp.com",databaseURL:"https://rock-styles-tamil-001-default-rtdb.firebaseio.com",projectId:"rock-styles-tamil-001",storageBucket:"rock-styles-tamil-001.firebasestorage.app",messagingSenderId:"411138456904",appId:"1:411138456904:web:ee27160abc619b9bce077d"}),j=(0,e.xI)(i),k=(0,f.aU)(i);(0,g.c7)(i),(0,h.C3)(i)},55511:a=>{"use strict";a.exports=require("crypto")},63033:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},73496:a=>{"use strict";a.exports=require("http2")},74075:a=>{"use strict";a.exports=require("zlib")},79428:a=>{"use strict";a.exports=require("buffer")},79551:a=>{"use strict";a.exports=require("url")},81630:a=>{"use strict";a.exports=require("http")},83796:(a,b,c)=>{"use strict";c(83946);var d=c(38301),e=function(a){return a&&"object"==typeof a&&"default"in a?a:{default:a}}(d),f="undefined"!=typeof process&&process.env&&!0,g=function(a){return"[object String]"===Object.prototype.toString.call(a)},h=function(){function a(a){var b=void 0===a?{}:a,c=b.name,d=void 0===c?"stylesheet":c,e=b.optimizeForSpeed,h=void 0===e?f:e;i(g(d),"`name` must be a string"),this._name=d,this._deletedRulePlaceholder="#"+d+"-deleted-rule____{}",i("boolean"==typeof h,"`optimizeForSpeed` must be a boolean"),this._optimizeForSpeed=h,this._serverSheet=void 0,this._tags=[],this._injected=!1,this._rulesCount=0,this._nonce=null}var b,c=a.prototype;return c.setOptimizeForSpeed=function(a){i("boolean"==typeof a,"`setOptimizeForSpeed` accepts a boolean"),i(0===this._rulesCount,"optimizeForSpeed cannot be when rules have already been inserted"),this.flush(),this._optimizeForSpeed=a,this.inject()},c.isOptimizeForSpeed=function(){return this._optimizeForSpeed},c.inject=function(){var a=this;i(!this._injected,"sheet already injected"),this._injected=!0,this._serverSheet={cssRules:[],insertRule:function(b,c){return"number"==typeof c?a._serverSheet.cssRules[c]={cssText:b}:a._serverSheet.cssRules.push({cssText:b}),c},deleteRule:function(b){a._serverSheet.cssRules[b]=null}}},c.getSheetForTag=function(a){if(a.sheet)return a.sheet;for(var b=0;b<document.styleSheets.length;b++)if(document.styleSheets[b].ownerNode===a)return document.styleSheets[b]},c.getSheet=function(){return this.getSheetForTag(this._tags[this._tags.length-1])},c.insertRule=function(a,b){return i(g(a),"`insertRule` accepts only strings"),"number"!=typeof b&&(b=this._serverSheet.cssRules.length),this._serverSheet.insertRule(a,b),this._rulesCount++},c.replaceRule=function(a,b){this._optimizeForSpeed;var c=this._serverSheet;if(b.trim()||(b=this._deletedRulePlaceholder),!c.cssRules[a])return a;c.deleteRule(a);try{c.insertRule(b,a)}catch(d){f||console.warn("StyleSheet: illegal rule: \n\n"+b+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),c.insertRule(this._deletedRulePlaceholder,a)}return a},c.deleteRule=function(a){this._serverSheet.deleteRule(a)},c.flush=function(){this._injected=!1,this._rulesCount=0,this._serverSheet.cssRules=[]},c.cssRules=function(){return this._serverSheet.cssRules},c.makeStyleTag=function(a,b,c){b&&i(g(b),"makeStyleTag accepts only strings as second parameter");var d=document.createElement("style");this._nonce&&d.setAttribute("nonce",this._nonce),d.type="text/css",d.setAttribute("data-"+a,""),b&&d.appendChild(document.createTextNode(b));var e=document.head||document.getElementsByTagName("head")[0];return c?e.insertBefore(d,c):e.appendChild(d),d},b=[{key:"length",get:function(){return this._rulesCount}}],function(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}(a.prototype,b),a}();function i(a,b){if(!a)throw Error("StyleSheet: "+b+".")}var j=function(a){for(var b=5381,c=a.length;c;)b=33*b^a.charCodeAt(--c);return b>>>0},k={};function l(a,b){if(!b)return"jsx-"+a;var c=String(b),d=a+c;return k[d]||(k[d]="jsx-"+j(a+"-"+c)),k[d]}function m(a,b){var c=a+(b=b.replace(/\/style/gi,"\\/style"));return k[c]||(k[c]=b.replace(/__jsx-style-dynamic-selector/g,a)),k[c]}var n=function(){function a(a){var b=void 0===a?{}:a,c=b.styleSheet,d=void 0===c?null:c,e=b.optimizeForSpeed,f=void 0!==e&&e;this._sheet=d||new h({name:"styled-jsx",optimizeForSpeed:f}),this._sheet.inject(),d&&"boolean"==typeof f&&(this._sheet.setOptimizeForSpeed(f),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._fromServer=void 0,this._indices={},this._instancesCounts={}}var b=a.prototype;return b.add=function(a){var b=this;void 0===this._optimizeForSpeed&&(this._optimizeForSpeed=Array.isArray(a.children),this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed());var c=this.getIdAndRules(a),d=c.styleId,e=c.rules;if(d in this._instancesCounts){this._instancesCounts[d]+=1;return}var f=e.map(function(a){return b._sheet.insertRule(a)}).filter(function(a){return -1!==a});this._indices[d]=f,this._instancesCounts[d]=1},b.remove=function(a){var b=this,c=this.getIdAndRules(a).styleId;if(function(a,b){if(!a)throw Error("StyleSheetRegistry: "+b+".")}(c in this._instancesCounts,"styleId: `"+c+"` not found"),this._instancesCounts[c]-=1,this._instancesCounts[c]<1){var d=this._fromServer&&this._fromServer[c];d?(d.parentNode.removeChild(d),delete this._fromServer[c]):(this._indices[c].forEach(function(a){return b._sheet.deleteRule(a)}),delete this._indices[c]),delete this._instancesCounts[c]}},b.update=function(a,b){this.add(b),this.remove(a)},b.flush=function(){this._sheet.flush(),this._sheet.inject(),this._fromServer=void 0,this._indices={},this._instancesCounts={}},b.cssRules=function(){var a=this,b=this._fromServer?Object.keys(this._fromServer).map(function(b){return[b,a._fromServer[b]]}):[],c=this._sheet.cssRules();return b.concat(Object.keys(this._indices).map(function(b){return[b,a._indices[b].map(function(a){return c[a].cssText}).join(a._optimizeForSpeed?"":"\n")]}).filter(function(a){return!!a[1]}))},b.styles=function(a){var b,c;return b=this.cssRules(),void 0===(c=a)&&(c={}),b.map(function(a){var b=a[0],d=a[1];return e.default.createElement("style",{id:"__"+b,key:"__"+b,nonce:c.nonce?c.nonce:void 0,dangerouslySetInnerHTML:{__html:d}})})},b.getIdAndRules=function(a){var b=a.children,c=a.dynamic,d=a.id;if(c){var e=l(d,c);return{styleId:e,rules:Array.isArray(b)?b.map(function(a){return m(e,a)}):[m(e,b)]}}return{styleId:l(d),rules:Array.isArray(b)?b:[b]}},b.selectFromServer=function(){return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce(function(a,b){return a[b.id.slice(2)]=b,a},{})},a}(),o=d.createContext(null);o.displayName="StyleSheetContext";e.default.useInsertionEffect||e.default.useLayoutEffect;var p=void 0;function q(a){var b=p||d.useContext(o);return b&&b.add(a),null}q.dynamic=function(a){return a.map(function(a){return l(a[0],a[1])}).join(" ")},b.style=q},83946:()=>{},86439:a=>{"use strict";a.exports=require("next/dist/shared/lib/no-fallback-error.external")},87510:(a,b,c)=>{"use strict";c.r(b),c.d(b,{default:()=>d});let d=(0,c(97954).registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\Users\\\\dhanu\\\\OneDrive\\\\Desktop\\\\rock style\\\\ROCK-STYLES-FRESH\\\\rock-styles-ecommerce\\\\app\\\\account\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Users\\dhanu\\OneDrive\\Desktop\\rock style\\ROCK-STYLES-FRESH\\rock-styles-ecommerce\\app\\account\\page.tsx","default")},91645:a=>{"use strict";a.exports=require("net")},94735:a=>{"use strict";a.exports=require("events")},95627:(a,b,c)=>{"use strict";a.exports=c(83796).style},99099:(a,b,c)=>{"use strict";c.r(b),c.d(b,{GlobalError:()=>E.a,__next_app__:()=>K,handler:()=>M,pages:()=>J,routeModule:()=>L,tree:()=>I});var d=c(49754),e=c(9117),f=c(46595),g=c(32324),h=c(39326),i=c(38928),j=c(20175),k=c(12),l=c(54290),m=c(12696),n=c(52574),o=c(82802),p=c(77533),q=c(45229),r=c(32822),s=c(261),t=c(26453),u=c(52474),v=c(26713),w=c(51356),x=c(62685),y=c(36225),z=c(63446),A=c(2762),B=c(45742),C=c(86439),D=c(81170),E=c.n(D),F=c(62506),G=c(91203),H={};for(let a in F)0>["default","tree","pages","GlobalError","__next_app__","routeModule","handler"].indexOf(a)&&(H[a]=()=>F[a]);c.d(b,H);let I={children:["",{children:["account",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(c.bind(c,87510)),"C:\\Users\\dhanu\\OneDrive\\Desktop\\rock style\\ROCK-STYLES-FRESH\\rock-styles-ecommerce\\app\\account\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(c.bind(c,84104)),"C:\\Users\\dhanu\\OneDrive\\Desktop\\rock style\\ROCK-STYLES-FRESH\\rock-styles-ecommerce\\app\\layout.tsx"],"global-error":[()=>Promise.resolve().then(c.t.bind(c,81170,23)),"next/dist/client/components/builtin/global-error.js"],"not-found":[()=>Promise.resolve().then(c.t.bind(c,87028,23)),"next/dist/client/components/builtin/not-found.js"],forbidden:[()=>Promise.resolve().then(c.t.bind(c,90461,23)),"next/dist/client/components/builtin/forbidden.js"],unauthorized:[()=>Promise.resolve().then(c.t.bind(c,32768,23)),"next/dist/client/components/builtin/unauthorized.js"]}]}.children,J=["C:\\Users\\dhanu\\OneDrive\\Desktop\\rock style\\ROCK-STYLES-FRESH\\rock-styles-ecommerce\\app\\account\\page.tsx"],K={require:c,loadChunk:()=>Promise.resolve()},L=new d.AppPageRouteModule({definition:{kind:e.RouteKind.APP_PAGE,page:"/account/page",pathname:"/account",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:I},distDir:".next",relativeProjectDir:""});async function M(a,b,d){var D;let H="/account/page";"/index"===H&&(H="/");let N=(0,h.getRequestMeta)(a,"postponed"),O=(0,h.getRequestMeta)(a,"minimalMode"),P=await L.prepare(a,b,{srcPage:H,multiZoneDraftMode:!1});if(!P)return b.statusCode=400,b.end("Bad Request"),null==d.waitUntil||d.waitUntil.call(d,Promise.resolve()),null;let{buildId:Q,query:R,params:S,parsedUrl:T,pageIsDynamic:U,buildManifest:V,nextFontManifest:W,reactLoadableManifest:X,serverActionsManifest:Y,clientReferenceManifest:Z,subresourceIntegrityManifest:$,prerenderManifest:_,isDraftMode:aa,resolvedPathname:ab,revalidateOnlyGenerated:ac,routerServerContext:ad,nextConfig:ae,interceptionRoutePatterns:af}=P,ag=T.pathname||"/",ah=(0,s.normalizeAppPath)(H),{isOnDemandRevalidate:ai}=P,aj=L.match(ag,_),ak=!!_.routes[ab],al=!!(aj||ak||_.routes[ah]),am=a.headers["user-agent"]||"",an=(0,v.getBotType)(am),ao=(0,q.isHtmlBotRequest)(a),ap=(0,h.getRequestMeta)(a,"isPrefetchRSCRequest")??"1"===a.headers[u.NEXT_ROUTER_PREFETCH_HEADER],aq=(0,h.getRequestMeta)(a,"isRSCRequest")??(0,n.f)(a.headers[u.RSC_HEADER]),ar=(0,t.getIsPossibleServerAction)(a),as=(0,m.checkIsAppPPREnabled)(ae.experimental.ppr)&&(null==(D=_.routes[ah]??_.dynamicRoutes[ah])?void 0:D.renderingMode)==="PARTIALLY_STATIC",at=!1,au=!1,av=as?N:void 0,aw=as&&aq&&!ap,ax=(0,h.getRequestMeta)(a,"segmentPrefetchRSCRequest"),ay=!am||(0,q.shouldServeStreamingMetadata)(am,ae.htmlLimitedBots);ao&&as&&(al=!1,ay=!1);let az=!0===L.isDev||!al||"string"==typeof N||aw,aA=ao&&as,aB=null;aa||!al||az||ar||av||aw||(aB=ab);let aC=aB;!aC&&L.isDev&&(aC=ab),L.isDev||aa||!al||!aq||aw||(0,k.d)(a.headers);let aD={...F,tree:I,pages:J,GlobalError:E(),handler:M,routeModule:L,__next_app__:K};Y&&Z&&(0,p.setReferenceManifestsSingleton)({page:H,clientReferenceManifest:Z,serverActionsManifest:Y,serverModuleMap:(0,r.createServerModuleMap)({serverActionsManifest:Y})});let aE=a.method||"GET",aF=(0,g.getTracer)(),aG=aF.getActiveScopeSpan();try{let f=L.getVaryHeader(ab,af);b.setHeader("Vary",f);let k=async(c,d)=>{let e=new l.NodeNextRequest(a),f=new l.NodeNextResponse(b);return L.render(e,f,d).finally(()=>{if(!c)return;c.setAttributes({"http.status_code":b.statusCode,"next.rsc":!1});let d=aF.getRootSpanAttributes();if(!d)return;if(d.get("next.span_type")!==i.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${d.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let e=d.get("next.route");if(e){let a=`${aE} ${e}`;c.setAttributes({"next.route":e,"http.route":e,"next.span_name":a}),c.updateName(a)}else c.updateName(`${aE} ${a.url}`)})},m=async({span:e,postponed:f,fallbackRouteParams:g})=>{let i={query:R,params:S,page:ah,sharedContext:{buildId:Q},serverComponentsHmrCache:(0,h.getRequestMeta)(a,"serverComponentsHmrCache"),fallbackRouteParams:g,renderOpts:{App:()=>null,Document:()=>null,pageConfig:{},ComponentMod:aD,Component:(0,j.T)(aD),params:S,routeModule:L,page:H,postponed:f,shouldWaitOnAllReady:aA,serveStreamingMetadata:ay,supportsDynamicResponse:"string"==typeof f||az,buildManifest:V,nextFontManifest:W,reactLoadableManifest:X,subresourceIntegrityManifest:$,serverActionsManifest:Y,clientReferenceManifest:Z,setIsrStatus:null==ad?void 0:ad.setIsrStatus,dir:c(33873).join(process.cwd(),L.relativeProjectDir),isDraftMode:aa,isRevalidate:al&&!f&&!aw,botType:an,isOnDemandRevalidate:ai,isPossibleServerAction:ar,assetPrefix:ae.assetPrefix,nextConfigOutput:ae.output,crossOrigin:ae.crossOrigin,trailingSlash:ae.trailingSlash,previewProps:_.preview,deploymentId:ae.deploymentId,enableTainting:ae.experimental.taint,htmlLimitedBots:ae.htmlLimitedBots,devtoolSegmentExplorer:ae.experimental.devtoolSegmentExplorer,reactMaxHeadersLength:ae.reactMaxHeadersLength,multiZoneDraftMode:!1,incrementalCache:(0,h.getRequestMeta)(a,"incrementalCache"),cacheLifeProfiles:ae.experimental.cacheLife,basePath:ae.basePath,serverActions:ae.experimental.serverActions,...at?{nextExport:!0,supportsDynamicResponse:!1,isStaticGeneration:!0,isRevalidate:!0,isDebugDynamicAccesses:at}:{},experimental:{isRoutePPREnabled:as,expireTime:ae.expireTime,staleTimes:ae.experimental.staleTimes,cacheComponents:!!ae.experimental.cacheComponents,clientSegmentCache:!!ae.experimental.clientSegmentCache,clientParamParsing:!!ae.experimental.clientParamParsing,dynamicOnHover:!!ae.experimental.dynamicOnHover,inlineCss:!!ae.experimental.inlineCss,authInterrupts:!!ae.experimental.authInterrupts,clientTraceMetadata:ae.experimental.clientTraceMetadata||[]},waitUntil:d.waitUntil,onClose:a=>{b.on("close",a)},onAfterTaskError:()=>{},onInstrumentationRequestError:(b,c,d)=>L.onRequestError(a,b,d,ad),err:(0,h.getRequestMeta)(a,"invokeError"),dev:L.isDev}},l=await k(e,i),{metadata:m}=l,{cacheControl:n,headers:o={},fetchTags:p}=m;if(p&&(o[z.NEXT_CACHE_TAGS_HEADER]=p),a.fetchMetrics=m.fetchMetrics,al&&(null==n?void 0:n.revalidate)===0&&!L.isDev&&!as){let a=m.staticBailoutInfo,b=Object.defineProperty(Error(`Page changed from static to dynamic at runtime ${ab}${(null==a?void 0:a.description)?`, reason: ${a.description}`:""}
see more here https://nextjs.org/docs/messages/app-static-to-dynamic-error`),"__NEXT_ERROR_CODE",{value:"E132",enumerable:!1,configurable:!0});if(null==a?void 0:a.stack){let c=a.stack;b.stack=b.message+c.substring(c.indexOf("\n"))}throw b}return{value:{kind:w.CachedRouteKind.APP_PAGE,html:l,headers:o,rscData:m.flightData,postponed:m.postponed,status:m.statusCode,segmentData:m.segmentData},cacheControl:n}},n=async({hasResolved:c,previousCacheEntry:f,isRevalidating:g,span:i})=>{let j,k=!1===L.isDev,l=c||b.writableEnded;if(ai&&ac&&!f&&!O)return(null==ad?void 0:ad.render404)?await ad.render404(a,b):(b.statusCode=404,b.end("This page could not be found")),null;if(aj&&(j=(0,x.parseFallbackField)(aj.fallback)),j===x.FallbackMode.PRERENDER&&(0,v.isBot)(am)&&(!as||ao)&&(j=x.FallbackMode.BLOCKING_STATIC_RENDER),(null==f?void 0:f.isStale)===-1&&(ai=!0),ai&&(j!==x.FallbackMode.NOT_FOUND||f)&&(j=x.FallbackMode.BLOCKING_STATIC_RENDER),!O&&j!==x.FallbackMode.BLOCKING_STATIC_RENDER&&aC&&!l&&!aa&&U&&(k||!ak)){let b;if((k||aj)&&j===x.FallbackMode.NOT_FOUND)throw new C.NoFallbackError;if(as&&!aq){let c="string"==typeof(null==aj?void 0:aj.fallback)?aj.fallback:k?ah:null;if(b=await L.handleResponse({cacheKey:c,req:a,nextConfig:ae,routeKind:e.RouteKind.APP_PAGE,isFallback:!0,prerenderManifest:_,isRoutePPREnabled:as,responseGenerator:async()=>m({span:i,postponed:void 0,fallbackRouteParams:k||au?(0,o.u)(ah):null}),waitUntil:d.waitUntil}),null===b)return null;if(b)return delete b.cacheControl,b}}let n=ai||g||!av?void 0:av;if(at&&void 0!==n)return{cacheControl:{revalidate:1,expire:void 0},value:{kind:w.CachedRouteKind.PAGES,html:y.default.EMPTY,pageData:{},headers:void 0,status:void 0}};let p=U&&as&&((0,h.getRequestMeta)(a,"renderFallbackShell")||au)?(0,o.u)(ag):null;return m({span:i,postponed:n,fallbackRouteParams:p})},p=async c=>{var f,g,i,j,k;let l,o=await L.handleResponse({cacheKey:aB,responseGenerator:a=>n({span:c,...a}),routeKind:e.RouteKind.APP_PAGE,isOnDemandRevalidate:ai,isRoutePPREnabled:as,req:a,nextConfig:ae,prerenderManifest:_,waitUntil:d.waitUntil});if(aa&&b.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate"),L.isDev&&b.setHeader("Cache-Control","no-store, must-revalidate"),!o){if(aB)throw Object.defineProperty(Error("invariant: cache entry required but not generated"),"__NEXT_ERROR_CODE",{value:"E62",enumerable:!1,configurable:!0});return null}if((null==(f=o.value)?void 0:f.kind)!==w.CachedRouteKind.APP_PAGE)throw Object.defineProperty(Error(`Invariant app-page handler received invalid cache entry ${null==(i=o.value)?void 0:i.kind}`),"__NEXT_ERROR_CODE",{value:"E707",enumerable:!1,configurable:!0});let p="string"==typeof o.value.postponed;al&&!aw&&(!p||ap)&&(O||b.setHeader("x-nextjs-cache",ai?"REVALIDATED":o.isMiss?"MISS":o.isStale?"STALE":"HIT"),b.setHeader(u.NEXT_IS_PRERENDER_HEADER,"1"));let{value:q}=o;if(av)l={revalidate:0,expire:void 0};else if(O&&aq&&!ap&&as)l={revalidate:0,expire:void 0};else if(!L.isDev)if(aa)l={revalidate:0,expire:void 0};else if(al){if(o.cacheControl)if("number"==typeof o.cacheControl.revalidate){if(o.cacheControl.revalidate<1)throw Object.defineProperty(Error(`Invalid revalidate configuration provided: ${o.cacheControl.revalidate} < 1`),"__NEXT_ERROR_CODE",{value:"E22",enumerable:!1,configurable:!0});l={revalidate:o.cacheControl.revalidate,expire:(null==(j=o.cacheControl)?void 0:j.expire)??ae.expireTime}}else l={revalidate:z.CACHE_ONE_YEAR,expire:void 0}}else b.getHeader("Cache-Control")||(l={revalidate:0,expire:void 0});if(o.cacheControl=l,"string"==typeof ax&&(null==q?void 0:q.kind)===w.CachedRouteKind.APP_PAGE&&q.segmentData){b.setHeader(u.NEXT_DID_POSTPONE_HEADER,"2");let c=null==(k=q.headers)?void 0:k[z.NEXT_CACHE_TAGS_HEADER];O&&al&&c&&"string"==typeof c&&b.setHeader(z.NEXT_CACHE_TAGS_HEADER,c);let d=q.segmentData.get(ax);return void 0!==d?(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:y.default.fromStatic(d,u.RSC_CONTENT_TYPE_HEADER),cacheControl:o.cacheControl}):(b.statusCode=204,(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:y.default.EMPTY,cacheControl:o.cacheControl}))}let r=(0,h.getRequestMeta)(a,"onCacheEntry");if(r&&await r({...o,value:{...o.value,kind:"PAGE"}},{url:(0,h.getRequestMeta)(a,"initURL")}))return null;if(p&&av)throw Object.defineProperty(Error("Invariant: postponed state should not be present on a resume request"),"__NEXT_ERROR_CODE",{value:"E396",enumerable:!1,configurable:!0});if(q.headers){let a={...q.headers};for(let[c,d]of(O&&al||delete a[z.NEXT_CACHE_TAGS_HEADER],Object.entries(a)))if(void 0!==d)if(Array.isArray(d))for(let a of d)b.appendHeader(c,a);else"number"==typeof d&&(d=d.toString()),b.appendHeader(c,d)}let s=null==(g=q.headers)?void 0:g[z.NEXT_CACHE_TAGS_HEADER];if(O&&al&&s&&"string"==typeof s&&b.setHeader(z.NEXT_CACHE_TAGS_HEADER,s),!q.status||aq&&as||(b.statusCode=q.status),!O&&q.status&&G.RedirectStatusCode[q.status]&&aq&&(b.statusCode=200),p&&b.setHeader(u.NEXT_DID_POSTPONE_HEADER,"1"),aq&&!aa){if(void 0===q.rscData){if(q.postponed)throw Object.defineProperty(Error("Invariant: Expected postponed to be undefined"),"__NEXT_ERROR_CODE",{value:"E372",enumerable:!1,configurable:!0});return(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:q.html,cacheControl:aw?{revalidate:0,expire:void 0}:o.cacheControl})}return(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:y.default.fromStatic(q.rscData,u.RSC_CONTENT_TYPE_HEADER),cacheControl:o.cacheControl})}let t=q.html;if(!p||O||aq)return(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:t,cacheControl:o.cacheControl});if(at)return t.push(new ReadableStream({start(a){a.enqueue(A.ENCODED_TAGS.CLOSED.BODY_AND_HTML),a.close()}})),(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:t,cacheControl:{revalidate:0,expire:void 0}});let v=new TransformStream;return t.push(v.readable),m({span:c,postponed:q.postponed,fallbackRouteParams:null}).then(async a=>{var b,c;if(!a)throw Object.defineProperty(Error("Invariant: expected a result to be returned"),"__NEXT_ERROR_CODE",{value:"E463",enumerable:!1,configurable:!0});if((null==(b=a.value)?void 0:b.kind)!==w.CachedRouteKind.APP_PAGE)throw Object.defineProperty(Error(`Invariant: expected a page response, got ${null==(c=a.value)?void 0:c.kind}`),"__NEXT_ERROR_CODE",{value:"E305",enumerable:!1,configurable:!0});await a.value.html.pipeTo(v.writable)}).catch(a=>{v.writable.abort(a).catch(a=>{console.error("couldn't abort transformer",a)})}),(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:t,cacheControl:{revalidate:0,expire:void 0}})};if(!aG)return await aF.withPropagatedContext(a.headers,()=>aF.trace(i.BaseServerSpan.handleRequest,{spanName:`${aE} ${a.url}`,kind:g.SpanKind.SERVER,attributes:{"http.method":aE,"http.target":a.url}},p));await p(aG)}catch(b){throw b instanceof C.NoFallbackError||await L.onRequestError(a,b,{routerKind:"App Router",routePath:H,routeType:"render",revalidateReason:(0,f.c)({isRevalidate:al,isOnDemandRevalidate:ai})},ad),b}}}};var b=require("../../webpack-runtime.js");b.C(a);var c=b.X(0,[756,525,760],()=>b(b.s=99099));module.exports=c})();