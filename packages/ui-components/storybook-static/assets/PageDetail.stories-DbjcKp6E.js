import{j as e}from"./jsx-runtime-CiKstLBL.js";import{r as de}from"./index-CoXXcpNP.js";import{D as we}from"./DynamicAvatar-B4IGh-oz.js";import{I as Te,H as Se,C as P,A as De}from"./InfoCard-BpZ_0mQO.js";import{D as ce,a as _}from"./DocumentList-Dv2ii8gU.js";import{u as me}from"./useTheme-CSQB3z4f.js";import{u as pe}from"./useMediaQuery-B5sbL9-V.js";import{P as ue}from"./Paper-BmMWkbbD.js";import{B as u}from"./Box-DKMDc44o.js";import{S as m}from"./Stack-FNVfWfbB.js";import{_ as Ie,a as D,w as V,t as he}from"./defaultTheme-D4_KWPKg.js";import{g as ke,a as Me,c as Pe}from"./generateUtilityClasses-C1n5gl2S.js";import{s as Ae,c as Le}from"./styled-S1aw2zqw.js";import{u as Re}from"./DefaultPropsProvider-CBQ9sw5y.js";import{a as ze}from"./colorManipulator-RQwcCUM_.js";import{C as W}from"./Card-CQH3tkHk.js";import{T as d}from"./Typography-DXOq44QA.js";import{c as A}from"./createSvgIcon-RFZQnbNo.js";import{C as fe}from"./Chip-CWSHvOzM.js";import{I as _e}from"./IconButton-blHZ9kTr.js";import{T as Ve,a as We}from"./Tabs-Bbfxudqz.js";import{C as qe}from"./CheckCircle-DvMzWTQp.js";import"./AvatarGroup-GjCL-mir.js";import"./useSlot-BmQqmJkm.js";import"./resolveComponentProps-DwJlmBgI.js";import"./useForkRef-DnFApgto.js";import"./Tooltip-Dj0YbCQT.js";import"./index-nA9Gvw9N.js";import"./Grow-t2SZWvSP.js";import"./TransitionGroupContext-tOqp5AMi.js";import"./useEnhancedEffect-Dze88C9b.js";import"./index-S3NOQ7Fp.js";import"./useControlled-ivOLG2Q4.js";import"./Portal-CQZLz37p.js";import"./useSlotProps-D5x7nCp1.js";import"./CardContent-CsnHQNr3.js";import"./getThemeProps-V7nEOQ_H.js";import"./ButtonBase-zdw2Te-A.js";import"./ownerWindow-CTYmPBw_.js";function Ne(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function $e(t){return parseFloat(t)}function Be(t){return ke("MuiSkeleton",t)}Me("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const Oe=["animation","className","component","height","style","variant","width"];let I=t=>t,q,N,$,B;const Ue=t=>{const{classes:a,variant:n,animation:o,hasChildren:r,width:c,height:s}=t;return Le({root:["root",n,o,r&&"withChildren",r&&!c&&"fitContent",r&&!s&&"heightAuto"]},Be,a)},He=he(q||(q=I`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),Fe=he(N||(N=I`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),Ee=Ae("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,a)=>{const{ownerState:n}=t;return[a.root,a[n.variant],n.animation!==!1&&a[n.animation],n.hasChildren&&a.withChildren,n.hasChildren&&!n.width&&a.fitContent,n.hasChildren&&!n.height&&a.heightAuto]}})(({theme:t,ownerState:a})=>{const n=Ne(t.shape.borderRadius)||"px",o=$e(t.shape.borderRadius);return D({display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:ze(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em"},a.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${o}${n}/${Math.round(o/.6*10)/10}${n}`,"&:empty:before":{content:'"\\00a0"'}},a.variant==="circular"&&{borderRadius:"50%"},a.variant==="rounded"&&{borderRadius:(t.vars||t).shape.borderRadius},a.hasChildren&&{"& > *":{visibility:"hidden"}},a.hasChildren&&!a.width&&{maxWidth:"fit-content"},a.hasChildren&&!a.height&&{height:"auto"})},({ownerState:t})=>t.animation==="pulse"&&V($||($=I`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),He),({ownerState:t,theme:a})=>t.animation==="wave"&&V(B||(B=I`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 2s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),Fe,(a.vars||a).palette.action.hover)),b=de.forwardRef(function(a,n){const o=Re({props:a,name:"MuiSkeleton"}),{animation:r="pulse",className:c,component:s="span",height:h,style:l,variant:k="text",width:g}=o,y=Ie(o,Oe),v=D({},o,{animation:r,component:s,variant:k,hasChildren:!!y.children}),x=Ue(v);return e.jsx(Ee,D({as:s,ref:n,className:Pe(x.root,c),ownerState:v},y,{style:D({width:g,height:h},l)}))}),Xe=A(e.jsx("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close"),Je=A(e.jsx("path",{d:"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 14H4V8l8 5 8-5zm-8-7L4 6h16z"}),"MailOutline"),Ke=A(e.jsx("path",{d:"M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02z"}),"Phone"),ge=({showTabs:t=!0,displayMode:a="modal",position:n="right"})=>{const o=me(),c={width:pe(o.breakpoints.down("sm"))?"100%":400,height:"100vh",position:"fixed",top:0,[n]:0,zIndex:o.zIndex.drawer+1},s={width:"100%",border:`1px solid ${o.palette.divider}`,borderRadius:2};return e.jsx(ue,{elevation:a==="modal"?3:0,sx:{...a==="modal"?c:s,backgroundColor:o.palette.mode==="light"?o.palette.grey[50]:o.palette.background.default,overflow:"hidden"},children:e.jsx(u,{sx:{height:"100%",overflowY:"auto",p:2},children:e.jsxs(m,{spacing:2,children:[e.jsx(b,{variant:"rounded",height:160}),e.jsx(b,{variant:"rounded",height:150}),e.jsx(b,{variant:"rounded",height:150}),e.jsx(b,{variant:"rounded",height:200})]})})})};ge.__docgenInfo={description:"",methods:[],displayName:"PageDetailSkeleton",props:{showTabs:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},displayMode:{required:!1,tsType:{name:"union",raw:"'container' | 'modal'",elements:[{name:"literal",value:"'container'"},{name:"literal",value:"'modal'"}]},description:"",defaultValue:{value:"'modal'",computed:!1}},position:{required:!1,tsType:{name:"union",raw:"'left' | 'right'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"}]},description:"",defaultValue:{value:"'right'",computed:!1}}}};const Ye=t=>{const{children:a,value:n,index:o,...r}=t;return e.jsx("div",{role:"tabpanel",hidden:n!==o,id:`simple-tabpanel-${o}`,"aria-labelledby":`simple-tab-${o}`,...r,children:n===o&&e.jsx(u,{children:a})})},ye=({headerData:t,detailSections:a,showTabs:n=!0,tabs:o,onClose:r,loading:c=!1,displayMode:s="modal",position:h="right"})=>{const l=me(),k=pe(l.breakpoints.down("sm")),[g,y]=de.useState(0),v=(i,M)=>{y(M)};if(c)return e.jsx(ge,{showTabs:n,displayMode:s,position:h});const x=e.jsx(m,{spacing:2,children:a==null?void 0:a.map(i=>{switch(i.type){case"infoCard":return e.jsx(Te,{title:i.title,items:i.items,elevation:1},i.id);case"documentList":return e.jsx(ce,{title:i.title,items:i.items,elevation:1},i.id);case"custom":return e.jsx(W,{elevation:1,children:i.content},i.id);default:return null}})}),z=o||[{label:"Details",content:x},{label:"Chat",content:e.jsx(d,{children:"Chat functionality is not yet implemented."})}],Ce={width:k?"100%":400,height:"100vh",position:"fixed",top:0,[h]:0,zIndex:l.zIndex.drawer+1,borderRadius:2},je={width:"100%",height:"auto",border:`1px solid ${l.palette.divider}`,borderRadius:2};return e.jsx(ue,{elevation:s==="modal"?3:0,sx:{...s==="modal"?Ce:je,backgroundColor:s==="modal"?l.palette.mode==="light"?l.palette.grey[50]:l.palette.background.default:"transparent",overflow:"hidden"},children:e.jsx(u,{sx:{height:"100%",overflowY:"auto",p:2},children:e.jsxs(m,{spacing:2,children:[e.jsxs(W,{elevation:1,children:[e.jsx(u,{sx:{p:2},children:e.jsxs(m,{direction:"row",spacing:1,alignItems:"flex-start",children:[e.jsx(we,{items:[t.avatar],showName:!1,size:"large"}),e.jsxs(m,{flex:1,spacing:.5,children:[t.name&&e.jsx(d,{variant:"h6",fontWeight:600,sx:{textTransform:"capitalize"},children:t.name}),t.companyName&&e.jsx(d,{variant:"h6",children:t.companyName}),t.email&&e.jsxs(m,{direction:"row",alignItems:"center",spacing:1,children:[e.jsx(Je,{fontSize:"small"}),e.jsx(d,{variant:"body2",sx:{wordBreak:"break-word"},children:t.email})]}),t.phone&&e.jsxs(m,{direction:"row",alignItems:"center",spacing:1,children:[e.jsx(Ke,{fontSize:"small"}),e.jsx(d,{variant:"body2",children:t.phone})]})]}),e.jsx(fe,{label:t.status,color:t.status==="Active"?"primary":"default",size:"small",sx:{backgroundColor:"#e2eaf2",color:"#005CFF"}}),s==="modal"&&r&&e.jsx(_e,{onClick:r,sx:{position:"absolute",top:8,right:8},children:e.jsx(Xe,{})})]})}),n&&e.jsx(u,{children:e.jsx(Ve,{value:g,onChange:v,variant:"fullWidth",children:z.map(i=>e.jsx(We,{label:i.label},i.label))})})]}),n?z.map((i,M)=>e.jsx(Ye,{value:g,index:M,children:i.content},i.label)):x]})})})};ye.__docgenInfo={description:"",methods:[],displayName:"PageDetail",props:{variant:{required:!0,tsType:{name:"union",raw:"'tenant-detail' | 'lease-detail' | 'property-detail'",elements:[{name:"literal",value:"'tenant-detail'"},{name:"literal",value:"'lease-detail'"},{name:"literal",value:"'property-detail'"}]},description:""},headerData:{required:!0,tsType:{name:"PageDetailHeaderData"},description:""},detailSections:{required:!1,tsType:{name:"Array",elements:[{name:"union",raw:"InfoCardSection | DocumentListSection | CustomSection",elements:[{name:"InfoCardSection"},{name:"DocumentListSection"},{name:"CustomSection"}]}],raw:"DetailSection[]"},description:""},showTabs:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},tabs:{required:!1,tsType:{name:"Array",elements:[{name:"TabInfo"}],raw:"TabInfo[]"},description:""},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},loading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},displayMode:{required:!1,tsType:{name:"union",raw:"'container' | 'modal'",elements:[{name:"literal",value:"'container'"},{name:"literal",value:"'modal'"}]},description:"",defaultValue:{value:"'modal'",computed:!1}},position:{required:!1,tsType:{name:"union",raw:"'left' | 'right'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"}]},description:"",defaultValue:{value:"'right'",computed:!1}}}};const Wt={title:"Components/PageDetail",component:ye,tags:["autodocs"]},L={avatar:{id:"1",name:"Ngozi Nwosu",image:"https://i.pravatar.cc/150?img=1"},name:"Ngozi Nwosu",email:"ngozi.n@example.com",phone:"+234 903 456 7890",status:"Active"},ve=[{id:1,icon:e.jsx(Se,{}),label:"Oakwood Residences",value:e.jsx(d,{variant:"body1",fontWeight:500,children:"Unit 7B"})}],xe=[{id:1,icon:e.jsx(P,{}),label:"Start Date",value:"Apr 1, 2023"},{id:2,icon:e.jsx(P,{}),label:"End Date",value:"Mar 31, 2024"},{id:3,icon:e.jsx(De,{}),label:"Rent",value:"$1,850/month"}],be=[{id:1,icon:e.jsx(qe,{}),label:"Status",value:e.jsx(fe,{label:"Paid",color:"success",size:"small"})},{id:2,icon:e.jsx(P,{}),label:"Last Payment",value:"Aug 1, 2023"}],R=[{id:1,icon:e.jsx(_,{}),name:"Rental Application Form",addedDate:"Jan 10, 2023",onDownload:()=>alert("Downloading Rental Application Form")},{id:2,icon:e.jsx(_,{}),name:"Credit Report",addedDate:"Jan 15, 2023",onDownload:()=>alert("Downloading Credit Report")}],p={args:{displayMode:"modal",variant:"tenant-detail",headerData:L,detailSections:[{id:"propInfo",type:"infoCard",title:"Property Information",items:ve},{id:"leaseInfo",type:"infoCard",title:"Lease Information",items:xe},{id:"paymentStatus",type:"infoCard",title:"Payment Status",items:be},{id:"appDocs",type:"documentList",title:"Application Documents",items:R}],onClose:()=>alert("Close clicked")}},C={args:{...p.args,onClose:void 0}},f={args:{...p.args,displayMode:"container",onClose:void 0},decorators:[t=>e.jsx(u,{sx:{maxWidth:600,margin:"auto",p:2},children:e.jsx(t,{})})]},j={args:{displayMode:"modal",variant:"tenant-detail",headerData:L,detailSections:[{id:"propInfo",type:"infoCard",title:"Property Information",items:ve},{id:"leaseInfo",type:"infoCard",title:"Lease Information",items:xe},{id:"paymentStatus",type:"infoCard",title:"Payment Status",items:be},{id:"appDocs",type:"documentList",title:"Application Documents",items:R}],showTabs:!1,onClose:()=>alert("Close clicked")}},w={args:{displayMode:"modal",variant:"tenant-detail",headerData:L,showTabs:!0,tabs:[{label:"Overview",content:e.jsx(d,{children:"This is a custom overview tab."})},{label:"Documents",content:e.jsx(ce,{title:"Application Documents",items:R})},{label:"History",content:e.jsx(d,{children:"This is the history tab."})}],onClose:()=>alert("Close clicked")}},T={args:{...p.args,displayMode:"modal",loading:!0}},S={args:{...f.args,loading:!0}};var O,U,H;p.parameters={...p.parameters,docs:{...(O=p.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    displayMode: 'modal',
    variant: 'tenant-detail',
    headerData,
    detailSections: [{
      id: 'propInfo',
      type: 'infoCard',
      title: 'Property Information',
      items: propertyInfo
    }, {
      id: 'leaseInfo',
      type: 'infoCard',
      title: 'Lease Information',
      items: leaseInfo
    }, {
      id: 'paymentStatus',
      type: 'infoCard',
      title: 'Payment Status',
      items: paymentStatus
    }, {
      id: 'appDocs',
      type: 'documentList',
      title: 'Application Documents',
      items: applicationDocuments
    }],
    onClose: () => alert('Close clicked')
  }
}`,...(H=(U=p.parameters)==null?void 0:U.docs)==null?void 0:H.source}}};var F,E,X;C.parameters={...C.parameters,docs:{...(F=C.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    ...TenantDetail.args,
    onClose: undefined
  }
}`,...(X=(E=C.parameters)==null?void 0:E.docs)==null?void 0:X.source}}};var J,K,Y;f.parameters={...f.parameters,docs:{...(J=f.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    ...TenantDetail.args,
    displayMode: 'container',
    onClose: undefined
  },
  decorators: [Story => <Box sx={{
    maxWidth: 600,
    margin: 'auto',
    p: 2
  }}>
                <Story />
            </Box>]
}`,...(Y=(K=f.parameters)==null?void 0:K.docs)==null?void 0:Y.source}}};var Q,G,Z;j.parameters={...j.parameters,docs:{...(Q=j.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    displayMode: 'modal',
    variant: 'tenant-detail',
    headerData,
    detailSections: [{
      id: 'propInfo',
      type: 'infoCard',
      title: 'Property Information',
      items: propertyInfo
    }, {
      id: 'leaseInfo',
      type: 'infoCard',
      title: 'Lease Information',
      items: leaseInfo
    }, {
      id: 'paymentStatus',
      type: 'infoCard',
      title: 'Payment Status',
      items: paymentStatus
    }, {
      id: 'appDocs',
      type: 'documentList',
      title: 'Application Documents',
      items: applicationDocuments
    }],
    showTabs: false,
    onClose: () => alert('Close clicked')
  }
}`,...(Z=(G=j.parameters)==null?void 0:G.docs)==null?void 0:Z.source}}};var ee,te,ae;w.parameters={...w.parameters,docs:{...(ee=w.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    displayMode: 'modal',
    variant: 'tenant-detail',
    headerData,
    showTabs: true,
    tabs: [{
      label: "Overview",
      content: <Typography>This is a custom overview tab.</Typography>
    }, {
      label: "Documents",
      content: <DocumentList title="Application Documents" items={applicationDocuments} />
    }, {
      label: "History",
      content: <Typography>This is the history tab.</Typography>
    }],
    onClose: () => alert('Close clicked')
  }
}`,...(ae=(te=w.parameters)==null?void 0:te.docs)==null?void 0:ae.source}}};var ne,oe,ie;T.parameters={...T.parameters,docs:{...(ne=T.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    ...TenantDetail.args,
    displayMode: 'modal',
    loading: true
  }
}`,...(ie=(oe=T.parameters)==null?void 0:oe.docs)==null?void 0:ie.source}}};var se,re,le;S.parameters={...S.parameters,docs:{...(se=S.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    ...ContainerMode.args,
    loading: true
  }
}`,...(le=(re=S.parameters)==null?void 0:re.docs)==null?void 0:le.source}}};const qt=["TenantDetail","WithoutCloseButton","ContainerMode","WithoutTabs","WithCustomTabs","Loading","LoadingContainer"];export{f as ContainerMode,T as Loading,S as LoadingContainer,p as TenantDetail,w as WithCustomTabs,C as WithoutCloseButton,j as WithoutTabs,qt as __namedExportsOrder,Wt as default};
