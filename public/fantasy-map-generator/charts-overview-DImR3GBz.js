import{C as e,It as t,N as n,Nt as r,Pt as i,S as a,Tt as o,c as s,d as c,dn as l,gn as u,hn as d,i as f,k as p,l as m,mn as h,n as g,r as _,t as v,un as y,zt as b}from"./utils-omhVlsRt.js";import{t as ee}from"./extent-V-JVJWfI.js";import{t as x}from"./mean-4Awewi9R.js";import{t as S}from"./sum-BpJJqxFM.js";import{n as te,r as C}from"./axis-ChvWZg1j.js";import{n as w}from"./heightUtils-BfaaFPbS.js";import{r as T}from"./tooltips-BQ3W48fB.js";import{t as E}from"./dialog-helpers-CdcIkxap.js";var D=class extends Map{constructor(e,t=j){if(super(),Object.defineProperties(this,{_intern:{value:new Map},_key:{value:t}}),e!=null)for(let[t,n]of e)this.set(t,n)}get(e){return super.get(O(this,e))}has(e){return super.has(O(this,e))}set(e,t){return super.set(k(this,e),t)}delete(e){return super.delete(A(this,e))}};function O({_intern:e,_key:t},n){let r=t(n);return e.has(r)?e.get(r):n}function k({_intern:e,_key:t},n){let r=t(n);return e.has(r)?e.get(r):(e.set(r,n),n)}function A({_intern:e,_key:t},n){let r=t(n);return e.has(r)&&(n=e.get(r),e.delete(r)),n}function j(e){return typeof e==`object`&&e?e.valueOf():e}function M(e,t,...n){return N(e,Array.from,t,n)}function N(e,t,n,r){return(function e(i,a){if(a>=r.length)return n(i);let o=new D,s=r[a++],c=-1;for(let e of i){let t=s(e,++c,i),n=o.get(t);n?n.push(e):o.set(t,[e])}for(let[t,n]of o)o.set(t,e(n,a));return t(o)})(e,0)}function ne(e){return y(l(e).call(document.documentElement))}var P=Symbol(`implicit`);function F(){var e=new D,t=[],n=[],r=P;function i(i){let a=e.get(i);if(a===void 0){if(r!==P)return r;e.set(i,a=t.push(i)-1)}return n[a%n.length]}return i.domain=function(n){if(!arguments.length)return t.slice();t=[],e=new D;for(let r of n)e.has(r)||e.set(r,t.push(r)-1);return i},i.range=function(e){return arguments.length?(n=Array.from(e),i):n.slice()},i.unknown=function(e){return arguments.length?(r=e,i):r},i.copy=function(){return F(t,n).unknown(r)},b.apply(i,arguments),i}function I(){var e=F().unknown(void 0),t=e.domain,n=e.range,r=0,i=1,a,o,s=!1,c=0,l=0,u=.5;delete e.unknown;function d(){var e=t().length,d=i<r,f=d?i:r,p=d?r:i;a=(p-f)/Math.max(1,e-c+l*2),s&&(a=Math.floor(a)),f+=(p-f-a*(e-c))*u,o=a*(1-c),s&&(f=Math.round(f),o=Math.round(o));var m=h(e).map(function(e){return f+a*e});return n(d?m.reverse():m)}return e.domain=function(e){return arguments.length?(t(e),d()):t()},e.range=function(e){return arguments.length?([r,i]=e,r=+r,i=+i,d()):[r,i]},e.rangeRound=function(e){return[r,i]=e,r=+r,i=+i,s=!0,d()},e.bandwidth=function(){return o},e.step=function(){return a},e.round=function(e){return arguments.length?(s=!!e,d()):s},e.padding=function(e){return arguments.length?(c=Math.min(1,l=+e),d()):c},e.paddingInner=function(e){return arguments.length?(c=Math.min(1,e),d()):c},e.paddingOuter=function(e){return arguments.length?(l=+e,d()):l},e.align=function(e){return arguments.length?(u=Math.max(0,Math.min(1,e)),d()):u},e.copy=function(){return I(t(),[r,i]).round(s).paddingInner(c).paddingOuter(l).align(u)},b.apply(d(),arguments)}function L(e,t){if((o=e.length)>1)for(var n=1,r,i,a=e[t[0]],o,s=a.length;n<o;++n)for(i=a,a=e[t[n]],r=0;r<s;++r)a[r][1]+=a[r][0]=isNaN(i[r][1])?i[r][0]:i[r][1]}function R(e){for(var t=e.length,n=Array(t);--t>=0;)n[t]=t;return n}function z(e,t){return e[t]}function re(e){let t=[];return t.key=e,t}function ie(){var e=i([]),t=R,n=L,a=z;function o(i){var o=Array.from(e.apply(this,arguments),re),s,c=o.length,l=-1,u;for(let e of i)for(s=0,++l;s<c;++s)(o[s][l]=[0,+a(e,o[s].key,l,i)]).data=e;for(s=0,u=r(t(o));s<c;++s)o[u[s]].index=s;return n(o,u),o}return o.keys=function(t){return arguments.length?(e=typeof t==`function`?t:i(Array.from(t)),o):e},o.value=function(e){return arguments.length?(a=typeof e==`function`?e:i(+e),o):a},o.order=function(e){return arguments.length?(t=e==null?R:typeof e==`function`?e:i(Array.from(e)),o):t},o.offset=function(e){return arguments.length?(n=e??L,o):n},o}function B(e,t){if((r=e.length)>0){for(var n,r,i=0,a=e[0].length,o;i<a;++i){for(o=n=0;n<r;++n)o+=e[n][i][1]||0;if(o)for(n=0;n<r;++n)e[n][i][1]/=o}L(e,t)}}function ae(e,t){if((c=e.length)>0)for(var n,r=0,i,a,o,s,c,l=e[t[0]].length;r<l;++r)for(o=s=0,n=0;n<c;++n)(a=(i=e[t[n]][r])[1]-i[0])>0?(i[0]=o,i[1]=o+=a):a<0?(i[1]=s,i[0]=s+=a):(i[0]=0,i[1]=a)}var V={states:{label:`State`,getId:e=>pack.cells.state[e],getName:Z(`states`),getColors:Q(`states`),landOnly:!0},cultures:{label:`Culture`,getId:e=>pack.cells.culture[e],getName:Z(`cultures`),getColors:Q(`cultures`),landOnly:!0},religions:{label:`Religion`,getId:e=>pack.cells.religion[e],getName:Z(`religions`),getColors:Q(`religions`),landOnly:!0},provinces:{label:`Province`,getId:e=>pack.cells.province[e],getName:Z(`provinces`),getColors:Q(`provinces`),landOnly:!0},biomes:{label:`Biome`,getId:e=>pack.cells.biome[e],getName:ye,getColors:be,landOnly:!1},markets:{label:`Market`,getId:e=>pack.cells.market[e],getName:xe,getColors:Se,landOnly:!1},goods:{label:`Good`,requires:`good`,getId:(e,t)=>t.good,getName:Ce,getColors:we,landOnly:!1}},H={total_population:{label:`Total population`,quantize:e=>Ee(e)+De(e),aggregate:e=>o(S(e)),formatTicks:e=>c(e),stringify:e=>e.toLocaleString(),stackable:!0,landOnly:!0},urban_population:{label:`Urban population`,quantize:Ee,aggregate:e=>o(S(e)),formatTicks:e=>c(e),stringify:e=>e.toLocaleString(),stackable:!0,landOnly:!0},rural_population:{label:`Rural population`,quantize:De,aggregate:e=>o(S(e)),formatTicks:e=>c(e),stringify:e=>e.toLocaleString(),stackable:!0,landOnly:!0},area:{label:`Land area`,quantize:e=>_(pack.cells.area[e]),aggregate:e=>o(S(e)),formatTicks:e=>`${c(e)} ${f()}`,stringify:e=>`${e.toLocaleString()} ${f()}`,stackable:!0,landOnly:!0},cells:{label:`Cells`,hint:`Number of land cells`,quantize:()=>1,aggregate:e=>S(e),formatTicks:e=>e,stringify:e=>e.toLocaleString(),stackable:!0,landOnly:!0},burgs_number:{label:`Burgs`,hint:`Number of burgs`,quantize:e=>+!!pack.cells.burg[e],aggregate:e=>S(e),formatTicks:e=>e,stringify:e=>e.toLocaleString(),stackable:!0,landOnly:!0},average_elevation:{label:`Average elevation`,quantize:e=>pack.cells.h[e],aggregate:e=>x(e),formatTicks:e=>s(e),stringify:e=>s(e),stackable:!1,landOnly:!1},max_elevation:{label:`Maximum mean elevation`,quantize:e=>pack.cells.h[e],aggregate:e=>u(e),formatTicks:e=>s(e),stringify:e=>s(e),stackable:!1,landOnly:!1},min_elevation:{label:`Minimum mean elevation`,quantize:e=>pack.cells.h[e],aggregate:e=>d(e),formatTicks:e=>s(e),stringify:e=>s(e),stackable:!1,landOnly:!1},average_temperature:{label:`Annual mean temperature`,quantize:e=>grid.cells.temp[pack.cells.g[e]],aggregate:e=>x(e),formatTicks:e=>v(e),stringify:e=>v(e),stackable:!1,landOnly:!1},max_temperature:{label:`Annual max temperature`,hint:`Highest mean temperature of the year`,quantize:e=>grid.cells.temp[pack.cells.g[e]],aggregate:e=>u(e),formatTicks:e=>v(e),stringify:e=>v(e),stackable:!1,landOnly:!1},min_temperature:{label:`Annual min temperature`,hint:`Lowest mean temperature of the year`,quantize:e=>grid.cells.temp[pack.cells.g[e]],aggregate:e=>d(e),formatTicks:e=>v(e),stringify:e=>v(e),stackable:!1,landOnly:!1},average_precipitation:{label:`Annual mean precipitation`,quantize:e=>grid.cells.prec[pack.cells.g[e]],aggregate:e=>o(x(e)),formatTicks:e=>m(o(e)),stringify:e=>m(o(e)),stackable:!1,landOnly:!0},max_precipitation:{label:`Annual max precipitation`,hint:`Highest mean precipitation of the year`,quantize:e=>grid.cells.prec[pack.cells.g[e]],aggregate:e=>o(u(e)),formatTicks:e=>m(o(e)),stringify:e=>m(o(e)),stackable:!1,landOnly:!0},min_precipitation:{label:`Annual min precipitation`,hint:`Lowest mean precipitation of the year`,quantize:e=>grid.cells.prec[pack.cells.g[e]],aggregate:e=>o(d(e)),formatTicks:e=>m(o(e)),stringify:e=>m(o(e)),stackable:!1,landOnly:!0},coastal_cells:{label:`Number of coastal cells`,quantize:e=>+(pack.cells.t[e]===1),aggregate:e=>S(e),formatTicks:e=>e,stringify:e=>e.toLocaleString(),stackable:!0,landOnly:!0},river_cells:{label:`Number of river cells`,quantize:e=>+!!pack.cells.r[e],aggregate:e=>S(e),formatTicks:e=>e,stringify:e=>e.toLocaleString(),stackable:!0,landOnly:!0},production_value:{label:`Production value`,hint:`Worth of produced goods`,provides:[`good`],prepare:()=>({biomeProduction:Goods.getBiomesProduction()}),getContributions:(e,{biomeProduction:t})=>{let n=Te(e,t),r=[];for(let[e,t]of Object.entries(n)){let n=Goods.get(+e);n&&r.push({good:+e,value:t*n.value})}return r},aggregate:e=>o(S(e)),formatTicks:e=>c(e),stringify:e=>g(e),stackable:!0,landOnly:!0},production_units:{label:`Production volume`,hint:`Units of goods produced`,provides:[`good`],prepare:()=>({biomeProduction:Goods.getBiomesProduction()}),getContributions:(e,{biomeProduction:t})=>{let n=Te(e,t),r=[];for(let[e,t]of Object.entries(n))r.push({good:+e,value:t});return r},aggregate:e=>o(S(e)),formatTicks:e=>c(e),stringify:e=>`${e.toLocaleString()} units`,stackable:!0,landOnly:!0},burgs_profit:{label:`Burgs profit`,hint:`Burgs profit from trade and manufacturing`,quantize:e=>{let t=pack.cells.burg[e];return t&&pack.burgs[t].product||0},aggregate:e=>o(S(e)),formatTicks:e=>c(e),stringify:e=>g(e),stackable:!0,landOnly:!0}},oe={stackedBar:{offset:ae},normalizedStackedBar:{offset:B,formatX:e=>`${o(e*100)}%`}},U=[],W;function se(){if(ce(),fe(),G(),E(`#chartsOverview, .stable`),W!==mapId&&(U=[],W=mapId),!U.length)K();else for(let e of U)le(e);$(`#chartsOverview`).dialog({title:`Data Charts`,width:`60vw`,height:`auto`,position:{my:`center`,at:`center`,of:`svg`},close:pe})}function ce(){document.getElementById(`chartsOverview`)?.remove();let e=Object.entries(V).map(([e,{label:t}])=>[e,t]),t=Object.entries(H).map(([e,{label:t}])=>[e,t]),n=([e,t])=>`<option value="${e}">${t}</option>`,r=e=>e.map(n).join(``),i=`<div id="chartsOverview" class="dialog stable">
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
  </div>`;p(`dialogs`).insertAdjacentHTML(`beforeend`,i),p(`chartsOverview__entitiesSelect`).value=`states`,p(`chartsOverview__plotBySelect`).value=`total_population`,p(`chartsOverview__groupBySelect`).value=`cultures`,p(`chartsOverview__form`).addEventListener(`submit`,K),p(`chartsOverview__viewColumns`).addEventListener(`change`,fe),p(`chartsOverview__plotBySelect`).addEventListener(`change`,G),document.getElementById(`chartsOverviewStyle`)?.remove();let a=document.createElement(`style`);a.id=`chartsOverviewStyle`,a.textContent=`
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
  `,document.head.appendChild(a)}function G(){let e=p(`chartsOverview__plotBySelect`).value,t=p(`chartsOverview__plotByInfo`),{hint:n}=H[e];n?(t.dataset.tip=n,t.style.display=``):t.style.display=`none`}function K(e){e&&e.preventDefault();let t=p(`chartsOverview__entitiesSelect`).value,n=p(`chartsOverview__plotBySelect`).value,r=p(`chartsOverview__groupBySelect`).value,i=p(`chartsOverview__sortingSelect`).value,a=p(`chartsOverview__chartType`).value,o=p(`chartsOverview__excludeNeutral`).checked,{label:s,stackable:c,provides:l=[]}=H[n],u=[t,r].find(e=>{let t=V[e].requires;return t?!l.includes(t):!1});if(u){T(`${s} cannot be broken down by ${V[u].label.toLowerCase()}`,!1,`error`,4e3);return}!c&&r!==t&&(T(`Grouping is not supported for ${n}`,!1,`warn`,4e3),r=t);let d={id:Date.now(),entity:t,plotBy:n,groupBy:r,sorting:i,type:a,excludeNeutral:o};U.push(d),le(d),q()}function le({id:e,entity:t,plotBy:r,groupBy:i,sorting:a,type:s,excludeNeutral:c}){let{label:l,stringify:u,quantize:d,getContributions:f,prepare:m,aggregate:h,formatTicks:g,landOnly:_}=H[r],v=i===t,{label:y,getName:b,getId:ee,landOnly:x}=V[t],{label:S,getName:te,getId:C,getColors:T}=V[i],E=m?m():void 0,D=f?e=>f(e,E):e=>[{value:d(e)}],O=`${n(t)} by ${l}${v?``:` grouped by ${S}`}`,k=(e,t,n,r)=>{let i=`${y}: ${e}`,a=v?``:`${S}: ${t}`,s=`${l}: ${u(n)}`;return v||(s+=` (${o(r*100)}%)`),[i,a,s].filter(Boolean)},A={},j=new Set;for(let e of pack.cells.i)if(!((x||_)&&w(e,pack)))for(let t of D(e)){let n=ee(e,t),r=C(e,t);if(c&&(n===0||r===0))continue;let{value:i}=t;A[n]?A[n][r]?A[n][r].push(i):A[n][r]=[i]:A[n]={[r]:[i]},j.add(r)}let M=Oe(Object.entries(A).flatMap(([e,t])=>{let n=b(e);return Object.entries(t).map(([e,t])=>{let r=te(e),i=h(t);return{name:n,group:r,value:i}})}),a),N=T(),{offset:ne,formatX:P=g}=oe[s];de(e,M,ue(M,{colors:N,tooltip:k,offset:ne,formatX:P}),O),p(`chartsOverview__charts`).lastElementChild?.scrollIntoView()}function ue(e,{colors:n,tooltip:r,offset:i,formatX:a}){let o=e.map(e=>e.value),s=e.map(e=>e.name),c=e.map(e=>e.group),l=new Set(s),u=new Set(c),d=h(o.length).filter(e=>l.has(s[e])&&u.has(c[e])),f=Array.from(l),p=Array.from(u),m=_e(f),g=ve(p,X-m-15),_={top:30,right:15,bottom:g*20+10,left:m},v=[_.left,X-_.right],y=l.size*25+_.top+_.bottom,b=[y-_.bottom,_.top],x=M(d,([e])=>e,e=>s[e],e=>c[e]),w=ie().keys(p).value(([,e],t)=>o[new Map(e).get(t)]).order(R).offset(i)(x).map(e=>{let t=e.filter(e=>!Number.isNaN(e[1])).map(t=>Object.assign(t,{i:new Map(t.data[1]).get(e.key)}));return{key:e.key,data:t}}),E=w.flatMap(e=>e.data.flatMap(e=>[e[0],e[1]])),D=ee(E),O=t(D,v),k=I(f,b).paddingInner(me),A=C(O).ticks(X/80,null),j=te(k).tickSizeOuter(0),N=ne(`svg`).attr(`version`,`1.1`).attr(`xmlns`,`http://www.w3.org/2000/svg`).attr(`viewBox`,`0 0 ${X} ${y}`).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`);N.append(`g`).attr(`transform`,`translate(0,${_.top})`).call(A).call(e=>e.select(`.domain`).remove()).call(e=>e.selectAll(`text`).text(e=>a(e))).call(e=>e.selectAll(`.tick line`).clone().attr(`y2`,y-_.top-_.bottom).attr(`stroke-opacity`,.1));let P=N.append(`g`).attr(`stroke`,`#666`).attr(`stroke-width`,.5).selectAll(`g`).data(w).join(`g`).attr(`fill`,e=>n[e.key]).selectAll(`rect`).data(e=>e.data.filter(([e,t])=>e!==t)).join(`rect`).attr(`x`,([e,t])=>Math.min(O(e),O(t))).attr(`y`,({i:e})=>k(s[e])).attr(`width`,([e,t])=>Math.abs(O(e)-O(t))).attr(`height`,k.bandwidth()),F=Object.fromEntries(M(d,e=>S(e,e=>o[e]),e=>s[e])),L=({i:e})=>r(s[e],c[e],o[e],o[e]/F[s[e]]);P.append(`title`).text(e=>L(e).join(`\r
`)),P.on(`mouseover`,(e,t)=>T(L(t).join(`. `))),N.append(`g`).attr(`transform`,`translate(${O(0)},0)`).call(j);let z=Math.ceil(p.length/g),re=X/(z+.5),B=(e,t)=>t%z*re,ae=(e,t)=>B(e,t)+ge,V=(e,t)=>Math.floor(t/z)*20,H=N.append(`g`).attr(`stroke`,`#666`).attr(`stroke-width`,.5).attr(`dominant-baseline`,`central`).attr(`transform`,`translate(${_.left},${y-_.bottom+15})`);return H.selectAll(`circle`).data(p).join(`rect`).attr(`x`,B).attr(`y`,V).attr(`width`,10).attr(`height`,10).attr(`transform`,`translate(-5, -5)`).attr(`fill`,e=>n[e]),H.selectAll(`text`).data(p).join(`text`).attr(`x`,ae).attr(`y`,V).text(e=>e),N.node()}function de(t,n,r,i){let o=p(`chartsOverview__charts`),s=document.createElement(`figure`),c=document.createElement(`figcaption`);c.innerHTML=`
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
`+r,t)}),s.querySelector(`button.icon-export`)?.addEventListener(`click`,()=>{let{width:t,height:n}=r.viewBox.baseVal,o=r.cloneNode(!0);o.setAttribute(`width`,String(t)),o.setAttribute(`height`,String(n));let s=new XMLSerializer().serializeToString(o),c=URL.createObjectURL(new Blob([s],{type:`image/svg+xml;charset=utf-8`})),l=new Image;l.onload=()=>{let r=document.createElement(`canvas`);r.width=t*2,r.height=n*2;let o=r.getContext(`2d`);o&&(o.fillStyle=`#fff`,o.fillRect(0,0,r.width,r.height),o.drawImage(l,0,0,r.width,r.height),r.toBlob(t=>t&&a(t,`${e(i)}.png`,`image/png`))),URL.revokeObjectURL(c)},l.src=c}),s.querySelector(`button.icon-chart-bar`)?.addEventListener(`click`,()=>{let t=`${e(i)}.svg`;a(r.outerHTML,t)}),s.querySelector(`button.icon-trash`)?.addEventListener(`click`,()=>{s.remove(),U=U.filter(e=>e.id!==t),q()})}function fe(){let e=p(`chartsOverview__viewColumns`).value,t=p(`chartsOverview__charts`);t.style.gridTemplateColumns=`repeat(${e}, 1fr)`,q()}function q(){$(`#chartsOverview`).dialog({position:{my:`center`,at:`center`,of:`svg`}})}function pe(){$(`#chartsOverview`).dialog(`destroy`),p(`chartsOverview`).remove(),document.getElementById(`chartsOverviewStyle`)?.remove()}var J=`#ccc`,Y=`no`,X=800,me=.2,he=7,ge=10;function _e(e){return u(e.map(e=>e.length))*he}function ve(e,t){if(!e.length)return 0;let n=ge+_e(e),r=Math.max(1,Math.floor(t/n));return Math.ceil(e.length/r)}function Z(e){return t=>pack[e][+t]?.name||Y}function Q(e){return()=>Object.fromEntries(pack[e].map(e=>[e.name||Y,e.color||J]))}function ye(e){return pack.biomes[+e]?.name||Y}function be(){return Object.fromEntries(pack.biomes.map(({name:e,color:t})=>[e,t]))}function xe(e){let t=Markets.get(+e);return t?t.name||pack.burgs[t.centerBurgId]?.name||`Market ${t.i}`:Y}function Se(){return Object.fromEntries((pack.markets||[]).map(e=>[xe(e.i),e.color||J]))}function Ce(e){return Goods.get(+e)?.name||Y}function we(){return Object.fromEntries((pack.goods||[]).map(e=>[e.name||Y,e.color||J]))}function Te(e,t){let n=Production.getCellProduction(e,t),r=pack.cells.burg[e];if(r){let e=Production.getBurgProduction(pack.burgs[r]);for(let[t,r]of Object.entries(e))n[+t]=(n[+t]||0)+r}return n}function Ee(e){let t=pack.cells.burg[e];return t?(pack.burgs[t].population||0)*populationRate*urbanization:0}function De(e){return pack.cells.pop[e]*populationRate}function Oe(e,t){if(t===`natural`)return e;if(t===`name`)return e.sort((e,t)=>e.name===t.name?e.group.localeCompare(t.group):t.name.localeCompare(e.name));if(t===`value`){let t={},n={};for(let{name:r,group:i,value:a}of e)t[r]=(t[r]||0)+a,n[i]=(n[i]||0)+a;return e.sort((e,r)=>e.name===r.name?n[r.group]-n[e.group]:t[e.name]-t[r.name])}return e}var ke={open:se};export{ke as ChartsOverview};