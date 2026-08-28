import{Ct as e,J as t,M as n,Tt as r,X as i,c as a,k as o,t as s,u as c,un as l,yt as u}from"./utils-D3KEhgY0.js";import{r as d,t as f}from"./tooltips-D1wvMKni.js";import{H as p,J as m,Mt as ee,Ot as h,Q as g,U as te,W as ne,q as re}from"./index-D3JPylQY.js";var _={k:1,x:0,y:0};function v({k:t,x:n,y:r},i){return{k:t,x:e(n,i.width*(1-t),0),y:e(r,i.height*(1-t),0)}}function y(t,n,r,i,a=32){let o=e(t.k*r,1,Math.max(1,a)),s=o/t.k;return v({k:o,x:n.x-(n.x-t.x)*s,y:n.y-(n.y-t.y)*s},i)}function ie(e,t,n,r){return v({k:e.k,x:e.x+t,y:e.y+n},r)}var b=null,x={..._},S=32,C=1,w=0,T=!1;function ae(e){customization||(p(`.stable`),g.show(`burgIcons`,`labels`),b=l(`#labels`).select(`[data-label-type='burg'][data-id='${e}']`),b.size()||(b=l(`#burgIcons`).select(`[data-id='${e}']`)),oe(),se(),ce(),$(`#burgEditor`).dialog({title:`Edit Burg`,resizable:!1,close:Te,position:{my:`left top`,at:`left+10 top+10`,of:`svg`,collision:`fit`}}))}function oe(){ne(`burgEditor`);let e=`<div id="burgEditor" class="dialog" data-burg-id="${E()}">
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
            <div data-tip="Burg height above mean sea level">
              <div class="label">Elevation:</div>
              <span id="burgElevation"></span> above sea level
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
    </div>`;o(`dialogs`).insertAdjacentHTML(`beforeend`,e),o(`burgName`).addEventListener(`input`,D),o(`burgNameSpeak`).addEventListener(`click`,()=>i(o(`burgName`).value)),o(`burgNameReRandom`).addEventListener(`click`,le),o(`burgGroup`).addEventListener(`change`,ue),o(`burgGroupConfigure`).addEventListener(`click`,Q),o(`burgType`).addEventListener(`change`,de),o(`burgCulture`).addEventListener(`change`,O),o(`burgNameReCulture`).addEventListener(`click`,k),o(`burgPopulation`).addEventListener(`change`,A),o(`burgBody`).querySelectorAll(`.burgFeature`).forEach(e=>void e.addEventListener(`click`,j)),o(`burgLinkOpen`).addEventListener(`click`,_e),o(`burgPreviewReset`).addEventListener(`click`,G),o(`burgPreviewObject`).addEventListener(`wheel`,fe,{passive:!1}),o(`burgPreviewObject`).addEventListener(`dblclick`,pe),o(`burgPreviewObject`).addEventListener(`pointerdown`,me),o(`burgStyleShow`).addEventListener(`click`,I),o(`burgStyleHide`).addEventListener(`click`,L),o(`burgEditLabelStyle`).addEventListener(`click`,R),o(`burgEditIconStyle`).addEventListener(`click`,B),o(`burgEditAnchorStyle`).addEventListener(`click`,V),o(`burgEmblem`).addEventListener(`click`,Y),o(`burgSetPreviewLink`).addEventListener(`click`,ve),o(`burgEditEmblem`).addEventListener(`click`,Y),o(`burgLocate`).addEventListener(`click`,ye),o(`burgEditLabel`).addEventListener(`click`,z),o(`burgRelocate`).addEventListener(`click`,Z),o(`burglLegend`).addEventListener(`click`,xe),o(`burgLock`).addEventListener(`click`,P),o(`burgRemove`).addEventListener(`click`,we),o(`burgTemperatureGraph`).addEventListener(`click`,Se),o(`burgProductionOverview`).addEventListener(`click`,Ce)}function E(){return+b.attr(`data-id`)}function se(){let e=o(`burgGroup`);e.options.length=0;for(let{name:t}of options.burgs.groups)e.options.add(new Option(t,t))}function ce(){let e=E(),t=pack.burgs[e],n=pack.cells.province[t.cell],i=n?`${pack.provinces[n].fullName}, `:``,l=pack.states[t.state].fullName||pack.states[t.state].name;o(`burgProvinceAndState`).innerHTML=i+l,o(`burgName`).value=t.name,o(`burgGroup`).value=t.group,o(`burgType`).value=t.type||`Generic`,o(`burgPopulation`).value=String(r(t.population*populationRate*urbanization)),o(`burgWealth`).innerHTML=`🟡 ${r(t.population>0?(t.product||0)/t.population:0,2)}`,o(`burgTreasury`).innerHTML=`🟡 ${r(t.treasury||0,2)}`,o(`burgEditAnchorStyle`).style.display=+t.port?`inline-block`:`none`;let u=o(`burgCulture`);u.options.length=0,pack.cultures.filter(e=>!e.removed).forEach(e=>void u.options.add(new Option(e.name,String(e.i),!1,e.i===t.culture)));let d=grid.cells.temp[pack.cells.g[t.cell]];o(`burgTemperature`).innerHTML=s(d),o(`burgTemperatureLikeIn`).dataset.tip=`Average yearly temperature is like in ${c(d)}`,o(`burgElevation`).innerHTML=a(pack.cells.h[t.cell]),o(`burgCapital`).classList.toggle(`inactive`,!t.capital),o(`burgPort`).classList.toggle(`inactive`,!t.port),o(`burgCitadel`).classList.toggle(`inactive`,!t.citadel),o(`burgWalls`).classList.toggle(`inactive`,!t.walls),o(`burgPlaza`).classList.toggle(`inactive`,!t.plaza),o(`burgTemple`).classList.toggle(`inactive`,!t.temple),o(`burgShanty`).classList.toggle(`inactive`,!t.shanty),o(`burgProduction`).innerHTML=Ee(Production.getBurgProduction(t)),F();let f=`burgCOA${e}`;ee.trigger(f,t.coa),o(`burgEmblem`).setAttribute(`href`,`#${f}`),J(t)}function D(){let e=E(),t=o(`burgName`).value;pack.burgs[e].name=t,pack.burgs[e].label||(pack.burgs[e].label={}),Object.assign(pack.burgs[e].label,{text:t}),g.draw(`labels`)}function le(){let e=u(Names.nameBases.length-1);o(`burgName`).value=Names.getBase(e),D()}function ue(){let e=E(),t=pack.burgs[e];Burgs.changeGroup(t,this.value),g.draw(`burgIcons`,`labels`)}function de(){let e=E();pack.burgs[e].type=this.value}function O(){let e=E();pack.burgs[e].culture=+this.value}function k(){let e=E(),t=pack.burgs[e].culture;o(`burgName`).value=Names.getCulture(t),D()}function A(){let e=E(),t=pack.burgs[e];pack.burgs[e].population=r(o(`burgPopulation`).valueAsNumber/populationRate/urbanization,4),J(t)}function j(){let e=E(),t=pack.burgs[e],n=this.dataset.feature,r=Number(this.classList.contains(`inactive`));n===`port`?M(e):n===`capital`?N(e):t[n]=r,this.classList.toggle(`inactive`,!t[n]),o(`burgEditAnchorStyle`).style.display=t.port?`inline-block`:`none`,J(t)}function M(e){let t=pack.burgs[e];if(t.port){t.port=0;let n=document.querySelector(`#anchors [data-id='${e}']`);n&&n.remove()}else{let{cells:e,features:n}=pack,r=e.haven[t.cell],i;if(r){let t=e.f[r],a=n[t];i=a?.type===`lake`&&a.outlet?Rivers.resolveLakeDrainFeature(t)??t:t}else if(i=Rivers.resolveDrainFeature(t.cell),!i){d(`No navigable water body found downstream, cannot assign port`,!1,`warn`);return}t.port=i,l(`#anchors`).select(`#${t.group}`).append(`use`).attr(`href`,`#icon-anchor`).attr(`id`,`anchor${t.i}`).attr(`data-id`,t.i).attr(`x`,t.x).attr(`y`,t.y)}}function N(e){let{burgs:t,states:n}=pack;if(t[e].capital){d(`To change capital please assign a capital status to another burg of this state`,!1,`error`);return}let r=t[e].state;if(!r){d(`Neutral lands cannot have a capital`,!1,`error`);return}let i=n[r].capital;n[r].capital=e,n[r].center=t[e].cell;let a=t[e];a.capital=1,Burgs.changeGroup(a);let o=t[i];o.capital=0,Burgs.changeGroup(o),g.draw(`burgIcons`,`labels`)}function P(){let e=E(),t=pack.burgs[e];t.lock=!t.lock,F()}function F(){let e=E();pack.burgs[e].lock?(o(`burgLock`).classList.remove(`icon-lock-open`),o(`burgLock`).classList.add(`icon-lock`)):(o(`burgLock`).classList.remove(`icon-lock`),o(`burgLock`).classList.add(`icon-lock-open`))}function I(){document.querySelectorAll(`#burgBottom > button`).forEach(e=>{e.style.display=`none`}),o(`burgStyleSection`).style.display=`inline-block`}function L(){document.querySelectorAll(`#burgBottom > button`).forEach(e=>{e.style.display=`inline-block`}),o(`burgStyleSection`).style.display=`none`}function R(){let e=b.node().parentNode;p(`.stable`),editStyle(`labels`,e.id)}function z(){let e=E();$(`#burgEditor`).dialog(`close`),m.LabelsEditor.open(`burg`,e)}function B(){let e=b.node().parentNode;p(`.stable`),editStyle(`burgIcons`,e.id)}function V(){let e=b.node().parentNode;p(`.stable`),editStyle(`anchors`,e.id)}function H(){let e=o(`burgPreviewObject`);return{width:e.clientWidth,height:e.clientHeight}}function U(){let e=o(`burgPreviewObject`),t=e.querySelector(`iframe`);if(!t)return;let{k:n,x:r,y:i}=x;t.style.transformOrigin=`0 0`,t.style.transform=`translate(${r}px, ${i}px) scale(${n/C})`,t.style.left=`0`,t.style.top=`0`,e.style.cursor=n>1?`grab`:`default`,clearTimeout(w),T||(w=window.setTimeout(W,200))}function W(){if(T)return;let e=o(`burgPreviewObject`).querySelector(`iframe`);if(!e)return;let{k:t,x:n,y:r}=x;C=t,e.style.width=`${t*100}%`,e.style.height=`${t*100}%`,e.style.transform=`none`,e.style.left=`${n}px`,e.style.top=`${r}px`}function G(){x={..._},clearTimeout(w),T?U():W(),o(`burgPreviewObject`).style.cursor=`default`}function K(e){let t=o(`burgPreviewObject`).getBoundingClientRect();return{x:e.clientX-t.left,y:e.clientY-t.top}}function fe(e){e.preventDefault();let t=Math.exp(-e.deltaY*(e.deltaMode===1?.05:e.deltaMode?1:.002));x=y(x,K(e),t,H(),S),U()}function pe(e){x=y(x,K(e),2,H(),S),U()}function me(e){if(x.k<=1)return;e.preventDefault();let t=o(`burgPreviewObject`);t.setPointerCapture(e.pointerId),t.style.cursor=`grabbing`;let n={x:e.clientX,y:e.clientY},r=e=>{let t=e;x=ie(x,t.clientX-n.x,t.clientY-n.y,H()),n={x:t.clientX,y:t.clientY},U()},i=()=>{t.removeEventListener(`pointermove`,r),t.removeEventListener(`pointerup`,i),t.removeEventListener(`pointercancel`,i),t.style.cursor=`grab`};t.addEventListener(`pointermove`,r),t.addEventListener(`pointerup`,i),t.addEventListener(`pointercancel`,i)}var q=0;function he(){if(!q){let e=document.createElement(`canvas`).getContext(`webgl`);q=e?e.getParameter(e.MAX_TEXTURE_SIZE):4096}return q}function ge(){let{width:e,height:t}=H(),n=Math.max(e,t,1);return he()/2/(devicePixelRatio*n)}function J(e){let t=Burgs.getPreview(e).preview;if(!t){o(`burgPreviewSection`).style.display=`none`;return}o(`burgPreviewSection`).style.display=`block`;let n=o(`burgPreviewObject`);n.innerHTML=``;let r=document.createElement(`iframe`);if(r.style.position=`absolute`,r.style.border=`none`,r.style.pointerEvents=`none`,r.setAttribute(`sandbox`,`allow-scripts allow-same-origin`),r.src=t,n.insertBefore(r,null),T=t.includes(`watabou.github.io`),T){let e=Math.max(1,Math.min(4,ge()));C=e,r.style.width=`${e*100}%`,r.style.height=`${e*100}%`,S=Math.min(32,e*2.5)}else C=1,S=32;G()}function _e(){let e=E(),n=pack.burgs[e],r=Burgs.getPreview(n).link;r&&t(r)}function ve(){let e=E(),t=pack.burgs[e];prompt(`Provide custom URL to the burg map. It can be a link to a generator or just an image. Leave empty to use the default map preview`,{default:Burgs.getPreview(t).link||``,required:!1},e=>{e?t.link=String(e):delete t.link,J(t)})}function Y(){let e=E(),t=pack.burgs[e];m.EmblemsEditor.open(`burg`,`burgCOA${e}`,t)}function ye(){let e=E(),t=pack.burgs[e];zoomTo(t.x,t.y,8,2e3)}var X=!1;function Z(){o(`burgRelocate`).classList.toggle(`pressed`),o(`burgRelocate`).classList.contains(`pressed`)?(l(`#viewbox`).style(`cursor`,`crosshair`).on(`click`,be),d(`Click on map to relocate burg. Hold Shift for continuous move`,!0),g.isOn(`cells`)||(g.show(`cells`),X=!0)):(f(),re(),X&&=(g.hide(`cells`),!1))}function be(e){let t=pack.cells,i=n(e,this),a=Pack.findCell(i[0],i[1]),o=E(),s=pack.burgs[o];if(t.h[a]<20){d(`Cannot place burg into the water! Select a land cell`,!1,`error`);return}if(t.burg[a]&&t.burg[a]!==o){d(`There is already a burg in this cell. Please select a free cell`,!1,`error`);return}let c=t.state[a];if(c!==s.state&&s.capital){d(`Capital cannot be relocated into another state!`,!1,`error`);return}let u=r(i[0],2),f=r(i[1],2);l(`#burgIcons`).select(`#burg${o}`).attr(`x`,u).attr(`y`,f);let p=l(`#anchors`).select(`use[data-id='${o}']`);if(p.size()){let e=+p.attr(`width`),t=r(u-e*.47,2),n=r(f-e*.47,2);p.attr(`transform`,null).attr(`x`,t).attr(`y`,n)}t.burg[s.cell]=0,t.burg[a]=o,s.cell=a,s.state=c,s.x=u,s.y=f,s.capital&&(pack.states[c].center=s.cell),s.label&&Object.assign(s.label,{dx:0,dy:0,pathPoints:void 0}),g.draw(`labels`),e.shiftKey===!1&&Z()}function xe(){let e=b.attr(`data-id`),t=b.text();m.NotesEditor.open(`burg${e}`,t)}function Se(){let e=+b.attr(`data-id`);m.TemperatureGraph.open(e)}function Ce(){let e=E();m.ProductionOverview.open(e)}function we(){let e=E();pack.burgs[e].capital?(alertMessage.innerHTML=`You cannot remove the capital. You must change the state capital first`,$(`#alert`).dialog({resizable:!1,title:`Remove burg`,buttons:{Ok:function(){$(this).dialog(`close`)}}})):pack.markets?.some(t=>t.centerBurgId===e)?(alertMessage.innerHTML=`You cannot remove a market center burg. Please remove the market first`,$(`#alert`).dialog({resizable:!1,title:`Remove burg`,buttons:{Ok:function(){$(this).dialog(`close`)}}})):te({title:`Remove burg`,message:`Are you sure you want to remove the burg? <br>This action cannot be reverted`,confirm:`Remove`,onConfirm:()=>{Burgs.remove(e),h(`burg`,e),g.draw(`burgIcons`,`labels`),$(`#burgEditor`).dialog(`close`)}})}function Q(){m.BurgGroupEditor.open()}function Te(){o(`burgRelocate`).classList.contains(`pressed`)&&Z(),b=null,$(`#burgEditor`).dialog(`destroy`),o(`burgEditor`).remove()}function Ee(e){if(!e)return``;let t=``,n=Object.entries(e).sort(([,e],[,t])=>t-e);for(let[e,r]of n){let n=Goods.get(+e);if(!n)continue;let{name:i,unit:a,icon:o}=n,s=r===1?a:`${a}s`;t+=`<span data-tip="${i}: ${r} ${s} per day">
      <svg class="resIcon" width="1em" height="1em"><use href="#${o}"></use></svg>
      <span style="margin: 0 0.2em 0 -0.2em">${r}</span>
    </span>`}return t}var De={open:ae};export{De as BurgEditor};