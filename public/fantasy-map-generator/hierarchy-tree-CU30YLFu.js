import{Ct as e,Et as t,N as n,k as r,un as i}from"./utils-D3KEhgY0.js";import{t as a}from"./mean-4Awewi9R.js";import{i as o,t as s}from"./stratify-CGdiYggi.js";import{r as c}from"./tooltips-D1wvMKni.js";import{H as l,Kt as u}from"./index-D3JPylQY.js";function d(e,t){return e.parent===t.parent?1:2}function f(e){var t=e.children;return t?t[0]:e.t}function p(e){var t=e.children;return t?t[t.length-1]:e.t}function m(e,t,n){var r=n/(t.i-e.i);t.c-=r,t.s+=n,e.c+=r,t.z+=n,t.m+=n}function h(e){for(var t=0,n=0,r=e.children,i=r.length,a;--i>=0;)a=r[i],a.z+=t,a.m+=t,t+=a.s+(n+=a.c)}function g(e,t,n){return e.a.parent===t.parent?e.a:n}function _(e,t){this._=e,this.parent=null,this.children=null,this.A=null,this.a=this,this.z=0,this.m=0,this.c=0,this.s=0,this.t=null,this.i=t}_.prototype=Object.create(o.prototype);function v(e){for(var t=new _(e,0),n,r=[t],i,a,o,s;n=r.pop();)if(a=n._.children)for(n.children=Array(s=a.length),o=s-1;o>=0;--o)r.push(i=n.children[o]=new _(a[o],o)),i.parent=n;return(t.parent=new _(null,0)).children=[t],t}function y(){var e=d,t=1,n=1,r=null;function i(i){var s=v(i);if(s.eachAfter(a),s.parent.m=-s.z,s.eachBefore(o),r)i.eachBefore(c);else{var l=i,u=i,d=i;i.eachBefore(function(e){e.x<l.x&&(l=e),e.x>u.x&&(u=e),e.depth>d.depth&&(d=e)});var f=l===u?1:e(l,u)/2,p=f-l.x,m=t/(u.x+f+p),h=n/(d.depth||1);i.eachBefore(function(e){e.x=(e.x+p)*m,e.y=e.depth*h})}return i}function a(t){var n=t.children,r=t.parent.children,i=t.i?r[t.i-1]:null;if(n){h(t);var a=(n[0].z+n[n.length-1].z)/2;i?(t.z=i.z+e(t._,i._),t.m=t.z-a):t.z=a}else i&&(t.z=i.z+e(t._,i._));t.parent.A=s(t,i,t.parent.A||r[0])}function o(e){e._.x=e.z+e.parent.m,e.m+=e.parent.m}function s(t,n,r){if(n){for(var i=t,a=t,o=n,s=i.parent.children[0],c=i.m,l=a.m,u=o.m,d=s.m,h;o=p(o),i=f(i),o&&i;)s=f(s),a=p(a),a.a=t,h=o.z+u-i.z-c+e(o._,i._),h>0&&(m(g(o,t,r),t,h),c+=h,l+=h),u+=o.m,c+=i.m,d+=s.m,l+=a.m;o&&!p(a)&&(a.t=o,a.m+=u-l),i&&!f(s)&&(s.t=i,s.m+=c-d,r=t)}return r}function c(e){e.x*=t,e.y=e.depth*n}return i.separation=function(t){return arguments.length?(e=t,i):e},i.size=function(e){return arguments.length?(r=!1,t=+e[0],n=+e[1],i):r?null:[t,n]},i.nodeSize=function(e){return arguments.length?(r=!0,t=+e[0],n=+e[1],i):r?[t,n]:null},i}I(),L();var b={top:10,right:10,bottom:-5,left:10},x=t().scaleExtent([.2,1.5]).on(`zoom`,e=>w.attr(`transform`,e.transform.toString())),S,C=i(`#hierarchyTree > svg`).call(x),w=C.select(`g#hierarchyTree_viewbox`),T=w.select(`g#hierarchyTree_linksPrimary`),E=w.select(`g#hierarchyTree_linksSecondary`),D=w.select(`g#hierarchyTree_nodes`),O=w.select(`path#hierarchyTree_dragLine`),k,A,j,M,N,P;function F(t){if(l(`#hierarchyTree, .stable`),k=t.data,A=R(k),A.length<3){c(`Not enough ${t.type} to show hierarchy`,!1,`error`);return}j=t.onNodeEnter,M=t.onNodeLeave,N=t.getDescription,P=t.getShape;let r=z();if(!r)return;let i=r.leaves().length*50,a=r.height*50,o=i-b.left-b.right,s=a+30-b.top-b.bottom,u=y().size([o,s]),d=e(i,300,innerWidth*.75),f=e(a,200,innerHeight*.75);x.extent([[0,0],[d,f]]),C.attr(`viewBox`,`0, 0, ${d}, ${f}`),$(`#hierarchyTree`).dialog({title:`${n(t.type)} tree`,position:{my:`left center`,at:`left+10 center`,of:`svg`},width:d}),K(r,u)}function I(){let e=document.createElement(`style`);e.textContent=`
    #hierarchyTree_selectedOrigins > button {
      margin: 0 2px;
    }

    #hierarchyTree {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    #hierarchyTree > svg {
      height: 100%;
    }

    .hierarchyTree_selectedOrigins {
      margin-right: 15px;
    }

    .hierarchyTree_selectedOrigin {
      border: 1px solid #aaa;
      background: none;
      padding: 1px 4px;
    }

    .hierarchyTree_selectedOrigin:hover {
      border: 1px solid #333;
    }

    .hierarchyTree_selectedOrigin::after {
      content: "✕";
      margin-left: 8px;
      color: #999;
    }

    .hierarchyTree_selectedOrigin:hover:after {
      color: #333;
    }

    #hierarchyTree_originSelector {
      display: none;
    }

    #hierarchyTree_originSelector > form > div {
      padding: 0.3em;
      margin: 1px 0;
      border-radius: 1em;
    }

    #hierarchyTree_originSelector > form > div:hover {
      background-color: #ddd;
    }

    #hierarchyTree_originSelector > form > div[checked] {
      background-color: #c6d6d6;
    }

    #hierarchyTree_nodes > g > text {
      pointer-events: none;
      stroke: none;
      font-size: 11px;
    }

    #hierarchyTree_nodes > g.selected {
      stroke: #c13119;
      stroke-width: 1;
      cursor: move;
    }

    #hierarchyTree_dragLine {
      marker-end: url(#end-arrow);
      stroke: #333333;
      stroke-dasharray: 5;
      stroke-dashoffset: 1000;
      animation: dash 80s linear backwards;
    }
  `,document.head.appendChild(e)}function L(){r(`dialogs`).insertAdjacentHTML(`beforeend`,`<div id="hierarchyTree" class="dialog" style="overflow: hidden;">
    <svg>
      <g id="hierarchyTree_viewbox" style="text-anchor: middle; dominant-baseline: central">
        <g transform="translate(10, -45)">
          <g id="hierarchyTree_links" fill="none" stroke="#aaa">
            <g id="hierarchyTree_linksPrimary"></g>
            <g id="hierarchyTree_linksSecondary" stroke-dasharray="1"></g>
          </g>
          <g id="hierarchyTree_nodes"></g>
          <path id="hierarchyTree_dragLine" path='' />
        </g>
      </g>
    </svg>

    <div id="hierarchyTree_details" class='chartInfo'>
      <div id='hierarchyTree_infoLine' style="display: block">&#8205;</div>
      <div id='hierarchyTree_selected' style="display: none">
        <span><span id='hierarchyTree_selectedName'></span>. </span>
        <span data-name="Type short name (abbreviation)">Abbreviation: <input id='hierarchyTree_selectedCode' type='text' maxlength='3' size='3' /></span>
        <span>Origins: <span id='hierarchyTree_selectedOrigins'></span></span>
        <button data-tip='Edit this node's origins' class="hierarchyTree_selectedButton" id='hierarchyTree_selectedSelectButton'>Edit</button>
        <button data-tip='Unselect this node' class="hierarchyTree_selectedButton" id='hierarchyTree_selectedCloseButton'>Unselect</button>
      </div>
    </div>
    <div id="hierarchyTree_originSelector"></div>
  </div>`)}function R(e){let t=e.filter(e=>!e.removed);return t.map(e=>(e.i===0?e.origins=[null]:e.origins.length&&t.find(t=>e.origins[0]===t.i)||(e.origins=[0]),e))}function z(){try{let e=s().id(e=>String(e.i)).parentId(e=>e.origins[0]==null?null:String(e.origins[0]))(A);return S=e,e}catch(e){return c(`Hierarchy data issue. ${e}`,!1,`error`,6e3),S}}function B(e){return`${e.source.id}-${e.target.id}`}function V(e){return e.id}function H(e){let{source:{x:t,y:n},target:{x:r,y:i}}=e;return`M${t},${n} C${t},${(n*3+i)/4} ${r},${(n*2+i)/3} ${r},${i}`}function U(e){let t=e.descendants(),n=[];for(let e of t){let r=e.data.origins;for(let i=1;i<r.length;i++){let a=t.find(e=>e.data.i===r[i]);a&&n.push({source:a,target:e})}}return n}var W={undefined:`M5,0A5,5,0,1,1,-5,0A5,5,0,1,1,5,0`,circle:`M11.3,0A11.3,11.3,0,1,1,-11.3,0A11.3,11.3,0,1,1,11.3,0`,square:`M-11,-11h22v22h-22Z`,hexagon:`M-6.5,-11.26l13,0l6.5,11.26l-6.5,11.26l-13,0l-6.5,-11.26Z`,diamond:`M0,-14L14,0L0,14L-14,0Z`,concave:`M-11,-11l11,2l11,-2l-2,11l2,11l-11,-2l-11,2l2,-11Z`,octagon:`M-4.97,-12.01 l9.95,0 l7.04,7.04 l0,9.95 l-7.04,7.04 l-9.95,0 l-7.04,-7.04 l0,-9.95Z`,pentagon:`M0,-14l14,11l-6,14h-16l-6,-14Z`},G=e=>{let t=e.descendants().flatMap(({data:e})=>e.origins.slice(1));return t.length===0?e.data.i:a(t)??0};function K(e,t){t(e.sort((e,t)=>G(e)-G(t))),T.selectAll(`path`).data(e.links(),B).join(`path`).attr(`d`,H),E.selectAll(`path`).data(U(e),B).join(`path`).attr(`d`,H);let n=D.selectAll(`g`).data(e.descendants(),V).join(`g`).attr(`data-id`,e=>e.data.i).attr(`stroke`,`#333`).attr(`transform`,e=>`translate(${e.x}, ${e.y})`).on(`mouseenter`,X).on(`mouseleave`,Z).on(`click`,(e,t)=>Y(t)).call(u().on(`start`,Q));n.selectAll(`path`).data(e=>[e]).join(`path`).attr(`d`,e=>W[P(e.data)??`undefined`]).attr(`fill`,e=>e.data.color||`#ffffff`).attr(`stroke-dasharray`,e=>e.data.cells?`none`:`1`),n.selectAll(`text`).data(e=>[e]).join(`text`).text(e=>e.data.code||``)}function q(e,t){e.x=t.x,e.y=t.y;for(let n of e.descendants()){let e=t.descendants().find(e=>e.data.i===n.data.i);e&&(n.x=e.x,n.y=e.y)}}function J(){let e=S,t=z();q(t,e);let n=1e3,r=e=>e.append(`path`).attr(`d`,H).attr(`opacity`,0).call(e=>e.transition().duration(50).attr(`opacity`,1)),i=e=>e.call(e=>e.transition().duration(50).attr(`d`,H)),a=e=>e.call(e=>e.transition().duration(50).attr(`opacity`,0).remove());T.selectAll(`path`).data(t.links(),B).join(r,i,a),E.selectAll(`path`).data(U(t),B).join(r,i,a);let o=t.leaves().length*50,s=t.height*50,c=o-b.left-b.right,l=s+30-b.top-b.bottom;y().size([c,l])(t.sort((e,t)=>G(e)-G(t))),T.selectAll(`path`).data(t.links(),B).transition().duration(n).delay(50).attr(`d`,H),E.selectAll(`path`).data(U(t),B).transition().duration(n).delay(50).attr(`d`,H),D.selectAll(`g`).data(t.descendants(),V).transition().delay(50).duration(n).attr(`transform`,e=>`translate(${e.x},${e.y})`)}function Y(e){let t=e.data;if(e.id===0)return;let n=D.select(`g[data-id="${e.id}"]`);D.selectAll(`g`).style(`outline`,`none`),n.style(`outline`,`1px solid #c13119`),r(`hierarchyTree_selected`).style.display=`block`,r(`hierarchyTree_infoLine`).style.display=`none`,r(`hierarchyTree_selectedName`).innerText=t.name,r(`hierarchyTree_selectedCode`).value=t.code||``,r(`hierarchyTree_selectedCode`).onchange=function(){let e=this;if(e.value.length>3)return c(`Abbreviation must be 3 characters or less`,!1,`error`,3e3);if(!e.value.length)return c(`Abbreviation cannot be empty`,!1,`error`,3e3);n.select(`text`).text(e.value),t.code=e.value};let i=()=>{r(`hierarchyTree_selectedOrigins`).innerHTML=t.origins.filter(e=>e).map((e,t)=>{let{name:n,code:r}=A.find(t=>t.i===e)||{};return`<button data-id="${e}" class="hierarchyTree_selectedButton hierarchyTree_selectedOrigin" data-tip="${`${t?`Secondary`:`Primary`} origin: ${n}. Click to remove link to that origin`}">${r}</button>`}).join(``),r(`hierarchyTree_selectedOrigins`).onclick=e=>{let n=e.target;if(n.tagName!==`BUTTON`)return;let r=Number(n.dataset.id),i=t.origins.filter(e=>e!==r);t.origins=i.length?i:[0],n.remove(),J()}};i(),r(`hierarchyTree_selectedSelectButton`).onclick=()=>{let n=t.origins,a=e.descendants().map(e=>e.data.i),o=A.filter(({i:e})=>!a.includes(e)).map(({i:e,name:t,code:r,color:i})=>{let a=n[0]===e?`checked`:``,o=n.includes(e)?`checked`:``;return e===0?`
        <div ${o}>
          <input data-tip="Set as primary origin" type="radio" name="primary" value="${e}" ${a} />
          Top level
        </div>
      `:`
        <div ${o}>
          <input data-tip="Set as primary origin" type="radio" name="primary" value="${e}" ${a} />
          <input data-id="${e}" id="selectElementOrigin${e}" class="checkbox" type="checkbox" ${o} />
          <label data-tip="Check to set as a secondary origin" for="selectElementOrigin${e}" class="checkbox-label">
            <fill-box fill="${i}" size=".8em" disabled></fill-box>
            ${r}: ${t}
          </label>
        </div>
      `});r(`hierarchyTree_originSelector`).innerHTML=`
      <form style="max-height: 35vh">
        ${o.join(``)}
      </form>
    `,$(`#hierarchyTree_originSelector`).dialog({title:`Select origins`,position:{my:`center`,at:`center`,of:`svg`},buttons:{Select:()=>{$(`#hierarchyTree_originSelector`).dialog(`close`);let e=r(`hierarchyTree_originSelector`),n=e.querySelector(`input[type='radio']:checked`),a=e.querySelectorAll(`input[type='checkbox']:checked`),o=n?Number(n.value):0;t.origins=[o,...Array.from(a).map(e=>Number(e.dataset.id)).filter(e=>e!==o)],J(),i()},Cancel:()=>{$(`#hierarchyTree_originSelector`).dialog(`close`)}}})},r(`hierarchyTree_selectedCloseButton`).onclick=()=>{n.style(`outline`,`none`),r(`hierarchyTree_selected`).style.display=`none`,r(`hierarchyTree_infoLine`).style.display=`block`}}function X(e,t){t.depth!==0&&(this.classList.add(`selected`),j(t),r(`hierarchyTree_infoLine`).innerText=N(t.data),c(`Drag to other node to add parent, click to edit`))}function Z(e,t){this.classList.remove(`selected`),M(t),r(`hierarchyTree_infoLine`).innerHTML=`&#8205;`,c(``)}function Q(e,t){t.id!==0&&(O.attr(`d`,`M${t.x},${t.y}L${t.x},${t.y}`),e.on(`drag`,e=>{O.attr(`d`,`M${t.x},${t.y}L${e.x},${e.y}`)}),e.on(`end`,()=>{O.attr(`d`,``);let e=D.select(`g.selected`);if(!e.size())return;let n=t.data.i,r=e.datum().data.i;if(n===r||t.data.origins.includes(r)||t.descendants().some(e=>e.data.i===r))return;let i=k.find(({i:e})=>e===n);i&&(i.origins[0]===0&&(i.origins=[]),i.origins.push(r),Y(t),J())}))}var ee={open:F};export{ee as HierarchyTree};