import{M as e,N as t,Tt as n,f as r,k as i,mn as a,un as o}from"./utils-D3KEhgY0.js";import{t as s}from"./quadtree-DgASQllf.js";import{n as c,r as l,t as u}from"./tooltips-D1wvMKni.js";import{H as d,Kt as f,Q as p,W as m,d as h,f as g,ft as _,n as v,p as y,pt as b,q as x,t as S}from"./index-D3JPylQY.js";var C=40,w=null,T=()=>Object.entries(y).map(([e,{name:t}])=>`<option value="${e}">${t}</option>`).join(``),E=()=>Object.keys(y).map(e=>`<div data-type="${e}" style="display: none">${D(e)}</div>`).join(``),D=e=>g.filter(({set:t})=>t===y[e].base).flatMap(({type:n,variants:r,zoom:i=1})=>{let a=C*i,o=50-50*i,s=t(n.replace(/([A-Z])/g,` $1`).toLowerCase());return r.map(t=>{let r=h(n,t,e);return`<svg data-type="${r}" data-tip="Select ${s} icon">
          <use href="#${r}" x="${o}%" y="${o}%" width="${a}" height="${a}"></use>
        </svg>`})}).join(``);function O(e){customization||(d(`.stable`),p.show(`relief`),w=q(e),o(`#terrain`).call(f().on(`start`,A)).classed(`draggable`,!0),k(),j(),M(),N(),$(`#reliefEditor`).dialog({title:`Edit Relief Icons`,resizable:!1,width:`27em`,position:{my:`left top`,at:`left+10 top+10`,of:`#map`},close:J}))}function k(){m(`reliefEditor`);let e=`<div id="reliefEditor" class="dialog">
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
  </div>`;i(`dialogs`).insertAdjacentHTML(`beforeend`,e),i(`reliefIndividual`).addEventListener(`click`,P),i(`reliefBulkAdd`).addEventListener(`click`,F),i(`reliefBulkRemove`).addEventListener(`click`,z),i(`reliefSize`).addEventListener(`input`,V),i(`reliefSizeNumber`).addEventListener(`input`,V),i(`reliefEditorSet`).addEventListener(`change`,H),i(`reliefIconsDiv`).querySelectorAll(`svg`).forEach(e=>{e.addEventListener(`click`,U)}),i(`reliefEditStyle`).addEventListener(`click`,()=>editStyle(`terrain`)),i(`reliefCopy`).addEventListener(`click`,W),i(`reliefMoveFront`).addEventListener(`click`,()=>G(`front`)),i(`reliefMoveBack`).addEventListener(`click`,()=>G(`back`)),i(`reliefRemove`).addEventListener(`click`,K),H()}function A(e){let t=q(e.sourceEvent?.target);if(!t)return;let r=t.x-e.x,i=t.y-e.y;e.on(`drag`,e=>{t.x=n(r+e.x,2),t.y=n(i+e.y,2),b()})}function j(){i(`reliefTools`).querySelector(`button.pressed`)?i(`reliefBulkAdd`).classList.contains(`pressed`)?F():i(`reliefBulkRemove`).classList.contains(`pressed`)&&z():P()}function M(){if(!w)return;let e=i(`reliefIconsDiv`),t=e.querySelector(`svg[data-type='${w.icon}']`);if(!t)return;e.querySelectorAll(`svg.pressed`).forEach(e=>{e.classList.remove(`pressed`)}),t.classList.add(`pressed`),e.querySelectorAll(`div`).forEach(e=>{e.style.display=`none`});let n=t.parentNode;n.style.display=`block`,i(`reliefEditorSet`).value=n.dataset.type}function N(){w&&(i(`reliefSize`).value=i(`reliefSizeNumber`).value=String(n(w.s)))}function P(){i(`reliefTools`).querySelectorAll(`button.pressed`).forEach(e=>{e.classList.remove(`pressed`)}),i(`reliefIndividual`).classList.add(`pressed`),i(`reliefSizeDiv`).style.display=`block`,i(`reliefRadiusDiv`).style.display=`none`,i(`reliefSpacingDiv`).style.display=`none`,i(`reliefIconsSeletionAny`).style.display=`none`,v(),N(),x(),u()}function F(){i(`reliefTools`).querySelectorAll(`button.pressed`).forEach(e=>{e.classList.remove(`pressed`)}),i(`reliefBulkAdd`).classList.add(`pressed`),i(`reliefSizeDiv`).style.display=`block`,i(`reliefRadiusDiv`).style.display=`block`,i(`reliefSpacingDiv`).style.display=`block`,i(`reliefIconsSeletionAny`).style.display=`none`;let e=i(`reliefIconsDiv`);e.querySelector(`svg.pressed`)?.id===`reliefIconsSeletionAny`&&(i(`reliefIconsSeletionAny`).classList.remove(`pressed`),e.querySelector(`svg`)?.classList.add(`pressed`)),o(`#viewbox`).style(`cursor`,`crosshair`).call(f().on(`start`,L)).on(`touchmove mousemove`,I),l(`Drag to place relief icons within radius`,!0)}function I(t){c();let n=e(t,this),r=+i(`reliefRadiusNumber`).value;S(n[0],n[1],r)}function L(t){let r=i(`reliefIconsDiv`).querySelector(`svg.pressed`);if(!r){l(`Please select an icon`,!1,`error`);return}let o=r.dataset.type,c=+i(`reliefRadiusNumber`).value,u=+i(`reliefSpacingNumber`).value,d=+i(`reliefSizeNumber`).value,f=s(pack.relief.map(({x:e,y:t,s:n})=>[e+n/2,t+n/2]));t.on(`drag`,function(t){let r=e(t,this);S(r[0],r[1],c),a(Math.ceil(c/10)).forEach(()=>{let e=Math.PI*2*Math.random(),t=c*Math.random(),i=r[0]+t*Math.cos(e),a=r[1]+t*Math.sin(e);if(f.find(i,a,u)||pack.cells.h[Pack.findCell(i,a)]<20)return;let s=n(d/2*(Math.random()*.4+.8),2);f.add([i,a]),R({icon:o,x:n(i-s,2),y:n(a-s,2),s:n(s*2,2)})}),b()})}function R(e){let t=e.y+e.s,n=0,r=pack.relief.length;for(;n<r;){let e=n+r>>1;pack.relief[e].y+pack.relief[e].s<=t?n=e+1:r=e}pack.relief.splice(n,0,e)}function z(){i(`reliefTools`).querySelectorAll(`button.pressed`).forEach(e=>{e.classList.remove(`pressed`)}),i(`reliefBulkRemove`).classList.add(`pressed`),i(`reliefSizeDiv`).style.display=`none`,i(`reliefRadiusDiv`).style.display=`block`,i(`reliefSpacingDiv`).style.display=`none`,i(`reliefIconsSeletionAny`).style.display=`inline-block`,o(`#viewbox`).style(`cursor`,`crosshair`).call(f().on(`start`,B)).on(`touchmove mousemove`,I),l(`Drag to remove relief icons in radius`,!0)}function B(t){let n=i(`reliefIconsDiv`).querySelector(`svg.pressed`);if(!n){l(`Please select an icon`,!1,`error`);return}let a=+i(`reliefRadiusNumber`).value,o=n.dataset.type,c=s();for(let e of pack.relief)o&&e.icon!==o||c.add([e.x+e.s/2,e.y+e.s/2,e]);t.on(`drag`,function(t){let n=e(t,this);S(n[0],n[1],a);let i=r(n[0],n[1],a,c);if(!i.length)return;let o=new Set(i.map(e=>e[2]));for(let e of i)c.remove(e);pack.relief=pack.relief.filter(e=>!o.has(e)),w&&o.has(w)&&(w=null),b()})}function V(){if(!w||!i(`reliefIndividual`).classList.contains(`pressed`))return;let e=+i(`reliefSizeNumber`).value,t=(e-w.s)/2;w.s=e,w.x=n(w.x-t,2),w.y=n(w.y-t,2),b()}function H(){let e=i(`reliefEditorSet`).value,t=i(`reliefIconsDiv`);t.querySelectorAll(`div`).forEach(e=>{e.style.display=`none`}),t.querySelector(`div[data-type='${e}']`).style.display=`block`}function U(){this.classList.contains(`pressed`)||(i(`reliefIconsDiv`).querySelectorAll(`svg.pressed`).forEach(e=>{e.classList.remove(`pressed`)}),this.classList.add(`pressed`),i(`reliefIndividual`).classList.contains(`pressed`)&&w&&(w.icon=this.dataset.type,b()))}function W(){if(!w)return;let{x:e,y:t}=w;do e-=3,t-=3;while(pack.relief.some(n=>n.x===e&&n.y===t));let n={...w,x:e,y:t};pack.relief.push(n),w=n,b()}function G(e){if(!w)return;let t=pack.relief.indexOf(w);t<0||(pack.relief.splice(t,1),e===`front`?pack.relief.push(w):pack.relief.unshift(w),b())}function K(){let e=i(`reliefTools`).querySelector(`button.pressed`)?.id===`reliefIndividual`,t=i(`reliefIconsDiv`).querySelector(`svg.pressed`)?.dataset.type,n=e?new Set(w?[w]:[]):new Set(pack.relief.filter(e=>!t||e.icon===t));e?alertMessage.innerHTML=`Are you sure you want to remove the icon?`:alertMessage.innerHTML=t?`Are you sure you want to remove all ${t} icons (${n.size})?`:`Are you sure you want to remove all icons (${n.size})?`,$(`#alert`).dialog({resizable:!1,title:`Remove relief icons`,buttons:{Remove:function(){pack.relief=pack.relief.filter(e=>!n.has(e)),w=null,b(),$(this).dialog(`close`),$(`#reliefEditor`).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}}})}function q(e){if(e?.tagName!==`use`)return null;let t=e.dataset.id;return t&&_(t)||null}function J(){let e=!i(`reliefIndividual`).classList.contains(`pressed`);o(`#terrain`).on(`.drag`,null).classed(`draggable`,!1),w=null,v(),e&&x(),u(),$(`#reliefEditor`).dialog(`destroy`),i(`reliefEditor`).remove()}var Y={open:O};export{Y as ReliefEditor};