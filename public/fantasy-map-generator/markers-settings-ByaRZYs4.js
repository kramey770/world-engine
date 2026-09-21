import{k as e}from"./utils-omhVlsRt.js";import{t}from"./layers-DHltDypB.js";import{r as n}from"./tooltips-BQ3W48fB.js";import{i as r,r as i}from"./dialog-helpers-CdcIkxap.js";import{P as a}from"./index-DWZM8gkY.js";var o=`markersSettings`;function s(){customization||(i(o),e(`dialogs`).insertAdjacentHTML(`beforeend`,`<div id="${o}" class="dialog"></div>`),l(),$(`#${o}`).dialog({resizable:!1,title:`Markers generation settings`,maxHeight:600,position:{my:`left top`,at:`left+10 top+10`,of:`svg`,collision:`fit`},buttons:{Regenerate:()=>{c(),Markers.regenerate(),t.draw(`markers`),r(),l()},Close:function(){$(this).dialog(`close`)}},open:function(){let e=$(this).dialog(`widget`).find(`.ui-dialog-buttonset > button`);e[0].addEventListener(`mousemove`,()=>n(`Apply changes and regenerate markers`)),e[1].addEventListener(`mousemove`,()=>n(`Close the window`))},close:u}))}function c(){let t=e(o).querySelectorAll(`tbody > tr`),n=Array.from(t).map(e=>{let t=e.querySelector(`.type`),n=e.querySelector(`.image`),r=e.querySelector(`.emoji`),i=e.querySelector(`.multiplier`);if(!t||!n||!r||!i)throw Error(`Invalid markers configuration row`);return{type:t.value,icon:n.getAttribute(`src`)||r.textContent||``,multiplier:i.valueAsNumber}});Markers.setConfig(Markers.getConfig().map((e,t)=>({...e,...n[t]})))}function l(){let t=Markers.getConfig().map(({type:e,icon:t,multiplier:n})=>{let r=t.startsWith(`http`)||t.startsWith(`data:image`);return`<tr>
      <td><input class="type" value="${e}" /></td>
      <td style="position: relative">
        <img class="image" src="${r?t:``}" ${r?``:`hidden`} style="width:1.2em; height:1.2em; vertical-align: middle;">
        <span class="emoji" style="font-size:1.2em">${r?``:t}</span>
        <button class="changeIcon icon-pencil"></button>
      </td>
      <td><input class="multiplier" type="number" min="0" max="100" step="0.1" value="${n}" /></td>
      <td style="text-align:center">${pack.markers.filter(t=>t.type===e).length}</td>
    </tr>`}),n=e(o);n.innerHTML=`<table class="table"><thead style='font-weight:bold'><tr>
    <td data-tip="Marker type name">Type</td>
    <td data-tip="Marker icon">Icon</td>
    <td data-tip="Marker number multiplier">Multiplier</td>
    <td data-tip="Number of markers of that type on the current map">Number</td>
  </tr></thead><tbody>${t.join(``)}</tbody></table>`,n.querySelectorAll(`button.changeIcon`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.parentElement,n=t?.querySelector(`.image`),r=t?.querySelector(`.emoji`);n&&r&&a.IconSelector.open(n.getAttribute(`src`)||r.textContent||``,e=>{let t=e.startsWith(`http`)||e.startsWith(`data:image`);n.setAttribute(`src`,t?e:``),n.hidden=!t,r.textContent=t?``:e})})})}function u(){i(o)}var d={open:s};export{d as MarkersSettings};