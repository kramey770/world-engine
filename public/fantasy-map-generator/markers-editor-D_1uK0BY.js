import{A as e,Et as t,dn as n,k as r}from"./utils-BXw8fBj4.js";import{y as i}from"./layers-_nptVsMl.js";import{t as a}from"./drag-BxIG-06a.js";import{t as o}from"./tooltips-0xeyl30m.js";import{i as s,n as c,r as l,t as u}from"./dialog-helpers-DT2MP2B1.js";import{M as d,P as f}from"./index-CHSGsxIV.js";var p,m;function h(t,r){if(customization)return;u(`.stable`);let i=_(t,r);i&&([p,m]=i,n(p).raise().call(a().on(`start`,y)).classed(`draggable`,!0),e(`notesEditor`)&&f.NotesEditor.open(p.id,p.id),g(),b(),$(`#markerEditor`).dialog({title:`Edit Marker`,resizable:!1,position:{my:`left top`,at:`left+10 top+10`,of:`svg`,collision:`fit`},close:R}))}function g(){l(`markerEditor`),r(`dialogs`).insertAdjacentHTML(`beforeend`,`<div id="markerEditor" class="dialog">
    <div id="markerBody" style="padding-bottom: 0.3em">
      <div data-tip="Marker type. Style changes will apply to all markers of the same type. Leave blank if the marker is unique">
        <div class="label">Type:</div>
        <input id="markerType" style="width: 10.3em" />
      </div>
      <div data-tip="Marker icon" style="display: flex; align-items: center">
        <div class="label">Icon:</div>
        <div id="markerIcon" style="font-size: 1.5em; width: 3.7em">👑</div>
        <button id="markerIconSelect" style="width: 5em">select</button>
      </div>
      <div data-tip="Marker marker element and icon sizes in pixels">
        <div class="label">Size:</div>
        <input data-tip="Marker element size in pixels" id="markerSize" type="number" min="2" max="500" style="width: 5em" />
        <input data-tip="Marker icon sizes in pixels" id="markerIconSize" type="number" min="2" max="20" step="0.5" style="width: 5em" />
      </div>
      <div data-tip="Marker icon shift (by X and by Y axis), percent. Set to 50 to position icon in center">
        <div class="label">Icon shift:</div>
        <input id="markerIconShiftX" type="number" min="0" max="100" step="1" style="width: 5em" />
        <input id="markerIconShiftY" type="number" min="0" max="100" step="1" style="width: 5em" />
      </div>
      <div data-tip="Marker pin shape">
        <div class="label">Pin shape:</div>
        <select id="markerPin" style="width: 10.3em">
          <option value="bubble">Bubble</option>
          <option value="pin">Pin</option>
          <option value="square">Square</option>
          <option value="squarish">Squarish</option>
          <option value="diamond">Diamond</option>
          <option value="hex">Hex</option>
          <option value="hexy">Hexy</option>
          <option value="shieldy">Shieldy</option>
          <option value="shield">Shield</option>
          <option value="pentagon">Pentagon</option>
          <option value="heptagon">Heptagon</option>
          <option value="circle">Circle</option>
          <option value="no">No</option>
        </select>
      </div>
      <div data-tip="Pin fill and stroke colors">
        <div class="label">Pin colors:</div>
        <input id="markerFill" type="color" style="width: 5em; height: 1.6em" />
        <input id="markerStroke" type="color" style="width: 5em; height: 1.6em" />
      </div>
    </div>
    <div id="markerBottom">
      <button id="markerNotes" data-tip="Edit place legend (notes)" class="icon-edit"></button>
      <button id="markerRadius" data-tip="Show markers within a radius of this one" class="icon-dot-circled"></button>
      <button id="markerLock" class="icon-lock-open" onmouseover="showElementLockTip(event)"></button>
      <button id="markerAdd" data-tip="Add additional marker of that type" class="icon-plus"></button>
      <button id="markerRemove" data-tip="Remove the marker" data-shortcut="Delete" class="icon-trash fastDelete"></button>
    </div>
  </div>`),r(`markerType`).addEventListener(`change`,x),r(`markerIconSelect`).addEventListener(`click`,S),r(`markerIconSize`).addEventListener(`input`,C),r(`markerIconShiftX`).addEventListener(`input`,w),r(`markerIconShiftY`).addEventListener(`input`,T),r(`markerSize`).addEventListener(`input`,E),r(`markerPin`).addEventListener(`change`,D),r(`markerFill`).addEventListener(`input`,O),r(`markerStroke`).addEventListener(`input`,k),r(`markerNotes`).addEventListener(`click`,M),r(`markerRadius`).addEventListener(`click`,N),r(`markerLock`).addEventListener(`click`,P),r(`markerAdd`).addEventListener(`click`,F),r(`markerRemove`).addEventListener(`click`,I)}function _(e,t){if(t){let e=t.closest(`svg`);if(!e)return null;let n=pack.markers.find(({i:t})=>Number(e.id.slice(6))===t);return n?[e,n]:null}let n=r(`marker${e}`),i=pack.markers.find(({i:t})=>t===e);return n&&i?[n,i]:null}function v(){let e=m.type;return e?pack.markers.filter(({type:t})=>t===e):[m]}function y(e){let n=+this.getAttribute(`x`)-e.x,r=+this.getAttribute(`y`)-e.y;e.on(`drag`,function(e){this.setAttribute(`x`,String(n+e.x)),this.setAttribute(`y`,String(r+e.y))}),e.on(`end`,function(e){let{x:i,y:a}=e;this.setAttribute(`x`,String(t(n+i,2))),this.setAttribute(`y`,String(t(r+a,2)));let o=m.size||30,s=Math.max(t(o/5+24/scale,2),1);m.x=t(i+n+s/2,1),m.y=t(a+r+s,1),m.cell=Pack.findCell(m.x,m.y)})}function b(){let e=m;r(`markerIcon`).innerHTML=e.icon.startsWith(`http`)||e.icon.startsWith(`data:image`)?`<img src="${e.icon}" style="width: 1em; height: 1em;">`:e.icon,r(`markerType`).value=e.type||``,r(`markerIconSize`).value=String(e.px||12),r(`markerIconShiftX`).value=String(e.dx||50),r(`markerIconShiftY`).value=String(e.dy||50),r(`markerSize`).value=String(e.size||30),r(`markerPin`).value=e.pin||`bubble`,r(`markerFill`).value=e.fill||`#ffffff`,r(`markerStroke`).value=e.stroke||`#000000`,r(`markerLock`).className=e.lock?`icon-lock`:`icon-lock-open`}function x(){m.type=this.value}function S(){f.IconSelector.open(m.icon,e=>{let t=e.startsWith(`http`)||e.startsWith(`data:image`);r(`markerIcon`).innerHTML=t?`<img src="${e}" style="width: 1em; height: 1em;">`:e,v().forEach(t=>{t.icon=e,A(t)})})}function C(){let e=+this.value;v().forEach(t=>{t.px=e,A(t)})}function w(){let e=+this.value;v().forEach(t=>{t.dx=e,A(t)})}function T(){let e=+this.value;v().forEach(t=>{t.dy=e,A(t)})}function E(){let e=+this.value,r=+n(`#markers`).attr(`rescale`);v().forEach(n=>{n.size=e;let{i,x:a,y:o,hidden:s}=n,c=!s&&document.getElementById(`marker${i}`);if(!c)return;let l=r?Math.max(t(e/5+24/scale,2),1):e;c.setAttribute(`width`,String(l)),c.setAttribute(`height`,String(l)),c.setAttribute(`x`,String(t(a-l/2,1))),c.setAttribute(`y`,String(t(o-l,1)))})}function D(){let e=this.value;v().forEach(t=>{t.pin=e,j(t)})}function O(){let e=this.value;v().forEach(t=>{t.fill=e,j(t)})}function k(){let e=this.value;v().forEach(t=>{t.stroke=e,j(t)})}function A({i:e,hidden:t,icon:n,dx:r=50,dy:i=50,px:a=12}){let o=n.startsWith(`http`)||n.startsWith(`data:image`),s=!t&&document.querySelector(`#marker${e} > text`);s&&(s.innerHTML=o?``:n,s.setAttribute(`x`,`${r}%`),s.setAttribute(`y`,`${i}%`),s.setAttribute(`font-size`,`${a}px`));let c=!t&&document.querySelector(`#marker${e} > image`);c&&(c.setAttribute(`x`,`${r/2}%`),c.setAttribute(`y`,`${i/2}%`),c.setAttribute(`width`,`${a}px`),c.setAttribute(`height`,`${a}px`),c.setAttribute(`href`,o?n:``))}function j({i:e,hidden:t,pin:n=`bubble`,fill:r=`#fff`,stroke:a=`#000`}){let o=!t&&document.querySelector(`#marker${e} > g`);o&&(o.innerHTML=i(n,r,a))}function M(){let e=p.id;f.NotesEditor.open(e,e)}function N(){f.MarkersInRadius.open(m)}function P(){m.lock=!m.lock;let e=r(`markerLock`);e.classList.toggle(`icon-lock-open`),e.classList.toggle(`icon-lock`)}function F(){f.MarkerCreator.toggle(m)}function I(){c({title:`Remove marker`,message:`Are you sure you want to remove this marker? The action cannot be reverted`,confirm:`Remove`,onConfirm:L})}function L(){Markers.deleteMarker(m.i),p.remove(),$(`#markerEditor`).dialog(`close`),s()}function R(){n(p).on(`.drag`,null).classed(`draggable`,!1),r(`addMarker`).classList.contains(`pressed`)&&d(),o(),l(`markerEditor`)}var z={open:h};export{z as MarkersEditor};