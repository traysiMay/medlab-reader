(window["webpackJsonpqr-reader"]=window["webpackJsonpqr-reader"]||[]).push([[0],{12:function(e,n,t){},21:function(e,n,t){"use strict";t.r(n);var o=t(0),a=t.n(o),r=t(4),c=t.n(r),i=(t(12),t(2)),l=t(5),u=t.n(l),d="https://medlab-engineering.herokuapp.com";var s=function(){var e=Object(o.useState)("r1s2v3p?5cd89bc8-8df7-3203-a7ed-e5bd7de16dde"),n=Object(i.a)(e,2),t=n[0],r=n[1],c=Object(o.useState)(""),l=Object(i.a)(c,2),s=l[0],p=l[1];return a.a.createElement("div",{className:"App"},a.a.createElement(u.a,{delay:300,onError:function(e){console.log(e)},onScan:function(e){e&&r(e)},style:{width:"100%"}}),a.a.createElement("p",null,"PAPA-",t,"-PAPA"),a.a.createElement("input",{onChange:function(e){return r(e.target.value)}}),a.a.createElement("p",null,s),a.a.createElement("button",{onClick:function(){var e={method:"POST",headers:{Authorization:"Bearer ".concat(s),"Content-Type":"application/json"},body:JSON.stringify({qr:t})};fetch(d+"toad/boop",e).then(function(e){return console.log(e)})}},"SEND IT"),a.a.createElement("button",{onClick:function(){var e={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:"admin",password:"admin"})};fetch(d+"/auth/login",e).then(function(e){return e.json()}).then(function(e){return p(e.token)})}},"LOGIN"))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(s,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},7:function(e,n,t){e.exports=t(21)}},[[7,1,2]]]);
//# sourceMappingURL=main.87bcff67.chunk.js.map