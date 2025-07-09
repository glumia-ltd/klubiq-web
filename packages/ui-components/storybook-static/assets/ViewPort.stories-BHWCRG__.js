import{j as e}from"./jsx-runtime-CiKstLBL.js";import{u as B}from"./useTheme-CSQB3z4f.js";import{u as D}from"./useMediaQuery-B5sbL9-V.js";import{B as F}from"./Box-DKMDc44o.js";import"./index-CoXXcpNP.js";import"./defaultTheme-D4_KWPKg.js";import"./getThemeProps-V7nEOQ_H.js";import"./useEnhancedEffect-Dze88C9b.js";import"./generateUtilityClasses-C1n5gl2S.js";const a=({children:r,maxWidth:T="lg",centered:_=!0,...l})=>{const q=B(),k=D(q.breakpoints.down("sm"));return e.jsx(F,{sx:{width:"100%",maxWidth:T,mx:_?"auto":void 0,px:k?2:4,...l.sx},...l,children:r})};a.__docgenInfo={description:"",methods:[],displayName:"ViewPort",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},maxWidth:{required:!1,tsType:{name:"union",raw:"'xs' | 'sm' | 'md' | 'lg' | 'xl'",elements:[{name:"literal",value:"'xs'"},{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"},{name:"literal",value:"'xl'"}]},description:"",defaultValue:{value:"'lg'",computed:!1}},centered:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}},composes:["Omit"]};const U={title:"Components/ViewPort",component:a,parameters:{layout:"centered"},tags:["autodocs"]},s=()=>e.jsx("div",{style:{padding:"20px",background:"#f0f0f0",borderRadius:"4px"},children:"Sample Content"}),t={render:r=>e.jsx(a,{...r,children:e.jsx(s,{})}),args:{maxWidth:"lg",centered:!0}},n={render:r=>e.jsx(a,{...r,children:e.jsx(s,{})}),args:{maxWidth:"sm"}},o={render:r=>e.jsx(a,{...r,children:e.jsx(s,{})}),args:{maxWidth:"md"}},d={render:r=>e.jsx(a,{...r,children:e.jsx(s,{})}),args:{maxWidth:"lg"}},i={render:r=>e.jsx(a,{...r,children:e.jsx(s,{})}),args:{maxWidth:"xl"}},m={render:r=>e.jsx(a,{...r,children:e.jsx(s,{})}),args:{centered:!1}},c={render:r=>e.jsx(a,{...r,children:e.jsx(s,{})}),args:{maxWidth:void 0,centered:!1}};var u,p,g;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: args => <ViewPort {...args}>
      <Content />
    </ViewPort>,
  args: {
    maxWidth: 'lg',
    centered: true
  }
}`,...(g=(p=t.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var x,h,f;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: args => <ViewPort {...args}>
      <Content />
    </ViewPort>,
  args: {
    maxWidth: 'sm'
  }
}`,...(f=(h=n.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var w,V,j;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: args => <ViewPort {...args}>
      <Content />
    </ViewPort>,
  args: {
    maxWidth: 'md'
  }
}`,...(j=(V=o.parameters)==null?void 0:V.docs)==null?void 0:j.source}}};var P,W,C;d.parameters={...d.parameters,docs:{...(P=d.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: args => <ViewPort {...args}>
      <Content />
    </ViewPort>,
  args: {
    maxWidth: 'lg'
  }
}`,...(C=(W=d.parameters)==null?void 0:W.docs)==null?void 0:C.source}}};var v,S,y;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: args => <ViewPort {...args}>
      <Content />
    </ViewPort>,
  args: {
    maxWidth: 'xl'
  }
}`,...(y=(S=i.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};var R,b,N;m.parameters={...m.parameters,docs:{...(R=m.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: args => <ViewPort {...args}>
      <Content />
    </ViewPort>,
  args: {
    centered: false
  }
}`,...(N=(b=m.parameters)==null?void 0:b.docs)==null?void 0:N.source}}};var E,L,M;c.parameters={...c.parameters,docs:{...(E=c.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: args => <ViewPort {...args}>
      <Content />
    </ViewPort>,
  args: {
    maxWidth: undefined,
    centered: false
  }
}`,...(M=(L=c.parameters)==null?void 0:L.docs)==null?void 0:M.source}}};const X=["Default","Small","Medium","Large","ExtraLarge","NotCentered","FullWidth"];export{t as Default,i as ExtraLarge,c as FullWidth,d as Large,o as Medium,m as NotCentered,n as Small,X as __namedExportsOrder,U as default};
