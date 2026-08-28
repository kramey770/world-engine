import{Tt as e,k as t,n}from"./utils-D3KEhgY0.js";import{$ as r,C as i,K as a,et as o,w as s}from"./index-D3JPylQY.js";import{i as c,n as l,r as u,t as d}from"./table-D__vupD5.js";var f,p=[],m=`tradeDetails`,h={my:`right top`,at:`right-10 top+10`,of:`svg`,collision:`fit`},g=[{key:`icon`,width:`2.5em`,permanent:!0},{key:`good`,label:`Good`,width:`10em`,permanent:!0,sortBy:e=>e.good,sortType:`alpha`},{key:`units`,label:`Units`,width:`5em`,sortBy:e=>e.units,defaultSort:`desc`},{key:`price`,label:`Price`,width:`5.5em`,sortBy:e=>e.price},{key:`value`,label:`Value`,width:`3.6em`,sortBy:e=>e.value},{key:`actions`,width:`1.2em`,permanent:!0}],_=l({getData:b,onUpdate:x});function v(e){if(!e?.deals.length)return;f=e;let t=pack.burgs[e.startBurgId],n=pack.burgs[e.endBurgId];if(!t||!n)return;let r=TradeAnimation.findRoutePath(t.cell,n.cell);r&&(p=r.points,y(),_.reset(),o(r.points),$(`#${m}`).dialog({title:`Trade: ${pack.burgs[e.startBurgId]?.name} to ${pack.burgs[e.endBurgId]?.name}`,resizable:!1,position:h,close:C}))}function y(){document.getElementById(m)?.remove();let e=`<div id="${m}" class="dialog stable editorDialog">
      <div>
        <div id="tradeDetailsSummary" class="totalLine"></div>
        ${u({dialogId:m,columns:g})}
        <div id="tradeDetailsBody" class="table" style="max-height:30em"></div>
        <div id="tradeDetailsFooter" class="totalLine">
          <div style="margin-left: 5px">Distance: <span id="tradeDetailsFooterDistance">0</span></div>
          <div data-col="units" style="margin-left: 12px" data-tip="Total traded units">Units: <span id="tradeDetailsFooterUnits">0</span></div>
          <div data-col="value" style="margin-left: 12px" data-tip="Total deal value">Value: <span id="tradeDetailsFooterValue">0</span></div>
        </div>
      </div>
  </div>`;t(`dialogs`).insertAdjacentHTML(`beforeend`,e),i(m,_.reset),d({dialogId:m,columns:g,onUpdate:()=>a(m,{width:`fit-content`,position:h})}),t(`tradeDetailsSummary`).addEventListener(`click`,e=>{let t=e.target.closest(`[data-zoom]`);if(!f||!t)return;let n=f[t.dataset.zoom===`start`?`startBurgId`:`endBurgId`],r=pack.burgs[n];r&&zoomTo(r.x,r.y,8,1500)})}function b(){if(!f)return[];let e=new Map;for(let t of f.deals){let n=e.get(t.good)??{units:0,value:0};n.units+=t.units,n.value+=t.units*t.price,e.set(t.good,n)}return s(m,Array.from(e,([e,{units:t,value:n}])=>{let r=Goods.get(e);return r?{goodId:e,good:r.name,units:t,price:t?n/t:0,value:n}:null}).filter(e=>e!==null),g)}function x(r){if(!f)return;let i=pack.burgs[f.startBurgId],o=pack.burgs[f.endBurgId],s=S(f.deals[0],i,`from`),l=S(f.deals[0],o,`to`);t(`tradeDetailsSummary`).innerHTML=`
    <span><b>Seller</b>: ${i?.name} ${s} <span class="icon-dot-circled pointer" data-zoom="start" data-tip="Zoom to start"></span></span>
    <span style="margin-left:5px"><b>Buyer</b>: ${o?.name} ${l} <span class="icon-dot-circled pointer" data-zoom="end" data-tip="Zoom to end"></span></span>`;let u=r.all.reduce((e,t)=>e+t.units,0),d=r.all.reduce((e,t)=>e+t.value,0),g=r.rows.map(({goodId:t,units:r,price:i,value:a})=>{let o=Goods.get(t);return`<div class="states tradeDeal" data-good="${o.name}" data-units="${e(r,2)}" data-price="${i}" data-value="${e(a,2)}">
    <svg data-col="icon" data-tip="Good icon" width="2em" height="2em" class="goodIcon">
      <circle cx="50%" cy="50%" r="42%" fill="${o.color}" stroke="${Goods.getStroke(o.color)}"/>
      <use href="#${o.icon}" x="10%" y="10%" width="80%" height="80%"></use>
    </svg>
    <div data-col="good" data-tip="Good name" class="goodName">${o.name}</div>
    <div data-col="units" class="goodUnits">${e(r,2)}</div>
    <div data-col="price" class="goodPrice">${n(e(i,2))}</div>
    <div data-col="value" class="goodValue">${n(e(a,2))}</div>
  </div>`}),v=e(p.reduce((e,t,n)=>{if(n===0)return 0;let r=p[n-1];return e+Math.hypot(t[0]-r[0],t[1]-r[1])},0),2);t(`tradeDetailsBody`).innerHTML=g.join(``),t(`tradeDetailsFooterDistance`).innerHTML=`${e(v*distanceScale)} ${distanceUnitInput.value}`,t(`tradeDetailsFooterUnits`).innerHTML=String(e(u,2)),t(`tradeDetailsFooterValue`).innerHTML=n(d),c(t(`tradeDetailsFooter`),r,_.goto),a(m,{width:`fit-content`,position:h})}function S(e,t,n){return(n===`from`?e.sellerType:e.buyerType)===`market`?`market`:t.group||`burg`}function C(){r(),$(`#${m}`).dialog(`destroy`),t(m).remove()}var w={open:v};export{w as TradeDetails};