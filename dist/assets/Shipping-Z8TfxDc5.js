import{u as d,f as h,A as x,r,j as e,O as g,G as m}from"./index-BB63jZdJ.js";let j=()=>{const{cartItems:i,total:p}=d(a=>a.cartReducer),o=h(),l=x();r.useEffect(()=>{if(i.length<=0)return o("/")},[i]);const[t,c]=r.useState({address:"",city:"",state:"",country:"india ",pinCode:""});let n=a=>{c(s=>({...s,[a.target.name]:a.target.value}))},u=async a=>{a.preventDefault(),console.log("shipping info",t),l(g(t));const{data:s}=await m.post("http://localhost:4000/api/v1/payment/create",{amount:p},{headers:{"Content-Type":"application/json"}});o("/pay",{state:s.clientSecret})};return e.jsx("div",{className:"shippingDetails",children:e.jsxs("form",{onSubmit:u,children:[e.jsx("h1",{children:"Shipping Info"}),e.jsx("input",{type:"text",placeholder:"address",name:"address",value:t.address,onChange:n,required:!0}),e.jsx("input",{type:"text",placeholder:"city",name:"city",value:t.city,onChange:n,required:!0}),e.jsx("input",{type:"text",placeholder:"state",name:"state",value:t.state,onChange:n,required:!0}),e.jsxs("select",{name:"country",value:t.country,onChange:n,children:[e.jsx("option",{value:"India",children:"India"}),e.jsx("option",{value:"US",children:"Us"}),e.jsx("option",{value:"Japan",children:"Japan"})]}),e.jsx("input",{type:"text",placeholder:"pinCode",name:"pinCode",value:t.pinCode,onChange:n,required:!0}),e.jsx("button",{type:"submit",className:"btn-pay",children:"pay now"})]})})};export{j as default};
