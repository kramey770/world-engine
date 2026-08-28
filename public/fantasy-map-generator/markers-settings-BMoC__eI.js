import{k as e}from"./utils-D3KEhgY0.js";import{r as t}from"./tooltips-D1wvMKni.js";import{G as n,J as r,Q as i,W as a}from"./index-D3JPylQY.js";var o=`markersSettings`;function s(){customization||(a(o),e(`dialogs`).insertAdjacentHTML(`beforeend`,`<div id="${o}" class="dialog"></div>`),l(),$(`#${o}`).dialog({resizable:!1,title:`Markers generation settings`,maxHeight:600,position:{my:`left top`,at:`left+10 top+10`,of:`svg`,collision:`fit`},buttons:{Regenerate:()=>{c(),Markers.regenerate(),i.draw(`markers`),n(),l()},Close:function(){$(this).dialog(`close`)}},open:function(){let e=$(this).dialog(`widget`).find(`.ui-dialog-buttonset > button`);e[0].addEventListener(`mousemove`,()=>t(`Apply changes and regenerate markers`)),e[1].addEventListener(`mousemove`,()=>t(`Close the window`))},close:u}))}function c(){let t=e(o).querySelectorAll(`tbody > tr`),n=Array.from(t).map(e=>{let t=e.querySelector(`.type`),n=e.querySelector(`.image`),r=e.querySelector(`.emoji`),i=e.querySelector(`.multiplier`);if(!t||!n||!r||!i)throw Error(`Invalid markers configuration row`);return{type:t.value,icon:n.getAttribute(`src`)||r.textContent||``,multiplier:i.valueAsNumber}});Markers.setConfig(Markers.getConfig().map((e,t)=>({...e,...n[t]})))}function l(){let t=Markers.getConfig().map(({type:e,icon:t,multiplier:n})=>{let r=t.startsWith(`http`)||t.startsWith(`data:image`);return`<tr>
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
  </tr></thead><tbody>${t.join(``)}</tbody></table>`,n.querySelectorAll(`button.changeIcon`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.parentElement,n=t?.querySelector(`.image`),i=t?.querySelector(`.emoji`);!n||!i||r.IconSelector.open(n.getAttribute(`src`)||i.textContent||``,e=>{let t=e.startsWith(`http`)||e.startsWith(`data:image`);n.setAttribute(`src`,t?e:``),n.hidden=!t,i.textContent=t?``:e})})})}function u(){a(o)}var d={open:s};export{d as MarkersSettings};