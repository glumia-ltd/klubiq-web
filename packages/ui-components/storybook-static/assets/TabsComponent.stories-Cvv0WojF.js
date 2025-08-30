import{j as e}from"./jsx-runtime-CiKstLBL.js";import{r as T}from"./index-CoXXcpNP.js";import{B as c}from"./Box-DKMDc44o.js";import{T as S,a as y}from"./Tabs-Bbfxudqz.js";import{H as v,S as x}from"./Settings-DTUQ7GvS.js";import{I as f}from"./Info-Jj9KJceR.js";import"./defaultTheme-D4_KWPKg.js";import"./generateUtilityClasses-C1n5gl2S.js";import"./styled-S1aw2zqw.js";import"./DefaultPropsProvider-CBQ9sw5y.js";import"./ButtonBase-zdw2Te-A.js";import"./TransitionGroupContext-tOqp5AMi.js";import"./useEnhancedEffect-Dze88C9b.js";import"./useForkRef-DnFApgto.js";import"./index-nA9Gvw9N.js";import"./useTheme-CSQB3z4f.js";import"./ownerWindow-CTYmPBw_.js";import"./useSlotProps-D5x7nCp1.js";import"./resolveComponentProps-DwJlmBgI.js";import"./createSvgIcon-RFZQnbNo.js";const I=({children:r,value:t,index:o,...s})=>e.jsx("div",{role:"tabpanel",hidden:t!==o,id:`simple-tabpanel-${o}`,"aria-labelledby":`simple-tab-${o}`,...s,children:t===o&&e.jsx(c,{sx:{p:3},children:r})}),j=({tabs:r,onChange:t,...o})=>{const[s,h]=T.useState(0),C=(a,n)=>{h(n),t==null||t(n)};return e.jsxs(c,{sx:{width:"100%"},children:[e.jsx(c,{sx:{borderBottom:1,borderColor:"divider"},children:e.jsx(S,{value:s,onChange:C,"aria-label":"basic tabs example",...o,children:r.map((a,n)=>e.jsx(y,{label:a.label,icon:a.icon,disabled:a.disabled,id:`simple-tab-${n}`,"aria-controls":`simple-tabpanel-${n}`},n))})}),r.map((a,n)=>e.jsx(I,{value:s,index:n,children:a.content},n))]})};j.__docgenInfo={description:"",methods:[],displayName:"TabsComponent",props:{tabs:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  label: string
  content: ReactNode
  icon?: TabProps['icon']
  disabled?: boolean
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"content",value:{name:"ReactNode",required:!0}},{key:"icon",value:{name:"TabProps['icon']",raw:"TabProps['icon']",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}}]}}],raw:`{
  label: string
  content: ReactNode
  icon?: TabProps['icon']
  disabled?: boolean
}[]`},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(index: number) => void",signature:{arguments:[{type:{name:"number"},name:"index"}],return:{name:"void"}}},description:""}},composes:["Omit"]};const L={title:"Components/TabsComponent",component:j,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{tabs:{control:"object"}}},i={args:{tabs:[{label:"Home",content:e.jsx("div",{children:"Home Content"}),icon:e.jsx(v,{})},{label:"Settings",content:e.jsx("div",{children:"Settings Content"}),icon:e.jsx(x,{})},{label:"Info",content:e.jsx("div",{children:"Info Content"}),icon:e.jsx(f,{})}]}},l={args:{tabs:[{label:"Home",content:e.jsx("div",{children:"Home Content"}),icon:e.jsx(v,{})},{label:"Settings",content:e.jsx("div",{children:"Settings Content"}),icon:e.jsx(x,{}),disabled:!0},{label:"Info",content:e.jsx("div",{children:"Info Content"}),icon:e.jsx(f,{})}]}};var d,m,p;i.parameters={...i.parameters,docs:{...(d=i.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    tabs: [{
      label: 'Home',
      content: <div>Home Content</div>,
      icon: <Home />
    }, {
      label: 'Settings',
      content: <div>Settings Content</div>,
      icon: <Settings />
    }, {
      label: 'Info',
      content: <div>Info Content</div>,
      icon: <Info />
    }]
  }
}`,...(p=(m=i.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var b,u,g;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    tabs: [{
      label: 'Home',
      content: <div>Home Content</div>,
      icon: <Home />
    }, {
      label: 'Settings',
      content: <div>Settings Content</div>,
      icon: <Settings />,
      disabled: true
    }, {
      label: 'Info',
      content: <div>Info Content</div>,
      icon: <Info />
    }]
  }
}`,...(g=(u=l.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};const M=["Basic","WithDisabledTab"];export{i as Basic,l as WithDisabledTab,M as __namedExportsOrder,L as default};
