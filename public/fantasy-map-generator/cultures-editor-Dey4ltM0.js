import{Bt as e,M as t,N as n,P as r,S as i,T as a,Tt as o,at as s,d as c,i as l,k as u,r as d,un as f,vt as p,w as ee,z as m}from"./utils-D3KEhgY0.js";import{t as te}from"./sin-DXK16t1M.js";import{r as h,t as ne}from"./tooltips-D1wvMKni.js";import{t as g}from"./emblems-generator-BtgqM7bc.js";import{C as re,H as ie,J as _,K as v,Kt as y,Mt as ae,Q as b,U as oe,W as se,X as ce,bt as le,g as x,q as ue,w as de,xt as fe}from"./index-D3JPylQY.js";import{t as pe}from"./highlighting-Dl5muJeM.js";import{a as me,i as he,n as ge,r as _e,t as ve}from"./table-D__vupD5.js";var S={},C={},w=34,T=10,E=13;function D(e){return Function(`d`,`return {`+e.map(function(e,t){return JSON.stringify(e)+`: d[`+t+`] || ""`}).join(`,`)+`}`)}function ye(e,t){var n=D(e);return function(r,i){return t(n(r),i,e)}}function O(e){var t=Object.create(null),n=[];return e.forEach(function(e){for(var r in e)r in t||n.push(t[r]=r)}),n}function k(e,t){var n=e+``,r=n.length;return r<t?Array(t-r+1).join(0)+n:n}function be(e){return e<0?`-`+k(-e,6):e>9999?`+`+k(e,6):k(e,4)}function A(e){var t=e.getUTCHours(),n=e.getUTCMinutes(),r=e.getUTCSeconds(),i=e.getUTCMilliseconds();return isNaN(e)?`Invalid Date`:be(e.getUTCFullYear(),4)+`-`+k(e.getUTCMonth()+1,2)+`-`+k(e.getUTCDate(),2)+(i?`T`+k(t,2)+`:`+k(n,2)+`:`+k(r,2)+`.`+k(i,3)+`Z`:r?`T`+k(t,2)+`:`+k(n,2)+`:`+k(r,2)+`Z`:n||t?`T`+k(t,2)+`:`+k(n,2)+`Z`:``)}function j(e){var t=RegExp(`["`+e+`
\r]`),n=e.charCodeAt(0);function r(e,t){var n,r,a=i(e,function(e,i){if(n)return n(e,i-1);r=e,n=t?ye(e,t):D(e)});return a.columns=r||[],a}function i(e,t){var r=[],i=e.length,a=0,o=0,s,c=i<=0,l=!1;e.charCodeAt(i-1)===T&&--i,e.charCodeAt(i-1)===E&&--i;function u(){if(c)return C;if(l)return l=!1,S;var t,r=a,o;if(e.charCodeAt(r)===w){for(;a++<i&&e.charCodeAt(a)!==w||e.charCodeAt(++a)===w;);return(t=a)>=i?c=!0:(o=e.charCodeAt(a++))===T?l=!0:o===E&&(l=!0,e.charCodeAt(a)===T&&++a),e.slice(r+1,t-1).replace(/""/g,`"`)}for(;a<i;){if((o=e.charCodeAt(t=a++))===T)l=!0;else if(o===E)l=!0,e.charCodeAt(a)===T&&++a;else if(o!==n)continue;return e.slice(r,t)}return c=!0,e.slice(r,i)}for(;(s=u())!==C;){for(var d=[];s!==S&&s!==C;)d.push(s),s=u();t&&(d=t(d,o++))==null||r.push(d)}return r}function a(t,n){return t.map(function(t){return n.map(function(e){return u(t[e])}).join(e)})}function o(t,n){return n??=O(t),[n.map(u).join(e)].concat(a(t,n)).join(`
`)}function s(e,t){return t??=O(e),a(e,t).join(`
`)}function c(e){return e.map(l).join(`
`)}function l(t){return t.map(u).join(e)}function u(e){return e==null?``:e instanceof Date?A(e):t.test(e+=``)?`"`+e.replace(/"/g,`""`)+`"`:e}return{parse:r,parseRows:i,format:o,formatBody:s,formatRows:c,formatRow:l,formatValue:u}}var M=j(`,`),xe=M.parse;M.parseRows,M.format,M.formatBody,M.formatRows,M.formatRow,M.formatValue;var N=`culturesEditor`,P={my:`right top`,at:`right-10 top+10`,of:`svg`,collision:`fit`},F=[{key:`color`,width:`1.2em`,permanent:!0},{key:`name`,label:`Culture`,width:`10em`,permanent:!0,sortBy:e=>e.name||``,sortType:`alpha`},{key:`type`,label:`Type`,width:`6em`,mobileHidden:!0,sortBy:e=>e.type||``,sortType:`alpha`},{key:`base`,label:`Namesbase`,width:`9em`,mobileHidden:!0,sortBy:e=>e.base},{key:`cells`,label:`Cells`,width:`5em`,hidden:!0,sortBy:e=>e.cells||0},{key:`expansionism`,label:`Expansion`,width:`5em`,hidden:!0,mobileHidden:!0,sortBy:e=>e.expansionism||0},{key:`area`,label:`Area`,width:`7em`,mobileHidden:!0,sortBy:e=>e.area||0},{key:`population`,label:`Population`,width:`6em`,defaultSort:`desc`,sortBy:e=>(e.rural||0)*populationRate+(e.urban||0)*populationRate*urbanization},{key:`emblems`,label:`Emblems`,width:`7em`,hidden:!0,mobileHidden:!0,sortBy:e=>e.shield||``,sortType:`alpha`},{key:`actions`,width:`3.2em`,permanent:!0,align:`right`}],I=ge({getData:()=>de(N,pack.cultures.filter(e=>!e.removed),F),onUpdate:B});function L(){customization||(ie(`#${N}, .stable`),b.show(`cultures`),b.hide(`states`,`biomes`),b.hide(`religions`,`provinces`),Se(),z(),J(),I.reset(),$(`#${N}`).dialog({title:`Cultures Editor`,resizable:!1,width:`fit-content`,close:He,position:P}))}function Se(){se(`culturesEditor`);let e=`<div id="culturesEditor" class="dialog stable editorDialog">
    <div id="culturesBody" class="table" data-type="absolute">${_e({dialogId:N,columns:F})}</div>

    <div id="culturesFooter" class="totalLine">
      <div data-tip="Cultures number" style="margin-left: 12px">Cultures:&nbsp;<span id="culturesFooterCultures">0</span></div>
      <div data-tip="Total land cells number" style="margin-left: 12px" data-col="cells">Cells:&nbsp;<span id="culturesFooterCells">0</span></div>
      <div data-tip="Total land area" style="margin-left: 12px" data-col="area">Land Area:&nbsp;<span id="culturesFooterArea">0</span></div>
      <div data-tip="Total population" style="margin-left: 12px" data-col="population">Population:&nbsp;<span id="culturesFooterPopulation">0</span></div>
    </div>

    <div id="culturesBottom" class="editorToolbar">
      <button id="culturesEditorRefresh" data-tip="Refresh the Editor" class="icon-cw"></button>
      <button id="culturesEditStyle" data-tip="Edit cultures style in Style Editor" class="icon-adjust"></button>
      <button id="culturesLegend" data-tip="Toggle Legend box" class="icon-list-bullet"></button>
      <button id="culturesPercentage" data-tip="Toggle percentage / absolute values display mode" class="icon-percent"></button>
      <button id="culturesHeirarchy" data-tip="Show cultures hierarchy tree" class="icon-sitemap"></button>
      <button id="culturesManually" data-tip="Manually re-assign cultures" class="icon-brush"></button>
      <button id="culturesEditNamesBase" data-tip="Edit a database used for names generation" class="icon-font"></button>
      <button id="culturesAdd" data-tip="Add a new culture. Hold Shift to add multiple" class="icon-plus"></button>
      <button id="culturesExport" data-tip="Download cultures-related data" class="icon-download"></button>
      <button id="culturesImport" data-tip="Upload cultures-related data" class="icon-upload"></button>
      <button id="culturesRecalculate" data-tip="Recalculate cultures based on current values of growth-related attributes" class="icon-retweet"></button>
      <span
        data-tip="Allow culture centers, expansion and type changes to take an immediate effect"
        class="editorToolbarPanel"
        style="display: inline-flex"
      >
        <input id="culturesAutoChange" class="checkbox" type="checkbox" />
        <label for="culturesAutoChange" class="checkbox-label"><i>auto-apply changes</i></label>
      </span>
    </div>
  </div>`;u(`dialogs`).insertAdjacentHTML(`beforeend`,e),re(N,I.reset),pe(N,({cellId:e})=>pack.cells.culture[e]),u(`culturesEditorRefresh`).addEventListener(`click`,R),ve({dialogId:N,columns:F,onUpdate:()=>v(N,{width:`fit-content`,position:P})}),u(`culturesEditStyle`).addEventListener(`click`,()=>editStyle(`cults`)),u(`culturesLegend`).addEventListener(`click`,Fe),u(`culturesPercentage`).addEventListener(`click`,Y),u(`culturesHeirarchy`).addEventListener(`click`,Ie),u(`culturesRecalculate`).addEventListener(`click`,()=>X(!0)),u(`culturesManually`).addEventListener(`click`,Le),u(`culturesEditNamesBase`).addEventListener(`click`,()=>_.NamesbaseEditor.open()),u(`culturesAdd`).addEventListener(`click`,ze),u(`culturesExport`).addEventListener(`click`,Ve),u(`culturesImport`).addEventListener(`click`,()=>u(`culturesCSVToLoad`).click()),u(`culturesCSVToLoad`).addEventListener(`change`,Ue)}function R(){z(),I.refresh(),J()}function z(){let{cells:e,cultures:t,burgs:n}=pack;t.forEach(e=>{e.cells=e.area=e.rural=e.urban=0});for(let r of e.i){if(e.h[r]<20)continue;let i=e.culture[r];t[i].cells+=1,t[i].area+=e.area[r],t[i].rural+=e.pop[r];let a=e.burg[r];a&&(t[i].urban+=n[a].population)}}function B(e){let t=l(),n=``,r=0,i=0;for(let t of e.all)r+=d(t.area??0),i+=o((t.rural??0)*populationRate+(t.urban??0)*populationRate*urbanization);for(let r of e.rows){let e=d(r.area??0),i=(r.rural??0)*populationRate,a=(r.urban??0)*populationRate*urbanization,s=o(i+a),l=`Total population: ${c(s)}. Rural population: ${c(i)}. Urban population: ${c(a)}. Click to edit`;if(!r.i){n+=`<div
          class="states"
          data-id="${r.i}"
          data-name="${r.name}"
          data-color=""
          data-cells="${r.cells}"
          data-area="${e}"
          data-population="${s}"
          data-base="${r.base}"
          data-type=""
          data-expansionism=""
          data-emblems="${r.shield}"
        >
          <svg width="11" height="11" class="placeholder" data-col="color"></svg>
          <div data-col="name">
            <input data-tip="Neutral culture name. Click and type to change" class="cultureName italic"
              value="${r.name}" autocorrect="off" spellcheck="false" />
            <span class="icon-cw placeholder"></span>
          </div>
          <select class="cultureType placeholder" data-col="type">${V(r.type)}</select>
          <div data-col="base">
            <span data-tip="Click to re-generate names for burgs with this culture assigned" class="icon-arrows-cw"></span>
            <select data-tip="Culture namesbase. Click to change. Click on arrows to re-generate names"
              class="cultureBase">${H(r.base)}</select>
          </div>
          <div data-col="cells">
            <span data-tip="Cells count" class="icon-check-empty"></span>
            <div data-tip="Cells count" class="cultureCells">${r.cells}</div>
          </div>
          <div data-col="expansionism">
            <span class="icon-resize-full placeholder"></span>
            <input class="cultureExpan placeholder" type="number" />
          </div>
          <div data-col="area">
            <span data-tip="Culture area" class="icon-map-o"></span>
            <div data-tip="Culture area" class="cultureArea">${c(e)} ${t}</div>
          </div>
          <div data-col="population">
            <span data-tip="${l}" class="icon-male"></span>
            <div data-tip="${l}" class="culturePopulation pointer">${c(s)}</div>
          </div>
          <div data-col="emblems">${U(g.isDiversiform,r.shield)}</div>
          <div data-col="actions"></div>
        </div>`;continue}n+=`<div
        class="states"
        data-id="${r.i}"
        data-name="${r.name}"
        data-color="${r.color}"
        data-cells="${r.cells}"
        data-area="${e}"
        data-population="${s}"
        data-base="${r.base}"
        data-type="${r.type}"
        data-expansionism="${r.expansionism}"
        data-emblems="${r.shield}"
      >
        <fill-box fill="${r.color}" data-col="color"></fill-box>
        <div data-col="name">
          <input data-tip="Culture name. Click and type to change" class="cultureName"
            value="${r.name}" autocorrect="off" spellcheck="false" />
          <span data-tip="Regenerate culture name" class="icon-cw hiddenIcon" style="visibility: hidden"></span>
        </div>
        <select data-tip="Culture type. Defines growth model. Click to change"
          class="cultureType" data-col="type">${V(r.type)}</select>
        <div data-col="base">
          <span data-tip="Click to re-generate names for burgs with this culture assigned" class="icon-arrows-cw"></span>
          <select data-tip="Culture namesbase. Click to change. Click on arrows to re-generate names"
            class="cultureBase">${H(r.base)}</select>
        </div>
        <div data-col="cells">
          <span data-tip="Cells count" class="icon-check-empty"></span>
          <div data-tip="Cells count" class="cultureCells">${r.cells}</div>
        </div>
        <div data-col="expansionism">
          <span data-tip="Culture expansionism. Defines competitive size" class="icon-resize-full"></span>
          <input
            data-tip="Culture expansionism. Defines competitive size. Click to change, then click Recalculate to apply change"
            class="cultureExpan"
            type="number"
            min="0"
            max="99"
            step=".1"
            value=${r.expansionism}
          />
        </div>
        <div data-col="area">
          <span data-tip="Culture area" class="icon-map-o"></span>
          <div data-tip="Culture area" class="cultureArea">${c(e)} ${t}</div>
        </div>
        <div data-col="population">
          <span data-tip="${l}" class="icon-male"></span>
          <div data-tip="${l}" class="culturePopulation pointer">${c(s)}</div>
        </div>
        <div data-col="emblems">${U(g.isDiversiform,r.shield)}</div>
        <div data-col="actions">
          <span data-tip="Locate the culture" class="icon-target"></span>
          <span data-tip="Lock culture" class="icon-lock${r.lock?``:`-open`}"></span>
          <span data-tip="Remove culture" class="icon-trash-empty"></span>
        </div>
      </div>`}let a=u(`culturesBody`);a.querySelectorAll(`:scope > .states`).forEach(e=>{e.remove()}),a.insertAdjacentHTML(`beforeend`,n),u(`culturesFooterCultures`).innerHTML=String(pack.cultures.filter(e=>e.i&&!e.removed).length),u(`culturesFooterCells`).innerHTML=String(pack.cells.h.filter(e=>e>=20).length),u(`culturesFooterArea`).innerHTML=`${c(r)} ${t}`,u(`culturesFooterPopulation`).innerHTML=c(i),u(`culturesFooterArea`).dataset.area=String(r),u(`culturesFooterPopulation`).dataset.population=String(i),he(u(`culturesFooter`),e,I.goto),u(`culturesBody`).querySelectorAll(`:scope > div.states`).forEach(e=>{e.addEventListener(`mouseenter`,W),e.addEventListener(`mouseleave`,G)}),u(`culturesBody`).querySelectorAll(`fill-box`).forEach(e=>void e.addEventListener(`click`,Ce)),u(`culturesBody`).querySelectorAll(`div > input.cultureName`).forEach(e=>void e.addEventListener(`input`,we)),u(`culturesBody`).querySelectorAll(`div > span.icon-cw`).forEach(e=>void e.addEventListener(`click`,Te)),u(`culturesBody`).querySelectorAll(`div > input.cultureExpan`).forEach(e=>void e.addEventListener(`change`,Ee)),u(`culturesBody`).querySelectorAll(`div > select.cultureType`).forEach(e=>void e.addEventListener(`change`,De)),u(`culturesBody`).querySelectorAll(`div > select.cultureBase`).forEach(e=>void e.addEventListener(`change`,Oe)),u(`culturesBody`).querySelectorAll(`div > select.cultureEmblems`).forEach(e=>void e.addEventListener(`change`,ke)),u(`culturesBody`).querySelectorAll(`div > div.culturePopulation`).forEach(e=>void e.addEventListener(`click`,Ae)),u(`culturesBody`).querySelectorAll(`div > span.icon-arrows-cw`).forEach(e=>void e.addEventListener(`click`,je)),u(`culturesBody`).querySelectorAll(`div > span.icon-target`).forEach(e=>void e.addEventListener(`click`,Me)),u(`culturesBody`).querySelectorAll(`div > span.icon-trash-empty`).forEach(e=>void e.addEventListener(`click`,Ne)),u(`culturesBody`).querySelectorAll(`div > span.icon-lock`).forEach(e=>void e.addEventListener(`click`,Q)),u(`culturesBody`).querySelectorAll(`div > span.icon-lock-open`).forEach(e=>void e.addEventListener(`click`,Q)),me(N,g.isDiversiform?[]:[`emblems`]),u(`culturesBody`).dataset.type===`percentage`&&(u(`culturesBody`).dataset.type=`absolute`,Y()),v(N,{width:`fit-content`,position:P})}function V(e){let t=``;return x.forEach(n=>{t+=`<option ${e===n?`selected`:``} value="${n}">${n}</option>`}),t}function H(e){let t=``;return Names.nameBases.forEach((n,r)=>{t+=`<option ${e===r?`selected`:``} value="${r}">${n.name}</option>`}),Names.nameBases[e]||(t+=`<option selected value="${e}">removed</option>`),t}function U(e,t){return e?`<select data-tip="Emblem shape associated with culture. Click to change" class="cultureEmblems">${Object.keys(g.shields.types).flatMap(e=>Object.keys(g.shields[e])).map(e=>`<option ${e===t?`selected`:``} value="${e}">${n(e)}</option>`)}</select>`:``}var W=m(t=>{let n=Number(t.id||t.target.dataset.id);if(!b.isOn(`cultures`)||customization)return;let r=e().duration(2e3).ease(te);f(`#cults`).select(`#culture${n}`).raise().transition(r).attr(`stroke-width`,2.5).attr(`stroke`,`#d0240f`),f(`#debug`).select(`#cultureCenter${n}`).raise().transition(r).attr(`r`,3).attr(`stroke`,`#d0240f`)},200);function G(e){let t=Number(e.id||e.target.dataset.id);b.isOn(`cultures`)&&(f(`#cults`).select(`#culture${t}`).transition().attr(`stroke-width`,null).attr(`stroke`,null),f(`#debug`).select(`#cultureCenter${t}`).transition().attr(`r`,2).attr(`stroke`,null))}function Ce(){let e=this.getAttribute(`fill`)||`#ffffff`,t=+this.parentNode.dataset.id;_.ColorPicker.open(e,e=>{this.fill=e,pack.cultures[t].color=e,f(`#cults`).select(`#culture${t}`).attr(`fill`,e),f(`#debug`).select(`#cultureCenter${t}`).attr(`fill`,e)})}function we(){let e=this.closest(`.states`),t=+e.dataset.id;e.dataset.name=this.value;let n=pack.cultures;n[t].name=this.value,n[t].code=s(this.value,n.flatMap(e=>e.code?[e.code]:[]))}function Te(){let e=+this.closest(`.states`).dataset.id,t=pack.cultures[e].base;if(!Names.nameBases[t]){h(`Namesbase is not defined, please select a valid namesbase`,!1,`error`,5e3);return}let n=Names.getCultureShort(e);this.parentNode.querySelector(`input.cultureName`).value=n,pack.cultures[e].name=n}function Ee(){let e=this.closest(`.states`),t=+e.dataset.id;e.dataset.expansionism=this.value,pack.cultures[t].expansionism=+this.value,X()}function De(){let e=+this.parentNode.dataset.id;this.parentNode.dataset.type=this.value;let t=this.value;pack.cultures[e].type=t,X()}function Oe(){let e=this.closest(`.states`),t=+e.dataset.id,n=+this.value;pack.cultures[t].base=n,e.dataset.base=String(n)}function ke(){let e=this.closest(`.states`),t=+e.dataset.id,n=this.value;e.dataset.emblems=pack.cultures[t].shield=n;let r=(e,t)=>{let n=document.getElementById(e);n&&(n.remove(),ae.trigger(e,t))};pack.states.forEach(e=>{e.culture!==t||!e.i||e.removed||!e.coa||e.coa.custom||n!==e.coa.shield&&(e.coa.shield=n,r(`stateCOA${e.i}`,e.coa))}),pack.provinces.forEach(e=>{pack.cells.culture[e.center]!==t||!e.i||e.removed||!e.coa||e.coa.custom||n!==e.coa.shield&&(e.coa.shield=n,r(`provinceCOA${e.i}`,e.coa))}),pack.burgs.forEach(e=>{e.culture!==t||!e.i||e.removed||!e.coa||e.coa.custom||n!==e.coa.shield&&(e.coa.shield=n,r(`burgCOA${e.i}`,e.coa))})}function Ae(){let e=+this.closest(`.states`).dataset.id,t=pack.cultures[e];if(!t.cells){h(`Culture does not have any cells, cannot change population`,!1,`error`);return}let n=o((t.rural??0)*populationRate),r=o((t.urban??0)*populationRate*urbanization),i=n+r,a=e=>Number(e).toLocaleString(),s=pack.burgs.filter(t=>!t.removed&&t.culture===e);alertMessage.innerHTML=`<div>
    <i>Change population of all cells assigned to the culture</i>
    <div style="margin: 0.5em 0">
      Rural: <input type="number" min="0" step="1" id="ruralPop" value=${n} style="width:6em" />
      Urban: <input type="number" min="0" step="1" id="urbanPop" value=${r} style="width:6em"
        ${s.length?``:`disabled`} />
    </div>
    <div>Total population: ${a(i)} ⇒ <span id="totalPop">${a(i)}</span>
      (<span id="totalPopPerc">100</span>%)
    </div>
  </div>`;let c=u(`ruralPop`),l=u(`urbanPop`),d=u(`totalPop`),f=u(`totalPopPerc`),p=()=>{let e=c.valueAsNumber+l.valueAsNumber;Number.isNaN(e)||(d.innerHTML=a(e),f.innerHTML=String(o(e/i*100)))};c.oninput=()=>p(),l.oninput=()=>p(),$(`#alert`).dialog({resizable:!1,title:`Change culture population`,width:`24em`,buttons:{Apply:function(){K(n,r,+c.value,+l.value,e),$(this).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}},position:{my:`center`,at:`center`,of:`svg`}})}function K(e,t,n,r,i){let a=n/e;if(Number.isFinite(a)&&a!==1&&pack.cells.i.filter(e=>pack.cells.culture[e]===i).forEach(e=>{pack.cells.pop[e]*=a}),!Number.isFinite(a)&&+n>0){let e=n/populationRate,t=pack.cells.i.filter(e=>pack.cells.culture[e]===i),r=o(e/t.length);t.forEach(e=>{pack.cells.pop[e]=r})}let s=pack.burgs.filter(e=>!e.removed&&e.culture===i),c=r/t;if(Number.isFinite(c)&&c!==1&&s.forEach(e=>{e.population=o((e.population??0)*c,4)}),!Number.isFinite(c)&&+r>0){let e=o(r/populationRate/urbanization/s.length,4);s.forEach(t=>{t.population=e})}b.draw(`population`),R()}function je(){if(customization===4)return;let e=+this.closest(`.states`).dataset.id,t=pack.cultures[e].base;if(!Names.nameBases[t]){h(`Namesbase is not defined, please select a valid namesbase`,!1,`error`,5e3);return}let n=pack.burgs.filter(t=>t.culture===e&&!t.removed&&!t.lock);n.forEach(t=>{t.name=Names.getCulture(e)}),b.draw(`labels`),h(`Names for ${n.length} burgs are regenerated`,!1,`success`)}function q(e){f(`#cults`).select(`#culture${e}`).remove(),f(`#debug`).select(`#cultureCenter${e}`).remove();let{burgs:t,states:n,cells:r,cultures:i}=pack;t.filter(t=>t.culture===e).forEach(e=>{e.culture=0}),n.forEach(t=>{t.culture===e&&(t.culture=0)}),r.culture.forEach((t,n)=>{t===e&&(r.culture[n]=0)}),i[e].removed=!0,i.filter(e=>e.i&&!e.removed).forEach(t=>{t.origins=(t.origins??[]).filter(t=>t!==e),t.origins.length||(t.origins=[0])}),R()}function Me(){let e=+this.closest(`.states`).dataset.id;ce(f(`#cults`).select(`#culture${e}`).node(),4)}function Ne(){if(customization)return;let e=+this.closest(`.states`).dataset.id;oe({title:`Remove culture`,message:`Are you sure you want to remove the culture? <br>This action cannot be reverted`,confirm:`Remove`,onConfirm:()=>q(e)})}function J(){let e=f(`#debug`);e.select(`#cultureCenters`).remove();let t=e.append(`g`).attr(`id`,`cultureCenters`).attr(`stroke-width`,.8).attr(`stroke`,`#444444`).style(`cursor`,`move`),n=pack.cultures.filter(e=>e.i&&!e.removed);t.selectAll(`circle`).data(n).enter().append(`circle`).attr(`id`,e=>`cultureCenter${e.i}`).attr(`data-id`,e=>e.i).attr(`r`,2).attr(`fill`,e=>e.color).attr(`cx`,e=>pack.cells.p[e.center][0]).attr(`cy`,e=>pack.cells.p[e.center][1]).on(`mouseenter`,(e,t)=>{h(`Drag to move the culture center (ancestral home)`,!0),u(`culturesBody`).querySelector(`div[data-id='${t.i}']`)?.classList.add(`selected`),W(e)}).on(`mouseleave`,(e,t)=>{h(``,!0),u(`culturesBody`).querySelector(`div[data-id='${t.i}']`)?.classList.remove(`selected`),G(e)}).call(y().on(`start`,Pe))}function Pe(e){let t=+this.id.slice(13),n=r(this.getAttribute(`transform`)),i=+n[0]-e.x,a=+n[1]-e.y;function o(e){let{x:n,y:r}=e;this.setAttribute(`transform`,`translate(${i+n},${a+r})`);let o=Pack.findCell(n,r);o==null||pack.cells.h[o]<20||(pack.cultures[t].center=o,X())}let s=m(o,50);e.on(`drag`,s)}function Fe(){if(f(`#legend`).selectAll(`*`).size()){le();return}fe(`Cultures`,pack.cultures.filter(e=>e.i&&!e.removed&&e.cells).sort((e,t)=>(t.area??0)-(e.area??0)).map(e=>[e.i,e.color,e.name]))}function Y(){if(u(`culturesBody`).dataset.type===`absolute`){u(`culturesBody`).dataset.type=`percentage`;let e=+u(`culturesFooterCells`).innerText,t=+u(`culturesFooterArea`).dataset.area,n=+u(`culturesFooterPopulation`).dataset.population;u(`culturesBody`).querySelectorAll(`:scope > div.states`).forEach(r=>{let{cells:i,area:a,population:s}=r.dataset;r.querySelector(`.cultureCells`).innerText=`${o(+i/e*100)}%`,r.querySelector(`.cultureArea`).innerText=`${o(+a/t*100)}%`,r.querySelector(`.culturePopulation`).innerText=`${o(+s/n*100)}%`})}else u(`culturesBody`).dataset.type=`absolute`,I.refresh()}async function Ie(){customization||_.HierarchyTree.open({type:`cultures`,data:pack.cultures,onNodeEnter:W,onNodeLeave:G,getDescription:e=>{let{name:t,type:n,rural:r,urban:i}=e,a=r*populationRate+i*populationRate*urbanization;return`${t} culture. ${n}. ${a>0?`${c(o(a))} people`:`Extinct`}`},getShape:({type:e})=>{if(e===`Generic`)return`circle`;if(e===`River`)return`diamond`;if(e===`Lake`)return`hexagon`;if(e===`Naval`)return`square`;if(e===`Highland`)return`concave`;if(e===`Nomadic`)return`octagon`;if(e===`Hunting`)return`pentagon`}})}function X(e){(e||u(`culturesAutoChange`).checked)&&(Cultures.expand(),b.draw(`cultures`),pack.burgs.forEach(e=>{!e.i||e.removed||(e.culture=pack.cells.culture[e.cell])}),R())}function Le(){b.show(`cultures`),_.PaintEditor.open({title:`Paint Cultures`,parentDialogId:N,onClose:L,items:pack.cultures.filter(e=>!e.removed).map(e=>({id:e.i,name:e.name,color:e.color||`#ffffff`})),dontOverrideControl:!0,getValue:e=>pack.cells.culture[e],filterCell:e=>i(e,pack),onApply:Re})}function Re(e){for(let[t,n]of e)pack.cells.culture[t]=n,pack.cells.burg[t]&&(pack.burgs[pack.cells.burg[t]].culture=n);e.size&&(b.draw(`cultures`),document.getElementById(N)&&R())}function ze(){if(this.classList.contains(`pressed`)){Z();return}customization=9,this.classList.add(`pressed`),h(`Click on the map to add a new culture`,!0),f(`#viewbox`).style(`cursor`,`crosshair`).on(`click`,Be),u(`culturesBody`).querySelectorAll(`div > input, select, span, svg`).forEach(e=>{e.style.pointerEvents=`none`})}function Z(){customization=0,ue(),ne(),u(`culturesBody`).querySelectorAll(`div > input, select, span, svg`).forEach(e=>{e.style.removeProperty(`pointer-events`)});let e=u(`culturesAdd`);e.classList.contains(`pressed`)&&e.classList.remove(`pressed`)}function Be(e){let n=t(e,this),r=Pack.findCell(n[0],n[1]);if(pack.cells.h[r]<20){h(`You cannot place culture center into the water. Please click on a land cell`,!1,`error`);return}if(pack.cultures.some(e=>!e.removed&&e.center===r)){h(`This cell is already a culture center. Please select a different cell`,!1,`error`);return}e.shiftKey===!1&&Z(),Cultures.add(r),J(),I.refresh()}function Ve(){let e=`Id,Name,Color,Cells,Expansionism,Type,Area ${l(`2`)},Population,Namesbase,Emblems Shape,Origins`,t=I.view().all.map(e=>{let t=d(e.area??0),n=o((e.rural??0)*populationRate+(e.urban??0)*populationRate*urbanization),r=Names.nameBases[e.base].name,i=`"${(e.origins??[]).filter(e=>!!e).map(e=>pack.cultures[e].name).join(`, `)}"`;return[e.i,e.name,e.i&&e.color||``,e.cells||0,e.i?e.expansionism||0:``,e.i?e.type:``,t,n,r,e.shield,i].join(`,`)});ee([e].concat(t).join(`
`),`${a(`Cultures`)}.csv`)}function He(){f(`#debug #cultureCenters`).remove(),customization===9&&Z(),$(`#culturesEditor`).dialog(`destroy`),u(`culturesEditor`).remove()}async function Ue(){let e=this.files[0];this.value=``;let t=xe(await e.text(),e=>({name:e.Name,i:+e.Id,color:e.Color,expansionism:+e.Expansionism,type:e.Type,population:+e.Population,emblemsShape:e[`Emblems Shape`],origins:e.Origins,namesbase:e.Namesbase})),{cultures:n,cells:r}=pack,i=Object.keys(g.shields.types).flatMap(e=>Object.keys(g.shields[e])),a=r.pop.map((e,t)=>e?t:null).filter(e=>e);n.forEach(e=>{e.i&&(e.removed=!0)});for(let e of t){let t;if(e.i<n.length){t=n[e.i];let r=t.urban/(t.rural+t.urban);K(t.rural,t.urban,e.population*(1-r),e.population*r,e.i)}else t={i:n.length,center:p(a),area:0,cells:0,origins:[0],rural:0,urban:0},n.push(t);t.removed=!1,t.name=e.name,t.i&&(t.code=s(t.name,n.map(e=>e.code)),t.color=e.color,t.expansionism=+e.expansionism,x.includes(e.type)?t.type=e.type:t.type=`Generic`),e.origins=t.i?r(e.origins||``):[null],t.shield=i.includes(e.emblemsShape)?e.emblemsShape:`heater`,t.base=Names.nameBases.findIndex(t=>t.name===e.namesbase);function r(e){let r=e.replaceAll(`"`,``).split(`,`).map(e=>e.trim()).filter(e=>e).map(e=>{let t=n.findIndex(t=>t.name===e);return t===-1?null:t});t.origins=r.filter(e=>e!==null),t.origins.length||(t.origins=[0])}}n.filter(e=>e.removed).forEach(e=>{q(e.i)}),b.draw(`cultures`),R()}function Q(){if(customization)return;let e=+this.closest(`.states`).dataset.id,t=this.classList,n=pack.cultures[e];n.lock=!n.lock,t.toggle(`icon-lock-open`),t.toggle(`icon-lock`)}var We={open:L};export{We as CulturesEditor};