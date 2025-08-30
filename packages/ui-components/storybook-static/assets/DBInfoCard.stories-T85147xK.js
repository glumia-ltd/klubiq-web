import{j as e}from"./jsx-runtime-CiKstLBL.js";import{u as W}from"./useTheme-CSQB3z4f.js";import{C as I}from"./Card-CQH3tkHk.js";import{S as P}from"./Stack-FNVfWfbB.js";import{B as m}from"./Box-DKMDc44o.js";import{C as N}from"./Chip-CWSHvOzM.js";import{T as y}from"./Typography-DXOq44QA.js";import{M as o}from"./MonetizationOn-DAfRAihQ.js";import{B as E}from"./Button-9rKXOvmp.js";import"./index-CoXXcpNP.js";import"./defaultTheme-D4_KWPKg.js";import"./generateUtilityClasses-C1n5gl2S.js";import"./styled-S1aw2zqw.js";import"./DefaultPropsProvider-CBQ9sw5y.js";import"./Paper-BmMWkbbD.js";import"./getThemeProps-V7nEOQ_H.js";import"./createSvgIcon-RFZQnbNo.js";import"./useForkRef-DnFApgto.js";import"./ButtonBase-zdw2Te-A.js";import"./TransitionGroupContext-tOqp5AMi.js";import"./useEnhancedEffect-Dze88C9b.js";const _=(t,r,n)=>{switch(t){case"gradient":return{background:"linear-gradient(135deg, #615FFF 0%, #9810FA 100%)",color:"#fff"};case"primary":return{backgroundColor:r.palette.primary.main,color:r.palette.primary.contrastText};case"secondary":return{backgroundColor:r.palette.secondary.main,color:r.palette.secondary.contrastText};case"custom":return{backgroundColor:n||r.palette.background.paper,color:r.palette.getContrastText(n||r.palette.background.paper)};default:return{backgroundColor:r.palette.background.paper,color:r.palette.text.primary}}},F=({icon:t,amount:r,label:n,badgeText:u,badgeColor:p,variant:$="default",backgroundColor:q,children:g,sx:f={}})=>{const a=W(),O={borderRadius:3,p:3,minWidth:0,width:"100%",maxWidth:400,boxShadow:"0 2px 8px 0 rgba(16,30,54,0.04)",..._($,a,q),...typeof f=="object"?f:{}};return e.jsxs(I,{elevation:0,sx:O,children:[e.jsxs(P,{direction:"row",justifyContent:"space-between",alignItems:"flex-start",spacing:2,children:[t&&e.jsx(m,{sx:{width:44,height:44,borderRadius:2,background:a.palette.mode==="dark"?a.palette.background.default:"#fff",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 1px 4px 0 rgba(16,30,54,0.08)",mb:1},children:t}),u&&e.jsx(N,{label:u,size:"small",sx:{background:p||a.palette.success.light||"#E6F4EA",color:p?a.palette.getContrastText(p):a.palette.success.main,fontWeight:500,borderRadius:2,px:1.5,height:28,alignSelf:"flex-start"}})]}),e.jsx(m,{mt:t?2:0,mb:.5,children:e.jsx(y,{variant:"h3",sx:{fontWeight:700,fontSize:"2.25rem",lineHeight:1.1,color:"inherit"},children:r})}),e.jsx(y,{variant:"subtitle1",sx:{color:a.palette.text.secondary,fontWeight:400,fontSize:"1.1rem"},children:n}),g&&e.jsx(m,{mt:2,children:g})]})};F.__docgenInfo={description:"",methods:[],displayName:"DBInfoCard",props:{icon:{required:!1,tsType:{name:"ReactNode"},description:""},amount:{required:!0,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:""},label:{required:!0,tsType:{name:"string"},description:""},badgeText:{required:!1,tsType:{name:"string"},description:""},badgeColor:{required:!1,tsType:{name:"string"},description:""},variant:{required:!1,tsType:{name:"union",raw:"'default' | 'gradient' | 'primary' | 'secondary' | 'custom'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'gradient'"},{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"},{name:"literal",value:"'custom'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},backgroundColor:{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactNode"},description:""},sx:{required:!1,tsType:{name:"SxProps",elements:[{name:"Theme"}],raw:"SxProps<Theme>"},description:"",defaultValue:{value:"{}",computed:!1}}}};const ce={title:"Components/DBInfoCard",component:F,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"A dynamic, theme-aware, responsive info card for dashboards."}}},argTypes:{variant:{control:"select",options:["default","gradient","primary","secondary","custom"]},backgroundColor:{control:"color"},badgeColor:{control:"color"}}},s={args:{icon:e.jsx(o,{fontSize:"large",color:"primary"}),amount:"$68k",label:"Monthly Rent",badgeText:"Due Sep 1"}},i={args:{icon:e.jsx(o,{fontSize:"large",sx:{color:"#615FFF"}}),amount:"$68k",label:"Monthly Rent",badgeText:"Due Sep 1",variant:"gradient"}},l={args:{icon:e.jsx(o,{fontSize:"large"}),amount:"$68k",label:"Monthly Rent",badgeText:"Due Sep 1",variant:"primary"}},c={args:{icon:e.jsx(o,{fontSize:"large",sx:{color:"#fff"}}),amount:"$68k",label:"Monthly Rent",badgeText:"Due Sep 1",variant:"custom",backgroundColor:"#22223b",badgeColor:"#caff70"}},d={args:{icon:e.jsx(o,{fontSize:"large",color:"primary"}),amount:"$68k",label:"Monthly Rent",badgeText:"Due Sep 1",children:e.jsx(E,{variant:"contained",color:"primary",children:"Pay Now"})}};var x,b,h;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    icon: <MonetizationOn fontSize="large" color="primary" />,
    amount: '$68k',
    label: 'Monthly Rent',
    badgeText: 'Due Sep 1'
  }
}`,...(h=(b=s.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var S,T,k;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    icon: <MonetizationOn fontSize="large" sx={{
      color: '#615FFF'
    }} />,
    amount: '$68k',
    label: 'Monthly Rent',
    badgeText: 'Due Sep 1',
    variant: 'gradient'
  }
}`,...(k=(T=i.parameters)==null?void 0:T.docs)==null?void 0:k.source}}};var C,v,j;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    icon: <MonetizationOn fontSize="large" />,
    amount: '$68k',
    label: 'Monthly Rent',
    badgeText: 'Due Sep 1',
    variant: 'primary'
  }
}`,...(j=(v=l.parameters)==null?void 0:v.docs)==null?void 0:j.source}}};var z,D,M;c.parameters={...c.parameters,docs:{...(z=c.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    icon: <MonetizationOn fontSize="large" sx={{
      color: '#fff'
    }} />,
    amount: '$68k',
    label: 'Monthly Rent',
    badgeText: 'Due Sep 1',
    variant: 'custom',
    backgroundColor: '#22223b',
    badgeColor: '#caff70'
  }
}`,...(M=(D=c.parameters)==null?void 0:D.docs)==null?void 0:M.source}}};var R,w,B;d.parameters={...d.parameters,docs:{...(R=d.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    icon: <MonetizationOn fontSize="large" color="primary" />,
    amount: '$68k',
    label: 'Monthly Rent',
    badgeText: 'Due Sep 1',
    children: <Button variant="contained" color="primary">Pay Now</Button>
  }
}`,...(B=(w=d.parameters)==null?void 0:w.docs)==null?void 0:B.source}}};const de=["Default","Gradient","Primary","CustomBackground","WithDynamicContent"];export{c as CustomBackground,s as Default,i as Gradient,l as Primary,d as WithDynamicContent,de as __namedExportsOrder,ce as default};
