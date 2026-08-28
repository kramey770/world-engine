import{Ct as e,Tt as t,U as n,W as r,k as i}from"./utils-D3KEhgY0.js";import{Q as a,W as o,i as s}from"./index-D3JPylQY.js";function c(){l(),u(),$(`#submapTool`).dialog({title:`Create a submap`,resizable:!1,width:`32em`,position:{my:`center`,at:`center`,of:`svg`},close:d,buttons:{Submap:function(){p(),$(this).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}}})}function l(){o(`submapTool`);let e=i(`pointsInput`).value,t=cellsDensityMap[+e],n=`<div id="submapTool" class="dialog">
    <p style="font-weight: bold">
      This operation is destructive and irreversible. It will create a completely new map based on the current one.
      Don't forget to save the .map file to your machine first!
    </p>
    <div style="display: flex; flex-direction: column; gap: 0.5em">
      <div data-tip="Set points (cells) number of the submap" style="display: flex; gap: 1em">
        <div>Points number</div>
        <div>
          <input id="submapPointsInput" type="range" min="1" max="13" value="${e}" />
          <output id="submapPointsFormatted" style="color: ${getCellsDensityColor(t)}">${t/1e3}K</output>
        </div>
      </div>
      <div data-tip="Check to fit burg styles (icon and label size) to the submap scale">
        <input type="checkbox" class="checkbox" id="submapRescaleBurgStyles" checked />
        <label for="submapRescaleBurgStyles" class="checkbox-label">Rescale burg styles</label>
      </div>
    </div>
  </div>`;i(`dialogs`).insertAdjacentHTML(`beforeend`,n)}function u(){i(`submapPointsInput`).oninput=f}function d(){o(`submapTool`)}function f(e){let t=cellsDensityMap[+e.target.value],n=i(`submapPointsFormatted`);n.value=`${t/1e3}K`,n.style.color=getCellsDensityColor(t)}function p(){INFO&&console.group(`generateSubmap`);let[e,t]=[Math.abs(viewX/scale),Math.abs(viewY/scale)];m(e,t);let n=i(`submapPointsInput`).value;n!==i(`pointsInput`).value&&changeCellsDensity(n),applyGraphSize(),fitMapToScreen(),resetZoom(0),undraw(),s.process({projection:(n,r)=>[(n-e)*scale,(r-t)*scale],inverse:(n,r)=>[n/scale+e,r/scale+t],scale}),i(`submapRescaleBurgStyles`).checked&&h(scale),a.drawAll(),INFO&&console.groupEnd()}function m(e,a){options.mapSize=t(options.mapSize/scale,2);let o=(mapCoordinates.latT??0)/scale,s=n(a,mapCoordinates,graphHeight);options.latitude=t((90-s)/(180-o)*100,2);let c=(mapCoordinates.lonT??0)/scale,l=r(e+graphWidth/scale,mapCoordinates,graphWidth);options.longitude=t((180-l)/(360-c)*100,2),distanceScale=t(distanceScale/scale,2),i(`distanceScaleInput`).value=String(distanceScale),populationRate=t(populationRate/scale,2),i(`populationRateInput`).value=String(populationRate)}function h(n){for(let r of i(`burgIcons`).querySelectorAll(`:scope > g`)){let i={...style.burgIcons[r.id]};for(let{name:e,value:t}of r.attributes)i[e]=t;let a=Number(i[`font-size`])||1;i[`font-size`]=String(t(e(a*n,.2,10),2)),style.burgIcons[r.id]=i,r.remove()}let r=new Set(pack.burgs.filter(e=>e.i&&!e.removed).map(e=>e.label?.group||e.group||`burg`));for(let e of r){let r=style.labels.groups[e];if(!r)continue;let i=Number.parseFloat(r[`font-size`])||0;r[`font-size`]=`${t(Math.max(t((i+i/n)/2,2),1)*n,2)}%`}}var g={open:c};export{g as SubmapTool};