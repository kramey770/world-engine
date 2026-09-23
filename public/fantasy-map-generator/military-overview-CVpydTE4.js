import{C as e,Et as t,Kt as n,L as r,N as i,Q as a,S as o,d as s,dn as c,k as l}from"./utils-BIleyWmR.js";import{t as u}from"./layers-qPZxwHcp.js";import{t as d}from"./sum-BpJJqxFM.js";import{r as f}from"./tooltips-zkair8Am.js";import{a as p,t as m}from"./dialog-helpers-50LJgx0U.js";import{P as h,b as g,y as _}from"./index-tuMZPduM.js";import{t as v}from"./highlighting-CqamXa3p.js";import{i as y,n as b,r as x,t as S}from"./table-oyVozzWP.js";var C=`militaryOverview`,w={my:`right top`,at:`right-10 top+10`,of:`svg`,collision:`fit`},T=[],E=b({getData:P,onUpdate:I});function D(){customization||(m(`#militaryOverview, .stable`),u.show(`states`,`borders`,`military`),O(),E.reset(),$(`#militaryOverview`).dialog({title:`Military Overview`,resizable:!1,width:fitContent(),close:k,position:w}))}function O(){T=j(),document.getElementById(`militaryOverview`)?.remove();let e=`<div id="${C}" class="dialog stable editorDialog">
      <div id="militaryBody" class="table" data-type="absolute">
        ${x({dialogId:C,columns:T})}
      </div>
      <div id="militaryFooter" class="totalLine">
        <div data-tip="States number" style="margin-left: 4px">
          States:&nbsp;<span id="militaryFooterStates">0</span>
        </div>
        <div data-tip="Total military forces" style="margin-left: 14px" data-col="total">
          Total forces:&nbsp;<span id="militaryFooterForcesTotal">0</span>
        </div>
        <div data-tip="Average military forces per state" style="margin-left: 14px" data-col="total">
          Average forces:&nbsp;<span id="militaryFooterForces">0</span>
        </div>
        <div data-tip="Average forces rate per state" style="margin-left: 14px" data-col="rate">
          Average rate:&nbsp;<span id="militaryFooterRate">0%</span>
        </div>
        <div data-tip="Average War Alert" style="margin-left: 14px" data-col="alert">
          Average alert:&nbsp;<span id="militaryFooterAlert">0</span>
        </div>
      </div>
      <div id="militaryBottom" class="editorToolbar">
        <button id="militaryOverviewRefresh" data-tip="Refresh the overview screen" class="icon-cw"></button>
        <button id="militaryOptionsButton" data-tip="Edit Military units" class="icon-cog"></button>
        <button id="militaryRegimentsList" data-tip="Show regiments list" class="icon-list-bullet"></button>
        <button
          id="militaryPercentage"
          data-tip="Toggle percentage / absolute values views"
          class="icon-percent"
        ></button>
        <button
          id="militaryOverviewRecalculate"
          data-tip="Recalculate military forces based on current options"
          class="icon-retweet"
        ></button>
        <button
          id="militaryExport"
          data-tip="Save military-related data as a text file (.csv)"
          class="icon-download"
        ></button>
        <button id="militaryWiki" data-tip="Open Military Forces Tutorial" class="icon-info"></button>
      </div>
    </div>`;l(`dialogs`).insertAdjacentHTML(`beforeend`,e),M(),v(`militaryOverview`,({cellId:e})=>pack.cells.state[e]);let t=l(`militaryBody`);l(`militaryOverviewRefresh`).addEventListener(`click`,F),l(`militaryPercentage`).addEventListener(`click`,V),l(`militaryOptionsButton`).addEventListener(`click`,H),l(`militaryRegimentsList`).addEventListener(`click`,()=>A(-1)),l(`militaryOverviewRecalculate`).addEventListener(`click`,G),l(`militaryExport`).addEventListener(`click`,K),l(`militaryWiki`).addEventListener(`click`,()=>a(`Military-Forces`)),t.addEventListener(`change`,e=>{let t=e.target,n=t.closest(`.states`);n&&L(+n.dataset.id,+t.value)}),t.addEventListener(`click`,e=>{let t=e.target,n=t.closest(`.states`);if(!n)return;let r=+n.dataset.id;t.tagName===`SPAN`&&A(r)})}function k(){$(`#militaryOverview`).dialog(`destroy`),l(`militaryOverview`).remove()}async function A(e){h.RegimentsOverview.open(e)}function j(){return[{key:`color`,width:`1.2em`,permanent:!0},{key:`state`,label:`State`,width:`7em`,permanent:!0,sortBy:e=>e.state.name||``,sortType:`alpha`},...options.military.map(e=>({key:`unit:${e.name}`,label:i(e.name.replace(/_/g,` `)),width:`5em`,mobileHidden:!0,tip:`State ${e.name} units number. Click to sort`,sortBy:t=>t.forces[e.name]||0})),{key:`total`,label:`Total`,width:`5em`,defaultSort:`desc`,sortBy:e=>e.total,tip:`Total military personnel (considering crew). Click to sort`},{key:`population`,label:`Population`,width:`6.5em`,mobileHidden:!0,sortBy:e=>e.population},{key:`rate`,label:`Rate`,width:`5em`,sortBy:e=>e.rate,tip:`Military personnel rate (% of state population). Depends on war alert. Click to sort`},{key:`alert`,label:`War Alert`,width:`5.5em`,sortBy:e=>e.alert,tip:`War Alert. Modifier to military forces number, depends on political situation. Click to sort`},{key:`actions`,width:`1.4em`,permanent:!0,align:`right`}]}function M(){_(C,E.reset),S({dialogId:C,columns:T,onUpdate:()=>p(C,{width:`fit-content`,position:w})})}function N(){T=j(),l(`${C}Header`).outerHTML=x({dialogId:C,columns:T}),M(),E.reset()}function P(){let e=pack.states.filter(e=>e.i&&!e.removed).map(e=>{let n=Object.fromEntries(options.military.map(t=>[t.name,(e.military||[]).reduce((e,n)=>e+(n.u[t.name]||0),0)])),r=t(((e.rural||0)+(e.urban||0)*urbanization)*populationRate),i=options.military.reduce((e,t)=>e+(n[t.name]||0)*t.crew,0);return{state:e,forces:n,total:i,population:r,rate:r?i/r*100:0,alert:e.alert??0}});return g(C,e,T)}function F(){E.refresh()}function I(e){let n=l(`militaryBody`),r=n.dataset.type===`percentage`,i=e.all.reduce((e,t)=>{e.total+=t.total,e.population+=t.population;for(let n of options.military)e.units[n.name]=(e.units[n.name]||0)+t.forces[n.name];return e},{total:0,population:0,units:{}}),a=(e,n)=>`${t(n?e/n*100:0)}%`,o=e.rows.map(e=>{let n=options.military.map(t=>{let n=e.forces[t.name]||0;return`<div data-col="${`unit:${t.name}`}" data-tip="State ${t.name} units number">${r?a(n,i.units[t.name]||0):n}</div>`}).join(``);return`<div class="states" data-id="${e.state.i}">
        <fill-box data-col="color" data-tip="${e.state.fullName}" fill="${e.state.color}" disabled></fill-box>
        <input data-col="state" data-tip="${e.state.fullName}" value="${e.state.name}" readonly />
        ${n}
        <div data-col="total" data-tip="Total state military personnel (considering crew)" style="font-weight:bold">${r?a(e.total,i.total):s(e.total)}</div>
        <div data-col="population" data-tip="State population">${r?a(e.population,i.population):s(e.population)}</div>
        <div data-col="rate" data-tip="Military personnel rate (% of state population). Depends on war alert">${t(e.rate,2)}%</div>
        <input data-col="alert" data-tip="War Alert. Editable modifier to military forces number, depends on political situation" type="number" min="0" step=".01" value="${t(e.alert,2)}" />
        <div data-col="actions"><span data-tip="Show regiments list" class="icon-list-bullet pointer"></span></div>
      </div>`}).join(``);n.querySelectorAll(`:scope > .states`).forEach(e=>{e.remove()}),n.insertAdjacentHTML(`beforeend`,o),R(e),y(l(`militaryFooter`),e,E.goto),n.querySelectorAll(`:scope > .states`).forEach(e=>{e.addEventListener(`mouseenter`,z),e.addEventListener(`mouseleave`,B)}),p(C,{width:`fit-content`,position:w})}function L(e,n){let r=pack.states[e],i=r.alert??1,a=i?n/i:0;r.alert=n,(r.military||[]).forEach(e=>{Object.keys(e.u).forEach(n=>{e.u[n]=t(e.u[n]*a)}),e.a=d(Object.values(e.u)),c(`#armies > g > g#regiment${r.i}-${e.i} > text`).text(Military.getTotal(e))}),E.refresh()}function R(e){let n=e.all.length,r=d(e.all.map(e=>e.total));l(`militaryFooterStates`).innerHTML=String(n),l(`militaryFooterForcesTotal`).innerHTML=s(r),l(`militaryFooterForces`).innerHTML=s(n?r/n:0),l(`militaryFooterRate`).innerHTML=`${t(n?d(e.all.map(e=>e.rate))/n:0,2)}%`,l(`militaryFooterAlert`).innerHTML=String(t(n?d(e.all.map(e=>e.alert))/n:0,2))}function z(e){let t=+e.target.dataset.id;if(customization||!t||(c(`#armies > g > g#army${t}`).transition().duration(2e3).style(`fill`,`#ff0000`),!u.isOn(`states`)))return;let r=c(`#regions`).select(`#state${t}`).attr(`d`),i=c(`#debug`).append(`path`).attr(`class`,`highlight`).attr(`d`,r).attr(`fill`,`none`).attr(`stroke`,`red`).attr(`stroke-width`,1).attr(`opacity`,1).attr(`filter`,`url(#blur1)`),a=i.node().getTotalLength(),o=(a+5e3)/2,s=n(`0,${a}`,`${a},${a}`);i.transition().duration(o).attrTween(`stroke-dasharray`,()=>e=>s(e))}function B(e){c(`#debug`).selectAll(`.highlight`).each(function(){c(this).transition().duration(1e3).attr(`opacity`,0).remove()});let t=+e.target.dataset.id;c(`#armies > g > g#army${t}`).transition().duration(1e3).style(`fill`,null)}function V(){let e=l(`militaryBody`);e.dataset.type=e.dataset.type===`absolute`?`percentage`:`absolute`,E.refresh()}function H(){U();let e=[`melee`,`ranged`,`mounted`,`machinery`,`naval`,`armored`,`aviation`,`magical`],t=l(`militaryOptions`).querySelector(`tbody`);if(n(),options.military.map(e=>s(e)),$(`#militaryOptions`).dialog({title:`Edit Military Units`,resizable:!1,width:fitContent(),position:{my:`center`,at:`center`,of:`svg`},close:W,buttons:{Apply:d,Add:()=>s({icon:`🛡️`,name:`custom${l(`militaryOptionsTable`).rows.length}`,rural:.2,urban:.5,crew:1,power:1,type:`melee`,separate:0}),Restore:c,Cancel:function(){$(this).dialog(`close`)}},open:function(){let e=$(this).dialog(`widget`).find(`.ui-dialog-buttonset > button`);e[0].addEventListener(`mousemove`,()=>f(`Apply military units settings. <span style='color:#cb5858'>All forces will be recalculated!</span>`)),e[1].addEventListener(`mousemove`,()=>f(`Add new military unit to the table`)),e[2].addEventListener(`mousemove`,()=>f(`Restore default military units and settings`)),e[3].addEventListener(`mousemove`,()=>f(`Close the window without saving the changes`))}}),modules.overviewMilitaryCustomize)return;modules.overviewMilitaryCustomize=!0,t.addEventListener(`click`,e=>{let t=e.target;if(t.tagName!==`BUTTON`)return;let n=t.dataset.type;if(n===`icon`){h.IconSelector.open(t.textContent||``,e=>{t.innerHTML=e.startsWith(`http`)||e.startsWith(`data:image`)?`<img src="${e}" style="width:1.2em;height:1.2em;pointer-events:none;">`:e});return}if(n===`biomes`){u(t,pack.biomes.filter(e=>!e.removed).map(({i:e,name:t,color:n})=>({i:e,name:t,color:n})));return}if(n===`states`)return u(t,pack.states);if(n===`cultures`)return u(t,pack.cultures);if(n===`religions`)return u(t,pack.religions)});function n(){t.querySelectorAll(`tr`).forEach(e=>{e.remove()})}function i(e){return e?.join(`,`)||``}function a(e){return e?.length?`some`:`all`}function o(e,t){return e?.length?e.map(e=>t?.[e]?.name||``).join(`, `):``}function s(n){let{type:r,icon:s,name:c,rural:l,urban:u,power:d,crew:f,separate:p}=n,m=document.createElement(`tr`),h=e.map(e=>`<option ${r===e?`selected`:``} value="${e}">${e}</option>`).join(` `),g=e=>{let t=e===`biomes`?[]:pack[e];return`<button
          data-tip="Select allowed ${e}"
          data-type="${e}"
          title="${o(n[e],t)}"
          data-value="${i(n[e])}">
          ${a(n[e])}
        </button>`};m.innerHTML=`<td>
          <button data-type="icon" data-tip="Click to select unit icon">
            ${s.startsWith(`http`)||s.startsWith(`data:image`)?`<img src="${s}" style="width:1.2em;height:1.2em;pointer-events:none;">`:s||``}
          </button>
        </td>
        <td><input data-tip="Type unit name. If name is changed for existing unit, old unit will be replaced" value="${c}" /></td>
        <td>${g(`biomes`)}</td>
        <td>${g(`states`)}</td>
        <td>${g(`cultures`)}</td>
        <td>${g(`religions`)}</td>
        <td><input data-tip="Enter conscription percentage for rural population" type="number" min="0" max="100" step=".01" value="${l}" /></td>
        <td><input data-tip="Enter conscription percentage for urban population" type="number" min="0" max="100" step=".01" value="${u}" /></td>
        <td><input data-tip="Enter average number of people in crew (for total personnel calculation)" type="number" min="1" step="1" value="${f}" /></td>
        <td><input data-tip="Enter military power (used for battle simulation)" type="number" min="0" step=".1" value="${d}" /></td>
        <td>
          <select data-tip="Select unit type to apply special rules on forces recalculation">
            ${h}
          </select>
        </td>
        <td data-tip="Check if unit is <b>separate</b> and can be stacked only with the same units">
          <input id="${c}Separate" type="checkbox" class="checkbox" ${p?`checked`:``} />
          <label for="${c}Separate" class="checkbox-label"></label>
        </td>
        <td data-tip="Remove the unit">
          <span data-tip="Remove unit type" class="icon-trash-empty pointer" onclick="this.parentElement.parentElement.remove();"></span>
        </td>`,t.appendChild(m)}function c(){n(),Military.getDefaultOptions().map(e=>s(e))}function u(e,t){let n=e.dataset.type,r=e.dataset.value,i=r?r.split(`,`).map(e=>+e):[],a=t.filter(e=>e.i&&!e.removed).map(({i:e,name:t,fullName:n,color:r})=>`
          <tr data-tip="${t}">
            <td><span style="color:${r}">⬤</span></td>
            <td>
              <input data-i="${e}" id="el${e}" type="checkbox" class="checkbox"
                ${!i.length||i.includes(e)?`checked`:``} >
              <label for="el${e}" class="checkbox-label">${n||t}</label>
            </td>
          </tr>`);l(`alertMessage`).innerHTML=`<b>Limit unit by ${n}:</b>
        <table style="margin-top:.3em">
          <tbody>
            ${a.join(``)}
          </tbody>
        </table>`,$(`#alert`).dialog({width:fitContent(),title:`Limit unit`,buttons:{Invert:()=>{alertMessage.querySelectorAll(`input`).forEach(e=>{e.checked=!e.checked})},Apply:function(){let n=Array.from(alertMessage.querySelectorAll(`input`)),r=n.reduce((e,t)=>(t.checked&&e.push(t.dataset.i),e),[]);if(!r.length){f(`Select at least one element`,!1,`error`);return}let i=r.length===n.length;e.dataset.value=i?``:r.join(`,`),e.innerHTML=i?`all`:`some`,e.setAttribute(`title`,o(r.map(Number),t)),$(this).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}}})}function d(){let e=Array.from(t.querySelectorAll(`tr`)),n=e.map(e=>r(e.querySelector(`input`).value));if(new Set(n).size!==n.length){f(`All units should have unique names`,!1,`error`);return}$(`#militaryOptions`).dialog(`close`),options.military=e.map((e,t)=>{let[r,,i,a,o,s,c,l,u,d,f,p]=Array.from(e.querySelectorAll(`input, button, select`)).map(e=>{let{type:t,value:n}=e.dataset||{};if(t===`icon`){let t=e.innerHTML.trim();return t.startsWith(`<img`)?t.match(/src="([^"]*)"/)[1]:t||`⠀`}return t?n?n.split(`,`).map(e=>parseInt(e,10)):null:e.type===`number`?+e.value||0:e.type===`checkbox`?+e.checked||0:e.value}),m={icon:r,name:n[t],rural:c,urban:l,crew:u,power:d,type:f,separate:p};return i&&(m.biomes=i),a&&(m.states=a),o&&(m.cultures=o),s&&(m.religions=s),m}),localStorage.setItem(`military`,JSON.stringify(options.military)),Military.generate(),N()}}function U(){document.getElementById(`militaryOptions`)?.remove(),l(`dialogs`).insertAdjacentHTML(`beforeend`,`<div id="militaryOptions" class="dialog stable">
      <div class="table">
        <table id="militaryOptionsTable">
          <thead>
            <tr>
              <th data-tip="Unit icon">Icon</th>
              <th data-tip="Unit name. If name is changed for existing unit, old unit will be replaced">Unit name</th>
              <th style="width: 5em" data-tip="Select allowed biomes">Biomes</th>
              <th style="width: 5em" data-tip="Select allowed states">States</th>
              <th style="width: 5em" data-tip="Select allowed cultures">Cultures</th>
              <th style="width: 5em" data-tip="Select allowed religions">Religions</th>
              <th data-tip="Conscription percentage for rural population">Rural</th>
              <th data-tip="Conscription percentage for urban population">Urban</th>
              <th data-tip="Average number of people in crew (used for total personnel calculation)">Crew</th>
              <th data-tip="Unit military power (used for battle simulation)">Power</th>
              <th data-tip="Unit type to apply special rules on forces recalculation">Type</th>
              <th data-tip="Check if unit is separate and can be stacked only with units of the same type">
                Separate
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>`)}function W(){$(`#militaryOptions`).dialog(`destroy`),l(`militaryOptions`).remove()}function G(){l(`alertMessage`).innerHTML=`Are you sure you want to recalculate military forces for all states?<br>Regiments for all states will be regenerated`,$(`#alert`).dialog({resizable:!1,title:`Recalculate military`,buttons:{Recalculate:function(){$(this).dialog(`close`),Military.generate(),u.draw(`military`),F()},Cancel:function(){$(this).dialog(`close`)}}})}function K(){let n=options.military.map(e=>e.name),r=`Id,State,${n.map(e=>i(e)).join(`,`)},Total,Population,Rate,War Alert\n`;for(let e of P())r+=`${e.state.i},${e.state.name},${n.map(t=>e.forces[t]||0).join(`,`)},${e.total},${e.population},${t(e.rate,2)}%,${e.alert}\n`;let a=`${e(`Military`)}.csv`;o(r,a)}var q={open:D};export{q as MilitaryOverview};