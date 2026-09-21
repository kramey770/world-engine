import{M as e,N as t,Tt as n,k as r,mn as i,un as a}from"./utils-omhVlsRt.js";import{m as o,p as s,t as c}from"./layers-DHltDypB.js";import{t as l}from"./drag-BkOXJRRX.js";import{u}from"./megalopolis-BpsA5rhH.js";import{n as d,r as f,t as p}from"./tooltips-BQ3W48fB.js";import{r as m,t as h}from"./dialog-helpers-CdcIkxap.js";import{n as g,t as _}from"./brush-circle-5_MK8VXE.js";import{F as v,a as y,j as b,o as x,s as S}from"./index-DWZM8gkY.js";var C=40,w=null,T=()=>Object.entries(S).map(([e,{name:t}])=>`<option value="${e}">${t}</option>`).join(``),E=()=>Object.keys(S).map(e=>`<div data-type="${e}" style="display: none">${D(e)}</div>`).join(``),D=e=>x.filter(({set:t})=>t===S[e].base).flatMap(({type:n,variants:r,zoom:i=1})=>{let a=C*i,o=50-50*i,s=t(n.replace(/([A-Z])/g,` $1`).toLowerCase());return r.map(t=>{let r=y(n,t,e);return`<svg data-type="${r}" data-tip="Select ${s} icon">
          <use href="#${r}" x="${o}%" y="${o}%" width="${a}" height="${a}"></use>
        </svg>`})}).join(``);function O(e){customization||(h(`.stable`),c.show(`relief`),w=q(e),a(`#terrain`).call(l().on(`start`,A)).classed(`draggable`,!0),k(),j(),M(),N(),$(`#reliefEditor`).dialog({title:`Edit Relief Icons`,resizable:!1,width:`27em`,position:{my:`left top`,at:`left+10 top+10`,of:`#map`},close:J}))}function k(){m(`reliefEditor`);let e=`<div id="reliefEditor" class="dialog">
    <div id="reliefTools" data-tip="Select mode of operation">
      <div class="reliefEditorLabel">Mode:</div>
      <button id="reliefIndividual" data-tip="Edit individual selected icon" class="icon-info pressed"></button>
      <button id="reliefBulkAdd" data-tip="Place icons in a bulk" class="icon-brush"></button>
      <button id="reliefBulkRemove" data-tip="Remove icons in a bulk" class="icon-eraser"></button>
      <div style="margin-left: 4.6em">Set:</div>
      <select id="reliefEditorSet">${T()}</select>
    </div>
    <div id="reliefSizeDiv" data-tip="Set icon size for individual icon or for bulk placement">
      <div class="reliefEditorLabel">Size:</div>
      <input
        id="reliefSize"
        oninput="reliefSizeNumber.value = this.value"
        type="range"
        min="2"
        max="50"
        value="5"
      />
      <input id="reliefSizeNumber" oninput="reliefSize.value = this.value" type="number" min="2" value="5" />
    </div>
    <div id="reliefRadiusDiv" data-tip="Set brush radius for icons placement on deletion" style="display: none">
      <div class="reliefEditorLabel">Radius:</div>
      <input
        id="reliefRadius"
        oninput="reliefRadiusNumber.value = this.value"
        type="range"
        min="1"
        max="100"
        value="15"
      />
      <input id="reliefRadiusNumber" oninput="reliefRadius.value = this.value" type="number" min="1" value="15" />
    </div>
    <div id="reliefSpacingDiv" data-tip="Set spacing between relief icons" style="display: none">
      <div class="reliefEditorLabel">Spacing:</div>
      <input
        id="reliefSpacing"
        oninput="reliefSpacingNumber.value = this.value"
        type="range"
        min="2"
        max="20"
        value="5"
      />
      <input id="reliefSpacingNumber" oninput="reliefSpacing.value = this.value" type="number" min="2" value="5" />
    </div>
    <div id="reliefIconsDiv" data-tip="Select icon">
${E()}
      <svg id="reliefIconsSeletionAny" data-tip="Select any type of icons"><text x="50%" y="50%">Any</text></svg>
    </div>
    <div id="reliefBottom">
      <button id="reliefEditStyle" data-tip="Edit Relief Icons style in Style Editor" class="icon-adjust"></button>
      <button id="reliefCopy" data-tip="Copy selected relief icon" class="icon-clone"></button>
      <button id="reliefMoveFront" data-tip="Move selected relief icon to front" class="icon-level-up"></button>
      <button id="reliefMoveBack" data-tip="Move selected relief icon back" class="icon-level-down"></button>
      <button
        id="reliefRemove"
        data-tip="Remove selected relief icon or icon type"
        data-shortcut="Delete"
        class="icon-trash fastDelete"
      ></button>
    </div>
  </div>`;r(`dialogs`).insertAdjacentHTML(`beforeend`,e),r(`reliefIndividual`).addEventListener(`click`,P),r(`reliefBulkAdd`).addEventListener(`click`,F),r(`reliefBulkRemove`).addEventListener(`click`,z),r(`reliefSize`).addEventListener(`input`,V),r(`reliefSizeNumber`).addEventListener(`input`,V),r(`reliefEditorSet`).addEventListener(`change`,H),r(`reliefIconsDiv`).querySelectorAll(`svg`).forEach(e=>{e.addEventListener(`click`,U)}),r(`reliefEditStyle`).addEventListener(`click`,()=>editStyle(`terrain`)),r(`reliefCopy`).addEventListener(`click`,W),r(`reliefMoveFront`).addEventListener(`click`,()=>G(`front`)),r(`reliefMoveBack`).addEventListener(`click`,()=>G(`back`)),r(`reliefRemove`).addEventListener(`click`,K),H()}function A(e){let t=q(e.sourceEvent?.target);if(!t)return;let r=t.x-e.x,i=t.y-e.y;e.on(`drag`,e=>{t.x=n(r+e.x,2),t.y=n(i+e.y,2),o()})}function j(){r(`reliefTools`).querySelector(`button.pressed`)?r(`reliefBulkAdd`).classList.contains(`pressed`)?F():r(`reliefBulkRemove`).classList.contains(`pressed`)&&z():P()}function M(){if(!w)return;let e=r(`reliefIconsDiv`),t=e.querySelector(`svg[data-type='${w.icon}']`);if(!t)return;e.querySelectorAll(`svg.pressed`).forEach(e=>{e.classList.remove(`pressed`)}),t.classList.add(`pressed`),e.querySelectorAll(`div`).forEach(e=>{e.style.display=`none`});let n=t.parentNode;n.style.display=`block`,r(`reliefEditorSet`).value=n.dataset.type}function N(){w&&(r(`reliefSize`).value=r(`reliefSizeNumber`).value=String(n(w.s)))}function P(){r(`reliefTools`).querySelectorAll(`button.pressed`).forEach(e=>{e.classList.remove(`pressed`)}),r(`reliefIndividual`).classList.add(`pressed`),r(`reliefSizeDiv`).style.display=`block`,r(`reliefRadiusDiv`).style.display=`none`,r(`reliefSpacingDiv`).style.display=`none`,r(`reliefIconsSeletionAny`).style.display=`none`,g(),N(),b(),p()}function F(){r(`reliefTools`).querySelectorAll(`button.pressed`).forEach(e=>{e.classList.remove(`pressed`)}),r(`reliefBulkAdd`).classList.add(`pressed`),r(`reliefSizeDiv`).style.display=`block`,r(`reliefRadiusDiv`).style.display=`block`,r(`reliefSpacingDiv`).style.display=`block`,r(`reliefIconsSeletionAny`).style.display=`none`;let e=r(`reliefIconsDiv`);e.querySelector(`svg.pressed`)?.id===`reliefIconsSeletionAny`&&(r(`reliefIconsSeletionAny`).classList.remove(`pressed`),e.querySelector(`svg`)?.classList.add(`pressed`)),a(`#viewbox`).style(`cursor`,`crosshair`).call(l().on(`start`,L)).on(`touchmove mousemove`,I),f(`Drag to place relief icons within radius`,!0)}function I(t){d();let n=e(t,this),i=+r(`reliefRadiusNumber`).value;_(n[0],n[1],i)}function L(t){let a=r(`reliefIconsDiv`).querySelector(`svg.pressed`);if(!a){f(`Please select an icon`,!1,`error`);return}let s=a.dataset.type,c=+r(`reliefRadiusNumber`).value,l=+r(`reliefSpacingNumber`).value,d=+r(`reliefSizeNumber`).value,p=u(pack.relief.map(({x:e,y:t,s:n})=>[e+n/2,t+n/2]));t.on(`drag`,function(t){let r=e(t,this);_(r[0],r[1],c),i(Math.ceil(c/10)).forEach(()=>{let e=Math.PI*2*Math.random(),t=c*Math.random(),i=r[0]+t*Math.cos(e),a=r[1]+t*Math.sin(e);if(p.find(i,a,l)||pack.cells.h[Pack.findCell(i,a)]<20)return;let o=n(d/2*(Math.random()*.4+.8),2);p.add([i,a]),R({icon:s,x:n(i-o,2),y:n(a-o,2),s:n(o*2,2)})}),o()})}function R(e){let t=e.y+e.s,n=0,r=pack.relief.length;for(;n<r;){let e=n+r>>1;pack.relief[e].y+pack.relief[e].s<=t?n=e+1:r=e}pack.relief.splice(n,0,e)}function z(){r(`reliefTools`).querySelectorAll(`button.pressed`).forEach(e=>{e.classList.remove(`pressed`)}),r(`reliefBulkRemove`).classList.add(`pressed`),r(`reliefSizeDiv`).style.display=`none`,r(`reliefRadiusDiv`).style.display=`block`,r(`reliefSpacingDiv`).style.display=`none`,r(`reliefIconsSeletionAny`).style.display=`inline-block`,a(`#viewbox`).style(`cursor`,`crosshair`).call(l().on(`start`,B)).on(`touchmove mousemove`,I),f(`Drag to remove relief icons in radius`,!0)}function B(t){let n=r(`reliefIconsDiv`).querySelector(`svg.pressed`);if(!n){f(`Please select an icon`,!1,`error`);return}let i=+r(`reliefRadiusNumber`).value,a=n.dataset.type,s=u();for(let e of pack.relief)a&&e.icon!==a||s.add([e.x+e.s/2,e.y+e.s/2,e]);t.on(`drag`,function(t){let n=e(t,this);_(n[0],n[1],i);let r=v(n[0],n[1],i,s);if(!r.length)return;let a=new Set(r.map(e=>e[2]));for(let e of r)s.remove(e);pack.relief=pack.relief.filter(e=>!a.has(e)),w&&a.has(w)&&(w=null),o()})}function V(){if(!w||!r(`reliefIndividual`).classList.contains(`pressed`))return;let e=+r(`reliefSizeNumber`).value,t=(e-w.s)/2;w.s=e,w.x=n(w.x-t,2),w.y=n(w.y-t,2),o()}function H(){let e=r(`reliefEditorSet`).value,t=r(`reliefIconsDiv`);t.querySelectorAll(`div`).forEach(e=>{e.style.display=`none`}),t.querySelector(`div[data-type='${e}']`).style.display=`block`}function U(){this.classList.contains(`pressed`)||(r(`reliefIconsDiv`).querySelectorAll(`svg.pressed`).forEach(e=>{e.classList.remove(`pressed`)}),this.classList.add(`pressed`),r(`reliefIndividual`).classList.contains(`pressed`)&&w&&(w.icon=this.dataset.type,o()))}function W(){if(!w)return;let{x:e,y:t}=w;do e-=3,t-=3;while(pack.relief.some(n=>n.x===e&&n.y===t));let n={...w,x:e,y:t};pack.relief.push(n),w=n,o()}function G(e){if(!w)return;let t=pack.relief.indexOf(w);t<0||(pack.relief.splice(t,1),e===`front`?pack.relief.push(w):pack.relief.unshift(w),o())}function K(){let e=r(`reliefTools`).querySelector(`button.pressed`)?.id===`reliefIndividual`,t=r(`reliefIconsDiv`).querySelector(`svg.pressed`)?.dataset.type,n=e?new Set(w?[w]:[]):new Set(pack.relief.filter(e=>!t||e.icon===t));e?alertMessage.innerHTML=`Are you sure you want to remove the icon?`:alertMessage.innerHTML=t?`Are you sure you want to remove all ${t} icons (${n.size})?`:`Are you sure you want to remove all icons (${n.size})?`,$(`#alert`).dialog({resizable:!1,title:`Remove relief icons`,buttons:{Remove:function(){pack.relief=pack.relief.filter(e=>!n.has(e)),w=null,o(),$(this).dialog(`close`),$(`#reliefEditor`).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}}})}function q(e){if(e?.tagName!==`use`)return null;let t=e.dataset.id;return t&&s(t)||null}function J(){let e=!r(`reliefIndividual`).classList.contains(`pressed`);a(`#terrain`).on(`.drag`,null).classed(`draggable`,!1),w=null,g(),e&&b(),p(),$(`#reliefEditor`).dialog(`destroy`),r(`reliefEditor`).remove()}var Y={open:O};export{Y as ReliefEditor};