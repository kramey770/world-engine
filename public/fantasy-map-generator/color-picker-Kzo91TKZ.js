import{Kt as e,Ot as t,P as n,in as r,rt as i,st as a}from"./utils-QIQ6pakx.js";import{t as o}from"./drag-BW8PzmGe.js";import{r as s}from"./tooltips-C2LTs11V.js";var c=14,l=22,u=20,d=4,f=16,p=315;function m(t,n){document.getElementById(`pickerContainer`)?.remove(),g(h(),n);let r=t.startsWith(`url(`)?null:e(t);if(r){let e=a(r.formatHex());e!==t.toLowerCase()&&n(e),t=e}b(t)}function h(){let e=Array.from(document.querySelectorAll(`g#defs-hatching > pattern`)),t=e.length,n=i,r=Math.ceil(t/c),a=36+r*u,o=16+t*2+r*u,s=Math.max(40,a,o)+9,m=(svgWidth-p)/2,h=(svgHeight-s)/2,g=Array.from(document.querySelectorAll(`.ui-front`)).reduce((e,t)=>Math.max(e,Number(getComputedStyle(t).zIndex)||0),100)+1,_=n.map((e,t)=>`<rect
        id="picker_${e}"
        fill="${e}"
        class="${t?``:`selected`}"
        x="${t%c*l+d}"
        y="${40+Math.floor(t/c)*u}"
        width="${f}"
        height="${f}"
      ></rect>`).join(``),v=e.map((e,n)=>`<rect
        id="picker_${e.id}"
        fill="url(#${e.id})"
        x="${n%c*l+d}"
        y="${Math.floor(n/c)*u+20+t*2}"
        width="${f}"
        height="${f}"
      ></rect>`).join(``);return document.body.insertAdjacentHTML(`beforeend`,`<svg
      id="pickerContainer"
      width="100%"
      height="100%"
      style="z-index: ${g}"
    >
      <rect id="pickerOverlay" x="0" y="0" width="100%" height="100%" opacity="0.2"></rect>
      <g id="picker" transform="translate(${m},${h})">
        <rect id="pickerBackground" x="0" y="0" width="${p}" height="${s}" fill="#151517" stroke="#35353a"></rect>
        <g id="pickerColors" stroke="#35353a">${_}</g>
        <g id="pickerHatches" stroke="#35353a">${v}</g>
        <rect id="pickerHeader" x="0" y="-30" width="${p}" height="30"></rect>
        <text id="pickerLabel" x="12" y="-10">Color Picker</text>
        <rect id="pickerCloseRect" x="292" y="-21" width="14" height="14"></rect>
        <text id="pickerCloseText" x="295" y="-10">✕</text>
      </g>
    </svg>`),document.getElementById(`pickerContainer`)}function g(e,t){let n=v(`picker`),i=()=>e.remove(),a=()=>s(`Click to close the picker`),c=()=>s(`Drag to change the picker position`);v(`pickerOverlay`).addEventListener(`mousemove`,a),v(`pickerOverlay`).addEventListener(`click`,i),v(`pickerCloseRect`).addEventListener(`mousemove`,a),v(`pickerCloseRect`).addEventListener(`click`,i),v(`pickerBackground`).addEventListener(`mousemove`,c),v(`pickerHeader`).addEventListener(`mousemove`,c),v(`pickerLabel`).addEventListener(`mousemove`,c),_(v(`pickerColors`),t,`Click to fill with the color`),_(v(`pickerHatches`),t),r(n).call(o().on(`start`,function(e){S.call(this,e)}))}function _(e,t,n){e.addEventListener(`click`,e=>{let n=e.target.closest(`rect`);n&&x(n,t)}),e.addEventListener(`mouseover`,e=>{let t=e.target.closest(`rect`);t&&s(n||`Click to fill with the hatching ${t.id}`)})}function v(e){return document.getElementById(e)}function y(e){let t=v(`picker`).querySelector(`rect.selected`);t&&e(t.getAttribute(`fill`))}function b(e){let t=v(`picker`);t.querySelector(`rect.selected`)?.classList.remove(`selected`),t.querySelector(`rect[fill='${e.toLowerCase()}']`)?.classList.add(`selected`)}function x(e,t){b(e.getAttribute(`fill`)),y(t)}function S(e){let r=n(this.getAttribute(`transform`)),i=Number(r[0])-e.x,a=Number(r[1])-e.y,o=this.getBBox();e.on(`drag`,e=>{let n=t((i+e.x+o.width)/svgWidth*100,2),r=t((a+e.y+o.height)/svgHeight*100,2);this.setAttribute(`transform`,`translate(${i+e.x},${a+e.y})`),this.dataset.x=String(n),this.dataset.y=String(r)})}var C={open:m};export{C as ColorPicker};