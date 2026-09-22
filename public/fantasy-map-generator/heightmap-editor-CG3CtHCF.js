import{$t as e,A as t,C as n,Cn as r,Ct as i,E as a,Et as o,Jt as s,M as c,S as l,Wt as u,Xt as d,Yt as f,Zt as p,_n as ee,_t as m,dn as h,hn as g,k as _,nn as v,q as y,rn as te,tn as ne,wn as re,wt as ie}from"./utils-BXw8fBj4.js";import{O as ae,t as b}from"./layers-_nptVsMl.js";import{t as oe}from"./mean-4Awewi9R.js";import{t as se}from"./drag-BxIG-06a.js";import{n as ce}from"./sin-DXK16t1M.js";import{u as le}from"./megalopolis-BpsA5rhH.js";import{n as ue,r as x,t as de}from"./tooltips-0xeyl30m.js";import{i as fe,n as pe,r as S,t as C}from"./dialog-helpers-DT2MP2B1.js";import{t as w}from"./state-CHxunpWe.js";import{n as me,t as he}from"./brush-circle-5_MK8VXE.js";import{P as T,j as ge,p as _e,t as ve}from"./index-CHSGsxIV.js";import{t as ye}from"./graph-override-DQqBictu.js";var E=18,be=.96422,xe=1,Se=.82521,Ce=4/29,D=6/29,we=3*D*D,Te=D*D*D;function Ee(e){if(e instanceof O)return new O(e.l,e.a,e.b,e.opacity);if(e instanceof N)return Ae(e);e instanceof p||(e=ne(e));var t=M(e.r),n=M(e.g),r=M(e.b),i=k((.2225045*t+.7168786*n+.0606169*r)/xe),a,o;return t===n&&n===r?a=o=i:(a=k((.4360747*t+.3850649*n+.1430804*r)/be),o=k((.0139322*t+.0971045*n+.7141733*r)/Se)),new O(116*i-16,500*(a-i),200*(i-o),e.opacity)}function De(e,t,n,r){return arguments.length===1?Ee(e):new O(e,t,n,r??1)}function O(e,t,n,r){this.l=+e,this.a=+t,this.b=+n,this.opacity=+r}v(O,De,te(d,{brighter(e){return new O(this.l+E*(e??1),this.a,this.b,this.opacity)},darker(e){return new O(this.l-E*(e??1),this.a,this.b,this.opacity)},rgb(){var e=(this.l+16)/116,t=isNaN(this.a)?e:e+this.a/500,n=isNaN(this.b)?e:e-this.b/200;return t=be*A(t),e=xe*A(e),n=Se*A(n),new p(j(3.1338561*t-1.6168667*e-.4906146*n),j(-.9787684*t+1.9161415*e+.033454*n),j(.0719453*t-.2289914*e+1.4052427*n),this.opacity)}}));function k(e){return e>Te?e**(1/3):e/we+Ce}function A(e){return e>D?e*e*e:we*(e-Ce)}function j(e){return 255*(e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055)}function M(e){return(e/=255)<=.04045?e/12.92:((e+.055)/1.055)**2.4}function Oe(e){if(e instanceof N)return new N(e.h,e.c,e.l,e.opacity);if(e instanceof O||(e=Ee(e)),e.a===0&&e.b===0)return new N(NaN,0<e.l&&e.l<100?0:NaN,e.l,e.opacity);var t=Math.atan2(e.b,e.a)*s;return new N(t<0?t+360:t,Math.sqrt(e.a*e.a+e.b*e.b),e.l,e.opacity)}function ke(e,t,n,r){return arguments.length===1?Oe(e):new N(e,t,n,r??1)}function N(e,t,n,r){this.h=+e,this.c=+t,this.l=+n,this.opacity=+r}function Ae(e){if(isNaN(e.h))return new O(e.l,0,0,e.opacity);var t=e.h*f;return new O(e.l,Math.cos(t)*e.c,Math.sin(t)*e.c,e.opacity)}v(N,ke,te(d,{brighter(e){return new N(this.h,this.c,this.l+E*(e??1),this.opacity)},darker(e){return new N(this.h,this.c,this.l-E*(e??1),this.opacity)},rgb(){return Ae(this).rgb()}}));var je=1;function Me(e){let{seed:t,graphWidth:n,graphHeight:r,cellsDesired:i,heights:a}=e;return JSON.stringify({type:`fmgHeightmapDraft`,version:je,seed:t,graphWidth:n,graphHeight:r,cellsDesired:i,heights:Pe(a)})}function Ne(e){let t;try{t=JSON.parse(e)}catch{throw Error(`File is not a valid heightmap draft`)}if(!t||t.type!==`fmgHeightmapDraft`)throw Error(`File is not a valid heightmap draft`);if(t.version!==je)throw Error(`Unsupported heightmap draft version: ${t.version}`);let{seed:n,graphWidth:r,graphHeight:i,cellsDesired:a,heights:o}=t;if(typeof n!=`string`||typeof r!=`number`||typeof i!=`number`||typeof a!=`number`||typeof o!=`string`)throw Error(`Heightmap draft is missing required fields`);return{seed:n,graphWidth:r,graphHeight:i,cellsDesired:a,heights:Fe(o)}}function Pe(e){let t=``,n=32768;for(let r=0;r<e.length;r+=n)t+=String.fromCharCode(...e.subarray(r,r+n));return btoa(t)}function Fe(e){let t=atob(e),n=new Uint8Array(t.length);for(let e=0;e<t.length;e++)n[e]=t.charCodeAt(e);return n}var P=`heightmapEditor`,F;function Ie(e){F=w.get(P,`filters`,()=>({cellType:`all`})),[`all`,`land`,`water`].includes(F.cellType)||(F.cellType=`all`),w.set(P,`filters`,F);let{mode:t,tool:n}=e||{};K(),h(`#viewbox`).selectAll(`#heights`).remove(),h(`#viewbox`).insert(`g`,`#terrs`).attr(`id`,`heights`),t?I(t,n):We(n)}Be();function Le(){S(`templateEditor`),_(`dialogs`).insertAdjacentHTML(`beforeend`,`<div id="templateEditor" class="dialog stable">
      <div id="templateTop">
        <i>Select template: </i>
        <select id="templateSelect" style="width: 16em" data-prev="templateCustom" data-tip="Select base template">
          <option value="custom" selected>Custom</option>
          <option value="volcano">Volcano</option>
          <option value="highIsland">High Island</option>
          <option value="lowIsland">Low Island</option>
          <option value="continents">Continents</option>
          <option value="archipelago">Archipelago</option>
          <option value="atoll">Atoll</option>
          <option value="mediterranean">Mediterranean</option>
          <option value="peninsula">Peninsula</option>
          <option value="pangea">Pangea</option>
          <option value="isthmus">Isthmus</option>
          <option value="shattered">Shattered</option>
          <option value="taklamakan">Taklamakan</option>
          <option value="oldWorld">Old World</option>
          <option value="fractious">Fractious</option>
        </select>
      </div>
      <div id="templateTools">
        <button data-type="Hill" data-tip="Hill: small blob">H</button>
        <button data-type="Pit" data-tip="Pit: round depression">P</button>
        <button data-type="Range" data-tip="Range: elongated elevation">R</button>
        <button data-type="Trough" data-tip="Trough: elongated depression">T</button>
        <button data-type="Strait" data-tip="Strait: centered vertical or horizontal depression">S</button>
        <button data-type="Mask" data-tip="Mask: lower cells near edges or in map center">M</button>
        <button data-type="Invert" data-tip="Invert heightmap along the axes">I</button>
        <button data-type="Add" data-tip="Add or subtract value from all heights in range">+</button>
        <button data-type="Multiply" data-tip="Multiply all heights in range by factor">*</button>
        <button
          data-type="Smooth"
          data-tip="Smooth the map replacing cell heights by an average values of its neighbors"
        >
          ~
        </button>
      </div>
      <div id="templateBody" data-changed="0" class="table" style="padding: 2px 0">
        <div data-type="Hill">
          <div class="icon-check" data-tip="Click to skip the step"></div>
          <div style="width: 4em">Hill</div>
          <i class="icon-trash-empty pointer" data-tip="Remove the step"></i>
          <i class="icon-resize-vertical" data-tip="Drag to reorder"></i>
          <span
            >y:<input class="templateY" data-tip="Y axis position in percentage (minY-maxY or Y)" value="47-53"
          /></span>
          <span
            >x:<input class="templateX" data-tip="X axis position in percentage (minX-maxX or X)" value="65-75"
          /></span>
          <span
            >h:<input
              class="templateHeight"
              data-tip="Blob maximum height, use hyphen to get a random number in range"
              value="90-100"
          /></span>
          <span
            >n:<input
              class="templateCount"
              data-tip="Blobs to add, use hyphen to get a random number in range"
              value="1"
          /></span>
        </div>
      </div>
      <div id="templateBottom">
        <button id="templateRun" data-tip="Execute the template" class="icon-play-circled2"></button>
        <button id="templateUndo" data-tip="Undo the latest action" class="icon-ccw" disabled></button>
        <button id="templateRedo" data-tip="Redo the action" class="icon-cw" disabled></button>
        <button id="templateSave" data-tip="Download the template as a text file" class="icon-download"></button>
        <button id="templateLoad" data-tip="Open previously downloaded template" class="icon-upload"></button>
        <button
          id="templateCA"
          data-tip="Find or share custom template on Cartography Assets portal"
          class="icon-drafting-compass"
          onclick="
            openURL('https://cartographyassets.com/asset-category/specific-assets/azgaars-generator/templates')
          "
        ></button>
        <button
          id="templateTutorial"
          data-tip="Open Template Editor Tutorial"
          class="icon-info"
          onclick="wiki('Heightmap-template-editor')"
        ></button>
        <label
          data-tip="Enter seed for template to generate the same heightmap each time"
        >
          Seed: <input id="templateSeed" value="" type="number" min="1" max="999999999" step="1" style="width: 8em" />
        </label>
      </div>
    </div>`);let e=_(`templateBody`);$(`#templateBody`).sortable({items:`> div`,handle:`.icon-resize-vertical`,containment:`#templateBody`,axis:`y`}),e.addEventListener(`click`,t=>{let n=t.target;if(n.classList.contains(`icon-check`)){n.classList.remove(`icon-check`),n.classList.add(`icon-check-empty`),n.parentElement.style.opacity=`0.5`,e.dataset.changed=`1`;return}if(n.classList.contains(`icon-check-empty`)){n.classList.add(`icon-check`),n.classList.remove(`icon-check-empty`),n.parentElement.style.opacity=`1`;return}n.classList.contains(`icon-trash-empty`)&&n.parentElement.remove()}),_(`templateEditor`).addEventListener(`keypress`,e=>{e.key===`Enter`&&(e.preventDefault(),bt())}),_(`templateTools`).addEventListener(`click`,ht),_(`templateSelect`).addEventListener(`change`,vt),_(`templateRun`).addEventListener(`click`,bt),_(`templateUndo`).addEventListener(`click`,()=>G(edits.n-1)),_(`templateRedo`).addEventListener(`click`,()=>G(edits.n+1)),_(`templateSave`).addEventListener(`click`,xt),_(`templateLoad`).addEventListener(`click`,()=>_(`templateToLoad`).click()),_(`templateToLoad`).onchange=()=>{a(_(`templateToLoad`),St)}}function Re(){S(`imageConverter`),_(`dialogs`).insertAdjacentHTML(`beforeend`,`<div id="imageConverter" class="dialog stable">
      <div id="convertImageButtons">
        <button id="convertImageLoad" data-tip="Load image to convert" class="icon-upload"></button>
        <button
          id="convertAutoLum"
          data-tip="Auto-assign colors based on liminosity (good for monochrome images)"
          class="icon-adjust"
        ></button>
        <button
          id="convertAutoHue"
          data-tip="Auto-assign colors based on hue (good for colored images)"
          class="icon-paint-roller"
        ></button>
        <button
          id="convertAutoFMG"
          data-tip="Auto-assign colors using generator scheme (for exported colored heightmaps)"
          class="icon-layer-group"
        ></button>
        <button id="convertColorsButton" data-tip="Set maximum number of colors" class="icon-signal"></button>
        <input id="convertColors" value="100" style="display: none" />
        <button
          id="convertCancel"
          data-tip="Cancel the conversion. Previous heightmap will be restored"
          class="icon-cancel"
        ></button>
      </div>
      <div data-tip="Set opacity of the loaded image" style="padding-top: 0.4em">
        <i>Overlay opacity:</i><br />
        <input id="convertOverlay" type="range" min="0" max="1" step=".01" value="0" style="width: 12.6em" />
        <input id="convertOverlayNumber" type="number" min="0" max="1" step=".01" value="0" style="width: 4.2em" />
      </div>
      <div data-tip="Select a color below and assign a height value for it" id="colorsSelect" style="display: none">
        <i>Set height: </i>
        <span id="colorsSelectValue"></span>
        <span>(<span id="colorsSelectFriendly">0</span>)</span><br />
        <div id="imageConverterPalette"></div>
      </div>
      <div data-tip="Select a color to re-assign the height value" id="colorsAssigned" style="display: none">
        <i>Assigned colors (<span id="colorsAssignedNumber"></span>):</i>
        <div id="colorsAssignedContainer" class="colorsContainer"></div>
      </div>
      <div data-tip="Select a color to assign a height value" id="colorsUnassigned" style="display: none">
        <i>Unassigned colors (<span id="colorsUnassignedNumber"></span>):</i>
        <div id="colorsUnassignedContainer" class="colorsContainer"></div>
      </div>
      <button
        id="convertComplete"
        data-tip="Complete the conversion. All unassigned colors will be considered as ocean"
        style="margin: 0.4em 0"
        class="glow"
      >
        Complete the conversion
      </button>
    </div>`),h(`#imageConverterPalette`).selectAll(`div`).data(g(101)).enter().append(`div`).attr(`data-color`,e=>e).style(`background-color`,e=>color(1-(e<20?e-5:e)/100)).style(`width`,e=>e<40||e>68?`.2em`:`.1em`).on(`touchmove mousemove`,wt).on(`click`,Ot),_(`convertImageLoad`).addEventListener(`click`,()=>_(`imageToLoad`).click()),_(`imageToLoad`).onchange=()=>Tt.call(_(`imageToLoad`)),_(`convertAutoLum`).addEventListener(`click`,()=>Z(`lum`)),_(`convertAutoHue`).addEventListener(`click`,()=>Z(`hue`)),_(`convertAutoFMG`).addEventListener(`click`,()=>Z(`scheme`)),_(`convertColorsButton`).addEventListener(`click`,kt),_(`convertComplete`).addEventListener(`click`,jt),_(`convertCancel`).addEventListener(`click`,Mt),_(`convertOverlay`).addEventListener(`input`,function(){At(+this.value)}),_(`convertOverlayNumber`).addEventListener(`input`,function(){At(+this.value)})}var ze=[];function Be(){_(`paintBrushes`).addEventListener(`click`,q),_(`applyTemplate`).addEventListener(`click`,pt),_(`convertImage`).addEventListener(`click`,Ct),_(`heightmapPreview`).addEventListener(`click`,Ft),_(`heightmap3DView`).addEventListener(`click`,changeViewMode),_(`finalizeHeightmap`).addEventListener(`click`,Ke),_(`renderOcean`).addEventListener(`click`,B),_(`saveHeightmapDraft`).addEventListener(`click`,Ve),_(`loadHeightmapDraft`).addEventListener(`click`,()=>_(`heightmapDraftToLoad`).click()),_(`heightmapDraftToLoad`).addEventListener(`change`,function(){a(this,He)})}function Ve(){let e=Me({seed:String(seed),graphWidth,graphHeight,cellsDesired:grid.cellsDesired,heights:Uint8Array.from(grid.cells.h)});l(e,`${n(`Draft`)}.heightmap`,`application/json`),x(`Heightmap draft is saved. Load it later via the Load Draft button to continue painting`,!0,`success`,6e3)}function He(e){let t;try{t=Ne(e)}catch(e){x(e.message,!1,`error`,6e3);return}if(!grid.cells.h?.some(e=>e>0)){Ue(t);return}pe({title:`Load heightmap draft`,message:`Loading a draft will replace the current heightmap. Are you sure you want to proceed?`,confirm:`Load`,onConfirm:()=>Ue(t)})}function Ue(e){let t=_(`pointsInput`),n=t.dataset.cells;t.dataset.cells=String(e.cellsDesired);let r;try{r=Grid.generate(e.seed,e.graphWidth,e.graphHeight)}finally{t.dataset.cells=n}if(r.points.length!==e.heights.length){x(`Heightmap draft does not match its grid and cannot be loaded`,!1,`error`,6e3);return}seed=e.seed,_(`optionsSeed`).value=e.seed,graphWidth=e.graphWidth,graphHeight=e.graphHeight;let i=Object.keys(cellsDensityMap).find(t=>cellsDensityMap[+t]===e.cellsDesired);i&&(t.value=i),t.dataset.cells=String(e.cellsDesired),r.cells.h=Uint8Array.from(e.heights),grid=r,fitMapToScreen(),B(),K(),x(`Heightmap draft is loaded`,!0,`success`,4e3)}function We(e){alertMessage.innerHTML=`Heightmap is a core element on which all other data (rivers, burgs, states etc) is based. So the best edit approach is to
    <i>erase</i> the secondary data and let the system automatically regenerate it on edit completion.
    <p><i>Erase</i> mode also allows you Convert an Image into a heightmap or use Template Editor.</p>
    <p>You can <i>keep</i> the data, but you won't be able to change the coastline.</p>
    <p>Try <i>risk</i> mode to change the coastline and keep the data. The data will be restored as much as possible, but it can cause unpredictable errors.</p>
    <p>Please <span class="pseudoLink" onclick="window.Services.Save.saveMap('machine')">save the map</span> before editing the heightmap!</p>
    <p style="margin-bottom: 0">Check out ${y(`https://github.com/Azgaar/Fantasy-Map-Generator/wiki/Heightmap-customization`,`wiki`)} for guidance.</p>`,$(`#alert`).dialog({resizable:!1,title:`Edit Heightmap`,width:`28em`,buttons:{Erase:()=>I(`erase`,e),Keep:()=>I(`keep`,e),Risk:()=>I(`risk`,e),Cancel:function(){$(this).dialog(`close`)}}})}function I(e,n){ze=b.state.active,b.set([]),customization=1,C(),x(`Heightmap edit mode is active. Click on "Exit Customization" to finalize the heightmap`,!0),_(`options`).querySelectorAll(`.tabcontent`).forEach(e=>{e.style.display=`none`}),_(`options`).querySelector(`.tab > .active`).classList.remove(`active`),_(`customizationMenu`).style.display=`block`,_(`toolsTab`).classList.add(`active`),_(`heightmapEditMode`).innerHTML=e,e===`erase`?(undraw(),F.cellType=`all`):e===`keep`?(b.get(`landmass`).getEl().replaceChildren(),F.cellType=`land`):e===`risk`&&(h(`#deftemp`).selectAll(`#land, #water`).selectAll(`path`).remove(),h(`#deftemp`).select(`#featurePaths`).selectAll(`path`).remove(),h(`#viewbox`).selectAll(`#coastline use, #lakes path, #oceanLayers path`).remove(),F.cellType=`all`);let r=t(`cellTypeFilter`);r&&(r.value=F.cellType),w.set(P,`filters`,F),_(`applyTemplate`).style.display=e===`erase`?`inline-block`:`none`,_(`convertImage`).style.display=e===`erase`?`inline-block`:`none`,_(`saveHeightmapDraft`).style.display=e===`erase`?`inline-block`:`none`,_(`loadHeightmapDraft`).style.display=e===`erase`?`inline-block`:`none`,_(`allowErosionBox`).style.display=e===`keep`?`none`:`inline-block`;let i=_(`exitCustomization`);if(sessionStorage.getItem(`noExitButtonAnimation`))i.style.display=`block`;else{sessionStorage.setItem(`noExitButtonAnimation`,`true`),i.style.opacity=`0`;let e=12*_(`uiSize`).value*11;i.style.right=`${(svgWidth-e)/2}px`,i.style.bottom=`${svgHeight/2}px`,i.style.transform=`scale(2)`,i.style.display=`block`,h(`#exitCustomization`).transition().duration(1e3).style(`opacity`,1).transition().duration(2e3).ease(ce).style(`right`,`10px`).style(`bottom`,`10px`).style(`transform`,`scale(1)`)}let a=_(`layersPreset`);a.value=`heightmap`,a.disabled=!0,B(),h(`#viewbox`).on(`touchmove mousemove`,Ge),h(`#map`).on(`dblclick.zoom`,null),n===`templateEditor`?pt():n===`imageConverter`?Ct():q()}function Ge(e){let[n,r]=c(e,this),i=Grid.findCell(n,r);_(`heightmapInfoX`).innerHTML=String(o(n)),_(`heightmapInfoY`).innerHTML=String(o(r)),_(`heightmapInfoCell`).innerHTML=String(i),_(`heightmapInfoHeight`).innerHTML=`${grid.cells.h[i]} (${L(grid.cells.h[i])})`,_(`tooltip`).dataset.main&&ue();let a=t(`brushesButtons`)?.querySelector(`button.pressed`);if(a){if(a.id===`brushLine`){h(`#debug`).select(`line`).attr(`x2`,n).attr(`y2`,r);return}if(a.id===`brushFill`){me();return}he(n,r,_(`heightmapBrushRadius`).valueAsNumber)}}function L(e){let t=heightUnit.value,n=3.281;t===`m`?n=1:t===`f`&&(n=.5468);let r=-990;return e>=20?r=(e-18)**heightExponentInput.value:e<20&&e>0&&(r=(e-20)/e*50),`${o(r*n)} ${t}`}async function Ke(){if(h(`#viewbox`).select(`#heights`).selectAll(`*`).size()<200){x(`Insufficient land area. There should be at least 200 land cells!`,!1,`error`);return}if(t(`imageConverter`)){x(`Please exit the Image Conversion mode first`,!1,`error`);return}window.edits=void 0,U(!0,!0),customization=0,_(`customizationMenu`).style.display=`none`,_(`options`).querySelector(`.tab > button.active`).id===`toolsTab`&&(_(`toolsContent`).style.display=`block`),_(`layersPreset`).disabled=!1,_(`exitCustomization`).style.display=`none`,ge(),de(),C(),resetZoom(),document.getElementById(`preview`)?.remove(),document.getElementById(`canvas3d`)&&T.View3d.enterStandard();let e=_(`heightmapEditMode`).innerHTML;try{e===`erase`?await qe():e===`keep`?Je():e===`risk`&&Xe()}catch(e){ERROR&&console.error(e),x(`Failed to apply the edited heightmap: ${e.message}`,!1,`error`,6e3)}h(`#viewbox`).selectAll(`#heights`).remove(),b.draw(`ocean`,`landmass`,`lakes`,`coastline`),b.set(ze)}async function qe(){pack.cultures=[],pack.burgs=[],pack.states=[],pack.provinces=[],pack.religions=[],pack.relief=[];let e=_(`allowErosion`).checked;await ve.run({erosion:e})}function Je(){for(let e of pack.cells.i)pack.cells.h[e]=grid.cells.h[pack.cells.g[e]]}var Ye=e=>{let t=[];for(let n=0;n<e.p.length;n++)e.h[n]>=20&&t.push([e.p[n][0],e.p[n][1],n]);let n=le(t);return(e,t)=>{let r=n.find(e,t);if(r)return n.remove(r),r[2]}};function Xe(){INFO&&console.group(`Edit Heightmap`),TIME&&console.time(`restoreRiskedData`);let e=_(`allowErosion`).checked,t=grid.cells.i.length,n=new Uint8Array(t),r=new Uint16Array(t),i={},a=new Uint16Array(t),o=new Uint32Array(t),s=new Uint16Array(t),c=new Uint16Array(t),l=new Uint16Array(t),u=new Uint16Array(t),d=new Uint16Array(t),f=new Uint16Array(t),p=new Uint16Array(t),ee=new Uint8Array(t);for(let t of pack.cells.i){let m=pack.cells.g[t];n[m]=pack.cells.biome[t],l[m]=pack.cells.culture[t],r[m]=pack.cells.pop[t],i[m]=pack.cells.routes[t],a[m]=pack.cells.s[t],s[m]=pack.cells.state[t],c[m]=pack.cells.province[t],o[m]=pack.cells.burg[t],u[m]=pack.cells.religion[t],d[m]=pack.cells.good?.[t]||0,e||(f[m]=pack.cells.fl[t],p[m]=pack.cells.r[t],ee[m]=pack.cells.conf[t])}for(let e of grid.cells.i)o[e]&&grid.cells.h[e]<20&&(grid.cells.h[e]=20);for(let e of pack.cultures){if(!e.i||e.removed)continue;let t=pack.cells.p[e.center];e.x=t[0],e.y=t[1]}let m=new Map;for(let e of pack.zones){if(!e.cells?.length)continue;let t=e.cells.map(e=>pack.cells.g[e]);m.set(e.i,re(t))}Features.markupGrid(),e&&Grid.addDeepDepressionLakes(),Temperature.generate(),Precipitation.generate(),Pack.generate(),Features.markupPack(),ye.restore(),e&&(Rivers.generate(!0),Features.defineGroups());let g=pack.cells.i.length;pack.cells.pop=new Float32Array(g),pack.cells.routes={},pack.cells.s=new Uint16Array(g),pack.cells.burg=new Uint32Array(g),pack.cells.state=new Uint16Array(g),pack.cells.province=new Uint16Array(g),pack.cells.culture=new Uint16Array(g),pack.cells.religion=new Uint16Array(g),pack.cells.biome=new Uint8Array(g),pack.cells.good=new Uint16Array(g),e||(pack.cells.r=new Uint16Array(g),pack.cells.conf=new Uint8Array(g),pack.cells.fl=new Uint16Array(g));for(let t of pack.cells.i){let o=pack.cells.g[t],m=pack.cells.h[t]>=20;e||(pack.cells.r[t]=p[o],pack.cells.conf[t]=ee[o],pack.cells.fl[t]=f[o]),pack.cells.biome[t]=m&&n[o]?n[o]:Biomes.getId(grid.cells.prec[o],grid.cells.temp[o],pack.cells.h[t],!!pack.cells.r[t]),pack.cells.good[t]=d[o],m&&(pack.cells.culture[t]=l[o],pack.cells.pop[t]=r[o],pack.cells.routes[t]=i[o],pack.cells.s[t]=a[o],pack.cells.state[t]=s[o],pack.cells.province[t]=c[o],pack.cells.religion[t]=u[o])}let v=Ye(pack.cells);for(let e of pack.burgs){if(!e.i||e.removed)continue;let t=v(e.x,e.y);if(t===void 0){ERROR&&console.error(`[Data integrity] Burg ${e.i} has no available land cell after Risk restoration. Removing the burg`),Burgs.remove(e.i),ae(`burg`,e.i);continue}e.cell=t,e.feature=pack.cells.f[e.cell],pack.cells.burg[e.cell]=e.i,!e.capital&&pack.cells.h[e.cell]<20&&(Burgs.remove(e.i),ae(`burg`,e.i)),e.capital&&(pack.states[e.state].center=e.cell)}for(let e of pack.provinces){if(!e.i||e.removed)continue;let t=pack.cells.i.filter(t=>pack.cells.province[t]===e.i);if(!t.length){let t=e.state,n=pack.states[t].provinces;n.includes(e.i)&&pack.states[t].provinces.splice(n.indexOf(e.i),1),e.removed=!0;continue}e.burg&&!pack.burgs[e.burg].removed?e.center=pack.burgs[e.burg].cell:(e.center=t[0],e.burg=pack.cells.burg[e.center])}for(let e of pack.cultures)e.i&&!e.removed&&(e.center=Pack.findCell(e.x,e.y));States.getPoles(),States.findNeighbors(),States.collectStatistics(),e&&(Rivers.specify(),Lakes.defineNames());let y=new Map;for(let e of pack.cells.i){let t=pack.cells.g[e];y.has(t)||y.set(t,[]),y.get(t).push(e)}for(let e of pack.zones){let t=m.get(e.i);if(t?.length){let n=t.flatMap(e=>y.get(e)||[]);e.cells=re(n)}else e.cells=[]}pack.goods?.length?(pack.markets=(pack.markets||[]).filter(e=>{let t=pack.burgs[e.centerBurgId];return!(!t||t.removed)}),Production.regenerateEconomy(),b.draw(`markets`,`goods`),b.draw(`trade`),fe()):(Goods.generate(),Markets.generate(),Production.produce(),States.collectTaxes()),Ice.generate(),h(`#ice`).selectAll(`*`).remove(),TIME&&console.timeEnd(`restoreRiskedData`),INFO&&console.groupEnd()}function R(){let e=r(edits),n=grid.cells.h.reduce((t,n,r)=>n===e[r]?t:t+1,0);if(x(`Cells changed: ${n}`),!n)return;let i=t(`cellTypeFilter`)?.value??F.cellType;if(i===`land`)for(let t of grid.cells.i)(e[t]<20||grid.cells.h[t]<20)&&(grid.cells.h[t]=e[t]);if(i===`water`)for(let t of grid.cells.i)(e[t]>=20||grid.cells.h[t]>=20)&&(grid.cells.h[t]=e[t]);B(),W()}function z(e,t=getColorScheme(`bright`)){return t(1-(e<20?e-5:e)/100)}function B(){let e=Array.from(grid.cells.i),t=_(`renderOcean`).checked?e:e.filter(e=>grid.cells.h[e]>=20);h(`#viewbox`).select(`#heights`).selectAll(`polygon`).data(t).join(`polygon`).attr(`points`,e=>String(Grid.getPolygon(e))).attr(`id`,e=>`cell${e}`).attr(`fill`,e=>z(grid.cells.h[e]))}function V(e){let t=_(`renderOcean`).checked;e.forEach(e=>{let n=h(`#viewbox`).select(`#heights`).select(`#cell${e}`);if(!t&&grid.cells.h[e]<20){n.remove();return}n.size()||(n=h(`#viewbox`).select(`#heights`).append(`polygon`).attr(`points`,String(Grid.getPolygon(e))).attr(`id`,`cell${e}`)),n.attr(`fill`,z(grid.cells.h[e]))})}function H(){let e=grid.cells.h.reduce((e,t)=>t>=20?e+1:e,0);_(`landmassCounter`).innerText=`${e} (${o(e/grid.cells.i.length*100)}%)`,_(`landmassAverage`).innerText=String(o(oe(grid.cells.h)??0))}function U(e,n){let r=(r,i)=>{let a=t(r);a&&(a.disabled=e);let o=t(i);o&&(o.disabled=n)};r(`undo`,`redo`),r(`templateUndo`,`templateRedo`)}function W(e){let t=edits.n;edits=edits.slice(0,t),edits[t]=grid.cells.h.slice(),edits.n=t+1,U(edits.n<=1,!0),e||(H(),document.getElementById(`preview`)&&Q(),document.getElementById(`canvas3d`)&&T.View3d.redraw())}function G(e){edits.n=e,U(edits.n<=1,edits.n>=edits.length),edits[edits.n-1]!==void 0&&(grid.cells.h=edits[edits.n-1].slice(),B(),H(),document.getElementById(`preview`)&&Q(),document.getElementById(`canvas3d`)&&T.View3d.redraw())}function K(){window.edits=[],edits.n=0,U(!0,!0),W()}function q(){document.getElementById(`brushesPanel`)||(Ze(),$(`#brushesPanel`).dialog({title:`Paint Brushes`,resizable:!1,position:{my:`right top`,at:`right-10 top+10`,of:`svg`},close:Qe}))}function Ze(){S(`brushesPanel`);let e=`<div id="brushesPanel" class="dialog stable">
    <div id="brushesButtons" style="display: inline-block">
      <button id="brushRaise" data-tip="Raise brush: increase height of cells in radius by Power value">
        <svg viewBox="15 15 70 70" height="1em" width="1.6em">
          <path d="m20,39 h60 M50,85 v-35 l-12,8 m12,-8 l12,8" fill="none" stroke="#000" stroke-width="5" />
        </svg>
      </button>
      <button id="brushElevate" data-tip="Elevate brush: drag to gradually increase height of cells in radius by Power value">
        <svg viewBox="15 15 70 70" height="1em" width="1.6em">
          <path d="m20,50 q30,-35 60,0 M50,85 v-35 l-12,8 m12,-8 l12,8" fill="none" stroke="#000" stroke-width="5" />
        </svg>
      </button>
      <button id="brushLower" data-tip="Lower brush: drag to decrease height of cells in radius by Power value">
        <svg viewBox="15 15 70 70" height="1em" width="1.6em">
          <path d="M50,30 v35 l-12,-8 m12,8 l12,-8 M20,78 h60" fill="none" stroke="#000" stroke-width="5" />
        </svg>
      </button>
      <button id="brushDepress" data-tip="Depress brush: drag to gradually decrease height of cells in radius by Power value">
        <svg viewBox="15 15 70 70" height="1em" width="1.6em">
          <path d="M50,30 v35 l-12,-8 m12,8 l12,-8 M20,63 q30,35 60,0" fill="none" stroke="#000" stroke-width="5" />
        </svg>
      </button>
      <button id="brushAlign" data-tip="Align brush: drag to set height of cells in radius to height of the cell at mousepoint">
        <svg viewBox="15 15 70 70" height="1em" width="1.6em">
          <path d="m20,50 h56 m0,20 h-56" fill="none" stroke="#000" stroke-width="5" />
        </svg>
      </button>
      <button id="brushSmooth" data-tip="Smooth brush: drag to level height of cells in radius to height of adjacent cells">
        <svg viewBox="15 15 70 70" height="1em" width="1.6em">
          <path d="m15,60 q15,-15 30,0 q15,15 35,0" fill="none" stroke="#000" stroke-width="5" />
        </svg>
      </button>
      <button id="brushDisrupt" data-tip="Disrupt brush: drag to randomize height of cells in radius based on Power value">
        <svg viewBox="15 15 70 70" height="1em" width="1.6em">
          <path d="m15,63 l15,-13 15,20 15,-20 15,19 15,-14" fill="none" stroke="#000" stroke-width="5" />
        </svg>
      </button>
      <button id="brushFill" data-tip="Fill: click enclosed water or same-height land area to create a cone blob">
        <svg viewBox="20 10 60 60" height="1em" width="1.6em">
          <path d="M30,70 h40 M30,70 q0,-20 20,-20 q20,0 20,20" fill="none" stroke="#000" stroke-width="5" />
          <path d="M50,20 v25 M50,20 l-10,8 M50,20 l10,8" fill="none" stroke="#000" stroke-width="5" />
        </svg>
      </button>
      <button id="brushLine" data-tip="Line: select two points to change heights along the line">
        <svg viewBox="0 -5 100 100" height="1em" width="1.6em">
          <path d="M0 90 L100 10" fill="none" stroke="#000" stroke-width="7"></path>
        </svg>
      </button>
    </div>
    <div id="brushesSliders" style="display: none">
      <div data-tip="Change brush size. Shortcut: + to increase; – to decrease">
        <slider-input id="heightmapBrushRadius" min="1" max="100" value="25">
          <div style="width: 3.5em">Radius:</div>
        </slider-input>
      </div>
      <div data-tip="Change brush power">
        <slider-input id="heightmapBrushPower" min="1" max="10" value="5">
          <div style="width: 3.5em">Power:</div>
        </slider-input>
      </div>
    </div>
    <div id="lineSlider" style="display: none">
      <div data-tip="Change tool power. Shortcut: + to increase; – to decrease">
        <slider-input id="heightmapLinePower" min="-100" max="100" value="30">
          <div style="width: 5.5em">Power:</div>
        </slider-input>
      </div>
      <div data-tip="Change line randomness. Zero makes the line as straight as possible">
        <slider-input id="heightmapLineRandomness" min="0" max="100" value="30">
          <div style="width: 5.5em">Randomness:</div>
        </slider-input>
      </div>
    </div>
    <div data-tip="Restrict brush to specific cell types" style="margin-bottom: 0.6em">
      <label for="cellTypeFilter"><i>Cells to change:</i></label>
      <select id="cellTypeFilter">
        <option value="all" ${F.cellType===`all`?`selected`:``}>all cells</option>
        <option value="land" ${F.cellType===`land`?`selected`:``}>only land cells</option>
        <option value="water" ${F.cellType===`water`?`selected`:``}>only water cells</option>
      </select>
    </div>
    <div id="modifyButtons">
      <button id="undo" data-tip="Undo the latest action (Ctrl + Z)" class="icon-ccw" disabled></button>
      <button id="redo" data-tip="Redo the action (Ctrl + Y)" class="icon-cw" disabled></button>
      <button id="rescaleShow" data-tip="Show rescaler slider" class="icon-exchange"></button>
      <button id="rescaleCondShow" data-tip="Rescaler: change height if condition is fulfilled" class="icon-if"></button>
      <button id="smoothHeights" data-tip="Smooth all heights a bit" class="icon-smooth"></button>
      <button id="disruptHeights" data-tip="Disrupt (randomize) heights a bit" class="icon-disrupt"></button>
      <button id="brushClear" data-tip="Set height for all cells to 0 (erase the map)" class="icon-eraser"></button>
    </div>
    <div id="rescaleSection" style="display: none">
      <button id="rescaleHide" data-tip="Hide rescaler slider" class="icon-exchange"></button>
      <input id="rescaler" data-tip="Change height for all cells" type="range" min="-10" max="10" step="1" value="0" />
    </div>
    <div
      id="rescaleCondSection"
      data-tip="If height is greater or equal to X and less or equal to Y, then perform an operation Z with operand V"
      style="display: none"
    >
      <button id="rescaleCondHide" data-tip="Hide rescaler" class="icon-if"></button>
      <label>h ≥</label>
      <input id="rescaleLower" value="20" type="number" min="0" max="100" />
      <label>≤</label>
      <input id="rescaleHigher" value="100" type="number" min="1" max="100" />
      <label>⇒</label>
      <select id="conditionSign">
        <option value="multiply" selected>×</option>
        <option value="divide">÷</option>
        <option value="add">+</option>
        <option value="subtract">-</option>
        <option value="exponent">^</option>
      </select>
      <input id="rescaleModifier" type="number" value="0.9" min="0" max="1.5" step="0.01" />
      <button id="rescaleExecute" data-tip="Click to perform an operation" class="icon-play-circled2"></button>
    </div>
  </div>`;_(`dialogs`).insertAdjacentHTML(`beforeend`,e),$e()}function Qe(){J(),S(`brushesPanel`)}function $e(){_(`brushesButtons`).addEventListener(`click`,et),_(`cellTypeFilter`).addEventListener(`change`,st),_(`undo`).addEventListener(`click`,()=>G(edits.n-1)),_(`redo`).addEventListener(`click`,()=>G(edits.n+1)),_(`rescaleShow`).addEventListener(`click`,()=>{_(`modifyButtons`).style.display=`none`,_(`rescaleSection`).style.display=`block`}),_(`rescaleHide`).addEventListener(`click`,()=>{_(`modifyButtons`).style.display=`block`,_(`rescaleSection`).style.display=`none`}),_(`rescaler`).addEventListener(`change`,e=>ct(e.target.valueAsNumber)),_(`rescaleCondShow`).addEventListener(`click`,()=>{_(`modifyButtons`).style.display=`none`,_(`rescaleCondSection`).style.display=`block`}),_(`rescaleCondHide`).addEventListener(`click`,()=>{_(`modifyButtons`).style.display=`block`,_(`rescaleCondSection`).style.display=`none`}),_(`rescaleExecute`).addEventListener(`click`,lt),_(`smoothHeights`).addEventListener(`click`,ut),_(`disruptHeights`).addEventListener(`click`,dt),_(`brushClear`).addEventListener(`click`,ft)}function J(){let e=document.querySelector(`#brushesButtons > button.pressed`);e&&e.classList.remove(`pressed`),ge(),h(`#map`).on(`dblclick.zoom`,null),h(`#viewbox`).on(`touchmove mousemove`,Ge),h(`#debug`).selectAll(`.lineCircle`).remove(),me(),_(`brushesSliders`).style.display=`none`,_(`lineSlider`).style.display=`none`}function et(e){let t=e.target.closest(`#brushesButtons > button`);if(!t)return;if(t.classList.contains(`pressed`)){J();return}J(),t.classList.add(`pressed`);let n=_(`heightmapBrushRadius`).parentElement;n&&(n.style.display=t.id===`brushFill`?`none`:``),t.id===`brushLine`?(_(`lineSlider`).style.display=`block`,h(`#viewbox`).style(`cursor`,`crosshair`).on(`click`,tt)):t.id===`brushFill`?(_(`brushesSliders`).style.display=`block`,h(`#viewbox`).style(`cursor`,`crosshair`).on(`click`,nt)):(_(`brushesSliders`).style.display=`block`,h(`#viewbox`).style(`cursor`,`crosshair`).call(se().on(`start`,at)))}function tt(e){let[t,n]=c(e,this),r=Grid.findCell(t,n),i=h(`#debug`).selectAll(`.lineCircle`);if(!i.size()){h(`#debug`).append(`line`).attr(`id`,`brushCircle`).attr(`x1`,t).attr(`y1`,n).attr(`x2`,t).attr(`y2`,n),h(`#debug`).append(`circle`).attr(`data-cell`,r).attr(`class`,`lineCircle`).attr(`r`,6).attr(`cx`,t).attr(`cy`,n).attr(`fill`,`yellow`).attr(`stroke`,`#333`).attr(`stroke-width`,2);return}let a=+i.attr(`data-cell`);h(`#debug`).selectAll(`*`).remove();let o=_(`heightmapLinePower`).valueAsNumber;if(o===0){x(`Power should not be zero`,!1,`error`);return}let s=_(`heightmapLineRandomness`).valueAsNumber/200,l=grid.cells.h,u=o>0?HeightmapGenerator.addRange.bind(HeightmapGenerator):HeightmapGenerator.addTrough.bind(HeightmapGenerator);HeightmapGenerator.setGraph(grid),u(`1`,String(Math.abs(o)),``,``,a,r,s);let d=HeightmapGenerator.getHeights(),f=_(`cellTypeFilter`).value,p=[];for(let e=0;e<l.length;e++)d[e]!==l[e]&&(f===`land`&&l[e]<20||f===`water`&&l[e]>=20||(l[e]=d[e],p.push(e)));V(p),W()}function nt(e){let[t,n]=c(e,this),r=Grid.findCell(t,n),i=grid.cells.h[r],a=i<20,o=_(`cellTypeFilter`).value;if(o===`water`){x(`Fill brush is not available with 'only water cells' filter`,!1,`error`);return}if(o===`land`&&a){x(`Land filter is active, water areas cannot be filled`,!1,`error`);return}let{selection:s,reachedBorder:l}=rt(r,a,i);if(s.length<3){x(`No enclosed area found to fill`,!1,`error`);return}if(a&&l){x(`Selected water area is open to map border and is not enclosed`,!1,`error`);return}let u=it(s,a,i);u.length&&(V(u),R())}function rt(e,t,n){let{h:r,c:i,i:a}=grid.cells,o=new Uint8Array(a.length),s=[e],c=[],l=!1;for(;s.length;){let e=s.pop();o[e]||(o[e]=1,(t?r[e]<20:r[e]===n)&&(c.push(e),grid.cells.b[e]&&(l=!0),i[e].forEach(e=>{o[e]||s.push(e)})))}return{selection:c,reachedBorder:l}}function it(e,t,n){let r=_(`heightmapBrushPower`).valueAsNumber*10,{h:i,c:a,i:o}=grid.cells,s=new Uint8Array(o.length),c=new Uint16Array(o.length),l=[];e.forEach(e=>{s[e]=1});let u=[],d=0;for(e.forEach(e=>{a[e].some(e=>!s[e])&&(s[e]=2,u.push(e))});d<u.length;){let e=u[d++],t=c[e]+1;a[e].forEach(e=>{s[e]===1&&(s[e]=2,c[e]=t,u.push(e))})}let f=ee(e,e=>c[e])||0,p=t?20:n;return e.forEach(e=>{let t=f?c[e]/f:1,n=Math.max(1,Math.round(r*t)),a=ie(p+n,0,100);a!==i[e]&&(i[e]=a,l.push(e))}),l}function at(e){let t=_(`heightmapBrushRadius`).valueAsNumber,[n,r]=c(e,this),i=Grid.findCell(n,r),a=e=>{let n=c(e,this);he(n[0],n[1],t);let r=Grid.findAll(n[0],n[1],t),a=r,o=_(`cellTypeFilter`).value;o===`land`?a=r.filter(e=>grid.cells.h[e]>=20):o===`water`&&(a=r.filter(e=>grid.cells.h[e]<20)),a?.length&&ot(a,i)};a(e),e.on(`drag`,a),e.on(`end`,R)}function ot(e,t){let n=_(`heightmapBrushPower`).valueAsNumber,r=u(n,1),i=_(`cellTypeFilter`).value===`land`,a=_(`cellTypeFilter`).value===`water`,s=e=>ie(e,i?20:0,a?19:100),c=grid.cells.h,l=document.querySelector(`#brushesButtons > button.pressed`).id;l===`brushRaise`?e.forEach(e=>{c[e]=!a&&c[e]<20?20:s(c[e]+n)}):l===`brushElevate`?e.forEach((t,n)=>{c[t]=s(c[t]+r(n/Math.max(e.length-1,1)))}):l===`brushLower`?e.forEach(e=>{c[e]=s(c[e]-n)}):l===`brushDepress`?e.forEach((t,n)=>{c[t]=s(c[t]-r(n/Math.max(e.length-1,1)))}):l===`brushAlign`?e.forEach(e=>{c[e]=s(c[t])}):l===`brushSmooth`?e.forEach(e=>{c[e]=o(((oe(grid.cells.c[e].filter(e=>i?c[e]>=20:!a||c[e]<20).map(e=>c[e]))??0)+c[e]*(10-n)+.6)/(11-n),1)}):l===`brushDisrupt`&&e.forEach(e=>{c[e]=c[e]<15?c[e]:s(c[e]+n/1.6-Math.random()*n)}),V(e)}function st(){let e=_(`cellTypeFilter`);e.value===`land`&&_(`heightmapEditMode`).innerHTML===`keep`&&(x(`You cannot change the coastline in 'Keep' edit mode`,!1,`error`),e.value=`all`),F.cellType=e.value,w.set(P,`filters`,F)}function ct(e){let t=_(`cellTypeFilter`).value===`land`,n=_(`cellTypeFilter`).value===`water`;grid.cells.h=grid.cells.h.map(r=>{if(t&&(r<20||r+e<20)||n&&r>=20)return r;let a=i(r+e);return n?Math.min(a,19):a}),R(),_(`rescaler`).value=`0`}function lt(){let e=`${_(`rescaleLower`).value}-${_(`rescaleHigher`).value}`,t=_(`conditionSign`).value,n=_(`rescaleModifier`).valueAsNumber;if(Number.isNaN(n)){x(`Operand should be a number`,!1,`error`);return}if((t===`add`||t===`subtract`)&&!Number.isInteger(n)){x(`Operand should be an integer`,!1,`error`);return}HeightmapGenerator.setGraph(grid),t===`multiply`?HeightmapGenerator.modify(e,0,n,0):t===`divide`?HeightmapGenerator.modify(e,0,1/n,0):t===`add`?HeightmapGenerator.modify(e,n,1,0):t===`subtract`?HeightmapGenerator.modify(e,-1*n,1,0):t===`exponent`&&HeightmapGenerator.modify(e,0,1,n),grid.cells.h=HeightmapGenerator.getHeights(),R()}function ut(){HeightmapGenerator.setGraph(grid),HeightmapGenerator.smooth(4,1.5),grid.cells.h=HeightmapGenerator.getHeights(),R()}function dt(){grid.cells.h=grid.cells.h.map(e=>e<15?e:i(e+2.5-Math.random()*4)),R()}function ft(){let e=_(`cellTypeFilter`).value;if(e===`land`){x(`Not allowed when 'only land cells' filter is set`,!1,`error`);return}if(e===`water`){x(`Not allowed when 'only water cells' filter is set`,!1,`error`);return}if(!grid.cells.h.some(e=>e)){x(`Heightmap is already cleared, please do not click twice if not required`,!1,`error`);return}grid.cells.h=new Uint8Array(grid.cells.i.length),h(`#viewbox`).select(`#heights`).selectAll(`*`).remove(),W()}function pt(){document.getElementById(`templateEditor`)||(Le(),$(`#templateEditor`).dialog({title:`Template Editor`,minHeight:`auto`,width:`fit-content`,resizable:!1,position:{my:`right top`,at:`right-10 top+10`,of:`svg`},close:mt}))}function mt(){$(`#templateEditor`).dialog(`destroy`),_(`templateEditor`).remove()}function ht(e){let t=e.target;if(t.tagName!==`BUTTON`)return;let n=t.dataset.type;_(`templateBody`).dataset.changed=`1`,Y(n)}function Y(e,t,n,r,i){let a=_(`templateBody`);a.insertAdjacentHTML(`beforeend`,gt(e,t,n,r,i));let o=a.querySelector(`div:last-child > span > .templateDist`);if(o&&o.addEventListener(`change`,_t),n&&o&&o.tagName===`SELECT`){for(let e of Array.from(o.options))e.value===n&&(o.value=n);if(o.value!==n){let e=document.createElement(`option`);e.value=e.innerHTML=n,o.add(e),o.value=n}}}function gt(e,t,n,r,i){let a=`<div data-type="${e}"><div class="icon-check" data-tip="Click to skip the step"></div><div style="width:4em">${e}</div><i class="icon-trash-empty pointer" data-tip="Click to remove the step"></i><i class="icon-resize-vertical" data-tip="Drag to reorder"></i>`,o=`<span>y:
      <input class="templateY" data-tip="Placement range percentage along Y axis (minY-maxY)" value=${i||`20-80`} />
    </span>`,s=`<span>x:
      <input class="templateX" data-tip="Placement range percentage along X axis (minX-maxX)" value=${r||`15-85`} />
    </span>`,c=`<span>h:
      <input class="templateHeight" data-tip="Blob maximum height, use hyphen to get a random number in range" value=${n||`40-50`} />
    </span>`,l=`<span>n:
      <input class="templateCount" data-tip="Blobs to add, use hyphen to get a random number in range" value=${t||`1-2`} />
    </span>`;return e===`Hill`||e===`Pit`||e===`Range`||e===`Trough`?`${a}${o}${s}${c}${l}</div>`:e===`Strait`?`${a}
      <span>d:
        <select class="templateDist" data-tip="Strait direction">
          <option value="vertical" selected>vertical</option>
          <option value="horizontal">horizontal</option>
        </select>
      </span>
      <span>w:
        <input class="templateCount" data-tip="Strait width, use hyphen to get a random number in range" value=${t||`2-7`} />
      </span>
    </div>`:e===`Invert`?`${a}
      <span>by:
        <select class="templateDist" data-tip="Mirror heightmap along axis" style="width: 7.8em">
          <option value="x" selected>x</option>
          <option value="y">y</option>
          <option value="xy">both</option>
        </select>
      </span>
      <span>n:
        <input class="templateCount" data-tip="Probability of inversion, range 0-1" value=${t||`0.5`} />
      </span>
    </div>`:e===`Mask`?`${a}
      <span>f:
        <input class="templateCount"
          data-tip="Set masking fraction. 1 - full insulation (prevent land on map edges), 2 - half-insulation, etc. Negative number to inverse the effect"
          type="number" min=-10 max=10 value=${t||1} />
      </span>
    </div>`:e===`Add`?`${a}
      <span>to:
        <select class="templateDist" data-tip="Change only land or all cells">
          <option value="all" selected>all cells</option>
          <option value="land">land only</option>
          <option value="interval">interval</option>
        </select>
      </span>
      <span>v:
        <input class="templateCount" data-tip="Add value to height of all cells (negative values are allowed)"
        type="number" value=${t||-10} min=-100 max=100 step=1 />
      </span>
    </div>`:e===`Multiply`?`${a}
      <span>to:
        <select class="templateDist" data-tip="Change only land or all cells">
          <option value="all" selected>all cells</option>
          <option value="land">land only</option>
          <option value="interval">interval</option>
        </select>
      </span>
      <span>v:
        <input class="templateCount" data-tip="Multiply all cells Height by the value" type="number"
          value=${t||1.1} min=0 max=10 step=.1 />
      </span>
    </div>`:e===`Smooth`?`${a}
      <span>f:
        <input class="templateCount" data-tip="Set smooth fraction. 1 - full smooth, 2 - half-smooth, etc."
          type="number" min=1 max=10 step=1 value=${t||2} />
      </span>
    </div>`:``}function _t(e){let t=e.target;t.value===`interval`&&prompt(`Set a height interval. Avoid space, use hyphen as a separator`,{default:`17-20`},e=>{let n=document.createElement(`option`);n.value=n.innerHTML=String(e),t.add(n),t.value=String(e)})}function vt(e){let t=_(`templateBody`),n=t.querySelectorAll(`div`).length,r=+t.getAttribute(`data-changed`),i=e.target.value;if(!n||!r){yt(i);return}alertMessage.innerHTML=`Are you sure you want to select a different template? All changes will be lost.`,$(`#alert`).dialog({resizable:!1,title:`Change Template`,buttons:{Change:function(){yt(i),$(this).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}}})}function yt(e){let t=_(`templateBody`);t.setAttribute(`data-changed`,`0`),t.innerHTML=``;let n=_e[e]?.template;if(!n)return;let r=n.split(`
`);if(!r.length){x(`Heightmap template: no steps defined`,!1,`error`);return}for(let e of r){let t=e.trim().split(` `);Y(t[0],t[1],t[2],t[3],t[4])}}function bt(){let e=_(`templateBody`).querySelectorAll(`#templateBody > div`);if(!e.length)return;let t=_(`templateSeed`).value;Math.random=aleaPRNG(t||m()),grid.cells.h=new Uint8Array(grid.points.length),HeightmapGenerator.setGraph(grid),K();for(let t of e){if(t.style.opacity===`0.5`)continue;let e=t.querySelector(`.templateCount`)?.value||``,n=t.querySelector(`.templateHeight`)?.value||``,r=t.querySelector(`.templateDist`)?.value||``,i=t.querySelector(`.templateX`)?.value||``,a=t.querySelector(`.templateY`)?.value||``,o=t.dataset.type;o===`Hill`?HeightmapGenerator.addHill(e,n,i,a):o===`Pit`?HeightmapGenerator.addPit(e,n,i,a):o===`Range`?HeightmapGenerator.addRange(e,n,i,a):o===`Trough`?HeightmapGenerator.addTrough(e,n,i,a):o===`Strait`?HeightmapGenerator.addStrait(e,r):o===`Mask`?HeightmapGenerator.mask(+e):o===`Invert`?HeightmapGenerator.invert(+e,r):o===`Add`?HeightmapGenerator.modify(r,+e,1):o===`Multiply`?HeightmapGenerator.modify(r,0,+e):o===`Smooth`&&HeightmapGenerator.smooth(+e),grid.cells.h=HeightmapGenerator.getHeights(),W(`noStat`)}grid.cells.h=HeightmapGenerator.getHeights(),H(),B(),document.getElementById(`preview`)&&Q(),document.getElementById(`canvas3d`)&&T.View3d.redraw()}function xt(){let e=_(`templateBody`);e.dataset.changed=`0`;let t=e.querySelectorAll(`#templateBody > div`);if(!t.length)return;let n=``;for(let e of Array.from(t)){if(e.style.opacity===`0.5`)continue;let t=e.getAttribute(`data-type`),r=e.querySelector(`.templateCount`)?.value||`0`,i=e.querySelector(`.templateHeight`)?.value||e.querySelector(`.templateDist`)?.value||`0`,a=e.querySelector(`.templateX`)?.value||`0`,o=e.querySelector(`.templateY`)?.value||`0`;n+=`${t} ${r} ${i} ${a} ${o}\r\n`}let r=`template_${Date.now()}.txt`;l(n,r)}function St(e){let t=e.split(`\r
`);if(!t.length){x(`Cannot parse the template, please check the file`,!1,`error`);return}_(`templateBody`).innerHTML=``;for(let e of t){let t=e.split(` `);if(t.length!==5){ERROR&&console.error(`Cannot parse step, wrong arguments count`,e);continue}Y(t[0],t[1],t[2],t[3],t[4])}}function Ct(){if(document.getElementById(`imageConverter`))return;_(`imageToLoad`).click(),C(`#imageConverter`),Re(),$(`#imageConverter`).dialog({title:`Image Converter`,maxHeight:svgHeight*.8,minHeight:`auto`,width:`20em`,position:{my:`right top`,at:`right-10 top+10`,of:`svg`},beforeClose:Pt});let e=document.createElement(`canvas`);e.id=`canvas`,e.width=graphWidth,e.height=graphHeight,document.body.insertBefore(e,_(`optionsContainer`)),At(0),de(),x(`Image Converter is opened. Upload image and assign height value for each color`,!1,`warn`),grid.cells.h=new Uint8Array(grid.cells.i.length),h(`#viewbox`).select(`#heights`).selectAll(`*`).remove(),W()}function wt(){let e=+this.getAttribute(`data-color`);_(`colorsSelectValue`).innerHTML=String(e),_(`colorsSelectFriendly`).innerHTML=L(e);let t=_(`imageConverterPalette`).querySelector(`.hoveredColor`);t&&(t.className=``),this.className=`hoveredColor`}function Tt(){let e=this.files[0];this.value=``;let t=new FileReader,n=new Image;n.id=`imageToConvert`,n.style.display=`none`,document.body.appendChild(n),n.onload=()=>{_(`canvas`).getContext(`2d`).drawImage(n,0,0,graphWidth,graphHeight),X(+_(`convertColors`).value),resetZoom()},t.onloadend=()=>{n.src=t.result},t.readAsDataURL(e)}function X(e){let t=_(`canvas`),n=document.createElement(`canvas`);n.width=grid.cellsX,n.height=grid.cellsY,n.getContext(`2d`).drawImage(t,0,0,grid.cellsX,grid.cellsY);let r=new RgbQuant({colors:e});r.sample(n);let i=r.reduce(n),a=r.palette(!0);h(`#viewbox`).select(`#heights`).selectAll(`*`).remove(),h(`#imageConverter`).selectAll(`div.color-div`).remove(),_(`colorsSelect`).style.display=`block`,_(`colorsUnassigned`).style.display=`block`,_(`colorsAssigned`).style.display=`none`,n.remove(),h(`#viewbox`).select(`#heights`).selectAll(`polygon`).data(Array.from(grid.cells.i)).join(`polygon`).attr(`points`,e=>String(Grid.getPolygon(e))).attr(`id`,e=>`cell${e}`).attr(`fill`,e=>`rgb(${i[e*4]}, ${i[e*4+1]}, ${i[e*4+2]})`).on(`click`,Et);let o=a.map(e=>`rgb(${e[0]}, ${e[1]}, ${e[2]})`);h(`#colorsUnassignedContainer`).selectAll(`div`).data(o).enter().append(`div`).attr(`data-color`,e=>e).style(`background-color`,e=>e).attr(`class`,`color-div`).on(`click`,Dt),_(`colorsUnassignedNumber`).innerHTML=String(o.length)}function Et(){let e=this.getAttribute(`fill`);_(`imageConverter`).querySelector(`div[data-color="${e}"]`)?.click()}function Dt(){h(`#viewbox`).select(`#heights`).selectAll(`.selectedCell`).attr(`class`,null);let e=this.classList.contains(`selectedColor`),t=_(`imageConverter`).querySelector(`div.selectedColor`);t&&t.classList.remove(`selectedColor`);let n=_(`imageConverterPalette`).querySelector(`div.hoveredColor`);if(n&&n.classList.remove(`hoveredColor`),_(`colorsSelectValue`).innerHTML=_(`colorsSelectFriendly`).innerHTML=`0`,e)return;if(this.classList.add(`selectedColor`),this.dataset.height){let e=+this.dataset.height;_(`imageConverterPalette`).querySelector(`div[data-color="${e}"]`)?.classList.add(`hoveredColor`),_(`colorsSelectValue`).innerHTML=String(e),_(`colorsSelectFriendly`).innerHTML=L(e)}let r=this.getAttribute(`data-color`);h(`#viewbox`).select(`#heights`).selectAll(`polygon.selectedCell`).classed(`selectedCell`,!1),h(`#viewbox`).select(`#heights`).selectAll(`polygon[fill='${r}']`).classed(`selectedCell`,!0)}function Ot(){let e=+this.dataset.color,t=color(1-(e<20?e-5:e)/100),n=_(`imageConverter`).querySelector(`div.selectedColor`);n.style.backgroundColor=t,n.setAttribute(`data-color`,t),n.setAttribute(`data-height`,String(e)),h(`#viewbox`).select(`#heights`).selectAll(`.selectedCell`).each(function(){this.setAttribute(`fill`,t),this.setAttribute(`data-height`,String(e))}),n.parentNode.id===`colorsUnassignedContainer`&&(_(`colorsAssignedContainer`).appendChild(n),_(`colorsAssigned`).style.display=`block`,_(`colorsUnassignedNumber`).innerHTML=String(_(`colorsUnassignedContainer`).childElementCount-2),_(`colorsAssignedNumber`).innerHTML=String(_(`colorsAssignedContainer`).childElementCount-2))}function Z(t){let n=_(`colorsUnassignedContainer`),r=n.querySelectorAll(`div`);if(!r.length&&(X(+_(`convertColors`).value),r=n.querySelectorAll(`div`),!r.length)){x(`No unassigned colors. Please load an image and click the button again`,!1,`error`);return}let i=t=>{let n=e(t).h;return n>300&&(n-=360),n>170?Math.abs(n-250)/3|0:Math.abs(n-250+20)/3|0},a=e=>{let t=De(e).l;return t<13?t/13*20|0:t|0},o=g(101).map(e=>z(e)),s=o.map(t=>e(t).h|0),c=t=>{let n=o.indexOf(t);if(n!==-1)return n;let r=e(t).h,i=s.reduce((e,t)=>Math.abs(t-r)<Math.abs(e-r)?t:e);return s.indexOf(i)},l=[],u=_(`colorsAssignedContainer`);r.forEach(e=>{let n=e.dataset.color,r=t===`hue`?i(n):t===`lum`?a(n):c(n),o=color(1-(r<20?(r-5)/100:r/100));if(h(`#viewbox`).select(`#heights`).selectAll(`polygon[fill='${n}']`).attr(`fill`,o).attr(`data-height`,r),l[r]){e.remove();return}e.style.backgroundColor=e.dataset.color=o,e.dataset.height=String(r),u.appendChild(e),l[r]=!0}),Array.from(u.children).sort((e,t)=>+e.dataset.height-t.dataset.height).forEach(e=>{u.appendChild(e)}),_(`colorsAssigned`).style.display=`block`,_(`colorsUnassigned`).style.display=`none`,_(`colorsAssignedNumber`).innerHTML=String(u.childElementCount-2)}function kt(){prompt(`Please set maximum number of colors. <br>An actual number is usually lower and depends on color scheme`,{default:+_(`convertColors`).value,step:1,min:3,max:255},e=>{_(`convertColors`).value=String(e),X(+e)})}function At(e){_(`convertOverlay`).value=_(`convertOverlayNumber`).value=String(e),_(`canvas`).style.opacity=String(e)}function jt(){if(_(`colorsAssignedContainer`).childElementCount<3){x(`Please assign colors to heights first`,!1,`error`);return}h(`#viewbox`).select(`#heights`).selectAll(`polygon`).each(function(){let e=+(this.dataset.height??`0`)||0,t=+this.id.slice(4);grid.cells.h[t]=e}),h(`#viewbox`).select(`#heights`).selectAll(`polygon`).remove(),R(),Nt()}function Mt(){Nt(),h(`#viewbox`).select(`#heights`).selectAll(`polygon`).remove(),G(edits.n-1)}function Nt(){document.getElementById(`canvas`)?.remove(),document.getElementById(`imageToConvert`)?.remove(),h(`#imageConverter`).selectAll(`div.color-div`).remove(),_(`colorsAssigned`).style.display=`none`,_(`colorsUnassigned`).style.display=`none`,_(`colorsSelectValue`).innerHTML=_(`colorsSelectFriendly`).innerHTML=`0`,h(`#viewbox`).style(`cursor`,`default`).on(`.drag`,null),x(`Heightmap edit mode is active. Click on "Exit Customization" to finalize the heightmap`,!0),$(`#imageConverter`).dialog(`destroy`),_(`imageConverter`).remove(),q()}function Pt(e){e.preventDefault(),e.stopPropagation(),alertMessage.innerHTML=`Are you sure you want to close the Image Converter? Click "Cancel" to keep editing. Click "Complete" to apply
  the conversion and close the tool. Click "Close" to discard the conversion and restore the previous heightmap.`,$(`#alert`).dialog({resizable:!1,title:`Close Image Converter`,buttons:{Cancel:function(){$(this).dialog(`close`)},Complete:function(){$(this).dialog(`close`),jt()},Close:function(){$(this).dialog(`close`),Nt(),h(`#viewbox`).select(`#heights`).selectAll(`polygon`).remove(),G(edits.n-1)}}})}function Ft(){let e=document.getElementById(`preview`);if(e){e.remove();return}let t=document.createElement(`canvas`);t.id=`preview`,t.width=grid.cellsX,t.height=grid.cellsY,document.body.insertBefore(t,_(`optionsContainer`)),t.addEventListener(`mouseover`,()=>x(`Heightmap preview. Click to download a screen-sized image`)),t.addEventListener(`click`,It),Q()}function Q(){let e=document.getElementById(`preview`).getContext(`2d`),t=e.createImageData(grid.cellsX,grid.cellsY);grid.cells.h.forEach((e,n)=>{let r=(e<20?Math.max(e/1.5,0):e)/100*255,i=n*4;t.data[i]=r,t.data[i+1]=r,t.data[i+2]=r,t.data[i+3]=255}),e.putImageData(t,0,0)}function It(){let e=document.getElementById(`preview`).toDataURL(`image/png`),t=new Image;t.src=e,t.onload=()=>{let e=document.createElement(`canvas`),r=e.getContext(`2d`);e.width=graphWidth,e.height=graphHeight,document.body.insertBefore(e,_(`optionsContainer`)),r.drawImage(t,0,0,graphWidth,graphHeight);let i=e.toDataURL(`image/png`),a=document.createElement(`a`);a.download=`${n(`Heightmap`)}.png`,a.href=i,a.click(),e.remove()}}var Lt={open:Ie};export{Lt as HeightmapEditor};