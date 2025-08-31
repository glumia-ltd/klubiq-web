import{j as t}from"./jsx-runtime-CiKstLBL.js";import{r as C}from"./index-CoXXcpNP.js";import{B as D}from"./Box-DKMDc44o.js";import{T as I,M as P,a as V}from"./TextField-CmrU2qK1.js";import"./defaultTheme-D4_KWPKg.js";import"./generateUtilityClasses-C1n5gl2S.js";import"./styled-S1aw2zqw.js";import"./DefaultPropsProvider-CBQ9sw5y.js";import"./useEnhancedEffect-Dze88C9b.js";import"./useForkRef-DnFApgto.js";import"./ButtonBase-zdw2Te-A.js";import"./TransitionGroupContext-tOqp5AMi.js";import"./Portal-CQZLz37p.js";import"./index-S3NOQ7Fp.js";import"./Grow-t2SZWvSP.js";import"./useTheme-CSQB3z4f.js";import"./ownerWindow-CTYmPBw_.js";import"./useSlotProps-D5x7nCp1.js";import"./resolveComponentProps-DwJlmBgI.js";import"./GlobalStyles-Cm6rF4v4.js";import"./index-nA9Gvw9N.js";import"./Paper-BmMWkbbD.js";import"./useControlled-ivOLG2Q4.js";import"./createSvgIcon-RFZQnbNo.js";const p=({options:a,value:r,onChange:n,label:F="Filter",placeholder:j="Select an option",disabled:q=!1})=>{const[c,d]=C.useState(null),E=e=>{d(e.currentTarget)},m=()=>{d(null)},A=e=>{n(e),m()},i=a.find(e=>e.value===r);return t.jsxs(D,{children:[t.jsx(I,{label:F,value:(i==null?void 0:i.label)||"",placeholder:j,disabled:q,onClick:E,InputProps:{readOnly:!0},fullWidth:!0}),t.jsx(P,{anchorEl:c,open:!!c,onClose:m,PaperProps:{sx:{width:"100%",maxWidth:"360px"}},children:a.map(e=>t.jsx(V,{selected:e.value===r,onClick:()=>A(e.value),children:e.label},e.value))})]})};p.__docgenInfo={description:"",methods:[],displayName:"Filter",props:{options:{required:!0,tsType:{name:"Array",elements:[{name:"FilterOption"}],raw:"FilterOption[]"},description:""},value:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},label:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Filter'",computed:!1}},placeholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Select an option'",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const le={title:"Components/Filter",component:p,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{label:{control:"text"},placeholder:{control:"text"},disabled:{control:"boolean"}}},_=[{value:"all",label:"All"},{value:"active",label:"Active"},{value:"inactive",label:"Inactive"},{value:"pending",label:"Pending"}],u=a=>{const[r,n]=C.useState("all");return t.jsx(p,{...a,value:r,onChange:n,options:_})},l={render:u,args:{label:"Status",placeholder:"Select status"}},s={render:u,args:{label:"Status",placeholder:"Select status",disabled:!0}},o={render:u,args:{label:"Filter by Status",placeholder:"Choose a status"}};var b,g,h;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: Template,
  args: {
    label: 'Status',
    placeholder: 'Select status'
  }
}`,...(h=(g=l.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var f,v,S;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: Template,
  args: {
    label: 'Status',
    placeholder: 'Select status',
    disabled: true
  }
}`,...(S=(v=s.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};var x,y,T;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: Template,
  args: {
    label: 'Filter by Status',
    placeholder: 'Choose a status'
  }
}`,...(T=(y=o.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};const se=["Default","Disabled","CustomLabel"];export{o as CustomLabel,l as Default,s as Disabled,se as __namedExportsOrder,le as default};
