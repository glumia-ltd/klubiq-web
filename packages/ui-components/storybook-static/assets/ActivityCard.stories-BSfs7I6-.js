import{j as e}from"./jsx-runtime-CiKstLBL.js";import{u as $}from"./useTheme-CSQB3z4f.js";import{C as v}from"./Card-CQH3tkHk.js";import{S as d}from"./Stack-FNVfWfbB.js";import{B as n}from"./Box-DKMDc44o.js";import{T as a}from"./Typography-DXOq44QA.js";import{M as F}from"./MonetizationOn-DAfRAihQ.js";import{c as z}from"./createSvgIcon-RFZQnbNo.js";import"./index-CoXXcpNP.js";import"./defaultTheme-D4_KWPKg.js";import"./generateUtilityClasses-C1n5gl2S.js";import"./styled-S1aw2zqw.js";import"./DefaultPropsProvider-CBQ9sw5y.js";import"./Paper-BmMWkbbD.js";import"./getThemeProps-V7nEOQ_H.js";const H=({title:r="Recent Activity",subtitle:o,items:c,variant:_="cards",renderItem:f,viewAllLink:N,onViewAllClick:y,maxItems:l=5,sx:Y={}})=>{const s=$(),E={width:"100%",p:{xs:2,sm:3},borderRadius:2,backgroundColor:s.palette.background.paper,boxShadow:s.shadows[1],...Y},O=t=>e.jsx(v,{elevation:0,sx:{p:2,mb:2,borderRadius:2,backgroundColor:s.palette.background.default,cursor:"pointer",transition:"all 0.2s ease-in-out","&:hover":{transform:"translateY(-2px)",boxShadow:s.shadows[2]},"&:last-child":{mb:0}},children:e.jsxs(d,{direction:"row",spacing:2,alignItems:"center",children:[t.icon&&e.jsx(n,{sx:{width:40,height:40,borderRadius:1,display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:s.palette.primary.light,color:s.palette.primary.main},children:t.icon}),e.jsxs(n,{sx:{flex:1},children:[e.jsx(a,{variant:"subtitle1",fontWeight:600,children:t.title}),t.subtitle&&e.jsx(a,{variant:"body2",color:"text.secondary",children:t.subtitle})]}),t.timestamp&&e.jsx(a,{variant:"caption",color:"text.secondary",children:t.timestamp})]})},t.id),K=t=>e.jsx(n,{sx:{p:2,mb:2,borderRadius:1,backgroundColor:s.palette.mode==="light"?"grey.100":"grey.900",borderLeft:`4px solid ${s.palette[t.variant||"primary"].main}`,"&:last-child":{mb:0}},children:e.jsxs(d,{direction:"row",spacing:2,alignItems:"center",children:[t.icon&&e.jsx(n,{sx:{color:s.palette[t.variant||"primary"].main},children:t.icon}),e.jsxs(n,{sx:{flex:1},children:[e.jsx(a,{variant:"body1",fontWeight:500,children:t.title}),t.subtitle&&e.jsx(a,{variant:"body2",color:"text.secondary",children:t.subtitle})]}),t.timestamp&&e.jsx(a,{variant:"caption",color:"text.secondary",children:t.timestamp})]})},t.id),U=()=>{if(f)return c.slice(0,l).map(t=>f(t));switch(_){case"alerts":return c.slice(0,l).map(K);case"custom":return c.slice(0,l).map(t=>t.content||null);default:return c.slice(0,l).map(O)}};return e.jsx(v,{sx:E,children:e.jsxs(d,{spacing:3,children:[e.jsxs(d,{direction:"row",justifyContent:"space-between",alignItems:"center",spacing:2,children:[e.jsxs(n,{children:[e.jsx(a,{variant:"h5",fontWeight:600,gutterBottom:!!o,children:r}),o&&e.jsx(a,{variant:"body2",color:"text.secondary",children:o})]}),(N||y)&&e.jsx(a,{variant:"body2",color:"primary",sx:{cursor:"pointer","&:hover":{textDecoration:"underline"}},onClick:y,children:"View All"})]}),e.jsx(n,{children:U()})]})})};H.__docgenInfo={description:"",methods:[],displayName:"ActivityCard",props:{title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Recent Activity'",computed:!1}},subtitle:{required:!1,tsType:{name:"string"},description:""},items:{required:!0,tsType:{name:"Array",elements:[{name:"ActivityItem"}],raw:"ActivityItem[]"},description:""},variant:{required:!1,tsType:{name:"union",raw:"'cards' | 'alerts' | 'custom'",elements:[{name:"literal",value:"'cards'"},{name:"literal",value:"'alerts'"},{name:"literal",value:"'custom'"}]},description:"",defaultValue:{value:"'cards'",computed:!1}},renderItem:{required:!1,tsType:{name:"signature",type:"function",raw:"(item: ActivityItem) => ReactNode",signature:{arguments:[{type:{name:"ActivityItem"},name:"item"}],return:{name:"ReactNode"}}},description:""},viewAllLink:{required:!1,tsType:{name:"string"},description:""},onViewAllClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},maxItems:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"5",computed:!1}},sx:{required:!1,tsType:{name:"SxProps",elements:[{name:"Theme"}],raw:"SxProps<Theme>"},description:"",defaultValue:{value:"{}",computed:!1}}}};const G=z(e.jsx("path",{d:"m22.7 19-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4"}),"Build"),J=z(e.jsx("path",{d:"M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-2 12H6v-2h12zm0-3H6V9h12zm0-3H6V6h12z"}),"Message"),ue={title:"Components/ActivityCard",component:H,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"A dynamic activity card component that can display various types of content in different formats."}}}},i=[{id:1,title:"Rent Payment Processed",subtitle:"₦450,000",timestamp:"Aug 1, 2023",icon:e.jsx(F,{})},{id:2,title:"Maintenance Request Updated",subtitle:"Kitchen faucet",timestamp:"Aug 18, 2023",icon:e.jsx(G,{})},{id:3,title:"Message from Property Manager",subtitle:"Pool maintenance schedule",timestamp:"Aug 15, 2023",icon:e.jsx(J,{})}],Q=i.map((r,o)=>({...r,variant:["success","warning","info"][o]})),m={args:{items:i}},p={args:{items:Q,variant:"alerts"}},u={args:{items:i.map(r=>({...r,content:e.jsxs("div",{style:{padding:"16px",border:"1px solid #ddd",marginBottom:"8px"},children:[e.jsx("h4",{children:r.title}),e.jsx("p",{children:r.subtitle}),e.jsx("small",{children:r.timestamp})]},r.id)})),variant:"custom"}},h={args:{items:i,onViewAllClick:()=>console.log("View all clicked")}},g={args:{items:i,subtitle:"Your recent transactions and updates"}},x={args:{items:i,maxItems:2}};var b,j,w;m.parameters={...m.parameters,docs:{...(b=m.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    items: defaultItems
  }
}`,...(w=(j=m.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};var A,C,I;p.parameters={...p.parameters,docs:{...(A=p.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    items: alertItems,
    variant: 'alerts'
  }
}`,...(I=(C=p.parameters)==null?void 0:C.docs)==null?void 0:I.source}}};var S,k,T;u.parameters={...u.parameters,docs:{...(S=u.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    items: defaultItems.map(item => ({
      ...item,
      content: <div key={item.id} style={{
        padding: '16px',
        border: '1px solid #ddd',
        marginBottom: '8px'
      }}>
          <h4>{item.title}</h4>
          <p>{item.subtitle}</p>
          <small>{item.timestamp}</small>
        </div>
    })),
    variant: 'custom'
  }
}`,...(T=(k=u.parameters)==null?void 0:k.docs)==null?void 0:T.source}}};var V,R,W;h.parameters={...h.parameters,docs:{...(V=h.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    items: defaultItems,
    onViewAllClick: () => console.log('View all clicked')
  }
}`,...(W=(R=h.parameters)==null?void 0:R.docs)==null?void 0:W.source}}};var q,M,B;g.parameters={...g.parameters,docs:{...(q=g.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    items: defaultItems,
    subtitle: 'Your recent transactions and updates'
  }
}`,...(B=(M=g.parameters)==null?void 0:M.docs)==null?void 0:B.source}}};var L,P,D;x.parameters={...x.parameters,docs:{...(L=x.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    items: defaultItems,
    maxItems: 2
  }
}`,...(D=(P=x.parameters)==null?void 0:P.docs)==null?void 0:D.source}}};const he=["Default","WithAlerts","WithCustomContent","WithViewAll","WithSubtitle","LimitedItems"];export{m as Default,x as LimitedItems,p as WithAlerts,u as WithCustomContent,g as WithSubtitle,h as WithViewAll,he as __namedExportsOrder,ue as default};
