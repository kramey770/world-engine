import{C as e,Et as t,S as n,k as r,n as i}from"./utils-BXw8fBj4.js";import{r as a}from"./tooltips-0xeyl30m.js";import{a as o}from"./dialog-helpers-DT2MP2B1.js";import{t as s}from"./state-CHxunpWe.js";import{b as c,y as l}from"./index-CHSGsxIV.js";import{i as u,n as d,r as f,t as p}from"./table-CN7n7WQR.js";var m=0,h,g=`marketDeals`,_={my:`right top`,at:`right bottom+10`,of:`#marketOverview`,collision:`fit`},v=[{key:`icon`,width:`2em`,permanent:!0},{key:`good`,label:`Good`,width:`6.8em`,permanent:!0,sortBy:e=>Goods.get(e.good)?.name??``,sortType:`alpha`},{key:`direction`,label:`Type`,width:`5em`,sortBy:e=>D(e,m),sortType:`alpha`},{key:`counterparty`,label:`Counterparty`,width:`8em`,sortBy:e=>A(e)?.name??``,sortType:`alpha`},{key:`units`,label:`Units`,width:`5em`,sortBy:e=>e.units},{key:`income`,label:`Income`,width:`5em`,sortBy:e=>j(e,m)},{key:`actions`,width:`1.2em`,permanent:!0}],y=d({getData:C,onUpdate:w});function b(e){let t=Markets.get(e);if(!t){a(`Invalid market. The selected market does not exist`,!0,`error`,5e3);return}h=s.get(g,`filters`,()=>({scope:`all`})),[`all`,`local`,`global`].includes(h.scope)||(h.scope=`all`),s.set(g,`filters`,h),m=e,x(),r(`marketDealsFilter`).value=h.scope,y.reset(),$(`#${g}`).dialog({title:`${Markets.getName(t)} Market Deals`,position:_,close:S})}function x(){document.getElementById(g)?.remove();let e=`<div id="${g}" class="dialog stable editorDialog">
      <div>
        ${f({dialogId:g,columns:v})}
        <div id="marketDealsBody" class="table" style="max-height:30em"></div>

        <div id="marketDealsFooter" class="totalLine">
          <div style="margin-left: 5px" data-tip="Deals count">Deals: <span id="marketDealsFooterDeals">0</span></div>
          <div data-col="income" style="margin-left: 12px" data-tip="Net flow for this market">Net Flow: <span id="marketDealsFooterNet">🟡 0</span></div>
        </div>

        <div id="marketDealsBottom">
          <button id="marketDealsRefresh" data-tip="Refresh the Deals screen" class="icon-cw"></button>
          <button id="marketDealsExport" data-tip="Save market deals data as a text file (.csv)" class="icon-download"></button>
          <select id="marketDealsFilter" data-tip="Filter deals by scope" style="margin-left: 8px">
            <option value="all">All</option>
            <option value="local">Local</option>
            <option value="global">Global</option>
          </select>
        </div>
      </div>
  </div>`;r(`dialogs`).insertAdjacentHTML(`beforeend`,e),l(g,y.reset),p({dialogId:g,columns:v,onUpdate:()=>o(g,{width:`fit-content`,position:_})}),r(`marketDealsRefresh`).addEventListener(`click`,y.refresh),r(`marketDealsExport`).addEventListener(`click`,M),r(`marketDealsBody`).addEventListener(`click`,e=>{let t=e.target.closest(`.marketDealParty`)?.closest(`.marketDeal`)?.dataset.id,n=pack.deals.find(e=>e.i===Number(t));if(!n)return;let r=A(n);r&&zoomTo(r.x,r.y,8,2e3)}),r(`marketDealsFilter`).addEventListener(`change`,e=>{h.scope=e.target.value,s.set(g,`filters`,h),y.reset()})}function S(){$(`#${g}`).dialog(`destroy`),r(g).remove()}function C(){if(!Markets.get(m))return a(`Invalid market. The selected market does not exist`,!0,`error`,5e3),[];let e=T(pack.deals,m).filter(e=>{if(h.scope===`all`)return!0;let t=O(e,m);return h.scope===`local`?t.type===`burg`:t.type===`market`});return c(g,e,v)}function w(e){let t=e.rows.map(k).join(``),n=e.all.reduce((e,t)=>e+j(t,m),0);r(`marketDealsBody`).innerHTML=t||`No market deals recorded`,r(`marketDealsFooterDeals`).innerHTML=String(e.all.length),r(`marketDealsFooterNet`).innerHTML=i(n),u(r(`marketDealsFooter`),e,y.goto),o(g,{width:`fit-content`,position:_})}function T(e,t){return e.filter(e=>e.sellerType===`market`&&e.seller===t||e.buyerType===`market`&&e.buyer===t)}function E(e,t){return e.sellerType===`market`&&e.seller===t}function D(e,t){return E(e,t)?`out`:`in`}function O(e,t){return E(e,t)?{id:e.buyer,type:e.buyerType}:{id:e.seller,type:e.sellerType}}function k(e){let n=Goods.get(e.good);if(!n)return``;let r=j(e,m),a=A(e),o=O(e,m),s=D(e,m),c=r>=0?`#2a6`:`#c44`,l=r>=0?`#dff0d8`:`#f2dede`;return`<div class="states marketDeal" data-id="${e.i}" data-good="${n.name}" data-direction="${s}" data-units="${t(e.units,2)}" data-counterparty="${o.type}_${a?.name}" data-income="${r}">
      <svg data-col="icon" data-tip="Good icon" width="1.3em" height="1.3em" class="goodIcon">
        <circle cx="50%" cy="50%" r="42%" fill="${n.color}" stroke="${Goods.getStroke(n.color)}"/>
        <use href="#${n.icon}" x="10%" y="10%" width="80%" height="80%"/>
      </svg>
      <div data-col="good" data-tip="Good name" class="goodName">${n.name}</div>
      <div data-col="direction"><span class="marketBadge" style="background:${l}; color:${c}">${s.toUpperCase()}</span></div>
      <div data-col="counterparty" class="marketDealParty pointer" data-tip="Click to zoom">
        <div class="${o.type===`burg`?`icon-dot-circled`:`icon-store`}" style="display:inline-block; width: 0.8em; ${o.type===`market`?`font-size: 0.85em;`:``}"></div>
        <div style="display:inline-block; width: 6.8em;">${a?.name}</div>
      </div>
      <div data-col="units" class="marketDealUnits">${t(e.units,2)}</div>
      <div data-col="income" class="marketDealIncome" style="color:${c}">${i(r)}</div>
    </div>`}function A(e){let t=O(e,m),n=t.type===`burg`?t.id:Markets.get(t.id)?.centerBurgId;return n&&pack.burgs[n]||null}function j(e,n){let r=t(e.units*e.price,2);return E(e,n)?r:-r}function M(){if(!Markets.get(m))return;let r=T(pack.deals,m),i=`Id,Good,Type,Client,Units,Price,Net
`;for(let e of r){let n=Goods.get(e.good);n&&(i+=[e.i,n.name,D(e,m),A(e)?.name??``,t(e.units,2),t(e.price,2),t(j(e,m),2)].join(`,`),i+=`
`)}n(i,`${e(`Market_${m}_Deals`)}.csv`)}var N={open:b};export{N as MarketDealsOverview};