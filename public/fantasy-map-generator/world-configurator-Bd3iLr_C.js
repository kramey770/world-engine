import{A as e,F as t,Ft as n,P as r,Tt as i,k as a,mn as o,t as s,un as c}from"./utils-omhVlsRt.js";import{B as l,F as u,H as d,I as f,L as p,N as m,R as h,U as g,V as _,t as v,z as y}from"./layers-DHltDypB.js";import{r as b}from"./tooltips-BQ3W48fB.js";import{r as x}from"./dialog-helpers-CdcIkxap.js";import{n as S}from"./preferences-CXAxadCJ.js";function C(e){return function(t,n){var r=g(t*t+n*n),i=e(r),a=d(i),o=l(i);return[y(t*a,r*o),h(r&&n*a/r)]}}function w(e,t){return[l(t)*d(e),d(t)]}w.invert=C(h);function T(){return u(w).scale(249.5).clipAngle(90+_)}var E=T().translate([100,100]).scale(100),D=f(E);function O(){customization||(k(),U(),K(),G(),q(),$(`#worldConfigurator`).dialog({title:`Configure World`,resizable:!1,width:`minmax(40em, 85vw)`,buttons:{"Update world":W},open:function(){(this.parentElement?.querySelector(`.ui-dialog-buttonpane`))?.insertAdjacentHTML(`afterbegin`,`<div class="dontAsk" data-tip="Automatically update world on input changes and button clicks">
        <input id="wcAutoChange" class="checkbox" type="checkbox" checked />
        <label for="wcAutoChange" class="checkbox-label"><i>auto-apply changes</i></label>
      </div>`),(this.parentElement?.querySelector(`.ui-dialog-buttonset > button`))?.addEventListener(`mousemove`,()=>b(`Apply current settings to the map`))},close:()=>x(`worldConfigurator`)}))}function k(){x(`worldConfigurator`),a(`dialogs`).insertAdjacentHTML(`beforeend`,A()),j()}function A(){let e=(e,t,n)=>`<div>
    <i data-locked="0" id="lock_${e}" class="icon-lock-open"></i>
    <label data-tip="${n}">
      <i>${t}:</i>
      <input id="${e}Input" type="number" min="-50" max="50" />
      <span>°C<span id="${e}Converted"></span></span>
      <input id="${e}Output" type="range" min="-50" max="50" />
    </label>
  </div>`;return`<div id="worldConfigurator" class="dialog stable">
    <div style="display: flex">
      <div id="worldControls">
        ${e(`temperatureEquator`,`Equator`,`Set temperature at equator`)}
        ${e(`temperatureNorthPole`,`North Pole`,`Set the North Pole average yearly temperature`)}
        ${e(`temperatureSouthPole`,`South Pole`,`Set the South Pole average yearly temperature`)}
        <div>
          <i data-locked="0" id="lock_mapSize" class="icon-lock-open"></i>
          <label data-tip="Set map size relative to the world size">
            <i>Map size:</i>
            <input id="mapSizeInput" type="number" min="1" max="100" step="0.1" />%
            <input id="mapSizeOutput" type="range" min="1" max="100" step="0.1" />
          </label>
        </div>
        <div>
          <i data-locked="0" id="lock_latitude" class="icon-lock-open"></i>
          <label data-tip="Set a North-South map shift, set to 50 to make map center lie on Equator">
            <i>Latitudes:</i>
            <input id="latitudeInput" type="number" min="0" max="100" step="0.1" />
            <br /><i>N</i
            ><input
              id="latitudeOutput"
              type="range"
              min="0"
              max="100"
              step="0.1"
              style="width: 10.3em"
            /><i>S</i>
          </label>
        </div>
        <div>
          <i data-locked="0" id="lock_longitude" class="icon-lock-open"></i>
          <label data-tip="Set a West-East map shift, set to 50 to make map center lie on Prime meridian">
            <i>Longitudes:</i>
            <input id="longitudeInput" type="number" min="0" max="100" step="0.1" />
            <br /><i>W</i
            ><input
              id="longitudeOutput"
              type="range"
              min="0"
              max="100"
              step="0.1"
              style="width: 10.3em"
            /><i>E</i>
          </label>
        </div>
        <div>
          <label
            data-tip="Set precipitation - water amount clouds can bring. Defines rivers and biomes generation. Keep around 100% for default generation"
          >
            <i data-locked="0" id="lock_prec" class="icon-lock-open"></i>
            <i>Precipitation:</i>
            <input id="precInput" type="number" />%
            <input id="precOutput" type="range" min="0" max="500" />
          </label>
        </div>
        <div data-tip="Canvas size. Can be changed in general options on new map generation">
          <i>Canvas size:</i><br />
          <span id="mapSize"></span> px = <span id="mapSizeFriendly"></span>
        </div>
        <div>
          <i data-tip="Length of Meridian. Almost half of the equator length">Meridian length:</i><br />
          <span id="meridianLength" data-tip="Length of Meridian in pixels"></span> px =
          <span
            id="meridianLengthFriendly"
            data-tip="Length of Meridian is friendly units (depends on user configuration)"
          ></span>
          <span
            id="meridianLengthEarth"
            data-tip="Fantasy world Meridian length relative to real-world Earth (20k km)"
          ></span>
        </div>
        <div data-tip="Map coordinates on globe"><i>Coords:</i> <span id="mapCoordinates"></span></div>
      </div>
      <div style="display: flex; flex-direction: column; align-items: flex-end">
        <svg id="globe" width="22em" viewBox="-20 -25 240 240">
          <defs>
            <linearGradient id="temperatureGradient" x1="0" x2="0" y1="0" y2="1">
              <stop id="grad90" offset="0%" stop-color="blue" />
              <stop id="grad60" offset="16.6%" stop-color="green" />
              <stop id="grad30" offset="33.3%" stop-color="yellow" />
              <stop id="grad0" offset="50%" stop-color="red" />
              <stop id="grad-30" offset="66.6%" stop-color="yellow" />
              <stop id="grad-60" offset="83.3%" stop-color="green" />
              <stop id="grad-90" offset="100%" stop-color="blue" />
            </linearGradient>
          </defs>
          <g id="globeNoteLines">
            <line x1="5" x2="220" y1="0" y2="0" />
            <line x1="5" x2="220" y1="13" y2="13" />
            <line x1="5" x2="220" y1="49.5" y2="49.5" />
            <line x1="-5" x2="220" y1="100" y2="100" />
            <line x1="5" x2="220" y1="150.5" y2="150.5" />
            <line x1="5" x2="220" y1="187" y2="187" />
            <line x1="5" x2="220" y1="200" y2="200" />
          </g>
          <g id="globeWindArrows" data-tip="Click to change wind direction" stroke-linejoin="round">
            <circle cx="210" cy="6" r="12" />
            <path data-tier="0" d="M210,11 v-10 l-3,3 m6,0 l-3,-3" transform="rotate(225 210 6)" />
            <circle cx="210" cy="30" r="12" />
            <path data-tier="1" d="M210,35 v-10 l-3,3 m6,0 l-3,-3" transform="rotate(45 210 30)" />
            <circle cx="210" cy="75" r="12" />
            <path data-tier="2" d="M210,80 v-10 l-3,3 m6,0 l-3,-3" transform="rotate(225 210 75)" />
            <circle cx="210" cy="130" r="12" />
            <path data-tier="3" d="M210,135 v-10 l-3,3 m6,0 l-3,-3" transform="rotate(315 210 130)" />
            <circle cx="210" cy="173" r="12" />
            <path data-tier="4" d="M210,178 v-10 l-3,3 m6,0 l-3,-3" transform="rotate(135 210 173)" />
            <circle cx="210" cy="194" r="12" />
            <path data-tier="5" d="M210,199 v-10 l-3,3 m6,0 l-3,-3" transform="rotate(315 210 194)" />
          </g>
          <g id="globaAxisLabels">
            <text x="82%" y="-4%">wind</text>
            <text x="-8%" y="-4%">latitude</text>
          </g>
          <g id="globeLatLabels">
            <text x="-15" y="5">90°</text>
            <text x="-15" y="18">60°</text>
            <text x="-15" y="53">30°</text>
            <text x="-15" y="103">0°</text>
            <text x="-15" y="153">30°</text>
            <text x="-15" y="190">60°</text>
            <text x="-15" y="204">90°</text>
          </g>
          <circle id="globeGradient" cx="100" cy="100" r="100" fill="url(#temperatureGradient)" stroke="none" />
          <line id="globePrimeMeridian" x1="100" x2="100" y1="0" y2="200" />
          <line id="globeEquator" x1="1" x2="200" y1="100" y2="100" />
          <circle id="globeOutline" cx="100" cy="100" r="100" fill="none" />
          <path id="globeGraticule" />
          <path id="globeArea" />
        </svg>
        <button id="restoreWinds" data-tip="Click to restore default (Earth-based) wind directions">
          Restore winds
        </button>
      </div>
    </div>
    <div style="margin-top: 0.3em">
      <i>Presets:</i>
      <button id="wcWholeWorld" data-tip="Click to set map size to cover the whole world">Whole world</button>
      <button id="wcNorthern" data-tip="Click to set map size to cover the Northern latitudes">Northern</button>
      <button id="wcTropical" data-tip="Click to set map size to cover the Tropical latitudes">Tropical</button>
      <button id="wcSouthern" data-tip="Click to set map size to cover the Southern latitudes">Southern</button>
    </div>
  </div>`}function j(){c(`#globe`).select(`#globeWindArrows`).on(`click`,J),c(`#globe`).select(`#globeGraticule`).attr(`d`,t(D(p()())??``)),a(`temperatureEquatorInput`).addEventListener(`input`,I),a(`temperatureEquatorOutput`).addEventListener(`input`,I),a(`temperatureNorthPoleInput`).addEventListener(`input`,L),a(`temperatureNorthPoleOutput`).addEventListener(`input`,L),a(`temperatureSouthPoleInput`).addEventListener(`input`,R),a(`temperatureSouthPoleOutput`).addEventListener(`input`,R),a(`mapSizeInput`).addEventListener(`input`,z),a(`mapSizeOutput`).addEventListener(`input`,z),a(`latitudeInput`).addEventListener(`input`,B),a(`latitudeOutput`).addEventListener(`input`,B),a(`longitudeInput`).addEventListener(`input`,V),a(`longitudeOutput`).addEventListener(`input`,V),a(`precInput`).addEventListener(`input`,H),a(`precOutput`).addEventListener(`input`,H),a(`restoreWinds`).addEventListener(`click`,Y),a(`wcWholeWorld`).addEventListener(`click`,()=>X(100,50)),a(`wcNorthern`).addEventListener(`click`,()=>X(33,25)),a(`wcTropical`).addEventListener(`click`,()=>X(33,50)),a(`wcSouthern`).addEventListener(`click`,()=>X(33,75)),a(`worldConfigurator`).querySelectorAll(`[data-locked]`).forEach(e=>{let t=e.id.slice(5);P(e,S(t)!==null),e.addEventListener(`mouseover`,t=>{t.stopPropagation(),e.className===`icon-lock`?b(`Click to unlock the option and allow it to be randomized on new map generation`):b(`Click to lock the option and always use the current value on new map generation`)}),e.addEventListener(`click`,()=>{e.className===`icon-lock`?N(t):M(t)})})}function M(t){localStorage.setItem(t,String(options[t]));let n=e(`lock_${t}`);n&&P(n,!0)}function N(t){localStorage.removeItem(t);let n=e(`lock_${t}`);n&&P(n,!1)}function P(e,t){e.dataset.locked=t?`1`:`0`,e.className=t?`icon-lock`:`icon-lock-open`}function F(e){return a(`temperatureScale`).value===`°C`?``:` = ${s(e)}`}function I(){options.temperatureEquator=Number(this.value),a(`temperatureEquatorInput`).value=this.value,a(`temperatureEquatorOutput`).value=this.value,a(`temperatureEquatorConverted`).innerText=F(options.temperatureEquator),M(`temperatureEquator`),a(`wcAutoChange`).checked&&W()}function L(){options.temperatureNorthPole=Number(this.value),a(`temperatureNorthPoleInput`).value=this.value,a(`temperatureNorthPoleOutput`).value=this.value,a(`temperatureNorthPoleConverted`).innerText=F(options.temperatureNorthPole),M(`temperatureNorthPole`),a(`wcAutoChange`).checked&&W()}function R(){options.temperatureSouthPole=Number(this.value),a(`temperatureSouthPoleInput`).value=this.value,a(`temperatureSouthPoleOutput`).value=this.value,a(`temperatureSouthPoleConverted`).innerText=F(options.temperatureSouthPole),M(`temperatureSouthPole`),a(`wcAutoChange`).checked&&W()}function z(){options.mapSize=Number(this.value),a(`mapSizeInput`).value=this.value,a(`mapSizeOutput`).value=this.value,M(`mapSize`),a(`wcAutoChange`).checked&&W()}function B(){options.latitude=Number(this.value),a(`latitudeInput`).value=this.value,a(`latitudeOutput`).value=this.value,M(`latitude`),a(`wcAutoChange`).checked&&W()}function V(){options.longitude=Number(this.value),a(`longitudeInput`).value=this.value,a(`longitudeOutput`).value=this.value,M(`longitude`),a(`wcAutoChange`).checked&&W()}function H(){options.prec=Number(this.value),a(`precInput`).value=this.value,a(`precOutput`).value=this.value,M(`prec`),a(`wcAutoChange`).checked&&W()}function U(){a(`temperatureEquatorInput`).value=String(options.temperatureEquator),a(`temperatureEquatorOutput`).value=String(options.temperatureEquator),a(`temperatureNorthPoleInput`).value=String(options.temperatureNorthPole),a(`temperatureNorthPoleOutput`).value=String(options.temperatureNorthPole),a(`temperatureSouthPoleInput`).value=String(options.temperatureSouthPole),a(`temperatureSouthPoleOutput`).value=String(options.temperatureSouthPole),a(`mapSizeInput`).value=String(options.mapSize),a(`mapSizeOutput`).value=String(options.mapSize),a(`latitudeInput`).value=String(options.latitude),a(`latitudeOutput`).value=String(options.latitude),a(`longitudeInput`).value=String(options.longitude),a(`longitudeOutput`).value=String(options.longitude),a(`precInput`).value=String(options.prec),a(`precOutput`).value=String(options.prec),a(`temperatureEquatorConverted`).innerText=F(options.temperatureEquator),a(`temperatureNorthPoleConverted`).innerText=F(options.temperatureNorthPole),a(`temperatureSouthPoleConverted`).innerText=F(options.temperatureSouthPole)}function W(){K(),G(),Temperature.generate(),Precipitation.generate();let t=new Uint8Array(pack.cells.h);Rivers.generate(),Rivers.specify(),pack.cells.h=new Float32Array(t),Biomes.define(),Features.defineGroups(),Lakes.defineNames(),v.draw(`temperature`,`precipitation`),v.draw(`biomes`,`coordinates`,`rivers`),e(`canvas3d`)&&setTimeout(()=>window.Controllers.View3d.update(),500)}function G(){let e=graphHeight/2*100/options.mapSize;Coordinates.calculate();let n=mapCoordinates,r=distanceUnitInput.value,o=s(e*2*distanceScale);a(`mapSize`).innerHTML=`${graphWidth}x${graphHeight}`,a(`mapSizeFriendly`).innerHTML=`${i(graphWidth*distanceScale)}x${i(graphHeight*distanceScale)} ${r}`,a(`meridianLength`).innerHTML=String(i(e*2)),a(`meridianLengthFriendly`).innerHTML=`${i(e*2*distanceScale)} ${r}`,a(`meridianLengthEarth`).innerHTML=o?` = ${i(o/200)}%🌏`:``,a(`mapCoordinates`).innerHTML=`${l(n.latN??0)} ${Math.abs(i(n.lonW??0))}°W; ${l(n.latS??0)} ${i(n.lonE??0)}°E`;function s(e){return r===`km`?e:r===`mi`?e*1.60934:r===`lg`?e*4.828:r===`vr`?e*1.0668:r===`nmi`?e*1.852:r===`nlg`?e*5.556:0}function l(e){return e>0?`${Math.abs(i(e))}°N`:`${Math.abs(i(e))}°S`}let u=p().extent([[n.lonW??0,n.latN??0],[n.lonE??0,n.latS??0]]);c(`#globe`).select(`#globeArea`).attr(`d`,t(D(u.outline())??``))}function K(){let e=options.temperatureEquator,t=options.temperatureNorthPole,r=options.temperatureSouthPole,i=n(m),a=e=>i(1-e),[o,s]=[-25,30],l=s-o;c(`#globe`).select(`#grad90`).attr(`stop-color`,a((t-o)/l)),c(`#globe`).select(`#grad60`).attr(`stop-color`,a((e-(e-t)*2/3-o)/l)),c(`#globe`).select(`#grad30`).attr(`stop-color`,a((e-(e-t)*1/4-o)/l)),c(`#globe`).select(`#grad0`).attr(`stop-color`,a((e-o)/l)),c(`#globe`).select(`#grad-30`).attr(`stop-color`,a((e-(e-r)*1/4-o)/l)),c(`#globe`).select(`#grad-60`).attr(`stop-color`,a((e-(e-r)*2/3-o)/l)),c(`#globe`).select(`#grad-90`).attr(`stop-color`,a((r-o)/l))}function q(){c(`#globe`).select(`#globeWindArrows`).selectAll(`path`).each(function(e,t){let n=r(this.getAttribute(`transform`)??``);this.setAttribute(`transform`,`rotate(${options.winds[t]} ${n[1]} ${n[2]})`)})}function J(e){let t=e.target,n=t.tagName===`path`?t:t.nextElementSibling;if(!n?.dataset.tier)return;let i=+n.dataset.tier;options.winds[i]=(options.winds[i]+45)%360;let s=r(n.getAttribute(`transform`)??``);n.setAttribute(`transform`,`rotate(${options.winds[i]} ${s[1]} ${s[2]})`),localStorage.setItem(`winds`,String(options.winds));let c=o(mapCoordinates.latN??0,mapCoordinates.latS??0,-30).map(e=>(90-e)/30|0);a(`wcAutoChange`).checked&&c.includes(i)&&W()}function Y(){let e=[225,45,225,315,135,315],t=o(mapCoordinates.latN??0,mapCoordinates.latS??0,-30).map(e=>(90-e)/30|0),n=a(`wcAutoChange`).checked&&t.some(t=>options.winds[t]!==e[t]);options.winds=e,q(),n&&W()}function X(e,t){options.mapSize=e,options.latitude=t,U(),M(`mapSize`),M(`latitude`),a(`wcAutoChange`).checked&&W()}var Z={open:O};export{Z as WorldConfigurator};