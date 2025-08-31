import{j as i}from"./jsx-runtime-CiKstLBL.js";import{B as V}from"./Box-DKMDc44o.js";import{A as _,a as k}from"./AvatarGroup-GjCL-mir.js";import"./index-CoXXcpNP.js";import"./defaultTheme-D4_KWPKg.js";import"./generateUtilityClasses-C1n5gl2S.js";import"./styled-S1aw2zqw.js";import"./DefaultPropsProvider-CBQ9sw5y.js";import"./createSvgIcon-RFZQnbNo.js";import"./useSlot-BmQqmJkm.js";import"./resolveComponentProps-DwJlmBgI.js";import"./useForkRef-DnFApgto.js";const j=({avatars:T,max:b=4,size:l="medium",spacing:U=-.5,variant:G="circular"})=>{const m=()=>{switch(l){case"small":return 24;case"medium":return 32;case"large":return 40;default:return 32}};return i.jsx(V,{sx:{display:"flex",alignItems:"center"},children:i.jsx(_,{max:b,spacing:U,sx:{"& .MuiAvatar-root":{width:m(),height:m(),fontSize:l==="small"?"0.75rem":"1rem"}},children:T.map((o,P)=>i.jsx(k,{src:o.src,alt:o.alt,variant:G,sx:o.sx},P))})})};j.__docgenInfo={description:"",methods:[],displayName:"GroupedAvatar",props:{avatars:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  src?: string
  alt: string
  sx?: AvatarProps['sx']
}`,signature:{properties:[{key:"src",value:{name:"string",required:!1}},{key:"alt",value:{name:"string",required:!0}},{key:"sx",value:{name:"AvatarProps['sx']",raw:"AvatarProps['sx']",required:!1}}]}}],raw:`{
  src?: string
  alt: string
  sx?: AvatarProps['sx']
}[]`},description:""},max:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"4",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:"",defaultValue:{value:"'medium'",computed:!1}},spacing:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"-0.5",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'circular' | 'rounded' | 'square'",elements:[{name:"literal",value:"'circular'"},{name:"literal",value:"'rounded'"},{name:"literal",value:"'square'"}]},description:"",defaultValue:{value:"'circular'",computed:!1}}}};const J={title:"Components/GroupedAvatar",component:j,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{max:{control:"number"},size:{control:"select",options:["small","medium","large"]},spacing:{control:"number"},variant:{control:"select",options:["circular","rounded","square"]}}},e=[{src:"https://i.pravatar.cc/150?img=1",alt:"User 1"},{src:"https://i.pravatar.cc/150?img=2",alt:"User 2"},{src:"https://i.pravatar.cc/150?img=3",alt:"User 3"},{src:"https://i.pravatar.cc/150?img=4",alt:"User 4"},{src:"https://i.pravatar.cc/150?img=5",alt:"User 5"}],r={args:{avatars:e}},a={args:{avatars:e,size:"small"}},s={args:{avatars:e,size:"large"}},t={args:{avatars:e,variant:"rounded"}},n={args:{avatars:e,max:3}};var c,u,p;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    avatars
  }
}`,...(p=(u=r.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var d,g,v;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    avatars,
    size: 'small'
  }
}`,...(v=(g=a.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};var x,f,y;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    avatars,
    size: 'large'
  }
}`,...(y=(f=s.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var S,h,A;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    avatars,
    variant: 'rounded'
  }
}`,...(A=(h=t.parameters)==null?void 0:h.docs)==null?void 0:A.source}}};var q,z,w;n.parameters={...n.parameters,docs:{...(q=n.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    avatars,
    max: 3
  }
}`,...(w=(z=n.parameters)==null?void 0:z.docs)==null?void 0:w.source}}};const K=["Default","SmallSize","LargeSize","Rounded","CustomMax"];export{n as CustomMax,r as Default,s as LargeSize,t as Rounded,a as SmallSize,K as __namedExportsOrder,J as default};
