import{Bt as e,M as t,P as n,S as r,T as i,Tt as a,at as o,d as s,i as c,k as l,r as u,un as d,w as f,z as p}from"./utils-D3KEhgY0.js";import{t as m}from"./sin-DXK16t1M.js";import{r as h,t as ee}from"./tooltips-D1wvMKni.js";import{C as te,H as ne,J as g,K as _,Kt as v,M as y,Q as b,U as x,W as re,X as ie,bt as ae,q as S,w as oe,xt as C}from"./index-D3JPylQY.js";import{t as w}from"./highlighting-Dl5muJeM.js";import{i as T,n as E,r as D,t as O}from"./table-D__vupD5.js";var k=`religionsEditor`,A={my:`right top`,at:`right-10 top+10`,of:`svg`,collision:`fit`},j,M=[{key:`color`,width:`1.2em`,permanent:!0},{key:`name`,label:`Religion`,width:`14em`,permanent:!0,sortBy:e=>e.name||``,sortType:`alpha`},{key:`type`,label:`Type`,width:`6em`,defaultSort:`asc`,sortBy:e=>e.type||``,sortType:`alpha`},{key:`form`,label:`Form`,width:`7em`,mobileHidden:!0,sortBy:e=>e.form||``,sortType:`alpha`},{key:`deity`,label:`Deity`,width:`14em`,mobileHidden:!0,sortBy:e=>e.deity||``,sortType:`alpha`},{key:`area`,label:`Area`,width:`7em`,mobileHidden:!0,sortBy:e=>e.area||0},{key:`population`,label:`Population`,width:`6em`,sortBy:e=>(e.rural||0)*populationRate+(e.urban||0)*populationRate*urbanization},{key:`expansion`,label:`Expansion`,width:`5em`,hidden:!0,mobileHidden:!0,sortBy:e=>e.expansion||``,sortType:`alpha`},{key:`expansionism`,label:`Expansionism`,width:`5em`,hidden:!0,mobileHidden:!0,sortBy:e=>e.expansionism||0},{key:`actions`,width:`3.2em`,permanent:!0,align:`right`}];function N(){return pack.religions.filter(e=>!e.removed&&!(e.i&&!e.cells&&!j.showExtinct))}var P=E({getData:()=>oe(k,N(),M),onUpdate:z});function F(){customization||(j=y.get(k,`filters`,()=>({showExtinct:!1})),ne(`#${k}, .stable`),b.show(`religions`),b.hide(`states`,`biomes`),b.hide(`cultures`,`provinces`),I(),R(),q(),P.reset(),$(`#${k}`).dialog({title:`Religions Editor`,resizable:!1,width:`fit-content`,close:Ee,position:A}))}function I(){re(`religionsEditor`);let e=`<div id="religionsEditor" class="dialog stable editorDialog">
    <div id="religionsBody" class="table" data-type="absolute">${D({dialogId:k,columns:M})}</div>

    <div id="religionsFooter" class="totalLine">
      <div data-tip="Total number of organized religions" style="margin-left: 12px">
        Organized:&nbsp;<span id="religionsOrganized">0</span>
      </div>
      <div data-tip="Total number of heresies" style="margin-left: 12px">
        Heresies:&nbsp;<span id="religionsHeresies">0</span>
      </div>
      <div data-tip="Total number of cults" style="margin-left: 12px">
        Cults:&nbsp;<span id="religionsCults">0</span>
      </div>
      <div data-tip="Total number of folk religions" style="margin-left: 12px">
        Folk:&nbsp;<span id="religionsFolk">0</span>
      </div>
      <div data-tip="Total land area" style="margin-left: 12px" data-col="area">
        Land Area:&nbsp;<span id="religionsFooterArea">0</span>
      </div>
      <div data-tip="Total number of believers (population)" style="margin-left: 12px" data-col="population">
        Believers:&nbsp;<span id="religionsFooterPopulation">0</span>
      </div>
    </div>

    <div id="religionsBottom" class="editorToolbar">
      <button id="religionsEditorRefresh" data-tip="Refresh the Editor" class="icon-cw"></button>
      <button id="religionsEditStyle" data-tip="Edit religions style in Style Editor" class="icon-adjust"></button>
      <button id="religionsLegend" data-tip="Toggle Legend box" class="icon-list-bullet"></button>
      <button id="religionsPercentage" data-tip="Toggle percentage / absolute values display mode" class="icon-percent"></button>
      <button id="religionsHeirarchy" data-tip="Show religions hierarchy tree" class="icon-sitemap"></button>
      <button id="religionsExtinct" data-tip="Show/hide extinct religions (religions without cells)" class="icon-eye-off"></button>

      <button id="religionsManually" data-tip="Manually re-assign religions" class="icon-brush"></button>
      <button id="religionsAdd" data-tip="Add a new religion. Hold Shift to add multiple" class="icon-plus"></button>
      <button id="religionsExport" data-tip="Download religions-related data" class="icon-download"></button>
      <button id="religionsRecalculate" data-tip="Recalculate religions based on current values of growth-related attributes" class="icon-retweet"></button>
      <span
        data-tip="Allow religion center, extent, and expansionism changes to take an immediate effect"
        class="editorToolbarPanel"
      >
        <input id="religionsAutoChange" class="checkbox" type="checkbox" />
        <label for="religionsAutoChange" class="checkbox-label"><i>auto-apply changes</i></label>
      </span>
    </div>
  </div>`;l(`dialogs`).insertAdjacentHTML(`beforeend`,e),Y(),te(k,P.reset),w(k,({cellId:e})=>pack.cells.religion[e]),l(`religionsEditorRefresh`).addEventListener(`click`,L),O({dialogId:k,columns:M,onUpdate:()=>_(k,{width:`fit-content`,position:A})}),l(`religionsEditStyle`).addEventListener(`click`,()=>editStyle(`relig`)),l(`religionsLegend`).addEventListener(`click`,_e),l(`religionsPercentage`).addEventListener(`click`,J),l(`religionsHeirarchy`).addEventListener(`click`,ve),l(`religionsExtinct`).addEventListener(`click`,ye),l(`religionsManually`).addEventListener(`click`,be),l(`religionsAdd`).addEventListener(`click`,Se),l(`religionsExport`).addEventListener(`click`,we),l(`religionsRecalculate`).addEventListener(`click`,()=>Q(!0))}function L(){R(),P.refresh()}function R(){let{cells:e,religions:t,burgs:n}=pack;t.forEach(e=>{e.cells=e.area=e.rural=e.urban=0});for(let r of e.i){if(e.h[r]<20)continue;let i=e.religion[r];t[i].cells+=1,t[i].area+=e.area[r],t[i].rural+=e.pop[r];let a=e.burg[r];a&&(t[i].urban+=n[a].population)}}function z(e){let t=` ${c()}`,n=``,r=0,i=0;for(let t of e.all)r+=u(t.area??0),i+=a((t.rural??0)*populationRate+(t.urban??0)*populationRate*urbanization);for(let r of e.rows){let e=u(r.area??0),i=(r.rural??0)*populationRate,o=(r.urban??0)*populationRate*urbanization,c=a(i+o),l=`Believers: ${s(c)}; Rural areas: ${s(i)}; Urban areas: ${s(o)}. Click to change`;if(!r.i){n+=`<div
        class="states"
        data-id="${r.i}"
        data-name="${r.name}"
        data-color=""
        data-area="${e}"
        data-population="${c}"
        data-type=""
        data-form=""
        data-deity=""
        data-expansion=""
        data-expansionism=""
      >
        <svg width="9" height="9" class="placeholder" data-col="color"></svg>
        <input data-tip="Religion name. Click and type to change" class="religionName italic"
          value="${r.name}" autocorrect="off" spellcheck="false" data-col="name" />
        <select data-tip="Religion type" class="religionType placeholder" data-col="type">
          ${B(r.type)}
        </select>
        <input data-tip="Religion form" class="religionForm placeholder" value="" autocorrect="off" spellcheck="false" data-col="form" />
        <div data-col="deity">
          <span class="icon-arrows-cw placeholder"></span>
          <input class="religionDeity placeholder" value="" autocorrect="off" spellcheck="false" />
        </div>
        <div data-col="area">
          <span data-tip="Religion area" style="padding-right: 4px" class="icon-map-o"></span>
          <div data-tip="Religion area" class="religionArea">${s(e)+t}</div>
        </div>
        <div data-col="population">
          <span data-tip="${l}" class="icon-male"></span>
          <div data-tip="${l}" class="religionPopulation pointer">${s(c)}</div>
        </div>
        <div data-col="expansion">
          <span class="icon-resize-full-alt placeholder" style="padding-right: 2px"></span>
          <span class="religionExtent placeholder">n/a</span>
        </div>
        <div data-col="expansionism">
          <span class="icon-resize-full placeholder"></span>
          <input class="religionExpantion placeholder" disabled type="number" value="0" />
        </div>
        <div data-col="actions"></div>
      </div>`;continue}n+=`<div
      class="states"
      data-id=${r.i}
      data-name="${r.name}"
      data-color="${r.color}"
      data-area=${e}
      data-population=${c}
      data-type="${r.type}"
      data-form="${r.form}"
      data-deity="${r.deity||``}"
      data-expansion="${r.expansion}"
      data-expansionism="${r.expansionism}"
    >
      <fill-box fill="${r.color}" data-col="color"></fill-box>
      <input data-tip="Religion name. Click and type to change" class="religionName"
        value="${r.name}" autocorrect="off" spellcheck="false" data-col="name" />
      <select data-tip="Religion type" class="religionType" data-col="type">
        ${B(r.type)}
      </select>
      <input data-tip="Religion form" class="religionForm"
        value="${r.form}" autocorrect="off" spellcheck="false" data-col="form" />
      <div data-col="deity">
        <span data-tip="Click to re-generate supreme deity" class="icon-arrows-cw pointer"></span>
        <input data-tip="Religion supreme deity" class="religionDeity"
          value="${r.deity||``}" autocorrect="off" spellcheck="false" />
      </div>
      <div data-col="area">
        <span data-tip="Religion area" style="padding-right: 4px" class="icon-map-o"></span>
        <div data-tip="Religion area" class="religionArea">${s(e)+t}</div>
      </div>
      <div data-col="population">
        <span data-tip="${l}" class="icon-male"></span>
        <div data-tip="${l}" class="religionPopulation pointer">${s(c)}</div>
      </div>
      ${V(r)}
      <div data-col="actions">
        <span data-tip="Locate the religion" class="icon-target"></span>
        <span data-tip="Lock this religion" class="icon-lock${r.lock?``:`-open`}"></span>
        <span data-tip="Remove religion" class="icon-trash-empty"></span>
      </div>
    </div>`}let o=l(`religionsBody`);o.querySelectorAll(`:scope > .states`).forEach(e=>{e.remove()}),o.insertAdjacentHTML(`beforeend`,n);let d=pack.religions.filter(e=>e.i&&!e.removed);l(`religionsOrganized`).innerHTML=String(d.filter(e=>e.type===`Organized`).length),l(`religionsHeresies`).innerHTML=String(d.filter(e=>e.type===`Heresy`).length),l(`religionsCults`).innerHTML=String(d.filter(e=>e.type===`Cult`).length),l(`religionsFolk`).innerHTML=String(d.filter(e=>e.type===`Folk`).length),l(`religionsFooterArea`).innerHTML=s(r)+t,l(`religionsFooterPopulation`).innerHTML=s(i),l(`religionsFooterArea`).dataset.area=String(r),l(`religionsFooterPopulation`).dataset.population=String(i),T(l(`religionsFooter`),e,P.goto),l(`religionsBody`).querySelectorAll(`:scope > .states`).forEach(e=>{e.addEventListener(`mouseenter`,U),e.addEventListener(`mouseleave`,W)}),l(`religionsBody`).querySelectorAll(`fill-box`).forEach(e=>void e.addEventListener(`click`,G)),l(`religionsBody`).querySelectorAll(`div > input.religionName`).forEach(e=>void e.addEventListener(`input`,K)),l(`religionsBody`).querySelectorAll(`div > select.religionType`).forEach(e=>void e.addEventListener(`change`,se)),l(`religionsBody`).querySelectorAll(`div > input.religionForm`).forEach(e=>void e.addEventListener(`input`,ce)),l(`religionsBody`).querySelectorAll(`div > input.religionDeity`).forEach(e=>void e.addEventListener(`input`,le)),l(`religionsBody`).querySelectorAll(`div > span.icon-arrows-cw`).forEach(e=>void e.addEventListener(`click`,ue)),l(`religionsBody`).querySelectorAll(`div > div.religionPopulation`).forEach(e=>void e.addEventListener(`click`,de)),l(`religionsBody`).querySelectorAll(`div > select.religionExtent`).forEach(e=>void e.addEventListener(`change`,fe)),l(`religionsBody`).querySelectorAll(`div > input.religionExpantion`).forEach(e=>void e.addEventListener(`change`,pe)),l(`religionsBody`).querySelectorAll(`div > span.icon-trash-empty`).forEach(e=>void e.addEventListener(`click`,me)),l(`religionsBody`).querySelectorAll(`div > span.icon-target`).forEach(e=>void e.addEventListener(`click`,Te)),l(`religionsBody`).querySelectorAll(`div > span.icon-lock`).forEach(e=>void e.addEventListener(`click`,Z)),l(`religionsBody`).querySelectorAll(`div > span.icon-lock-open`).forEach(e=>void e.addEventListener(`click`,Z)),l(`religionsBody`).dataset.type===`percentage`&&(l(`religionsBody`).dataset.type=`absolute`,J()),_(k,{width:`fit-content`,position:A})}function B(e){let t=``;return[`Folk`,`Organized`,`Cult`,`Heresy`].forEach(n=>{t+=`<option ${e===n?`selected`:``} value="${n}">${n}</option>`}),t}function V(e){if(e.type===`Folk`){let e=`Folk religions are not competitive and do not expand. Initially they cover all cells of their parent culture, but get ousted by organized religions when they expand`;return`
      <div data-col="expansion">
        <span data-tip="${e}" class="icon-resize-full-alt" style="padding-right: 2px"></span>
        <span data-tip="${e}" class="religionExtent">culture</span>
      </div>
      <div data-col="expansionism">
        <span data-tip="${e}" class="icon-resize-full"></span>
        <input data-tip="${e}" class="religionExpantion" disabled type="number" value='0' />
      </div>`}return`
    <div data-col="expansion">
      <span data-tip="Potential religion extent" class="icon-resize-full-alt" style="padding-right: 2px"></span>
      <select data-tip="Potential religion extent" class="religionExtent">
        ${H(e.expansion)}
      </select>
    </div>
    <div data-col="expansionism">
      <span data-tip="Religion expansionism. Defines competitive size" class="icon-resize-full"></span>
      <input
        data-tip="Religion expansionism. Defines competitive size. Click to change, then click Recalculate to apply change"
        class="religionExpantion"
        type="number"
        min="0"
        max="99"
        step=".1"
        value=${e.expansionism}
      />
    </div>`}function H(e){let t=``;return[`global`,`state`,`culture`].forEach(n=>{t+=`<option ${e===n?`selected`:``} value="${n}">${n}</option>`}),t}var U=p(t=>{let n=Number(t.id||t.target.dataset.id),r=l(`religionsBody`).querySelector(`div[data-id='${n}']`);if(r&&r.classList.add(`active`),!b.isOn(`religions`)||customization)return;let i=e().duration(2e3).ease(m);d(`#relig`).select(`#religion${n}`).raise().transition(i).attr(`stroke-width`,2.5).attr(`stroke`,`#d0240f`),d(`#debug`).select(`#religionsCenter${n}`).raise().transition(i).attr(`r`,3).attr(`stroke`,`#d0240f`)},200);function W(e){let t=Number(e.id||e.target.dataset.id),n=l(`religionsBody`).querySelector(`div[data-id='${t}']`);n&&n.classList.remove(`active`),d(`#relig`).select(`#religion${t}`).transition().attr(`stroke-width`,null).attr(`stroke`,null),d(`#debug`).select(`#religionsCenter${t}`).transition().attr(`r`,2).attr(`stroke`,null)}function G(){let e=this.getAttribute(`fill`)||`#ffffff`,t=+this.parentNode.dataset.id;g.ColorPicker.open(e,e=>{this.fill=e,pack.religions[t].color=e,d(`#relig`).select(`#religion${t}`).attr(`fill`,e),d(`#debug`).select(`#religionsCenter${t}`).attr(`fill`,e)})}function K(){let e=+this.parentNode.dataset.id;this.parentNode.dataset.name=this.value;let t=pack.religions;t[e].name=this.value,t[e].code=o(this.value,t.flatMap(e=>e.code?[e.code]:[]))}function se(){let e=+this.parentNode.dataset.id;this.parentNode.dataset.type=this.value;let t=this.value;pack.religions[e].type=t}function ce(){let e=+this.parentNode.dataset.id;this.parentNode.dataset.form=this.value,pack.religions[e].form=this.value}function le(){let e=this.closest(`.states`),t=+e.dataset.id;e.dataset.deity=this.value,pack.religions[t].deity=this.value}function ue(){let e=this.closest(`.states`),t=+e.dataset.id,n=pack.religions[t].culture,r=Religions.getDeityName(n)??``;e.dataset.deity=r,pack.religions[t].deity=r,this.nextElementSibling.value=r}function de(){let e=+this.closest(`.states`).dataset.id,t=pack.religions[e];if(!t.cells){h(`Religion does not have any cells, cannot change population`,!1,`error`);return}let n=a((t.rural??0)*populationRate),r=a((t.urban??0)*populationRate*urbanization),i=n+r,o=e=>Number(e).toLocaleString(),s=pack.burgs.filter(t=>!t.removed&&pack.cells.religion[t.cell]===e);alertMessage.innerHTML=`<div>
    <i>All population of religion territory is considered believers of this religion. It means believers number change will directly affect population</i>
    <div style="margin: 0.5em 0">
      Rural: <input type="number" min="0" step="1" id="ruralPop" value=${n} style="width:6em" />
      Urban: <input type="number" min="0" step="1" id="urbanPop" value=${r} style="width:6em"
        ${s.length?``:`disabled`} />
    </div>
    <div>Total population: ${o(i)} ⇒ <span id="totalPop">${o(i)}</span>
      (<span id="totalPopPerc">100</span>%)
    </div>
  </div>`;let c=l(`ruralPop`),u=l(`urbanPop`),d=l(`totalPop`),f=l(`totalPopPerc`),p=()=>{let e=c.valueAsNumber+u.valueAsNumber;Number.isNaN(e)||(d.innerHTML=o(e),f.innerHTML=String(a(e/i*100)))};c.oninput=()=>p(),u.oninput=()=>p(),$(`#alert`).dialog({resizable:!1,title:`Change believers number`,width:`24em`,buttons:{Apply:function(){m(),$(this).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}},position:{my:`center`,at:`center`,of:`svg`}});function m(){let t=+c.value/n;if(Number.isFinite(t)&&t!==1&&pack.cells.i.filter(t=>pack.cells.religion[t]===e).forEach(e=>{pack.cells.pop[e]*=t}),!Number.isFinite(t)&&+c.value>0){let t=+c.value/populationRate,n=pack.cells.i.filter(t=>pack.cells.religion[t]===e),r=a(t/n.length);n.forEach(e=>{pack.cells.pop[e]=r})}let i=+u.value/r;if(Number.isFinite(i)&&i!==1&&s.forEach(e=>{e.population=a((e.population??0)*i,4)}),!Number.isFinite(i)&&+u.value>0){let e=a(+u.value/populationRate/urbanization/s.length,4);s.forEach(t=>{t.population=e})}b.draw(`population`),L()}}function fe(){let e=this.closest(`.states`),t=+e.dataset.id;e.dataset.expansion=this.value,pack.religions[t].expansion=this.value,Q()}function pe(){let e=this.closest(`.states`),t=+e.dataset.id;e.dataset.expansionism=this.value,pack.religions[t].expansionism=+this.value,Q()}function me(){if(customization)return;let e=+this.closest(`.states`).dataset.id;x({title:`Remove religion`,message:`Are you sure you want to remove the religion? <br>This action cannot be reverted`,confirm:`Remove`,onConfirm:()=>he(e)})}function he(e){d(`#relig`).select(`#religion${e}`).remove(),d(`#relig`).select(`#religion-gap${e}`).remove(),d(`#debug`).select(`#religionsCenter${e}`).remove(),pack.cells.religion.forEach((t,n)=>{t===e&&(pack.cells.religion[n]=0)}),pack.religions[e].removed=!0,pack.religions.filter(e=>e.i&&!e.removed).forEach(t=>{t.origins=(t.origins??[]).filter(t=>t!==e),t.origins.length||(t.origins=[0])}),L()}function q(){let e=d(`#debug`);e.select(`#religionCenters`).remove();let t=e.append(`g`).attr(`id`,`religionCenters`).attr(`stroke-width`,.8).attr(`stroke`,`#444444`).style(`cursor`,`move`),n=pack.religions.filter(e=>e.i&&e.center&&!e.removed);j.showExtinct||(n=n.filter(e=>(e.cells??0)>0)),t.selectAll(`circle`).data(n).enter().append(`circle`).attr(`id`,e=>`religionsCenter${e.i}`).attr(`data-id`,e=>e.i).attr(`r`,2).attr(`fill`,e=>e.color).attr(`cx`,e=>pack.cells.p[e.center][0]).attr(`cy`,e=>pack.cells.p[e.center][1]).on(`mouseenter`,(e,t)=>{h(`${t.name}. Drag to move the religion center`,!0),U(e)}).on(`mouseleave`,e=>{h(``,!0),W(e)}).call(v().on(`start`,ge))}function ge(e){let t=+this.dataset.id,r=n(this.getAttribute(`transform`)),i=+r[0]-e.x,a=+r[1]-e.y;function o(e){let{x:n,y:r}=e;this.setAttribute(`transform`,`translate(${i+n},${a+r})`);let o=Pack.findCell(n,r);o==null||pack.cells.h[o]<20||(pack.religions[t].center=o,Q())}let s=p(o,50);e.on(`drag`,s)}function _e(){if(d(`#legend`).selectAll(`*`).size()){ae();return}C(`Religions`,pack.religions.filter(e=>e.i&&!e.removed&&e.area).sort((e,t)=>(t.area??0)-(e.area??0)).map(e=>[e.i,e.color,e.name]))}function J(){if(l(`religionsBody`).dataset.type===`absolute`){l(`religionsBody`).dataset.type=`percentage`;let e=+l(`religionsFooterArea`).dataset.area,t=+l(`religionsFooterPopulation`).dataset.population;l(`religionsBody`).querySelectorAll(`:scope > .states`).forEach(n=>{let{area:r,population:i}=n.dataset;n.querySelector(`.religionArea`).innerText=`${a(+r/e*100)}%`,n.querySelector(`.religionPopulation`).innerText=`${a(+i/t*100)}%`})}else l(`religionsBody`).dataset.type=`absolute`,P.refresh()}async function ve(){customization||g.HierarchyTree.open({type:`religions`,data:pack.religions,onNodeEnter:U,onNodeLeave:W,getDescription:e=>{let{name:t,type:n,form:r,rural:i,urban:o}=e,c=()=>t.includes(n)||r.includes(n)?``:n===`Folk`||n===`Organized`?`. ${n} religion`:`. ${n}`,l=r===n?``:`. ${r}`,u=i*populationRate+o*populationRate*urbanization,d=u>0?`${s(a(u))} people`:`Extinct`;return`${t}${c()}${l}. ${d}`},getShape:({type:e})=>{if(e===`Folk`)return`circle`;if(e===`Organized`)return`square`;if(e===`Cult`)return`hexagon`;if(e===`Heresy`)return`diamond`}})}function ye(){j.showExtinct=!j.showExtinct,y.set(k,`filters`,j),Y(),P.reset(),q()}function Y(){l(`religionsBody`).dataset.extinct=j.showExtinct?`show`:`hide`,l(`religionsExtinct`).classList.toggle(`active`,j.showExtinct)}function be(){b.show(`religions`),g.PaintEditor.open({title:`Paint Religions`,parentDialogId:k,onClose:F,items:pack.religions.filter(e=>!e.removed&&(!e.i||e.cells)).map(e=>({id:e.i,name:e.name,color:e.color||`#ffffff`})),dontOverrideControl:!0,getValue:e=>pack.cells.religion[e],filterCell:e=>r(e,pack),onApply:xe})}function xe(e){for(let[t,n]of e)pack.cells.religion[t]=n;e.size&&(b.draw(`religions`),document.getElementById(k)&&L(),q())}function Se(){if(this.classList.contains(`pressed`)){X();return}customization=8,this.classList.add(`pressed`),h(`Click on the map to add a new religion`,!0),d(`#viewbox`).style(`cursor`,`crosshair`).on(`click`,Ce),l(`religionsBody`).querySelectorAll(`div > input, select, span, svg`).forEach(e=>{e.style.pointerEvents=`none`})}function X(){customization=0,S(),ee(),l(`religionsBody`).querySelectorAll(`div > input, select, span, svg`).forEach(e=>{e.style.removeProperty(`pointer-events`)});let e=l(`religionsAdd`);e.classList.contains(`pressed`)&&e.classList.remove(`pressed`)}function Ce(e){let[n,r]=t(e,this),i=Pack.findCell(n,r);if(pack.cells.h[i]<20){h(`You cannot place religion center into the water. Please click on a land cell`,!1,`error`);return}if(pack.religions.some(e=>!e.removed&&e.center===i)){h(`This cell is already a religion center. Please select a different cell`,!1,`error`);return}e.shiftKey===!1&&X(),Religions.add(i),b.draw(`religions`),L(),q()}function we(){let e=`Id,Name,Color,Type,Form,Supreme Deity,Area ${c(`2`)},Believers,Origins,Potential,Expansionism`,t=P.view().all.map(e=>{let t=u(e.area??0),n=a((e.rural??0)*populationRate+(e.urban??0)*populationRate*urbanization),r=`"${e.deity||``}"`,i=`"${(e.origins??[]).filter(e=>!!e).map(e=>pack.religions[e].name).join(`, `)}"`;return[e.i,e.name,e.color??``,e.type??``,e.form??``,r,t,n,i,e.expansion??``,e.i?e.expansionism??``:``].join(`,`)});f([e].concat(t).join(`
`),`${i(`Religions`)}.csv`)}function Te(){let e=+this.closest(`.states`).dataset.id,t=d(`#relig`).select(`#religion${e}`).node();t&&ie(t,4)}function Z(){if(customization)return;let e=+this.closest(`.states`).dataset.id,t=this.classList,n=pack.religions[e];n.lock=!n.lock,t.toggle(`icon-lock-open`),t.toggle(`icon-lock`)}function Q(e){!e&&!l(`religionsAutoChange`).checked||(Religions.recalculate(),b.draw(`religions`),L(),q())}function Ee(){d(`#debug`).select(`#religionCenters`).remove(),customization===8&&X(),$(`#religionsEditor`).dialog(`destroy`),l(`religionsEditor`).remove()}var De={open:F};export{De as ReligionsEditor};