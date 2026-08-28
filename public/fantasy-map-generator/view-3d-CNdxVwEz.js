const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["view-3d-renderer-DkX4EFwz.js","index-D3JPylQY.js","alea-D6Uf4FCc.js","utils-D3KEhgY0.js","mean-4Awewi9R.js","median-BDhCRnhN.js","minIndex-4vd4__Hw.js","linear-BBVgsIex.js","sin-DXK16t1M.js","quadtree-DgASQllf.js","catmullRom-DFVQdx1l.js","tooltips-D1wvMKni.js","emblems-generator-BtgqM7bc.js"])))=>i.map(i=>d[i]);
import{k as e}from"./utils-D3KEhgY0.js";import{r as t}from"./tooltips-D1wvMKni.js";import{Y as n,b as r}from"./index-D3JPylQY.js";var i=null,a=()=>i?Promise.resolve(i):n(()=>import(`./view-3d-renderer-DkX4EFwz.js`).then(e=>i=e),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12])),o=(e,t=`viewMesh`)=>a().then(n=>n.create(e,t)),s=()=>a().then(e=>e.redraw()),c=()=>a().then(e=>e.update()),l=()=>a().then(e=>e.stop()),u=e=>a().then(t=>t.setSunColor(e)),d=e=>a().then(t=>t.setScale(e)),f=e=>a().then(t=>t.setResolutionScale(e)),p=e=>a().then(t=>t.setLightness(e)),m=(e,t,n)=>a().then(r=>r.setSun(e,t,n)),h=e=>a().then(t=>t.setRotation(e)),g=()=>a().then(e=>e.toggleLabels()),ee=()=>a().then(e=>e.toggle3dSubdivision()),te=()=>a().then(e=>e.toggleErosion()),ne=e=>a().then(t=>t.setErosionStrength(e)),re=e=>a().then(t=>t.setErosionRiverDepth(e)),_=e=>a().then(t=>t.setErosionDetail(e)),v=e=>a().then(t=>t.setErosionOctaves(e)),y=()=>a().then(e=>e.toggleSatellite()),b=()=>a().then(e=>e.toggleWireframe()),x=()=>a().then(e=>e.toggleSky()),S=e=>a().then(t=>t.setResolution(e)),C=(e,t)=>a().then(n=>n.setColors(e,t)),w=e=>a().then(t=>t.setTimeOfDay(e)),T=()=>a().then(e=>e.saveScreenshot()),E=()=>a().then(e=>e.saveOBJ()),D=()=>options.threeD.isOn,O=e=>a().then(t=>t.isCached(e)),k=(e,t,n)=>a().then(r=>r.heightAt(e,t,n));function A(){document.getElementById(`canvas3d`)&&(l(),document.getElementById(`canvas3d`)?.remove(),document.getElementById(`options3d`)&&$(`#options3d`).dialog(`close`),document.getElementById(`preview3d`)&&$(`#preview3d`).dialog(`close`))}function j(){e(`viewMode`).querySelectorAll(`.pressed`).forEach(e=>{e.classList.remove(`pressed`)}),e(`heightmap3DView`).classList.remove(`pressed`),e(`viewStandard`).classList.add(`pressed`),A()}async function M(n){j(),e(`viewStandard`).classList.remove(`pressed`),e(n).classList.add(`pressed`);let r=document.createElement(`canvas`);if(r.id=`canvas3d`,r.dataset.type=n,n===`heightmap3DView`){let t=e(`preview3d`);r.width=parseFloat(t.style.width)||graphWidth/3,r.height=r.width/(graphWidth/graphHeight),r.style.display=`block`}else r.width=svgWidth,r.height=svgHeight,r.style.position=`absolute`,r.style.display=`none`;await o(r,n)&&(r.style.display=`block`,r.onmouseenter=()=>{+r.dataset.hovered>2?t(``):t(`Drag to pan • Scroll to zoom • Right-click drag to rotate • <b>O</b> to toggle options`),r.dataset.hovered=String((r.dataset.hovered|0)+1)},n===`heightmap3DView`?(N(),e(`preview3d`).appendChild(r),$(`#preview3d`).dialog({title:`3D Preview`,resizable:!0,position:{my:`left bottom`,at:`left+10 bottom-20`,of:`svg`},resizeStop:F,close:P})):document.body.insertBefore(r,e(`optionsContainer`)),I())}function N(){document.getElementById(`preview3d`)?.remove(),e(`dialogs`).insertAdjacentHTML(`beforeend`,`<div id="preview3d" class="dialog stable" style="padding: 0px"></div>`)}function P(){$(`#preview3d`).dialog(`destroy`),e(`preview3d`).remove(),j()}function F(){let t=document.getElementById(`canvas3d`);if(!t)return;let n=e(`preview3d`);t.width=parseFloat(n.style.width),t.height=parseFloat(n.style.height)-2,s()}function I(){if(document.getElementById(`options3d`)){$(`#options3d`).dialog(`close`);return}ie(),$(`#options3d`).dialog({title:`3D mode settings`,resizable:!1,width:`fit-content`,position:{my:`right top`,at:`right-30 top+10`,of:`svg`,collision:`fit`},close:L}),z()}function ie(){document.getElementById(`options3d`)?.remove(),e(`dialogs`).insertAdjacentHTML(`beforeend`,`<div id="options3d" class="dialog stable">
      <div id="options3dMesh" style="display: none">
        <div data-tip="Set map rotation speed. Set to 0 is you want to toggle off the rotation">
          <div>Rotation:</div>
          <input id="options3dMeshRotationRange" type="range" min="0" max="10" step=".1" />
          <input id="options3dMeshRotationNumber" type="number" min="0" max="10" step=".1" style="width: 4em" />
        </div>
        <div data-tip="Set height scale">
          <div>Height scale:</div>
          <input id="options3dScaleRange" type="range" min="0" max="100" />
          <input id="options3dScaleNumber" type="number" min="0" max="1000" style="width: 4em" />
        </div>
        <div data-tip="Set scene lightness">
          <div>Lightness:</div>
          <input id="options3dLightnessRange" type="range" min="0" max="100" />
          <input id="options3dLightnessNumber" type="number" min="0" max="500" style="width: 4em" />
        </div>
        <div data-tip="Set mesh texture resolution">
          <div>Texture resolution:</div>
          <select id="options3dMeshSkinResolution" style="width: 10em">
            <option value="512">512x512px</option>
            <option value="1024">1024x1024px</option>
            <option value="2048">2048x2048px</option>
            <option value="4096" selected>4096x4096px</option>
            <option value="8192">8192x8192px</option>
          </select>
        </div>
        <div data-tip="Quick preset lighting for different times of day" style="margin-top: 0.4em">
          <label>Time of day:</label>
          <select id="options3dTimeOfDay" style="width: 10em; margin-bottom: 0.3em">
            <option value="custom">Custom</option>
            <option value="dawn">Dawn</option>
            <option value="noon" selected>Noon</option>
            <option value="evening">Evening</option>
            <option value="night">Night</option>
          </select>
        </div>
        <div data-tip="Set sun position (x, y) and color" style="margin-top: 0.4em">
          <label>Sun position and color:</label>
          <div style="display: flex; gap: 0.2em">
            <input id="options3dSunX" type="number" min="-2500" max="2500" step="100" style="width: 4.7em" />
            <input id="options3dSunY" type="number" min="0" max="5000" step="100" style="width: 4.7em" />
            <input id="options3dSunColor" type="color" style="padding: 0; height: 1.5em; border: none" />
          </div>
        </div>
        <div data-tip="Toggle 3d labels" style="margin: 0.6em 0 0.3em -0.2em">
          <input id="options3dMeshLabels3d" class="checkbox" type="checkbox" />
          <label for="options3dMeshLabels3d" class="checkbox-label"><i>Show 3D labels</i></label>
        </div>
        <div data-tip="Toggle sky mode" style="margin: 0.6em 0 0.3em -0.2em">
          <input id="options3dMeshSkyMode" class="checkbox" type="checkbox" />
          <label for="options3dMeshSkyMode" class="checkbox-label"><i>Show sky and extend water</i></label>
        </div>
        <div
          data-tip="Increases the polygon count to smooth the sharp points. Please note that it can take some time to calculate"
          style="margin: 0.6em 0 0.3em -0.2em"
        >
          <input id="options3dSubdivide" class="checkbox" type="checkbox" />
          <label for="options3dSubdivide" class="checkbox-label"
            ><i>Smooth geometry <small style="color: darkred">[slow]</small></i></label
          >
        </div>

        <div
          data-tip="Texture the terrain as a satellite image. Replaces the standard map texture"
          style="margin: 0.6em 0 0.3em -0.2em"
        >
          <input id="options3dSatellite" class="checkbox" type="checkbox" />
          <label for="options3dSatellite" class="checkbox-label"><i>Satellite texture</i></label>
        </div>

        <div
          data-tip="Bake procedural erosion detail into the 3D terrain. Visual only, the map data is not changed"
          style="margin: 0.6em 0 0.3em -0.2em"
        >
          <input id="options3dErosion" class="checkbox" type="checkbox" />
          <label for="options3dErosion" class="checkbox-label"><i>Erode terrain</i></label>
        </div>

        <div id="options3dErosionSection" style="display: none">
          <div data-tip="Set eroded mesh detail level (vertices on the long side)">
            <div>Mesh detail:</div>
            <select id="options3dErosionDetail" style="width: 10em">
              <option value="256">256</option>
              <option value="512">512</option>
              <option value="1024" selected>1024</option>
              <option value="2048">2048 [slow]</option>
            </select>
          </div>

          <div data-tip="Set the strength of erosion gullies and ridges">
            <div>Gully strength:</div>
            <input id="options3dErosionStrengthRange" type="range" min="0" max="100" />
            <input id="options3dErosionStrengthNumber" type="number" min="0" max="100" style="width: 4em" />
          </div>

          <div data-tip="Set how deep the valleys are carved along the rivers">
            <div>River valleys:</div>
            <input id="options3dErosionRiverDepthRange" type="range" min="0" max="100" />
            <input id="options3dErosionRiverDepthNumber" type="number" min="0" max="100" style="width: 4em" />
          </div>

          <div data-tip="Set the number of erosion detail layers. More octaves add finer gullies">
            <div>Detail octaves:</div>
            <select id="options3dErosionOctaves" style="width: 6em">
              <option value="1">1</option>
              <option value="2" selected>2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        </div>

        <div data-tip="Toggle wireframe mode" style="margin: 0.6em 0 0.3em -0.2em">
          <input id="options3dMeshWireframeMode" class="checkbox" type="checkbox" />
          <label for="options3dMeshWireframeMode" class="checkbox-label"><i>Show wireframe</i></label>
        </div>
        <div data-tip="Set sky and water color" id="options3dColorSection" style="display: none">
          <span>Sky:</span
          ><input
            id="options3dMeshSky"
            type="color"
            style="width: 4.4em; height: 1em; border: 0; padding: 0; margin: 0 0.2em"
          />
          <span>Water:</span
          ><input
            id="options3dMeshWater"
            type="color"
            style="width: 4.4em; height: 1em; border: 0; padding: 0; margin: 0 0.2em"
          />
        </div>
      </div>
      <div id="options3dGlobe" style="display: none">
        <div data-tip="Set globe rotation speed. Set to 0 is you want to toggle off the rotation">
          <div>Rotation:</div>
          <input id="options3dGlobeRotationRange" type="range" min="0" max="10" step=".1" />
          <input id="options3dGlobeRotationNumber" type="number" min="0" max="10" step=".1" style="width: 4em" />
        </div>
        <div data-tip="Set globe texture resolution">
          <div>Texture resolution:</div>
          <select id="options3dGlobeResolution" style="width: 5em">
            <option value="0.5">0.5x</option>
            <option value="1">1x</option>
            <option value="2">2x</option>
            <option value="4">4x</option>
            <option value="8">8x</option>
          </select>
        </div>
        <div
          data-tip="Equirectangular projection is used: distortion is maximum on poles. Use map with aspect ratio 2:1 for best result"
          style="font-style: italic; margin: 0.2em 0"
        >
          Equirectangular projection is used
        </div>
      </div>
      <div id="options3dBottom" style="margin-top: 0.2em">
        <button id="options3dUpdate" data-tip="Update the scene" class="icon-cw"></button>
        <button
          data-tip="Configure world and map size and climate settings"
          onclick="window.Controllers.WorldConfigurator.open()"
          class="icon-globe"
        ></button>
        <button id="options3dSave" data-tip="Save screenshot of the 3d scene" class="icon-button-screenshot"></button>
        <button id="options3dOBJSave" data-tip="Save OBJ file of the 3d scene" class="icon-download"></button>
      </div>
    </div>`),e(`options3dUpdate`).addEventListener(`click`,()=>void c()),e(`options3dSave`).addEventListener(`click`,()=>void T()),e(`options3dOBJSave`).addEventListener(`click`,()=>void E()),e(`options3dScaleRange`).addEventListener(`input`,U),e(`options3dScaleNumber`).addEventListener(`change`,U),e(`options3dLightnessRange`).addEventListener(`input`,G),e(`options3dLightnessNumber`).addEventListener(`change`,G),e(`options3dSunX`).addEventListener(`change`,q),e(`options3dSunY`).addEventListener(`change`,q),e(`options3dMeshSkinResolution`).addEventListener(`change`,W),e(`options3dMeshRotationRange`).addEventListener(`input`,J),e(`options3dMeshRotationNumber`).addEventListener(`change`,J),e(`options3dGlobeRotationRange`).addEventListener(`input`,J),e(`options3dGlobeRotationNumber`).addEventListener(`change`,J),e(`options3dMeshLabels3d`).addEventListener(`change`,()=>void g()),e(`options3dMeshSkyMode`).addEventListener(`change`,le),e(`options3dMeshSky`).addEventListener(`input`,Z),e(`options3dMeshWater`).addEventListener(`input`,Z),e(`options3dGlobeResolution`).addEventListener(`change`,ue),e(`options3dMeshWireframeMode`).addEventListener(`change`,()=>void b()),e(`options3dSunColor`).addEventListener(`input`,K),e(`options3dSubdivide`).addEventListener(`change`,()=>void ee()),e(`options3dTimeOfDay`).addEventListener(`change`,H),e(`options3dErosion`).addEventListener(`change`,ae),e(`options3dErosionDetail`).addEventListener(`change`,oe),e(`options3dErosionStrengthRange`).addEventListener(`change`,Y),e(`options3dErosionStrengthNumber`).addEventListener(`change`,Y),e(`options3dErosionRiverDepthRange`).addEventListener(`change`,X),e(`options3dErosionRiverDepthNumber`).addEventListener(`change`,X),e(`options3dErosionOctaves`).addEventListener(`change`,ce),e(`options3dSatellite`).addEventListener(`change`,se)}function L(){$(`#options3d`).dialog(`destroy`),e(`options3d`).remove()}function R(t,n){e(t).value=String(n)}function z(){let t=options.threeD,n=document.getElementById(`canvas3d`)?.dataset.type===`viewGlobe`;e(`options3dMesh`).style.display=n?`none`:`block`,e(`options3dGlobe`).style.display=n?`block`:`none`,e(`options3dOBJSave`).style.display=n?`none`:`inline-block`,R(`options3dScaleRange`,t.scale),R(`options3dScaleNumber`,t.scale),R(`options3dLightnessRange`,t.lightness*100),R(`options3dLightnessNumber`,t.lightness*100),R(`options3dSunX`,t.sun.x),R(`options3dSunY`,t.sun.y),R(`options3dMeshRotationRange`,t.rotateMesh),R(`options3dMeshRotationNumber`,t.rotateMesh),R(`options3dMeshSkinResolution`,t.resolutionScale),R(`options3dGlobeRotationRange`,t.rotateGlobe),R(`options3dGlobeRotationNumber`,t.rotateGlobe),R(`options3dMeshLabels3d`,String(t.labels3d)),R(`options3dMeshSkyMode`,String(t.extendedWater)),e(`options3dColorSection`).style.display=t.extendedWater?`block`:`none`,R(`options3dMeshSky`,t.skyColor),R(`options3dMeshWater`,t.waterColor),R(`options3dGlobeResolution`,t.resolution),R(`options3dSunColor`,t.sunColor),R(`options3dSubdivide`,String(t.subdivide)),e(`options3dSubdivide`).disabled=!!t.erosion,e(`options3dErosion`).checked=!!t.erosion,e(`options3dErosionSection`).style.display=t.erosion?`block`:`none`,R(`options3dErosionDetail`,t.erosionDetail),R(`options3dErosionStrengthRange`,t.erosionStrength),R(`options3dErosionStrengthNumber`,t.erosionStrength),R(`options3dErosionRiverDepthRange`,t.erosionRiverDepth),R(`options3dErosionRiverDepthNumber`,t.erosionRiverDepth),R(`options3dErosionOctaves`,t.erosionOctaves),e(`options3dSatellite`).checked=!!t.satellite,B()}function B(){let t=e(`options3dTimeOfDay`),n=options.threeD,i=`custom`;for(let[e,t]of Object.entries(r))if(t.sun.x===n.sun.x&&t.sun.y===n.sun.y&&t.sun.z===n.sun.z&&t.sunColor===n.sunColor&&Math.abs(t.lightness-n.lightness)<.05){i=e;break}t.value=i}function V(){let t=e(`options3dTimeOfDay`);t.value!==`custom`&&(t.value=`custom`)}function H(){this.value!==`custom`&&(w(this.value),z())}function U(){R(`options3dScaleRange`,this.value),R(`options3dScaleNumber`,this.value),d(+this.value)}function W(){R(`options3dMeshSkinResolution`,this.value),f(+this.value)}function G(){R(`options3dLightnessRange`,this.value),R(`options3dLightnessNumber`,this.value),p(this.value/100),V()}function K(){u(e(`options3dSunColor`).value),V()}function q(){m(+e(`options3dSunX`).value,+e(`options3dSunY`).value),V()}function J(){let e=this.nextElementSibling||this.previousElementSibling;e&&(e.value=this.value),h(+this.value)}function ae(){let n=!options.threeD.erosion;e(`options3dErosionSection`).style.display=n?`block`:`none`,e(`options3dSubdivide`).disabled=n,n&&t(`Baking eroded terrain...`,!1,`warn`,4e3),te()}function oe(){_(+this.value)}function Y(){R(`options3dErosionStrengthRange`,this.value),R(`options3dErosionStrengthNumber`,this.value),ne(+this.value)}function X(){R(`options3dErosionRiverDepthRange`,this.value),R(`options3dErosionRiverDepthNumber`,this.value),re(+this.value)}function se(){options.threeD.satellite||t(`Baking satellite texture...`,!1,`warn`,4e3),y()}function ce(){v(+this.value)}function le(){let t=options.threeD.extendedWater;e(`options3dColorSection`).style.display=t?`none`:`block`,x()}function Z(){C(e(`options3dMeshSky`).value,e(`options3dMeshWater`).value)}function ue(){S(+this.value)}var Q={open:M,enterStandard:j,toggleOptions:I,redraw:s,update:c,isOn:D,isCached:O,heightAt:k};export{Q as View3d};