import{j as e}from"./jsx-runtime-CiKstLBL.js";import{B as b}from"./Box-DKMDc44o.js";import{T as a}from"./Typography-DXOq44QA.js";import{I as z}from"./Info-Jj9KJceR.js";import{c as w}from"./createSvgIcon-RFZQnbNo.js";import{C}from"./CheckCircle-DvMzWTQp.js";import"./index-CoXXcpNP.js";import"./defaultTheme-D4_KWPKg.js";import"./generateUtilityClasses-C1n5gl2S.js";import"./styled-S1aw2zqw.js";import"./DefaultPropsProvider-CBQ9sw5y.js";const T=w(e.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 15h-2v-2h2zm0-4h-2V7h2z"}),"Error"),E=w(e.jsx("path",{d:"M1 21h22L12 2zm12-3h-2v-2h2zm0-4h-2v-4h2z"}),"Warning"),W=o=>{switch(o){case"success":return e.jsx(C,{color:"success",sx:{fontSize:40}});case"error":return e.jsx(T,{color:"error",sx:{fontSize:40}});case"warning":return e.jsx(E,{color:"warning",sx:{fontSize:40}});case"info":return e.jsx(z,{color:"info",sx:{fontSize:40}});default:return null}},S=({type:o,title:j,message:v,icon:I})=>e.jsxs(b,{sx:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",p:4,textAlign:"center"},children:[I||W(o),e.jsx(a,{variant:"h6",sx:{mt:2,mb:1},children:j}),e.jsx(a,{variant:"body1",color:"text.secondary",children:v})]});S.__docgenInfo={description:"",methods:[],displayName:"FeedbackContent",props:{type:{required:!0,tsType:{name:"union",raw:"'success' | 'error' | 'warning' | 'info'",elements:[{name:"literal",value:"'success'"},{name:"literal",value:"'error'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'info'"}]},description:""},title:{required:!0,tsType:{name:"string"},description:""},message:{required:!0,tsType:{name:"string"},description:""},icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const A={title:"Components/FeedbackContent",component:S,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{type:{control:"select",options:["success","error","warning","info"]},title:{control:"text"},message:{control:"text"}}},r={args:{type:"success",title:"Success!",message:"Your action was completed successfully."}},s={args:{type:"error",title:"Error",message:"Something went wrong. Please try again."}},t={args:{type:"warning",title:"Warning",message:"This action cannot be undone."}},n={args:{type:"info",title:"Information",message:"Please review the details before proceeding."}};var c,i,m;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    type: 'success',
    title: 'Success!',
    message: 'Your action was completed successfully.'
  }
}`,...(m=(i=r.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var p,l,u;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    type: 'error',
    title: 'Error',
    message: 'Something went wrong. Please try again.'
  }
}`,...(u=(l=s.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var g,d,f;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    type: 'warning',
    title: 'Warning',
    message: 'This action cannot be undone.'
  }
}`,...(f=(d=t.parameters)==null?void 0:d.docs)==null?void 0:f.source}}};var y,x,h;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    type: 'info',
    title: 'Information',
    message: 'Please review the details before proceeding.'
  }
}`,...(h=(x=n.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};const D=["Success","Error","Warning","Info"];export{s as Error,n as Info,r as Success,t as Warning,D as __namedExportsOrder,A as default};
