import{A as e,Bt as t,Cn as n,D as r,Gt as i,M as a,S as o,T as s,Tt as c,Wt as l,X as u,Zt as d,d as f,dt as p,i as m,it as h,k as g,r as _,un as v,w as y,yt as b}from"./utils-D3KEhgY0.js";import{t as x}from"./sin-DXK16t1M.js";import{r as S,t as C}from"./stratify-CGdiYggi.js";import{n as w,t as T}from"./constant-CUk6ox2a.js";import{r as E,t as D}from"./tooltips-D1wvMKni.js";import{t as ee}from"./emblems-generator-BtgqM7bc.js";import{C as te,Dt as ne,Et as re,H as O,J as k,K as A,M as j,Mt as ie,Ot as M,Q as N,U as P,W as F,X as ae,nt as I,q as oe,tt as se,w as ce}from"./index-D3JPylQY.js";import{t as le}from"./highlighting-Dl5muJeM.js";import{i as ue,n as de,r as fe,t as pe}from"./table-D__vupD5.js";function me(e){e.x0=Math.round(e.x0),e.y0=Math.round(e.y0),e.x1=Math.round(e.x1),e.y1=Math.round(e.y1)}function he(e,t,n,r,i){for(var a=e.children,o,s=-1,c=a.length,l=e.value&&(r-t)/e.value;++s<c;)o=a[s],o.y0=n,o.y1=i,o.x0=t,o.x1=t+=o.value*l}function ge(e,t,n,r,i){for(var a=e.children,o,s=-1,c=a.length,l=e.value&&(i-n)/e.value;++s<c;)o=a[s],o.x0=t,o.x1=r,o.y0=n,o.y1=n+=o.value*l}var _e=(1+Math.sqrt(5))/2;function ve(e,t,n,r,i,a){for(var o=[],s=t.children,c,l,u=0,d=0,f=s.length,p,m,h=t.value,g,_,v,y,b,x,S;u<f;){p=i-n,m=a-r;do g=s[d++].value;while(!g&&d<f);for(_=v=g,x=Math.max(m/p,p/m)/(h*e),S=g*g*x,b=Math.max(v/S,S/_);d<f;++d){if(g+=l=s[d].value,l<_&&(_=l),l>v&&(v=l),S=g*g*x,y=Math.max(v/S,S/_),y>b){g-=l;break}b=y}o.push(c={value:g,dice:p<m,children:s.slice(u,d)}),c.dice?he(c,n,r,i,h?r+=m*g/h:a):ge(c,n,r,h?n+=p*g/h:i,a),h-=g,u=d}return o}var ye=(function e(t){function n(e,n,r,i,a){ve(t,e,n,r,i,a)}return n.ratio=function(t){return e((t=+t)>1?t:1)},n})(_e);function be(){var e=ye,t=!1,n=1,r=1,i=[0],a=T,o=T,s=T,c=T,l=T;function u(e){return e.x0=e.y0=0,e.x1=n,e.y1=r,e.eachBefore(d),i=[0],t&&e.eachBefore(me),e}function d(t){var n=i[t.depth],r=t.x0+n,u=t.y0+n,d=t.x1-n,f=t.y1-n;d<r&&(r=d=(r+d)/2),f<u&&(u=f=(u+f)/2),t.x0=r,t.y0=u,t.x1=d,t.y1=f,t.children&&(n=i[t.depth+1]=a(t)/2,r+=l(t)-n,u+=o(t)-n,d-=s(t)-n,f-=c(t)-n,d<r&&(r=d=(r+d)/2),f<u&&(u=f=(u+f)/2),e(t,r,u,d,f))}return u.round=function(e){return arguments.length?(t=!!e,u):t},u.size=function(e){return arguments.length?(n=+e[0],r=+e[1],u):[n,r]},u.tile=function(t){return arguments.length?(e=S(t),u):e},u.padding=function(e){return arguments.length?u.paddingInner(e).paddingOuter(e):u.paddingInner()},u.paddingInner=function(e){return arguments.length?(a=typeof e==`function`?e:w(+e),u):a},u.paddingOuter=function(e){return arguments.length?u.paddingTop(e).paddingRight(e).paddingBottom(e).paddingLeft(e):u.paddingTop()},u.paddingTop=function(e){return arguments.length?(o=typeof e==`function`?e:w(+e),u):o},u.paddingRight=function(e){return arguments.length?(s=typeof e==`function`?e:w(+e),u):s},u.paddingBottom=function(e){return arguments.length?(c=typeof e==`function`?e:w(+e),u):c},u.paddingLeft=function(e){return arguments.length?(l=typeof e==`function`?e:w(+e),u):l},u}var L=`provincesEditor`,R={my:`right top`,at:`right-10 top+10`,of:`svg`,collision:`fit`},z,B=e=>_(e.area),V=e=>c(e.rural*populationRate+e.urban*populationRate*urbanization),H=[{key:`color`,width:`1.2em`,permanent:!0},{key:`name`,label:`Province`,width:`7em`,permanent:!0,sortBy:e=>e.name||``,sortType:`alpha`},{key:`emblem`,width:`1.4em`},{key:`form`,label:`Form`,width:`7em`,mobileHidden:!0,sortBy:e=>e.formName||``,sortType:`alpha`},{key:`capital`,label:`Capital`,width:`7em`,sortBy:e=>e.burg&&pack.burgs[e.burg]?.name||``,sortType:`alpha`},{key:`state`,label:`State`,width:`7em`,permanent:!0,sortBy:e=>pack.states[e.state]?.name||``,sortType:`alpha`},{key:`burgs`,label:`Burgs`,width:`5em`,mobileHidden:!0,sortBy:e=>e.burgs?.length||0},{key:`area`,label:`Area`,width:`7em`,mobileHidden:!0,defaultSort:`desc`,sortBy:B},{key:`population`,label:`Population`,width:`6em`,sortBy:V},{key:`actions`,width:`5.4em`,permanent:!0,align:`right`}],U=de({getData:q,onUpdate:Ce});function W(){customization||(z=j.get(L,`filters`,()=>({stateId:1})),O(`#provincesEditor, .stable`),N.show(`provinces`,`borders`),N.hide(`states`,`cultures`),xe(),G(),$(`#provincesEditor`).dialog({title:`Provinces Editor`,resizable:!1,width:`fit-content`,close:Xe,position:R}))}function xe(){F(`provincesEditor`);let e=`<div id="provincesEditor" class="dialog stable editorDialog">
      <div id="provincesBodySection" class="table" data-type="absolute">
        ${fe({dialogId:L,columns:H})}
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
    </div>`;g(`dialogs`).insertAdjacentHTML(`beforeend`,e),te(L,U.reset),pe({dialogId:L,columns:H,onUpdate:()=>A(L,{width:`fit-content`,position:R})}),le(`provincesEditor`,({cellId:e})=>pack.cells.province[e]),g(`provincesEditorRefresh`).addEventListener(`click`,G),g(`provincesEditStyle`).addEventListener(`click`,()=>editStyle(`provs`)),g(`provincesFilterState`).addEventListener(`change`,e=>{z.stateId=+e.target.value,j.set(L,`filters`,z),U.reset()}),g(`provincesPercentage`).addEventListener(`click`,Be),g(`provincesChart`).addEventListener(`click`,Ve),g(`provincesExport`).addEventListener(`click`,Je),g(`provincesRemoveAll`).addEventListener(`click`,Ye),g(`provincesManually`).addEventListener(`click`,Ue),g(`provincesRelease`).addEventListener(`click`,He),g(`provincesAdd`).addEventListener(`click`,Ge),g(`provincesMerge`).addEventListener(`click`,Ze),g(`provincesRecolor`).addEventListener(`click`,qe),g(`provincesBodySection`).addEventListener(`click`,e=>{if(customization)return;let t=e.target,n=t.classList,r=t.closest(`.states`);if(!r)return;let i=+r.dataset.id,a=pack.provinces[i].state;t.tagName===`FILL-BOX`?Te(t):n.contains(`name`)?je(i):n.contains(`coaIcon`)?k.EmblemsEditor.open(`province`,`provinceCOA${i}`,pack.provinces[i]):n.contains(`icon-star-empty`)?Ee(i):n.contains(`icon-flag-empty`)?De(i):n.contains(`icon-dot-circled`)?k.BurgsOverview.open({stateId:a}):n.contains(`culturePopulation`)?Oe(i):n.contains(`icon-target`)?ae(v(`#provs`).select(`#province${i}`).node(),8):n.contains(`icon-pin`)?ke(i,n):n.contains(`icon-trash-empty`)?Ae(i):(n.contains(`icon-lock`)||n.contains(`icon-lock-open`))&&tt(i,n)}),g(`provincesBodySection`).addEventListener(`change`,e=>{let t=e.target,n=t.classList,r=t.closest(`.states`);if(!r)return;let i=+r.dataset.id;n.contains(`cultureBase`)&&ze(i,r,t.value)})}function G(){K(),Se(),U.reset()}function K(){let{cells:e,provinces:t,burgs:n}=pack;t.forEach(e=>{!e.i||e.removed||(e.area=e.rural=e.urban=0,e.burgs=[],(e.burg&&!n[e.burg]||n[e.burg]?.removed)&&(e.burg=0))});for(let r of e.i){let i=e.province[r];i&&(t[i].area+=e.area[r],t[i].rural+=e.pop[r],e.burg[r]&&(t[i].urban+=n[e.burg[r]].population??0,t[i].burgs.push(e.burg[r])))}t.forEach(e=>{!e.i||e.removed||!e.burg&&e.burgs.length&&(e.burg=e.burgs[0])})}function Se(){let e=g(`provincesFilterState`);z.stateId!==-1&&!pack.states.some(e=>e.i===z.stateId&&!e.removed)&&(z.stateId=-1),e.options.length=0,e.options.add(new Option(`all`,`-1`,!1,z.stateId===-1)),pack.states.filter(e=>e.i&&!e.removed).sort((e,t)=>e.name>t.name?1:-1).forEach(t=>{e.options.add(new Option(t.name,String(t.i),!1,t.i===z.stateId))}),j.set(L,`filters`,z)}function q(){let e=pack.provinces.filter(e=>e.i&&!e.removed);return ce(L,z.stateId===-1?e:e.filter(e=>e.state===z.stateId),H)}function Ce(e){let t=g(`provincesBodySection`),n=` ${m()}`,r=e.all.reduce((e,t)=>({area:e.area+B(t),population:e.population+V(t),burgs:e.burgs+t.burgs.length}),{area:0,population:0,burgs:0}),i=t.dataset.type===`percentage`,a=e.rows.map(e=>{let t=B(e),a=e.rural*populationRate,o=e.urban*populationRate*urbanization,s=V(e),l=`Total population: ${f(s)}; Rural population: ${f(a)}; Urban population: ${f(o)}`,u=pack.states[e.state].name,d=e.burg&&e.burg!==pack.states[e.state].capital,p=v(`#deftemp`).select(`#fog #focusProvince${e.i}`).size();return ie.trigger(`provinceCOA${e.i}`,e.coa),`<div class="states" data-id=${e.i}>
      <fill-box data-col="color" fill="${e.color}"></fill-box>
      <input data-col="name" data-tip="Province name. Click to change" class="name pointer" value="${e.name}" readonly />
      <svg data-col="emblem" data-tip="Click to show and edit province emblem" class="coaIcon pointer" viewBox="0 0 200 200"><use href="#provinceCOA${e.i}"></use></svg>
      <input data-col="form" data-tip="Province form name. Click to change" class="name pointer" value="${e.formName}" readonly />
      <div data-col="capital">
        <span data-tip="Province capital. Click to zoom into view" class="icon-star-empty pointer ${e.burg?``:`placeholder`}"></span>
        <select data-tip="Province capital. Click to select from burgs within the state. No capital means the province is governed from the state capital" class="cultureBase ${e.burgs.length?``:`placeholder`}">${e.burgs.length?we(e.burgs,e.burg):``}</select>
      </div>
      <input data-col="state" data-tip="Province owner" class="provinceOwner" value="${u}" disabled>
      <div data-col="burgs">
        <span data-tip="Click to overview province burgs" class="icon-dot-circled pointer"></span>
        <span data-tip="Burgs count" class="provinceBurgs">${i?`${c(r.burgs?e.burgs.length/r.burgs*100:0)}%`:e.burgs.length}</span>
      </div>
      <div data-col="area">
        <span data-tip="Province area" class="icon-map-o" style="padding-right: 4px"></span>
        <span data-tip="Province area" class="biomeArea">${i?`${c(r.area?t/r.area*100:0)}%`:f(t)+n}</span>
      </div>
      <div data-col="population">
        <span data-tip="${l}" class="icon-male"></span>
        <span data-tip="${l}" class="culturePopulation">${i?`${c(r.population?s/r.population*100:0)}%`:f(s)}</span>
      </div>
      <div data-col="actions"><span data-tip="Declare province independence (turn non-capital province with burgs into a new state)" class="icon-flag-empty ${d?``:`placeholder`}"></span><span data-tip="Locate the province" class="icon-target"></span><span data-tip="Toggle province focus" class="icon-pin ${p?``:` inactive`}"></span><span data-tip="Lock the province" class="icon-lock${e.lock?``:`-open`}"></span><span data-tip="Remove the province" class="icon-trash-empty"></span></div>
    </div>`}).join(``);t.querySelectorAll(`:scope > .states`).forEach(e=>{e.remove()}),t.insertAdjacentHTML(`beforeend`,a),g(`provincesFooterNumber`).innerHTML=String(e.all.length),g(`provincesFooterBurgs`).innerHTML=String(r.burgs),g(`provincesFooterArea`).innerHTML=e.all.length?f(r.area/e.all.length)+n:`0${n}`,g(`provincesFooterPopulation`).innerHTML=e.all.length?f(r.population/e.all.length):`0`,g(`provincesFooterArea`).dataset.area=String(r.area),g(`provincesFooterPopulation`).dataset.population=String(r.population),ue(g(`provincesFooter`),e,U.goto),t.querySelectorAll(`div.states`).forEach(e=>{e.addEventListener(`mouseenter`,J),e.addEventListener(`mouseleave`,Y)}),A(L,{width:`fit-content`,position:R})}function we(e,t){let n=``;return e.forEach(e=>{n+=`<option ${e===t?`selected`:``} value="${e}">${pack.burgs[e].name}</option>`}),n}function J(e){let n=+e.target.dataset.id,r=g(`provincesBodySection`).querySelector(`div[data-id='${n}']`);if(r&&r.classList.add(`active`),!N.isOn(`provinces`)||customization)return;let i=t().duration(2e3).ease(x);v(`#provs`).select(`#province${n}`).raise().transition(i).attr(`stroke-width`,2.5).attr(`stroke`,`#d0240f`)}function Y(e){let t=e.target?.dataset?.id?+e.target.dataset.id:null;if(t){let e=g(`provincesBodySection`).querySelector(`div[data-id='${t}']`);e&&e.classList.remove(`active`)}if(!N.isOn(`provinces`)||!t){v(`#debug`).selectAll(`.highlight`).remove();return}v(`#provs`).select(`#province${t}`).transition().attr(`stroke-width`,null).attr(`stroke`,null),v(`#debug`).selectAll(`.highlight`).remove()}function Te(e){let t=e.getAttribute(`fill`),n=+e.closest(`.states`).dataset.id;k.ColorPicker.open(t,t=>{e.fill=t,pack.provinces[n].color=t,N.draw(`provinces`)})}function Ee(e){let t=pack.provinces[e].burg,{x:n,y:r}=pack.burgs[t];zoomTo(n,r,8,2e3)}function De(e){P({title:`Declare independence`,message:`Are you sure you want to declare province independence? <br>It will turn province into a new state`,confirm:`Declare`,onConfirm:()=>{let t=X(e);if(!t)return;let[n,r]=t;Z([n],[r])}})}function X(t){let{states:n,provinces:r,cells:i,burgs:a}=pack,o=r[t],{name:s,burg:c,burgs:l}=o;if(l.some(e=>a[e].capital)){E(`Cannot declare independence of a province having capital burg. Please change capital first`,!1,`error`);return}if(!c){E(`Cannot declare independence of a province without burg`,!1,`error`);return}let u=o.state,d=n.length,f=a[c];f.capital=1,Burgs.changeGroup(f),N.draw(`burgIcons`,`labels`),o.burgs.forEach(e=>{a[e].state=d});let{cell:p,culture:m}=a[c],g=h(),_=o.coa,v=e(`provinceCOA${t}`);v&&(v.id=`stateCOA${d}`),M(`province`,t),i.i.filter(e=>i.province[e]===t).forEach(e=>{i.province[e]=0,i.state[e]=d});let y=n.map(e=>{if(!e.i||e.removed)return`x`;let t=n[u].diplomacy[e.i];return e.i===u?t=`Enemy`:t===`Ally`||t===`Friendly`?t=`Suspicion`:t===`Suspicion`?t=`Neutral`:t===`Enemy`||t===`Rival`?t=`Friendly`:t===`Vassal`?t=`Suspicion`:t===`Suzerain`&&(t=`Enemy`),e.diplomacy.push(t),t});return y.push(`x`),n[0].diplomacy.push([`Independance declaration`,`${s} declared its independance from ${n[u].name}`]),n.push({i:d,name:s,diplomacy:y,provinces:[],color:g,expansionism:.5,capital:c,type:`Generic`,center:p,culture:m,military:[],alert:1,coa:_}),n[u].provinces=n[u].provinces.filter(e=>e!==t),r[t]={i:t,removed:!0},[u,d]}function Z(e,t){let r=n([...e,...t]);N.hide(`provinces`),N.show(`states`,`borders`),States.getPoles(),States.findNeighbors(),States.collectStatistics(),States.defineStateForms(t),N.draw(`labels`),ne(r.map(e=>[`state`,e])),N.hide(`provinces`),N.show(`states`,`borders`),I(),O(),k.StatesEditor.open()}function Oe(e){let t=pack.provinces[e],n=pack.cells.i.filter(t=>pack.cells.province[t]===e);if(!n.length){E(`Province does not have any cells, cannot change population`,!1,`error`);return}let r=c(t.rural*populationRate),i=c(t.urban*populationRate*urbanization),a=r+i,o=e=>Number(e).toLocaleString();alertMessage.innerHTML=` Rural: <input type="number" min="0" step="1" id="ruralPop" value=${r} style="width:6em" /> Urban:
    <input type="number" min="0" step="1" id="urbanPop" value=${i} style="width:6em" ${t.burgs.length?``:`disabled`} />
    <p>Total population: ${o(a)} ⇒ <span id="totalPop">${o(a)}</span> (<span id="totalPopPerc">100</span>%)</p>`;let s=g(`ruralPop`),l=g(`urbanPop`),u=()=>{let e=s.valueAsNumber+l.valueAsNumber;Number.isNaN(e)||(g(`totalPop`).innerHTML=o(e),g(`totalPopPerc`).innerHTML=String(c(e/a*100)))};s.oninput=()=>u(),l.oninput=()=>u(),$(`#alert`).dialog({resizable:!1,title:`Change province population`,width:`24em`,buttons:{Apply:function(){d(),$(this).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}},position:{my:`center`,at:`center`,of:`svg`}});function d(){let e=+s.value/r;if(Number.isFinite(e)&&e!==1&&n.forEach(t=>{pack.cells.pop[t]*=e}),!Number.isFinite(e)&&+s.value>0){let e=c(+s.value/populationRate/n.length);n.forEach(t=>{pack.cells.pop[t]=e})}let a=+l.value/i;if(Number.isFinite(a)&&a!==1&&t.burgs.forEach(e=>{pack.burgs[e].population=c((pack.burgs[e].population??0)*a,4)}),!Number.isFinite(a)&&+l.value>0){let e=c(+l.value/populationRate/urbanization/t.burgs.length,4);t.burgs.forEach(t=>{pack.burgs[t].population=e})}N.draw(`population`),G()}}function ke(e,t){let n=v(`#provs`).select(`#province${e}`).attr(`d`),r=`focusProvince${e}`;t.contains(`inactive`)?se(r,n):I(r),t.toggle(`inactive`)}function Ae(e){alertMessage.innerHTML=`Are you sure you want to remove the province? <br />This action cannot be reverted`,$(`#alert`).dialog({resizable:!1,title:`Remove province`,buttons:{Remove:function(){pack.cells.province.forEach((t,n)=>{t===e&&(pack.cells.province[n]=0)});let t=pack.provinces[e].state,n=pack.states[t];n.provinces.includes(e)&&n.provinces.splice(n.provinces.indexOf(e),1),I(`focusProvince${e}`),M(`province`,e),pack.provinces[e]={i:e,removed:!0};let r=v(`#provs`).select(`#provincesBody`);r.select(`#province${e}`).remove(),r.select(`#province-gap${e}`).remove(),N.draw(`borders`),N.draw(`labels`),G(),$(this).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}}})}function je(e){Me();let t=pack.provinces[e];g(`provinceNameEditor`).dataset.province=String(e),g(`provinceNameEditorShort`).value=t.name,r(g(`provinceNameEditorSelectForm`),t.formName),g(`provinceNameEditorFull`).value=t.fullName;let n=pack.cells.culture[t.center];g(`provinceCultureDisplay`).innerText=pack.cultures[n].name,$(`#provinceNameEditor`).dialog({resizable:!1,title:`Change province name`,buttons:{Apply:function(){Re(t),$(this).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}},position:{my:`center`,at:`center`,of:`svg`},close:Ne})}function Me(){F(`provinceNameEditor`),g(`dialogs`).insertAdjacentHTML(`beforeend`,`<div id="provinceNameEditor" class="dialog" data-province="0">
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
    </div>`),g(`provinceNameEditorShortCulture`).addEventListener(`click`,Pe),g(`provinceNameEditorShortRandom`).addEventListener(`click`,Fe),g(`provinceNameEditorShortSpeak`).addEventListener(`click`,()=>u(g(`provinceNameEditorShort`).value)),g(`provinceNameEditorAddForm`).addEventListener(`click`,Ie),g(`provinceNameEditorFullRegenerate`).addEventListener(`click`,Le),g(`provinceNameEditorFullSpeak`).addEventListener(`click`,()=>u(g(`provinceNameEditorFull`).value))}function Ne(){$(`#provinceNameEditor`).dialog(`destroy`),g(`provinceNameEditor`).remove()}function Pe(){let e=+g(`provinceNameEditor`).dataset.province,t=pack.cells.culture[pack.provinces[e].center],n=Names.getState(Names.getCultureShort(t),t);g(`provinceNameEditorShort`).value=n}function Fe(){let e=b(Names.nameBases.length-1),t=Names.getState(Names.getBase(e),void 0,e);g(`provinceNameEditorShort`).value=t}function Ie(){let e=g(`provinceNameEditorCustomForm`),t=g(`provinceNameEditorSelectForm`),n=e.value,i=e.style.display===`inline-block`;e.style.display=i?`none`:`inline-block`,t.style.display=i?`inline-block`:`none`,i&&r(t,n)}function Le(){let e=g(`provinceNameEditorShort`).value,t=g(`provinceNameEditorSelectForm`).value,n=()=>t?!e&&t?`The ${t}`:`${e} ${t}`:e;g(`provinceNameEditorFull`).value=n()}function Re(e){e.name=g(`provinceNameEditorShort`).value,e.formName=g(`provinceNameEditorSelectForm`).value,e.fullName=g(`provinceNameEditorFull`).value,N.draw(`provinces`),N.draw(`labels`),G()}function ze(e,t,n){t.dataset.capital=pack.burgs[+n].name,pack.provinces[e].center=pack.burgs[+n].cell,pack.provinces[e].burg=+n}function Be(){let e=g(`provincesBodySection`);e.dataset.type=e.dataset.type===`absolute`?`percentage`:`absolute`,U.refresh()}function Ve(){let e=e=>!e.i||e.removed||e.color[0]!==`#`?`#666`:String(d(e.color).darker()),t=pack.states.map(t=>({id:t.i,state:t.i?0:null,color:e(t)})),n=pack.provinces.filter(e=>e.i&&!e.removed).map(e=>({id:e.i+t.length-1,i:e.i,state:e.state,color:e.color,name:e.name,fullName:e.fullName,area:e.area,urban:e.urban,rural:e.rural})),r=[...t,...n],i=C().parentId(e=>e.state)(r).sum(e=>e.area),a=+g(`uiSize`).value,o=300+300*a,s=90+90*a,l={top:10,right:10,bottom:0,left:10},u=o-l.left-l.right,p=s-l.top-l.bottom,h=be().size([u,p]).padding(2);alertMessage.innerHTML=`<select id="provincesTreeType" style="display:block; margin-left:13px; font-size:11px">
    <option value="area" selected>Area</option>
    <option value="population">Total population</option>
    <option value="rural">Rural population</option>
    <option value="urban">Urban population</option>
  </select>`,alertMessage.innerHTML+=`<div id='provinceInfo' class='chartInfo'>&#8205;</div>`;let y=v(`#alertMessage`).insert(`svg`,`#provinceInfo`).attr(`id`,`provincesTree`).attr(`width`,o).attr(`height`,s).attr(`font-size`,`10px`).append(`g`).attr(`transform`,`translate(10, 0)`);g(`provincesTreeType`).addEventListener(`change`,T),h(i);let b=y.selectAll(`g`).data(i.leaves()).enter().append(`g`).attr(`data-id`,e=>e.data.i).on(`mouseenter`,(e,t)=>x(e,t)).on(`mouseleave`,e=>S(e));function x(e,t){v(e.currentTarget).select(`rect`).classed(`selected`,!0);let n=t.data.fullName,r=pack.states[t.data.state].fullName,i=`${_(t.data.area)} ${m()}`,a=c(t.data.rural*populationRate),o=c(t.data.urban*populationRate*urbanization),s=g(`provincesTreeType`).value,l=s===`area`?`Area: ${i}`:s===`rural`?`Rural population: ${f(a)}`:s===`urban`?`Urban population: ${f(o)}`:`Population: ${f(a+o)}`;g(`provinceInfo`).innerHTML=`${n}. ${r}. ${l}`,J(e)}function S(e){Y(e),document.getElementById(`provinceInfo`)&&(g(`provinceInfo`).innerHTML=`&#8205;`,v(e.currentTarget).select(`rect`).classed(`selected`,!1))}b.append(`rect`).attr(`stroke`,e=>e.parent.data.color).attr(`stroke-width`,1).attr(`fill`,e=>e.data.color).attr(`x`,e=>e.x0).attr(`y`,e=>e.y0).attr(`width`,e=>e.x1-e.x0).attr(`height`,e=>e.y1-e.y0),b.append(`text`).attr(`text-rendering`,`optimizeSpeed`).attr(`dx`,`.2em`).attr(`dy`,`1em`).attr(`x`,e=>e.x0).attr(`y`,e=>e.y0);function w(){b.select(`text`).each(function(e){this.innerHTML=e.data.name;let t=this.getBBox();t.y+t.height>e.y1+1&&(this.innerHTML=``);for(let n=0;n<15&&t.width>0&&t.x+t.width>e.x1;n++){if(this.innerHTML.length<3){this.innerHTML=``;break}this.innerHTML=`${this.innerHTML.slice(0,-2)}…`,t=this.getBBox()}})}function T(){let e=this.value===`area`?e=>e.area:this.value===`rural`?e=>e.rural:this.value===`urban`?e=>e.urban:e=>e.rural+e.urban;i.sum(e),b.data(h(i).leaves()),b.select(`rect`).transition().duration(1500).attr(`x`,e=>e.x0).attr(`y`,e=>e.y0).attr(`width`,e=>e.x1-e.x0).attr(`height`,e=>e.y1-e.y0),b.select(`text`).transition().duration(1500).attr(`x`,e=>e.x0).attr(`y`,e=>e.y0),setTimeout(w,2e3)}$(`#alert`).dialog({title:`Provinces chart`,width:`fit-content`,position:{my:`left bottom`,at:`left+10 bottom-10`,of:`svg`},buttons:{},close:()=>{alertMessage.innerHTML=``}}),w()}function He(){P({title:`Release provinces`,message:`Are you sure you want to release all provinces?
        </br>It will turn all separable provinces into independent states.
        </br>Capital province and provinces without any burgs will state as they are`,confirm:`Release`,onConfirm:()=>{let e=[],t=[];q().forEach(n=>{if(!n.burg||n.burg===pack.states[n.state].capital||n.burgs.some(e=>pack.burgs[e].capital))return;let r=X(n.i);r&&(e.push(r[0]),t.push(r[1]))}),Z(n(e),t)}})}function Ue(){N.show(`provinces`,`borders`),k.PaintEditor.open({title:`Paint Provinces`,parentDialogId:L,onClose:W,items:q().map(e=>({id:e.i,name:e.name,color:e.color||`#ffffff`})),getValue:e=>pack.cells.province[e],filterCell:(e,t,n)=>!o(e,pack)||!pack.cells.state[e]||pack.cells.state[e]!==pack.provinces[n].state?!1:!t||e!==pack.provinces[t].center?!0:(E(`Province center cannot be assigned to a different region. Please remove the province first`,!1,`error`),!1),dontOverrideControl:!0,onApply:We})}function We(e){for(let[t,n]of e)pack.cells.province[t]=n;Provinces.getPoles(),N.draw(`borders`,`provinces`),N.draw(`labels`),document.getElementById(L)&&G()}function Ge(){if(this.classList.contains(`pressed`)){Q();return}customization=12,this.classList.add(`pressed`),E(`Click on the map to place a new province center`,!0),v(`#viewbox`).style(`cursor`,`crosshair`).on(`click`,Ke),g(`provincesBodySection`).querySelectorAll(`div > input, select, span, svg`).forEach(e=>{e.style.pointerEvents=`none`})}function Ke(e){let{cells:t,provinces:n}=pack,r=a(e,this),i=Pack.findCell(r[0],r[1]);if(t.h[i]<20){E(`You cannot place province into the water. Please click on a land cell`,!1,`error`);return}let o=t.province[i];if(o&&n[o].center===i){E(`The cell is already a center of a different province. Select other cell`,!1,`error`);return}let s=t.state[i];if(!s){E(`You cannot create a province in neutral lands. Please assign this land to a state first`,!1,`error`);return}e.shiftKey===!1&&Q();let c=n.length;pack.states[s].provinces.push(c);let u=t.burg[i],f=t.culture[i],m=u?pack.burgs[u].name:Names.getState(Names.getCultureShort(f),f),_=o?n[o].formName:`Province`,v=`${m} ${_}`,y=pack.states[s].color,b=h(),x=y[0]===`#`?d(l(y,b)(.2)).hex():b,S=u?.8:.4,C=u?pack.burgs[u].coa:pack.states[s].coa,w=u?pack.burgs[u].port:void 0,T=Burgs.getType(i,w),D=ee.generate(C,S,+p(.1),T);D.shield=ee.getShield(f,s),n.push({i:c,state:s,center:i,burg:u,name:m,formName:_,fullName:v,color:x,coa:D}),re(`province`,c),t.province[i]=c,t.c[i].forEach(e=>{t.h[e]<20||t.state[e]!==s||n.find(t=>!t.removed&&t.center===e)||(t.province[e]=c)}),N.draw(`borders`,`provinces`),N.draw(`labels`),K(),z.stateId=s,j.set(L,`filters`,z),g(`provincesFilterState`).value=String(z.stateId),U.reset()}function Q(){customization=0,oe(),D(),g(`provincesBodySection`).querySelectorAll(`div > input, select, span, svg`).forEach(e=>{e.style.removeProperty(`pointer-events`)});let e=g(`provincesAdd`);e.classList.contains(`pressed`)&&e.classList.remove(`pressed`)}function qe(){let e=z.stateId;pack.provinces.forEach(t=>{if(!t||t.removed||e!==-1&&t.state!==e)return;let n=pack.states[t.state].color,r=h();t.color=n[0]===`#`?d(l(n,r)(.2)).hex():r}),N.show(`provinces`)}function Je(){let e=`Id,Province,Full Name,Form,State,Color,Capital,Area ${areaUnit.value===`square`?`${distanceUnitInput.value}2`:areaUnit.value},Total Population,Rural Population,Urban Population,Burgs\n`;for(let t of q()){let n=t.burg?pack.burgs[t.burg].name:``;e+=`${t.i},${t.name},${t.fullName},${t.formName},${pack.states[t.state].name},${t.color},${n},${B(t)},${V(t)},${Math.round(t.rural*populationRate)},${Math.round(t.urban*populationRate*urbanization)},${t.burgs.length}\n`}let t=`${s(`Provinces`)}.csv`;y(e,t)}function Ye(){alertMessage.innerHTML=`Are you sure you want to remove all provinces? <br />This action cannot be reverted`,$(`#alert`).dialog({resizable:!1,title:`Remove all provinces`,buttons:{Remove:function(){$(this).dialog(`close`),pack.provinces.forEach(e=>{e.i&&M(`province`,e.i)}),pack.provinces=[0],pack.cells.province=new Uint16Array(pack.cells.i.length),pack.states.forEach(e=>{e.provinces=[]}),I(),N.draw(`borders`),v(`#provs`).select(`#provincesBody`).remove(),N.hide(`provinces`),N.draw(`labels`),U.reset()},Cancel:function(){$(this).dialog(`close`)}}})}function Xe(){customization===12&&Q(),$(`#provincesEditor`).dialog(`destroy`),g(`provincesEditor`).remove()}function Ze(){let e=z.stateId;if(e===-1){alertMessage.innerHTML=`Please select a specific state from the filter to merge provinces within that state.`,$(`#alert`).dialog({title:`Merge Provinces`,buttons:{OK:function(){$(this).dialog(`close`)}}});return}let t=pack.provinces.filter(t=>t.i&&!t.removed&&t.state===e);if(t.length<2){alertMessage.innerHTML=`Not enough provinces in the selected state to merge.`,$(`#alert`).dialog({title:`Merge Provinces`,buttons:{OK:function(){$(this).dialog(`close`)}}});return}let n=e=>`<svg class="coaIcon" viewBox="0 0 200 200"><use href="#provinceCOA${e}"></use></svg>`,r=t.map(e=>`
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
  `,g(`mergeProvincesForm`).querySelectorAll(`div[data-id]`).forEach(e=>{e.addEventListener(`mouseenter`,Qe),e.addEventListener(`mouseleave`,Y)}),$(`#alert`).dialog({width:600,title:`Merge provinces`,close:Y,buttons:{Merge:function(){let e=new FormData(g(`mergeProvincesForm`)),t=Number(e.get(`rulingProvince`));if(!t){E(`Please select a province to merge into`,!1,`error`);return}let r=e.getAll(`provincesToMerge`).map(Number).filter(e=>e!==t);if(!r.length){E(`Please select several provinces to merge`,!1,`error`);return}P({title:`Merge provinces`,message:`
            <p>The following provinces will be <strong>removed</strong>: ${r.map(e=>`${n(e)}${pack.provinces[e].name}`).join(`, `)}.</p>
            <p>Removed provinces data (burgs and cells) will be assigned to ${n(t)}${pack.provinces[t].name}.</p>
            <p>Are you sure you want to merge provinces? This action cannot be reverted.</p>`,confirm:`Merge`,onConfirm:()=>{et(r,t),$(this).dialog(`close`)}})},Cancel:function(){$(this).dialog(`close`)}}})}function Qe(e){if(!N.isOn(`provinces`))return;let t=+e.currentTarget.dataset.id;if(!t)return;let n=v(`#provs`).select(`#province${t}`).attr(`d`);if(!n)return;Y(e);let r=v(`#debug`).append(`path`).attr(`class`,`highlight`).attr(`d`,n).attr(`fill`,`none`).attr(`stroke`,`red`).attr(`stroke-width`,1).attr(`opacity`,1).attr(`filter`,`url(#blur1)`),a=r.node().getTotalLength(),o=(a+5e3)/2,s=i(`0, ${a}`,`${a}, ${a}`);r.transition().duration(o).attrTween(`stroke-dasharray`,()=>s)}function $e(e){I(`focusProvince${e}`),M(`province`,e)}function et(e,t){let n=pack.provinces[t],r=new Map;e.forEach(e=>{if(e===t)return;let i=pack.provinces[e];i.burgs.forEach(e=>{pack.burgs[e].province=t,n.burgs.includes(e)||n.burgs.push(e)}),!n.burg&&i.burg&&(n.burg=i.burg),r.set(e,t),$e(e),pack.provinces[e]={i:e,removed:!0}}),pack.cells.province.forEach((e,t)=>{let n=r.get(e);n!==void 0&&(pack.cells.province[t]=n)});let i=pack.states[n.state];i.provinces=i.provinces.filter(e=>!pack.provinces[e].removed),K(),Provinces.getPoles(),N.draw(`provinces`,`borders`),N.draw(`labels`),I(),v(`#debug`).selectAll(`.highlight`).remove(),G()}function tt(e,t){let n=pack.provinces[e];n.lock=!n.lock,t.toggle(`icon-lock-open`),t.toggle(`icon-lock`)}var nt={open:W};export{nt as ProvincesEditor};