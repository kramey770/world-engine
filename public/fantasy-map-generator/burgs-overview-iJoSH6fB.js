import{C as e,E as t,Et as n,S as r,U as i,W as a,c as o,d as s,dn as c,k as l,t as u,u as d}from"./utils-BIleyWmR.js";import{O as f,t as p}from"./layers-qPZxwHcp.js";import{a as m,i as h,o as g}from"./megalopolis-BpsA5rhH.js";import{t as _}from"./stratify-CGdiYggi.js";import{t as v}from"./pack-CyBKcrr4.js";import{r as y}from"./tooltips-zkair8Am.js";import{a as b,n as x,t as S}from"./dialog-helpers-50LJgx0U.js";import{t as C}from"./state-CHxunpWe.js";import{P as w,b as T,y as E}from"./index-tuMZPduM.js";import{t as D}from"./highlighting-CqamXa3p.js";import{i as O,n as k,r as A,t as j}from"./table-oyVozzWP.js";var M=`burgsOverview`,N={my:`right top`,at:`right-10 top+10`,of:`svg`,collision:`fit`},P,F=[{key:`locate`,width:`0.8em`,permanent:!0},{key:`name`,label:`Burg`,width:`8em`,permanent:!0,sortBy:e=>e.name||``,sortType:`alpha`},{key:`province`,label:`Province`,width:`8em`,hidden:!0,mobileHidden:!0,sortType:`alpha`,sortBy:e=>{let t=pack.cells.province[e.cell];return t&&pack.provinces[t]?.name||``}},{key:`state`,label:`State`,width:`8em`,sortBy:e=>pack.states[e.state]?.name||``,sortType:`alpha`},{key:`culture`,label:`Culture`,width:`10em`,mobileHidden:!0,sortBy:e=>pack.cultures[e.culture]?.name||``,sortType:`alpha`},{key:`group`,label:`Group`,width:`6em`,mobileHidden:!0,sortBy:e=>e.group||``,sortType:`alpha`},{key:`population`,label:`Population`,width:`7em`,defaultSort:`desc`,sortBy:e=>e.population*populationRate*urbanization},{key:`grossproduct`,label:`Product`,width:`6.5em`,hidden:!0,mobileHidden:!0,sortBy:e=>n(e.product||0,2)},{key:`productpercapita`,label:`Wealth`,width:`6.5em`,mobileHidden:!0,tip:`Click to sort by burg wealth (gross product per capita)`,sortBy:e=>n(e.population>0?(e.product||0)/e.population:0,2)},{key:`treasury`,label:`Treasury`,width:`6.5em`,mobileHidden:!0,sortBy:e=>n(e.treasury||0,2)},{key:`features`,label:`Features`,width:`6em`,mobileHidden:!0,sortType:`alpha`,sortBy:e=>e.capital&&e.port?`a-capital-port`:e.capital?`c-capital`:e.port?`p-port`:`z-burg`},{key:`actions`,width:`3.2em`,permanent:!0,align:`right`}],I=k({getData:()=>T(M,U(),F),onUpdate:W});function L(e={}){customization||(P=C.get(M,`filters`,()=>({search:``,stateId:-1,cultureId:-1})),S(`#${M}, .stable`),p.show(`burgIcons`,`labels`),e.stateId!=null&&(P.stateId=e.stateId),e.cultureId!=null&&(P.cultureId=e.cultureId),R(),V(),ae(),I.reset(),$(`#${M}`).dialog({title:`Burgs Overview`,resizable:!1,close:z,width:`fit-content`,position:N}))}function R(){document.getElementById(`burgsOverview`)?.remove();let e=`<div id="burgsOverview" class="dialog stable editorDialog">
      <div id="burgsBody" class="table">${A({dialogId:M,columns:F})}</div>
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
        <button id="addNewSkyBurg" data-tip="Add a flying sky-city. Can be placed over land or water. Hold Shift to add multiple" class="icon-cloud"></button>
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
    </div>`;l(`dialogs`).insertAdjacentHTML(`beforeend`,e),l(`burgsSearch`).value=P.search,E(M,I.reset),D(M,({target:e,cellId:t})=>{let n=pack.cells.burg[t];if(n)return n;let r=e.closest(`#labels [data-label-type='burg'][data-id], #burgIcons [data-id]`);return r?Number(r.dataset.id):void 0}),j({dialogId:M,columns:F,onUpdate:()=>b(M,{width:`fit-content`,position:N})}),l(`burgsOverviewRefresh`).addEventListener(`click`,B),l(`burgsGroupsEditorButton`).addEventListener(`click`,()=>w.BurgGroupEditor.open()),l(`burgsChart`).addEventListener(`click`,Q),l(`burgsFilterState`).addEventListener(`change`,H),l(`burgsFilterCulture`).addEventListener(`change`,H),l(`burgsSearch`).addEventListener(`input`,H),l(`regenerateBurgNames`).addEventListener(`click`,Z),l(`addNewBurg`).addEventListener(`click`,()=>void w.BurgCreator.toggle()),l(`addNewSkyBurg`).addEventListener(`click`,()=>void w.BurgCreator.toggleSky()),l(`burgsExport`).addEventListener(`click`,()=>void ee()),l(`burgNamesImport`).addEventListener(`click`,te),l(`burgsListToLoad`).addEventListener(`change`,function(){t(this,ne)}),l(`burgsLockAll`).addEventListener(`click`,ie),l(`burgsRemoveAll`).addEventListener(`click`,re)}function z(){document.getElementById(`addBurgTool`)?.classList.contains(`pressed`)&&w.BurgCreator.stop(),$(`#burgsOverview`).dialog(`destroy`),l(`burgsOverview`).remove()}function B(){V(),I.reset()}function V(){let e=l(`burgsFilterState`);new Set(pack.states.filter(e=>!e.removed).map(e=>e.i)).has(P.stateId)||(P.stateId=-1),e.options.length=0,e.options.add(new Option(`all`,`-1`,!1,P.stateId===-1)),e.options.add(new Option(pack.states[0].name,`0`,!1,P.stateId===0)),pack.states.filter(e=>e.i&&!e.removed).sort((e,t)=>e.name>t.name?1:-1).forEach(t=>void e.options.add(new Option(t.name,String(t.i),!1,t.i===P.stateId)));let t=l(`burgsFilterCulture`);new Set(pack.cultures.filter(e=>!e.removed).map(e=>e.i)).has(P.cultureId)||(P.cultureId=-1),t.options.length=0,t.options.add(new Option(`all`,`-1`,!1,P.cultureId===-1)),t.options.add(new Option(pack.cultures[0].name,`0`,!1,P.cultureId===0)),pack.cultures.filter(e=>e.i&&!e.removed).sort((e,t)=>e.name>t.name?1:-1).forEach(e=>void t.options.add(new Option(e.name,String(e.i),!1,e.i===P.cultureId))),C.set(M,`filters`,P)}function H(){P.search=l(`burgsSearch`).value,P.stateId=+l(`burgsFilterState`).value,P.cultureId=+l(`burgsFilterCulture`).value,C.set(M,`filters`,P),I.reset()}function U(){let e=P.search.toLowerCase().trim(),t=pack.burgs.filter(e=>e.i&&!e.removed);return e&&(t=t.filter(t=>{let n=t.name.toLowerCase(),r=(pack.states[t.state]?.name||``).toLowerCase(),i=pack.cells.province[t.cell],a=i?pack.provinces[i]?.name.toLowerCase():``,o=(pack.cultures[t.culture]?.name||``).toLowerCase();return n.includes(e)||r.includes(e)||a.includes(e)||o.includes(e)||t.group.toLowerCase().includes(e)})),P.stateId!==-1&&(t=t.filter(e=>e.state===P.stateId)),P.cultureId!==-1&&(t=t.filter(e=>e.culture===P.cultureId)),t}function W(e){let t=l(`burgsBody`),r=pack.burgs.filter(e=>e.i&&!e.removed).length;t.querySelectorAll(`:scope > .states`).forEach(e=>{e.remove()});let i=``,a=0,o=0,c=0,u=0;for(let t of e.all){let e=t.population*populationRate*urbanization,r=n(t.product||0,2),i=n(t.population>0?(t.product||0)/t.population:0,2),s=n(t.treasury||0,2);a+=e,o+=r,c+=i,u+=s}let d=h(pack.burgs,pack.cells.burg),f=m(d);for(let t of e.rows){let e=t.population*populationRate*urbanization,r=n(t.product||0,2),a=n(t.population>0?(t.product||0)/t.population:0,2),o=n(t.treasury||0,2),c=t.capital&&t.port?`a-capital-port`:t.capital?`c-capital`:t.port?`p-port`:`z-burg`,l=pack.states[t.state].name,u=pack.cells.province[t.cell],p=u?pack.provinces[u].name:``,m=pack.cultures[t.culture].name,h=d.get(t.cell),_=h?h.anchor.i===t.i:!1,v=f.has(t.i),y=h&&_?`<span data-tip="Anchor of ${g(t)} (${h.members.length} burgs): treasury and production are pooled here" style="font-size:.8em; padding: 0 1px;">🏙</span>`:``,b=v?`Burg name. Part of ${g(h.anchor)} — economy pooled on ${h.anchor.name}`:`Burg name`,x=v?` style="padding-left:1.2em"`:``;i+=`<div
        class="states"
        data-id=${t.i}
        data-name="${t.name}"
        data-state="${l}"
        data-province="${p}"
        data-culture="${m}"
        data-group="${t.group}"
        data-population=${e}
        data-grossproduct=${r}
        data-productpercapita=${a}
        data-treasury=${o}
        data-features="${c}"
      >
        <span data-tip="Click to zoom into view" class="icon-dot-circled pointer" data-col="locate"></span>
        <input data-tip="${b}" class="burgName" value="${t.name}"${x} data-col="name" disabled />
        <input data-tip="Burg province" value="${p}" data-col="province" disabled />
        <input data-tip="Burg state" value="${l}" data-col="state" disabled />
        <input data-tip="Dominant culture" value="${m}" data-col="culture" disabled />
        <input data-tip="Burg group" value="${t.group}" data-col="group" disabled />
        <div data-col="population">
          <span data-tip="Burg population" class="icon-male"></span>
          <input data-tip="Burg population" value=${s(e)} disabled />
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
          <input data-tip="Treasury: accumulated cash balance" value=${o} disabled />
        </div>
        <div data-col="features">
          <span
            data-tip="${t.capital?` This burg is a state capital`:`This burg is a NOT state capital`}"
            class="icon-star-empty${t.capital?``:` inactive`}" style="padding: 0 1px;"></span>
          <span data-tip="${t.port?` This burg is a port`:`This burg is NOT a port`}"
          class="icon-anchor${t.port?``:` inactive`}" style="font-size: .9em; padding: 0 1px;"></span>
          ${y}
        </div>
        <div data-col="actions">
          <span data-tip="Edit burg" class="icon-pencil"></span>
          <span class="locks pointer ${t.lock?`icon-lock`:`icon-lock-open inactive`}" onmouseover="showElementLockTip(event)"></span>
          <span data-tip="Remove burg" class="icon-trash-empty"></span>
        </div>
      </div>`}t.insertAdjacentHTML(`beforeend`,i),l(`burgsFooterBurgs`).innerHTML=`${e.all.length} of ${r}`,l(`burgsFooterPopulation`).innerHTML=e.all.length?s(a/e.all.length):`0`,l(`burgsFooterGrossProduct`).innerHTML=e.all.length?String(n(o/e.all.length,2)):`0`,l(`burgsFooterProductPerCapita`).innerHTML=e.all.length?String(n(c/e.all.length,2)):`0`,l(`burgsFooterTreasury`).innerHTML=e.all.length?String(n(u/e.all.length,2)):`0`,O(l(`burgsFooter`),e,I.goto),t.querySelectorAll(`div.states`).forEach(e=>void e.addEventListener(`mouseenter`,e=>G(e))),t.querySelectorAll(`div.states`).forEach(e=>void e.addEventListener(`mouseleave`,()=>K())),t.querySelectorAll(`div > span.icon-dot-circled`).forEach(e=>void e.addEventListener(`click`,q)),t.querySelectorAll(`div > span.locks`).forEach(e=>void e.addEventListener(`click`,J)),t.querySelectorAll(`div > span.icon-pencil`).forEach(e=>void e.addEventListener(`click`,Y)),t.querySelectorAll(`div > span.icon-trash-empty`).forEach(e=>void e.addEventListener(`click`,X))}function G(e){let t=+e.target.dataset.id,n=c(`#labels`).select(`[data-label-type='burg'][data-id='${t}']`);n.size()&&n.classed(`drag`,!0)}function K(){c(`#labels`).selectAll(`text[data-label-type='burg'].drag`).classed(`drag`,!1)}function q(){let e=+this.closest(`.states`).dataset.id,{x:t,y:n}=pack.burgs[e];zoomTo(t,n,8,2e3)}function J(){let e=+this.closest(`.states`).dataset.id,t=pack.burgs[e];t.lock=!t.lock,this.classList.contains(`icon-lock`)?(this.classList.remove(`icon-lock`),this.classList.add(`icon-lock-open`),this.classList.add(`inactive`)):(this.classList.remove(`icon-lock-open`),this.classList.add(`icon-lock`),this.classList.remove(`inactive`))}function Y(){let e=+this.closest(`.states`).dataset.id;w.BurgEditor.open(e)}function X(){let e=+this.closest(`.states`).dataset.id;if(pack.burgs[e].capital){y(`You cannot remove the capital. Please change the state capital first`,!1,`error`);return}x({title:`Remove burg`,message:`Are you sure you want to remove the burg? <br>This action cannot be reverted`,confirm:`Remove`,onConfirm:()=>{Burgs.remove(e),f(`burg`,e),I.refresh(),p.draw(`burgIcons`,`labels`)}})}function Z(){for(let e of U())e.lock||(e.name=Names.getCulture(e.culture));I.refresh(),p.draw(`labels`)}function Q(){let e=pack.states.map(e=>{let t=e.color?e.color:`#ccc`,n=e.fullName?e.fullName:e.name;return{id:e.i,state:e.i?0:null,color:t,name:n}}),t=pack.burgs.filter(e=>e.i&&!e.removed).map(t=>{let n=t.i+e.length-1,r=t.population,i=t.capital,a=pack.cells.province[t.cell],o=a?a+e.length-1:t.state;return{id:n,i:t.i,state:t.state,culture:t.culture,province:a,parent:o,name:t.name,population:r,capital:i,x:t.x,y:t.y}}),n=e.concat(t);if(n.length<2){y(`No burgs to show`,!1,`error`);return}let r=_().parentId(e=>e.state)(n).sum(e=>e.population).sort((e,t)=>t.value-e.value),i=l(`uiSize`).valueAsNumber,a=150+200*i,o=150+200*i,u={top:0,right:-50,bottom:-10,left:-50},d=a-u.left-u.right,f=o-u.top-u.bottom,p=v().size([d,f]).padding(3);alertMessage.innerHTML=`<select id="burgsTreeType" style="display:block; margin-left:13px; font-size:11px">
      <option value="states" selected>Group by state</option>
      <option value="cultures">Group by culture</option>
      <option value="parent">Group by province and state</option>
      <option value="provinces">Group by province</option>
    </select>`,alertMessage.innerHTML+=`<div id='burgsInfo' class='chartInfo'>&#8205;</div>`;let m=c(`#alertMessage`).insert(`svg`,`#burgsInfo`).attr(`id`,`burgsTree`).attr(`width`,a).attr(`height`,o-10).attr(`stroke-width`,2).append(`g`).attr(`transform`,`translate(-50, -10)`);l(`burgsTreeType`).addEventListener(`change`,x),p(r);let h=m.selectAll(`circle`).data(r.leaves()).join(`circle`).attr(`data-id`,e=>e.data.i).attr(`r`,e=>e.r).attr(`fill`,e=>e.parent.data.color).attr(`cx`,e=>e.x).attr(`cy`,e=>e.y).on(`mouseenter`,(e,t)=>g(e,t)).on(`mouseleave`,e=>b(e)).on(`click`,(e,t)=>zoomTo(t.data.x,t.data.y,8,2e3));function g(e,t){c(e.target).transition().duration(1500).attr(`stroke`,`#c13119`);let n=t.data.name,r=t.parent.data.name,i=s(t.value*populationRate*urbanization);l(`burgsInfo`).innerHTML=`${n}. ${r}. Population: ${i}`,G(e),y(`Click to zoom into view`)}function b(e){K(),l(`burgsInfo`)&&(l(`burgsInfo`).innerHTML=`&#8205;`,c(e.target).transition().attr(`stroke`,null),y(``))}function x(){let e=()=>pack.states.map(e=>{let t=e.color?e.color:`#ccc`,n=e.fullName?e.fullName:e.name;return{id:e.i,state:e.i?0:null,color:t,name:n}}),n=()=>pack.cultures.map(e=>{let t=e.color?e.color:`#ccc`;return{id:e.i,culture:e.i?0:null,color:t,name:e.name}}),r=()=>{let e=pack.states.map(e=>{let t=e.color?e.color:`#ccc`,n=e.fullName?e.fullName:e.name;return{id:e.i,parent:e.i?0:null,color:t,name:n}}),t=pack.provinces.filter(e=>e.i&&!e.removed).map(t=>({id:t.i+e.length-1,parent:t.state,color:t.color,name:t.fullName}));return e.concat(t)},i=()=>pack.provinces.map(e=>{let t=e.color?e.color:`#ccc`,n=e.fullName?e.fullName:e.name;return{id:e.i?e.i:0,province:e.i?0:null,color:t,name:n}}),a=e=>{if(this.value===`states`)return e.state;if(this.value===`cultures`)return e.culture;if(this.value===`parent`)return e.parent;if(this.value===`provinces`)return e.province},o={states:e,cultures:n,parent:r,provinces:i}[this.value]();t.forEach(e=>{e.id=e.i+o.length-1});let s=o.concat(t),c=_().parentId(e=>a(e))(s).sum(e=>e.population).sort((e,t)=>t.value-e.value);h.data(p(c).leaves()).transition().duration(2e3).attr(`data-id`,e=>e.data.i).attr(`fill`,e=>e.parent.data.color).attr(`cx`,e=>e.x).attr(`cy`,e=>e.y).attr(`r`,e=>e.r)}$(`#alert`).dialog({title:`Burgs bubble chart`,width:`fit-content`,position:{my:`left bottom`,at:`left+10 bottom-10`,of:`svg`},buttons:{},close:()=>alertMessage.innerHTML=``})}async function ee(){let t=`Id,Burg,Province,Province Full Name,State,State Full Name,Culture,Religion,Group,Population,X,Y,Latitude,Longitude,Elevation (${heightUnit.value}),Altitude (ft),Temperature,Temperature likeness,Capital,Port,Citadel,Walls,Plaza,Temple,Shanty Town,Emblem,Preview link\n`,s=pack.burgs.filter(e=>e.i&&!e.removed);for(let e of s){t+=`${e.i},`,t+=`${e.name},`;let r=pack.cells.province[e.cell];t+=r?`${pack.provinces[r].name},`:`,`,t+=r?`${pack.provinces[r].fullName},`:`,`,t+=`${pack.states[e.state].name},`,t+=`${pack.states[e.state].fullName},`,t+=`${pack.cultures[e.culture].name},`,t+=`${pack.religions[pack.cells.religion[e.cell]].name},`,t+=`${e.group},`,t+=`${n(e.population*populationRate*urbanization)},`,t+=`${e.x},`,t+=`${e.y},`,t+=`${i(e.y,mapCoordinates,graphHeight,2)},`,t+=`${a(e.x,mapCoordinates,graphWidth,2)},`,t+=`${parseInt(o(pack.cells.h[e.cell]),10)},`,t+=`${e.flying?e.altitude??``:``},`;let s=grid.cells.temp[pack.cells.g[e.cell]];t+=`${u(s)},`,t+=`${d(s)},`,t+=e.capital?`capital,`:`,`,t+=e.port?`port,`:`,`,t+=e.citadel?`citadel,`:`,`,t+=e.walls?`walls,`:`,`,t+=e.plaza?`plaza,`:`,`,t+=e.temple?`temple,`:`,`,t+=e.shanty?`shanty town,`:`,`,t+=e.coa?`${JSON.stringify(e.coa).replace(/"/g,``).replace(/,/g,`;`)},`:`,`,t+=(await Burgs.getPreview(e)).link,t+=`
`}let c=`${e(`Burgs`)}.csv`;r(t,c)}function te(){alertMessage.innerHTML=`Download burgs list as a text file, make changes and re-upload the file. Make sure the file is a plain text document with each
    name on its own line (the dilimiter is CRLF). If you do not want to change the name, just leave it as is`,$(`#alert`).dialog({title:`Burgs bulk renaming`,width:`22em`,position:{my:`center`,at:`center`,of:`svg`},buttons:{Download:()=>{let t=pack.burgs.filter(e=>e.i&&!e.removed).map(e=>e.name).join(`\r
`),n=`${e(`Burg names`)}.txt`;r(t,n)},Upload:()=>l(`burgsListToLoad`).click(),Cancel:function(){$(this).dialog(`close`)}}})}function ne(e){if(!e){y(`Cannot load the file, please check the format`,!1,`error`);return}let t=e.replace(/\r\n|\r/g,`
`).split(`
`).filter(Boolean);if(!t.length){y(`Cannot parse the list, please check the file format`,!1,`error`);return}let n=[],r=`Burgs to be renamed as below:`;r+=`<table class="overflow-table"><tr><th>Id</th><th>Current name</th><th>New Name</th></tr>`;let i=pack.burgs.filter(e=>e.i&&!e.removed);for(let e=0;e<t.length&&e<=i.length;e++){let a=t[e];a&&i[e]&&a!==i[e].name&&(n.push({id:i[e].i,name:a}),r+=`<tr><td style="width:20%">${i[e].i}</td><td style="width:40%">${i[e].name}</td><td style="width:40%">${a}</td></tr>`)}r+=`</tr></table>`,n.length||(r=`No changes found in the file. Please change some names to get a result`),alertMessage.innerHTML=r,x({title:`Burgs bulk renaming`,message:r,confirm:`Rename`,onConfirm:()=>{for(let e=0;e<n.length;e++){let t=n[e].id;pack.burgs[t].name=n[e].name}I.refresh(),p.draw(`labels`)}})}function re(){let e=pack.burgs.filter(e=>e.i&&!e.removed&&!e.capital&&!e.lock).length;x({title:`Remove ${e} burgs`,message:`
        Are you sure you want to remove all <i>unlocked</i> burgs except for capitals?
        <br><i>To remove a capital you have to remove its state first</i>`,confirm:`Remove`,onConfirm:()=>{pack.burgs.filter(e=>e.i&&!(e.capital||e.lock)).forEach(e=>{Burgs.remove(e.i),f(`burg`,e.i)}),I.refresh(),p.draw(`burgIcons`,`labels`)}})}function ie(){let e=pack.burgs.filter(e=>e.i&&!e.removed),t=e.every(e=>e.lock);e.forEach(e=>{e.lock=!t}),I.refresh(),l(`burgsLockAll`).className=t?`icon-lock`:`icon-lock-open`}function ae(){let e=pack.burgs.every(({lock:e,i:t,removed:n})=>e||!t||n);l(`burgsLockAll`).className=e?`icon-lock-open`:`icon-lock`}var oe={open:L};export{oe as BurgsOverview};