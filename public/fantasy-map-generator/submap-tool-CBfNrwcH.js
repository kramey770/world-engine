import{Et as e,U as t,W as n,k as r,wt as i}from"./utils-BIleyWmR.js";import{t as a}from"./layers-qPZxwHcp.js";import{r as o}from"./dialog-helpers-50LJgx0U.js";import{n as s}from"./index-tuMZPduM.js";function c(){l(),u(),$(`#submapTool`).dialog({title:`Create a submap`,resizable:!1,width:`32em`,position:{my:`center`,at:`center`,of:`svg`},close:d,buttons:{Submap:function(){p(),$(this).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}}})}function l(){o(`submapTool`);let e=r(`pointsInput`).value,t=cellsDensityMap[+e],n=`<div id="submapTool" class="dialog">
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
  </div>`;r(`dialogs`).insertAdjacentHTML(`beforeend`,n)}function u(){r(`submapPointsInput`).oninput=f}function d(){o(`submapTool`)}function f(e){let t=cellsDensityMap[+e.target.value],n=r(`submapPointsFormatted`);n.value=`${t/1e3}K`,n.style.color=getCellsDensityColor(t)}function p(){INFO&&console.group(`generateSubmap`);let[e,t]=[Math.abs(viewX/scale),Math.abs(viewY/scale)];m(e,t);let n=r(`submapPointsInput`).value;n!==r(`pointsInput`).value&&changeCellsDensity(n),applyGraphSize(),fitMapToScreen(),resetZoom(0),undraw(),s.process({projection:(n,r)=>[(n-e)*scale,(r-t)*scale],inverse:(n,r)=>[n/scale+e,r/scale+t],scale}),r(`submapRescaleBurgStyles`).checked&&h(scale),a.drawAll(),INFO&&console.groupEnd()}function m(i,a){options.mapSize=e(options.mapSize/scale,2);let o=(mapCoordinates.latT??0)/scale,s=t(a,mapCoordinates,graphHeight);options.latitude=e((90-s)/(180-o)*100,2);let c=(mapCoordinates.lonT??0)/scale,l=n(i+graphWidth/scale,mapCoordinates,graphWidth);options.longitude=e((180-l)/(360-c)*100,2),distanceScale=e(distanceScale/scale,2),r(`distanceScaleInput`).value=String(distanceScale),populationRate=e(populationRate/scale,2),r(`populationRateInput`).value=String(populationRate)}function h(t){for(let n of r(`burgIcons`).querySelectorAll(`:scope > g`)){let r={...style.burgIcons[n.id]};for(let{name:e,value:t}of n.attributes)r[e]=t;let a=Number(r[`font-size`])||1;r[`font-size`]=String(e(i(a*t,.2,10),2)),style.burgIcons[n.id]=r,n.remove()}let n=new Set(pack.burgs.filter(e=>e.i&&!e.removed).map(e=>e.label?.group||e.group||`burg`));for(let r of n){let n=style.labels.groups[r];if(!n)continue;let i=Number.parseFloat(n[`font-size`])||0,a=Math.max(e((i+i/t)/2,2),1)*t;n[`font-size`]=`${e(a,2)}%`}}var g={open:c};export{g as SubmapTool};