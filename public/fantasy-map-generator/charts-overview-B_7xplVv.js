import{C as e,It as t,Lt as n,N as r,Ot as i,S as a,an as o,c as s,cn as c,d as l,i as u,in as d,k as f,l as p,ln as m,n as h,r as g,t as _,un as v}from"./utils-QIQ6pakx.js";import{a as y,t as b}from"./linear-D95SaCXV.js";import{t as ee}from"./extent-V-JVJWfI.js";import{t as x}from"./mean-4Awewi9R.js";import{t as S}from"./sum-BpJJqxFM.js";import{n as te,r as ne}from"./axis-ChvWZg1j.js";import{n as C}from"./heightUtils-BfaaFPbS.js";import{r as w}from"./tooltips-C2LTs11V.js";import{t as T}from"./dialog-helpers-B3fYbuIJ.js";var E=class extends Map{constructor(e,t=A){if(super(),Object.defineProperties(this,{_intern:{value:new Map},_key:{value:t}}),e!=null)for(let[t,n]of e)this.set(t,n)}get(e){return super.get(D(this,e))}has(e){return super.has(D(this,e))}set(e,t){return super.set(O(this,e),t)}delete(e){return super.delete(k(this,e))}};function D({_intern:e,_key:t},n){let r=t(n);return e.has(r)?e.get(r):n}function O({_intern:e,_key:t},n){let r=t(n);return e.has(r)?e.get(r):(e.set(r,n),n)}function k({_intern:e,_key:t},n){let r=t(n);return e.has(r)&&(n=e.get(r),e.delete(r)),n}function A(e){return typeof e==`object`&&e?e.valueOf():e}function j(e,t,...n){return M(e,Array.from,t,n)}function M(e,t,n,r){return(function e(i,a){if(a>=r.length)return n(i);let o=new E,s=r[a++],c=-1;for(let e of i){let t=s(e,++c,i),n=o.get(t);n?n.push(e):o.set(t,[e])}for(let[t,n]of o)o.set(t,e(n,a));return t(o)})(e,0)}function re(e){return d(o(e).call(document.documentElement))}var N=Symbol(`implicit`);function P(){var e=new E,t=[],n=[],r=N;function i(i){let a=e.get(i);if(a===void 0){if(r!==N)return r;e.set(i,a=t.push(i)-1)}return n[a%n.length]}return i.domain=function(n){if(!arguments.length)return t.slice();t=[],e=new E;for(let r of n)e.has(r)||e.set(r,t.push(r)-1);return i},i.range=function(e){return arguments.length?(n=Array.from(e),i):n.slice()},i.unknown=function(e){return arguments.length?(r=e,i):r},i.copy=function(){return P(t,n).unknown(r)},y.apply(i,arguments),i}function ie(){var e=P().unknown(void 0),t=e.domain,n=e.range,r=0,i=1,a,o,s=!1,l=0,u=0,d=.5;delete e.unknown;function f(){var e=t().length,f=i<r,p=f?i:r,m=f?r:i;a=(m-p)/Math.max(1,e-l+u*2),s&&(a=Math.floor(a)),p+=(m-p-a*(e-l))*d,o=a*(1-l),s&&(p=Math.round(p),o=Math.round(o));var h=c(e).map(function(e){return p+a*e});return n(f?h.reverse():h)}return e.domain=function(e){return arguments.length?(t(e),f()):t()},e.range=function(e){return arguments.length?([r,i]=e,r=+r,i=+i,f()):[r,i]},e.rangeRound=function(e){return[r,i]=e,r=+r,i=+i,s=!0,f()},e.bandwidth=function(){return o},e.step=function(){return a},e.round=function(e){return arguments.length?(s=!!e,f()):s},e.padding=function(e){return arguments.length?(l=Math.min(1,u=+e),f()):l},e.paddingInner=function(e){return arguments.length?(l=Math.min(1,e),f()):l},e.paddingOuter=function(e){return arguments.length?(u=+e,f()):u},e.align=function(e){return arguments.length?(d=Math.max(0,Math.min(1,e)),f()):d},e.copy=function(){return ie(t(),[r,i]).round(s).paddingInner(l).paddingOuter(u).align(d)},y.apply(f(),arguments)}function F(e,t){if((o=e.length)>1)for(var n=1,r,i,a=e[t[0]],o,s=a.length;n<o;++n)for(i=a,a=e[t[n]],r=0;r<s;++r)a[r][1]+=a[r][0]=isNaN(i[r][1])?i[r][0]:i[r][1]}function I(e){for(var t=e.length,n=Array(t);--t>=0;)n[t]=t;return n}function L(e,t){return e[t]}function R(e){let t=[];return t.key=e,t}function ae(){var e=n([]),r=I,i=F,a=L;function o(n){var o=Array.from(e.apply(this,arguments),R),s,c=o.length,l=-1,u;for(let e of n)for(s=0,++l;s<c;++s)(o[s][l]=[0,+a(e,o[s].key,l,n)]).data=e;for(s=0,u=t(r(o));s<c;++s)o[u[s]].index=s;return i(o,u),o}return o.keys=function(t){return arguments.length?(e=typeof t==`function`?t:n(Array.from(t)),o):e},o.value=function(e){return arguments.length?(a=typeof e==`function`?e:n(+e),o):a},o.order=function(e){return arguments.length?(r=e==null?I:typeof e==`function`?e:n(Array.from(e)),o):r},o.offset=function(e){return arguments.length?(i=e??F,o):i},o}function z(e,t){if((r=e.length)>0){for(var n,r,i=0,a=e[0].length,o;i<a;++i){for(o=n=0;n<r;++n)o+=e[n][i][1]||0;if(o)for(n=0;n<r;++n)e[n][i][1]/=o}F(e,t)}}function oe(e,t){if((c=e.length)>0)for(var n,r=0,i,a,o,s,c,l=e[t[0]].length;r<l;++r)for(o=s=0,n=0;n<c;++n)(a=(i=e[t[n]][r])[1]-i[0])>0?(i[0]=o,i[1]=o+=a):a<0?(i[1]=s,i[0]=s+=a):(i[0]=0,i[1]=a)}var B={states:{label:`State`,getId:e=>pack.cells.state[e],getName:X(`states`),getColors:Z(`states`),landOnly:!0},cultures:{label:`Culture`,getId:e=>pack.cells.culture[e],getName:X(`cultures`),getColors:Z(`cultures`),landOnly:!0},religions:{label:`Religion`,getId:e=>pack.cells.religion[e],getName:X(`religions`),getColors:Z(`religions`),landOnly:!0},provinces:{label:`Province`,getId:e=>pack.cells.province[e],getName:X(`provinces`),getColors:Z(`provinces`),landOnly:!0},biomes:{label:`Biome`,getId:e=>pack.cells.biome[e],getName:be,getColors:xe,landOnly:!1},markets:{label:`Market`,getId:e=>pack.cells.market[e],getName:Se,getColors:Ce,landOnly:!1},goods:{label:`Good`,requires:`good`,getId:(e,t)=>t.good,getName:we,getColors:Te,landOnly:!1}},V={total_population:{label:`Total population`,quantize:e=>De(e)+Q(e),aggregate:e=>i(S(e)),formatTicks:e=>l(e),stringify:e=>e.toLocaleString(),stackable:!0,landOnly:!0},urban_population:{label:`Urban population`,quantize:De,aggregate:e=>i(S(e)),formatTicks:e=>l(e),stringify:e=>e.toLocaleString(),stackable:!0,landOnly:!0},rural_population:{label:`Rural population`,quantize:Q,aggregate:e=>i(S(e)),formatTicks:e=>l(e),stringify:e=>e.toLocaleString(),stackable:!0,landOnly:!0},area:{label:`Land area`,quantize:e=>g(pack.cells.area[e]),aggregate:e=>i(S(e)),formatTicks:e=>`${l(e)} ${u()}`,stringify:e=>`${e.toLocaleString()} ${u()}`,stackable:!0,landOnly:!0},cells:{label:`Cells`,hint:`Number of land cells`,quantize:()=>1,aggregate:e=>S(e),formatTicks:e=>e,stringify:e=>e.toLocaleString(),stackable:!0,landOnly:!0},burgs_number:{label:`Burgs`,hint:`Number of burgs`,quantize:e=>+!!pack.cells.burg[e],aggregate:e=>S(e),formatTicks:e=>e,stringify:e=>e.toLocaleString(),stackable:!0,landOnly:!0},average_elevation:{label:`Average elevation`,quantize:e=>pack.cells.h[e],aggregate:e=>x(e),formatTicks:e=>s(e),stringify:e=>s(e),stackable:!1,landOnly:!1},max_elevation:{label:`Maximum mean elevation`,quantize:e=>pack.cells.h[e],aggregate:e=>v(e),formatTicks:e=>s(e),stringify:e=>s(e),stackable:!1,landOnly:!1},min_elevation:{label:`Minimum mean elevation`,quantize:e=>pack.cells.h[e],aggregate:e=>m(e),formatTicks:e=>s(e),stringify:e=>s(e),stackable:!1,landOnly:!1},average_temperature:{label:`Annual mean temperature`,quantize:e=>grid.cells.temp[pack.cells.g[e]],aggregate:e=>x(e),formatTicks:e=>_(e),stringify:e=>_(e),stackable:!1,landOnly:!1},max_temperature:{label:`Annual max temperature`,hint:`Highest mean temperature of the year`,quantize:e=>grid.cells.temp[pack.cells.g[e]],aggregate:e=>v(e),formatTicks:e=>_(e),stringify:e=>_(e),stackable:!1,landOnly:!1},min_temperature:{label:`Annual min temperature`,hint:`Lowest mean temperature of the year`,quantize:e=>grid.cells.temp[pack.cells.g[e]],aggregate:e=>m(e),formatTicks:e=>_(e),stringify:e=>_(e),stackable:!1,landOnly:!1},average_precipitation:{label:`Annual mean precipitation`,quantize:e=>grid.cells.prec[pack.cells.g[e]],aggregate:e=>i(x(e)),formatTicks:e=>p(i(e)),stringify:e=>p(i(e)),stackable:!1,landOnly:!0},max_precipitation:{label:`Annual max precipitation`,hint:`Highest mean precipitation of the year`,quantize:e=>grid.cells.prec[pack.cells.g[e]],aggregate:e=>i(v(e)),formatTicks:e=>p(i(e)),stringify:e=>p(i(e)),stackable:!1,landOnly:!0},min_precipitation:{label:`Annual min precipitation`,hint:`Lowest mean precipitation of the year`,quantize:e=>grid.cells.prec[pack.cells.g[e]],aggregate:e=>i(m(e)),formatTicks:e=>p(i(e)),stringify:e=>p(i(e)),stackable:!1,landOnly:!0},coastal_cells:{label:`Number of coastal cells`,quantize:e=>+(pack.cells.t[e]===1),aggregate:e=>S(e),formatTicks:e=>e,stringify:e=>e.toLocaleString(),stackable:!0,landOnly:!0},river_cells:{label:`Number of river cells`,quantize:e=>+!!pack.cells.r[e],aggregate:e=>S(e),formatTicks:e=>e,stringify:e=>e.toLocaleString(),stackable:!0,landOnly:!0},production_value:{label:`Production value`,hint:`Worth of produced goods`,provides:[`good`],prepare:()=>({biomeProduction:Goods.getBiomesProduction()}),getContributions:(e,{biomeProduction:t})=>{let n=Ee(e,t),r=[];for(let[e,t]of Object.entries(n)){let n=Goods.get(+e);n&&r.push({good:+e,value:t*n.value})}return r},aggregate:e=>i(S(e)),formatTicks:e=>l(e),stringify:e=>h(e),stackable:!0,landOnly:!0},production_units:{label:`Production volume`,hint:`Units of goods produced`,provides:[`good`],prepare:()=>({biomeProduction:Goods.getBiomesProduction()}),getContributions:(e,{biomeProduction:t})=>{let n=Ee(e,t),r=[];for(let[e,t]of Object.entries(n))r.push({good:+e,value:t});return r},aggregate:e=>i(S(e)),formatTicks:e=>l(e),stringify:e=>`${e.toLocaleString()} units`,stackable:!0,landOnly:!0},burgs_profit:{label:`Burgs profit`,hint:`Burgs profit from trade and manufacturing`,quantize:e=>{let t=pack.cells.burg[e];return t&&pack.burgs[t].product||0},aggregate:e=>i(S(e)),formatTicks:e=>l(e),stringify:e=>h(e),stackable:!0,landOnly:!0}},se={stackedBar:{offset:oe},normalizedStackedBar:{offset:z,formatX:e=>`${i(e*100)}%`}},H=[],U;function ce(){if(le(),pe(),W(),T(`#chartsOverview, .stable`),U!==mapId&&(H=[],U=mapId),!H.length)G();else for(let e of H)ue(e);$(`#chartsOverview`).dialog({title:`Data Charts`,width:`60vw`,height:`auto`,position:{my:`center`,at:`center`,of:`svg`},close:me})}function le(){document.getElementById(`chartsOverview`)?.remove();let e=Object.entries(B).map(([e,{label:t}])=>[e,t]),t=Object.entries(V).map(([e,{label:t}])=>[e,t]),n=([e,t])=>`<option value="${e}">${t}</option>`,r=e=>e.map(n).join(``),i=`<div id="chartsOverview" class="dialog stable">
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
  </div>`;f(`dialogs`).insertAdjacentHTML(`beforeend`,i),f(`chartsOverview__entitiesSelect`).value=`states`,f(`chartsOverview__plotBySelect`).value=`total_population`,f(`chartsOverview__groupBySelect`).value=`cultures`,f(`chartsOverview__form`).addEventListener(`submit`,G),f(`chartsOverview__viewColumns`).addEventListener(`change`,pe),f(`chartsOverview__plotBySelect`).addEventListener(`change`,W),document.getElementById(`chartsOverviewStyle`)?.remove();let a=document.createElement(`style`);a.id=`chartsOverviewStyle`,a.textContent=`
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
  `,document.head.appendChild(a)}function W(){let e=f(`chartsOverview__plotBySelect`).value,t=f(`chartsOverview__plotByInfo`),{hint:n}=V[e];n?(t.dataset.tip=n,t.style.display=``):t.style.display=`none`}function G(e){e&&e.preventDefault();let t=f(`chartsOverview__entitiesSelect`).value,n=f(`chartsOverview__plotBySelect`).value,r=f(`chartsOverview__groupBySelect`).value,i=f(`chartsOverview__sortingSelect`).value,a=f(`chartsOverview__chartType`).value,o=f(`chartsOverview__excludeNeutral`).checked,{label:s,stackable:c,provides:l=[]}=V[n],u=[t,r].find(e=>{let t=B[e].requires;return t?!l.includes(t):!1});if(u){w(`${s} cannot be broken down by ${B[u].label.toLowerCase()}`,!1,`error`,4e3);return}!c&&r!==t&&(w(`Grouping is not supported for ${n}`,!1,`warn`,4e3),r=t);let d={id:Date.now(),entity:t,plotBy:n,groupBy:r,sorting:i,type:a,excludeNeutral:o};H.push(d),ue(d),K()}function ue({id:e,entity:t,plotBy:n,groupBy:a,sorting:o,type:s,excludeNeutral:c}){let{label:l,stringify:u,quantize:d,getContributions:p,prepare:m,aggregate:h,formatTicks:g,landOnly:_}=V[n],v=a===t,{label:y,getName:b,getId:ee,landOnly:x}=B[t],{label:S,getName:te,getId:ne,getColors:w}=B[a],T=m?m():void 0,E=p?e=>p(e,T):e=>[{value:d(e)}],D=`${r(t)} by ${l}${v?``:` grouped by ${S}`}`,O=(e,t,n,r)=>{let a=`${y}: ${e}`,o=v?``:`${S}: ${t}`,s=`${l}: ${u(n)}`;return v||(s+=` (${i(r*100)}%)`),[a,o,s].filter(Boolean)},k={},A=new Set;for(let e of pack.cells.i)if(!((x||_)&&C(e,pack)))for(let t of E(e)){let n=ee(e,t),r=ne(e,t);if(c&&(n===0||r===0))continue;let{value:i}=t;k[n]?k[n][r]?k[n][r].push(i):k[n][r]=[i]:k[n]={[r]:[i]},A.add(r)}let j=Oe(Object.entries(k).flatMap(([e,t])=>{let n=b(e);return Object.entries(t).map(([e,t])=>{let r=te(e),i=h(t);return{name:n,group:r,value:i}})}),o),M=w(),{offset:re,formatX:N=g}=se[s];fe(e,j,de(j,{colors:M,tooltip:O,offset:re,formatX:N}),D),f(`chartsOverview__charts`).lastElementChild?.scrollIntoView()}function de(e,{colors:t,tooltip:n,offset:r,formatX:i}){let a=e.map(e=>e.value),o=e.map(e=>e.name),s=e.map(e=>e.group),l=new Set(o),u=new Set(s),d=c(a.length).filter(e=>l.has(o[e])&&u.has(s[e])),f=Array.from(l),p=Array.from(u),m=ve(f),h=ye(p,Y-m-15),g={top:30,right:15,bottom:h*20+10,left:m},_=[g.left,Y-g.right],v=l.size*25+g.top+g.bottom,y=[v-g.bottom,g.top],x=j(d,([e])=>e,e=>o[e],e=>s[e]),C=ae().keys(p).value(([,e],t)=>a[new Map(e).get(t)]).order(I).offset(r)(x).map(e=>{let t=e.filter(e=>!Number.isNaN(e[1])).map(t=>Object.assign(t,{i:new Map(t.data[1]).get(e.key)}));return{key:e.key,data:t}}),T=C.flatMap(e=>e.data.flatMap(e=>[e[0],e[1]])),E=ee(T),D=b(E,_),O=ie(f,y).paddingInner(he),k=ne(D).ticks(Y/80,null),A=te(O).tickSizeOuter(0),M=re(`svg`).attr(`version`,`1.1`).attr(`xmlns`,`http://www.w3.org/2000/svg`).attr(`viewBox`,`0 0 ${Y} ${v}`).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`);M.append(`g`).attr(`transform`,`translate(0,${g.top})`).call(k).call(e=>e.select(`.domain`).remove()).call(e=>e.selectAll(`text`).text(e=>i(e))).call(e=>e.selectAll(`.tick line`).clone().attr(`y2`,v-g.top-g.bottom).attr(`stroke-opacity`,.1));let N=M.append(`g`).attr(`stroke`,`#66666d`).attr(`stroke-width`,.5).selectAll(`g`).data(C).join(`g`).attr(`fill`,e=>t[e.key]).selectAll(`rect`).data(e=>e.data.filter(([e,t])=>e!==t)).join(`rect`).attr(`x`,([e,t])=>Math.min(D(e),D(t))).attr(`y`,({i:e})=>O(o[e])).attr(`width`,([e,t])=>Math.abs(D(e)-D(t))).attr(`height`,O.bandwidth()),P=Object.fromEntries(j(d,e=>S(e,e=>a[e]),e=>o[e])),F=({i:e})=>n(o[e],s[e],a[e],a[e]/P[o[e]]);N.append(`title`).text(e=>F(e).join(`\r
`)),N.on(`mouseover`,(e,t)=>w(F(t).join(`. `))),M.append(`g`).attr(`transform`,`translate(${D(0)},0)`).call(A);let L=Math.ceil(p.length/h),R=Y/(L+.5),z=(e,t)=>t%L*R,oe=(e,t)=>z(e,t)+_e,B=(e,t)=>Math.floor(t/L)*20,V=M.append(`g`).attr(`stroke`,`#66666d`).attr(`stroke-width`,.5).attr(`dominant-baseline`,`central`).attr(`transform`,`translate(${g.left},${v-g.bottom+15})`);return V.selectAll(`circle`).data(p).join(`rect`).attr(`x`,z).attr(`y`,B).attr(`width`,10).attr(`height`,10).attr(`transform`,`translate(-5, -5)`).attr(`fill`,e=>t[e]),V.selectAll(`text`).data(p).join(`text`).attr(`x`,oe).attr(`y`,B).text(e=>e),M.node()}function fe(t,n,r,i){let o=f(`chartsOverview__charts`),s=document.createElement(`figure`),c=document.createElement(`figcaption`);c.innerHTML=`
    <div>
      <strong>Figure ${o.childElementCount+1}</strong>. ${i}
    </div>
    <div>
      <button data-tip="Download chart data as a text file (.csv)" class="icon-download"></button>
      <button data-tip="Download the chart as a PNG image" class="icon-export"></button>
      <button data-tip="Download the chart in SVG format (vector, opens in a browser or Inkscape)" class="icon-chart-bar"></button>
      <button data-tip="Remove the chart" class="icon-trash"></button>
    </div>
  `,s.appendChild(c),s.appendChild(r),o.appendChild(s),s.querySelector(`button.icon-download`)?.addEventListener(`click`,()=>{let t=`${e(i)}.csv`,r=n.map(({name:e,group:t,value:n})=>`${e},${t},${n}`).join(`
`);a(`Name,Group,Value
`+r,t)}),s.querySelector(`button.icon-export`)?.addEventListener(`click`,()=>{let{width:t,height:n}=r.viewBox.baseVal,o=r.cloneNode(!0);o.setAttribute(`width`,String(t)),o.setAttribute(`height`,String(n));let s=new XMLSerializer().serializeToString(o),c=URL.createObjectURL(new Blob([s],{type:`image/svg+xml;charset=utf-8`})),l=new Image;l.onload=()=>{let r=document.createElement(`canvas`);r.width=t*2,r.height=n*2;let o=r.getContext(`2d`);o&&(o.fillStyle=`#ffffff`,o.fillRect(0,0,r.width,r.height),o.drawImage(l,0,0,r.width,r.height),r.toBlob(t=>t&&a(t,`${e(i)}.png`,`image/png`))),URL.revokeObjectURL(c)},l.src=c}),s.querySelector(`button.icon-chart-bar`)?.addEventListener(`click`,()=>{let t=`${e(i)}.svg`;a(r.outerHTML,t)}),s.querySelector(`button.icon-trash`)?.addEventListener(`click`,()=>{s.remove(),H=H.filter(e=>e.id!==t),K()})}function pe(){let e=f(`chartsOverview__viewColumns`).value,t=f(`chartsOverview__charts`);t.style.gridTemplateColumns=`repeat(${e}, 1fr)`,K()}function K(){$(`#chartsOverview`).dialog({position:{my:`center`,at:`center`,of:`svg`}})}function me(){$(`#chartsOverview`).dialog(`destroy`),f(`chartsOverview`).remove(),document.getElementById(`chartsOverviewStyle`)?.remove()}var q=`#b5b5ba`,J=`no`,Y=800,he=.2,ge=7,_e=10;function ve(e){return v(e.map(e=>e.length))*ge}function ye(e,t){if(!e.length)return 0;let n=_e+ve(e),r=Math.max(1,Math.floor(t/n));return Math.ceil(e.length/r)}function X(e){return t=>pack[e][+t]?.name||J}function Z(e){return()=>Object.fromEntries(pack[e].map(e=>[e.name||J,e.color||q]))}function be(e){return pack.biomes[+e]?.name||J}function xe(){return Object.fromEntries(pack.biomes.map(({name:e,color:t})=>[e,t]))}function Se(e){let t=Markets.get(+e);return t?t.name||pack.burgs[t.centerBurgId]?.name||`Market ${t.i}`:J}function Ce(){return Object.fromEntries((pack.markets||[]).map(e=>[Se(e.i),e.color||q]))}function we(e){return Goods.get(+e)?.name||J}function Te(){return Object.fromEntries((pack.goods||[]).map(e=>[e.name||J,e.color||q]))}function Ee(e,t){let n=Production.getCellProduction(e,t),r=pack.cells.burg[e];if(r){let e=Production.getBurgProduction(pack.burgs[r]);for(let[t,r]of Object.entries(e))n[+t]=(n[+t]||0)+r}return n}function De(e){let t=pack.cells.burg[e];return t?(pack.burgs[t].population||0)*populationRate*urbanization:0}function Q(e){return pack.cells.pop[e]*populationRate}function Oe(e,t){if(t===`natural`)return e;if(t===`name`)return e.sort((e,t)=>e.name===t.name?e.group.localeCompare(t.group):t.name.localeCompare(e.name));if(t===`value`){let t={},n={};for(let{name:r,group:i,value:a}of e)t[r]=(t[r]||0)+a,n[i]=(n[i]||0)+a;return e.sort((e,r)=>e.name===r.name?n[r.group]-n[e.group]:t[e.name]-t[r.name])}return e}var ke={open:ce};export{ke as ChartsOverview};