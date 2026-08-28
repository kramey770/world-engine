import{E as e,T as t,Tt as n,U as r,W as i,c as a,d as o,k as s,t as c,u as l,un as u,w as d}from"./utils-D3KEhgY0.js";import{t as f}from"./stratify-CGdiYggi.js";import{t as p}from"./pack-CyBKcrr4.js";import{r as m}from"./tooltips-D1wvMKni.js";import{C as h,H as g,J as _,K as v,M as y,Ot as b,Q as x,U as S,w as C}from"./index-D3JPylQY.js";import{t as w}from"./highlighting-Dl5muJeM.js";import{i as T,n as E,r as D,t as O}from"./table-D__vupD5.js";var k=`burgsOverview`,A={my:`right top`,at:`right-10 top+10`,of:`svg`,collision:`fit`},j,M=[{key:`locate`,width:`0.8em`,permanent:!0},{key:`name`,label:`Burg`,width:`8em`,permanent:!0,sortBy:e=>e.name||``,sortType:`alpha`},{key:`province`,label:`Province`,width:`8em`,hidden:!0,mobileHidden:!0,sortType:`alpha`,sortBy:e=>{let t=pack.cells.province[e.cell];return t&&pack.provinces[t]?.name||``}},{key:`state`,label:`State`,width:`8em`,sortBy:e=>pack.states[e.state]?.name||``,sortType:`alpha`},{key:`culture`,label:`Culture`,width:`10em`,mobileHidden:!0,sortBy:e=>pack.cultures[e.culture]?.name||``,sortType:`alpha`},{key:`group`,label:`Group`,width:`6em`,mobileHidden:!0,sortBy:e=>e.group||``,sortType:`alpha`},{key:`population`,label:`Population`,width:`7em`,defaultSort:`desc`,sortBy:e=>e.population*populationRate*urbanization},{key:`grossproduct`,label:`Product`,width:`6.5em`,hidden:!0,mobileHidden:!0,sortBy:e=>n(e.product||0,2)},{key:`productpercapita`,label:`Wealth`,width:`6.5em`,mobileHidden:!0,tip:`Click to sort by burg wealth (gross product per capita)`,sortBy:e=>n(e.population>0?(e.product||0)/e.population:0,2)},{key:`treasury`,label:`Treasury`,width:`6.5em`,mobileHidden:!0,sortBy:e=>n(e.treasury||0,2)},{key:`features`,label:`Features`,width:`6em`,mobileHidden:!0,sortType:`alpha`,sortBy:e=>e.capital&&e.port?`a-capital-port`:e.capital?`c-capital`:e.port?`p-port`:`z-burg`},{key:`actions`,width:`3.2em`,permanent:!0,align:`right`}],N=E({getData:()=>C(k,B(),M),onUpdate:V});function P(e={}){customization||(j=y.get(k,`filters`,()=>({search:``,stateId:-1,cultureId:-1})),g(`#${k}, .stable`),x.show(`burgIcons`,`labels`),e.stateId!=null&&(j.stateId=e.stateId),e.cultureId!=null&&(j.cultureId=e.cultureId),F(),R(),ne(),N.reset(),$(`#${k}`).dialog({title:`Burgs Overview`,resizable:!1,close:I,width:`fit-content`,position:A}))}function F(){document.getElementById(`burgsOverview`)?.remove();let t=`<div id="burgsOverview" class="dialog stable editorDialog">
      <div id="burgsBody" class="table">${D({dialogId:k,columns:M})}</div>
      <div id="burgsFilters" data-tip="Apply a filter" class="editorFilters">
        <label for="burgsSearch" data-tip="Filter by name, province, state, culture, or group"
          >Search: <input id="burgsSearch" type="search"
        /></label>
        <label for="burgsFilterState"
          >State:
          <select id="burgsFilterState"></select
        ></label>
        <label for="burgsFilterCulture"
          >Culture:
          <select id="burgsFilterCulture"></select
        ></label>
      </div>
      <div id="burgsFooter" class="totalLine">
        <div data-tip="Burgs displayed" style="margin-left: 5px">
          Burgs:&nbsp;<span id="burgsFooterBurgs">0 of 0</span>
        </div>
        <div data-tip="Average population" style="margin-left: 12px" data-col="population">
          Avg population:&nbsp;<span id="burgsFooterPopulation">0</span>
        </div>
        <div data-tip="Average gross product" style="margin-left: 12px" data-col="grossproduct">
          Avg product:&nbsp;<span id="burgsFooterGrossProduct">0</span> 🟡
        </div>
        <div data-tip="Average wealth (product per capita)" style="margin-left: 12px" data-col="productpercapita">
          Avg wealth:&nbsp;<span id="burgsFooterProductPerCapita">0</span> 🟡
        </div>
        <div data-tip="Average treasury" style="margin-left: 12px" data-col="treasury">
          Avg treasury:&nbsp;<span id="burgsFooterTreasury">0</span> 🟡
        </div>
      </div>
      <div id="burgsBottom" class="editorToolbar">
        <button id="burgsOverviewRefresh" data-tip="Refresh the Editor" class="icon-cw"></button>
        <button id="burgsGroupsEditorButton" data-tip="Edit burg groups" class="icon-cog"></button>
        <button id="burgsChart" data-tip="Show burgs bubble chart" class="icon-chart-area"></button>
        <button
          id="regenerateBurgNames"
          data-tip="Regenerate burg names based on assigned culture"
          class="icon-retweet"
        ></button>
        <button id="addNewBurg" data-tip="Add a new burg. Hold Shift to add multiple" class="icon-plus"></button>
        <button
          id="burgsExport"
          data-tip="Save burgs-related data as a text file (.csv)"
          class="icon-download"
        ></button>
        <button id="burgNamesImport" data-tip="Rename burgs in bulk" class="icon-upload"></button>
        <button id="burgsLockAll" data-tip="Lock or unlock all burgs" class="icon-lock"></button>
        <button
          id="burgsRemoveAll"
          data-tip="Remove all unlocked burgs except for capitals. To remove a capital remove its state first"
          class="icon-trash"
        ></button>
      </div>
    </div>`;s(`dialogs`).insertAdjacentHTML(`beforeend`,t),s(`burgsSearch`).value=j.search,h(k,N.reset),w(k,({target:e,cellId:t})=>{let n=pack.cells.burg[t];if(n)return n;let r=e.closest(`#labels [data-label-type='burg'][data-id], #burgIcons [data-id]`);return r?Number(r.dataset.id):void 0}),O({dialogId:k,columns:M,onUpdate:()=>v(k,{width:`fit-content`,position:A})}),s(`burgsOverviewRefresh`).addEventListener(`click`,L),s(`burgsGroupsEditorButton`).addEventListener(`click`,()=>_.BurgGroupEditor.open()),s(`burgsChart`).addEventListener(`click`,Y),s(`burgsFilterState`).addEventListener(`change`,z),s(`burgsFilterCulture`).addEventListener(`change`,z),s(`burgsSearch`).addEventListener(`input`,z),s(`regenerateBurgNames`).addEventListener(`click`,J),s(`addNewBurg`).addEventListener(`click`,()=>void _.BurgCreator.toggle()),s(`burgsExport`).addEventListener(`click`,X),s(`burgNamesImport`).addEventListener(`click`,Z),s(`burgsListToLoad`).addEventListener(`change`,function(){e(this,Q)}),s(`burgsLockAll`).addEventListener(`click`,te),s(`burgsRemoveAll`).addEventListener(`click`,ee)}function I(){document.getElementById(`addBurgTool`)?.classList.contains(`pressed`)&&_.BurgCreator.stop(),$(`#burgsOverview`).dialog(`destroy`),s(`burgsOverview`).remove()}function L(){R(),N.reset()}function R(){let e=s(`burgsFilterState`);new Set(pack.states.filter(e=>!e.removed).map(e=>e.i)).has(j.stateId)||(j.stateId=-1),e.options.length=0,e.options.add(new Option(`all`,`-1`,!1,j.stateId===-1)),e.options.add(new Option(pack.states[0].name,`0`,!1,j.stateId===0)),pack.states.filter(e=>e.i&&!e.removed).sort((e,t)=>e.name>t.name?1:-1).forEach(t=>void e.options.add(new Option(t.name,String(t.i),!1,t.i===j.stateId)));let t=s(`burgsFilterCulture`);new Set(pack.cultures.filter(e=>!e.removed).map(e=>e.i)).has(j.cultureId)||(j.cultureId=-1),t.options.length=0,t.options.add(new Option(`all`,`-1`,!1,j.cultureId===-1)),t.options.add(new Option(pack.cultures[0].name,`0`,!1,j.cultureId===0)),pack.cultures.filter(e=>e.i&&!e.removed).sort((e,t)=>e.name>t.name?1:-1).forEach(e=>void t.options.add(new Option(e.name,String(e.i),!1,e.i===j.cultureId))),y.set(k,`filters`,j)}function z(){j.search=s(`burgsSearch`).value,j.stateId=+s(`burgsFilterState`).value,j.cultureId=+s(`burgsFilterCulture`).value,y.set(k,`filters`,j),N.reset()}function B(){let e=j.search.toLowerCase().trim(),t=pack.burgs.filter(e=>e.i&&!e.removed);return e&&(t=t.filter(t=>{let n=t.name.toLowerCase(),r=(pack.states[t.state]?.name||``).toLowerCase(),i=pack.cells.province[t.cell],a=i?pack.provinces[i]?.name.toLowerCase():``,o=(pack.cultures[t.culture]?.name||``).toLowerCase();return n.includes(e)||r.includes(e)||a.includes(e)||o.includes(e)||t.group.toLowerCase().includes(e)})),j.stateId!==-1&&(t=t.filter(e=>e.state===j.stateId)),j.cultureId!==-1&&(t=t.filter(e=>e.culture===j.cultureId)),t}function V(e){let t=s(`burgsBody`),r=pack.burgs.filter(e=>e.i&&!e.removed).length;t.querySelectorAll(`:scope > .states`).forEach(e=>{e.remove()});let i=``,a=0,c=0,l=0,u=0;for(let t of e.all){let e=t.population*populationRate*urbanization,r=n(t.product||0,2),i=n(t.population>0?(t.product||0)/t.population:0,2),o=n(t.treasury||0,2);a+=e,c+=r,l+=i,u+=o}for(let t of e.rows){let e=t.population*populationRate*urbanization,r=n(t.product||0,2),a=n(t.population>0?(t.product||0)/t.population:0,2),s=n(t.treasury||0,2),c=t.capital&&t.port?`a-capital-port`:t.capital?`c-capital`:t.port?`p-port`:`z-burg`,l=pack.states[t.state].name,u=pack.cells.province[t.cell],d=u?pack.provinces[u].name:``,f=pack.cultures[t.culture].name;i+=`<div
        class="states"
        data-id=${t.i}
        data-name="${t.name}"
        data-state="${l}"
        data-province="${d}"
        data-culture="${f}"
        data-group="${t.group}"
        data-population=${e}
        data-grossproduct=${r}
        data-productpercapita=${a}
        data-treasury=${s}
        data-features="${c}"
      >
        <span data-tip="Click to zoom into view" class="icon-dot-circled pointer" data-col="locate"></span>
        <input data-tip="Burg name" class="burgName" value="${t.name}" data-col="name" disabled />
        <input data-tip="Burg province" value="${d}" data-col="province" disabled />
        <input data-tip="Burg state" value="${l}" data-col="state" disabled />
        <input data-tip="Dominant culture" value="${f}" data-col="culture" disabled />
        <input data-tip="Burg group" value="${t.group}" data-col="group" disabled />
        <div data-col="population">
          <span data-tip="Burg population" class="icon-male"></span>
          <input data-tip="Burg population" value=${o(e)} disabled />
        </div>
        <div data-col="grossproduct">
          <span data-tip="Gross Product: local sale revenue minus purchased ingredient costs during the production.">🟡</span>
          <input data-tip="Gross Product: local sale revenue minus purchased ingredient costs during the production." value=${r} disabled />
        </div>
        <div data-col="productpercapita">
          <span data-tip="Wealth: gross product divided by population">🟡</span>
          <input data-tip="Wealth: gross product divided by population" value=${a} disabled />
        </div>
        <div data-col="treasury">
          <span data-tip="Treasury: accumulated cash balance">🟡</span>
          <input data-tip="Treasury: accumulated cash balance" value=${s} disabled />
        </div>
        <div data-col="features">
          <span
            data-tip="${t.capital?` This burg is a state capital`:`This burg is a NOT state capital`}"
            class="icon-star-empty${t.capital?``:` inactive`}" style="padding: 0 1px;"></span>
          <span data-tip="${t.port?` This burg is a port`:`This burg is NOT a port`}"
          class="icon-anchor${t.port?``:` inactive`}" style="font-size: .9em; padding: 0 1px;"></span>
        </div>
        <div data-col="actions">
          <span data-tip="Edit burg" class="icon-pencil"></span>
          <span class="locks pointer ${t.lock?`icon-lock`:`icon-lock-open inactive`}" onmouseover="showElementLockTip(event)"></span>
          <span data-tip="Remove burg" class="icon-trash-empty"></span>
        </div>
      </div>`}t.insertAdjacentHTML(`beforeend`,i),s(`burgsFooterBurgs`).innerHTML=`${e.all.length} of ${r}`,s(`burgsFooterPopulation`).innerHTML=e.all.length?o(a/e.all.length):`0`,s(`burgsFooterGrossProduct`).innerHTML=e.all.length?String(n(c/e.all.length,2)):`0`,s(`burgsFooterProductPerCapita`).innerHTML=e.all.length?String(n(l/e.all.length,2)):`0`,s(`burgsFooterTreasury`).innerHTML=e.all.length?String(n(u/e.all.length,2)):`0`,T(s(`burgsFooter`),e,N.goto),t.querySelectorAll(`div.states`).forEach(e=>void e.addEventListener(`mouseenter`,e=>H(e))),t.querySelectorAll(`div.states`).forEach(e=>void e.addEventListener(`mouseleave`,()=>U())),t.querySelectorAll(`div > span.icon-dot-circled`).forEach(e=>void e.addEventListener(`click`,W)),t.querySelectorAll(`div > span.locks`).forEach(e=>void e.addEventListener(`click`,G)),t.querySelectorAll(`div > span.icon-pencil`).forEach(e=>void e.addEventListener(`click`,K)),t.querySelectorAll(`div > span.icon-trash-empty`).forEach(e=>void e.addEventListener(`click`,q))}function H(e){let t=+e.target.dataset.id,n=u(`#labels`).select(`[data-label-type='burg'][data-id='${t}']`);n.size()&&n.classed(`drag`,!0)}function U(){u(`#labels`).selectAll(`text[data-label-type='burg'].drag`).classed(`drag`,!1)}function W(){let e=+this.closest(`.states`).dataset.id,{x:t,y:n}=pack.burgs[e];zoomTo(t,n,8,2e3)}function G(){let e=+this.closest(`.states`).dataset.id,t=pack.burgs[e];t.lock=!t.lock,this.classList.contains(`icon-lock`)?(this.classList.remove(`icon-lock`),this.classList.add(`icon-lock-open`),this.classList.add(`inactive`)):(this.classList.remove(`icon-lock-open`),this.classList.add(`icon-lock`),this.classList.remove(`inactive`))}function K(){let e=+this.closest(`.states`).dataset.id;_.BurgEditor.open(e)}function q(){let e=+this.closest(`.states`).dataset.id;if(pack.burgs[e].capital){m(`You cannot remove the capital. Please change the state capital first`,!1,`error`);return}S({title:`Remove burg`,message:`Are you sure you want to remove the burg? <br>This action cannot be reverted`,confirm:`Remove`,onConfirm:()=>{Burgs.remove(e),b(`burg`,e),N.refresh(),x.draw(`burgIcons`,`labels`)}})}function J(){for(let e of B())e.lock||(e.name=Names.getCulture(e.culture));N.refresh(),x.draw(`labels`)}function Y(){let e=pack.states.map(e=>{let t=e.color?e.color:`#ccc`,n=e.fullName?e.fullName:e.name;return{id:e.i,state:e.i?0:null,color:t,name:n}}),t=pack.burgs.filter(e=>e.i&&!e.removed).map(t=>{let n=t.i+e.length-1,r=t.population,i=t.capital,a=pack.cells.province[t.cell],o=a?a+e.length-1:t.state;return{id:n,i:t.i,state:t.state,culture:t.culture,province:a,parent:o,name:t.name,population:r,capital:i,x:t.x,y:t.y}}),n=e.concat(t);if(n.length<2){m(`No burgs to show`,!1,`error`);return}let r=f().parentId(e=>e.state)(n).sum(e=>e.population).sort((e,t)=>t.value-e.value),i=s(`uiSize`).valueAsNumber,a=150+200*i,c=150+200*i,l={top:0,right:-50,bottom:-10,left:-50},d=a-l.left-l.right,h=c-l.top-l.bottom,g=p().size([d,h]).padding(3);alertMessage.innerHTML=`<select id="burgsTreeType" style="display:block; margin-left:13px; font-size:11px">
      <option value="states" selected>Group by state</option>
      <option value="cultures">Group by culture</option>
      <option value="parent">Group by province and state</option>
      <option value="provinces">Group by province</option>
    </select>`,alertMessage.innerHTML+=`<div id='burgsInfo' class='chartInfo'>&#8205;</div>`;let _=u(`#alertMessage`).insert(`svg`,`#burgsInfo`).attr(`id`,`burgsTree`).attr(`width`,a).attr(`height`,c-10).attr(`stroke-width`,2).append(`g`).attr(`transform`,`translate(-50, -10)`);s(`burgsTreeType`).addEventListener(`change`,x),g(r);let v=_.selectAll(`circle`).data(r.leaves()).join(`circle`).attr(`data-id`,e=>e.data.i).attr(`r`,e=>e.r).attr(`fill`,e=>e.parent.data.color).attr(`cx`,e=>e.x).attr(`cy`,e=>e.y).on(`mouseenter`,(e,t)=>y(e,t)).on(`mouseleave`,e=>b(e)).on(`click`,(e,t)=>zoomTo(t.data.x,t.data.y,8,2e3));function y(e,t){u(e.target).transition().duration(1500).attr(`stroke`,`#c13119`);let n=t.data.name,r=t.parent.data.name,i=o(t.value*populationRate*urbanization);s(`burgsInfo`).innerHTML=`${n}. ${r}. Population: ${i}`,H(e),m(`Click to zoom into view`)}function b(e){U(),s(`burgsInfo`)&&(s(`burgsInfo`).innerHTML=`&#8205;`,u(e.target).transition().attr(`stroke`,null),m(``))}function x(){let e=()=>pack.states.map(e=>{let t=e.color?e.color:`#ccc`,n=e.fullName?e.fullName:e.name;return{id:e.i,state:e.i?0:null,color:t,name:n}}),n=()=>pack.cultures.map(e=>{let t=e.color?e.color:`#ccc`;return{id:e.i,culture:e.i?0:null,color:t,name:e.name}}),r=()=>{let e=pack.states.map(e=>{let t=e.color?e.color:`#ccc`,n=e.fullName?e.fullName:e.name;return{id:e.i,parent:e.i?0:null,color:t,name:n}}),t=pack.provinces.filter(e=>e.i&&!e.removed).map(t=>({id:t.i+e.length-1,parent:t.state,color:t.color,name:t.fullName}));return e.concat(t)},i=()=>pack.provinces.map(e=>{let t=e.color?e.color:`#ccc`,n=e.fullName?e.fullName:e.name;return{id:e.i?e.i:0,province:e.i?0:null,color:t,name:n}}),a=e=>{if(this.value===`states`)return e.state;if(this.value===`cultures`)return e.culture;if(this.value===`parent`)return e.parent;if(this.value===`provinces`)return e.province},o={states:e,cultures:n,parent:r,provinces:i}[this.value]();t.forEach(e=>{e.id=e.i+o.length-1});let s=o.concat(t),c=f().parentId(e=>a(e))(s).sum(e=>e.population).sort((e,t)=>t.value-e.value);v.data(g(c).leaves()).transition().duration(2e3).attr(`data-id`,e=>e.data.i).attr(`fill`,e=>e.parent.data.color).attr(`cx`,e=>e.x).attr(`cy`,e=>e.y).attr(`r`,e=>e.r)}$(`#alert`).dialog({title:`Burgs bubble chart`,width:`fit-content`,position:{my:`left bottom`,at:`left+10 bottom-10`,of:`svg`},buttons:{},close:()=>alertMessage.innerHTML=``})}function X(){let e=`Id,Burg,Province,Province Full Name,State,State Full Name,Culture,Religion,Group,Population,X,Y,Latitude,Longitude,Elevation (${heightUnit.value}),Temperature,Temperature likeness,Capital,Port,Citadel,Walls,Plaza,Temple,Shanty Town,Emblem,Preview link\n`;pack.burgs.filter(e=>e.i&&!e.removed).forEach(t=>{e+=`${t.i},`,e+=`${t.name},`;let o=pack.cells.province[t.cell];e+=o?`${pack.provinces[o].name},`:`,`,e+=o?`${pack.provinces[o].fullName},`:`,`,e+=`${pack.states[t.state].name},`,e+=`${pack.states[t.state].fullName},`,e+=`${pack.cultures[t.culture].name},`,e+=`${pack.religions[pack.cells.religion[t.cell]].name},`,e+=`${t.group},`,e+=`${n(t.population*populationRate*urbanization)},`,e+=`${t.x},`,e+=`${t.y},`,e+=`${r(t.y,mapCoordinates,graphHeight,2)},`,e+=`${i(t.x,mapCoordinates,graphWidth,2)},`,e+=`${parseInt(a(pack.cells.h[t.cell]),10)},`;let s=grid.cells.temp[pack.cells.g[t.cell]];e+=`${c(s)},`,e+=`${l(s)},`,e+=t.capital?`capital,`:`,`,e+=t.port?`port,`:`,`,e+=t.citadel?`citadel,`:`,`,e+=t.walls?`walls,`:`,`,e+=t.plaza?`plaza,`:`,`,e+=t.temple?`temple,`:`,`,e+=t.shanty?`shanty town,`:`,`,e+=t.coa?`${JSON.stringify(t.coa).replace(/"/g,``).replace(/,/g,`;`)},`:`,`,e+=Burgs.getPreview(t).link,e+=`
`});let o=`${t(`Burgs`)}.csv`;d(e,o)}function Z(){alertMessage.innerHTML=`Download burgs list as a text file, make changes and re-upload the file. Make sure the file is a plain text document with each
    name on its own line (the dilimiter is CRLF). If you do not want to change the name, just leave it as is`,$(`#alert`).dialog({title:`Burgs bulk renaming`,width:`22em`,position:{my:`center`,at:`center`,of:`svg`},buttons:{Download:()=>{d(pack.burgs.filter(e=>e.i&&!e.removed).map(e=>e.name).join(`\r
`),`${t(`Burg names`)}.txt`)},Upload:()=>s(`burgsListToLoad`).click(),Cancel:function(){$(this).dialog(`close`)}}})}function Q(e){if(!e){m(`Cannot load the file, please check the format`,!1,`error`);return}let t=e.replace(/\r\n|\r/g,`
`).split(`
`).filter(Boolean);if(!t.length){m(`Cannot parse the list, please check the file format`,!1,`error`);return}let n=[],r=`Burgs to be renamed as below:`;r+=`<table class="overflow-table"><tr><th>Id</th><th>Current name</th><th>New Name</th></tr>`;let i=pack.burgs.filter(e=>e.i&&!e.removed);for(let e=0;e<t.length&&e<=i.length;e++){let a=t[e];!a||!i[e]||a===i[e].name||(n.push({id:i[e].i,name:a}),r+=`<tr><td style="width:20%">${i[e].i}</td><td style="width:40%">${i[e].name}</td><td style="width:40%">${a}</td></tr>`)}r+=`</tr></table>`,n.length||(r=`No changes found in the file. Please change some names to get a result`),alertMessage.innerHTML=r,S({title:`Burgs bulk renaming`,message:r,confirm:`Rename`,onConfirm:()=>{for(let e=0;e<n.length;e++){let t=n[e].id;pack.burgs[t].name=n[e].name}N.refresh(),x.draw(`labels`)}})}function ee(){let e=pack.burgs.filter(e=>e.i&&!e.removed&&!e.capital&&!e.lock).length;S({title:`Remove ${e} burgs`,message:`
        Are you sure you want to remove all <i>unlocked</i> burgs except for capitals?
        <br><i>To remove a capital you have to remove its state first</i>`,confirm:`Remove`,onConfirm:()=>{pack.burgs.filter(e=>e.i&&!(e.capital||e.lock)).forEach(e=>{Burgs.remove(e.i),b(`burg`,e.i)}),N.refresh(),x.draw(`burgIcons`,`labels`)}})}function te(){let e=pack.burgs.filter(e=>e.i&&!e.removed),t=e.every(e=>e.lock);e.forEach(e=>{e.lock=!t}),N.refresh(),s(`burgsLockAll`).className=t?`icon-lock`:`icon-lock-open`}function ne(){let e=pack.burgs.every(({lock:e,i:t,removed:n})=>e||!t||n);s(`burgsLockAll`).className=e?`icon-lock-open`:`icon-lock`}var re={open:P};export{re as BurgsOverview};