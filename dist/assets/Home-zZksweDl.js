import{u as l,A as p,B as h,n as a,j as r,L as x,C as j,D as g,E as f}from"./index-BB63jZdJ.js";import{P as k}from"./Product-card-C_ySo0Jl.js";const A=()=>{const{user:o,loading:C}=l(s=>s.userReducer),d=o?._id,t=p(),{data:e,isError:c,isLoading:n}=h("");c&&a.error("Cannot fetch products");const i=s=>{if(s.stock<1)return a.error("Out of stock");t(g(s)),a.success("Added to cart");const{productId:u,quantity:m}=s;t(f({userId:d,productId:u,quantity:m}))};return r.jsx(r.Fragment,{children:r.jsxs("div",{className:"home-content",children:[r.jsx("div",{className:"big-image",children:"  "}),r.jsxs("h1",{children:["latest products",r.jsx(x,{className:"more-link",to:"/search",children:"more"})]}),r.jsx("main",{className:"home-products",children:n?r.jsx(j,{}):e?.message&&Array.isArray(e.message)&&e.message.map(s=>r.jsx(k,{name:s.name,productId:s._id,photo:s.photo,price:s.price,stock:s.stock,handler:i},s._id))})]})})};export{A as default};
