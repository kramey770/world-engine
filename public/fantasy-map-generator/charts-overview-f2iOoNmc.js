import{Bt as e,C as t,Et as n,Ft as r,Lt as i,N as a,Pt as o,S as s,_n as c,c as l,d as u,dn as d,fn as f,gn as p,hn as m,i as h,k as g,l as _,n as v,r as y,t as b}from"./utils-BIleyWmR.js";import{t as x}from"./extent-V-JVJWfI.js";import{t as S}from"./mean-4Awewi9R.js";import{t as C}from"./sum-BpJJqxFM.js";import{n as ee,r as te}from"./axis-ChvWZg1j.js";import{n as w}from"./heightUtils-BfaaFPbS.js";import{r as T}from"./tooltips-zkair8Am.js";import{t as E}from"./dialog-helpers-50LJgx0U.js";var D=class extends Map{constructor(e,t=j){if(super(),Object.defineProperties(this,{_intern:{value:new Map},_key:{value:t}}),e!=null)for(let[t,n]of e)this.set(t,n)}get(e){return super.get(O(this,e))}has(e){return super.has(O(this,e))}set(e,t){return super.set(k(this,e),t)}delete(e){return super.delete(A(this,e))}};function O({_intern:e,_key:t},n){let r=t(n);return e.has(r)?e.get(r):n}function k({_intern:e,_key:t},n){let r=t(n);return e.has(r)?e.get(r):(e.set(r,n),n)}function A({_intern:e,_key:t},n){let r=t(n);return e.has(r)&&(n=e.get(r),e.delete(r)),n}function j(e){return typeof e==`object`&&e?e.valueOf():e}function M(e,t,...n){return N(e,Array.from,t,n)}function N(e,t,n,r){return(function e(i,a){if(a>=r.length)return n(i);let o=new D,s=r[a++],c=-1;for(let e of i){let t=s(e,++c,i),n=o.get(t);n?n.push(e):o.set(t,[e])}for(let[t,n]of o)o.set(t,e(n,a));return t(o)})(e,0)}function ne(e){return d(f(e).call(document.documentElement))}var P=Symbol(`implicit`);function F(){var t=new D,n=[],r=[],i=P;function a(e){let a=t.get(e);if(a===void 0){if(i!==P)return i;t.set(e,a=n.push(e)-1)}return r[a%r.length]}return a.domain=function(e){if(!arguments.length)return n.slice();n=[],t=new D;for(let r of e)t.has(r)||t.set(r,n.push(r)-1);return a},a.range=function(e){return arguments.length?(r=Array.from(e),a):r.slice()},a.unknown=function(e){return arguments.length?(i=e,a):i},a.copy=function(){return F(n,r).unknown(i)},e.apply(a,arguments),a}function re(){var t=F().unknown(void 0),n=t.domain,r=t.range,i=0,a=1,o,s,c=!1,l=0,u=0,d=.5;delete t.unknown;function f(){var e=n().length,t=a<i,f=t?a:i,p=t?i:a;o=(p-f)/Math.max(1,e-l+u*2),c&&(o=Math.floor(o)),f+=(p-f-o*(e-l))*d,s=o*(1-l),c&&(f=Math.round(f),s=Math.round(s));var h=m(e).map(function(e){return f+o*e});return r(t?h.reverse():h)}return t.domain=function(e){return arguments.length?(n(e),f()):n()},t.range=function(e){return arguments.length?([i,a]=e,i=+i,a=+a,f()):[i,a]},t.rangeRound=function(e){return[i,a]=e,i=+i,a=+a,c=!0,f()},t.bandwidth=function(){return s},t.step=function(){return o},t.round=function(e){return arguments.length?(c=!!e,f()):c},t.padding=function(e){return arguments.length?(l=Math.min(1,u=+e),f()):l},t.paddingInner=function(e){return arguments.length?(l=Math.min(1,e),f()):l},t.paddingOuter=function(e){return arguments.length?(u=+e,f()):u},t.align=function(e){return arguments.length?(d=Math.max(0,Math.min(1,e)),f()):d},t.copy=function(){return re(n(),[i,a]).round(c).paddingInner(l).paddingOuter(u).align(d)},e.apply(f(),arguments)}function I(e,t){if((o=e.length)>1)for(var n=1,r,i,a=e[t[0]],o,s=a.length;n<o;++n)for(i=a,a=e[t[n]],r=0;r<s;++r)a[r][1]+=a[r][0]=isNaN(i[r][1])?i[r][0]:i[r][1]}function L(e){for(var t=e.length,n=Array(t);--t>=0;)n[t]=t;return n}function R(e,t){return e[t]}function z(e){let t=[];return t.key=e,t}function ie(){var e=r([]),t=L,n=I,i=R;function a(r){var a=Array.from(e.apply(this,arguments),z),s,c=a.length,l=-1,u;for(let e of r)for(s=0,++l;s<c;++s)(a[s][l]=[0,+i(e,a[s].key,l,r)]).data=e;for(s=0,u=o(t(a));s<c;++s)a[u[s]].index=s;return n(a,u),a}return a.keys=function(t){return arguments.length?(e=typeof t==`function`?t:r(Array.from(t)),a):e},a.value=function(e){return arguments.length?(i=typeof e==`function`?e:r(+e),a):i},a.order=function(e){return arguments.length?(t=e==null?L:typeof e==`function`?e:r(Array.from(e)),a):t},a.offset=function(e){return arguments.length?(n=e??I,a):n},a}function B(e,t){if((r=e.length)>0){for(var n,r,i=0,a=e[0].length,o;i<a;++i){for(o=n=0;n<r;++n)o+=e[n][i][1]||0;if(o)for(n=0;n<r;++n)e[n][i][1]/=o}I(e,t)}}function ae(e,t){if((c=e.length)>0)for(var n,r=0,i,a,o,s,c,l=e[t[0]].length;r<l;++r)for(o=s=0,n=0;n<c;++n)(a=(i=e[t[n]][r])[1]-i[0])>0?(i[0]=o,i[1]=o+=a):a<0?(i[1]=s,i[0]=s+=a):(i[0]=0,i[1]=a)}var V={states:{label:`State`,getId:e=>pack.cells.state[e],getName:Z(`states`),getColors:Q(`states`),landOnly:!0},cultures:{label:`Culture`,getId:e=>pack.cells.culture[e],getName:Z(`cultures`),getColors:Q(`cultures`),landOnly:!0},religions:{label:`Religion`,getId:e=>pack.cells.religion[e],getName:Z(`religions`),getColors:Q(`religions`),landOnly:!0},provinces:{label:`Province`,getId:e=>pack.cells.province[e],getName:Z(`provinces`),getColors:Q(`provinces`),landOnly:!0},biomes:{label:`Biome`,getId:e=>pack.cells.biome[e],getName:ye,getColors:be,landOnly:!1},markets:{label:`Market`,getId:e=>pack.cells.market[e],getName:xe,getColors:Se,landOnly:!1},goods:{label:`Good`,requires:`good`,getId:(e,t)=>t.good,getName:Ce,getColors:we,landOnly:!1}},H={total_population:{label:`Total population`,quantize:e=>Ee(e)+De(e),aggregate:e=>n(C(e)),formatTicks:e=>u(e),stringify:e=>e.toLocaleString(),stackable:!0,landOnly:!0},urban_population:{label:`Urban population`,quantize:Ee,aggregate:e=>n(C(e)),formatTicks:e=>u(e),stringify:e=>e.toLocaleString(),stackable:!0,landOnly:!0},rural_population:{label:`Rural population`,quantize:De,aggregate:e=>n(C(e)),formatTicks:e=>u(e),stringify:e=>e.toLocaleString(),stackable:!0,landOnly:!0},area:{label:`Land area`,quantize:e=>y(pack.cells.area[e]),aggregate:e=>n(C(e)),formatTicks:e=>`${u(e)} ${h()}`,stringify:e=>`${e.toLocaleString()} ${h()}`,stackable:!0,landOnly:!0},cells:{label:`Cells`,hint:`Number of land cells`,quantize:()=>1,aggregate:e=>C(e),formatTicks:e=>e,stringify:e=>e.toLocaleString(),stackable:!0,landOnly:!0},burgs_number:{label:`Burgs`,hint:`Number of burgs`,quantize:e=>+!!pack.cells.burg[e],aggregate:e=>C(e),formatTicks:e=>e,stringify:e=>e.toLocaleString(),stackable:!0,landOnly:!0},average_elevation:{label:`Average elevation`,quantize:e=>pack.cells.h[e],aggregate:e=>S(e),formatTicks:e=>l(e),stringify:e=>l(e),stackable:!1,landOnly:!1},max_elevation:{label:`Maximum mean elevation`,quantize:e=>pack.cells.h[e],aggregate:e=>c(e),formatTicks:e=>l(e),stringify:e=>l(e),stackable:!1,landOnly:!1},min_elevation:{label:`Minimum mean elevation`,quantize:e=>pack.cells.h[e],aggregate:e=>p(e),formatTicks:e=>l(e),stringify:e=>l(e),stackable:!1,landOnly:!1},average_temperature:{label:`Annual mean temperature`,quantize:e=>grid.cells.temp[pack.cells.g[e]],aggregate:e=>S(e),formatTicks:e=>b(e),stringify:e=>b(e),stackable:!1,landOnly:!1},max_temperature:{label:`Annual max temperature`,hint:`Highest mean temperature of the year`,quantize:e=>grid.cells.temp[pack.cells.g[e]],aggregate:e=>c(e),formatTicks:e=>b(e),stringify:e=>b(e),stackable:!1,landOnly:!1},min_temperature:{label:`Annual min temperature`,hint:`Lowest mean temperature of the year`,quantize:e=>grid.cells.temp[pack.cells.g[e]],aggregate:e=>p(e),formatTicks:e=>b(e),stringify:e=>b(e),stackable:!1,landOnly:!1},average_precipitation:{label:`Annual mean precipitation`,quantize:e=>grid.cells.prec[pack.cells.g[e]],aggregate:e=>n(S(e)),formatTicks:e=>_(n(e)),stringify:e=>_(n(e)),stackable:!1,landOnly:!0},max_precipitation:{label:`Annual max precipitation`,hint:`Highest mean precipitation of the year`,quantize:e=>grid.cells.prec[pack.cells.g[e]],aggregate:e=>n(c(e)),formatTicks:e=>_(n(e)),stringify:e=>_(n(e)),stackable:!1,landOnly:!0},min_precipitation:{label:`Annual min precipitation`,hint:`Lowest mean precipitation of the year`,quantize:e=>grid.cells.prec[pack.cells.g[e]],aggregate:e=>n(p(e)),formatTicks:e=>_(n(e)),stringify:e=>_(n(e)),stackable:!1,landOnly:!0},coastal_cells:{label:`Number of coastal cells`,quantize:e=>+(pack.cells.t[e]===1),aggregate:e=>C(e),formatTicks:e=>e,stringify:e=>e.toLocaleString(),stackable:!0,landOnly:!0},river_cells:{label:`Number of river cells`,quantize:e=>+!!pack.cells.r[e],aggregate:e=>C(e),formatTicks:e=>e,stringify:e=>e.toLocaleString(),stackable:!0,landOnly:!0},production_value:{label:`Production value`,hint:`Worth of produced goods`,provides:[`good`],prepare:()=>({biomeProduction:Goods.getBiomesProduction()}),getContributions:(e,{biomeProduction:t})=>{let n=Te(e,t),r=[];for(let[e,t]of Object.entries(n)){let n=Goods.get(+e);n&&r.push({good:+e,value:t*n.value})}return r},aggregate:e=>n(C(e)),formatTicks:e=>u(e),stringify:e=>v(e),stackable:!0,landOnly:!0},production_units:{label:`Production volume`,hint:`Units of goods produced`,provides:[`good`],prepare:()=>({biomeProduction:Goods.getBiomesProduction()}),getContributions:(e,{biomeProduction:t})=>{let n=Te(e,t),r=[];for(let[e,t]of Object.entries(n))r.push({good:+e,value:t});return r},aggregate:e=>n(C(e)),formatTicks:e=>u(e),stringify:e=>`${e.toLocaleString()} units`,stackable:!0,landOnly:!0},burgs_profit:{label:`Burgs profit`,hint:`Burgs profit from trade and manufacturing`,quantize:e=>{let t=pack.cells.burg[e];return t&&pack.burgs[t].product||0},aggregate:e=>n(C(e)),formatTicks:e=>u(e),stringify:e=>v(e),stackable:!0,landOnly:!0}},oe={stackedBar:{offset:ae},normalizedStackedBar:{offset:B,formatX:e=>`${n(e*100)}%`}},U=[],W;function se(){if(ce(),fe(),G(),E(`#chartsOverview, .stable`),W!==mapId&&(U=[],W=mapId),!U.length)K();else for(let e of U)le(e);$(`#chartsOverview`).dialog({title:`Data Charts`,width:`60vw`,height:`auto`,position:{my:`center`,at:`center`,of:`svg`},close:pe})}function ce(){document.getElementById(`chartsOverview`)?.remove();let e=Object.entries(V).map(([e,{label:t}])=>[e,t]),t=Object.entries(H).map(([e,{label:t}])=>[e,t]),n=([e,t])=>`<option value="${e}">${t}</option>`,r=e=>e.map(n).join(``),i=`<div id="chartsOverview" class="dialog stable">
    <form id="chartsOverview__form">
      <div>
        <button data-tip="Add a chart" type="submit">Plot</button>

        <select data-tip="Select entity (y axis)" id="chartsOverview__entitiesSelect">
          ${r(e)}
        </select>

        <label for="chartsOverview__plotBySelect" data-tip="Select metric to plot (x axis)">
          <span>by</span>
          <select id="chartsOverview__plotBySelect">
            ${r(t)}
          </select>
          <i id="chartsOverview__plotByInfo" class="icon-info-circled" style="display: none"></i>
        </label>

        <label for="chartsOverview__groupBySelect" data-tip="Select entity to group by. If you don't need grouping, set it the same as the entity">
          <span>grouped by</span>
          <select id="chartsOverview__groupBySelect">
            ${r(e)}
          </select>
        </label>

        <label data-tip="Sorting type" for="chartsOverview__sortingSelect">
          <span>sorted</span>
          <select id="chartsOverview__sortingSelect">
            <option value="value">by value</option>
            <option value="name">by name</option>
            <option value="natural">naturally</option>
          </select>
        </label>
      </div>

      <div>
        <label data-tip="Select chart type" for="chartsOverview__chartType">
          <span>Type</span>
          <select id="chartsOverview__chartType">
            <option value="stackedBar" selected>Stacked Bar</option>
            <option value="normalizedStackedBar">Normalized Bar</option>
          </select>
        </label>

        <label data-tip="Show the charts in 1, 2, 3 or 4 columns" for="chartsOverview__viewColumns">
          <span>Columns</span>
          <select id="chartsOverview__viewColumns">
            <option value="1" selected>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </label>

        <label data-tip="Exclude zero element from the results (id 0, e.g. the neutral state)" for="chartsOverview__excludeNeutral">
          <input id="chartsOverview__excludeNeutral" type="checkbox" class="native" />
          <span>Exclude neutral</span>
        </label>
      </div>
    </form>

    <section id="chartsOverview__charts"></section>
  </div>`;g(`dialogs`).insertAdjacentHTML(`beforeend`,i),g(`chartsOverview__entitiesSelect`).value=`states`,g(`chartsOverview__plotBySelect`).value=`total_population`,g(`chartsOverview__groupBySelect`).value=`cultures`,g(`chartsOverview__form`).addEventListener(`submit`,K),g(`chartsOverview__viewColumns`).addEventListener(`change`,fe),g(`chartsOverview__plotBySelect`).addEventListener(`change`,G),document.getElementById(`chartsOverviewStyle`)?.remove();let a=document.createElement(`style`);a.id=`chartsOverviewStyle`,a.textContent=`
    #chartsOverview {
      max-width: 90vw !important;
      max-height: 90vh !important;
      overflow: hidden;
      display: grid;
      grid-template-rows: auto 1fr;
    }

    #chartsOverview__form {
      display: grid;
      font-size: 1.1em;
      margin: 0.3em 0;
    }

    #chartsOverview__form > div:first-child {
      display: flex;
      align-items: center;
      gap: 0.2em;
    }

    #chartsOverview__form > div:nth-child(2) {
      display: flex;
      align-items: center;
      gap: 1em;
    }

    #chartsOverview__form label {
      display: inline-flex;
      align-items: center;
    }

    #chartsOverview__charts {
      overflow: auto;
      scroll-behavior: smooth;
      display: grid;
    }

    #chartsOverview__charts figure {
      margin: 0;
      padding: 0.6em 0 1em;
      border-top: 1px solid rgba(128, 128, 128, 0.4);
    }

    #chartsOverview__charts figcaption {
      font-size: 1.2em;
      margin: 0 1% 0.4em 4%;
      display: grid;
      align-items: center;
      grid-template-columns: 1fr auto;
    }

    #chartsOverview__plotByInfo {
      margin-left: 0.3em;
      cursor: help;
      opacity: 0.6;
    }
  `,document.head.appendChild(a)}function G(){let e=g(`chartsOverview__plotBySelect`).value,t=g(`chartsOverview__plotByInfo`),{hint:n}=H[e];n?(t.dataset.tip=n,t.style.display=``):t.style.display=`none`}function K(e){e&&e.preventDefault();let t=g(`chartsOverview__entitiesSelect`).value,n=g(`chartsOverview__plotBySelect`).value,r=g(`chartsOverview__groupBySelect`).value,i=g(`chartsOverview__sortingSelect`).value,a=g(`chartsOverview__chartType`).value,o=g(`chartsOverview__excludeNeutral`).checked,{label:s,stackable:c,provides:l=[]}=H[n],u=[t,r].find(e=>{let t=V[e].requires;return t?!l.includes(t):!1});if(u){T(`${s} cannot be broken down by ${V[u].label.toLowerCase()}`,!1,`error`,4e3);return}!c&&r!==t&&(T(`Grouping is not supported for ${n}`,!1,`warn`,4e3),r=t);let d={id:Date.now(),entity:t,plotBy:n,groupBy:r,sorting:i,type:a,excludeNeutral:o};U.push(d),le(d),q()}function le({id:e,entity:t,plotBy:r,groupBy:i,sorting:o,type:s,excludeNeutral:c}){let{label:l,stringify:u,quantize:d,getContributions:f,prepare:p,aggregate:m,formatTicks:h,landOnly:_}=H[r],v=i===t,{label:y,getName:b,getId:x,landOnly:S}=V[t],{label:C,getName:ee,getId:te,getColors:T}=V[i],E=p?p():void 0,D=f?e=>f(e,E):e=>[{value:d(e)}],O=`${a(t)} by ${l}${v?``:` grouped by ${C}`}`,k=(e,t,r,i)=>{let a=`${y}: ${e}`,o=v?``:`${C}: ${t}`,s=`${l}: ${u(r)}`;return v||(s+=` (${n(i*100)}%)`),[a,o,s].filter(Boolean)},A={},j=new Set;for(let e of pack.cells.i)if(!((S||_)&&w(e,pack)))for(let t of D(e)){let n=x(e,t),r=te(e,t);if(c&&(n===0||r===0))continue;let{value:i}=t;A[n]?A[n][r]?A[n][r].push(i):A[n][r]=[i]:A[n]={[r]:[i]},j.add(r)}let M=Oe(Object.entries(A).flatMap(([e,t])=>{let n=b(e);return Object.entries(t).map(([e,t])=>{let r=ee(e),i=m(t);return{name:n,group:r,value:i}})}),o),N=T(),{offset:ne,formatX:P=h}=oe[s];de(e,M,ue(M,{colors:N,tooltip:k,offset:ne,formatX:P}),O),g(`chartsOverview__charts`).lastElementChild?.scrollIntoView()}function ue(e,{colors:t,tooltip:n,offset:r,formatX:a}){let o=e.map(e=>e.value),s=e.map(e=>e.name),c=e.map(e=>e.group),l=new Set(s),u=new Set(c),d=m(o.length).filter(e=>l.has(s[e])&&u.has(c[e])),f=Array.from(l),p=Array.from(u),h=_e(f),g=ve(p,X-h-15),_={top:30,right:15,bottom:g*20+10,left:h},v=[_.left,X-_.right],y=l.size*25+_.top+_.bottom,b=[y-_.bottom,_.top],S=M(d,([e])=>e,e=>s[e],e=>c[e]),w=ie().keys(p).value(([,e],t)=>o[new Map(e).get(t)]).order(L).offset(r)(S).map(e=>{let t=e.filter(e=>!Number.isNaN(e[1])).map(t=>Object.assign(t,{i:new Map(t.data[1]).get(e.key)}));return{key:e.key,data:t}}),E=w.flatMap(e=>e.data.flatMap(e=>[e[0],e[1]])),D=x(E),O=i(D,v),k=re(f,b).paddingInner(me),A=te(O).ticks(X/80,null),j=ee(k).tickSizeOuter(0),N=ne(`svg`).attr(`version`,`1.1`).attr(`xmlns`,`http://www.w3.org/2000/svg`).attr(`viewBox`,`0 0 ${X} ${y}`).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`);N.append(`g`).attr(`transform`,`translate(0,${_.top})`).call(A).call(e=>e.select(`.domain`).remove()).call(e=>e.selectAll(`text`).text(e=>a(e))).call(e=>e.selectAll(`.tick line`).clone().attr(`y2`,y-_.top-_.bottom).attr(`stroke-opacity`,.1));let P=N.append(`g`).attr(`stroke`,`#666`).attr(`stroke-width`,.5).selectAll(`g`).data(w).join(`g`).attr(`fill`,e=>t[e.key]).selectAll(`rect`).data(e=>e.data.filter(([e,t])=>e!==t)).join(`rect`).attr(`x`,([e,t])=>Math.min(O(e),O(t))).attr(`y`,({i:e})=>k(s[e])).attr(`width`,([e,t])=>Math.abs(O(e)-O(t))).attr(`height`,k.bandwidth()),F=Object.fromEntries(M(d,e=>C(e,e=>o[e]),e=>s[e])),I=({i:e})=>n(s[e],c[e],o[e],o[e]/F[s[e]]);P.append(`title`).text(e=>I(e).join(`\r
`)),P.on(`mouseover`,(e,t)=>T(I(t).join(`. `))),N.append(`g`).attr(`transform`,`translate(${O(0)},0)`).call(j);let R=Math.ceil(p.length/g),z=X/(R+.5),B=(e,t)=>t%R*z,ae=(e,t)=>B(e,t)+ge,V=(e,t)=>Math.floor(t/R)*20,H=N.append(`g`).attr(`stroke`,`#666`).attr(`stroke-width`,.5).attr(`dominant-baseline`,`central`).attr(`transform`,`translate(${_.left},${y-_.bottom+15})`);return H.selectAll(`circle`).data(p).join(`rect`).attr(`x`,B).attr(`y`,V).attr(`width`,10).attr(`height`,10).attr(`transform`,`translate(-5, -5)`).attr(`fill`,e=>t[e]),H.selectAll(`text`).data(p).join(`text`).attr(`x`,ae).attr(`y`,V).text(e=>e),N.node()}function de(e,n,r,i){let a=g(`chartsOverview__charts`),o=document.createElement(`figure`),c=document.createElement(`figcaption`);c.innerHTML=`
    <div>
      <strong>Figure ${a.childElementCount+1}</strong>. ${i}
    </div>
    <div>
      <button data-tip="Download chart data as a text file (.csv)" class="icon-download"></button>
      <button data-tip="Download the chart as a PNG image" class="icon-export"></button>
      <button data-tip="Download the chart in SVG format (vector, opens in a browser or Inkscape)" class="icon-chart-bar"></button>
      <button data-tip="Remove the chart" class="icon-trash"></button>
    </div>
  `,o.appendChild(c),o.appendChild(r),a.appendChild(o),o.querySelector(`button.icon-download`)?.addEventListener(`click`,()=>{let e=`${t(i)}.csv`,r=n.map(({name:e,group:t,value:n})=>`${e},${t},${n}`).join(`
`);s(`Name,Group,Value
`+r,e)}),o.querySelector(`button.icon-export`)?.addEventListener(`click`,()=>{let{width:e,height:n}=r.viewBox.baseVal,a=r.cloneNode(!0);a.setAttribute(`width`,String(e)),a.setAttribute(`height`,String(n));let o=new XMLSerializer().serializeToString(a),c=URL.createObjectURL(new Blob([o],{type:`image/svg+xml;charset=utf-8`})),l=new Image;l.onload=()=>{let r=document.createElement(`canvas`);r.width=e*2,r.height=n*2;let a=r.getContext(`2d`);a&&(a.fillStyle=`#fff`,a.fillRect(0,0,r.width,r.height),a.drawImage(l,0,0,r.width,r.height),r.toBlob(e=>e&&s(e,`${t(i)}.png`,`image/png`))),URL.revokeObjectURL(c)},l.src=c}),o.querySelector(`button.icon-chart-bar`)?.addEventListener(`click`,()=>{let e=`${t(i)}.svg`;s(r.outerHTML,e)}),o.querySelector(`button.icon-trash`)?.addEventListener(`click`,()=>{o.remove(),U=U.filter(t=>t.id!==e),q()})}function fe(){let e=g(`chartsOverview__viewColumns`).value,t=g(`chartsOverview__charts`);t.style.gridTemplateColumns=`repeat(${e}, 1fr)`,q()}function q(){$(`#chartsOverview`).dialog({position:{my:`center`,at:`center`,of:`svg`}})}function pe(){$(`#chartsOverview`).dialog(`destroy`),g(`chartsOverview`).remove(),document.getElementById(`chartsOverviewStyle`)?.remove()}var J=`#ccc`,Y=`no`,X=800,me=.2,he=7,ge=10;function _e(e){return c(e.map(e=>e.length))*he}function ve(e,t){if(!e.length)return 0;let n=ge+_e(e),r=Math.max(1,Math.floor(t/n));return Math.ceil(e.length/r)}function Z(e){return t=>pack[e][+t]?.name||Y}function Q(e){return()=>Object.fromEntries(pack[e].map(e=>[e.name||Y,e.color||J]))}function ye(e){return pack.biomes[+e]?.name||Y}function be(){return Object.fromEntries(pack.biomes.map(({name:e,color:t})=>[e,t]))}function xe(e){let t=Markets.get(+e);return t?t.name||pack.burgs[t.centerBurgId]?.name||`Market ${t.i}`:Y}function Se(){return Object.fromEntries((pack.markets||[]).map(e=>[xe(e.i),e.color||J]))}function Ce(e){return Goods.get(+e)?.name||Y}function we(){return Object.fromEntries((pack.goods||[]).map(e=>[e.name||Y,e.color||J]))}function Te(e,t){let n=Production.getCellProduction(e,t),r=pack.cells.burg[e];if(r){let e=Production.getBurgProduction(pack.burgs[r]);for(let[t,r]of Object.entries(e))n[+t]=(n[+t]||0)+r}return n}function Ee(e){let t=pack.cells.burg[e];return t?(pack.burgs[t].population||0)*populationRate*urbanization:0}function De(e){return pack.cells.pop[e]*populationRate}function Oe(e,t){if(t===`natural`)return e;if(t===`name`)return e.sort((e,t)=>e.name===t.name?e.group.localeCompare(t.group):t.name.localeCompare(e.name));if(t===`value`){let t={},n={};for(let{name:r,group:i,value:a}of e)t[r]=(t[r]||0)+a,n[i]=(n[i]||0)+a;return e.sort((e,r)=>e.name===r.name?n[r.group]-n[e.group]:t[e.name]-t[r.name])}return e}var ke={open:se};export{ke as ChartsOverview};