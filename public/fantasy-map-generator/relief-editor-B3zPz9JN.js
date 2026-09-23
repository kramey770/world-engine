import{Et as e,M as t,N as n,dn as r,hn as i,k as a}from"./utils-BIleyWmR.js";import{m as o,p as s,t as c}from"./layers-qPZxwHcp.js";import{t as l}from"./drag-Ck8KuEBm.js";import{u}from"./megalopolis-BpsA5rhH.js";import{n as d,r as f,t as p}from"./tooltips-zkair8Am.js";import{r as m,t as h}from"./dialog-helpers-50LJgx0U.js";import{n as g,t as _}from"./brush-circle-5_MK8VXE.js";import{F as v,a as y,j as b,o as x,s as S}from"./index-tuMZPduM.js";var C=40,w=null,T=()=>Object.entries(S).map(([e,{name:t}])=>`<option value="${e}">${t}</option>`).join(``),E=()=>Object.keys(S).map(e=>`<div data-type="${e}" style="display: none">${D(e)}</div>`).join(``),D=e=>x.filter(({set:t})=>t===S[e].base).flatMap(({type:t,variants:r,zoom:i=1})=>{let a=C*i,o=50-50*i,s=n(t.replace(/([A-Z])/g,` $1`).toLowerCase());return r.map(n=>{let r=y(t,n,e);return`<svg data-type="${r}" data-tip="Select ${s} icon">
          <use href="#${r}" x="${o}%" y="${o}%" width="${a}" height="${a}"></use>
        </svg>`})}).join(``);function O(e){customization||(h(`.stable`),c.show(`relief`),w=q(e),r(`#terrain`).call(l().on(`start`,A)).classed(`draggable`,!0),k(),j(),M(),N(),$(`#reliefEditor`).dialog({title:`Edit Relief Icons`,resizable:!1,width:`27em`,position:{my:`left top`,at:`left+10 top+10`,of:`#map`},close:J}))}function k(){m(`reliefEditor`);let e=`<div id="reliefEditor" class="dialog">
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
  </div>`;a(`dialogs`).insertAdjacentHTML(`beforeend`,e),a(`reliefIndividual`).addEventListener(`click`,P),a(`reliefBulkAdd`).addEventListener(`click`,F),a(`reliefBulkRemove`).addEventListener(`click`,z),a(`reliefSize`).addEventListener(`input`,V),a(`reliefSizeNumber`).addEventListener(`input`,V),a(`reliefEditorSet`).addEventListener(`change`,H),a(`reliefIconsDiv`).querySelectorAll(`svg`).forEach(e=>{e.addEventListener(`click`,U)}),a(`reliefEditStyle`).addEventListener(`click`,()=>editStyle(`terrain`)),a(`reliefCopy`).addEventListener(`click`,W),a(`reliefMoveFront`).addEventListener(`click`,()=>G(`front`)),a(`reliefMoveBack`).addEventListener(`click`,()=>G(`back`)),a(`reliefRemove`).addEventListener(`click`,K),H()}function A(t){let n=q(t.sourceEvent?.target);if(!n)return;let r=n.x-t.x,i=n.y-t.y;t.on(`drag`,t=>{n.x=e(r+t.x,2),n.y=e(i+t.y,2),o()})}function j(){a(`reliefTools`).querySelector(`button.pressed`)?a(`reliefBulkAdd`).classList.contains(`pressed`)?F():a(`reliefBulkRemove`).classList.contains(`pressed`)&&z():P()}function M(){if(!w)return;let e=a(`reliefIconsDiv`),t=e.querySelector(`svg[data-type='${w.icon}']`);if(!t)return;e.querySelectorAll(`svg.pressed`).forEach(e=>{e.classList.remove(`pressed`)}),t.classList.add(`pressed`),e.querySelectorAll(`div`).forEach(e=>{e.style.display=`none`});let n=t.parentNode;n.style.display=`block`,a(`reliefEditorSet`).value=n.dataset.type}function N(){w&&(a(`reliefSize`).value=a(`reliefSizeNumber`).value=String(e(w.s)))}function P(){a(`reliefTools`).querySelectorAll(`button.pressed`).forEach(e=>{e.classList.remove(`pressed`)}),a(`reliefIndividual`).classList.add(`pressed`),a(`reliefSizeDiv`).style.display=`block`,a(`reliefRadiusDiv`).style.display=`none`,a(`reliefSpacingDiv`).style.display=`none`,a(`reliefIconsSeletionAny`).style.display=`none`,g(),N(),b(),p()}function F(){a(`reliefTools`).querySelectorAll(`button.pressed`).forEach(e=>{e.classList.remove(`pressed`)}),a(`reliefBulkAdd`).classList.add(`pressed`),a(`reliefSizeDiv`).style.display=`block`,a(`reliefRadiusDiv`).style.display=`block`,a(`reliefSpacingDiv`).style.display=`block`,a(`reliefIconsSeletionAny`).style.display=`none`;let e=a(`reliefIconsDiv`);e.querySelector(`svg.pressed`)?.id===`reliefIconsSeletionAny`&&(a(`reliefIconsSeletionAny`).classList.remove(`pressed`),e.querySelector(`svg`)?.classList.add(`pressed`)),r(`#viewbox`).style(`cursor`,`crosshair`).call(l().on(`start`,L)).on(`touchmove mousemove`,I),f(`Drag to place relief icons within radius`,!0)}function I(e){d();let n=t(e,this),r=+a(`reliefRadiusNumber`).value;_(n[0],n[1],r)}function L(n){let r=a(`reliefIconsDiv`).querySelector(`svg.pressed`);if(!r){f(`Please select an icon`,!1,`error`);return}let s=r.dataset.type,c=+a(`reliefRadiusNumber`).value,l=+a(`reliefSpacingNumber`).value,d=+a(`reliefSizeNumber`).value,p=u(pack.relief.map(({x:e,y:t,s:n})=>[e+n/2,t+n/2]));n.on(`drag`,function(n){let r=t(n,this);_(r[0],r[1],c),i(Math.ceil(c/10)).forEach(()=>{let t=Math.PI*2*Math.random(),n=c*Math.random(),i=r[0]+n*Math.cos(t),a=r[1]+n*Math.sin(t);if(p.find(i,a,l)||pack.cells.h[Pack.findCell(i,a)]<20)return;let o=e(d/2*(Math.random()*.4+.8),2);p.add([i,a]),R({icon:s,x:e(i-o,2),y:e(a-o,2),s:e(o*2,2)})}),o()})}function R(e){let t=e.y+e.s,n=0,r=pack.relief.length;for(;n<r;){let e=n+r>>1;pack.relief[e].y+pack.relief[e].s<=t?n=e+1:r=e}pack.relief.splice(n,0,e)}function z(){a(`reliefTools`).querySelectorAll(`button.pressed`).forEach(e=>{e.classList.remove(`pressed`)}),a(`reliefBulkRemove`).classList.add(`pressed`),a(`reliefSizeDiv`).style.display=`none`,a(`reliefRadiusDiv`).style.display=`block`,a(`reliefSpacingDiv`).style.display=`none`,a(`reliefIconsSeletionAny`).style.display=`inline-block`,r(`#viewbox`).style(`cursor`,`crosshair`).call(l().on(`start`,B)).on(`touchmove mousemove`,I),f(`Drag to remove relief icons in radius`,!0)}function B(e){let n=a(`reliefIconsDiv`).querySelector(`svg.pressed`);if(!n){f(`Please select an icon`,!1,`error`);return}let r=+a(`reliefRadiusNumber`).value,i=n.dataset.type,s=u();for(let e of pack.relief)i&&e.icon!==i||s.add([e.x+e.s/2,e.y+e.s/2,e]);e.on(`drag`,function(e){let n=t(e,this);_(n[0],n[1],r);let i=v(n[0],n[1],r,s);if(!i.length)return;let a=new Set(i.map(e=>e[2]));for(let e of i)s.remove(e);pack.relief=pack.relief.filter(e=>!a.has(e)),w&&a.has(w)&&(w=null),o()})}function V(){if(!w||!a(`reliefIndividual`).classList.contains(`pressed`))return;let t=+a(`reliefSizeNumber`).value,n=(t-w.s)/2;w.s=t,w.x=e(w.x-n,2),w.y=e(w.y-n,2),o()}function H(){let e=a(`reliefEditorSet`).value,t=a(`reliefIconsDiv`);t.querySelectorAll(`div`).forEach(e=>{e.style.display=`none`}),t.querySelector(`div[data-type='${e}']`).style.display=`block`}function U(){this.classList.contains(`pressed`)||(a(`reliefIconsDiv`).querySelectorAll(`svg.pressed`).forEach(e=>{e.classList.remove(`pressed`)}),this.classList.add(`pressed`),a(`reliefIndividual`).classList.contains(`pressed`)&&w&&(w.icon=this.dataset.type,o()))}function W(){if(!w)return;let{x:e,y:t}=w;do e-=3,t-=3;while(pack.relief.some(n=>n.x===e&&n.y===t));let n={...w,x:e,y:t};pack.relief.push(n),w=n,o()}function G(e){if(!w)return;let t=pack.relief.indexOf(w);t<0||(pack.relief.splice(t,1),e===`front`?pack.relief.push(w):pack.relief.unshift(w),o())}function K(){let e=a(`reliefTools`).querySelector(`button.pressed`)?.id===`reliefIndividual`,t=a(`reliefIconsDiv`).querySelector(`svg.pressed`)?.dataset.type,n=e?new Set(w?[w]:[]):new Set(pack.relief.filter(e=>!t||e.icon===t));e?alertMessage.innerHTML=`Are you sure you want to remove the icon?`:alertMessage.innerHTML=t?`Are you sure you want to remove all ${t} icons (${n.size})?`:`Are you sure you want to remove all icons (${n.size})?`,$(`#alert`).dialog({resizable:!1,title:`Remove relief icons`,buttons:{Remove:function(){pack.relief=pack.relief.filter(e=>!n.has(e)),w=null,o(),$(this).dialog(`close`),$(`#reliefEditor`).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}}})}function q(e){if(e?.tagName!==`use`)return null;let t=e.dataset.id;return t&&s(t)||null}function J(){let e=!a(`reliefIndividual`).classList.contains(`pressed`);r(`#terrain`).on(`.drag`,null).classed(`draggable`,!1),w=null,g(),e&&b(),p(),$(`#reliefEditor`).dialog(`destroy`),a(`reliefEditor`).remove()}var Y={open:O};export{Y as ReliefEditor};