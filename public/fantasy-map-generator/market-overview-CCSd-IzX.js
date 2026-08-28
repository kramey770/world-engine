import{M as e,T as t,Tt as n,k as r,n as i,un as a,w as o}from"./utils-D3KEhgY0.js";import{r as s,t as c}from"./tooltips-D1wvMKni.js";import{C as l,H as u,J as d,K as f,Mt as p,Q as m,q as h,w as g}from"./index-D3JPylQY.js";import{i as _,n as v,r as y,t as b}from"./table-D__vupD5.js";var x=0,S=`marketOverview`,C={my:`right top`,at:`right-10 top+10`,of:`svg`,collision:`fit`},w=[{key:`icon`,width:`2.5em`,permanent:!0},{key:`good`,label:`Good`,width:`8em`,permanent:!0,sortBy:e=>e.good,sortType:`alpha`},{key:`stock`,label:`Stock`,width:`5em`,sortBy:e=>e.stock,defaultSort:`desc`},{key:`price`,label:`Price`,width:`5em`,sortBy:e=>e.price},{key:`actions`,width:`1.2em`,permanent:!0}],T=v({getData:j,onUpdate:M});function E(e){if(customization)return;let t=Markets.get(e);if(!t){s(`Invalid market. The selected market does not exist`,!0,`error`,5e3);return}x=e,u(`#${S}, .stable`),D(),T.reset(),O(t),$(`#${S}`).dialog({title:`Market Stock: ${Markets.getName(t)}`,width:`auto`,close:I,position:C})}function D(){document.getElementById(S)?.remove();let e=`<div id="${S}" class="dialog stable editorDialog">
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
  </div>`;r(`dialogs`).insertAdjacentHTML(`beforeend`,e),l(S,T.reset),b({dialogId:S,columns:w,onUpdate:()=>f(S,{width:`fit-content`,position:C})}),r(`marketOverviewRefresh`).addEventListener(`click`,T.refresh),r(`marketOverviewExport`).addEventListener(`click`,F),r(`marketOverviewOpenDeals`).addEventListener(`click`,()=>d.MarketDealsOverview.open(x)),r(`marketOverviewRelocate`).addEventListener(`click`,N),r(`marketOverviewName`).addEventListener(`input`,k),r(`marketOverviewNameReset`).addEventListener(`click`,A)}function O(e){let t=r(`marketOverviewName`);t.value=e.name||``,t.placeholder=pack.burgs[e.centerBurgId]?.name||`Market ${e.i}`}function k(){let e=Markets.get(x);e&&(e.name=this.value.trim()||void 0,$(`#marketOverview`).dialog(`option`,`title`,`Market Stock: ${Markets.getName(e)}`))}function A(){let e=Markets.get(x);e&&(e.name=void 0,r(`marketOverviewName`).value=``,$(`#marketOverview`).dialog(`option`,`title`,`Market Stock: ${Markets.getName(e)}`))}function j(){let e=Markets.get(x);if(!e)return s(`Invalid market. The selected market does not exist`,!0,`error`,5e3),[];let t=pack.burgs[e.centerBurgId];return!t||t.removed?(s(`Invalid market. The selected market has no center burg`,!0,`error`,5e3),[]):g(S,Object.entries(e.goods).flatMap(([e,t])=>{let n=Goods.get(+e);return n?[{goodId:+e,good:n.name,stock:t.stock,price:t.price}]:[]}),w)}function M(e){let t=Markets.get(x);if(!t)return;let a=e.rows.map(e=>{let t=Goods.get(e.goodId),r=Goods.getStroke(t.color);return`<div class="states marketGood"
      data-good="${t.name}"
      data-stock="${n(e.stock,2)}"
      data-price="${n(e.price,2)}">
      <svg data-col="icon" data-tip="Good icon" width="2em" height="2em" class="goodIcon">
        <circle cx="50%" cy="50%" r="42%" fill="${t.color}" stroke="${r}"/>
        <use href="#${t.icon}" x="10%" y="10%" width="80%" height="80%"/>
      </svg>
      <div data-col="good" data-tip="Good name" class="goodName">${t.name}</div>
      <div data-col="stock" data-tip="Good stock" class="marketGoodStock">${n(e.stock,2)}</div>
      <div data-col="price" data-tip="Good price" class="marketGoodPrice">${i(e.price)}</div>
    </div>`});r(`marketOverviewGoodsBody`).innerHTML=a.join(``)||`No market goods available`;let o=pack.burgs[t.centerBurgId],s=pack.states[o?.state||0],c=`stateCOA${s.i}`;s&&p.trigger(c,s.coa),r(`marketOverviewInfo`).innerHTML=`<svg class="coaIcon" viewBox="0 0 200 200"><use href="#${c}"></use></svg><b>Owner:</b> ${s.fullName||s.name}`;let l=pack.burgs.filter(e=>!e.removed&&e.market===t.i),u=e.all.reduce((e,t)=>e+t.stock,0);r(`marketOverviewSummary`).innerHTML=`
    <div style="margin-left:5px">Cells: ${pack.cells.market.reduce((e,n)=>e+ +(n===t.i),0)}</div>
    <div style="margin-left:12px">Burgs: ${l.length}</div>
    <div data-col="stock" style="margin-left:12px">Stock: ${n(u,2)}</div>`,_(r(`marketOverviewSummary`),e,T.goto),f(S,{width:`fit-content`,position:C})}function N(){let e=r(`marketOverviewRelocate`);e.classList.toggle(`pressed`),e.classList.contains(`pressed`)?(a(`#viewbox`).style(`cursor`,`crosshair`).on(`click`,P),s(`Click on a burg on the map to relocate the market center`,!0)):(c(),h())}function P(t){let n=Markets.get(x);if(!n)return;let[r,i]=e(t,this),a=Pack.findCell(r,i);if(a===void 0)return;let o=pack.cells.burg[a],c=pack.burgs[o];if(!o||!c||c.removed){s(`No valid burg in this cell. Click on a cell with a burg`,!1,`error`);return}if(o===n.centerBurgId){s(`This burg is already the center of this market`,!1,`error`);return}if(pack.markets.some(e=>e.centerBurgId===o)){s(`This burg is already a center of another market`,!1,`error`);return}Markets.relocateMarket(x,o)&&(N(),m.draw(`markets`),O(n),$(`#marketOverview`).dialog(`option`,`title`,`Market Stock: ${Markets.getName(n)}`),T.refresh())}function F(){let e=Markets.get(x);if(!e)return;let r=`Good,Stock,Buy Price,Sell Price
`;for(let[t,i]of Object.entries(e.goods)){let e=Goods.get(Number(t));if(!e)continue;let a=n(Markets.customerBuyPrice(i.price),2),o=n(Markets.customerSellPrice(i.price),2);r+=`${[e.name,n(i.stock,2),a,o].join(`,`)}\n`}o(r,`${t(`Market`)}.csv`)}function I(){r(`marketOverviewRelocate`).classList.contains(`pressed`)&&N(),$(`#${S}`).dialog(`destroy`),r(S).remove()}var L={open:E};export{L as MarketOverview};