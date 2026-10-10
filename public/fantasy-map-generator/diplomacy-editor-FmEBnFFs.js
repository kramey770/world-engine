import{$t as e,A as t,C as n,M as r,S as i,ct as a,fn as o,k as s,ot as c,qt as l}from"./utils-BQO-hFhv.js";import{j as u,t as d}from"./layers-BbA1m_cj.js";import{r as f,t as p}from"./tooltips-CEG5Qxvo.js";import{a as m,r as h,t as g}from"./dialog-helpers-Rc_1Mfut.js";import{b as _,j as v,y}from"./index-CLCZ-FTJ.js";import{t as b}from"./highlighting-DOKNKfSn.js";import{i as x,n as S,r as C,t as w}from"./table-CiNbdu0R.js";var T={Ally:{inText:`is an ally of`,color:`#35353a`,tip:`Allies formed a defensive pact and protect each other in case of third party aggression`},Friendly:{inText:`is friendly to`,color:`#b5b5ba`,tip:`State is friendly to anouther state when they share some common interests`},Neutral:{inText:`is neutral to`,color:`#f1f1f2`,tip:`Neutral means states relations are neither positive nor negative`},Suspicion:{inText:`is suspicious of`,color:`#b5b5ba`,tip:`Suspicion means state has a cautious distrust of another state`},Enemy:{inText:`is at war with`,color:`#e05252`,tip:`Enemies are states at war with each other`},Unknown:{inText:`does not know about`,color:`#b5b5ba`,tip:`Relations are unknown if states do not have enough information about each other`},Rival:{inText:`is a rival of`,color:`#c23a3a`,tip:`Rivalry is a state of competing for dominance in the region`},Vassal:{inText:`is a vassal of`,color:`#b5b5ba`,tip:`Vassal is a state having obligation to its suzerain`},Suzerain:{inText:`is suzerain to`,color:`#35353a`,tip:`Suzerain is a state having some control over its vassals`}},E=`diplomacyEditor`,D={my:`right top`,at:`right-10 top+10`,of:`svg`,collision:`fit`},O=0,k=[{key:`name`,label:`State`,width:`15em`,permanent:!0,sortBy:e=>e.fullName||e.name,sortType:`alpha`},{key:`relations`,label:`Relations`,width:`7em`,sortBy:e=>e.diplomacy?.[O]??``,sortType:`alpha`},{key:`actions`,width:`1.4em`,permanent:!0}],A=S({getData:()=>_(E,pack.states.filter(e=>e.i&&!e.removed&&e.i!==O),k),onUpdate:F}),j=()=>pack.states[0].diplomacy;function M(){if(!customization){if(pack.states.filter(e=>e.i&&!e.removed).length<2){f(`There should be at least 2 states to edit the diplomacy`,!1,`error`);return}(!O||!pack.states[O]||pack.states[O].removed)&&(O=pack.states.find(e=>e.i&&!e.removed).i),g(`#${E}, .stable`),d.show(`states`,`borders`),d.hide(`provinces`,`cultures`),d.hide(`biomes`,`religions`),N(),P(),o(`#viewbox`).style(`cursor`,`crosshair`).on(`click`,z),$(`#${E}`).dialog({title:`Diplomacy Editor`,resizable:!1,width:fitContent(),close:X,position:D})}}function N(){h(E);let e=`<div id="${E}" class="dialog stable editorDialog">
      ${C({dialogId:E,columns:k})}
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
  </div>`;s(`dialogs`).insertAdjacentHTML(`beforeend`,e),y(E,A.reset),b(E,({cellId:e})=>pack.cells.state[e]),w({dialogId:E,columns:k,onUpdate:()=>m(E,{width:`fit-content`,position:D})}),s(`diplomacyEditorRefresh`).addEventListener(`click`,P),s(`diplomacyEditStyle`).addEventListener(`click`,()=>editStyle(`regions`)),s(`diplomacyRegenerate`).addEventListener(`click`,H),s(`diplomacyReset`).addEventListener(`click`,U),s(`diplomacyShowMatrix`).addEventListener(`click`,K),s(`diplomacyHistory`).addEventListener(`click`,W),s(`diplomacyExport`).addEventListener(`click`,Y),s(`diplomacyBodySection`).addEventListener(`click`,e=>{let t=e.target,n=t.closest(`.states`);if(n&&!n.classList.contains(`Self`)){if(t.closest(`.changeRelations`)){let e=+n.dataset.id,t=+s(`diplomacyBodySection`).querySelector(`div.Self`).dataset.id,r=n.dataset.relations;B(e,t,r);return}O=+n.dataset.id,P()}})}function P(){A.reset(),R()}function F(e){let t=s(`diplomacyBodySection`),n=pack.states,r=O,i=n[r].name;u.trigger(`stateCOA${r}`,n[r].coa);let a=`<div class="states Self" data-id=${r} data-tip="List below shows relations to ${i}">
    <div data-col="name"><svg class="coaIcon" viewBox="0 0 200 200"><use href="#stateCOA${r}"></use></svg><span>${n[r].fullName}</span></div>
    <div data-col="relations"></div>
    <div data-col="actions"></div>
  </div>`;for(let t of e.rows){let e=t.diplomacy[r],{color:n,inText:o}=T[e],s=`${t.name} ${o} ${i}`,c=`${s}. Click to see relations to ${t.name}`,l=`Click to change relations. ${s}`,d=t.fullName.length<23?t.fullName:t.name;u.trigger(`stateCOA${t.i}`,t.coa),a+=`<div class="states" data-id=${t.i} data-name="${d}" data-relations="${e}">
      <div data-col="name" data-tip="${c}"><svg class="coaIcon" viewBox="0 0 200 200"><use href="#stateCOA${t.i}"></use></svg><span>${d}</span></div>
      <div data-col="relations" data-tip="${l}" class="changeRelations">
        <fill-box fill="${n}" size=".9em"></fill-box>
        ${e}
      </div>
      <div data-col="actions"></div>
    </div>`}t.innerHTML=a,t.querySelectorAll(`div.states`).forEach(e=>{e.addEventListener(`mouseenter`,I)}),t.querySelectorAll(`div.states`).forEach(e=>{e.addEventListener(`mouseleave`,L)}),s(`diplomacyFooterStates`).textContent=String(e.all.length+1),x(s(`diplomacyFooter`),e,A.goto),m(E,{width:`fit-content`,position:D})}function I(e){if(!d.isOn(`states`))return;let t=+e.target.dataset.id;if(customization||!t)return;let n=o(`#regions`).select(`#state${t}`).attr(`d`),r=o(`#debug`).append(`path`).attr(`class`,`highlight`).attr(`d`,n).attr(`fill`,`none`).attr(`stroke`,`#e05252`).attr(`stroke-width`,1).attr(`opacity`,1).attr(`filter`,`url(#blur1)`),i=r.node().getTotalLength(),a=(i+5e3)/2,s=l(`0,${i}`,`${i},${i}`);r.transition().duration(a).attrTween(`stroke-dasharray`,()=>e=>s(e))}function L(){o(`#debug`).selectAll(`.highlight`).each(function(){o(this).transition().duration(1e3).attr(`opacity`,0).remove()})}function R(){let t=s(`diplomacyBodySection`).querySelector(`div.Self`),n=t?+t.dataset.id:pack.states.find(e=>e.i&&!e.removed).i;n&&(d.show(`states`),o(`#statesBody`).selectAll(`path`).each(function(){if(this.id.slice(0,9)===`state-gap`)return;let t=+this.id.slice(5),r=T[pack.states[t].diplomacy[n]]?.color||`#7d7d83`;this.setAttribute(`fill`,r),o(`#statesBody`).select(`#state-gap${t}`).attr(`stroke`,r),o(`#statesHalo`).select(`#state-border${t}`).attr(`stroke`,c(e(r).darker().formatHex()))}))}function z(e){let t=r(e,this),n=Pack.findCell(t[0],t[1]),i=pack.cells.state[n];i&&pack.states[i]&&!pack.states[i].removed&&O!==i&&(O=i,P())}function B(e,t,n){let r=pack.states,i=r[e],a=Object.entries(T).map(([e,{color:t,inText:r,tip:i}])=>`
        <div data-tip="${i}">
          <label class="pointer">
            <input type="radio" name="relationSelect" value="${e}"
            ${n===e?`checked`:``} >
            <fill-box fill="${t}" size=".8em"></fill-box>
            ${r}
        </label>
        </div>
      `).join(``),o=r.filter(t=>t.i&&!t.removed&&t.i!==e).map(e=>`
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
          <div id="stateSelectionContainer" style="display: flex; flex-direction: column; gap: .3em;">${o}</div>
        </section>
      </main>
    </form>
  `,$(`#alert`).dialog({width:fitContent(),title:`Change relations`,buttons:{Apply:function(){let t=new FormData(s(`relationsForm`)),r=t.get(`relationSelect`),i=[...t.getAll(`objectSelect`)].map(Number);for(let t of i)V(e,t,n,r);$(this).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}}});let c=s(`selectAllNoneBtn`),l=()=>document.querySelectorAll(`#stateSelectionContainer input[name='objectSelect']`);function u(){let e=l();Array.from(e).every(e=>e.checked)&&e.length>0?c.classList.add(`pressed`):c.classList.remove(`pressed`)}function d(){let e=l(),t=!Array.from(e).every(e=>e.checked);e.forEach(e=>{e.checked=t}),u()}c.addEventListener(`click`,e=>{e.preventDefault(),d()}),u()}function V(e,n,r,i){if(i===r)return;let o=pack.states,s=j(),c=o[e].name,l=o[n].name;o[e].diplomacy[n]=i,o[n].diplomacy[e]=i===`Vassal`?`Suzerain`:i===`Suzerain`?`Vassal`:i;let u=()=>[`Relations change`,`${c}-${a(l)} relations changed to ${i.toLowerCase()}`],d=()=>[`Defence pact`,`${c} entered into defensive pact with ${l}`],f=()=>[`Vassalization`,`${c} became a vassal of ${l}`],p=()=>[`Vassalization`,`${c} vassalized ${l}`],m=()=>[`Rivalization`,`${c} and ${l} became rivals`],h=()=>[`Relations severance`,`${c} recalled their ambassadors and wiped all the records about ${l}`];r===`Enemy`?s.push([`War termination`,`${c} and ${l} agreed to cease fire and signed a peace treaty`,(i===`Ally`?d():i===`Vassal`?f():i===`Suzerain`?p():i===`Unknown`?h():u())[1]]):i===`Enemy`?s.push([`War declaration`,`${c} declared a war on its enemy ${l}`]):i===`Vassal`?s.push(f()):i===`Suzerain`?s.push(p()):i===`Ally`?s.push(d()):i===`Unknown`?s.push(h()):i===`Rival`?s.push(m()):s.push(u()),P(),t(`diplomacyMatrix`)&&K()}function H(){States.generateDiplomacy(),P()}function U(){let e=+s(`diplomacyBodySection`).querySelector(`div.Self`).dataset.id;if(!e)return;let t=pack.states;t[e].diplomacy.forEach((n,r)=>{n!==`x`&&(t[e].diplomacy[r]=`Neutral`,t[r].diplomacy[e]=`Neutral`)}),P()}function W(){let e=j(),t=`<div autocorrect="off" spellcheck="false">`;e.forEach((e,n)=>{t+=`<div>`,e.forEach((e,r)=>{t+=`<div contenteditable="true" data-id="${n}-${r}"
        ${r?``:`style='font-weight:bold'`}>${e}</div>`}),t+=`&#8205;</div>`}),e.length||(pack.states[0].diplomacy=[[]],t+=`<div><div contenteditable="true" data-id="0-0">No historical records</div>&#8205;</div>`),alertMessage.innerHTML=`${t}</div><div class="info-line">Type to edit. Press Enter to add a new line, empty the element to remove it</div>`,alertMessage.querySelectorAll(`div[contenteditable='true']`).forEach(e=>{e.addEventListener(`input`,G)}),$(`#alert`).dialog({title:`Relations history`,position:{my:`center`,at:`center`,of:`svg`},buttons:{Save:function(){let e=this.querySelector(`div`).innerText.split(`
`).join(`\r
`),t=`${n(`Relations history`)}.txt`;i(e,t)},Clear:function(){pack.states[0].diplomacy=[],$(this).dialog(`close`)},Close:function(){$(this).dialog(`close`)}}})}function G(){let e=this.dataset.id.split(`-`),t=j()[+e[0]];this.innerHTML===``?(t.splice(+e[1],1),this.remove()):t[+e[1]]=this.innerHTML}function K(){q();let e=pack.states.filter(e=>e.i&&!e.removed),t=e.map(e=>e.i),n=s(`diplomacyMatrixBody`),r=`<table><thead><tr><th data-tip='&#8205;'></th>`;r+=`${e.map(e=>`<th data-tip='Relations to ${e.fullName}'>${e.name}</th>`).join(``)}</tr>`,r+=`<tbody>`,e.forEach(e=>{r+=`<tr data-id=${e.i}><th data-tip='Relations of ${e.fullName}'>${e.name}</th>${e.diplomacy.filter((e,n)=>t.includes(n)).map((n,r)=>{let i=T[n];if(!i)return`<td class='${n}'>${n}</td>`;let a=pack.states[t[r]],o=`${e.fullName} ${i.inText} ${a.fullName}`;return`<td data-id=${a.i} data-tip='${o}' class='${n}'>${n}</td>`}).join(``)}</tr>`}),r+=`</tbody></table>`,n.innerHTML=r,n.querySelector(`table`).addEventListener(`click`,e=>{let t=e.target;if(t.tagName!==`TD`)return;let n=t.innerText;T[n]&&B(+t.closest(`tr`).dataset.id,+t.dataset.id,n)}),$(`#diplomacyMatrix`).dialog({title:`Relations matrix`,position:{my:`center`,at:`center`,of:`svg`},close:J,buttons:{}})}function q(){h(`diplomacyMatrix`),s(`dialogs`).insertAdjacentHTML(`beforeend`,`<div id="diplomacyMatrix" class="dialog">
      <div id="diplomacyMatrixBody" class="matrix-table"></div>
    </div>`)}function J(){$(`#diplomacyMatrix`).dialog(`destroy`),s(`diplomacyMatrix`).remove()}function Y(){let e=pack.states.filter(e=>e.i&&!e.removed),t=e.map(e=>e.i),r=`,${e.map(e=>e.name).join(`,`)}\n`;e.forEach(e=>{let n=e.diplomacy.filter((e,n)=>t.includes(n));r+=`${e.name},${n.join(`,`)}\n`});let a=`${n(`Relations`)}.csv`;i(r,a)}function X(){v(),p();let e=s(`diplomacyBodySection`).querySelector(`div.Self`);e&&e.classList.remove(`Self`),d.show(`states`),o(`#debug`).selectAll(`.highlight`).remove(),$(`#${E}`).dialog(`destroy`),s(E).remove()}var Z={open:M};export{Z as DiplomacyEditor};