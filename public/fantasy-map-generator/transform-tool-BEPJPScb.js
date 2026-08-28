import{Tt as e,k as t}from"./utils-D3KEhgY0.js";import{Q as n,W as r,i}from"./index-D3JPylQY.js";var a=!1,o=0,s=0;function c(){l(),u(),f(),$(`#transformTool`).dialog({title:`Transform map`,resizable:!1,position:{my:`center`,at:`center`,of:`svg`},close:d,buttons:{Transform:function(){y(),$(this).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}}})}function l(){r(`transformTool`);let e=t(`pointsInput`).value,n=cellsDensityMap[+e],i=`<div id="transformTool" class="dialog">
    <div style="padding-top: 0.5em; width: 40em; font-weight: bold">
      This operation is destructive and irreversible. It will create a completely new map based on the current one.
      Don't forget to save the .map file to your machine first!
    </div>
    <div
      id="transformToolBody"
      style="
        padding: 0.5em 0;
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(5, 1fr);
        align-items: center;
      "
    >
      <div>Points number</div>
      <div>
        <input id="transformPointsInput" type="range" min="1" max="13" value="${e}" />
        <output id="transformPointsFormatted" style="color: ${getCellsDensityColor(n)}">${n/1e3}K</output>
      </div>
      <div>Shift</div>
      <div>
        <label>X: <input id="transformShiftX" type="number" size="4" value="0" /></label>
        <label>Y: <input id="transformShiftY" type="number" size="4" value="0" /></label>
      </div>
      <div>Rotate</div>
      <div>
        <input id="transformAngleInput" type="range" min="0" max="359" value="0" />
        <output id="transformAngleOutput">0</output>°
      </div>
      <div>Scale</div>
      <div>
        <input id="transformScaleInput" type="range" min="-25" max="25" value="0" />
        <output id="transformScaleResult">1</output>x
      </div>
      <div>Mirror</div>
      <div style="display: flex; gap: 0.5em">
        <input type="checkbox" class="checkbox" id="transformMirrorH" />
        <label for="transformMirrorH" class="checkbox-label">horizontally</label>
        <input type="checkbox" class="checkbox" id="transformMirrorV" />
        <label for="transformMirrorV" class="checkbox-label">vertically</label>
      </div>
    </div>
    <div id="transformPreview" style="position: relative; overflow: hidden; outline: 1px solid #666">
      <canvas id="transformPreviewCanvas" style="position: absolute; transform-origin: center"></canvas>
    </div>
  </div>`;t(`dialogs`).insertAdjacentHTML(`beforeend`,i)}function u(){t(`transformToolBody`).addEventListener(`input`,m),t(`transformPointsInput`).oninput=p;let e=t(`transformPreview`);e.addEventListener(`mousedown`,h),e.addEventListener(`mouseup`,g),e.addEventListener(`mousemove`,_),e.addEventListener(`wheel`,v)}function d(){a=!1,r(`transformTool`)}async function f(){let e=Math.min(400,window.innerWidth*.5),n=e/graphWidth,r=graphHeight*n;t(`transformPreview`).style.width=`${e}px`,t(`transformPreview`).style.height=`${r}px`;let i=await window.Services.ExportMap.getMapURL(`png`,{noWater:!0,fullMap:!0,noLabels:!0,noScaleBar:!0,noVignette:!0,noIce:!0}),a=new Image;a.src=i,a.onload=()=>{let n=t(`transformPreviewCanvas`);n.style.width=`${e}px`,n.style.height=`${r}px`,n.width=e*4,n.height=r*4,n.getContext(`2d`)?.drawImage(a,0,0,e*4,r*4)}}function p(e){let n=cellsDensityMap[+e.target.value],r=t(`transformPointsFormatted`);r.value=`${n/1e3}K`,r.style.color=getCellsDensityColor(n)}function m(){let n=Math.min(400,window.innerWidth*.5)/graphWidth,r=t(`transformAngleInput`).value;t(`transformAngleOutput`).value=r;let i=r/180*Math.PI,a=+t(`transformShiftX`).value,o=+t(`transformShiftY`).value,s=t(`transformMirrorH`).checked,c=t(`transformMirrorV`).checked,l=e(1.0965**t(`transformScaleInput`).value,2);t(`transformScaleResult`).value=String(l),t(`transformPreviewCanvas`).style.transform=`
    translate(${a*n}px, ${o*n}px)
    scale(${s?-l:l}, ${c?-l:l})
    rotate(${i}rad)
  `}function h(e){let n=Math.min(400,window.innerWidth*.5)/graphWidth;a=!0;let r=+t(`transformShiftX`).value,i=+t(`transformShiftY`).value;o=r-e.clientX/n,s=i-e.clientY/n}function g(){a=!1}function _(e){if(!a)return;e.preventDefault();let n=Math.min(400,window.innerWidth*.5)/graphWidth;t(`transformShiftX`).value=String(Math.round(o+e.clientX/n)),t(`transformShiftY`).value=String(Math.round(s+e.clientY/n)),m()}function v(e){let n=t(`transformScaleInput`);n.value=String(n.valueAsNumber-Math.sign(e.deltaY)),m()}function y(){INFO&&console.group(`transformMap`);let e=t(`transformPointsInput`).value;e!==t(`pointsInput`).value&&changeCellsDensity(e);let[r,a]=b();applyGraphSize(),fitMapToScreen(),resetZoom(0),undraw(),i.process({projection:r,inverse:a,scale:1}),n.drawAll(),INFO&&console.groupEnd()}function b(){let e=graphWidth/2,n=graphHeight/2,r=+t(`transformShiftX`).value,i=+t(`transformShiftY`).value,a=t(`transformAngleInput`).value/180*Math.PI,o=Math.cos(a),s=Math.sin(a),c=+t(`transformScaleResult`).value,l=t(`transformMirrorH`).checked,u=t(`transformMirrorV`).checked;function d(t,d){return t-=e,d-=n,c!==1&&(t*=c,d*=c),a&&([t,d]=[t*o-d*s,t*s+d*o]),l&&(t=-t),u&&(d=-d),[t+e+r,d+n+i]}function f(t,d){return t-=e+r,d-=n+i,u&&(d=-d),l&&(t=-t),a!==0&&([t,d]=[t*o+d*s,-t*s+d*o]),c!==1&&(t/=c,d/=c),[t+e,d+n]}return[d,f]}var x={open:c};export{x as TransformTool};