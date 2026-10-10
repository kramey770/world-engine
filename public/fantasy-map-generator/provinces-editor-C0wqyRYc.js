import{$t as e,A as t,C as n,D as r,Dt as i,Ht as a,Kt as o,M as s,S as c,Tn as l,X as u,at as d,d as f,fn as p,i as m,k as h,ot as g,pt as _,qt as v,r as y,xt as b}from"./utils-BQO-hFhv.js";import{D as x,E as S,O as C,j as w,n as T,r as E,t as D}from"./layers-BbA1m_cj.js";import{t as O}from"./sin-DXK16t1M.js";import{t as k}from"./highlight-BGpByA9K.js";import{r as ee,t as te}from"./stratify-CGdiYggi.js";import{n as A,t as j}from"./constant-CUk6ox2a.js";import{t as ne}from"./heightUtils-BfaaFPbS.js";import{r as M,t as re}from"./tooltips-CEG5Qxvo.js";import{a as N,n as P,r as F,t as ie}from"./dialog-helpers-Rc_1Mfut.js";import{t as I}from"./emblems-generator-BGTky7-K.js";import{t as L}from"./state-CHxunpWe.js";import{P as R,b as ae,j as oe,y as se}from"./index-CLCZ-FTJ.js";import{t as ce}from"./highlighting-DOKNKfSn.js";import{i as le,n as ue,r as de,t as fe}from"./table-CiNbdu0R.js";function pe(e){e.x0=Math.round(e.x0),e.y0=Math.round(e.y0),e.x1=Math.round(e.x1),e.y1=Math.round(e.y1)}function me(e,t,n,r,i){for(var a=e.children,o,s=-1,c=a.length,l=e.value&&(r-t)/e.value;++s<c;)o=a[s],o.y0=n,o.y1=i,o.x0=t,o.x1=t+=o.value*l}function he(e,t,n,r,i){for(var a=e.children,o,s=-1,c=a.length,l=e.value&&(i-n)/e.value;++s<c;)o=a[s],o.x0=t,o.x1=r,o.y0=n,o.y1=n+=o.value*l}var ge=(1+Math.sqrt(5))/2;function _e(e,t,n,r,i,a){for(var o=[],s=t.children,c,l,u=0,d=0,f=s.length,p,m,h=t.value,g,_,v,y,b,x,S;u<f;){p=i-n,m=a-r;do g=s[d++].value;while(!g&&d<f);for(_=v=g,x=Math.max(m/p,p/m)/(h*e),S=g*g*x,b=Math.max(v/S,S/_);d<f;++d){if(g+=l=s[d].value,l<_&&(_=l),l>v&&(v=l),S=g*g*x,y=Math.max(v/S,S/_),y>b){g-=l;break}b=y}o.push(c={value:g,dice:p<m,children:s.slice(u,d)}),c.dice?me(c,n,r,i,h?r+=m*g/h:a):he(c,n,r,h?n+=p*g/h:i,a),h-=g,u=d}return o}var ve=(function e(t){function n(e,n,r,i,a){_e(t,e,n,r,i,a)}return n.ratio=function(t){return e((t=+t)>1?t:1)},n})(ge);function ye(){var e=ve,t=!1,n=1,r=1,i=[0],a=j,o=j,s=j,c=j,l=j;function u(e){return e.x0=e.y0=0,e.x1=n,e.y1=r,e.eachBefore(d),i=[0],t&&e.eachBefore(pe),e}function d(t){var n=i[t.depth],r=t.x0+n,u=t.y0+n,d=t.x1-n,f=t.y1-n;d<r&&(r=d=(r+d)/2),f<u&&(u=f=(u+f)/2),t.x0=r,t.y0=u,t.x1=d,t.y1=f,t.children&&(n=i[t.depth+1]=a(t)/2,r+=l(t)-n,u+=o(t)-n,d-=s(t)-n,f-=c(t)-n,d<r&&(r=d=(r+d)/2),f<u&&(u=f=(u+f)/2),e(t,r,u,d,f))}return u.round=function(e){return arguments.length?(t=!!e,u):t},u.size=function(e){return arguments.length?(n=+e[0],r=+e[1],u):[n,r]},u.tile=function(t){return arguments.length?(e=ee(t),u):e},u.padding=function(e){return arguments.length?u.paddingInner(e).paddingOuter(e):u.paddingInner()},u.paddingInner=function(e){return arguments.length?(a=typeof e==`function`?e:A(+e),u):a},u.paddingOuter=function(e){return arguments.length?u.paddingTop(e).paddingRight(e).paddingBottom(e).paddingLeft(e):u.paddingTop()},u.paddingTop=function(e){return arguments.length?(o=typeof e==`function`?e:A(+e),u):o},u.paddingRight=function(e){return arguments.length?(s=typeof e==`function`?e:A(+e),u):s},u.paddingBottom=function(e){return arguments.length?(c=typeof e==`function`?e:A(+e),u):c},u.paddingLeft=function(e){return arguments.length?(l=typeof e==`function`?e:A(+e),u):l},u}var z=`provincesEditor`,B={my:`right top`,at:`right-10 top+10`,of:`svg`,collision:`fit`},V,H=e=>y(e.area),U=e=>i(e.rural*populationRate+e.urban*populationRate*urbanization),W=[{key:`color`,width:`1.2em`,permanent:!0},{key:`name`,label:`Province`,width:`7em`,permanent:!0,sortBy:e=>e.name||``,sortType:`alpha`},{key:`emblem`,width:`1.4em`},{key:`form`,label:`Form`,width:`7em`,mobileHidden:!0,sortBy:e=>e.formName||``,sortType:`alpha`},{key:`capital`,label:`Capital`,width:`7em`,sortBy:e=>e.burg&&pack.burgs[e.burg]?.name||``,sortType:`alpha`},{key:`state`,label:`State`,width:`7em`,permanent:!0,sortBy:e=>pack.states[e.state]?.name||``,sortType:`alpha`},{key:`burgs`,label:`Burgs`,width:`5em`,mobileHidden:!0,sortBy:e=>e.burgs?.length||0},{key:`area`,label:`Area`,width:`7em`,mobileHidden:!0,defaultSort:`desc`,sortBy:H},{key:`population`,label:`Population`,width:`6em`,sortBy:U},{key:`actions`,width:`5.4em`,permanent:!0,align:`right`}],G=ue({getData:Y,onUpdate:Se});function K(){customization||(V=L.get(z,`filters`,()=>({stateId:1})),ie(`#provincesEditor, .stable`),D.show(`provinces`,`borders`),D.hide(`states`,`cultures`),be(),q(),$(`#provincesEditor`).dialog({title:`Provinces Editor`,resizable:!1,width:fitContent(),close:Ze,position:B}))}function be(){F(`provincesEditor`);let e=`<div id="provincesEditor" class="dialog stable editorDialog">
      <div id="provincesBodySection" class="table" data-type="absolute">
        ${de({dialogId:z,columns:W})}
      </div>
      <div id="provincesFooter" class="totalLine">
        <div data-tip="Provinces displayed" style="margin-left: 4px">
          Provinces:&nbsp;<span id="provincesFooterNumber">0</span>
        </div>
        <div data-tip="Total burgs number" style="margin-left: 12px" data-col="burgs">
          Burgs:&nbsp;<span id="provincesFooterBurgs">0</span>
        </div>
        <div data-tip="Average area" style="margin-left: 14px" data-col="area">
          Mean area:&nbsp;<span id="provincesFooterArea">0</span>
        </div>
        <div data-tip="Average population" style="margin-left: 14px" data-col="population">
          Mean population:&nbsp;<span id="provincesFooterPopulation">0</span>
        </div>
      </div>
      <div id="provincesBottom" class="editorToolbar">
        <button id="provincesEditorRefresh" data-tip="Refresh the Editor" class="icon-cw"></button>
        <button id="provincesEditStyle" data-tip="Edit provinces style in Style Editor" class="icon-adjust"></button>
        <button
          id="provincesRecolor"
          data-tip="Recolor listed provinces based on state color"
          class="icon-paint-roller"
        ></button>
        <button
          id="provincesPercentage"
          data-tip="Toggle percentage / absolute values views"
          class="icon-percent"
        ></button>
        <button id="provincesChart" data-tip="Show provinces chart" class="icon-chart-area"></button>
        <button
          id="provincesExport"
          data-tip="Save provinces-related data as a text file (.csv)"
          class="icon-download"
        ></button>
        <button id="provincesManually" data-tip="Manually re-assign provinces" class="icon-brush"></button>
        <button
          id="provincesRelease"
          data-tip="Release all provinces. It will make all provinces with burgs independent"
          class="icon-flag"
        ></button>
        <button
          id="provincesAdd"
          data-tip="Add a new province. Hold Shift to add multiple"
          class="icon-plus"
        ></button>
        <button id="provincesMerge" data-tip="Merge several provinces into one" class="icon-layer-group"></button>
        <button
          id="provincesRemoveAll"
          data-tip="Remove all provinces. States will remain as they are"
          class="icon-trash"
        ></button>
        <span>State: </span>
        <select id="provincesFilterState"></select>
      </div>
    </div>`;h(`dialogs`).insertAdjacentHTML(`beforeend`,e),se(z,G.reset),fe({dialogId:z,columns:W,onUpdate:()=>N(z,{width:`fit-content`,position:B})}),ce(`provincesEditor`,({cellId:e})=>pack.cells.province[e]),h(`provincesEditorRefresh`).addEventListener(`click`,q),h(`provincesEditStyle`).addEventListener(`click`,()=>editStyle(`provs`)),h(`provincesFilterState`).addEventListener(`change`,e=>{V.stateId=+e.target.value,L.set(z,`filters`,V),G.reset()}),h(`provincesPercentage`).addEventListener(`click`,Ve),h(`provincesChart`).addEventListener(`click`,He),h(`provincesExport`).addEventListener(`click`,Ye),h(`provincesRemoveAll`).addEventListener(`click`,Xe),h(`provincesManually`).addEventListener(`click`,We),h(`provincesRelease`).addEventListener(`click`,Ue),h(`provincesAdd`).addEventListener(`click`,Ke),h(`provincesMerge`).addEventListener(`click`,Qe),h(`provincesRecolor`).addEventListener(`click`,Je),h(`provincesBodySection`).addEventListener(`click`,e=>{if(customization)return;let t=e.target,n=t.classList,r=t.closest(`.states`);if(!r)return;let i=+r.dataset.id,a=pack.provinces[i].state;t.tagName===`FILL-BOX`?we(t):n.contains(`name`)?Me(i):n.contains(`coaIcon`)?R.EmblemsEditor.open(`province`,`provinceCOA${i}`,pack.provinces[i]):n.contains(`icon-star-empty`)?Te(i):n.contains(`icon-flag-empty`)?Ee(i):n.contains(`icon-dot-circled`)?R.BurgsOverview.open({stateId:a}):n.contains(`culturePopulation`)?ke(i):n.contains(`icon-target`)?k(p(`#provs`).select(`#province${i}`).node(),8):n.contains(`icon-pin`)?Ae(i,n):n.contains(`icon-trash-empty`)?je(i):(n.contains(`icon-lock`)||n.contains(`icon-lock-open`))&&nt(i,n)}),h(`provincesBodySection`).addEventListener(`change`,e=>{let t=e.target,n=t.classList,r=t.closest(`.states`);if(!r)return;let i=+r.dataset.id;n.contains(`cultureBase`)&&Be(i,r,t.value)})}function q(){J(),xe(),G.reset()}function J(){let{cells:e,provinces:t,burgs:n}=pack;t.forEach(e=>{e.i&&!e.removed&&(e.area=e.rural=e.urban=0,e.burgs=[],(e.burg&&!n[e.burg]||n[e.burg]?.removed)&&(e.burg=0))});for(let n of e.i){let r=e.province[n];r&&(t[r].area+=e.area[n],t[r].rural+=e.pop[n])}for(let r of n){if(!r.i||r.removed||r.flying)continue;let n=e.province[r.cell];n&&(t[n].urban+=r.population??0,t[n].burgs.push(r.i))}t.forEach(e=>{e.i&&!e.removed&&!e.burg&&e.burgs.length&&(e.burg=e.burgs[0])})}function xe(){let e=h(`provincesFilterState`);V.stateId!==-1&&!pack.states.some(e=>e.i===V.stateId&&!e.removed)&&(V.stateId=-1),e.options.length=0,e.options.add(new Option(`all`,`-1`,!1,V.stateId===-1)),pack.states.filter(e=>e.i&&!e.removed).sort((e,t)=>e.name>t.name?1:-1).forEach(t=>{e.options.add(new Option(t.name,String(t.i),!1,t.i===V.stateId))}),L.set(z,`filters`,V)}function Y(){let e=pack.provinces.filter(e=>e.i&&!e.removed),t=V.stateId===-1?e:e.filter(e=>e.state===V.stateId);return ae(z,t,W)}function Se(e){let t=h(`provincesBodySection`),n=` ${m()}`,r=e.all.reduce((e,t)=>({area:e.area+H(t),population:e.population+U(t),burgs:e.burgs+t.burgs.length}),{area:0,population:0,burgs:0}),a=t.dataset.type===`percentage`,o=e.rows.map(e=>{let t=H(e),o=e.rural*populationRate,s=e.urban*populationRate*urbanization,c=U(e),l=`Total population: ${f(c)}; Rural population: ${f(o)}; Urban population: ${f(s)}`,u=pack.states[e.state].name,d=e.burg&&e.burg!==pack.states[e.state].capital,m=p(`#deftemp`).select(`#fog #focusProvince${e.i}`).size();return w.trigger(`provinceCOA${e.i}`,e.coa),`<div class="states" data-id=${e.i}>
      <fill-box data-col="color" fill="${e.color}"></fill-box>
      <input data-col="name" data-tip="Province name. Click to change" class="name pointer" value="${e.name}" readonly />
      <svg data-col="emblem" data-tip="Click to show and edit province emblem" class="coaIcon pointer" viewBox="0 0 200 200"><use href="#provinceCOA${e.i}"></use></svg>
      <input data-col="form" data-tip="Province form name. Click to change" class="name pointer" value="${e.formName}" readonly />
      <div data-col="capital">
        <span data-tip="Province capital. Click to zoom into view" class="icon-star-empty pointer ${e.burg?``:`placeholder`}"></span>
        <select data-tip="Province capital. Click to select from burgs within the state. No capital means the province is governed from the state capital" class="cultureBase ${e.burgs.length?``:`placeholder`}">${e.burgs.length?Ce(e.burgs,e.burg):``}</select>
      </div>
      <input data-col="state" data-tip="Province owner" class="provinceOwner" value="${u}" disabled>
      <div data-col="burgs">
        <span data-tip="Click to overview province burgs" class="icon-dot-circled pointer"></span>
        <span data-tip="Burgs count" class="provinceBurgs">${a?`${i(r.burgs?e.burgs.length/r.burgs*100:0)}%`:e.burgs.length}</span>
      </div>
      <div data-col="area">
        <span data-tip="Province area" class="icon-map-o" style="padding-right: 4px"></span>
        <span data-tip="Province area" class="biomeArea">${a?`${i(r.area?t/r.area*100:0)}%`:f(t)+n}</span>
      </div>
      <div data-col="population">
        <span data-tip="${l}" class="icon-male"></span>
        <span data-tip="${l}" class="culturePopulation">${a?`${i(r.population?c/r.population*100:0)}%`:f(c)}</span>
      </div>
      <div data-col="actions"><span data-tip="Declare province independence (turn non-capital province with burgs into a new state)" class="icon-flag-empty ${d?``:`placeholder`}"></span><span data-tip="Locate the province" class="icon-target"></span><span data-tip="Toggle province focus" class="icon-pin ${m?``:` inactive`}"></span><span data-tip="Lock the province" class="icon-lock${e.lock?``:`-open`}"></span><span data-tip="Remove the province" class="icon-trash-empty"></span></div>
    </div>`}).join(``);t.querySelectorAll(`:scope > .states`).forEach(e=>{e.remove()}),t.insertAdjacentHTML(`beforeend`,o),h(`provincesFooterNumber`).innerHTML=String(e.all.length),h(`provincesFooterBurgs`).innerHTML=String(r.burgs),h(`provincesFooterArea`).innerHTML=e.all.length?f(r.area/e.all.length)+n:`0${n}`,h(`provincesFooterPopulation`).innerHTML=e.all.length?f(r.population/e.all.length):`0`,h(`provincesFooterArea`).dataset.area=String(r.area),h(`provincesFooterPopulation`).dataset.population=String(r.population),le(h(`provincesFooter`),e,G.goto),t.querySelectorAll(`div.states`).forEach(e=>{e.addEventListener(`mouseenter`,X),e.addEventListener(`mouseleave`,Z)}),t.dataset.type===`percentage`&&(t.dataset.type=`absolute`,Ve()),N(z,{width:`fit-content`,position:B})}function Ce(e,t){let n=``;return e.forEach(e=>{n+=`<option ${e===t?`selected`:``} value="${e}">${pack.burgs[e].name}</option>`}),n}function X(e){let t=+e.target.dataset.id,n=h(`provincesBodySection`).querySelector(`div[data-id='${t}']`);if(n&&n.classList.add(`active`),!D.isOn(`provinces`)||customization)return;let r=a().duration(2e3).ease(O);p(`#provs`).select(`#province${t}`).raise().transition(r).attr(`stroke-width`,2.5).attr(`stroke`,`#b52a2a`)}function Z(e){let t=e.target?.dataset?.id?+e.target.dataset.id:null;if(t){let e=h(`provincesBodySection`).querySelector(`div[data-id='${t}']`);e&&e.classList.remove(`active`)}if(!D.isOn(`provinces`)||!t){p(`#debug`).selectAll(`.highlight`).remove();return}p(`#provs`).select(`#province${t}`).transition().attr(`stroke-width`,null).attr(`stroke`,null),p(`#debug`).selectAll(`.highlight`).remove()}function we(e){let t=e.getAttribute(`fill`),n=+e.closest(`.states`).dataset.id;R.ColorPicker.open(t,t=>{e.fill=t,pack.provinces[n].color=t,D.draw(`provinces`)})}function Te(e){let t=pack.provinces[e].burg,{x:n,y:r}=pack.burgs[t];zoomTo(n,r,8,2e3)}function Ee(e){P({title:`Declare independence`,message:`Are you sure you want to declare province independence? <br>It will turn province into a new state`,confirm:`Declare`,onConfirm:()=>{let t=De(e);if(!t)return;let[n,r]=t;Oe([n],[r])}})}function De(e){let{states:n,provinces:r,cells:i,burgs:a}=pack,o=r[e],{name:s,burg:c,burgs:l}=o;if(l.some(e=>a[e].capital)){M(`Cannot declare independence of a province having capital burg. Please change capital first`,!1,`error`);return}if(!c){M(`Cannot declare independence of a province without burg`,!1,`error`);return}let u=o.state,f=n.length,p=a[c];p.capital=1,Burgs.changeGroup(p),D.draw(`burgIcons`,`labels`),o.burgs.forEach(e=>{a[e].state=f});let{cell:m,culture:h}=a[c],g=d(),_=o.coa,v=t(`provinceCOA${e}`);v&&(v.id=`stateCOA${f}`),C(`province`,e),i.i.filter(t=>i.province[t]===e).forEach(e=>{i.province[e]=0,i.state[e]=f});let y=n.map(e=>{if(!e.i||e.removed)return`x`;let t=n[u].diplomacy[e.i];return e.i===u?t=`Enemy`:t===`Ally`||t===`Friendly`?t=`Suspicion`:t===`Suspicion`?t=`Neutral`:t===`Enemy`||t===`Rival`?t=`Friendly`:t===`Vassal`?t=`Suspicion`:t===`Suzerain`&&(t=`Enemy`),e.diplomacy.push(t),t});return y.push(`x`),n[0].diplomacy.push([`Independance declaration`,`${s} declared its independance from ${n[u].name}`]),n.push({i:f,name:s,diplomacy:y,provinces:[],color:g,expansionism:.5,capital:c,type:`Generic`,center:m,culture:h,military:[],alert:1,coa:_}),n[u].provinces=n[u].provinces.filter(t=>t!==e),r[e]={i:e,removed:!0},[u,f]}function Oe(e,t){let n=l([...e,...t]);D.hide(`provinces`),D.show(`states`,`borders`),States.getPoles(),States.findNeighbors(),States.collectStatistics(),States.defineStateForms(t),D.draw(`labels`),x(n.map(e=>[`state`,e])),D.hide(`provinces`),D.show(`states`,`borders`),E(),ie(),R.StatesEditor.open()}function ke(e){let t=pack.provinces[e],n=pack.cells.i.filter(t=>pack.cells.province[t]===e);if(!n.length){M(`Province does not have any cells, cannot change population`,!1,`error`);return}let r=i(t.rural*populationRate),a=i(t.urban*populationRate*urbanization),o=r+a,s=e=>Number(e).toLocaleString();alertMessage.innerHTML=` Rural: <input type="number" min="0" step="1" id="ruralPop" value=${r} style="width:6em" /> Urban:
    <input type="number" min="0" step="1" id="urbanPop" value=${a} style="width:6em" ${t.burgs.length?``:`disabled`} />
    <p>Total population: ${s(o)} ⇒ <span id="totalPop">${s(o)}</span> (<span id="totalPopPerc">100</span>%)</p>`;let c=h(`ruralPop`),l=h(`urbanPop`),u=()=>{let e=c.valueAsNumber+l.valueAsNumber;Number.isNaN(e)||(h(`totalPop`).innerHTML=s(e),h(`totalPopPerc`).innerHTML=String(i(e/o*100)))};c.oninput=()=>u(),l.oninput=()=>u(),$(`#alert`).dialog({resizable:!1,title:`Change province population`,width:`24em`,buttons:{Apply:function(){d(),$(this).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}},position:{my:`center`,at:`center`,of:`svg`}});function d(){let e=+c.value/r;if(Number.isFinite(e)&&e!==1&&n.forEach(t=>{pack.cells.pop[t]*=e}),!Number.isFinite(e)&&+c.value>0){let e=+c.value/populationRate,t=i(e/n.length);n.forEach(e=>{pack.cells.pop[e]=t})}let o=+l.value/a;if(Number.isFinite(o)&&o!==1&&t.burgs.forEach(e=>{pack.burgs[e].population=i((pack.burgs[e].population??0)*o,4)}),!Number.isFinite(o)&&+l.value>0){let e=+l.value/populationRate/urbanization,n=i(e/t.burgs.length,4);t.burgs.forEach(e=>{pack.burgs[e].population=n})}D.draw(`population`),q()}}function Ae(e,t){let n=p(`#provs`).select(`#province${e}`).attr(`d`),r=`focusProvince${e}`;t.contains(`inactive`)?T(r,n):E(r),t.toggle(`inactive`)}function je(e){alertMessage.innerHTML=`Are you sure you want to remove the province? <br />This action cannot be reverted`,$(`#alert`).dialog({resizable:!1,title:`Remove province`,buttons:{Remove:function(){pack.cells.province.forEach((t,n)=>{t===e&&(pack.cells.province[n]=0)});let t=pack.provinces[e].state,n=pack.states[t];n.provinces.includes(e)&&n.provinces.splice(n.provinces.indexOf(e),1),E(`focusProvince${e}`),C(`province`,e),pack.provinces[e]={i:e,removed:!0};let r=p(`#provs`).select(`#provincesBody`);r.select(`#province${e}`).remove(),r.select(`#province-gap${e}`).remove(),D.draw(`borders`),D.draw(`labels`),q(),$(this).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}}})}function Me(e){Ne();let t=pack.provinces[e];h(`provinceNameEditor`).dataset.province=String(e),h(`provinceNameEditorShort`).value=t.name,r(h(`provinceNameEditorSelectForm`),t.formName),h(`provinceNameEditorFull`).value=t.fullName;let n=pack.cells.culture[t.center];h(`provinceCultureDisplay`).innerText=pack.cultures[n].name,$(`#provinceNameEditor`).dialog({resizable:!1,title:`Change province name`,buttons:{Apply:function(){ze(t),$(this).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}},position:{my:`center`,at:`center`,of:`svg`},close:Pe})}function Ne(){F(`provinceNameEditor`),h(`dialogs`).insertAdjacentHTML(`beforeend`,`<div id="provinceNameEditor" class="dialog" data-province="0">
      <div>
        <div data-tip="Province short name" class="label">Short name:</div>
        <input
          id="provinceNameEditorShort"
          data-tip="Type to change the short name"
          autocorrect="off"
          spellcheck="false"
          style="width: 11em"
        />
        <span id="provinceNameEditorShortSpeak" data-tip="Speak the name. You can change voice and language in options" class="speaker">🔊</span>
        <span
          id="provinceNameEditorShortCulture"
          data-tip="Generate culture-specific name for the province"
          class="icon-book pointer"
        ></span>
        <span id="provinceNameEditorShortRandom" data-tip="Generate random name" class="icon-globe pointer"></span>
      </div>
      <div data-tip="Select form name">
        <div data-tip="Province form name" class="label">Form name:</div>
        <select id="provinceNameEditorSelectForm" style="display: inline-block; width: 11em; height: 1.645em">
          <option value="">blank</option>
          <option value="Area">Area</option>
          <option value="Autonomy">Autonomy</option>
          <option value="Barony">Barony</option>
          <option value="Canton">Canton</option>
          <option value="Captaincy">Captaincy</option>
          <option value="Chiefdom">Chiefdom</option>
          <option value="Clan">Clan</option>
          <option value="Colony">Colony</option>
          <option value="Council">Council</option>
          <option value="County">County</option>
          <option value="Deanery">Deanery</option>
          <option value="Department">Department</option>
          <option value="Dependency">Dependency</option>
          <option value="Diaconate">Diaconate</option>
          <option value="District">District</option>
          <option value="Earldom">Earldom</option>
          <option value="Governorate">Governorate</option>
          <option value="Island">Island</option>
          <option value="Islands">Islands</option>
          <option value="Land">Land</option>
          <option value="Landgrave">Landgrave</option>
          <option value="Mandate">Mandate</option>
          <option value="Margrave">Margrave</option>
          <option value="Municipality">Municipality</option>
          <option value="Occupation zone">Occupation zone</option>
          <option value="Parish">Parish</option>
          <option value="Prefecture">Prefecture</option>
          <option value="Province">Province</option>
          <option value="Region">Region</option>
          <option value="Republic">Republic</option>
          <option value="Reservation">Reservation</option>
          <option value="Seneschalty">Seneschalty</option>
          <option value="Shire">Shire</option>
          <option value="State">State</option>
          <option value="Territory">Territory</option>
          <option value="Tribe">Tribe</option>
        </select>
        <input
          id="provinceNameEditorCustomForm"
          placeholder="type form name"
          data-tip="Create custom province form name"
          style="display: none; width: 11em"
        />
        <span
          id="provinceNameEditorAddForm"
          data-tip="Click to add custom province form name to the list"
          class="icon-plus pointer"
        ></span>
      </div>
      <div>
        <div data-tip="Province full name" class="label">Full name:</div>
        <input
          id="provinceNameEditorFull"
          data-tip="Type to change the full name"
          autocorrect="off"
          spellcheck="false"
          style="width: 11em"
        />
        <span id="provinceNameEditorFullSpeak" data-tip="Speak the name. You can change voice and language in options" class="speaker">🔊</span>
        <span
          id="provinceNameEditorFullRegenerate"
          data-tip="Click to re-generate full name"
          class="icon-arrows-cw pointer"
        ></span>
      </div>
      <div
        id="provinceCultureName"
        data-tip="Dominant culture in the province. This defines culture-based naming. Can be changed via the Cultures Editor"
        style="margin-top: 0.2em"
      >
        Dominant culture:&nbsp;<span id="provinceCultureDisplay"></span>
      </div>
    </div>`),h(`provinceNameEditorShortCulture`).addEventListener(`click`,Fe),h(`provinceNameEditorShortRandom`).addEventListener(`click`,Ie),h(`provinceNameEditorShortSpeak`).addEventListener(`click`,()=>u(h(`provinceNameEditorShort`).value)),h(`provinceNameEditorAddForm`).addEventListener(`click`,Le),h(`provinceNameEditorFullRegenerate`).addEventListener(`click`,Re),h(`provinceNameEditorFullSpeak`).addEventListener(`click`,()=>u(h(`provinceNameEditorFull`).value))}function Pe(){$(`#provinceNameEditor`).dialog(`destroy`),h(`provinceNameEditor`).remove()}function Fe(){let e=+h(`provinceNameEditor`).dataset.province,t=pack.cells.culture[pack.provinces[e].center],n=Names.getState(Names.getCultureShort(t),t);h(`provinceNameEditorShort`).value=n}function Ie(){let e=b(Names.nameBases.length-1),t=Names.getState(Names.getBase(e),void 0,e);h(`provinceNameEditorShort`).value=t}function Le(){let e=h(`provinceNameEditorCustomForm`),t=h(`provinceNameEditorSelectForm`),n=e.value,i=e.style.display===`inline-block`;e.style.display=i?`none`:`inline-block`,t.style.display=i?`inline-block`:`none`,i&&r(t,n)}function Re(){let e=h(`provinceNameEditorShort`).value,t=h(`provinceNameEditorSelectForm`).value,n=()=>t?!e&&t?`The ${t}`:`${e} ${t}`:e;h(`provinceNameEditorFull`).value=n()}function ze(e){e.name=h(`provinceNameEditorShort`).value,e.formName=h(`provinceNameEditorSelectForm`).value,e.fullName=h(`provinceNameEditorFull`).value,D.draw(`provinces`),D.draw(`labels`),q()}function Be(e,t,n){t.dataset.capital=pack.burgs[+n].name,pack.provinces[e].center=pack.burgs[+n].cell,pack.provinces[e].burg=+n}function Ve(){let e=h(`provincesBodySection`);e.dataset.type=e.dataset.type===`absolute`?`percentage`:`absolute`,G.refresh()}function He(){let t=t=>!t.i||t.removed||t.color[0]!==`#`?`#66666d`:g(e(t.color).darker().formatHex()),n=pack.states.map(e=>({id:e.i,state:e.i?0:null,color:t(e)})),r=pack.provinces.filter(e=>e.i&&!e.removed).map(e=>({id:e.i+n.length-1,i:e.i,state:e.state,color:e.color,name:e.name,fullName:e.fullName,area:e.area,urban:e.urban,rural:e.rural})),a=[...n,...r],o=te().parentId(e=>e.state)(a).sum(e=>e.area),s=+h(`uiSize`).value,c=300+300*s,l=90+90*s,u={top:10,right:10,bottom:0,left:10},d=c-u.left-u.right,_=l-u.top-u.bottom,v=ye().size([d,_]).padding(2);alertMessage.innerHTML=`<select id="provincesTreeType" style="display:block; margin-left:13px; font-size:11px">
    <option value="area" selected>Area</option>
    <option value="population">Total population</option>
    <option value="rural">Rural population</option>
    <option value="urban">Urban population</option>
  </select>`,alertMessage.innerHTML+=`<div id='provinceInfo' class='chartInfo'>&#8205;</div>`;let b=p(`#alertMessage`).insert(`svg`,`#provinceInfo`).attr(`id`,`provincesTree`).attr(`width`,c).attr(`height`,l).attr(`font-size`,`10px`).append(`g`).attr(`transform`,`translate(10, 0)`);h(`provincesTreeType`).addEventListener(`change`,T),v(o);let x=b.selectAll(`g`).data(o.leaves()).enter().append(`g`).attr(`data-id`,e=>e.data.i).on(`mouseenter`,(e,t)=>S(e,t)).on(`mouseleave`,e=>C(e));function S(e,t){p(e.currentTarget).select(`rect`).classed(`selected`,!0);let n=t.data.fullName,r=pack.states[t.data.state].fullName,a=`${y(t.data.area)} ${m()}`,o=i(t.data.rural*populationRate),s=i(t.data.urban*populationRate*urbanization),c=h(`provincesTreeType`).value,l=c===`area`?`Area: ${a}`:c===`rural`?`Rural population: ${f(o)}`:c===`urban`?`Urban population: ${f(s)}`:`Population: ${f(o+s)}`;h(`provinceInfo`).innerHTML=`${n}. ${r}. ${l}`,X(e)}function C(e){Z(e),document.getElementById(`provinceInfo`)&&(h(`provinceInfo`).innerHTML=`&#8205;`,p(e.currentTarget).select(`rect`).classed(`selected`,!1))}x.append(`rect`).attr(`stroke`,e=>e.parent.data.color).attr(`stroke-width`,1).attr(`fill`,e=>e.data.color).attr(`x`,e=>e.x0).attr(`y`,e=>e.y0).attr(`width`,e=>e.x1-e.x0).attr(`height`,e=>e.y1-e.y0),x.append(`text`).attr(`text-rendering`,`optimizeSpeed`).attr(`dx`,`.2em`).attr(`dy`,`1em`).attr(`x`,e=>e.x0).attr(`y`,e=>e.y0);function w(){x.select(`text`).each(function(e){this.innerHTML=e.data.name;let t=this.getBBox();t.y+t.height>e.y1+1&&(this.innerHTML=``);for(let n=0;n<15&&t.width>0&&t.x+t.width>e.x1;n++){if(this.innerHTML.length<3){this.innerHTML=``;break}this.innerHTML=`${this.innerHTML.slice(0,-2)}…`,t=this.getBBox()}})}function T(){let e=this.value===`area`?e=>e.area:this.value===`rural`?e=>e.rural:this.value===`urban`?e=>e.urban:e=>e.rural+e.urban;o.sum(e),x.data(v(o).leaves()),x.select(`rect`).transition().duration(1500).attr(`x`,e=>e.x0).attr(`y`,e=>e.y0).attr(`width`,e=>e.x1-e.x0).attr(`height`,e=>e.y1-e.y0),x.select(`text`).transition().duration(1500).attr(`x`,e=>e.x0).attr(`y`,e=>e.y0),setTimeout(w,2e3)}$(`#alert`).dialog({title:`Provinces chart`,width:fitContent(),position:{my:`left bottom`,at:`left+10 bottom-10`,of:`svg`},buttons:{},close:()=>{alertMessage.innerHTML=``}}),w()}function Ue(){P({title:`Release provinces`,message:`Are you sure you want to release all provinces?
        </br>It will turn all separable provinces into independent states.
        </br>Capital province and provinces without any burgs will state as they are`,confirm:`Release`,onConfirm:()=>{let e=[],t=[];Y().forEach(n=>{if(!n.burg||n.burg===pack.states[n.state].capital||n.burgs.some(e=>pack.burgs[e].capital))return;let r=De(n.i);r&&(e.push(r[0]),t.push(r[1]))}),Oe(l(e),t)}})}function We(){D.show(`provinces`,`borders`),R.PaintEditor.open({title:`Paint Provinces`,parentDialogId:z,onClose:K,items:Y().map(e=>({id:e.i,name:e.name,color:e.color||`#ffffff`})),getValue:e=>pack.cells.province[e],filterCell:(e,t,n)=>!ne(e,pack)||!pack.cells.state[e]||pack.cells.state[e]!==pack.provinces[n].state?!1:!t||e!==pack.provinces[t].center||(M(`Province center cannot be assigned to a different region. Please remove the province first`,!1,`error`),!1),dontOverrideControl:!0,onApply:Ge})}function Ge(e){for(let[t,n]of e)pack.cells.province[t]=n;Provinces.getPoles(),D.draw(`borders`,`provinces`),D.draw(`labels`),document.getElementById(z)&&q()}function Ke(){if(this.classList.contains(`pressed`)){Q();return}customization=12,this.classList.add(`pressed`),M(`Click on the map to place a new province center`,!0),p(`#viewbox`).style(`cursor`,`crosshair`).on(`click`,qe),h(`provincesBodySection`).querySelectorAll(`div > input, select, span, svg`).forEach(e=>{e.style.pointerEvents=`none`})}function qe(t){let{cells:n,provinces:r}=pack,i=s(t,this),a=Pack.findCell(i[0],i[1]);if(n.h[a]<20){M(`You cannot place province into the water. Please click on a land cell`,!1,`error`);return}let c=n.province[a];if(c&&r[c].center===a){M(`The cell is already a center of a different province. Select other cell`,!1,`error`);return}let l=n.state[a];if(!l){M(`You cannot create a province in neutral lands. Please assign this land to a state first`,!1,`error`);return}t.shiftKey===!1&&Q();let u=r.length;pack.states[l].provinces.push(u);let f=n.burg[a],p=n.culture[a],m=f?pack.burgs[f].name:Names.getState(Names.getCultureShort(p),p),v=c?r[c].formName:`Province`,y=`${m} ${v}`,b=pack.states[l].color,x=d(),C=b[0]===`#`?g(e(o(b,x)(.2)).formatHex()):x,w=f?.8:.4,T=f?pack.burgs[f].coa:pack.states[l].coa,E=f?pack.burgs[f].port:void 0,O=Burgs.getType(a,E),k=I.generate(T,w,+_(.1),O);k.shield=I.getShield(p,l),r.push({i:u,state:l,center:a,burg:f,name:m,formName:v,fullName:y,color:C,coa:k}),S(`province`,u),n.province[a]=u,n.c[a].forEach(e=>{n.h[e]<20||n.state[e]!==l||r.find(t=>!t.removed&&t.center===e)||(n.province[e]=u)}),D.draw(`borders`,`provinces`),D.draw(`labels`),J(),V.stateId=l,L.set(z,`filters`,V),h(`provincesFilterState`).value=String(V.stateId),G.reset()}function Q(){customization=0,oe(),re(),h(`provincesBodySection`).querySelectorAll(`div > input, select, span, svg`).forEach(e=>{e.style.removeProperty(`pointer-events`)});let e=h(`provincesAdd`);e.classList.contains(`pressed`)&&e.classList.remove(`pressed`)}function Je(){let t=V.stateId;pack.provinces.forEach(n=>{if(!n||n.removed||t!==-1&&n.state!==t)return;let r=pack.states[n.state].color,i=d();n.color=r[0]===`#`?g(e(o(r,i)(.2)).formatHex()):i}),D.show(`provinces`)}function Ye(){let e=`Id,Province,Full Name,Form,State,Color,Capital,Area ${areaUnit.value===`square`?`${distanceUnitInput.value}2`:areaUnit.value},Total Population,Rural Population,Urban Population,Burgs\n`;for(let t of Y()){let n=t.burg?pack.burgs[t.burg].name:``;e+=`${t.i},${t.name},${t.fullName},${t.formName},${pack.states[t.state].name},${t.color},${n},${H(t)},${U(t)},${Math.round(t.rural*populationRate)},${Math.round(t.urban*populationRate*urbanization)},${t.burgs.length}\n`}let t=`${n(`Provinces`)}.csv`;c(e,t)}function Xe(){alertMessage.innerHTML=`Are you sure you want to remove all provinces? <br />This action cannot be reverted`,$(`#alert`).dialog({resizable:!1,title:`Remove all provinces`,buttons:{Remove:function(){$(this).dialog(`close`),pack.provinces.forEach(e=>{e.i&&C(`province`,e.i)}),pack.provinces=[0],pack.cells.province=new Uint16Array(pack.cells.i.length),pack.states.forEach(e=>{e.provinces=[]}),E(),D.draw(`borders`),p(`#provs`).select(`#provincesBody`).remove(),D.hide(`provinces`),D.draw(`labels`),G.reset()},Cancel:function(){$(this).dialog(`close`)}}})}function Ze(){customization===12&&Q(),$(`#provincesEditor`).dialog(`destroy`),h(`provincesEditor`).remove()}function Qe(){let e=V.stateId;if(e===-1){alertMessage.innerHTML=`Please select a specific state from the filter to merge provinces within that state.`,$(`#alert`).dialog({title:`Merge Provinces`,buttons:{OK:function(){$(this).dialog(`close`)}}});return}let t=pack.provinces.filter(t=>t.i&&!t.removed&&t.state===e);if(t.length<2){alertMessage.innerHTML=`Not enough provinces in the selected state to merge.`,$(`#alert`).dialog({title:`Merge Provinces`,buttons:{OK:function(){$(this).dialog(`close`)}}});return}let n=e=>`<svg class="coaIcon" viewBox="0 0 200 200"><use href="#provinceCOA${e}"></use></svg>`,r=t.map(e=>`
    <div data-id="${e.i}" data-tip="${e.fullName||e.name}" style="cursor:default">
      <input type="radio" name="rulingProvince" value="${e.i}" />
      <input id="selectProvince${e.i}" class="checkbox" type="checkbox" name="provincesToMerge" value="${e.i}" />
      <label for="selectProvince${e.i}" class="checkbox-label"><fill-box fill="${e.color}" disabled></fill-box>${n(e.i)}${e.name}</label>
    </div>
  `).join(``);alertMessage.innerHTML=`
    <form id='mergeProvincesForm' style="overflow: hidden; display: flex; flex-direction: column; gap: 1em;">
      <p style="margin:0">
        Check the <b>checkbox</b> next to each province you want to merge.
        Use the <b>radio button</b> to pick the <em>primary province</em> that will absorb all others.
        Hover over a row to highlight the province on the map.
      </p>
      <main style='display: grid; grid-template-columns: 1fr 1fr; gap: .3em;'>
        ${r}
      </main>
    </form>
  `,h(`mergeProvincesForm`).querySelectorAll(`div[data-id]`).forEach(e=>{e.addEventListener(`mouseenter`,$e),e.addEventListener(`mouseleave`,Z)}),$(`#alert`).dialog({width:600,title:`Merge provinces`,close:Z,buttons:{Merge:function(){let e=new FormData(h(`mergeProvincesForm`)),t=Number(e.get(`rulingProvince`));if(!t){M(`Please select a province to merge into`,!1,`error`);return}let r=e.getAll(`provincesToMerge`).map(Number).filter(e=>e!==t);if(!r.length){M(`Please select several provinces to merge`,!1,`error`);return}P({title:`Merge provinces`,message:`
            <p>The following provinces will be <strong>removed</strong>: ${r.map(e=>`${n(e)}${pack.provinces[e].name}`).join(`, `)}.</p>
            <p>Removed provinces data (burgs and cells) will be assigned to ${n(t)}${pack.provinces[t].name}.</p>
            <p>Are you sure you want to merge provinces? This action cannot be reverted.</p>`,confirm:`Merge`,onConfirm:()=>{tt(r,t),$(this).dialog(`close`)}})},Cancel:function(){$(this).dialog(`close`)}}})}function $e(e){if(!D.isOn(`provinces`))return;let t=+e.currentTarget.dataset.id;if(!t)return;let n=p(`#provs`).select(`#province${t}`).attr(`d`);if(!n)return;Z(e);let r=p(`#debug`).append(`path`).attr(`class`,`highlight`).attr(`d`,n).attr(`fill`,`none`).attr(`stroke`,`#e05252`).attr(`stroke-width`,1).attr(`opacity`,1).attr(`filter`,`url(#blur1)`),i=r.node().getTotalLength(),a=(i+5e3)/2,o=v(`0, ${i}`,`${i}, ${i}`);r.transition().duration(a).attrTween(`stroke-dasharray`,()=>o)}function et(e){E(`focusProvince${e}`),C(`province`,e)}function tt(e,t){let n=pack.provinces[t],r=new Map;e.forEach(e=>{if(e===t)return;let i=pack.provinces[e];i.burgs.forEach(e=>{pack.burgs[e].province=t,n.burgs.includes(e)||n.burgs.push(e)}),!n.burg&&i.burg&&(n.burg=i.burg),r.set(e,t),et(e),pack.provinces[e]={i:e,removed:!0}}),pack.cells.province.forEach((e,t)=>{let n=r.get(e);n!==void 0&&(pack.cells.province[t]=n)});let i=pack.states[n.state];i.provinces=i.provinces.filter(e=>!pack.provinces[e].removed),J(),Provinces.getPoles(),D.draw(`provinces`,`borders`),D.draw(`labels`),E(),p(`#debug`).selectAll(`.highlight`).remove(),q()}function nt(e,t){let n=pack.provinces[e];n.lock=!n.lock,t.toggle(`icon-lock-open`),t.toggle(`icon-lock`)}var rt={open:K};export{rt as ProvincesEditor};