import{A as e,C as t,Gt as n,M as r,S as i,Zt as a,k as o,ot as s,un as c}from"./utils-omhVlsRt.js";import{j as l,t as u}from"./layers-DHltDypB.js";import{r as d,t as f}from"./tooltips-BQ3W48fB.js";import{a as p,r as m,t as h}from"./dialog-helpers-CdcIkxap.js";import{b as g,j as _,y as v}from"./index-DWZM8gkY.js";import{t as y}from"./highlighting-D_bHr-1Y.js";import{i as b,n as x,r as S,t as C}from"./table-DM0fGDYA.js";var w={Ally:{inText:`is an ally of`,color:`#00b300`,tip:`Allies formed a defensive pact and protect each other in case of third party aggression`},Friendly:{inText:`is friendly to`,color:`#d4f8aa`,tip:`State is friendly to anouther state when they share some common interests`},Neutral:{inText:`is neutral to`,color:`#edeee8`,tip:`Neutral means states relations are neither positive nor negative`},Suspicion:{inText:`is suspicious of`,color:`#eeafaa`,tip:`Suspicion means state has a cautious distrust of another state`},Enemy:{inText:`is at war with`,color:`#e64b40`,tip:`Enemies are states at war with each other`},Unknown:{inText:`does not know about`,color:`#a9a9a9`,tip:`Relations are unknown if states do not have enough information about each other`},Rival:{inText:`is a rival of`,color:`#ad5a1f`,tip:`Rivalry is a state of competing for dominance in the region`},Vassal:{inText:`is a vassal of`,color:`#87CEFA`,tip:`Vassal is a state having obligation to its suzerain`},Suzerain:{inText:`is suzerain to`,color:`#00008B`,tip:`Suzerain is a state having some control over its vassals`}},T=`diplomacyEditor`,E={my:`right top`,at:`right-10 top+10`,of:`svg`,collision:`fit`},D=0,O=[{key:`name`,label:`State`,width:`15em`,permanent:!0,sortBy:e=>e.fullName||e.name,sortType:`alpha`},{key:`relations`,label:`Relations`,width:`7em`,sortBy:e=>e.diplomacy?.[D]??``,sortType:`alpha`},{key:`actions`,width:`1.4em`,permanent:!0}],k=x({getData:()=>g(T,pack.states.filter(e=>e.i&&!e.removed&&e.i!==D),O),onUpdate:P}),A=()=>pack.states[0].diplomacy;function j(){if(!customization){if(pack.states.filter(e=>e.i&&!e.removed).length<2){d(`There should be at least 2 states to edit the diplomacy`,!1,`error`);return}(!D||!pack.states[D]||pack.states[D].removed)&&(D=pack.states.find(e=>e.i&&!e.removed).i),h(`#${T}, .stable`),u.show(`states`,`borders`),u.hide(`provinces`,`cultures`),u.hide(`biomes`,`religions`),M(),N(),c(`#viewbox`).style(`cursor`,`crosshair`).on(`click`,R),$(`#${T}`).dialog({title:`Diplomacy Editor`,resizable:!1,width:fitContent(),close:Y,position:E})}}function M(){m(T);let e=`<div id="${T}" class="dialog stable editorDialog">
      ${S({dialogId:T,columns:O})}
      <div id="diplomacyBodySection" class="table"></div>
      <div id="diplomacyFooter" class="totalLine"><div>States: <span id="diplomacyFooterStates">0</span></div></div>
      <div class="info-line">Click on state name to see relations.<br />Click on relations name to change it</div>
      <div id="diplomacyBottom" style="margin-top: 0.1em">
        <button id="diplomacyEditorRefresh" data-tip="Refresh the Editor" class="icon-cw"></button>
        <button
          id="diplomacyEditStyle"
          data-tip="Edit states (including diplomacy view) style in Style Editor"
          class="icon-adjust"
        ></button>
        <button id="diplomacyRegenerate" data-tip="Regenerate diplomatical relations" class="icon-retweet"></button>
        <button
          id="diplomacyReset"
          data-tip="Reset diplomatical relations of selected state to Neutral"
          class="icon-eraser"
        ></button>
        <button id="diplomacyHistory" data-tip="Show relations history" class="icon-hourglass-1"></button>
        <button id="diplomacyShowMatrix" data-tip="Show relations matrix" class="icon-list-bullet"></button>
        <button
          id="diplomacyExport"
          data-tip="Save state relations matrix as a text file (.csv)"
          class="icon-download"
        ></button>
      </div>
  </div>`;o(`dialogs`).insertAdjacentHTML(`beforeend`,e),v(T,k.reset),y(T,({cellId:e})=>pack.cells.state[e]),C({dialogId:T,columns:O,onUpdate:()=>p(T,{width:`fit-content`,position:E})}),o(`diplomacyEditorRefresh`).addEventListener(`click`,N),o(`diplomacyEditStyle`).addEventListener(`click`,()=>editStyle(`regions`)),o(`diplomacyRegenerate`).addEventListener(`click`,V),o(`diplomacyReset`).addEventListener(`click`,H),o(`diplomacyShowMatrix`).addEventListener(`click`,G),o(`diplomacyHistory`).addEventListener(`click`,U),o(`diplomacyExport`).addEventListener(`click`,J),o(`diplomacyBodySection`).addEventListener(`click`,e=>{let t=e.target,n=t.closest(`.states`);if(n&&!n.classList.contains(`Self`)){if(t.closest(`.changeRelations`)){let e=+n.dataset.id,t=+o(`diplomacyBodySection`).querySelector(`div.Self`).dataset.id,r=n.dataset.relations;z(e,t,r);return}D=+n.dataset.id,N()}})}function N(){k.reset(),L()}function P(e){let t=o(`diplomacyBodySection`),n=pack.states,r=D,i=n[r].name;l.trigger(`stateCOA${r}`,n[r].coa);let a=`<div class="states Self" data-id=${r} data-tip="List below shows relations to ${i}">
    <div data-col="name"><svg class="coaIcon" viewBox="0 0 200 200"><use href="#stateCOA${r}"></use></svg><span>${n[r].fullName}</span></div>
    <div data-col="relations"></div>
    <div data-col="actions"></div>
  </div>`;for(let t of e.rows){let e=t.diplomacy[r],{color:n,inText:o}=w[e],s=`${t.name} ${o} ${i}`,c=`${s}. Click to see relations to ${t.name}`,u=`Click to change relations. ${s}`,d=t.fullName.length<23?t.fullName:t.name;l.trigger(`stateCOA${t.i}`,t.coa),a+=`<div class="states" data-id=${t.i} data-name="${d}" data-relations="${e}">
      <div data-col="name" data-tip="${c}"><svg class="coaIcon" viewBox="0 0 200 200"><use href="#stateCOA${t.i}"></use></svg><span>${d}</span></div>
      <div data-col="relations" data-tip="${u}" class="changeRelations">
        <fill-box fill="${n}" size=".9em"></fill-box>
        ${e}
      </div>
      <div data-col="actions"></div>
    </div>`}t.innerHTML=a,t.querySelectorAll(`div.states`).forEach(e=>{e.addEventListener(`mouseenter`,F)}),t.querySelectorAll(`div.states`).forEach(e=>{e.addEventListener(`mouseleave`,I)}),o(`diplomacyFooterStates`).textContent=String(e.all.length+1),b(o(`diplomacyFooter`),e,k.goto),p(T,{width:`fit-content`,position:E})}function F(e){if(!u.isOn(`states`))return;let t=+e.target.dataset.id;if(customization||!t)return;let r=c(`#regions`).select(`#state${t}`).attr(`d`),i=c(`#debug`).append(`path`).attr(`class`,`highlight`).attr(`d`,r).attr(`fill`,`none`).attr(`stroke`,`red`).attr(`stroke-width`,1).attr(`opacity`,1).attr(`filter`,`url(#blur1)`),a=i.node().getTotalLength(),o=(a+5e3)/2,s=n(`0,${a}`,`${a},${a}`);i.transition().duration(o).attrTween(`stroke-dasharray`,()=>e=>s(e))}function I(){c(`#debug`).selectAll(`.highlight`).each(function(){c(this).transition().duration(1e3).attr(`opacity`,0).remove()})}function L(){let e=o(`diplomacyBodySection`).querySelector(`div.Self`),t=e?+e.dataset.id:pack.states.find(e=>e.i&&!e.removed).i;t&&(u.show(`states`),c(`#statesBody`).selectAll(`path`).each(function(){if(this.id.slice(0,9)===`state-gap`)return;let e=+this.id.slice(5),n=w[pack.states[e].diplomacy[t]]?.color||`#4682b4`;this.setAttribute(`fill`,n),c(`#statesBody`).select(`#state-gap${e}`).attr(`stroke`,n),c(`#statesHalo`).select(`#state-border${e}`).attr(`stroke`,a(n).darker().hex())}))}function R(e){let t=r(e,this),n=Pack.findCell(t[0],t[1]),i=pack.cells.state[n];i&&pack.states[i]&&!pack.states[i].removed&&D!==i&&(D=i,N())}function z(e,t,n){let r=pack.states,i=r[e],a=Object.entries(w).map(([e,{color:t,inText:r,tip:i}])=>`
        <div data-tip="${i}">
          <label class="pointer">
            <input type="radio" name="relationSelect" value="${e}"
            ${n===e?`checked`:``} >
            <fill-box fill="${t}" size=".8em"></fill-box>
            ${r}
        </label>
        </div>
      `).join(``),s=r.filter(t=>t.i&&!t.removed&&t.i!==e).map(e=>`
        <div data-tip="${e.fullName}">
          <input id="selectState${e.i}" class="checkbox" type="checkbox" name="objectSelect" value="${e.i}"
          ${e.i===t?`checked`:``} />
          <label for="selectState${e.i}" class="checkbox-label">
            <svg class="coaIcon" viewBox="0 0 200 200">
              <use href="#stateCOA${e.i}"></use>
            </svg>
            ${e.fullName}
          </label>
        </div>
      `).join(``);alertMessage.innerHTML=`
    <form id='relationsForm' style="overflow: hidden; display: flex; flex-direction: column; gap: .3em; padding: 0.1em 0;">
      <header>
        <svg class="coaIcon" viewBox="0 0 200 200">
          <use href="#stateCOA${i.i}"></use>
        </svg>
        <b>${i.fullName}</b>
      </header>

      <main style='display: flex; gap: 1em;'>
        <section style="display: flex; flex-direction: column; gap: .3em;">${a}</section>
        <section style="display: flex; flex-direction: column; gap: .3em;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3em;">
            <label style="font-weight: 500; font-size: 0.95em;">States:</label>
            <button id="selectAllNoneBtn" type="button" style="padding: 0.3em 0.8em; cursor: pointer; font-size: 0.9em;" data-tip="Toggle selection of all states. Also supports Ctrl+A.">Select All / None</button>
          </div>
          <div id="stateSelectionContainer" style="display: flex; flex-direction: column; gap: .3em;">${s}</div>
        </section>
      </main>
    </form>
  `,$(`#alert`).dialog({width:fitContent(),title:`Change relations`,buttons:{Apply:function(){let t=new FormData(o(`relationsForm`)),r=t.get(`relationSelect`),i=[...t.getAll(`objectSelect`)].map(Number);for(let t of i)B(e,t,n,r);$(this).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}}});let c=o(`selectAllNoneBtn`),l=()=>document.querySelectorAll(`#stateSelectionContainer input[name='objectSelect']`);function u(){let e=l();Array.from(e).every(e=>e.checked)&&e.length>0?c.classList.add(`pressed`):c.classList.remove(`pressed`)}function d(){let e=l(),t=!Array.from(e).every(e=>e.checked);e.forEach(e=>{e.checked=t}),u()}c.addEventListener(`click`,e=>{e.preventDefault(),d()}),u()}function B(t,n,r,i){if(i===r)return;let a=pack.states,o=A(),c=a[t].name,l=a[n].name;a[t].diplomacy[n]=i,a[n].diplomacy[t]=i===`Vassal`?`Suzerain`:i===`Suzerain`?`Vassal`:i;let u=()=>[`Relations change`,`${c}-${s(l)} relations changed to ${i.toLowerCase()}`],d=()=>[`Defence pact`,`${c} entered into defensive pact with ${l}`],f=()=>[`Vassalization`,`${c} became a vassal of ${l}`],p=()=>[`Vassalization`,`${c} vassalized ${l}`],m=()=>[`Rivalization`,`${c} and ${l} became rivals`],h=()=>[`Relations severance`,`${c} recalled their ambassadors and wiped all the records about ${l}`];r===`Enemy`?o.push([`War termination`,`${c} and ${l} agreed to cease fire and signed a peace treaty`,(i===`Ally`?d():i===`Vassal`?f():i===`Suzerain`?p():i===`Unknown`?h():u())[1]]):i===`Enemy`?o.push([`War declaration`,`${c} declared a war on its enemy ${l}`]):i===`Vassal`?o.push(f()):i===`Suzerain`?o.push(p()):i===`Ally`?o.push(d()):i===`Unknown`?o.push(h()):i===`Rival`?o.push(m()):o.push(u()),N(),e(`diplomacyMatrix`)&&G()}function V(){States.generateDiplomacy(),N()}function H(){let e=+o(`diplomacyBodySection`).querySelector(`div.Self`).dataset.id;if(!e)return;let t=pack.states;t[e].diplomacy.forEach((n,r)=>{n!==`x`&&(t[e].diplomacy[r]=`Neutral`,t[r].diplomacy[e]=`Neutral`)}),N()}function U(){let e=A(),n=`<div autocorrect="off" spellcheck="false">`;e.forEach((e,t)=>{n+=`<div>`,e.forEach((e,r)=>{n+=`<div contenteditable="true" data-id="${t}-${r}"
        ${r?``:`style='font-weight:bold'`}>${e}</div>`}),n+=`&#8205;</div>`}),e.length||(pack.states[0].diplomacy=[[]],n+=`<div><div contenteditable="true" data-id="0-0">No historical records</div>&#8205;</div>`),alertMessage.innerHTML=`${n}</div><div class="info-line">Type to edit. Press Enter to add a new line, empty the element to remove it</div>`,alertMessage.querySelectorAll(`div[contenteditable='true']`).forEach(e=>{e.addEventListener(`input`,W)}),$(`#alert`).dialog({title:`Relations history`,position:{my:`center`,at:`center`,of:`svg`},buttons:{Save:function(){let e=this.querySelector(`div`).innerText.split(`
`).join(`\r
`),n=`${t(`Relations history`)}.txt`;i(e,n)},Clear:function(){pack.states[0].diplomacy=[],$(this).dialog(`close`)},Close:function(){$(this).dialog(`close`)}}})}function W(){let e=this.dataset.id.split(`-`),t=A()[+e[0]];this.innerHTML===``?(t.splice(+e[1],1),this.remove()):t[+e[1]]=this.innerHTML}function G(){K();let e=pack.states.filter(e=>e.i&&!e.removed),t=e.map(e=>e.i),n=o(`diplomacyMatrixBody`),r=`<table><thead><tr><th data-tip='&#8205;'></th>`;r+=`${e.map(e=>`<th data-tip='Relations to ${e.fullName}'>${e.name}</th>`).join(``)}</tr>`,r+=`<tbody>`,e.forEach(e=>{r+=`<tr data-id=${e.i}><th data-tip='Relations of ${e.fullName}'>${e.name}</th>${e.diplomacy.filter((e,n)=>t.includes(n)).map((n,r)=>{let i=w[n];if(!i)return`<td class='${n}'>${n}</td>`;let a=pack.states[t[r]],o=`${e.fullName} ${i.inText} ${a.fullName}`;return`<td data-id=${a.i} data-tip='${o}' class='${n}'>${n}</td>`}).join(``)}</tr>`}),r+=`</tbody></table>`,n.innerHTML=r,n.querySelector(`table`).addEventListener(`click`,e=>{let t=e.target;if(t.tagName!==`TD`)return;let n=t.innerText;w[n]&&z(+t.closest(`tr`).dataset.id,+t.dataset.id,n)}),$(`#diplomacyMatrix`).dialog({title:`Relations matrix`,position:{my:`center`,at:`center`,of:`svg`},close:q,buttons:{}})}function K(){m(`diplomacyMatrix`),o(`dialogs`).insertAdjacentHTML(`beforeend`,`<div id="diplomacyMatrix" class="dialog">
      <div id="diplomacyMatrixBody" class="matrix-table"></div>
    </div>`)}function q(){$(`#diplomacyMatrix`).dialog(`destroy`),o(`diplomacyMatrix`).remove()}function J(){let e=pack.states.filter(e=>e.i&&!e.removed),n=e.map(e=>e.i),r=`,${e.map(e=>e.name).join(`,`)}\n`;e.forEach(e=>{let t=e.diplomacy.filter((e,t)=>n.includes(t));r+=`${e.name},${t.join(`,`)}\n`});let a=`${t(`Relations`)}.csv`;i(r,a)}function Y(){_(),f();let e=o(`diplomacyBodySection`).querySelector(`div.Self`);e&&e.classList.remove(`Self`),u.show(`states`),c(`#debug`).selectAll(`.highlight`).remove(),$(`#${T}`).dialog(`destroy`),o(T).remove()}var X={open:j};export{X as DiplomacyEditor};