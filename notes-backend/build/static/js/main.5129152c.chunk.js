(this.webpackJsonpexample=this.webpackJsonpexample||[]).push([[0],{41:function(t,e,n){},42:function(t,e,n){"use strict";n.r(e);var c=n(16),r=n.n(c),o=n(7),a=n(3),i=n(2),u=n(0),s=function(){return Object(u.jsxs)("div",{style:{color:"green",fontStyle:"italic",fontSize:16},children:[Object(u.jsx)("br",{}),Object(u.jsx)("em",{children:"Note app, Department of Computer Science, University of Helsinki 2021"})]})},l=function(t){var e=t.note,n=t.toggleImportance,c=e.important?"make not important":"make important";return Object(u.jsxs)("li",{className:"note",children:[e.content,Object(u.jsx)("button",{onClick:n,children:c})]})},j=function(t){var e=t.message;return null===e?null:Object(u.jsx)("div",{className:"error",children:e})},f=n(4),b=n.n(f),d="https://tranquil-harbor-89202.herokuapp.com/api/notes",m=function(){var t=b.a.get(d),e={id:1e4,content:"This note is not saved to server",date:"2019-05-30T17:30:31.098Z",important:!0};return t.then((function(t){return t.data.concat(e)}))},p=function(t){return b.a.post(d,t).then((function(t){return t.data}))},h=function(t,e){return b.a.put("".concat(d,"/").concat(t),e).then((function(t){return t.data}))},O=function(){var t=Object(i.useState)([]),e=Object(a.a)(t,2),n=e[0],c=e[1],r=Object(i.useState)("a new note..."),f=Object(a.a)(r,2),b=f[0],d=f[1],O=Object(i.useState)(!0),v=Object(a.a)(O,2),x=v[0],g=v[1],S=Object(i.useState)(null),k=Object(a.a)(S,2),w=k[0],y=k[1];Object(i.useEffect)((function(){m().then((function(t){c(t)}))}),[]);var N=x?n:n.filter((function(t){return t.important}));return Object(u.jsxs)("div",{children:[Object(u.jsx)("h1",{children:"Notes"}),Object(u.jsx)(j,{message:w}),Object(u.jsx)("div",{children:Object(u.jsxs)("button",{onClick:function(){return g(!x)},children:["show ",x?"important":"all"]})}),Object(u.jsx)("ul",{children:N.map((function(t){return Object(u.jsx)(l,{note:t,toggleImportance:function(){return function(t){var e=n.find((function(e){return e.id===t})),r=Object(o.a)(Object(o.a)({},e),{},{important:!e.important});h(t,r).then((function(e){c(n.map((function(n){return n.id!==t?n:e})))})).catch((function(){y("Note '".concat(e.content,"' was already removed from server")),setTimeout((function(){y(null)}),5e3),c(n.filter((function(e){return e.id!==t})))}))}(t.id)}},t.id)}))}),Object(u.jsxs)("form",{onSubmit:function(t){t.preventDefault();var e={content:b,date:(new Date).toISOString(),important:Math.random()<.5};p(e).then((function(t){c(n.concat(t)),d("")}))},children:[Object(u.jsx)("input",{value:b,onChange:function(t){console.log(t.target.value),d(t.target.value)}}),Object(u.jsx)("button",{type:"submit",children:"save"})]}),Object(u.jsx)(s,{})]})};n(41);r.a.render(Object(u.jsx)(O,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.5129152c.chunk.js.map