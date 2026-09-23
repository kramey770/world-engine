import{C as e,Et as t,M as n,S as r,dn as i,k as a,n as o}from"./utils-BIleyWmR.js";import{j as s,t as c}from"./layers-qPZxwHcp.js";import{r as l,t as u}from"./tooltips-zkair8Am.js";import{a as d,t as f}from"./dialog-helpers-50LJgx0U.js";import{P as p,b as m,j as h,y as g}from"./index-tuMZPduM.js";import{i as _,n as v,r as y,t as b}from"./table-oyVozzWP.js";var x=0,S=`marketOverview`,C={my:`right top`,at:`right-10 top+10`,of:`svg`,collision:`fit`},w=[{key:`icon`,width:`2.5em`,permanent:!0},{key:`good`,label:`Good`,width:`8em`,permanent:!0,sortBy:e=>e.good,sortType:`alpha`},{key:`stock`,label:`Stock`,width:`5em`,sortBy:e=>e.stock,defaultSort:`desc`},{key:`price`,label:`Price`,width:`5em`,sortBy:e=>e.price},{key:`actions`,width:`1.2em`,permanent:!0}],T=v({getData:j,onUpdate:M});function E(e){if(customization)return;let t=Markets.get(e);if(!t){l(`Invalid market. The selected market does not exist`,!0,`error`,5e3);return}x=e,f(`#${S}, .stable`),D(),T.reset(),O(t),$(`#${S}`).dialog({title:`Market Stock: ${Markets.getName(t)}`,width:`auto`,close:I,position:C})}function D(){document.getElementById(S)?.remove();let e=`<div id="${S}" class="dialog stable editorDialog">
      ${y({dialogId:S,columns:w})}
      <div id="marketOverviewGoodsBody" class="table" style="max-height:40em"></div>
      <div id="marketOverviewSummary" class="totalLine"></div>
      <div id="marketOverviewNameLine" style="display: flex; align-items: center; margin-bottom: 0.4em">
        <div class="label">Name:</div>
        <input
          id="marketOverviewName"
          data-tip="Type to rename the market. Clear the field to reset to the default name"
          autocorrect="off"
          spellcheck="false"
          style="width: 11em; margin-left: 0.3em;"
        />
        <span
          id="marketOverviewNameReset"
          data-tip="Reset to the default name (center burg name)"
          class="icon-ccw pointer"
          style="margin-left: 0.3em"
        ></span>
      </div>
      <div id="marketOverviewInfo" style="margin-bottom: 0.3em"></div>
      <div id="marketOverviewBottom">
        <button id="marketOverviewRefresh" data-tip="Refresh the Overview screen" class="icon-cw"></button>
        <button id="marketOverviewOpenDeals" data-tip="View market deals" class="icon-list-bullet"></button>
        <button
          id="marketOverviewRelocate"
          data-tip="Relocate market. Click on a burg on the map to move the market center"
          class="icon-map-pin"
        ></button>
        <button id="marketOverviewExport" data-tip="Save market deals data as a text file (.csv)" class="icon-download"></button>
      </div>
  </div>`;a(`dialogs`).insertAdjacentHTML(`beforeend`,e),g(S,T.reset),b({dialogId:S,columns:w,onUpdate:()=>d(S,{width:`fit-content`,position:C})}),a(`marketOverviewRefresh`).addEventListener(`click`,T.refresh),a(`marketOverviewExport`).addEventListener(`click`,F),a(`marketOverviewOpenDeals`).addEventListener(`click`,()=>p.MarketDealsOverview.open(x)),a(`marketOverviewRelocate`).addEventListener(`click`,N),a(`marketOverviewName`).addEventListener(`input`,k),a(`marketOverviewNameReset`).addEventListener(`click`,A)}function O(e){let t=a(`marketOverviewName`);t.value=e.name||``,t.placeholder=pack.burgs[e.centerBurgId]?.name||`Market ${e.i}`}function k(){let e=Markets.get(x);e&&(e.name=this.value.trim()||void 0,$(`#marketOverview`).dialog(`option`,`title`,`Market Stock: ${Markets.getName(e)}`))}function A(){let e=Markets.get(x);e&&(e.name=void 0,a(`marketOverviewName`).value=``,$(`#marketOverview`).dialog(`option`,`title`,`Market Stock: ${Markets.getName(e)}`))}function j(){let e=Markets.get(x);if(!e)return l(`Invalid market. The selected market does not exist`,!0,`error`,5e3),[];let t=pack.burgs[e.centerBurgId];if(!t||t.removed)return l(`Invalid market. The selected market has no center burg`,!0,`error`,5e3),[];let n=Object.entries(e.goods).flatMap(([e,t])=>{let n=Goods.get(+e);return n?[{goodId:+e,good:n.name,stock:t.stock,price:t.price}]:[]});return m(S,n,w)}function M(e){let n=Markets.get(x);if(!n)return;let r=e.rows.map(e=>{let n=Goods.get(e.goodId),r=Goods.getStroke(n.color);return`<div class="states marketGood"
      data-good="${n.name}"
      data-stock="${t(e.stock,2)}"
      data-price="${t(e.price,2)}">
      <svg data-col="icon" data-tip="Good icon" width="2em" height="2em" class="goodIcon">
        <circle cx="50%" cy="50%" r="42%" fill="${n.color}" stroke="${r}"/>
        <use href="#${n.icon}" x="10%" y="10%" width="80%" height="80%"/>
      </svg>
      <div data-col="good" data-tip="Good name" class="goodName">${n.name}</div>
      <div data-col="stock" data-tip="Good stock" class="marketGoodStock">${t(e.stock,2)}</div>
      <div data-col="price" data-tip="Good price" class="marketGoodPrice">${o(e.price)}</div>
    </div>`});a(`marketOverviewGoodsBody`).innerHTML=r.join(``)||`No market goods available`;let i=pack.burgs[n.centerBurgId],c=pack.states[i?.state||0],l=`stateCOA${c.i}`;c&&s.trigger(l,c.coa),a(`marketOverviewInfo`).innerHTML=`<svg class="coaIcon" viewBox="0 0 200 200"><use href="#${l}"></use></svg><b>Owner:</b> ${c.fullName||c.name}`;let u=pack.burgs.filter(e=>!e.removed&&e.market===n.i),f=e.all.reduce((e,t)=>e+t.stock,0);a(`marketOverviewSummary`).innerHTML=`
    <div style="margin-left:5px">Cells: ${pack.cells.market.reduce((e,t)=>e+ +(t===n.i),0)}</div>
    <div style="margin-left:12px">Burgs: ${u.length}</div>
    <div data-col="stock" style="margin-left:12px">Stock: ${t(f,2)}</div>`,_(a(`marketOverviewSummary`),e,T.goto),d(S,{width:`fit-content`,position:C})}function N(){let e=a(`marketOverviewRelocate`);e.classList.toggle(`pressed`),e.classList.contains(`pressed`)?(i(`#viewbox`).style(`cursor`,`crosshair`).on(`click`,P),l(`Click on a burg on the map to relocate the market center`,!0)):(u(),h())}function P(e){let t=Markets.get(x);if(!t)return;let[r,i]=n(e,this),a=Pack.findCell(r,i);if(a===void 0)return;let o=pack.cells.burg[a],s=pack.burgs[o];if(!o||!s||s.removed){l(`No valid burg in this cell. Click on a cell with a burg`,!1,`error`);return}if(o===t.centerBurgId){l(`This burg is already the center of this market`,!1,`error`);return}if(pack.markets.some(e=>e.centerBurgId===o)){l(`This burg is already a center of another market`,!1,`error`);return}Markets.relocateMarket(x,o)&&(N(),c.draw(`markets`),O(t),$(`#marketOverview`).dialog(`option`,`title`,`Market Stock: ${Markets.getName(t)}`),T.refresh())}function F(){let n=Markets.get(x);if(!n)return;let i=`Good,Stock,Buy Price,Sell Price
`;for(let[e,r]of Object.entries(n.goods)){let n=Goods.get(Number(e));if(!n)continue;let a=t(Markets.customerBuyPrice(r.price),2),o=t(Markets.customerSellPrice(r.price),2);i+=`${[n.name,t(r.stock,2),a,o].join(`,`)}\n`}r(i,`${e(`Market`)}.csv`)}function I(){a(`marketOverviewRelocate`).classList.contains(`pressed`)&&N(),$(`#${S}`).dialog(`destroy`),a(S).remove()}var L={open:E};export{L as MarketOverview};