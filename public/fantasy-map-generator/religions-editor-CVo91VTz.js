import{C as e,Et as t,M as n,P as r,S as i,Vt as a,d as o,dn as s,i as c,k as l,ot as u,r as d,z as f}from"./utils-BXw8fBj4.js";import{C as p,t as m,x as h}from"./layers-_nptVsMl.js";import{t as ee}from"./drag-BxIG-06a.js";import{t as te}from"./sin-DXK16t1M.js";import{t as ne}from"./highlight-jHumwiM5.js";import{t as re}from"./heightUtils-BfaaFPbS.js";import{r as g,t as _}from"./tooltips-0xeyl30m.js";import{a as v,n as y,r as b,t as x}from"./dialog-helpers-DT2MP2B1.js";import{t as S}from"./state-CHxunpWe.js";import{P as C,b as ie,j as w,y as ae}from"./index-CHSGsxIV.js";import{t as T}from"./highlighting-DTBMtNB_.js";import{i as E,n as D,r as O,t as oe}from"./table-CN7n7WQR.js";var k=`religionsEditor`,A={my:`right top`,at:`right-10 top+10`,of:`svg`,collision:`fit`},j,M=[{key:`color`,width:`1.2em`,permanent:!0},{key:`name`,label:`Religion`,width:`14em`,permanent:!0,sortBy:e=>e.name||``,sortType:`alpha`},{key:`type`,label:`Type`,width:`6em`,defaultSort:`asc`,sortBy:e=>e.type||``,sortType:`alpha`},{key:`form`,label:`Form`,width:`7em`,mobileHidden:!0,sortBy:e=>e.form||``,sortType:`alpha`},{key:`deity`,label:`Deity`,width:`14em`,mobileHidden:!0,sortBy:e=>e.deity||``,sortType:`alpha`},{key:`area`,label:`Area`,width:`7em`,mobileHidden:!0,sortBy:e=>e.area||0},{key:`population`,label:`Population`,width:`6em`,sortBy:e=>(e.rural||0)*populationRate+(e.urban||0)*populationRate*urbanization},{key:`expansion`,label:`Expansion`,width:`5em`,hidden:!0,mobileHidden:!0,sortBy:e=>e.expansion||``,sortType:`alpha`},{key:`expansionism`,label:`Expansionism`,width:`5em`,hidden:!0,mobileHidden:!0,sortBy:e=>e.expansionism||0},{key:`actions`,width:`3.2em`,permanent:!0,align:`right`}];function N(){return pack.religions.filter(e=>!e.removed&&!(e.i&&!e.cells&&!j.showExtinct))}var P=D({getData:()=>ie(k,N(),M),onUpdate:z});function F(){customization||(j=S.get(k,`filters`,()=>({showExtinct:!1})),x(`#${k}, .stable`),m.show(`religions`),m.hide(`states`,`biomes`),m.hide(`cultures`,`provinces`),I(),R(),q(),P.reset(),$(`#${k}`).dialog({title:`Religions Editor`,resizable:!1,width:`fit-content`,close:Ee,position:A}))}function I(){b(`religionsEditor`);let e=`<div id="religionsEditor" class="dialog stable editorDialog">
    <div id="religionsBody" class="table" data-type="absolute">${O({dialogId:k,columns:M})}</div>

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
  </div>`;l(`dialogs`).insertAdjacentHTML(`beforeend`,e),Y(),ae(k,P.reset),T(k,({cellId:e})=>pack.cells.religion[e]),l(`religionsEditorRefresh`).addEventListener(`click`,L),oe({dialogId:k,columns:M,onUpdate:()=>v(k,{width:`fit-content`,position:A})}),l(`religionsEditStyle`).addEventListener(`click`,()=>editStyle(`relig`)),l(`religionsLegend`).addEventListener(`click`,_e),l(`religionsPercentage`).addEventListener(`click`,J),l(`religionsHeirarchy`).addEventListener(`click`,ve),l(`religionsExtinct`).addEventListener(`click`,ye),l(`religionsManually`).addEventListener(`click`,be),l(`religionsAdd`).addEventListener(`click`,Se),l(`religionsExport`).addEventListener(`click`,we),l(`religionsRecalculate`).addEventListener(`click`,()=>Q(!0))}function L(){R(),P.refresh()}function R(){let{cells:e,religions:t,burgs:n}=pack;t.forEach(e=>{e.cells=e.area=e.rural=e.urban=0});for(let r of e.i){if(e.h[r]<20)continue;let i=e.religion[r];t[i].cells+=1,t[i].area+=e.area[r],t[i].rural+=e.pop[r];let a=e.burg[r];a&&(t[i].urban+=n[a].population)}}function z(e){let n=` ${c()}`,r=``,i=0,a=0;for(let n of e.all)i+=d(n.area??0),a+=t((n.rural??0)*populationRate+(n.urban??0)*populationRate*urbanization);for(let i of e.rows){let e=d(i.area??0),a=(i.rural??0)*populationRate,s=(i.urban??0)*populationRate*urbanization,c=t(a+s),l=`Believers: ${o(c)}; Rural areas: ${o(a)}; Urban areas: ${o(s)}. Click to change`;if(!i.i){r+=`<div
        class="states"
        data-id="${i.i}"
        data-name="${i.name}"
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
          value="${i.name}" autocorrect="off" spellcheck="false" data-col="name" />
        <select data-tip="Religion type" class="religionType placeholder" data-col="type">
          ${B(i.type)}
        </select>
        <input data-tip="Religion form" class="religionForm placeholder" value="" autocorrect="off" spellcheck="false" data-col="form" />
        <div data-col="deity">
          <span class="icon-arrows-cw placeholder"></span>
          <input class="religionDeity placeholder" value="" autocorrect="off" spellcheck="false" />
        </div>
        <div data-col="area">
          <span data-tip="Religion area" style="padding-right: 4px" class="icon-map-o"></span>
          <div data-tip="Religion area" class="religionArea">${o(e)+n}</div>
        </div>
        <div data-col="population">
          <span data-tip="${l}" class="icon-male"></span>
          <div data-tip="${l}" class="religionPopulation pointer">${o(c)}</div>
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
      </div>`;continue}r+=`<div
      class="states"
      data-id=${i.i}
      data-name="${i.name}"
      data-color="${i.color}"
      data-area=${e}
      data-population=${c}
      data-type="${i.type}"
      data-form="${i.form}"
      data-deity="${i.deity||``}"
      data-expansion="${i.expansion}"
      data-expansionism="${i.expansionism}"
    >
      <fill-box fill="${i.color}" data-col="color"></fill-box>
      <input data-tip="Religion name. Click and type to change" class="religionName"
        value="${i.name}" autocorrect="off" spellcheck="false" data-col="name" />
      <select data-tip="Religion type" class="religionType" data-col="type">
        ${B(i.type)}
      </select>
      <input data-tip="Religion form" class="religionForm"
        value="${i.form}" autocorrect="off" spellcheck="false" data-col="form" />
      <div data-col="deity">
        <span data-tip="Click to re-generate supreme deity" class="icon-arrows-cw pointer"></span>
        <input data-tip="Religion supreme deity" class="religionDeity"
          value="${i.deity||``}" autocorrect="off" spellcheck="false" />
      </div>
      <div data-col="area">
        <span data-tip="Religion area" style="padding-right: 4px" class="icon-map-o"></span>
        <div data-tip="Religion area" class="religionArea">${o(e)+n}</div>
      </div>
      <div data-col="population">
        <span data-tip="${l}" class="icon-male"></span>
        <div data-tip="${l}" class="religionPopulation pointer">${o(c)}</div>
      </div>
      ${V(i)}
      <div data-col="actions">
        <span data-tip="Locate the religion" class="icon-target"></span>
        <span data-tip="Lock this religion" class="icon-lock${i.lock?``:`-open`}"></span>
        <span data-tip="Remove religion" class="icon-trash-empty"></span>
      </div>
    </div>`}let s=l(`religionsBody`);s.querySelectorAll(`:scope > .states`).forEach(e=>{e.remove()}),s.insertAdjacentHTML(`beforeend`,r);let u=pack.religions.filter(e=>e.i&&!e.removed);l(`religionsOrganized`).innerHTML=String(u.filter(e=>e.type===`Organized`).length),l(`religionsHeresies`).innerHTML=String(u.filter(e=>e.type===`Heresy`).length),l(`religionsCults`).innerHTML=String(u.filter(e=>e.type===`Cult`).length),l(`religionsFolk`).innerHTML=String(u.filter(e=>e.type===`Folk`).length),l(`religionsFooterArea`).innerHTML=o(i)+n,l(`religionsFooterPopulation`).innerHTML=o(a),l(`religionsFooterArea`).dataset.area=String(i),l(`religionsFooterPopulation`).dataset.population=String(a),E(l(`religionsFooter`),e,P.goto),l(`religionsBody`).querySelectorAll(`:scope > .states`).forEach(e=>{e.addEventListener(`mouseenter`,U),e.addEventListener(`mouseleave`,W)}),l(`religionsBody`).querySelectorAll(`fill-box`).forEach(e=>void e.addEventListener(`click`,G)),l(`religionsBody`).querySelectorAll(`div > input.religionName`).forEach(e=>void e.addEventListener(`input`,K)),l(`religionsBody`).querySelectorAll(`div > select.religionType`).forEach(e=>void e.addEventListener(`change`,se)),l(`religionsBody`).querySelectorAll(`div > input.religionForm`).forEach(e=>void e.addEventListener(`input`,ce)),l(`religionsBody`).querySelectorAll(`div > input.religionDeity`).forEach(e=>void e.addEventListener(`input`,le)),l(`religionsBody`).querySelectorAll(`div > span.icon-arrows-cw`).forEach(e=>void e.addEventListener(`click`,ue)),l(`religionsBody`).querySelectorAll(`div > div.religionPopulation`).forEach(e=>void e.addEventListener(`click`,de)),l(`religionsBody`).querySelectorAll(`div > select.religionExtent`).forEach(e=>void e.addEventListener(`change`,fe)),l(`religionsBody`).querySelectorAll(`div > input.religionExpantion`).forEach(e=>void e.addEventListener(`change`,pe)),l(`religionsBody`).querySelectorAll(`div > span.icon-trash-empty`).forEach(e=>void e.addEventListener(`click`,me)),l(`religionsBody`).querySelectorAll(`div > span.icon-target`).forEach(e=>void e.addEventListener(`click`,Te)),l(`religionsBody`).querySelectorAll(`div > span.icon-lock`).forEach(e=>void e.addEventListener(`click`,Z)),l(`religionsBody`).querySelectorAll(`div > span.icon-lock-open`).forEach(e=>void e.addEventListener(`click`,Z)),l(`religionsBody`).dataset.type===`percentage`&&(l(`religionsBody`).dataset.type=`absolute`,J()),v(k,{width:`fit-content`,position:A})}function B(e){let t=``;return[`Folk`,`Organized`,`Cult`,`Heresy`].forEach(n=>{t+=`<option ${e===n?`selected`:``} value="${n}">${n}</option>`}),t}function V(e){if(e.type===`Folk`){let e=`Folk religions are not competitive and do not expand. Initially they cover all cells of their parent culture, but get ousted by organized religions when they expand`;return`
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
    </div>`}function H(e){let t=``;return[`global`,`state`,`culture`].forEach(n=>{t+=`<option ${e===n?`selected`:``} value="${n}">${n}</option>`}),t}var U=f(e=>{let t=Number(e.id||e.target.dataset.id),n=l(`religionsBody`).querySelector(`div[data-id='${t}']`);if(n&&n.classList.add(`active`),!m.isOn(`religions`)||customization)return;let r=a().duration(2e3).ease(te);s(`#relig`).select(`#religion${t}`).raise().transition(r).attr(`stroke-width`,2.5).attr(`stroke`,`#d0240f`),s(`#debug`).select(`#religionsCenter${t}`).raise().transition(r).attr(`r`,3).attr(`stroke`,`#d0240f`)},200);function W(e){let t=Number(e.id||e.target.dataset.id),n=l(`religionsBody`).querySelector(`div[data-id='${t}']`);n&&n.classList.remove(`active`),s(`#relig`).select(`#religion${t}`).transition().attr(`stroke-width`,null).attr(`stroke`,null),s(`#debug`).select(`#religionsCenter${t}`).transition().attr(`r`,2).attr(`stroke`,null)}function G(){let e=this.getAttribute(`fill`)||`#ffffff`,t=+this.parentNode.dataset.id;C.ColorPicker.open(e,e=>{this.fill=e,pack.religions[t].color=e,s(`#relig`).select(`#religion${t}`).attr(`fill`,e),s(`#debug`).select(`#religionsCenter${t}`).attr(`fill`,e)})}function K(){let e=+this.parentNode.dataset.id;this.parentNode.dataset.name=this.value;let t=pack.religions;t[e].name=this.value,t[e].code=u(this.value,t.flatMap(e=>e.code?[e.code]:[]))}function se(){let e=+this.parentNode.dataset.id;this.parentNode.dataset.type=this.value;let t=this.value;pack.religions[e].type=t}function ce(){let e=+this.parentNode.dataset.id;this.parentNode.dataset.form=this.value,pack.religions[e].form=this.value}function le(){let e=this.closest(`.states`),t=+e.dataset.id;e.dataset.deity=this.value,pack.religions[t].deity=this.value}function ue(){let e=this.closest(`.states`),t=+e.dataset.id,n=pack.religions[t].culture,r=Religions.getDeityName(n)??``;e.dataset.deity=r,pack.religions[t].deity=r,this.nextElementSibling.value=r}function de(){let e=+this.closest(`.states`).dataset.id,n=pack.religions[e];if(!n.cells){g(`Religion does not have any cells, cannot change population`,!1,`error`);return}let r=t((n.rural??0)*populationRate),i=t((n.urban??0)*populationRate*urbanization),a=r+i,o=e=>Number(e).toLocaleString(),s=pack.burgs.filter(t=>!t.removed&&pack.cells.religion[t.cell]===e);alertMessage.innerHTML=`<div>
    <i>All population of religion territory is considered believers of this religion. It means believers number change will directly affect population</i>
    <div style="margin: 0.5em 0">
      Rural: <input type="number" min="0" step="1" id="ruralPop" value=${r} style="width:6em" />
      Urban: <input type="number" min="0" step="1" id="urbanPop" value=${i} style="width:6em"
        ${s.length?``:`disabled`} />
    </div>
    <div>Total population: ${o(a)} ⇒ <span id="totalPop">${o(a)}</span>
      (<span id="totalPopPerc">100</span>%)
    </div>
  </div>`;let c=l(`ruralPop`),u=l(`urbanPop`),d=l(`totalPop`),f=l(`totalPopPerc`),p=()=>{let e=c.valueAsNumber+u.valueAsNumber;Number.isNaN(e)||(d.innerHTML=o(e),f.innerHTML=String(t(e/a*100)))};c.oninput=()=>p(),u.oninput=()=>p(),$(`#alert`).dialog({resizable:!1,title:`Change believers number`,width:`24em`,buttons:{Apply:function(){h(),$(this).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}},position:{my:`center`,at:`center`,of:`svg`}});function h(){let n=+c.value/r;if(Number.isFinite(n)&&n!==1&&pack.cells.i.filter(t=>pack.cells.religion[t]===e).forEach(e=>{pack.cells.pop[e]*=n}),!Number.isFinite(n)&&+c.value>0){let n=+c.value/populationRate,r=pack.cells.i.filter(t=>pack.cells.religion[t]===e),i=t(n/r.length);r.forEach(e=>{pack.cells.pop[e]=i})}let a=+u.value/i;if(Number.isFinite(a)&&a!==1&&s.forEach(e=>{e.population=t((e.population??0)*a,4)}),!Number.isFinite(a)&&+u.value>0){let e=+u.value/populationRate/urbanization,n=t(e/s.length,4);s.forEach(e=>{e.population=n})}m.draw(`population`),L()}}function fe(){let e=this.closest(`.states`),t=+e.dataset.id;e.dataset.expansion=this.value,pack.religions[t].expansion=this.value,Q()}function pe(){let e=this.closest(`.states`),t=+e.dataset.id;e.dataset.expansionism=this.value,pack.religions[t].expansionism=+this.value,Q()}function me(){if(customization)return;let e=+this.closest(`.states`).dataset.id;y({title:`Remove religion`,message:`Are you sure you want to remove the religion? <br>This action cannot be reverted`,confirm:`Remove`,onConfirm:()=>he(e)})}function he(e){s(`#relig`).select(`#religion${e}`).remove(),s(`#relig`).select(`#religion-gap${e}`).remove(),s(`#debug`).select(`#religionsCenter${e}`).remove(),pack.cells.religion.forEach((t,n)=>{t===e&&(pack.cells.religion[n]=0)}),pack.religions[e].removed=!0,pack.religions.filter(e=>e.i&&!e.removed).forEach(t=>{t.origins=(t.origins??[]).filter(t=>t!==e),t.origins.length||(t.origins=[0])}),L()}function q(){let e=s(`#debug`);e.select(`#religionCenters`).remove();let t=e.append(`g`).attr(`id`,`religionCenters`).attr(`stroke-width`,.8).attr(`stroke`,`#444444`).style(`cursor`,`move`),n=pack.religions.filter(e=>e.i&&e.center&&!e.removed);j.showExtinct||(n=n.filter(e=>(e.cells??0)>0)),t.selectAll(`circle`).data(n).enter().append(`circle`).attr(`id`,e=>`religionsCenter${e.i}`).attr(`data-id`,e=>e.i).attr(`r`,2).attr(`fill`,e=>e.color).attr(`cx`,e=>pack.cells.p[e.center][0]).attr(`cy`,e=>pack.cells.p[e.center][1]).on(`mouseenter`,(e,t)=>{g(`${t.name}. Drag to move the religion center`,!0),U(e)}).on(`mouseleave`,e=>{g(``,!0),W(e)}).call(ee().on(`start`,ge))}function ge(e){let t=+this.dataset.id,n=r(this.getAttribute(`transform`)),i=+n[0]-e.x,a=+n[1]-e.y;function o(e){let{x:n,y:r}=e;this.setAttribute(`transform`,`translate(${i+n},${a+r})`);let o=Pack.findCell(n,r);o==null||pack.cells.h[o]<20||(pack.religions[t].center=o,Q())}let s=f(o,50);e.on(`drag`,s)}function _e(){if(s(`#legend`).selectAll(`*`).size()){h();return}let e=pack.religions.filter(e=>e.i&&!e.removed&&e.area).sort((e,t)=>(t.area??0)-(e.area??0)).map(e=>[e.i,e.color,e.name]);p(`Religions`,e)}function J(){if(l(`religionsBody`).dataset.type===`absolute`){l(`religionsBody`).dataset.type=`percentage`;let e=+l(`religionsFooterArea`).dataset.area,n=+l(`religionsFooterPopulation`).dataset.population;l(`religionsBody`).querySelectorAll(`:scope > .states`).forEach(r=>{let{area:i,population:a}=r.dataset;r.querySelector(`.religionArea`).innerText=`${t(+i/e*100)}%`,r.querySelector(`.religionPopulation`).innerText=`${t(+a/n*100)}%`})}else l(`religionsBody`).dataset.type=`absolute`,P.refresh()}async function ve(){customization||C.HierarchyTree.open({type:`religions`,data:pack.religions,onNodeEnter:U,onNodeLeave:W,getDescription:e=>{let{name:n,type:r,form:i,rural:a,urban:s}=e,c=()=>n.includes(r)||i.includes(r)?``:r===`Folk`||r===`Organized`?`. ${r} religion`:`. ${r}`,l=i===r?``:`. ${i}`,u=a*populationRate+s*populationRate*urbanization,d=u>0?`${o(t(u))} people`:`Extinct`;return`${n}${c()}${l}. ${d}`},getShape:({type:e})=>{if(e===`Folk`)return`circle`;if(e===`Organized`)return`square`;if(e===`Cult`)return`hexagon`;if(e===`Heresy`)return`diamond`}})}function ye(){j.showExtinct=!j.showExtinct,S.set(k,`filters`,j),Y(),P.reset(),q()}function Y(){l(`religionsBody`).dataset.extinct=j.showExtinct?`show`:`hide`,l(`religionsExtinct`).classList.toggle(`active`,j.showExtinct)}function be(){m.show(`religions`),C.PaintEditor.open({title:`Paint Religions`,parentDialogId:k,onClose:F,items:pack.religions.filter(e=>!e.removed&&(!e.i||e.cells)).map(e=>({id:e.i,name:e.name,color:e.color||`#ffffff`})),dontOverrideControl:!0,getValue:e=>pack.cells.religion[e],filterCell:e=>re(e,pack),onApply:xe})}function xe(e){for(let[t,n]of e)pack.cells.religion[t]=n;e.size&&(m.draw(`religions`),document.getElementById(k)&&L(),q())}function Se(){if(this.classList.contains(`pressed`)){X();return}customization=8,this.classList.add(`pressed`),g(`Click on the map to add a new religion`,!0),s(`#viewbox`).style(`cursor`,`crosshair`).on(`click`,Ce),l(`religionsBody`).querySelectorAll(`div > input, select, span, svg`).forEach(e=>{e.style.pointerEvents=`none`})}function X(){customization=0,w(),_(),l(`religionsBody`).querySelectorAll(`div > input, select, span, svg`).forEach(e=>{e.style.removeProperty(`pointer-events`)});let e=l(`religionsAdd`);e.classList.contains(`pressed`)&&e.classList.remove(`pressed`)}function Ce(e){let[t,r]=n(e,this),i=Pack.findCell(t,r);if(pack.cells.h[i]<20){g(`You cannot place religion center into the water. Please click on a land cell`,!1,`error`);return}if(pack.religions.some(e=>!e.removed&&e.center===i)){g(`This cell is already a religion center. Please select a different cell`,!1,`error`);return}e.shiftKey===!1&&X(),Religions.add(i),m.draw(`religions`),L(),q()}function we(){let n=`Id,Name,Color,Type,Form,Supreme Deity,Area ${c(`2`)},Believers,Origins,Potential,Expansionism`,r=P.view().all.map(e=>{let n=d(e.area??0),r=t((e.rural??0)*populationRate+(e.urban??0)*populationRate*urbanization),i=`"${e.deity||``}"`,a=`"${(e.origins??[]).filter(e=>!!e).map(e=>pack.religions[e].name).join(`, `)}"`;return[e.i,e.name,e.color??``,e.type??``,e.form??``,i,n,r,a,e.expansion??``,e.i?e.expansionism??``:``].join(`,`)}),a=[n].concat(r).join(`
`),o=`${e(`Religions`)}.csv`;i(a,o)}function Te(){let e=+this.closest(`.states`).dataset.id,t=s(`#relig`).select(`#religion${e}`).node();t&&ne(t,4)}function Z(){if(customization)return;let e=+this.closest(`.states`).dataset.id,t=this.classList,n=pack.religions[e];n.lock=!n.lock,t.toggle(`icon-lock-open`),t.toggle(`icon-lock`)}function Q(e){(e||l(`religionsAutoChange`).checked)&&(Religions.recalculate(),m.draw(`religions`),L(),q())}function Ee(){s(`#debug`).select(`#religionCenters`).remove(),customization===8&&X(),$(`#religionsEditor`).dialog(`destroy`),l(`religionsEditor`).remove()}var De={open:F};export{De as ReligionsEditor};