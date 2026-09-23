import{Et as e,J as t,M as n,X as r,bt as i,c as a,dn as o,k as s,t as c,u as l,wt as u}from"./utils-BIleyWmR.js";import{O as d,j as f,t as p}from"./layers-qPZxwHcp.js";import{i as ee,o as m}from"./megalopolis-BpsA5rhH.js";import{r as h,t as g}from"./tooltips-zkair8Am.js";import{n as te,r as _,t as v}from"./dialog-helpers-50LJgx0U.js";import{P as y,d as ne,j as re,u as ie}from"./index-tuMZPduM.js";var b={k:1,x:0,y:0};function x({k:e,x:t,y:n},r){return{k:e,x:u(t,r.width*(1-e),0),y:u(n,r.height*(1-e),0)}}function S(e,t,n,r,i=32){let a=u(e.k*n,1,Math.max(1,i)),o=a/e.k;return x({k:a,x:t.x-(t.x-e.x)*o,y:t.y-(t.y-e.y)*o},r)}function ae(e,t,n,r){return x({k:e.k,x:e.x+t,y:e.y+n},r)}var C=null,w=null,T={...b},E=32,D=1,O=0,k=!1;function oe(e){customization||(v(`.stable`),p.show(`burgIcons`,`labels`),w=+e,C=o(`#labels`).select(`[data-label-type='burg'][data-id='${e}']`),C.size()||(C=o(`#burgIcons`).select(`[data-id='${e}']`)),se(),ce(),le(),$(`#burgEditor`).dialog({title:`Edit Burg`,resizable:!1,close:Ie,position:{my:`left top`,at:`left+10 top+10`,of:`svg`,collision:`fit`}}))}function se(){_(`burgEditor`);let e=`<div id="burgEditor" class="dialog" data-burg-id="${A()}">
      <div id="burgBody" style="padding-bottom: 0.3em">
        <div style="display: flex; align-items: center">
          <svg data-tip="Burg emblem. Click to edit" class="pointer" viewBox="0 0 200 200" width="13em" height="13em">
            <use id="burgEmblem"></use>
          </svg>
          <div style="display: grid; grid-auto-rows: minmax(1.6em, auto)">
            <div id="burgProvinceAndState" style="font-weight: bold; max-width: 16em"></div>
            <div>
              <div class="label">Name:</div>
              <input
                id="burgName"
                data-tip="Type to rename the burg"
                autocorrect="off"
                spellcheck="false"
                style="width: 9em"
              />
              <span id="burgNameSpeak" data-tip="Speak the name. You can change voice and language in options" class="speaker">🔊</span>
              <span
                id="burgNameReRandom"
                data-tip="Generate random name for the burg"
                class="icon-globe pointer"
              ></span>
            </div>
            <div data-tip="Select burg group. Groups defines burg icon, label size and style">
              <div class="label">Group:</div>
              <select id="burgGroup" style="width: 9em"></select>
              <span id="burgGroupConfigure" data-tip="Configure burg groups" class="icon-cog pointer"></span>
            </div>
            <div data-tip="Select burg type. Type slightly affects emblem generation">
              <div class="label">Type:</div>
              <select id="burgType" style="width: 9em">
                <option value="Generic">Generic</option>
                <option value="River">River</option>
                <option value="Lake">Lake</option>
                <option value="Naval">Naval</option>
                <option value="Nomadic">Nomadic</option>
                <option value="Hunting">Hunting</option>
                <option value="Highland">Highland</option>
              </select>
            </div>
            <div data-tip="Select dominant culture">
              <div class="label">Culture:</div>
              <select id="burgCulture" style="width: 9em"></select>
              <span
                id="burgNameReCulture"
                data-tip="Generate culture-specific name for the burg"
                class="icon-book pointer"
              ></span>
            </div>
            <div data-tip="Set burg population">
              <div class="label">Population:</div>
              <input id="burgPopulation" type="number" min="0" step="1" style="width: 9em" />
            </div>
            <div
              id="burgTradeRoleRow"
              data-tip="Trade-network role: Auto lets generation decide; Hub/Waystation/None override it permanently"
              style="display: none"
            >
              <div class="label">Trade role:</div>
              <select id="burgTradeRole" style="width: 9em">
                <option value="auto">Auto</option>
                <option value="hub">Hub</option>
                <option value="waystation">Waystation</option>
                <option value="none">None</option>
              </select>
            </div>
            <div data-tip="Burg average yearly temperature" style="display: flex; justify-content: space-between">
              <div>
                <div class="label">Temperature:</div>
                <span id="burgTemperature"></span>
              </div>
              <div style="display: flex; gap: 0.5em">
                <i class="icon-info-circled" id="burgTemperatureLikeIn"></i>
                <i
                  id="burgTemperatureGraph"
                  data-tip="Show temperature graph for the burg"
                  class="icon-chart-area pointer"
                ></i>
              </div>
            </div>
            <div data-tip="Burg elevation above sea level; for flying burgs, altitude above the local surface">
              <div class="label">Elevation:</div>
              <span id="burgElevation"></span>
            </div>
            <div>
              <div class="label">Features:</div>
              <span
                id="burgCapital"
                data-tip="Shows whether the burg is a state capital. Click to toggle"
                data-feature="capital"
                class="burgFeature icon-star"
              ></span>
              <span
                id="burgPort"
                data-tip="Shows whether the burg is a port. Click to toggle"
                data-feature="port"
                class="burgFeature icon-anchor"
              ></span>
              <span
                id="burgCitadel"
                data-tip="Shows whether the burg has a citadel (castle). Click to toggle"
                data-feature="citadel"
                class="burgFeature icon-chess-rook"
                style="font-size: 1.1em"
              ></span>
              <span
                id="burgWalls"
                data-tip="Shows whether the burg is walled. Click to toggle"
                data-feature="walls"
                class="burgFeature icon-fort-awesome"
              ></span>
              <span
                id="burgPlaza"
                data-tip="Shows whether the burg is a trade center (market center). Click to toggle"
                data-feature="plaza"
                class="burgFeature icon-store"
                style="font-size: 1em"
              ></span>
              <span
                id="burgTemple"
                data-tip="Shows whether the burg is a religious center. Click to toggle"
                data-feature="temple"
                class="burgFeature icon-chess-bishop"
                style="font-size: 1.1em; margin-left: 3px"
              ></span>
              <span
                id="burgShanty"
                data-tip="Shows whether the burg has a shanty town. Click to toggle"
                data-feature="shanty"
                class="burgFeature icon-campground"
                style="font-size: 1em"
              ></span>
              <span
                id="burgFlying"
                data-tip="Shows whether the burg is a flying sky-city. Click to toggle"
                data-feature="flying"
                class="burgFeature icon-cloud"
              ></span>
              <span
                id="burgSkyPort"
                data-tip="Shows whether the burg is a sky port (air-route hub). Auto-set when Flying is on; can also be enabled standalone on ground burgs. Click to toggle"
                data-feature="skyPort"
                class="burgFeature icon-rocket"
              ></span>
            </div>
            <div id="burgAltitudeRow" data-tip="Altitude above the local surface (ground or sea) for this flying sky-city, in feet" style="display: none">
              <div class="label">Altitude:</div>
              <input id="burgAltitude" type="number" min="0" step="50" value="500" style="width: 9em" /> ft
            </div>
            <div data-tip="Burg average daily production">
              <div class="label">Production:</div>
              <span id="burgProduction" style="display: inline-flex; flex-wrap: wrap; column-gap: 0.3em; max-width: 110px;"></span>
            </div>
            <div data-tip="Gross product per population point, daily average">
              <div class="label">Wealth</div>
              <span id="burgWealth"></span>
            </div>
            <div data-tip="Treasury balance after production, purchases, and sales">
              <div class="label">Treasury</div>
              <span id="burgTreasury"></span>
            </div>
          </div>
        </div>
        <div id="burgPreviewSection" data-tip="Burg map preview: scroll to zoom, drag to pan" style="display: flex; flex-direction: column">
          <div style="display: flex; justify-content: space-between">
            <span>Burg preview:</span>
            <div style="display: flex; gap: 0.5em">
              <i id="burgPreviewReset" data-tip="Reset preview zoom" class="icon-ccw pointer"></i>
              <i id="burgLinkOpen" data-tip="Open burg map in a new tab" class="icon-link-ext pointer"></i>
            </div>
          </div>
          <div
            id="burgPreviewObject"
            style="overflow: hidden; position: relative; touch-action: none; height: 320px; max-width: 60vw; max-height: 60vh"
          ></div>
        </div>
      </div>
      <div id="burgBottom">
        <button id="burgStyleShow" data-tip="Show style edit section" class="icon-brush"></button>
        <div id="burgStyleSection" style="display: none">
          <button id="burgStyleHide" data-tip="Hide style edit section" class="icon-brush"></button>
          <button
            id="burgEditLabelStyle"
            data-tip="Edit label style for burg group in Style Editor"
            class="icon-font"
          ></button>
          <button
            id="burgEditIconStyle"
            data-tip="Edit icon style for burg group in Style Editor"
            class="icon-dot-circled"
          ></button>
          <button
            id="burgEditAnchorStyle"
            data-tip="Edit port icon (anchor) style for burg group in Style Editor"
            class="icon-anchor"
          ></button>
        </div>
        <button id="burgEditLabel" data-tip="Edit this burg label" class="icon-font"></button>
        <button id="burgEditEmblem" data-tip="Edit emblem" class="icon-shield-alt"></button>
        <button id="burgSetPreviewLink" data-tip="Set custom burg map URL" class="icon-map-o"></button>
        <button id="burgLocate" data-tip="Zoom map and center view in the burg" class="icon-target"></button>
        <button
          id="burgProductionOverview"
          data-tip="Show production overview for this burg"
          class="icon-chart-bar"
        ></button>
        <button
          id="burgRelocate"
          data-tip="Relocate burg. Click on map to move the burg"
          class="icon-map-pin"
        ></button>
        <button id="burglLegend" data-tip="Edit free text notes (legend) for this burg" class="icon-edit"></button>
        <button id="burgLock" class="icon-lock-open" onmouseover="showElementLockTip(event)"></button>
        <button
          id="burgRemove"
          data-tip="Remove non-capital burg"
          data-shortcut="Delete"
          class="icon-trash fastDelete"
        ></button>
      </div>
    </div>`;s(`dialogs`).insertAdjacentHTML(`beforeend`,e),s(`burgName`).addEventListener(`input`,M),s(`burgNameSpeak`).addEventListener(`click`,()=>r(s(`burgName`).value)),s(`burgNameReRandom`).addEventListener(`click`,ue),s(`burgGroup`).addEventListener(`change`,de),s(`burgGroupConfigure`).addEventListener(`click`,Fe),s(`burgType`).addEventListener(`change`,fe),s(`burgCulture`).addEventListener(`change`,N),s(`burgNameReCulture`).addEventListener(`click`,P),s(`burgPopulation`).addEventListener(`change`,F),s(`burgAltitude`).addEventListener(`change`,pe),s(`burgTradeRole`).addEventListener(`change`,R),s(`burgBody`).querySelectorAll(`.burgFeature`).forEach(e=>void e.addEventListener(`click`,I)),s(`burgLinkOpen`).addEventListener(`click`,()=>void Oe()),s(`burgPreviewReset`).addEventListener(`click`,G),s(`burgPreviewObject`).addEventListener(`wheel`,Ce,{passive:!1}),s(`burgPreviewObject`).addEventListener(`dblclick`,we),s(`burgPreviewObject`).addEventListener(`pointerdown`,Te),s(`burgStyleShow`).addEventListener(`click`,_e),s(`burgStyleHide`).addEventListener(`click`,ve),s(`burgEditLabelStyle`).addEventListener(`click`,ye),s(`burgEditIconStyle`).addEventListener(`click`,xe),s(`burgEditAnchorStyle`).addEventListener(`click`,Se),s(`burgEmblem`).addEventListener(`click`,Y),s(`burgSetPreviewLink`).addEventListener(`click`,()=>void ke()),s(`burgEditEmblem`).addEventListener(`click`,Y),s(`burgLocate`).addEventListener(`click`,Ae),s(`burgEditLabel`).addEventListener(`click`,be),s(`burgRelocate`).addEventListener(`click`,Z),s(`burglLegend`).addEventListener(`click`,Q),s(`burgLock`).addEventListener(`click`,ge),s(`burgRemove`).addEventListener(`click`,Pe),s(`burgTemperatureGraph`).addEventListener(`click`,Me),s(`burgProductionOverview`).addEventListener(`click`,Ne)}function A(){return w??+C.attr(`data-id`)}function j(){return C?.node()??null}function ce(){let e=s(`burgGroup`);e.options.length=0;for(let{name:t}of options.burgs.groups)e.options.add(new Option(t,t))}function le(){let t=A(),n=pack.burgs[t],r=pack.cells.province[n.cell],i=r?`${pack.provinces[r].fullName}, `:``,o=pack.states[n.state].fullName||pack.states[n.state].name,u=ee(pack.burgs,pack.cells.burg).get(n.cell),d=u?`<div style="font-weight: normal; font-style: italic">${u.anchor.i===t?`${m(n)} — ${u.members.length} burgs share this cell`:`Part of ${m(u.anchor)} (${u.members.length} burgs)`}</div>`:``;s(`burgProvinceAndState`).innerHTML=i+o+d,s(`burgName`).value=n.name,s(`burgGroup`).value=n.group,s(`burgType`).value=n.type||`Generic`,s(`burgPopulation`).value=String(e(n.population*populationRate*urbanization)),s(`burgWealth`).innerHTML=`🟡 ${e(n.population>0?(n.product||0)/n.population:0,2)}`,s(`burgTreasury`).innerHTML=`🟡 ${e(n.treasury||0,2)}`,s(`burgEditAnchorStyle`).style.display=+n.port?`inline-block`:`none`;let p=s(`burgCulture`);p.options.length=0,pack.cultures.filter(e=>!e.removed).forEach(e=>void p.options.add(new Option(e.name,String(e.i),!1,e.i===n.culture)));let h=grid.cells.temp[pack.cells.g[n.cell]];s(`burgTemperature`).innerHTML=c(h),s(`burgTemperatureLikeIn`).dataset.tip=`Average yearly temperature is like in ${l(h)}`,s(`burgElevation`).innerHTML=n.flying?`${n.altitude??`?`} ft above ${pack.cells.h[n.cell]<20?`the sea`:`ground level`}`:`${a(pack.cells.h[n.cell])} above sea level`,s(`burgCapital`).classList.toggle(`inactive`,!n.capital),s(`burgPort`).classList.toggle(`inactive`,!n.port),s(`burgCitadel`).classList.toggle(`inactive`,!n.citadel),s(`burgWalls`).classList.toggle(`inactive`,!n.walls),s(`burgPlaza`).classList.toggle(`inactive`,!n.plaza),s(`burgTemple`).classList.toggle(`inactive`,!n.temple),s(`burgShanty`).classList.toggle(`inactive`,!n.shanty),s(`burgFlying`).classList.toggle(`inactive`,!n.flying),s(`burgSkyPort`).classList.toggle(`inactive`,!n.skyPort),s(`burgAltitudeRow`).style.display=n.flying?`block`:`none`,s(`burgAltitude`).value=String(n.altitude||500),L(n),s(`burgProduction`).innerHTML=Le(Production.getBurgProduction(n)),V();let g=`burgCOA${t}`;n.coa&&f.trigger(g,n.coa),s(`burgEmblem`).setAttribute(`href`,`#${g}`),J(n)}function M(){let e=A(),t=s(`burgName`).value;pack.burgs[e].name=t,pack.burgs[e].label||(pack.burgs[e].label={}),Object.assign(pack.burgs[e].label,{text:t}),p.draw(`labels`)}function ue(){let e=i(Names.nameBases.length-1);s(`burgName`).value=Names.getBase(e),M()}function de(){let e=A(),t=pack.burgs[e];Burgs.changeGroup(t,this.value),p.draw(`burgIcons`,`labels`)}function fe(){let e=A();pack.burgs[e].type=this.value}function N(){let e=A();pack.burgs[e].culture=+this.value}function P(){let e=A(),t=pack.burgs[e].culture;s(`burgName`).value=Names.getCulture(t),M()}function F(){let t=A(),n=pack.burgs[t];pack.burgs[t].population=e(s(`burgPopulation`).valueAsNumber/populationRate/urbanization,4),J(n)}function I(){let e=A(),t=pack.burgs[e],n=this.dataset.feature,r=Number(this.classList.contains(`inactive`));n===`port`?me(e):n===`capital`?he(e):n===`flying`?z(e):n===`skyPort`?B(e):t[n]=r,this.classList.toggle(`inactive`,!t[n]),s(`burgEditAnchorStyle`).style.display=t.port?`inline-block`:`none`,s(`burgAltitudeRow`).style.display=t.flying?`block`:`none`,L(t),J(t)}function L(e){s(`burgTradeRoleRow`).style.display=e.port?`block`:`none`;let t=s(`burgTradeRole`);t.options[0].text=!e.tradeRoleManual&&e.tradeRole?`Auto (${e.tradeRole})`:`Auto`,t.value=e.tradeRoleManual?e.tradeRole||`none`:`auto`}function R(){let e=pack.burgs[A()];this.value===`auto`?delete e.tradeRoleManual:(e.tradeRoleManual=!0,this.value===`none`?delete e.tradeRole:e.tradeRole=this.value),Routes.rebuildTradeRoutes(),L(e)}function z(e){let t=pack.burgs[e];t.flying?(delete t.flying,delete t.skyPort,delete t.altitude):(t.flying=1,t.skyPort=1,t.altitude=+s(`burgAltitude`).value||500),Burgs.changeGroup(t),Routes.rebuildAirroutes()}function B(e){let t=pack.burgs[e];if(t.skyPort){if(t.flying){h(`Cannot disable Sky Port on a flying burg — turn off Flying instead`,!1,`warn`);return}delete t.skyPort}else t.skyPort=1;Routes.rebuildAirroutes()}function pe(){let e=A(),t=pack.burgs[e];t.flying&&(t.altitude=+s(`burgAltitude`).value||0)}function me(e){let t=pack.burgs[e];if(t.port){t.port=0;let n=document.querySelector(`#anchors [data-id='${e}']`);n&&n.remove()}else{let{cells:e,features:n}=pack,r=e.haven[t.cell],i;if(r){let t=e.f[r],a=n[t];i=a?.type===`lake`&&a.outlet?Rivers.resolveLakeDrainFeature(t)??t:t}else if(i=Rivers.resolveDrainFeature(t.cell),!i){h(`No navigable water body found downstream, cannot assign port`,!1,`warn`);return}t.port=i,o(`#anchors`).select(`#${t.group}`).append(`use`).attr(`href`,`#icon-anchor`).attr(`id`,`anchor${t.i}`).attr(`data-id`,t.i).attr(`x`,t.x).attr(`y`,t.y)}}function he(e){let{burgs:t,states:n}=pack;if(t[e].capital){h(`To change capital please assign a capital status to another burg of this state`,!1,`error`);return}let r=t[e].state;if(!r){h(`Neutral lands cannot have a capital`,!1,`error`);return}let i=n[r].capital;n[r].capital=e,n[r].center=t[e].cell;let a=t[e];a.capital=1,Burgs.changeGroup(a);let o=t[i];o.capital=0,Burgs.changeGroup(o),p.draw(`burgIcons`,`labels`)}function ge(){let e=A(),t=pack.burgs[e];t.lock=!t.lock,V()}function V(){let e=A();pack.burgs[e].lock?(s(`burgLock`).classList.remove(`icon-lock-open`),s(`burgLock`).classList.add(`icon-lock`)):(s(`burgLock`).classList.remove(`icon-lock`),s(`burgLock`).classList.add(`icon-lock-open`))}function _e(){document.querySelectorAll(`#burgBottom > button`).forEach(e=>{e.style.display=`none`}),s(`burgStyleSection`).style.display=`inline-block`}function ve(){document.querySelectorAll(`#burgBottom > button`).forEach(e=>{e.style.display=`inline-block`}),s(`burgStyleSection`).style.display=`none`}function ye(){let e=j()?.parentNode?.id||`labels-${pack.burgs[A()].group}`;v(`.stable`),editStyle(`labels`,e)}function be(){let e=A();$(`#burgEditor`).dialog(`close`),y.LabelsEditor.open(`burg`,e)}function xe(){let e=j()?.parentNode?.id||`${pack.burgs[A()].group}`;v(`.stable`),editStyle(`burgIcons`,e)}function Se(){let e=j()?.parentNode?.id||`${pack.burgs[A()].group}`;v(`.stable`),editStyle(`anchors`,e)}function H(){let e=s(`burgPreviewObject`);return{width:e.clientWidth,height:e.clientHeight}}function U(){let e=s(`burgPreviewObject`),t=e.querySelector(`iframe`);if(!t)return;let{k:n,x:r,y:i}=T;t.style.transformOrigin=`0 0`,t.style.transform=`translate(${r}px, ${i}px) scale(${n/D})`,t.style.left=`0`,t.style.top=`0`,e.style.cursor=n>1?`grab`:`default`,clearTimeout(O),k||(O=window.setTimeout(W,200))}function W(){if(k)return;let e=s(`burgPreviewObject`).querySelector(`iframe`);if(!e)return;let{k:t,x:n,y:r}=T;D=t,e.style.width=`${t*100}%`,e.style.height=`${t*100}%`,e.style.transform=`none`,e.style.left=`${n}px`,e.style.top=`${r}px`}function G(){T={...b},clearTimeout(O),k?U():W(),s(`burgPreviewObject`).style.cursor=`default`}function K(e){let t=s(`burgPreviewObject`).getBoundingClientRect();return{x:e.clientX-t.left,y:e.clientY-t.top}}function Ce(e){e.preventDefault();let t=Math.exp(-e.deltaY*(e.deltaMode===1?.05:e.deltaMode?1:.002));T=S(T,K(e),t,H(),E),U()}function we(e){T=S(T,K(e),2,H(),E),U()}function Te(e){if(T.k<=1)return;e.preventDefault();let t=s(`burgPreviewObject`);t.setPointerCapture(e.pointerId),t.style.cursor=`grabbing`;let n={x:e.clientX,y:e.clientY},r=e=>{let t=e;T=ae(T,t.clientX-n.x,t.clientY-n.y,H()),n={x:t.clientX,y:t.clientY},U()},i=()=>{t.removeEventListener(`pointermove`,r),t.removeEventListener(`pointerup`,i),t.removeEventListener(`pointercancel`,i),t.style.cursor=`grab`};t.addEventListener(`pointermove`,r),t.addEventListener(`pointerup`,i),t.addEventListener(`pointercancel`,i)}var q=0;function Ee(){if(!q){let e=document.createElement(`canvas`).getContext(`webgl`);q=e?e.getParameter(e.MAX_TEXTURE_SIZE):4096}return q}function De(){let{width:e,height:t}=H(),n=Math.max(e,t,1);return Ee()/2/(devicePixelRatio*n)}async function J(e){let t=(await Burgs.getPreview(e)).preview;if(!t){s(`burgPreviewSection`).style.display=`none`;return}s(`burgPreviewSection`).style.display=`block`;let n=s(`burgPreviewObject`);n.innerHTML=``;let r=document.createElement(`iframe`);if(r.style.position=`absolute`,r.style.border=`none`,r.style.pointerEvents=`none`,r.setAttribute(`sandbox`,`allow-scripts allow-same-origin`),r.src=t,n.insertBefore(r,null),k=t.includes(`watabou.github.io`),k){let e=Math.max(1,Math.min(4,De()));D=e,r.style.width=`${e*100}%`,r.style.height=`${e*100}%`,E=Math.min(32,e*2.5)}else D=1,E=32;G()}async function Oe(){let e=A(),n=pack.burgs[e],r=(await Burgs.getPreview(n)).link;r&&t(r)}async function ke(){let e=A(),t=pack.burgs[e],n=(await Burgs.getPreview(t)).link||``;prompt(`Provide custom URL to the burg map. It can be a link to a generator or just an image. Leave empty to use the default map preview`,{default:n,required:!1},e=>{e?t.link=String(e):delete t.link,J(t)})}function Y(){let e=A(),t=pack.burgs[e];y.EmblemsEditor.open(`burg`,`burgCOA${e}`,t)}function Ae(){let e=A(),t=pack.burgs[e];zoomTo(t.x,t.y,8,2e3)}var X=!1;function Z(){s(`burgRelocate`).classList.toggle(`pressed`),s(`burgRelocate`).classList.contains(`pressed`)?(o(`#viewbox`).style(`cursor`,`crosshair`).on(`click`,je),h(`Click on map to relocate burg. Hold Shift for continuous move`,!0),p.isOn(`cells`)||(p.show(`cells`),X=!0)):(g(),re(),X&&=(p.hide(`cells`),!1))}function je(t){let r=pack.cells,i=n(t,this),a=Pack.findCell(i[0],i[1]),s=A(),c=pack.burgs[s];if(r.h[a]<20&&!c.flying){h(`Cannot place burg into the water! Select a land cell`,!1,`error`);return}let l=c.flying?c.state??0:r.state[a];if(l!==c.state&&c.capital){h(`Capital cannot be relocated into another state!`,!1,`error`);return}let u=e(i[0],2),d=e(i[1],2);o(`#burgIcons`).select(`#burg${s}`).attr(`x`,u).attr(`y`,d);let f=o(`#anchors`).select(`use[data-id='${s}']`);if(f.size()){let t=+f.attr(`width`),n=e(u-t*.47,2),r=e(d-t*.47,2);f.attr(`transform`,null).attr(`x`,n).attr(`y`,r)}r.burg[c.cell]=ie(r.burg[c.cell],c,pack.burgs),r.burg[a]=ne(r.burg[a],s,!!c.flying),c.cell=a,c.state=l,c.x=u,c.y=d,c.capital&&(pack.states[l].center=c.cell),c.label&&Object.assign(c.label,{dx:0,dy:0,pathPoints:void 0}),p.draw(`labels`),t.shiftKey===!1&&Z()}function Q(){let e=A();y.NotesEditor.open(`burg${e}`,pack.burgs[e].name)}function Me(){let e=A();y.TemperatureGraph.open(e)}function Ne(){let e=A();y.ProductionOverview.open(e)}function Pe(){let e=A();pack.burgs[e].capital?(alertMessage.innerHTML=`You cannot remove the capital. You must change the state capital first`,$(`#alert`).dialog({resizable:!1,title:`Remove burg`,buttons:{Ok:function(){$(this).dialog(`close`)}}})):pack.markets?.some(t=>t.centerBurgId===e)?(alertMessage.innerHTML=`You cannot remove a market center burg. Please remove the market first`,$(`#alert`).dialog({resizable:!1,title:`Remove burg`,buttons:{Ok:function(){$(this).dialog(`close`)}}})):te({title:`Remove burg`,message:`Are you sure you want to remove the burg? <br>This action cannot be reverted`,confirm:`Remove`,onConfirm:()=>{Burgs.remove(e),d(`burg`,e),p.draw(`burgIcons`,`labels`),$(`#burgEditor`).dialog(`close`)}})}function Fe(){y.BurgGroupEditor.open()}function Ie(){s(`burgRelocate`).classList.contains(`pressed`)&&Z(),C=null,$(`#burgEditor`).dialog(`destroy`),s(`burgEditor`).remove()}function Le(e){if(!e)return``;let t=``,n=Object.entries(e).sort(([,e],[,t])=>t-e);for(let[e,r]of n){let n=Goods.get(+e);if(!n)continue;let{name:i,unit:a,icon:o}=n,s=r===1?a:`${a}s`;t+=`<span data-tip="${i}: ${r} ${s} per day">
      <svg class="resIcon" width="1em" height="1em"><use href="#${o}"></use></svg>
      <span style="margin: 0 0.2em 0 -0.2em">${r}</span>
    </span>`}return t}var Re={open:oe};export{Re as BurgEditor};