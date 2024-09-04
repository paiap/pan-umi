"use strict";(self.webpackChunkpanan=self.webpackChunkpanan||[]).push([[3622],{7229:function(re,k,a){a.r(k),a.d(k,{default:function(){return ae}});var R=a(5574),p=a.n(R),f=a(67294),S=a(3909),G=a(19632),M=a.n(G),U=a(15009),z=a.n(U),N=a(99289),W=a.n(N),H=a(9783),J=a.n(H),K=a(97857),Z=a.n(K),c=a(23323),b=a(38289),E=a(67418),A=a(14726),Q=a(78045),D=[{value:1,label:"Input"},{value:2,label:"Select"}],X={Input:b.Z,Select:E.Z,Radio:Q.ZP},n=a(85893),O={required:!0,message:"\u8BE5\u5B57\u6BB5\u5FC5\u586B"},y=c.Z.Item,Y=function(x){var u=x.setItems,j=(0,f.useState)([]),F=p()(j,2),i=F[0],B=F[1],I=(0,f.useState)([]),g=p()(I,2),L=g[0],P=g[1],$=c.Z.useForm(),V=p()($,1),o=V[0];(0,f.useEffect)(function(){var e=i.map(function(t){return{value:t==null?void 0:t.name,label:t==null?void 0:t.label}});P(e)},[i]);var l=function(t){var s=t.id,r=t.name,m=t.value,C=i.map(function(h){return h.key===s?Z()(Z()({},h),{},J()({},r,m)):Z()({},h)});B(C)},v=function(t){var s=Object.keys(t).map(function(r){var m=r.split("-")[0],C=Number(r.split("-")[1]),h=t[r];return{name:m,id:C,value:h}});l(s[0])},d=function(){var e=W()(z()().mark(function t(){return z()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,o.validateFields();case 2:u(i);case 3:case"end":return r.stop()}},t)}));return function(){return e.apply(this,arguments)}}();return(0,n.jsxs)(c.Z,{form:o,onValuesChange:v,children:[(0,n.jsxs)(y,{children:[i.map(function(e){return e?(0,n.jsxs)("div",{style:{display:"flex",flexWrap:"wrap"},children:[(0,n.jsx)(y,{style:{marginLeft:"8px"},label:"name",name:"name-".concat(e.key),rules:[O],children:(0,n.jsx)(b.Z,{style:{width:"200px"},placeholder:"\u5C5E\u6027",value:e==null?void 0:e.name})}),(0,n.jsx)(y,{style:{marginLeft:"8px"},label:"label",name:"label-".concat(e.key),rules:[O],children:(0,n.jsx)(b.Z,{style:{width:"200px"},placeholder:"\u5C55\u793A\u7684\u6807\u7B7E\u540D\u79F0",value:e==null?void 0:e.label})}),(0,n.jsx)(y,{style:{marginLeft:"8px"},label:"type",name:"type-".concat(e.key),rules:[O],children:(0,n.jsx)(E.Z,{options:D,style:{width:"200px"},placeholder:"\u7EC4\u4EF6\u7C7B\u578B",value:e==null?void 0:e.type})}),(0,n.jsx)(y,{style:{marginLeft:"8px"},label:"dependence",name:"dependence-".concat(e.key),children:(0,n.jsx)(E.Z,{options:L,style:{width:"200px"},placeholder:"\u7EC4\u4EF6\u7C7B\u578B",value:e==null?void 0:e.dependence})})]},e.key):null}),(0,n.jsx)(A.ZP,{style:{width:"100%"},type:"dashed",onClick:function(){B([].concat(M()(i),[{key:Date.now(),label:"",name:"",type:1,dependence:""}]))},children:"+"})]}),(0,n.jsx)(y,{children:(0,n.jsx)(A.ZP,{type:"primary",onClick:d,children:"\u786E\u5B9A"})})]})},w=Y,q=a(63764),le=a(72171),_=function(x){var u=x.items,j=c.Z.useForm(),F=p()(j,1),i=F[0],B=(0,f.useState)(),I=p()(B,2),g=I[0],L=I[1];(0,f.useEffect)(function(){u.length!==0&&console.log(u)},[u]);var P=function(){return u.map(function(l){var v,d=l.label,e=l.name,t=l.type,s=l.dependence,r=(v=D.find(function(m){return m.value===t}))===null||v===void 0?void 0:v.label;return r?s?`
        <Form.Item noStyle shouldUpdate key={'`.concat(l.key,`'}>
            {
              ({ getFieldValue }) => {
                const val = getFieldValue('`).concat(s,`')
                if (!val) return null
                return (
                  <Form.Item key={'`).concat(l.key,"'} label={'").concat(d,"'} name={'").concat(e,`'}>
                    {`).concat(r," && <").concat(r," placeholder={`\u8BF7\u586B\u5199").concat(e,`\u5B57\u6BB5\`} />}
                  </Form.Item>
                )
              }
            }
          </Form.Item>`):`
        <Form.Item key={'`.concat(l.key,"'} label={'").concat(d,"'} name={'").concat(e,`'}>
            <`).concat(r," placeholder={`\u8BF7\u586B\u5199").concat(e,"\u5B57\u6BB5`} />\n        </Form.Item>"):null})},$=function(){var l=P().join(`
`);return`
    <Form form={form} >
      `.concat(l,`
    </Form>
    `)},V=(0,f.useMemo)(function(){return u.map(function(o){var l,v=o.label,d=o.name,e=o.type,t=o.dependence,s=(l=D.find(function(m){return m.value===e}))===null||l===void 0?void 0:l.label;if(!s)return null;var r=X[s];return t?(0,n.jsx)(c.Z.Item,{noStyle:!0,shouldUpdate:!0,children:function(C){var h=C.getFieldValue,te=h(t);return te?(0,n.jsx)(c.Z.Item,{label:v,name:d,children:r&&(0,n.jsx)(r,{placeholder:"\u8BF7\u586B\u5199".concat(d,"\u5B57\u6BB5")})},o.key):null}},o.key):(0,n.jsx)(c.Z.Item,{label:v,name:d,children:r&&(0,n.jsx)(r,{placeholder:"\u8BF7\u586B\u5199".concat(d,"\u5B57\u6BB5")})},o.key)})},[u]);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(c.Z,{form:i,children:[V,(0,n.jsx)(A.ZP,{onClick:function(){var l=$();console.log(l),L(l)},children:"\u8F93\u51FA"})]}),g&&(0,n.jsx)(q.ZP,{height:"800px",defaultLanguage:"json",theme:"vs-dark",options:{readOnly:!0},value:g})]})},ee=_,ne=function(){var x=(0,f.useState)([]),u=p()(x,2),j=u[0],F=u[1];return(0,n.jsxs)(S.eh,{direction:"horizontal",style:{height:"1000px"},children:[(0,n.jsx)(S.s_,{style:{backgroundColor:"#EEEEEE",padding:"8px"},minSize:20,defaultSize:75,children:(0,n.jsx)(w,{setItems:F})}),(0,n.jsx)(S.OT,{}),(0,n.jsx)(S.s_,{style:{backgroundColor:"#CCFFFF",padding:"8px"},minSize:20,children:(0,n.jsx)(ee,{items:j})})]})},ae=ne}}]);
