import{j as e}from"./jsx-runtime-CiKstLBL.js";import{u as _}from"./useTheme-CSQB3z4f.js";import{B as y}from"./Box-DKMDc44o.js";import{S as s}from"./Stack-FNVfWfbB.js";import{T as x}from"./Typography-DXOq44QA.js";import{I as h}from"./IconButton-blHZ9kTr.js";import{c as V}from"./createSvgIcon-RFZQnbNo.js";import{S as F,H as m}from"./Settings-DTUQ7GvS.js";import{B as z}from"./Button-9rKXOvmp.js";import{C as W}from"./Chip-CWSHvOzM.js";import"./index-CoXXcpNP.js";import"./defaultTheme-D4_KWPKg.js";import"./generateUtilityClasses-C1n5gl2S.js";import"./styled-S1aw2zqw.js";import"./getThemeProps-V7nEOQ_H.js";import"./DefaultPropsProvider-CBQ9sw5y.js";import"./ButtonBase-zdw2Te-A.js";import"./TransitionGroupContext-tOqp5AMi.js";import"./useEnhancedEffect-Dze88C9b.js";import"./useForkRef-DnFApgto.js";const L=V(e.jsx("path",{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5"}),"LocationOn"),U=V(e.jsx("path",{d:"M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2m6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1z"}),"Notifications"),G=(r,t)=>{const a={width:"100%",padding:{xs:t.spacing(2),sm:t.spacing(3),md:t.spacing(4)},borderRadius:t.shape.borderRadius};switch(r){case"compact":return{...a,padding:{xs:t.spacing(1.5),sm:t.spacing(2),md:t.spacing(2.5)}};case"detailed":return{...a,padding:{xs:t.spacing(2.5),sm:t.spacing(4),md:t.spacing(5)}};case"custom":return a;default:return a}},q=({title:r,subtitle:t,rightContent:a,variant:M="default",actions:u,icon:g,backgroundColor:E,sx:Y={}})=>{const o=_();return e.jsx(y,{sx:{...G(M,o),backgroundColor:E||o.palette.background.paper,color:o.palette.text.primary,...Y},children:e.jsxs(s,{direction:{xs:"column",sm:"row"},justifyContent:"space-between",alignItems:{xs:"flex-start",sm:"center"},spacing:2,children:[e.jsxs(s,{direction:"row",spacing:2,alignItems:"center",flex:1,children:[g&&e.jsx(y,{sx:{display:"flex",alignItems:"center",color:o.palette.primary.main},children:g}),e.jsxs(s,{spacing:.5,flex:1,children:[typeof r=="string"?e.jsx(x,{variant:"h4",sx:{fontSize:{xs:"1.5rem",sm:"1.75rem",md:"2rem"},fontWeight:600},children:r}):r,t&&(typeof t=="string"?e.jsx(x,{variant:"subtitle1",color:"text.secondary",sx:{fontSize:{xs:"0.875rem",sm:"1rem"}},children:t}):t)]})]}),(a||u)&&e.jsxs(s,{direction:"row",spacing:2,alignItems:"center",sx:{width:{xs:"100%",sm:"auto"},justifyContent:{xs:"flex-start",sm:"flex-end"}},children:[a,u&&e.jsx(s,{direction:"row",spacing:1,children:u})]})]})})};q.__docgenInfo={description:`PageHeader is a versatile component for creating page headers with various layouts and styles.
It supports different variants, custom content, and responsive design.`,methods:[],displayName:"PageHeader",props:{title:{required:!0,tsType:{name:"union",raw:"string | ReactNode",elements:[{name:"string"},{name:"ReactNode"}]},description:"The main title of the header. Can be a string or a custom React node"},subtitle:{required:!1,tsType:{name:"union",raw:"string | ReactNode",elements:[{name:"string"},{name:"ReactNode"}]},description:"Optional subtitle text or component"},rightContent:{required:!1,tsType:{name:"ReactNode"},description:"Optional content to be displayed on the right side"},variant:{required:!1,tsType:{name:"union",raw:"'default' | 'compact' | 'detailed' | 'custom'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'compact'"},{name:"literal",value:"'detailed'"},{name:"literal",value:"'custom'"}]},description:"The style variant of the header",defaultValue:{value:"'default'",computed:!1}},actions:{required:!1,tsType:{name:"ReactNode"},description:"Optional action buttons or components to be displayed after rightContent"},icon:{required:!1,tsType:{name:"ReactNode"},description:"Optional icon to be displayed before the title"},backgroundColor:{required:!1,tsType:{name:"string"},description:"Optional background color override"},sx:{required:!1,tsType:{name:"SxProps",elements:[{name:"Theme"}],raw:"SxProps<Theme>"},description:"Optional style overrides",defaultValue:{value:"{}",computed:!1}}}};const ge={title:"Components/PageHeader",component:q,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:`
PageHeader is a versatile component for creating page headers with various layouts and styles.
It supports different variants, custom content, and is fully responsive.

## Features
- Multiple style variants (default, compact, detailed, custom)
- Supports icons, actions, and custom content
- Fully responsive layout
- Theme-aware styling
- Customizable through Material-UI's theme system
        `}}},argTypes:{variant:{control:"select",options:["default","compact","detailed","custom"],description:"The style variant of the header",table:{defaultValue:{summary:"default"}}},backgroundColor:{control:"color",description:"Custom background color"},title:{control:"text",description:"Main header title"},subtitle:{control:"text",description:"Optional subtitle text"}}},n={args:{title:"Welcome back, Adebayo!",subtitle:"Your next rent payment is due in 12 days"},parameters:{docs:{description:{story:"Basic usage with title and subtitle."}}}},i={args:{title:"Welcome back, Adebayo!",subtitle:"Your next rent payment is due in 12 days",icon:e.jsx(m,{fontSize:"large"}),actions:e.jsxs(e.Fragment,{children:[e.jsx(h,{children:e.jsx(U,{})}),e.jsx(h,{children:e.jsx(F,{})})]})},parameters:{docs:{description:{story:"Header with an icon and action buttons."}}}},c={args:{title:"Dashboard",variant:"compact",icon:e.jsx(m,{})},parameters:{docs:{description:{story:"Compact variant with reduced padding, suitable for dense UIs."}}}},d={args:{title:"Property Overview",subtitle:"Manage your properties and tenants",variant:"detailed",rightContent:e.jsx(W,{icon:e.jsx(L,{}),label:"Victoria Garden City",color:"primary",variant:"outlined"}),actions:e.jsx(z,{variant:"contained",color:"primary",children:"Add Property"})},parameters:{docs:{description:{story:"Detailed variant with extra padding and custom content."}}}},l={args:{variant:"custom",title:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(m,{color:"primary"}),e.jsx("span",{children:"Custom Header"})]}),subtitle:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[e.jsx(W,{label:"Active",color:"success",size:"small"}),e.jsx("span",{children:"Custom subtitle with status"})]})},parameters:{docs:{description:{story:"Custom variant with complex title and subtitle components."}}}},p={args:{title:"Dark Theme Header",subtitle:"With custom background color",icon:e.jsx(m,{fontSize:"large"}),backgroundColor:"#1a1a1a",sx:{color:"white"},actions:e.jsx(z,{variant:"contained",color:"primary",children:"Action"})},parameters:{docs:{description:{story:"Example of the header with a dark theme and custom styling."}}}};var f,v,b;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    title: 'Welcome back, Adebayo!',
    subtitle: 'Your next rent payment is due in 12 days'
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic usage with title and subtitle.'
      }
    }
  }
}`,...(b=(v=n.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};var C,j,w;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    title: 'Welcome back, Adebayo!',
    subtitle: 'Your next rent payment is due in 12 days',
    icon: <Home fontSize="large" />,
    actions: <>
        <IconButton>
          <Notifications />
        </IconButton>
        <IconButton>
          <Settings />
        </IconButton>
      </>
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with an icon and action buttons.'
      }
    }
  }
}`,...(w=(j=i.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};var I,S,T;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    title: 'Dashboard',
    variant: 'compact',
    icon: <Home />
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact variant with reduced padding, suitable for dense UIs.'
      }
    }
  }
}`,...(T=(S=c.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};var k,H,B;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    title: 'Property Overview',
    subtitle: 'Manage your properties and tenants',
    variant: 'detailed',
    rightContent: <Chip icon={<LocationOn />} label="Victoria Garden City" color="primary" variant="outlined" />,
    actions: <Button variant="contained" color="primary">
        Add Property
      </Button>
  },
  parameters: {
    docs: {
      description: {
        story: 'Detailed variant with extra padding and custom content.'
      }
    }
  }
}`,...(B=(H=d.parameters)==null?void 0:H.docs)==null?void 0:B.source}}};var A,O,D;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    variant: 'custom',
    title: <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
        <Home color="primary" />
        <span>Custom Header</span>
      </div>,
    subtitle: <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    }}>
        <Chip label="Active" color="success" size="small" />
        <span>Custom subtitle with status</span>
      </div>
  },
  parameters: {
    docs: {
      description: {
        story: 'Custom variant with complex title and subtitle components.'
      }
    }
  }
}`,...(D=(O=l.parameters)==null?void 0:O.docs)==null?void 0:D.source}}};var N,P,R;p.parameters={...p.parameters,docs:{...(N=p.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    title: 'Dark Theme Header',
    subtitle: 'With custom background color',
    icon: <Home fontSize="large" />,
    backgroundColor: '#1a1a1a',
    sx: {
      color: 'white'
    },
    actions: <Button variant="contained" color="primary">
        Action
      </Button>
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of the header with a dark theme and custom styling.'
      }
    }
  }
}`,...(R=(P=p.parameters)==null?void 0:P.docs)==null?void 0:R.source}}};const ye=["Default","WithIconAndActions","CompactVariant","DetailedVariant","CustomContent","DarkThemeExample"];export{c as CompactVariant,l as CustomContent,p as DarkThemeExample,n as Default,d as DetailedVariant,i as WithIconAndActions,ye as __namedExportsOrder,ge as default};
