import{A as e,C as t,Cn as n,Ct as r,E as i,Jt as a,M as o,Qt as s,S as c,Sn as l,St as u,Tt as d,Ut as f,Xt as p,Yt as m,en as h,gn as g,gt as _,k as v,mn as y,nn as b,q as ee,qt as te,tn as ne,un as x}from"./utils-omhVlsRt.js";import{O as re,t as S}from"./layers-DHltDypB.js";import{t as ie}from"./mean-4Awewi9R.js";import{t as ae}from"./drag-BkOXJRRX.js";import{n as oe}from"./sin-DXK16t1M.js";import{u as se}from"./megalopolis-BpsA5rhH.js";import{n as ce,r as C,t as le}from"./tooltips-BQ3W48fB.js";import{i as ue,n as de,r as w,t as T}from"./dialog-helpers-CdcIkxap.js";import{t as E}from"./state-CHxunpWe.js";import{n as fe,t as pe}from"./brush-circle-5_MK8VXE.js";import{P as D,j as me,p as he,t as ge}from"./index-DWZM8gkY.js";import{t as _e}from"./graph-override-CBeAyInQ.js";var O=18,ve=.96422,ye=1,be=.82521,xe=4/29,k=6/29,Se=3*k*k,Ce=k*k*k;function we(e){if(e instanceof A)return new A(e.l,e.a,e.b,e.opacity);if(e instanceof F)return Oe(e);e instanceof p||(e=h(e));var t=P(e.r),n=P(e.g),r=P(e.b),i=j((.2225045*t+.7168786*n+.0606169*r)/ye),a,o;return t===n&&n===r?a=o=i:(a=j((.4360747*t+.3850649*n+.1430804*r)/ve),o=j((.0139322*t+.0971045*n+.7141733*r)/be)),new A(116*i-16,500*(a-i),200*(i-o),e.opacity)}function Te(e,t,n,r){return arguments.length===1?we(e):new A(e,t,n,r??1)}function A(e,t,n,r){this.l=+e,this.a=+t,this.b=+n,this.opacity=+r}ne(A,Te,b(m,{brighter(e){return new A(this.l+O*(e??1),this.a,this.b,this.opacity)},darker(e){return new A(this.l-O*(e??1),this.a,this.b,this.opacity)},rgb(){var e=(this.l+16)/116,t=isNaN(this.a)?e:e+this.a/500,n=isNaN(this.b)?e:e-this.b/200;return t=ve*M(t),e=ye*M(e),n=be*M(n),new p(N(3.1338561*t-1.6168667*e-.4906146*n),N(-.9787684*t+1.9161415*e+.033454*n),N(.0719453*t-.2289914*e+1.4052427*n),this.opacity)}}));function j(e){return e>Ce?e**(1/3):e/Se+xe}function M(e){return e>k?e*e*e:Se*(e-xe)}function N(e){return 255*(e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055)}function P(e){return(e/=255)<=.04045?e/12.92:((e+.055)/1.055)**2.4}function Ee(e){if(e instanceof F)return new F(e.h,e.c,e.l,e.opacity);if(e instanceof A||(e=we(e)),e.a===0&&e.b===0)return new F(NaN,0<e.l&&e.l<100?0:NaN,e.l,e.opacity);var t=Math.atan2(e.b,e.a)*te;return new F(t<0?t+360:t,Math.sqrt(e.a*e.a+e.b*e.b),e.l,e.opacity)}function De(e,t,n,r){return arguments.length===1?Ee(e):new F(e,t,n,r??1)}function F(e,t,n,r){this.h=+e,this.c=+t,this.l=+n,this.opacity=+r}function Oe(e){if(isNaN(e.h))return new A(e.l,0,0,e.opacity);var t=e.h*a;return new A(e.l,Math.cos(t)*e.c,Math.sin(t)*e.c,e.opacity)}ne(F,De,b(m,{brighter(e){return new F(this.h,this.c,this.l+O*(e??1),this.opacity)},darker(e){return new F(this.h,this.c,this.l-O*(e??1),this.opacity)},rgb(){return Oe(this).rgb()}}));var ke=1;function Ae(e){let{seed:t,graphWidth:n,graphHeight:r,cellsDesired:i,heights:a}=e;return JSON.stringify({type:`fmgHeightmapDraft`,version:ke,seed:t,graphWidth:n,graphHeight:r,cellsDesired:i,heights:Me(a)})}function je(e){let t;try{t=JSON.parse(e)}catch{throw Error(`File is not a valid heightmap draft`)}if(!t||t.type!==`fmgHeightmapDraft`)throw Error(`File is not a valid heightmap draft`);if(t.version!==ke)throw Error(`Unsupported heightmap draft version: ${t.version}`);let{seed:n,graphWidth:r,graphHeight:i,cellsDesired:a,heights:o}=t;if(typeof n!=`string`||typeof r!=`number`||typeof i!=`number`||typeof a!=`number`||typeof o!=`string`)throw Error(`Heightmap draft is missing required fields`);return{seed:n,graphWidth:r,graphHeight:i,cellsDesired:a,heights:Ne(o)}}function Me(e){let t=``,n=32768;for(let r=0;r<e.length;r+=n)t+=String.fromCharCode(...e.subarray(r,r+n));return btoa(t)}function Ne(e){let t=atob(e),n=new Uint8Array(t.length);for(let e=0;e<t.length;e++)n[e]=t.charCodeAt(e);return n}var I=`heightmapEditor`,L;function Pe(e){L=E.get(I,`filters`,()=>({cellType:`all`})),[`all`,`land`,`water`].includes(L.cellType)||(L.cellType=`all`),E.set(I,`filters`,L);let{mode:t,tool:n}=e||{};J(),x(`#viewbox`).selectAll(`#heights`).remove(),x(`#viewbox`).insert(`g`,`#terrs`).attr(`id`,`heights`),t?R(t,n):He(n)}Re();function Fe(){w(`templateEditor`),v(`dialogs`).insertAdjacentHTML(`beforeend`,`<div id="templateEditor" class="dialog stable">
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
    </div>`);let e=v(`templateBody`);$(`#templateBody`).sortable({items:`> div`,handle:`.icon-resize-vertical`,containment:`#templateBody`,axis:`y`}),e.addEventListener(`click`,t=>{let n=t.target;if(n.classList.contains(`icon-check`)){n.classList.remove(`icon-check`),n.classList.add(`icon-check-empty`),n.parentElement.style.opacity=`0.5`,e.dataset.changed=`1`;return}if(n.classList.contains(`icon-check-empty`)){n.classList.add(`icon-check`),n.classList.remove(`icon-check-empty`),n.parentElement.style.opacity=`1`;return}n.classList.contains(`icon-trash-empty`)&&n.parentElement.remove()}),v(`templateEditor`).addEventListener(`keypress`,e=>{e.key===`Enter`&&(e.preventDefault(),yt())}),v(`templateTools`).addEventListener(`click`,mt),v(`templateSelect`).addEventListener(`change`,_t),v(`templateRun`).addEventListener(`click`,yt),v(`templateUndo`).addEventListener(`click`,()=>q(edits.n-1)),v(`templateRedo`).addEventListener(`click`,()=>q(edits.n+1)),v(`templateSave`).addEventListener(`click`,bt),v(`templateLoad`).addEventListener(`click`,()=>v(`templateToLoad`).click()),v(`templateToLoad`).onchange=()=>{i(v(`templateToLoad`),xt)}}function Ie(){w(`imageConverter`),v(`dialogs`).insertAdjacentHTML(`beforeend`,`<div id="imageConverter" class="dialog stable">
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
    </div>`),x(`#imageConverterPalette`).selectAll(`div`).data(y(101)).enter().append(`div`).attr(`data-color`,e=>e).style(`background-color`,e=>color(1-(e<20?e-5:e)/100)).style(`width`,e=>e<40||e>68?`.2em`:`.1em`).on(`touchmove mousemove`,Ct).on(`click`,Ot),v(`convertImageLoad`).addEventListener(`click`,()=>v(`imageToLoad`).click()),v(`imageToLoad`).onchange=()=>wt.call(v(`imageToLoad`)),v(`convertAutoLum`).addEventListener(`click`,()=>kt(`lum`)),v(`convertAutoHue`).addEventListener(`click`,()=>kt(`hue`)),v(`convertAutoFMG`).addEventListener(`click`,()=>kt(`scheme`)),v(`convertColorsButton`).addEventListener(`click`,At),v(`convertComplete`).addEventListener(`click`,Mt),v(`convertCancel`).addEventListener(`click`,Nt),v(`convertOverlay`).addEventListener(`input`,function(){jt(+this.value)}),v(`convertOverlayNumber`).addEventListener(`input`,function(){jt(+this.value)})}var Le=[];function Re(){v(`paintBrushes`).addEventListener(`click`,Y),v(`applyTemplate`).addEventListener(`click`,ft),v(`convertImage`).addEventListener(`click`,St),v(`heightmapPreview`).addEventListener(`click`,Ft),v(`heightmap3DView`).addEventListener(`click`,changeViewMode),v(`finalizeHeightmap`).addEventListener(`click`,We),v(`renderOcean`).addEventListener(`click`,H),v(`saveHeightmapDraft`).addEventListener(`click`,ze),v(`loadHeightmapDraft`).addEventListener(`click`,()=>v(`heightmapDraftToLoad`).click()),v(`heightmapDraftToLoad`).addEventListener(`change`,function(){i(this,Be)})}function ze(){let e=Ae({seed:String(seed),graphWidth,graphHeight,cellsDesired:grid.cellsDesired,heights:Uint8Array.from(grid.cells.h)});c(e,`${t(`Draft`)}.heightmap`,`application/json`),C(`Heightmap draft is saved. Load it later via the Load Draft button to continue painting`,!0,`success`,6e3)}function Be(e){let t;try{t=je(e)}catch(e){C(e.message,!1,`error`,6e3);return}if(!grid.cells.h?.some(e=>e>0)){Ve(t);return}de({title:`Load heightmap draft`,message:`Loading a draft will replace the current heightmap. Are you sure you want to proceed?`,confirm:`Load`,onConfirm:()=>Ve(t)})}function Ve(e){let t=v(`pointsInput`),n=t.dataset.cells;t.dataset.cells=String(e.cellsDesired);let r;try{r=Grid.generate(e.seed,e.graphWidth,e.graphHeight)}finally{t.dataset.cells=n}if(r.points.length!==e.heights.length){C(`Heightmap draft does not match its grid and cannot be loaded`,!1,`error`,6e3);return}seed=e.seed,v(`optionsSeed`).value=e.seed,graphWidth=e.graphWidth,graphHeight=e.graphHeight;let i=Object.keys(cellsDensityMap).find(t=>cellsDensityMap[+t]===e.cellsDesired);i&&(t.value=i),t.dataset.cells=String(e.cellsDesired),r.cells.h=Uint8Array.from(e.heights),grid=r,fitMapToScreen(),H(),J(),C(`Heightmap draft is loaded`,!0,`success`,4e3)}function He(e){alertMessage.innerHTML=`Heightmap is a core element on which all other data (rivers, burgs, states etc) is based. So the best edit approach is to
    <i>erase</i> the secondary data and let the system automatically regenerate it on edit completion.
    <p><i>Erase</i> mode also allows you Convert an Image into a heightmap or use Template Editor.</p>
    <p>You can <i>keep</i> the data, but you won't be able to change the coastline.</p>
    <p>Try <i>risk</i> mode to change the coastline and keep the data. The data will be restored as much as possible, but it can cause unpredictable errors.</p>
    <p>Please <span class="pseudoLink" onclick="window.Services.Save.saveMap('machine')">save the map</span> before editing the heightmap!</p>
    <p style="margin-bottom: 0">Check out ${ee(`https://github.com/Azgaar/Fantasy-Map-Generator/wiki/Heightmap-customization`,`wiki`)} for guidance.</p>`,$(`#alert`).dialog({resizable:!1,title:`Edit Heightmap`,width:`28em`,buttons:{Erase:()=>R(`erase`,e),Keep:()=>R(`keep`,e),Risk:()=>R(`risk`,e),Cancel:function(){$(this).dialog(`close`)}}})}function R(t,n){Le=S.state.active,S.set([]),customization=1,T(),C(`Heightmap edit mode is active. Click on "Exit Customization" to finalize the heightmap`,!0),v(`options`).querySelectorAll(`.tabcontent`).forEach(e=>{e.style.display=`none`}),v(`options`).querySelector(`.tab > .active`).classList.remove(`active`),v(`customizationMenu`).style.display=`block`,v(`toolsTab`).classList.add(`active`),v(`heightmapEditMode`).innerHTML=t,t===`erase`?(undraw(),L.cellType=`all`):t===`keep`?(S.get(`landmass`).getEl().replaceChildren(),L.cellType=`land`):t===`risk`&&(x(`#deftemp`).selectAll(`#land, #water`).selectAll(`path`).remove(),x(`#deftemp`).select(`#featurePaths`).selectAll(`path`).remove(),x(`#viewbox`).selectAll(`#coastline use, #lakes path, #oceanLayers path`).remove(),L.cellType=`all`);let r=e(`cellTypeFilter`);r&&(r.value=L.cellType),E.set(I,`filters`,L),v(`applyTemplate`).style.display=t===`erase`?`inline-block`:`none`,v(`convertImage`).style.display=t===`erase`?`inline-block`:`none`,v(`saveHeightmapDraft`).style.display=t===`erase`?`inline-block`:`none`,v(`loadHeightmapDraft`).style.display=t===`erase`?`inline-block`:`none`,v(`allowErosionBox`).style.display=t===`keep`?`none`:`inline-block`;let i=v(`exitCustomization`);if(sessionStorage.getItem(`noExitButtonAnimation`))i.style.display=`block`;else{sessionStorage.setItem(`noExitButtonAnimation`,`true`),i.style.opacity=`0`;let e=12*v(`uiSize`).value*11;i.style.right=`${(svgWidth-e)/2}px`,i.style.bottom=`${svgHeight/2}px`,i.style.transform=`scale(2)`,i.style.display=`block`,x(`#exitCustomization`).transition().duration(1e3).style(`opacity`,1).transition().duration(2e3).ease(oe).style(`right`,`10px`).style(`bottom`,`10px`).style(`transform`,`scale(1)`)}let a=v(`layersPreset`);a.value=`heightmap`,a.disabled=!0,H(),x(`#viewbox`).on(`touchmove mousemove`,Ue),x(`#map`).on(`dblclick.zoom`,null),n===`templateEditor`?ft():n===`imageConverter`?St():Y()}function Ue(t){let[n,r]=o(t,this),i=Grid.findCell(n,r);v(`heightmapInfoX`).innerHTML=String(d(n)),v(`heightmapInfoY`).innerHTML=String(d(r)),v(`heightmapInfoCell`).innerHTML=String(i),v(`heightmapInfoHeight`).innerHTML=`${grid.cells.h[i]} (${z(grid.cells.h[i])})`,v(`tooltip`).dataset.main&&ce();let a=e(`brushesButtons`)?.querySelector(`button.pressed`);if(a){if(a.id===`brushLine`){x(`#debug`).select(`line`).attr(`x2`,n).attr(`y2`,r);return}if(a.id===`brushFill`){fe();return}pe(n,r,v(`heightmapBrushRadius`).valueAsNumber)}}function z(e){let t=heightUnit.value,n=3.281;t===`m`?n=1:t===`f`&&(n=.5468);let r=-990;return e>=20?r=(e-18)**heightExponentInput.value:e<20&&e>0&&(r=(e-20)/e*50),`${d(r*n)} ${t}`}async function We(){if(x(`#viewbox`).select(`#heights`).selectAll(`*`).size()<200){C(`Insufficient land area. There should be at least 200 land cells!`,!1,`error`);return}if(e(`imageConverter`)){C(`Please exit the Image Conversion mode first`,!1,`error`);return}window.edits=void 0,G(!0,!0),customization=0,v(`customizationMenu`).style.display=`none`,v(`options`).querySelector(`.tab > button.active`).id===`toolsTab`&&(v(`toolsContent`).style.display=`block`),v(`layersPreset`).disabled=!1,v(`exitCustomization`).style.display=`none`,me(),le(),T(),resetZoom(),document.getElementById(`preview`)?.remove(),document.getElementById(`canvas3d`)&&D.View3d.enterStandard();let t=v(`heightmapEditMode`).innerHTML;try{t===`erase`?await Ge():t===`keep`?Ke():t===`risk`&&Je()}catch(e){ERROR&&console.error(e),C(`Failed to apply the edited heightmap: ${e.message}`,!1,`error`,6e3)}x(`#viewbox`).selectAll(`#heights`).remove(),S.draw(`ocean`,`landmass`,`lakes`,`coastline`),S.set(Le)}async function Ge(){pack.cultures=[],pack.burgs=[],pack.states=[],pack.provinces=[],pack.religions=[],pack.relief=[];let e=v(`allowErosion`).checked;await ge.run({erosion:e})}function Ke(){for(let e of pack.cells.i)pack.cells.h[e]=grid.cells.h[pack.cells.g[e]]}var qe=e=>{let t=[];for(let n=0;n<e.p.length;n++)e.h[n]>=20&&t.push([e.p[n][0],e.p[n][1],n]);let n=se(t);return(e,t)=>{let r=n.find(e,t);if(r)return n.remove(r),r[2]}};function Je(){INFO&&console.group(`Edit Heightmap`),TIME&&console.time(`restoreRiskedData`);let e=v(`allowErosion`).checked,t=grid.cells.i.length,r=new Uint8Array(t),i=new Uint16Array(t),a={},o=new Uint16Array(t),s=new Uint32Array(t),c=new Uint16Array(t),l=new Uint16Array(t),u=new Uint16Array(t),d=new Uint16Array(t),f=new Uint16Array(t),p=new Uint16Array(t),m=new Uint16Array(t),h=new Uint8Array(t);for(let t of pack.cells.i){let n=pack.cells.g[t];r[n]=pack.cells.biome[t],u[n]=pack.cells.culture[t],i[n]=pack.cells.pop[t],a[n]=pack.cells.routes[t],o[n]=pack.cells.s[t],c[n]=pack.cells.state[t],l[n]=pack.cells.province[t],s[n]=pack.cells.burg[t],d[n]=pack.cells.religion[t],f[n]=pack.cells.good?.[t]||0,e||(p[n]=pack.cells.fl[t],m[n]=pack.cells.r[t],h[n]=pack.cells.conf[t])}for(let e of grid.cells.i)s[e]&&grid.cells.h[e]<20&&(grid.cells.h[e]=20);for(let e of pack.cultures){if(!e.i||e.removed)continue;let t=pack.cells.p[e.center];e.x=t[0],e.y=t[1]}let g=new Map;for(let e of pack.zones){if(!e.cells?.length)continue;let t=e.cells.map(e=>pack.cells.g[e]);g.set(e.i,n(t))}Features.markupGrid(),e&&Grid.addDeepDepressionLakes(),Temperature.generate(),Precipitation.generate(),Pack.generate(),Features.markupPack(),_e.restore(),e&&(Rivers.generate(!0),Features.defineGroups());let _=pack.cells.i.length;pack.cells.pop=new Float32Array(_),pack.cells.routes={},pack.cells.s=new Uint16Array(_),pack.cells.burg=new Uint32Array(_),pack.cells.state=new Uint16Array(_),pack.cells.province=new Uint16Array(_),pack.cells.culture=new Uint16Array(_),pack.cells.religion=new Uint16Array(_),pack.cells.biome=new Uint8Array(_),pack.cells.good=new Uint16Array(_),e||(pack.cells.r=new Uint16Array(_),pack.cells.conf=new Uint8Array(_),pack.cells.fl=new Uint16Array(_));for(let t of pack.cells.i){let n=pack.cells.g[t],s=pack.cells.h[t]>=20;e||(pack.cells.r[t]=m[n],pack.cells.conf[t]=h[n],pack.cells.fl[t]=p[n]),pack.cells.biome[t]=s&&r[n]?r[n]:Biomes.getId(grid.cells.prec[n],grid.cells.temp[n],pack.cells.h[t],!!pack.cells.r[t]),pack.cells.good[t]=f[n],s&&(pack.cells.culture[t]=u[n],pack.cells.pop[t]=i[n],pack.cells.routes[t]=a[n],pack.cells.s[t]=o[n],pack.cells.state[t]=c[n],pack.cells.province[t]=l[n],pack.cells.religion[t]=d[n])}let y=qe(pack.cells);for(let e of pack.burgs){if(!e.i||e.removed)continue;let t=y(e.x,e.y);if(t===void 0){ERROR&&console.error(`[Data integrity] Burg ${e.i} has no available land cell after Risk restoration. Removing the burg`),Burgs.remove(e.i),re(`burg`,e.i);continue}e.cell=t,e.feature=pack.cells.f[e.cell],pack.cells.burg[e.cell]=e.i,!e.capital&&pack.cells.h[e.cell]<20&&(Burgs.remove(e.i),re(`burg`,e.i)),e.capital&&(pack.states[e.state].center=e.cell)}for(let e of pack.provinces){if(!e.i||e.removed)continue;let t=pack.cells.i.filter(t=>pack.cells.province[t]===e.i);if(!t.length){let t=e.state,n=pack.states[t].provinces;n.includes(e.i)&&pack.states[t].provinces.splice(n.indexOf(e.i),1),e.removed=!0;continue}e.burg&&!pack.burgs[e.burg].removed?e.center=pack.burgs[e.burg].cell:(e.center=t[0],e.burg=pack.cells.burg[e.center])}for(let e of pack.cultures)e.i&&!e.removed&&(e.center=Pack.findCell(e.x,e.y));States.getPoles(),States.findNeighbors(),States.collectStatistics(),e&&(Rivers.specify(),Lakes.defineNames());let b=new Map;for(let e of pack.cells.i){let t=pack.cells.g[e];b.has(t)||b.set(t,[]),b.get(t).push(e)}for(let e of pack.zones){let t=g.get(e.i);if(t?.length){let r=t.flatMap(e=>b.get(e)||[]);e.cells=n(r)}else e.cells=[]}pack.goods?.length?(pack.markets=(pack.markets||[]).filter(e=>{let t=pack.burgs[e.centerBurgId];return!(!t||t.removed)}),Production.regenerateEconomy(),S.draw(`markets`,`goods`),S.draw(`trade`),ue()):(Goods.generate(),Markets.generate(),Production.produce(),States.collectTaxes()),Ice.generate(),x(`#ice`).selectAll(`*`).remove(),TIME&&console.timeEnd(`restoreRiskedData`),INFO&&console.groupEnd()}function B(){let t=l(edits),n=grid.cells.h.reduce((e,n,r)=>n===t[r]?e:e+1,0);if(C(`Cells changed: ${n}`),!n)return;let r=e(`cellTypeFilter`)?.value??L.cellType;if(r===`land`)for(let e of grid.cells.i)(t[e]<20||grid.cells.h[e]<20)&&(grid.cells.h[e]=t[e]);if(r===`water`)for(let e of grid.cells.i)(t[e]>=20||grid.cells.h[e]>=20)&&(grid.cells.h[e]=t[e]);H(),K()}function V(e,t=getColorScheme(`bright`)){return t(1-(e<20?e-5:e)/100)}function H(){let e=Array.from(grid.cells.i),t=v(`renderOcean`).checked?e:e.filter(e=>grid.cells.h[e]>=20);x(`#viewbox`).select(`#heights`).selectAll(`polygon`).data(t).join(`polygon`).attr(`points`,e=>String(Grid.getPolygon(e))).attr(`id`,e=>`cell${e}`).attr(`fill`,e=>V(grid.cells.h[e]))}function U(e){let t=v(`renderOcean`).checked;e.forEach(e=>{let n=x(`#viewbox`).select(`#heights`).select(`#cell${e}`);if(!t&&grid.cells.h[e]<20){n.remove();return}n.size()||(n=x(`#viewbox`).select(`#heights`).append(`polygon`).attr(`points`,String(Grid.getPolygon(e))).attr(`id`,`cell${e}`)),n.attr(`fill`,V(grid.cells.h[e]))})}function W(){let e=grid.cells.h.reduce((e,t)=>t>=20?e+1:e,0);v(`landmassCounter`).innerText=`${e} (${d(e/grid.cells.i.length*100)}%)`,v(`landmassAverage`).innerText=String(d(ie(grid.cells.h)??0))}function G(t,n){let r=(r,i)=>{let a=e(r);a&&(a.disabled=t);let o=e(i);o&&(o.disabled=n)};r(`undo`,`redo`),r(`templateUndo`,`templateRedo`)}function K(e){let t=edits.n;edits=edits.slice(0,t),edits[t]=grid.cells.h.slice(),edits.n=t+1,G(edits.n<=1,!0),e||(W(),document.getElementById(`preview`)&&Q(),document.getElementById(`canvas3d`)&&D.View3d.redraw())}function q(e){edits.n=e,G(edits.n<=1,edits.n>=edits.length),edits[edits.n-1]!==void 0&&(grid.cells.h=edits[edits.n-1].slice(),H(),W(),document.getElementById(`preview`)&&Q(),document.getElementById(`canvas3d`)&&D.View3d.redraw())}function J(){window.edits=[],edits.n=0,G(!0,!0),K()}function Y(){document.getElementById(`brushesPanel`)||(Ye(),$(`#brushesPanel`).dialog({title:`Paint Brushes`,resizable:!1,position:{my:`right top`,at:`right-10 top+10`,of:`svg`},close:Xe}))}function Ye(){w(`brushesPanel`);let e=`<div id="brushesPanel" class="dialog stable">
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
        <option value="all" ${L.cellType===`all`?`selected`:``}>all cells</option>
        <option value="land" ${L.cellType===`land`?`selected`:``}>only land cells</option>
        <option value="water" ${L.cellType===`water`?`selected`:``}>only water cells</option>
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
  </div>`;v(`dialogs`).insertAdjacentHTML(`beforeend`,e),Ze()}function Xe(){Qe(),w(`brushesPanel`)}function Ze(){v(`brushesButtons`).addEventListener(`click`,$e),v(`cellTypeFilter`).addEventListener(`change`,ot),v(`undo`).addEventListener(`click`,()=>q(edits.n-1)),v(`redo`).addEventListener(`click`,()=>q(edits.n+1)),v(`rescaleShow`).addEventListener(`click`,()=>{v(`modifyButtons`).style.display=`none`,v(`rescaleSection`).style.display=`block`}),v(`rescaleHide`).addEventListener(`click`,()=>{v(`modifyButtons`).style.display=`block`,v(`rescaleSection`).style.display=`none`}),v(`rescaler`).addEventListener(`change`,e=>st(e.target.valueAsNumber)),v(`rescaleCondShow`).addEventListener(`click`,()=>{v(`modifyButtons`).style.display=`none`,v(`rescaleCondSection`).style.display=`block`}),v(`rescaleCondHide`).addEventListener(`click`,()=>{v(`modifyButtons`).style.display=`block`,v(`rescaleCondSection`).style.display=`none`}),v(`rescaleExecute`).addEventListener(`click`,ct),v(`smoothHeights`).addEventListener(`click`,lt),v(`disruptHeights`).addEventListener(`click`,ut),v(`brushClear`).addEventListener(`click`,dt)}function Qe(){let e=document.querySelector(`#brushesButtons > button.pressed`);e&&e.classList.remove(`pressed`),me(),x(`#map`).on(`dblclick.zoom`,null),x(`#viewbox`).on(`touchmove mousemove`,Ue),x(`#debug`).selectAll(`.lineCircle`).remove(),fe(),v(`brushesSliders`).style.display=`none`,v(`lineSlider`).style.display=`none`}function $e(e){let t=e.target.closest(`#brushesButtons > button`);if(!t)return;if(t.classList.contains(`pressed`)){Qe();return}Qe(),t.classList.add(`pressed`);let n=v(`heightmapBrushRadius`).parentElement;n&&(n.style.display=t.id===`brushFill`?`none`:``),t.id===`brushLine`?(v(`lineSlider`).style.display=`block`,x(`#viewbox`).style(`cursor`,`crosshair`).on(`click`,et)):t.id===`brushFill`?(v(`brushesSliders`).style.display=`block`,x(`#viewbox`).style(`cursor`,`crosshair`).on(`click`,tt)):(v(`brushesSliders`).style.display=`block`,x(`#viewbox`).style(`cursor`,`crosshair`).call(ae().on(`start`,it)))}function et(e){let[t,n]=o(e,this),r=Grid.findCell(t,n),i=x(`#debug`).selectAll(`.lineCircle`);if(!i.size()){x(`#debug`).append(`line`).attr(`id`,`brushCircle`).attr(`x1`,t).attr(`y1`,n).attr(`x2`,t).attr(`y2`,n),x(`#debug`).append(`circle`).attr(`data-cell`,r).attr(`class`,`lineCircle`).attr(`r`,6).attr(`cx`,t).attr(`cy`,n).attr(`fill`,`yellow`).attr(`stroke`,`#333`).attr(`stroke-width`,2);return}let a=+i.attr(`data-cell`);x(`#debug`).selectAll(`*`).remove();let s=v(`heightmapLinePower`).valueAsNumber;if(s===0){C(`Power should not be zero`,!1,`error`);return}let c=v(`heightmapLineRandomness`).valueAsNumber/200,l=grid.cells.h,u=s>0?HeightmapGenerator.addRange.bind(HeightmapGenerator):HeightmapGenerator.addTrough.bind(HeightmapGenerator);HeightmapGenerator.setGraph(grid),u(`1`,String(Math.abs(s)),``,``,a,r,c);let d=HeightmapGenerator.getHeights(),f=v(`cellTypeFilter`).value,p=[];for(let e=0;e<l.length;e++)d[e]!==l[e]&&(f===`land`&&l[e]<20||f===`water`&&l[e]>=20||(l[e]=d[e],p.push(e)));U(p),K()}function tt(e){let[t,n]=o(e,this),r=Grid.findCell(t,n),i=grid.cells.h[r],a=i<20,s=v(`cellTypeFilter`).value;if(s===`water`){C(`Fill brush is not available with 'only water cells' filter`,!1,`error`);return}if(s===`land`&&a){C(`Land filter is active, water areas cannot be filled`,!1,`error`);return}let{selection:c,reachedBorder:l}=nt(r,a,i);if(c.length<3){C(`No enclosed area found to fill`,!1,`error`);return}if(a&&l){C(`Selected water area is open to map border and is not enclosed`,!1,`error`);return}let u=rt(c,a,i);u.length&&(U(u),B())}function nt(e,t,n){let{h:r,c:i,i:a}=grid.cells,o=new Uint8Array(a.length),s=[e],c=[],l=!1;for(;s.length;){let e=s.pop();o[e]||(o[e]=1,(t?r[e]<20:r[e]===n)&&(c.push(e),grid.cells.b[e]&&(l=!0),i[e].forEach(e=>{o[e]||s.push(e)})))}return{selection:c,reachedBorder:l}}function rt(e,t,n){let i=v(`heightmapBrushPower`).valueAsNumber*10,{h:a,c:o,i:s}=grid.cells,c=new Uint8Array(s.length),l=new Uint16Array(s.length),u=[];e.forEach(e=>{c[e]=1});let d=[],f=0;for(e.forEach(e=>{o[e].some(e=>!c[e])&&(c[e]=2,d.push(e))});f<d.length;){let e=d[f++],t=l[e]+1;o[e].forEach(e=>{c[e]===1&&(c[e]=2,l[e]=t,d.push(e))})}let p=g(e,e=>l[e])||0,m=t?20:n;return e.forEach(e=>{let t=p?l[e]/p:1,n=Math.max(1,Math.round(i*t)),o=r(m+n,0,100);o!==a[e]&&(a[e]=o,u.push(e))}),u}function it(e){let t=v(`heightmapBrushRadius`).valueAsNumber,[n,r]=o(e,this),i=Grid.findCell(n,r),a=e=>{let n=o(e,this);pe(n[0],n[1],t);let r=Grid.findAll(n[0],n[1],t),a=r,s=v(`cellTypeFilter`).value;s===`land`?a=r.filter(e=>grid.cells.h[e]>=20):s===`water`&&(a=r.filter(e=>grid.cells.h[e]<20)),a?.length&&at(a,i)};a(e),e.on(`drag`,a),e.on(`end`,B)}function at(e,t){let n=v(`heightmapBrushPower`).valueAsNumber,i=f(n,1),a=v(`cellTypeFilter`).value===`land`,o=v(`cellTypeFilter`).value===`water`,s=e=>r(e,a?20:0,o?19:100),c=grid.cells.h,l=document.querySelector(`#brushesButtons > button.pressed`).id;l===`brushRaise`?e.forEach(e=>{c[e]=!o&&c[e]<20?20:s(c[e]+n)}):l===`brushElevate`?e.forEach((t,n)=>{c[t]=s(c[t]+i(n/Math.max(e.length-1,1)))}):l===`brushLower`?e.forEach(e=>{c[e]=s(c[e]-n)}):l===`brushDepress`?e.forEach((t,n)=>{c[t]=s(c[t]-i(n/Math.max(e.length-1,1)))}):l===`brushAlign`?e.forEach(e=>{c[e]=s(c[t])}):l===`brushSmooth`?e.forEach(e=>{c[e]=d(((ie(grid.cells.c[e].filter(e=>a?c[e]>=20:!o||c[e]<20).map(e=>c[e]))??0)+c[e]*(10-n)+.6)/(11-n),1)}):l===`brushDisrupt`&&e.forEach(e=>{c[e]=c[e]<15?c[e]:s(c[e]+n/1.6-Math.random()*n)}),U(e)}function ot(){let e=v(`cellTypeFilter`);e.value===`land`&&v(`heightmapEditMode`).innerHTML===`keep`&&(C(`You cannot change the coastline in 'Keep' edit mode`,!1,`error`),e.value=`all`),L.cellType=e.value,E.set(I,`filters`,L)}function st(e){let t=v(`cellTypeFilter`).value===`land`,n=v(`cellTypeFilter`).value===`water`;grid.cells.h=grid.cells.h.map(r=>{if(t&&(r<20||r+e<20)||n&&r>=20)return r;let i=u(r+e);return n?Math.min(i,19):i}),B(),v(`rescaler`).value=`0`}function ct(){let e=`${v(`rescaleLower`).value}-${v(`rescaleHigher`).value}`,t=v(`conditionSign`).value,n=v(`rescaleModifier`).valueAsNumber;if(Number.isNaN(n)){C(`Operand should be a number`,!1,`error`);return}if((t===`add`||t===`subtract`)&&!Number.isInteger(n)){C(`Operand should be an integer`,!1,`error`);return}HeightmapGenerator.setGraph(grid),t===`multiply`?HeightmapGenerator.modify(e,0,n,0):t===`divide`?HeightmapGenerator.modify(e,0,1/n,0):t===`add`?HeightmapGenerator.modify(e,n,1,0):t===`subtract`?HeightmapGenerator.modify(e,-1*n,1,0):t===`exponent`&&HeightmapGenerator.modify(e,0,1,n),grid.cells.h=HeightmapGenerator.getHeights(),B()}function lt(){HeightmapGenerator.setGraph(grid),HeightmapGenerator.smooth(4,1.5),grid.cells.h=HeightmapGenerator.getHeights(),B()}function ut(){grid.cells.h=grid.cells.h.map(e=>e<15?e:u(e+2.5-Math.random()*4)),B()}function dt(){let e=v(`cellTypeFilter`).value;if(e===`land`){C(`Not allowed when 'only land cells' filter is set`,!1,`error`);return}if(e===`water`){C(`Not allowed when 'only water cells' filter is set`,!1,`error`);return}if(!grid.cells.h.some(e=>e)){C(`Heightmap is already cleared, please do not click twice if not required`,!1,`error`);return}grid.cells.h=new Uint8Array(grid.cells.i.length),x(`#viewbox`).select(`#heights`).selectAll(`*`).remove(),K()}function ft(){document.getElementById(`templateEditor`)||(Fe(),$(`#templateEditor`).dialog({title:`Template Editor`,minHeight:`auto`,width:`fit-content`,resizable:!1,position:{my:`right top`,at:`right-10 top+10`,of:`svg`},close:pt}))}function pt(){$(`#templateEditor`).dialog(`destroy`),v(`templateEditor`).remove()}function mt(e){let t=e.target;if(t.tagName!==`BUTTON`)return;let n=t.dataset.type;v(`templateBody`).dataset.changed=`1`,X(n)}function X(e,t,n,r,i){let a=v(`templateBody`);a.insertAdjacentHTML(`beforeend`,ht(e,t,n,r,i));let o=a.querySelector(`div:last-child > span > .templateDist`);if(o&&o.addEventListener(`change`,gt),n&&o&&o.tagName===`SELECT`){for(let e of Array.from(o.options))e.value===n&&(o.value=n);if(o.value!==n){let e=document.createElement(`option`);e.value=e.innerHTML=n,o.add(e),o.value=n}}}function ht(e,t,n,r,i){let a=`<div data-type="${e}"><div class="icon-check" data-tip="Click to skip the step"></div><div style="width:4em">${e}</div><i class="icon-trash-empty pointer" data-tip="Click to remove the step"></i><i class="icon-resize-vertical" data-tip="Drag to reorder"></i>`,o=`<span>y:
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
    </div>`:``}function gt(e){let t=e.target;t.value===`interval`&&prompt(`Set a height interval. Avoid space, use hyphen as a separator`,{default:`17-20`},e=>{let n=document.createElement(`option`);n.value=n.innerHTML=String(e),t.add(n),t.value=String(e)})}function _t(e){let t=v(`templateBody`),n=t.querySelectorAll(`div`).length,r=+t.getAttribute(`data-changed`),i=e.target.value;if(!n||!r){vt(i);return}alertMessage.innerHTML=`Are you sure you want to select a different template? All changes will be lost.`,$(`#alert`).dialog({resizable:!1,title:`Change Template`,buttons:{Change:function(){vt(i),$(this).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}}})}function vt(e){let t=v(`templateBody`);t.setAttribute(`data-changed`,`0`),t.innerHTML=``;let n=he[e]?.template;if(!n)return;let r=n.split(`
`);if(!r.length){C(`Heightmap template: no steps defined`,!1,`error`);return}for(let e of r){let t=e.trim().split(` `);X(t[0],t[1],t[2],t[3],t[4])}}function yt(){let e=v(`templateBody`).querySelectorAll(`#templateBody > div`);if(!e.length)return;let t=v(`templateSeed`).value;Math.random=aleaPRNG(t||_()),grid.cells.h=new Uint8Array(grid.points.length),HeightmapGenerator.setGraph(grid),J();for(let t of e){if(t.style.opacity===`0.5`)continue;let e=t.querySelector(`.templateCount`)?.value||``,n=t.querySelector(`.templateHeight`)?.value||``,r=t.querySelector(`.templateDist`)?.value||``,i=t.querySelector(`.templateX`)?.value||``,a=t.querySelector(`.templateY`)?.value||``,o=t.dataset.type;o===`Hill`?HeightmapGenerator.addHill(e,n,i,a):o===`Pit`?HeightmapGenerator.addPit(e,n,i,a):o===`Range`?HeightmapGenerator.addRange(e,n,i,a):o===`Trough`?HeightmapGenerator.addTrough(e,n,i,a):o===`Strait`?HeightmapGenerator.addStrait(e,r):o===`Mask`?HeightmapGenerator.mask(+e):o===`Invert`?HeightmapGenerator.invert(+e,r):o===`Add`?HeightmapGenerator.modify(r,+e,1):o===`Multiply`?HeightmapGenerator.modify(r,0,+e):o===`Smooth`&&HeightmapGenerator.smooth(+e),grid.cells.h=HeightmapGenerator.getHeights(),K(`noStat`)}grid.cells.h=HeightmapGenerator.getHeights(),W(),H(),document.getElementById(`preview`)&&Q(),document.getElementById(`canvas3d`)&&D.View3d.redraw()}function bt(){let e=v(`templateBody`);e.dataset.changed=`0`;let t=e.querySelectorAll(`#templateBody > div`);if(!t.length)return;let n=``;for(let e of Array.from(t)){if(e.style.opacity===`0.5`)continue;let t=e.getAttribute(`data-type`),r=e.querySelector(`.templateCount`)?.value||`0`,i=e.querySelector(`.templateHeight`)?.value||e.querySelector(`.templateDist`)?.value||`0`,a=e.querySelector(`.templateX`)?.value||`0`,o=e.querySelector(`.templateY`)?.value||`0`;n+=`${t} ${r} ${i} ${a} ${o}\r\n`}let r=`template_${Date.now()}.txt`;c(n,r)}function xt(e){let t=e.split(`\r
`);if(!t.length){C(`Cannot parse the template, please check the file`,!1,`error`);return}v(`templateBody`).innerHTML=``;for(let e of t){let t=e.split(` `);if(t.length!==5){ERROR&&console.error(`Cannot parse step, wrong arguments count`,e);continue}X(t[0],t[1],t[2],t[3],t[4])}}function St(){if(document.getElementById(`imageConverter`))return;v(`imageToLoad`).click(),T(`#imageConverter`),Ie(),$(`#imageConverter`).dialog({title:`Image Converter`,maxHeight:svgHeight*.8,minHeight:`auto`,width:`20em`,position:{my:`right top`,at:`right-10 top+10`,of:`svg`},beforeClose:Pt});let e=document.createElement(`canvas`);e.id=`canvas`,e.width=graphWidth,e.height=graphHeight,document.body.insertBefore(e,v(`optionsContainer`)),jt(0),le(),C(`Image Converter is opened. Upload image and assign height value for each color`,!1,`warn`),grid.cells.h=new Uint8Array(grid.cells.i.length),x(`#viewbox`).select(`#heights`).selectAll(`*`).remove(),K()}function Ct(){let e=+this.getAttribute(`data-color`);v(`colorsSelectValue`).innerHTML=String(e),v(`colorsSelectFriendly`).innerHTML=z(e);let t=v(`imageConverterPalette`).querySelector(`.hoveredColor`);t&&(t.className=``),this.className=`hoveredColor`}function wt(){let e=this.files[0];this.value=``;let t=new FileReader,n=new Image;n.id=`imageToConvert`,n.style.display=`none`,document.body.appendChild(n),n.onload=()=>{v(`canvas`).getContext(`2d`).drawImage(n,0,0,graphWidth,graphHeight),Tt(+v(`convertColors`).value),resetZoom()},t.onloadend=()=>{n.src=t.result},t.readAsDataURL(e)}function Tt(e){let t=v(`canvas`),n=document.createElement(`canvas`);n.width=grid.cellsX,n.height=grid.cellsY,n.getContext(`2d`).drawImage(t,0,0,grid.cellsX,grid.cellsY);let r=new RgbQuant({colors:e});r.sample(n);let i=r.reduce(n),a=r.palette(!0);x(`#viewbox`).select(`#heights`).selectAll(`*`).remove(),x(`#imageConverter`).selectAll(`div.color-div`).remove(),v(`colorsSelect`).style.display=`block`,v(`colorsUnassigned`).style.display=`block`,v(`colorsAssigned`).style.display=`none`,n.remove(),x(`#viewbox`).select(`#heights`).selectAll(`polygon`).data(Array.from(grid.cells.i)).join(`polygon`).attr(`points`,e=>String(Grid.getPolygon(e))).attr(`id`,e=>`cell${e}`).attr(`fill`,e=>`rgb(${i[e*4]}, ${i[e*4+1]}, ${i[e*4+2]})`).on(`click`,Et);let o=a.map(e=>`rgb(${e[0]}, ${e[1]}, ${e[2]})`);x(`#colorsUnassignedContainer`).selectAll(`div`).data(o).enter().append(`div`).attr(`data-color`,e=>e).style(`background-color`,e=>e).attr(`class`,`color-div`).on(`click`,Dt),v(`colorsUnassignedNumber`).innerHTML=String(o.length)}function Et(){let e=this.getAttribute(`fill`);v(`imageConverter`).querySelector(`div[data-color="${e}"]`)?.click()}function Dt(){x(`#viewbox`).select(`#heights`).selectAll(`.selectedCell`).attr(`class`,null);let e=this.classList.contains(`selectedColor`),t=v(`imageConverter`).querySelector(`div.selectedColor`);t&&t.classList.remove(`selectedColor`);let n=v(`imageConverterPalette`).querySelector(`div.hoveredColor`);if(n&&n.classList.remove(`hoveredColor`),v(`colorsSelectValue`).innerHTML=v(`colorsSelectFriendly`).innerHTML=`0`,e)return;if(this.classList.add(`selectedColor`),this.dataset.height){let e=+this.dataset.height;v(`imageConverterPalette`).querySelector(`div[data-color="${e}"]`)?.classList.add(`hoveredColor`),v(`colorsSelectValue`).innerHTML=String(e),v(`colorsSelectFriendly`).innerHTML=z(e)}let r=this.getAttribute(`data-color`);x(`#viewbox`).select(`#heights`).selectAll(`polygon.selectedCell`).classed(`selectedCell`,!1),x(`#viewbox`).select(`#heights`).selectAll(`polygon[fill='${r}']`).classed(`selectedCell`,!0)}function Ot(){let e=+this.dataset.color,t=color(1-(e<20?e-5:e)/100),n=v(`imageConverter`).querySelector(`div.selectedColor`);n.style.backgroundColor=t,n.setAttribute(`data-color`,t),n.setAttribute(`data-height`,String(e)),x(`#viewbox`).select(`#heights`).selectAll(`.selectedCell`).each(function(){this.setAttribute(`fill`,t),this.setAttribute(`data-height`,String(e))}),n.parentNode.id===`colorsUnassignedContainer`&&(v(`colorsAssignedContainer`).appendChild(n),v(`colorsAssigned`).style.display=`block`,v(`colorsUnassignedNumber`).innerHTML=String(v(`colorsUnassignedContainer`).childElementCount-2),v(`colorsAssignedNumber`).innerHTML=String(v(`colorsAssignedContainer`).childElementCount-2))}function kt(e){let t=v(`colorsUnassignedContainer`),n=t.querySelectorAll(`div`);if(!n.length&&(Tt(+v(`convertColors`).value),n=t.querySelectorAll(`div`),!n.length)){C(`No unassigned colors. Please load an image and click the button again`,!1,`error`);return}let r=e=>{let t=s(e).h;return t>300&&(t-=360),t>170?Math.abs(t-250)/3|0:Math.abs(t-250+20)/3|0},i=e=>{let t=Te(e).l;return t<13?t/13*20|0:t|0},a=y(101).map(e=>V(e)),o=a.map(e=>s(e).h|0),c=e=>{let t=a.indexOf(e);if(t!==-1)return t;let n=s(e).h,r=o.reduce((e,t)=>Math.abs(t-n)<Math.abs(e-n)?t:e);return o.indexOf(r)},l=[],u=v(`colorsAssignedContainer`);n.forEach(t=>{let n=t.dataset.color,a=e===`hue`?r(n):e===`lum`?i(n):c(n),o=color(1-(a<20?(a-5)/100:a/100));if(x(`#viewbox`).select(`#heights`).selectAll(`polygon[fill='${n}']`).attr(`fill`,o).attr(`data-height`,a),l[a]){t.remove();return}t.style.backgroundColor=t.dataset.color=o,t.dataset.height=String(a),u.appendChild(t),l[a]=!0}),Array.from(u.children).sort((e,t)=>+e.dataset.height-t.dataset.height).forEach(e=>{u.appendChild(e)}),v(`colorsAssigned`).style.display=`block`,v(`colorsUnassigned`).style.display=`none`,v(`colorsAssignedNumber`).innerHTML=String(u.childElementCount-2)}function At(){prompt(`Please set maximum number of colors. <br>An actual number is usually lower and depends on color scheme`,{default:+v(`convertColors`).value,step:1,min:3,max:255},e=>{v(`convertColors`).value=String(e),Tt(+e)})}function jt(e){v(`convertOverlay`).value=v(`convertOverlayNumber`).value=String(e),v(`canvas`).style.opacity=String(e)}function Mt(){if(v(`colorsAssignedContainer`).childElementCount<3){C(`Please assign colors to heights first`,!1,`error`);return}x(`#viewbox`).select(`#heights`).selectAll(`polygon`).each(function(){let e=+(this.dataset.height??`0`)||0,t=+this.id.slice(4);grid.cells.h[t]=e}),x(`#viewbox`).select(`#heights`).selectAll(`polygon`).remove(),B(),Z()}function Nt(){Z(),x(`#viewbox`).select(`#heights`).selectAll(`polygon`).remove(),q(edits.n-1)}function Z(){document.getElementById(`canvas`)?.remove(),document.getElementById(`imageToConvert`)?.remove(),x(`#imageConverter`).selectAll(`div.color-div`).remove(),v(`colorsAssigned`).style.display=`none`,v(`colorsUnassigned`).style.display=`none`,v(`colorsSelectValue`).innerHTML=v(`colorsSelectFriendly`).innerHTML=`0`,x(`#viewbox`).style(`cursor`,`default`).on(`.drag`,null),C(`Heightmap edit mode is active. Click on "Exit Customization" to finalize the heightmap`,!0),$(`#imageConverter`).dialog(`destroy`),v(`imageConverter`).remove(),Y()}function Pt(e){e.preventDefault(),e.stopPropagation(),alertMessage.innerHTML=`Are you sure you want to close the Image Converter? Click "Cancel" to keep editing. Click "Complete" to apply
  the conversion and close the tool. Click "Close" to discard the conversion and restore the previous heightmap.`,$(`#alert`).dialog({resizable:!1,title:`Close Image Converter`,buttons:{Cancel:function(){$(this).dialog(`close`)},Complete:function(){$(this).dialog(`close`),Mt()},Close:function(){$(this).dialog(`close`),Z(),x(`#viewbox`).select(`#heights`).selectAll(`polygon`).remove(),q(edits.n-1)}}})}function Ft(){let e=document.getElementById(`preview`);if(e){e.remove();return}let t=document.createElement(`canvas`);t.id=`preview`,t.width=grid.cellsX,t.height=grid.cellsY,document.body.insertBefore(t,v(`optionsContainer`)),t.addEventListener(`mouseover`,()=>C(`Heightmap preview. Click to download a screen-sized image`)),t.addEventListener(`click`,It),Q()}function Q(){let e=document.getElementById(`preview`).getContext(`2d`),t=e.createImageData(grid.cellsX,grid.cellsY);grid.cells.h.forEach((e,n)=>{let r=(e<20?Math.max(e/1.5,0):e)/100*255,i=n*4;t.data[i]=r,t.data[i+1]=r,t.data[i+2]=r,t.data[i+3]=255}),e.putImageData(t,0,0)}function It(){let e=document.getElementById(`preview`).toDataURL(`image/png`),n=new Image;n.src=e,n.onload=()=>{let e=document.createElement(`canvas`),r=e.getContext(`2d`);e.width=graphWidth,e.height=graphHeight,document.body.insertBefore(e,v(`optionsContainer`)),r.drawImage(n,0,0,graphWidth,graphHeight);let i=e.toDataURL(`image/png`),a=document.createElement(`a`);a.download=`${t(`Heightmap`)}.png`,a.href=i,a.click(),e.remove()}}var Lt={open:Pe};export{Lt as HeightmapEditor};