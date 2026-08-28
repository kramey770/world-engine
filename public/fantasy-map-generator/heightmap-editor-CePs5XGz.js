import{A as e,Cn as t,Ct as n,E as r,Jt as i,M as a,Qt as o,Sn as s,St as c,T as l,Tt as u,Ut as d,Xt as f,Yt as p,en as m,gn as h,gt as ee,k as g,mn as _,nn as v,q as y,qt as te,tn as ne,un as b,w as re}from"./utils-D3KEhgY0.js";import{t as ie}from"./mean-4Awewi9R.js";import{n as ae}from"./sin-DXK16t1M.js";import{t as oe}from"./quadtree-DgASQllf.js";import{n as se,r as x,t as ce}from"./tooltips-D1wvMKni.js";import{G as le,H as S,J as C,Kt as ue,M as w,Ot as de,Q as T,W as E,n as fe,q as pe,r as me,t as he,v as ge}from"./index-D3JPylQY.js";import{t as _e}from"./graph-override-O0bC0K6n.js";var D=18,ve=.96422,ye=1,be=.82521,xe=4/29,O=6/29,Se=3*O*O,Ce=O*O*O;function we(e){if(e instanceof k)return new k(e.l,e.a,e.b,e.opacity);if(e instanceof P)return Oe(e);e instanceof f||(e=m(e));var t=N(e.r),n=N(e.g),r=N(e.b),i=A((.2225045*t+.7168786*n+.0606169*r)/ye),a,o;return t===n&&n===r?a=o=i:(a=A((.4360747*t+.3850649*n+.1430804*r)/ve),o=A((.0139322*t+.0971045*n+.7141733*r)/be)),new k(116*i-16,500*(a-i),200*(i-o),e.opacity)}function Te(e,t,n,r){return arguments.length===1?we(e):new k(e,t,n,r??1)}function k(e,t,n,r){this.l=+e,this.a=+t,this.b=+n,this.opacity=+r}ne(k,Te,v(p,{brighter(e){return new k(this.l+D*(e??1),this.a,this.b,this.opacity)},darker(e){return new k(this.l-D*(e??1),this.a,this.b,this.opacity)},rgb(){var e=(this.l+16)/116,t=isNaN(this.a)?e:e+this.a/500,n=isNaN(this.b)?e:e-this.b/200;return t=ve*j(t),e=ye*j(e),n=be*j(n),new f(M(3.1338561*t-1.6168667*e-.4906146*n),M(-.9787684*t+1.9161415*e+.033454*n),M(.0719453*t-.2289914*e+1.4052427*n),this.opacity)}}));function A(e){return e>Ce?e**(1/3):e/Se+xe}function j(e){return e>O?e*e*e:Se*(e-xe)}function M(e){return 255*(e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055)}function N(e){return(e/=255)<=.04045?e/12.92:((e+.055)/1.055)**2.4}function Ee(e){if(e instanceof P)return new P(e.h,e.c,e.l,e.opacity);if(e instanceof k||(e=we(e)),e.a===0&&e.b===0)return new P(NaN,0<e.l&&e.l<100?0:NaN,e.l,e.opacity);var t=Math.atan2(e.b,e.a)*te;return new P(t<0?t+360:t,Math.sqrt(e.a*e.a+e.b*e.b),e.l,e.opacity)}function De(e,t,n,r){return arguments.length===1?Ee(e):new P(e,t,n,r??1)}function P(e,t,n,r){this.h=+e,this.c=+t,this.l=+n,this.opacity=+r}function Oe(e){if(isNaN(e.h))return new k(e.l,0,0,e.opacity);var t=e.h*i;return new k(e.l,Math.cos(t)*e.c,Math.sin(t)*e.c,e.opacity)}ne(P,De,v(p,{brighter(e){return new P(this.h,this.c,this.l+D*(e??1),this.opacity)},darker(e){return new P(this.h,this.c,this.l-D*(e??1),this.opacity)},rgb(){return Oe(this).rgb()}}));var F=`heightmapEditor`,I;function ke(e){I=w.get(F,`filters`,()=>({cellType:`all`})),[`all`,`land`,`water`].includes(I.cellType)||(I.cellType=`all`),w.set(F,`filters`,I);let{mode:t,tool:n}=e||{};He(),b(`#viewbox`).selectAll(`#heights`).remove(),b(`#viewbox`).insert(`g`,`#terrs`).attr(`id`,`heights`),t?L(t,n):Pe(n)}Ne();function Ae(){E(`templateEditor`),g(`dialogs`).insertAdjacentHTML(`beforeend`,`<div id="templateEditor" class="dialog stable">
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
    </div>`);let e=g(`templateBody`);$(`#templateBody`).sortable({items:`> div`,handle:`.icon-resize-vertical`,containment:`#templateBody`,axis:`y`}),e.addEventListener(`click`,t=>{let n=t.target;if(n.classList.contains(`icon-check`)){n.classList.remove(`icon-check`),n.classList.add(`icon-check-empty`),n.parentElement.style.opacity=`0.5`,e.dataset.changed=`1`;return}if(n.classList.contains(`icon-check-empty`)){n.classList.add(`icon-check`),n.classList.remove(`icon-check-empty`),n.parentElement.style.opacity=`1`;return}n.classList.contains(`icon-trash-empty`)&&n.parentElement.remove()}),g(`templateEditor`).addEventListener(`keypress`,e=>{e.key===`Enter`&&(e.preventDefault(),ft())}),g(`templateTools`).addEventListener(`click`,st),g(`templateSelect`).addEventListener(`change`,ut),g(`templateRun`).addEventListener(`click`,ft),g(`templateUndo`).addEventListener(`click`,()=>G(edits.n-1)),g(`templateRedo`).addEventListener(`click`,()=>G(edits.n+1)),g(`templateSave`).addEventListener(`click`,pt),g(`templateLoad`).addEventListener(`click`,()=>g(`templateToLoad`).click()),g(`templateToLoad`).onchange=()=>{r(g(`templateToLoad`),mt)}}function je(){E(`imageConverter`),g(`dialogs`).insertAdjacentHTML(`beforeend`,`<div id="imageConverter" class="dialog stable">
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
    </div>`),b(`#imageConverterPalette`).selectAll(`div`).data(_(101)).enter().append(`div`).attr(`data-color`,e=>e).style(`background-color`,e=>color(1-(e<20?e-5:e)/100)).style(`width`,e=>e<40||e>68?`.2em`:`.1em`).on(`touchmove mousemove`,gt).on(`click`,bt),g(`convertImageLoad`).addEventListener(`click`,()=>g(`imageToLoad`).click()),g(`imageToLoad`).onchange=()=>_t.call(g(`imageToLoad`)),g(`convertAutoLum`).addEventListener(`click`,()=>xt(`lum`)),g(`convertAutoHue`).addEventListener(`click`,()=>xt(`hue`)),g(`convertAutoFMG`).addEventListener(`click`,()=>xt(`scheme`)),g(`convertColorsButton`).addEventListener(`click`,St),g(`convertComplete`).addEventListener(`click`,Ct),g(`convertCancel`).addEventListener(`click`,wt),g(`convertOverlay`).addEventListener(`input`,function(){X(+this.value)}),g(`convertOverlayNumber`).addEventListener(`input`,function(){X(+this.value)})}var Me=[];function Ne(){g(`paintBrushes`).addEventListener(`click`,K),g(`applyTemplate`).addEventListener(`click`,at),g(`convertImage`).addEventListener(`click`,ht),g(`heightmapPreview`).addEventListener(`click`,Et),g(`heightmap3DView`).addEventListener(`click`,changeViewMode),g(`finalizeHeightmap`).addEventListener(`click`,Le),g(`renderOcean`).addEventListener(`click`,B)}function Pe(e){alertMessage.innerHTML=`Heightmap is a core element on which all other data (rivers, burgs, states etc) is based. So the best edit approach is to
    <i>erase</i> the secondary data and let the system automatically regenerate it on edit completion.
    <p><i>Erase</i> mode also allows you Convert an Image into a heightmap or use Template Editor.</p>
    <p>You can <i>keep</i> the data, but you won't be able to change the coastline.</p>
    <p>Try <i>risk</i> mode to change the coastline and keep the data. The data will be restored as much as possible, but it can cause unpredictable errors.</p>
    <p>Please <span class="pseudoLink" onclick="window.Services.Save.saveMap('machine')">save the map</span> before editing the heightmap!</p>
    <p style="margin-bottom: 0">Check out ${y(`https://github.com/Azgaar/Fantasy-Map-Generator/wiki/Heightmap-customization`,`wiki`)} for guidance.</p>`,$(`#alert`).dialog({resizable:!1,title:`Edit Heightmap`,width:`28em`,buttons:{Erase:()=>L(`erase`,e),Keep:()=>L(`keep`,e),Risk:()=>L(`risk`,e),Cancel:function(){$(this).dialog(`close`)}}})}function L(t,n){Me=T.state.active,T.set([]),customization=1,S(),x(`Heightmap edit mode is active. Click on "Exit Customization" to finalize the heightmap`,!0),g(`options`).querySelectorAll(`.tabcontent`).forEach(e=>{e.style.display=`none`}),g(`options`).querySelector(`.tab > .active`).classList.remove(`active`),g(`customizationMenu`).style.display=`block`,g(`toolsTab`).classList.add(`active`),g(`heightmapEditMode`).innerHTML=t,t===`erase`?(undraw(),I.cellType=`all`):t===`keep`?(T.get(`landmass`).getEl().replaceChildren(),I.cellType=`land`):t===`risk`&&(b(`#deftemp`).selectAll(`#land, #water`).selectAll(`path`).remove(),b(`#deftemp`).select(`#featurePaths`).selectAll(`path`).remove(),b(`#viewbox`).selectAll(`#coastline use, #lakes path, #oceanLayers path`).remove(),I.cellType=`all`);let r=e(`cellTypeFilter`);r&&(r.value=I.cellType),w.set(F,`filters`,I),g(`applyTemplate`).style.display=t===`erase`?`inline-block`:`none`,g(`convertImage`).style.display=t===`erase`?`inline-block`:`none`,g(`allowErosionBox`).style.display=t===`keep`?`none`:`inline-block`;let i=g(`exitCustomization`);if(sessionStorage.getItem(`noExitButtonAnimation`))i.style.display=`block`;else{sessionStorage.setItem(`noExitButtonAnimation`,`true`),i.style.opacity=`0`;let e=12*g(`uiSize`).value*11;i.style.right=`${(svgWidth-e)/2}px`,i.style.bottom=`${svgHeight/2}px`,i.style.transform=`scale(2)`,i.style.display=`block`,b(`#exitCustomization`).transition().duration(1e3).style(`opacity`,1).transition().duration(2e3).ease(ae).style(`right`,`10px`).style(`bottom`,`10px`).style(`transform`,`scale(1)`)}let a=g(`layersPreset`);a.value=`heightmap`,a.disabled=!0,B(),b(`#viewbox`).on(`touchmove mousemove`,Fe),b(`#map`).on(`dblclick.zoom`,null),n===`templateEditor`?at():n===`imageConverter`?ht():K()}function Fe(t){let[n,r]=a(t,this),i=Grid.findCell(n,r);g(`heightmapInfoX`).innerHTML=String(u(n)),g(`heightmapInfoY`).innerHTML=String(u(r)),g(`heightmapInfoCell`).innerHTML=String(i),g(`heightmapInfoHeight`).innerHTML=`${grid.cells.h[i]} (${Ie(grid.cells.h[i])})`,g(`tooltip`).dataset.main&&se();let o=e(`brushesButtons`)?.querySelector(`button.pressed`);if(o){if(o.id===`brushLine`){b(`#debug`).select(`line`).attr(`x2`,n).attr(`y2`,r);return}if(o.id===`brushFill`){fe();return}he(n,r,g(`heightmapBrushRadius`).valueAsNumber)}}function Ie(e){let t=heightUnit.value,n=3.281;t===`m`?n=1:t===`f`&&(n=.5468);let r=-990;return e>=20?r=(e-18)**heightExponentInput.value:e<20&&e>0&&(r=(e-20)/e*50),`${u(r*n)} ${t}`}async function Le(){if(b(`#viewbox`).select(`#heights`).selectAll(`*`).size()<200){x(`Insufficient land area. There should be at least 200 land cells!`,!1,`error`);return}if(e(`imageConverter`)){x(`Please exit the Image Conversion mode first`,!1,`error`);return}window.edits=void 0,U(!0,!0),customization=0,g(`customizationMenu`).style.display=`none`,g(`options`).querySelector(`.tab > button.active`).id===`toolsTab`&&(g(`toolsContent`).style.display=`block`),g(`layersPreset`).disabled=!1,g(`exitCustomization`).style.display=`none`,pe(),ce(),S(),resetZoom(),document.getElementById(`preview`)?.remove(),document.getElementById(`canvas3d`)&&C.View3d.enterStandard();let t=g(`heightmapEditMode`).innerHTML;try{t===`erase`?await Re():t===`keep`?ze():t===`risk`&&Ve()}catch(e){ERROR&&console.error(e),x(`Failed to apply the edited heightmap: ${e.message}`,!1,`error`,6e3)}b(`#viewbox`).selectAll(`#heights`).remove(),T.draw(`ocean`,`landmass`,`lakes`,`coastline`),T.set(Me)}async function Re(){pack.cultures=[],pack.burgs=[],pack.states=[],pack.provinces=[],pack.religions=[],pack.relief=[];let e=g(`allowErosion`).checked;await me.run({erosion:e})}function ze(){for(let e of pack.cells.i)pack.cells.h[e]=grid.cells.h[pack.cells.g[e]]}var Be=e=>{let t=[];for(let n=0;n<e.p.length;n++)e.h[n]>=20&&t.push([e.p[n][0],e.p[n][1],n]);let n=oe(t);return(e,t)=>{let r=n.find(e,t);if(r)return n.remove(r),r[2]}};function Ve(){INFO&&console.group(`Edit Heightmap`),TIME&&console.time(`restoreRiskedData`);let e=g(`allowErosion`).checked,n=grid.cells.i.length,r=new Uint8Array(n),i=new Uint16Array(n),a={},o=new Uint16Array(n),s=new Uint16Array(n),c=new Uint16Array(n),l=new Uint16Array(n),u=new Uint16Array(n),d=new Uint16Array(n),f=new Uint16Array(n),p=new Uint16Array(n),m=new Uint16Array(n),h=new Uint8Array(n);for(let t of pack.cells.i){let n=pack.cells.g[t];r[n]=pack.cells.biome[t],u[n]=pack.cells.culture[t],i[n]=pack.cells.pop[t],a[n]=pack.cells.routes[t],o[n]=pack.cells.s[t],c[n]=pack.cells.state[t],l[n]=pack.cells.province[t],s[n]=pack.cells.burg[t],d[n]=pack.cells.religion[t],f[n]=pack.cells.good?.[t]||0,e||(p[n]=pack.cells.fl[t],m[n]=pack.cells.r[t],h[n]=pack.cells.conf[t])}for(let e of grid.cells.i)s[e]&&grid.cells.h[e]<20&&(grid.cells.h[e]=20);for(let e of pack.cultures){if(!e.i||e.removed)continue;let t=pack.cells.p[e.center];e.x=t[0],e.y=t[1]}let ee=new Map;for(let e of pack.zones){if(!e.cells?.length)continue;let n=e.cells.map(e=>pack.cells.g[e]);ee.set(e.i,t(n))}Features.markupGrid(),e&&Grid.addDeepDepressionLakes(),Temperature.generate(),Precipitation.generate(),Pack.generate(),Features.markupPack(),_e.restore(),e&&(Rivers.generate(!0),Features.defineGroups());let _=pack.cells.i.length;pack.cells.pop=new Float32Array(_),pack.cells.routes={},pack.cells.s=new Uint16Array(_),pack.cells.burg=new Uint16Array(_),pack.cells.state=new Uint16Array(_),pack.cells.province=new Uint16Array(_),pack.cells.culture=new Uint16Array(_),pack.cells.religion=new Uint16Array(_),pack.cells.biome=new Uint8Array(_),pack.cells.good=new Uint16Array(_),e||(pack.cells.r=new Uint16Array(_),pack.cells.conf=new Uint8Array(_),pack.cells.fl=new Uint16Array(_));for(let t of pack.cells.i){let n=pack.cells.g[t],s=pack.cells.h[t]>=20;e||(pack.cells.r[t]=m[n],pack.cells.conf[t]=h[n],pack.cells.fl[t]=p[n]),pack.cells.biome[t]=s&&r[n]?r[n]:Biomes.getId(grid.cells.prec[n],grid.cells.temp[n],pack.cells.h[t],!!pack.cells.r[t]),pack.cells.good[t]=f[n],s&&(pack.cells.culture[t]=u[n],pack.cells.pop[t]=i[n],pack.cells.routes[t]=a[n],pack.cells.s[t]=o[n],pack.cells.state[t]=c[n],pack.cells.province[t]=l[n],pack.cells.religion[t]=d[n])}let v=Be(pack.cells);for(let e of pack.burgs){if(!e.i||e.removed)continue;let t=v(e.x,e.y);if(t===void 0){ERROR&&console.error(`[Data integrity] Burg ${e.i} has no available land cell after Risk restoration. Removing the burg`),Burgs.remove(e.i),de(`burg`,e.i);continue}e.cell=t,e.feature=pack.cells.f[e.cell],pack.cells.burg[e.cell]=e.i,!e.capital&&pack.cells.h[e.cell]<20&&(Burgs.remove(e.i),de(`burg`,e.i)),e.capital&&(pack.states[e.state].center=e.cell)}for(let e of pack.provinces){if(!e.i||e.removed)continue;let t=pack.cells.i.filter(t=>pack.cells.province[t]===e.i);if(!t.length){let t=e.state,n=pack.states[t].provinces;n.includes(e.i)&&pack.states[t].provinces.splice(n.indexOf(e.i),1),e.removed=!0;continue}e.burg&&!pack.burgs[e.burg].removed?e.center=pack.burgs[e.burg].cell:(e.center=t[0],e.burg=pack.cells.burg[e.center])}for(let e of pack.cultures)!e.i||e.removed||(e.center=Pack.findCell(e.x,e.y));States.getPoles(),States.findNeighbors(),States.collectStatistics(),e&&(Rivers.specify(),Lakes.defineNames());let y=new Map;for(let e of pack.cells.i){let t=pack.cells.g[e];y.has(t)||y.set(t,[]),y.get(t).push(e)}for(let e of pack.zones){let n=ee.get(e.i);n?.length?e.cells=t(n.flatMap(e=>y.get(e)||[])):e.cells=[]}pack.goods?.length?(pack.markets=(pack.markets||[]).filter(e=>{let t=pack.burgs[e.centerBurgId];return!!(t&&!t.removed)}),Production.regenerateEconomy(),T.draw(`markets`,`goods`),T.draw(`trade`),le()):(Goods.generate(),Markets.generate(),Production.produce(),States.collectTaxes()),Ice.generate(),b(`#ice`).selectAll(`*`).remove(),TIME&&console.timeEnd(`restoreRiskedData`),INFO&&console.groupEnd()}function R(){let t=s(edits),n=grid.cells.h.reduce((e,n,r)=>n===t[r]?e:e+1,0);if(x(`Cells changed: ${n}`),!n)return;let r=e(`cellTypeFilter`)?.value??I.cellType;if(r===`land`)for(let e of grid.cells.i)(t[e]<20||grid.cells.h[e]<20)&&(grid.cells.h[e]=t[e]);if(r===`water`)for(let e of grid.cells.i)(t[e]>=20||grid.cells.h[e]>=20)&&(grid.cells.h[e]=t[e]);B(),W()}function z(e,t=getColorScheme(`bright`)){return t(1-(e<20?e-5:e)/100)}function B(){let e=Array.from(grid.cells.i),t=g(`renderOcean`).checked?e:e.filter(e=>grid.cells.h[e]>=20);b(`#viewbox`).select(`#heights`).selectAll(`polygon`).data(t).join(`polygon`).attr(`points`,e=>String(Grid.getPolygon(e))).attr(`id`,e=>`cell${e}`).attr(`fill`,e=>z(grid.cells.h[e]))}function V(e){let t=g(`renderOcean`).checked;e.forEach(e=>{let n=b(`#viewbox`).select(`#heights`).select(`#cell${e}`);if(!t&&grid.cells.h[e]<20){n.remove();return}n.size()||(n=b(`#viewbox`).select(`#heights`).append(`polygon`).attr(`points`,String(Grid.getPolygon(e))).attr(`id`,`cell${e}`)),n.attr(`fill`,z(grid.cells.h[e]))})}function H(){let e=grid.cells.h.reduce((e,t)=>t>=20?e+1:e,0);g(`landmassCounter`).innerText=`${e} (${u(e/grid.cells.i.length*100)}%)`,g(`landmassAverage`).innerText=String(u(ie(grid.cells.h)??0))}function U(t,n){let r=(r,i)=>{let a=e(r);a&&(a.disabled=t);let o=e(i);o&&(o.disabled=n)};r(`undo`,`redo`),r(`templateUndo`,`templateRedo`)}function W(e){let t=edits.n;edits=edits.slice(0,t),edits[t]=grid.cells.h.slice(),edits.n=t+1,U(edits.n<=1,!0),e||(H(),document.getElementById(`preview`)&&Q(),document.getElementById(`canvas3d`)&&C.View3d.redraw())}function G(e){edits.n=e,U(edits.n<=1,edits.n>=edits.length),edits[edits.n-1]!==void 0&&(grid.cells.h=edits[edits.n-1].slice(),B(),H(),document.getElementById(`preview`)&&Q(),document.getElementById(`canvas3d`)&&C.View3d.redraw())}function He(){window.edits=[],edits.n=0,U(!0,!0),W()}function K(){document.getElementById(`brushesPanel`)||(Ue(),$(`#brushesPanel`).dialog({title:`Paint Brushes`,resizable:!1,position:{my:`right top`,at:`right-10 top+10`,of:`svg`},close:We}))}function Ue(){E(`brushesPanel`);let e=`<div id="brushesPanel" class="dialog stable">
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
        <option value="all" ${I.cellType===`all`?`selected`:``}>all cells</option>
        <option value="land" ${I.cellType===`land`?`selected`:``}>only land cells</option>
        <option value="water" ${I.cellType===`water`?`selected`:``}>only water cells</option>
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
  </div>`;g(`dialogs`).insertAdjacentHTML(`beforeend`,e),Ge()}function We(){q(),E(`brushesPanel`)}function Ge(){g(`brushesButtons`).addEventListener(`click`,Ke),g(`cellTypeFilter`).addEventListener(`change`,$e),g(`undo`).addEventListener(`click`,()=>G(edits.n-1)),g(`redo`).addEventListener(`click`,()=>G(edits.n+1)),g(`rescaleShow`).addEventListener(`click`,()=>{g(`modifyButtons`).style.display=`none`,g(`rescaleSection`).style.display=`block`}),g(`rescaleHide`).addEventListener(`click`,()=>{g(`modifyButtons`).style.display=`block`,g(`rescaleSection`).style.display=`none`}),g(`rescaler`).addEventListener(`change`,e=>et(e.target.valueAsNumber)),g(`rescaleCondShow`).addEventListener(`click`,()=>{g(`modifyButtons`).style.display=`none`,g(`rescaleCondSection`).style.display=`block`}),g(`rescaleCondHide`).addEventListener(`click`,()=>{g(`modifyButtons`).style.display=`block`,g(`rescaleCondSection`).style.display=`none`}),g(`rescaleExecute`).addEventListener(`click`,tt),g(`smoothHeights`).addEventListener(`click`,nt),g(`disruptHeights`).addEventListener(`click`,rt),g(`brushClear`).addEventListener(`click`,it)}function q(){let e=document.querySelector(`#brushesButtons > button.pressed`);e&&e.classList.remove(`pressed`),pe(),b(`#map`).on(`dblclick.zoom`,null),b(`#viewbox`).on(`touchmove mousemove`,Fe),b(`#debug`).selectAll(`.lineCircle`).remove(),fe(),g(`brushesSliders`).style.display=`none`,g(`lineSlider`).style.display=`none`}function Ke(e){let t=e.target.closest(`#brushesButtons > button`);if(!t)return;if(t.classList.contains(`pressed`)){q();return}q(),t.classList.add(`pressed`);let n=g(`heightmapBrushRadius`).parentElement;n&&(n.style.display=t.id===`brushFill`?`none`:``),t.id===`brushLine`?(g(`lineSlider`).style.display=`block`,b(`#viewbox`).style(`cursor`,`crosshair`).on(`click`,qe)):t.id===`brushFill`?(g(`brushesSliders`).style.display=`block`,b(`#viewbox`).style(`cursor`,`crosshair`).on(`click`,Je)):(g(`brushesSliders`).style.display=`block`,b(`#viewbox`).style(`cursor`,`crosshair`).call(ue().on(`start`,Ze)))}function qe(e){let[t,n]=a(e,this),r=Grid.findCell(t,n),i=b(`#debug`).selectAll(`.lineCircle`);if(!i.size()){b(`#debug`).append(`line`).attr(`id`,`brushCircle`).attr(`x1`,t).attr(`y1`,n).attr(`x2`,t).attr(`y2`,n),b(`#debug`).append(`circle`).attr(`data-cell`,r).attr(`class`,`lineCircle`).attr(`r`,6).attr(`cx`,t).attr(`cy`,n).attr(`fill`,`yellow`).attr(`stroke`,`#333`).attr(`stroke-width`,2);return}let o=+i.attr(`data-cell`);b(`#debug`).selectAll(`*`).remove();let s=g(`heightmapLinePower`).valueAsNumber;if(s===0){x(`Power should not be zero`,!1,`error`);return}let c=g(`heightmapLineRandomness`).valueAsNumber/200,l=grid.cells.h,u=s>0?HeightmapGenerator.addRange.bind(HeightmapGenerator):HeightmapGenerator.addTrough.bind(HeightmapGenerator);HeightmapGenerator.setGraph(grid),u(`1`,String(Math.abs(s)),``,``,o,r,c);let d=HeightmapGenerator.getHeights(),f=g(`cellTypeFilter`).value,p=[];for(let e=0;e<l.length;e++)d[e]!==l[e]&&(f===`land`&&l[e]<20||f===`water`&&l[e]>=20||(l[e]=d[e],p.push(e)));V(p),W()}function Je(e){let[t,n]=a(e,this),r=Grid.findCell(t,n),i=grid.cells.h[r],o=i<20,s=g(`cellTypeFilter`).value;if(s===`water`){x(`Fill brush is not available with 'only water cells' filter`,!1,`error`);return}if(s===`land`&&o){x(`Land filter is active, water areas cannot be filled`,!1,`error`);return}let{selection:c,reachedBorder:l}=Ye(r,o,i);if(c.length<3){x(`No enclosed area found to fill`,!1,`error`);return}if(o&&l){x(`Selected water area is open to map border and is not enclosed`,!1,`error`);return}let u=Xe(c,o,i);u.length&&(V(u),R())}function Ye(e,t,n){let{h:r,c:i,i:a}=grid.cells,o=new Uint8Array(a.length),s=[e],c=[],l=!1;for(;s.length;){let e=s.pop();o[e]||(o[e]=1,(t?r[e]<20:r[e]===n)&&(c.push(e),grid.cells.b[e]&&(l=!0),i[e].forEach(e=>{o[e]||s.push(e)})))}return{selection:c,reachedBorder:l}}function Xe(e,t,r){let i=g(`heightmapBrushPower`).valueAsNumber*10,{h:a,c:o,i:s}=grid.cells,c=new Uint8Array(s.length),l=new Uint16Array(s.length),u=[];e.forEach(e=>{c[e]=1});let d=[],f=0;for(e.forEach(e=>{o[e].some(e=>!c[e])&&(c[e]=2,d.push(e))});f<d.length;){let e=d[f++],t=l[e]+1;o[e].forEach(e=>{c[e]===1&&(c[e]=2,l[e]=t,d.push(e))})}let p=h(e,e=>l[e])||0,m=t?20:r;return e.forEach(e=>{let t=p?l[e]/p:1,r=n(m+Math.max(1,Math.round(i*t)),0,100);r!==a[e]&&(a[e]=r,u.push(e))}),u}function Ze(e){let t=g(`heightmapBrushRadius`).valueAsNumber,[n,r]=a(e,this),i=Grid.findCell(n,r),o=e=>{let n=a(e,this);he(n[0],n[1],t);let r=Grid.findAll(n[0],n[1],t),o=r,s=g(`cellTypeFilter`).value;s===`land`?o=r.filter(e=>grid.cells.h[e]>=20):s===`water`&&(o=r.filter(e=>grid.cells.h[e]<20)),o?.length&&Qe(o,i)};o(e),e.on(`drag`,o),e.on(`end`,R)}function Qe(e,t){let r=g(`heightmapBrushPower`).valueAsNumber,i=d(r,1),a=g(`cellTypeFilter`).value===`land`,o=g(`cellTypeFilter`).value===`water`,s=e=>n(e,a?20:0,o?19:100),c=grid.cells.h,l=document.querySelector(`#brushesButtons > button.pressed`).id;l===`brushRaise`?e.forEach(e=>{c[e]=!o&&c[e]<20?20:s(c[e]+r)}):l===`brushElevate`?e.forEach((t,n)=>{c[t]=s(c[t]+i(n/Math.max(e.length-1,1)))}):l===`brushLower`?e.forEach(e=>{c[e]=s(c[e]-r)}):l===`brushDepress`?e.forEach((t,n)=>{c[t]=s(c[t]-i(n/Math.max(e.length-1,1)))}):l===`brushAlign`?e.forEach(e=>{c[e]=s(c[t])}):l===`brushSmooth`?e.forEach(e=>{c[e]=u(((ie(grid.cells.c[e].filter(e=>a?c[e]>=20:o?c[e]<20:!0).map(e=>c[e]))??0)+c[e]*(10-r)+.6)/(11-r),1)}):l===`brushDisrupt`&&e.forEach(e=>{c[e]=c[e]<15?c[e]:s(c[e]+r/1.6-Math.random()*r)}),V(e)}function $e(){let e=g(`cellTypeFilter`);e.value===`land`&&g(`heightmapEditMode`).innerHTML===`keep`&&(x(`You cannot change the coastline in 'Keep' edit mode`,!1,`error`),e.value=`all`),I.cellType=e.value,w.set(F,`filters`,I)}function et(e){let t=g(`cellTypeFilter`).value===`land`,n=g(`cellTypeFilter`).value===`water`;grid.cells.h=grid.cells.h.map(r=>{if(t&&(r<20||r+e<20)||n&&r>=20)return r;let i=c(r+e);return n?Math.min(i,19):i}),R(),g(`rescaler`).value=`0`}function tt(){let e=`${g(`rescaleLower`).value}-${g(`rescaleHigher`).value}`,t=g(`conditionSign`).value,n=g(`rescaleModifier`).valueAsNumber;if(Number.isNaN(n)){x(`Operand should be a number`,!1,`error`);return}if((t===`add`||t===`subtract`)&&!Number.isInteger(n)){x(`Operand should be an integer`,!1,`error`);return}HeightmapGenerator.setGraph(grid),t===`multiply`?HeightmapGenerator.modify(e,0,n,0):t===`divide`?HeightmapGenerator.modify(e,0,1/n,0):t===`add`?HeightmapGenerator.modify(e,n,1,0):t===`subtract`?HeightmapGenerator.modify(e,-1*n,1,0):t===`exponent`&&HeightmapGenerator.modify(e,0,1,n),grid.cells.h=HeightmapGenerator.getHeights(),R()}function nt(){HeightmapGenerator.setGraph(grid),HeightmapGenerator.smooth(4,1.5),grid.cells.h=HeightmapGenerator.getHeights(),R()}function rt(){grid.cells.h=grid.cells.h.map(e=>e<15?e:c(e+2.5-Math.random()*4)),R()}function it(){let e=g(`cellTypeFilter`).value;if(e===`land`){x(`Not allowed when 'only land cells' filter is set`,!1,`error`);return}if(e===`water`){x(`Not allowed when 'only water cells' filter is set`,!1,`error`);return}if(!grid.cells.h.some(e=>e)){x(`Heightmap is already cleared, please do not click twice if not required`,!1,`error`);return}grid.cells.h=new Uint8Array(grid.cells.i.length),b(`#viewbox`).select(`#heights`).selectAll(`*`).remove(),W()}function at(){document.getElementById(`templateEditor`)||(Ae(),$(`#templateEditor`).dialog({title:`Template Editor`,minHeight:`auto`,width:`fit-content`,resizable:!1,position:{my:`right top`,at:`right-10 top+10`,of:`svg`},close:ot}))}function ot(){$(`#templateEditor`).dialog(`destroy`),g(`templateEditor`).remove()}function st(e){let t=e.target;if(t.tagName!==`BUTTON`)return;let n=t.dataset.type;g(`templateBody`).dataset.changed=`1`,J(n)}function J(e,t,n,r,i){let a=g(`templateBody`);a.insertAdjacentHTML(`beforeend`,ct(e,t,n,r,i));let o=a.querySelector(`div:last-child > span > .templateDist`);if(o&&o.addEventListener(`change`,lt),n&&o&&o.tagName===`SELECT`){for(let e of Array.from(o.options))e.value===n&&(o.value=n);if(o.value!==n){let e=document.createElement(`option`);e.value=e.innerHTML=n,o.add(e),o.value=n}}}function ct(e,t,n,r,i){let a=`<div data-type="${e}"><div class="icon-check" data-tip="Click to skip the step"></div><div style="width:4em">${e}</div><i class="icon-trash-empty pointer" data-tip="Click to remove the step"></i><i class="icon-resize-vertical" data-tip="Drag to reorder"></i>`,o=`<span>y:
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
    </div>`:``}function lt(e){let t=e.target;t.value===`interval`&&prompt(`Set a height interval. Avoid space, use hyphen as a separator`,{default:`17-20`},e=>{let n=document.createElement(`option`);n.value=n.innerHTML=String(e),t.add(n),t.value=String(e)})}function ut(e){let t=g(`templateBody`),n=t.querySelectorAll(`div`).length,r=+t.getAttribute(`data-changed`),i=e.target.value;if(!n||!r){dt(i);return}alertMessage.innerHTML=`Are you sure you want to select a different template? All changes will be lost.`,$(`#alert`).dialog({resizable:!1,title:`Change Template`,buttons:{Change:function(){dt(i),$(this).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}}})}function dt(e){let t=g(`templateBody`);t.setAttribute(`data-changed`,`0`),t.innerHTML=``;let n=ge[e]?.template;if(!n)return;let r=n.split(`
`);if(!r.length){x(`Heightmap template: no steps defined`,!1,`error`);return}for(let e of r){let t=e.trim().split(` `);J(t[0],t[1],t[2],t[3],t[4])}}function ft(){let e=g(`templateBody`).querySelectorAll(`#templateBody > div`);if(!e.length)return;let t=g(`templateSeed`).value;Math.random=aleaPRNG(t||ee()),grid.cells.h=new Uint8Array(grid.points.length),HeightmapGenerator.setGraph(grid),He();for(let t of e){if(t.style.opacity===`0.5`)continue;let e=t.querySelector(`.templateCount`)?.value||``,n=t.querySelector(`.templateHeight`)?.value||``,r=t.querySelector(`.templateDist`)?.value||``,i=t.querySelector(`.templateX`)?.value||``,a=t.querySelector(`.templateY`)?.value||``,o=t.dataset.type;o===`Hill`?HeightmapGenerator.addHill(e,n,i,a):o===`Pit`?HeightmapGenerator.addPit(e,n,i,a):o===`Range`?HeightmapGenerator.addRange(e,n,i,a):o===`Trough`?HeightmapGenerator.addTrough(e,n,i,a):o===`Strait`?HeightmapGenerator.addStrait(e,r):o===`Mask`?HeightmapGenerator.mask(+e):o===`Invert`?HeightmapGenerator.invert(+e,r):o===`Add`?HeightmapGenerator.modify(r,+e,1):o===`Multiply`?HeightmapGenerator.modify(r,0,+e):o===`Smooth`&&HeightmapGenerator.smooth(+e),grid.cells.h=HeightmapGenerator.getHeights(),W(`noStat`)}grid.cells.h=HeightmapGenerator.getHeights(),H(),B(),document.getElementById(`preview`)&&Q(),document.getElementById(`canvas3d`)&&C.View3d.redraw()}function pt(){let e=g(`templateBody`);e.dataset.changed=`0`;let t=e.querySelectorAll(`#templateBody > div`);if(!t.length)return;let n=``;for(let e of Array.from(t)){if(e.style.opacity===`0.5`)continue;let t=e.getAttribute(`data-type`),r=e.querySelector(`.templateCount`)?.value||`0`,i=e.querySelector(`.templateHeight`)?.value||e.querySelector(`.templateDist`)?.value||`0`,a=e.querySelector(`.templateX`)?.value||`0`,o=e.querySelector(`.templateY`)?.value||`0`;n+=`${t} ${r} ${i} ${a} ${o}\r\n`}let r=`template_${Date.now()}.txt`;re(n,r)}function mt(e){let t=e.split(`\r
`);if(!t.length){x(`Cannot parse the template, please check the file`,!1,`error`);return}g(`templateBody`).innerHTML=``;for(let e of t){let t=e.split(` `);if(t.length!==5){ERROR&&console.error(`Cannot parse step, wrong arguments count`,e);continue}J(t[0],t[1],t[2],t[3],t[4])}}function ht(){if(document.getElementById(`imageConverter`))return;g(`imageToLoad`).click(),S(`#imageConverter`),je(),$(`#imageConverter`).dialog({title:`Image Converter`,maxHeight:svgHeight*.8,minHeight:`auto`,width:`20em`,position:{my:`right top`,at:`right-10 top+10`,of:`svg`},beforeClose:Tt});let e=document.createElement(`canvas`);e.id=`canvas`,e.width=graphWidth,e.height=graphHeight,document.body.insertBefore(e,g(`optionsContainer`)),X(0),ce(),x(`Image Converter is opened. Upload image and assign height value for each color`,!1,`warn`),grid.cells.h=new Uint8Array(grid.cells.i.length),b(`#viewbox`).select(`#heights`).selectAll(`*`).remove(),W()}function gt(){let e=+this.getAttribute(`data-color`);g(`colorsSelectValue`).innerHTML=String(e),g(`colorsSelectFriendly`).innerHTML=Ie(e);let t=g(`imageConverterPalette`).querySelector(`.hoveredColor`);t&&(t.className=``),this.className=`hoveredColor`}function _t(){let e=this.files[0];this.value=``;let t=new FileReader,n=new Image;n.id=`imageToConvert`,n.style.display=`none`,document.body.appendChild(n),n.onload=()=>{g(`canvas`).getContext(`2d`).drawImage(n,0,0,graphWidth,graphHeight),Y(+g(`convertColors`).value),resetZoom()},t.onloadend=()=>{n.src=t.result},t.readAsDataURL(e)}function Y(e){let t=g(`canvas`),n=document.createElement(`canvas`);n.width=grid.cellsX,n.height=grid.cellsY,n.getContext(`2d`).drawImage(t,0,0,grid.cellsX,grid.cellsY);let r=new RgbQuant({colors:e});r.sample(n);let i=r.reduce(n),a=r.palette(!0);b(`#viewbox`).select(`#heights`).selectAll(`*`).remove(),b(`#imageConverter`).selectAll(`div.color-div`).remove(),g(`colorsSelect`).style.display=`block`,g(`colorsUnassigned`).style.display=`block`,g(`colorsAssigned`).style.display=`none`,n.remove(),b(`#viewbox`).select(`#heights`).selectAll(`polygon`).data(Array.from(grid.cells.i)).join(`polygon`).attr(`points`,e=>String(Grid.getPolygon(e))).attr(`id`,e=>`cell${e}`).attr(`fill`,e=>`rgb(${i[e*4]}, ${i[e*4+1]}, ${i[e*4+2]})`).on(`click`,vt);let o=a.map(e=>`rgb(${e[0]}, ${e[1]}, ${e[2]})`);b(`#colorsUnassignedContainer`).selectAll(`div`).data(o).enter().append(`div`).attr(`data-color`,e=>e).style(`background-color`,e=>e).attr(`class`,`color-div`).on(`click`,yt),g(`colorsUnassignedNumber`).innerHTML=String(o.length)}function vt(){let e=this.getAttribute(`fill`);g(`imageConverter`).querySelector(`div[data-color="${e}"]`)?.click()}function yt(){b(`#viewbox`).select(`#heights`).selectAll(`.selectedCell`).attr(`class`,null);let e=this.classList.contains(`selectedColor`),t=g(`imageConverter`).querySelector(`div.selectedColor`);t&&t.classList.remove(`selectedColor`);let n=g(`imageConverterPalette`).querySelector(`div.hoveredColor`);if(n&&n.classList.remove(`hoveredColor`),g(`colorsSelectValue`).innerHTML=g(`colorsSelectFriendly`).innerHTML=`0`,e)return;if(this.classList.add(`selectedColor`),this.dataset.height){let e=+this.dataset.height;g(`imageConverterPalette`).querySelector(`div[data-color="${e}"]`)?.classList.add(`hoveredColor`),g(`colorsSelectValue`).innerHTML=String(e),g(`colorsSelectFriendly`).innerHTML=Ie(e)}let r=this.getAttribute(`data-color`);b(`#viewbox`).select(`#heights`).selectAll(`polygon.selectedCell`).classed(`selectedCell`,!1),b(`#viewbox`).select(`#heights`).selectAll(`polygon[fill='${r}']`).classed(`selectedCell`,!0)}function bt(){let e=+this.dataset.color,t=color(1-(e<20?e-5:e)/100),n=g(`imageConverter`).querySelector(`div.selectedColor`);n.style.backgroundColor=t,n.setAttribute(`data-color`,t),n.setAttribute(`data-height`,String(e)),b(`#viewbox`).select(`#heights`).selectAll(`.selectedCell`).each(function(){this.setAttribute(`fill`,t),this.setAttribute(`data-height`,String(e))}),n.parentNode.id===`colorsUnassignedContainer`&&(g(`colorsAssignedContainer`).appendChild(n),g(`colorsAssigned`).style.display=`block`,g(`colorsUnassignedNumber`).innerHTML=String(g(`colorsUnassignedContainer`).childElementCount-2),g(`colorsAssignedNumber`).innerHTML=String(g(`colorsAssignedContainer`).childElementCount-2))}function xt(e){let t=g(`colorsUnassignedContainer`),n=t.querySelectorAll(`div`);if(!n.length&&(Y(+g(`convertColors`).value),n=t.querySelectorAll(`div`),!n.length)){x(`No unassigned colors. Please load an image and click the button again`,!1,`error`);return}let r=e=>{let t=o(e).h;return t>300&&(t-=360),t>170?Math.abs(t-250)/3|0:Math.abs(t-250+20)/3|0},i=e=>{let t=Te(e).l;return t<13?t/13*20|0:t|0},a=_(101).map(e=>z(e)),s=a.map(e=>o(e).h|0),c=e=>{let t=a.indexOf(e);if(t!==-1)return t;let n=o(e).h,r=s.reduce((e,t)=>Math.abs(t-n)<Math.abs(e-n)?t:e);return s.indexOf(r)},l=[],u=g(`colorsAssignedContainer`);n.forEach(t=>{let n=t.dataset.color,a=e===`hue`?r(n):e===`lum`?i(n):c(n),o=color(1-(a<20?(a-5)/100:a/100));if(b(`#viewbox`).select(`#heights`).selectAll(`polygon[fill='${n}']`).attr(`fill`,o).attr(`data-height`,a),l[a]){t.remove();return}t.style.backgroundColor=t.dataset.color=o,t.dataset.height=String(a),u.appendChild(t),l[a]=!0}),Array.from(u.children).sort((e,t)=>e.dataset.height-+t.dataset.height).forEach(e=>{u.appendChild(e)}),g(`colorsAssigned`).style.display=`block`,g(`colorsUnassigned`).style.display=`none`,g(`colorsAssignedNumber`).innerHTML=String(u.childElementCount-2)}function St(){prompt(`Please set maximum number of colors. <br>An actual number is usually lower and depends on color scheme`,{default:+g(`convertColors`).value,step:1,min:3,max:255},e=>{g(`convertColors`).value=String(e),Y(+e)})}function X(e){g(`convertOverlay`).value=g(`convertOverlayNumber`).value=String(e),g(`canvas`).style.opacity=String(e)}function Ct(){if(g(`colorsAssignedContainer`).childElementCount<3){x(`Please assign colors to heights first`,!1,`error`);return}b(`#viewbox`).select(`#heights`).selectAll(`polygon`).each(function(){let e=+(this.dataset.height??`0`)||0,t=+this.id.slice(4);grid.cells.h[t]=e}),b(`#viewbox`).select(`#heights`).selectAll(`polygon`).remove(),R(),Z()}function wt(){Z(),b(`#viewbox`).select(`#heights`).selectAll(`polygon`).remove(),G(edits.n-1)}function Z(){document.getElementById(`canvas`)?.remove(),document.getElementById(`imageToConvert`)?.remove(),b(`#imageConverter`).selectAll(`div.color-div`).remove(),g(`colorsAssigned`).style.display=`none`,g(`colorsUnassigned`).style.display=`none`,g(`colorsSelectValue`).innerHTML=g(`colorsSelectFriendly`).innerHTML=`0`,b(`#viewbox`).style(`cursor`,`default`).on(`.drag`,null),x(`Heightmap edit mode is active. Click on "Exit Customization" to finalize the heightmap`,!0),$(`#imageConverter`).dialog(`destroy`),g(`imageConverter`).remove(),K()}function Tt(e){e.preventDefault(),e.stopPropagation(),alertMessage.innerHTML=`Are you sure you want to close the Image Converter? Click "Cancel" to keep editing. Click "Complete" to apply
  the conversion and close the tool. Click "Close" to discard the conversion and restore the previous heightmap.`,$(`#alert`).dialog({resizable:!1,title:`Close Image Converter`,buttons:{Cancel:function(){$(this).dialog(`close`)},Complete:function(){$(this).dialog(`close`),Ct()},Close:function(){$(this).dialog(`close`),Z(),b(`#viewbox`).select(`#heights`).selectAll(`polygon`).remove(),G(edits.n-1)}}})}function Et(){let e=document.getElementById(`preview`);if(e){e.remove();return}let t=document.createElement(`canvas`);t.id=`preview`,t.width=grid.cellsX,t.height=grid.cellsY,document.body.insertBefore(t,g(`optionsContainer`)),t.addEventListener(`mouseover`,()=>x(`Heightmap preview. Click to download a screen-sized image`)),t.addEventListener(`click`,Dt),Q()}function Q(){let e=document.getElementById(`preview`).getContext(`2d`),t=e.createImageData(grid.cellsX,grid.cellsY);grid.cells.h.forEach((e,n)=>{let r=(e<20?Math.max(e/1.5,0):e)/100*255,i=n*4;t.data[i]=r,t.data[i+1]=r,t.data[i+2]=r,t.data[i+3]=255}),e.putImageData(t,0,0)}function Dt(){let e=document.getElementById(`preview`).toDataURL(`image/png`),t=new Image;t.src=e,t.onload=()=>{let e=document.createElement(`canvas`),n=e.getContext(`2d`);e.width=graphWidth,e.height=graphHeight,document.body.insertBefore(e,g(`optionsContainer`)),n.drawImage(t,0,0,graphWidth,graphHeight);let r=e.toDataURL(`image/png`),i=document.createElement(`a`);i.download=`${l(`Heightmap`)}.png`,i.href=r,i.click(),e.remove()}}var Ot={open:ke};export{Ot as HeightmapEditor};