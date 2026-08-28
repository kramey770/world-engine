import{$t as e,P as t,Qt as n,Tt as r,un as i}from"./utils-D3KEhgY0.js";import{r as a}from"./tooltips-D1wvMKni.js";import{Kt as o}from"./index-D3JPylQY.js";var s={pickerH:360,pickerS:1,pickerL:1},c=14,l=22,u=20,d=4,f=16,p=315;function m(e,t){document.getElementById(`pickerContainer`)?.remove(),g(h(),t),e[0]===`#`&&(y(e),E(),D()),x(e)}function h(){let e=Array.from(document.querySelectorAll(`g#defs-hatching > pattern`)),t=e.length,r=Array.from({length:t},(e,r)=>n(r/t*360,.7,.7).formatHex()),i=Math.ceil(t/c),a=36+i*u,o=16+t*2+i*u,s=Math.max(40,a,o)+9,m=(svgWidth-p)/2,h=(svgHeight-s)/2,g=Array.from(document.querySelectorAll(`.ui-front`)).reduce((e,t)=>Math.max(e,Number(getComputedStyle(t).zIndex)||0),100)+1,_=[{id:`pickerH`,label:`H:`,x:4,x1:18,x2:107,cx:75,tip:`Set palette hue`},{id:`pickerS`,label:`S:`,x:113,x1:124,x2:206,cx:181.4,tip:`Set palette saturation`},{id:`pickerL`,label:`L:`,x:213,x1:226,x2:306,cx:282,tip:`Set palette lightness`}].map(e=>`<g data-tip="${e.tip}">
        <text x="${e.x}" y="14">${e.label}</text>
        <line x1="${e.x1}" y1="10" x2="${e.x2}" y2="10"></line>
        <circle cx="${e.cx}" cy="10" r="5" id="${e.id}"></circle>
      </g>`).join(``),v=r.map((e,t)=>`<rect
        id="picker_${e}"
        fill="${e}"
        class="${t?``:`selected`}"
        x="${t%c*l+d}"
        y="${40+Math.floor(t/c)*u}"
        width="${f}"
        height="${f}"
      ></rect>`).join(``),y=e.map((e,n)=>`<rect
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
        <rect id="pickerBackground" x="0" y="0" width="${p}" height="${s}" fill="#ffffff" stroke="#5d4651"></rect>
        <g id="pickerControls">${_}</g>
        <foreignObject id="pickerSpaces" x="4" y="20" width="303" height="20"><label style="margin-right: 6px"
    >HSL: <input type="number" id="pickerHSL_H" data-space="hsl" min="0" max="360" value="231" />,
    <input type="number" id="pickerHSL_S" data-space="hsl" min="0" max="100" value="70" />,
    <input type="number" id="pickerHSL_L" data-space="hsl" min="0" max="100" value="70" />
  </label>
  <label style="margin-right: 6px"
    >RGB: <input type="number" id="pickerRGB_R" data-space="rgb" min="0" max="255" value="125" />,
    <input type="number" id="pickerRGB_G" data-space="rgb" min="0" max="255" value="142" />,
    <input type="number" id="pickerRGB_B" data-space="rgb" min="0" max="255" value="232" />
  </label>
  <label>HEX: <input type="text" id="pickerHEX" data-space="hex" style="width:42px" autocorrect="off" spellcheck="false" value="#7d8ee8" /></label></foreignObject>
        <g id="pickerColors" stroke="#333333">${v}</g>
        <g id="pickerHatches" stroke="#333333">${y}</g>
        <rect id="pickerHeader" x="0" y="-30" width="${p}" height="30"></rect>
        <text id="pickerLabel" x="12" y="-10">Color Picker</text>
        <rect id="pickerCloseRect" x="${p-23}" y="-21" width="14" height="14"></rect>
        <text id="pickerCloseText" x="${p-20}" y="-10">✕</text>
      </g>
    </svg>`),document.getElementById(`pickerContainer`)}function g(e,t){let n=v(`picker`),r=()=>e.remove(),s=()=>a(`Click to close the picker`),c=()=>a(`Drag to change the picker position`);v(`pickerOverlay`).addEventListener(`mousemove`,s),v(`pickerOverlay`).addEventListener(`click`,r),v(`pickerCloseRect`).addEventListener(`mousemove`,s),v(`pickerCloseRect`).addEventListener(`click`,r),v(`pickerBackground`).addEventListener(`mousemove`,c),v(`pickerHeader`).addEventListener(`mousemove`,c),v(`pickerLabel`).addEventListener(`mousemove`,c),v(`pickerControls`).addEventListener(`mousemove`,e=>{let t=e.target.closest(`g[data-tip]`);t&&a(t.dataset.tip||``)}),e.querySelectorAll(`#pickerControls line`).forEach(e=>{e.addEventListener(`click`,e=>k(e,t))}),e.querySelectorAll(`#pickerSpaces input`).forEach(e=>{e.addEventListener(`change`,e=>j(e,t))}),v(`pickerSpaces`).addEventListener(`mousemove`,()=>a(`Color value in different color spaces. Edit to change`)),_(v(`pickerColors`),t,`Click to fill with the color`),_(v(`pickerHatches`),t),i(n).call(o().filter(e=>e.target.tagName!==`INPUT`).on(`start`,function(e){M.call(this,e)})),i(n).selectAll(`#pickerControls circle`).call(o().on(`start`,function(e){A.call(this,e,t)}))}function _(e,t,n){e.addEventListener(`click`,e=>{let n=e.target.closest(`rect`);n&&O(n,t)}),e.addEventListener(`mouseover`,e=>{let t=e.target.closest(`rect`);t&&a(n||`Click to fill with the hatching ${t.id}`)})}function v(e){return document.getElementById(e)}function y(e){let{h:t,s:r,l:i}=n(e);Number.isNaN(t)||C(`pickerH`,t,360),Number.isNaN(r)||C(`pickerS`,r,1),Number.isNaN(i)||C(`pickerL`,i,1)}function b(e){let t=v(`picker`).querySelector(`rect.selected`);t&&e(t.getAttribute(`fill`))}function x(e){let t=v(`picker`);t.querySelector(`rect.selected`)?.classList.remove(`selected`),t.querySelector(`rect[fill='${e.toLowerCase()}']`)?.classList.add(`selected`)}var S=e=>v(e);function C(e,t,n){let r=S(e),i=r.previousElementSibling,a=Number(i.getAttribute(`x1`)),o=Number(i.getAttribute(`x2`))-a;r.setAttribute(`cx`,String(a+t/n*o))}function w(e){let t=S(e),n=t.previousElementSibling,r=Number(n.getAttribute(`x1`)),i=Number(n.getAttribute(`x2`))-r;return(Number(t.getAttribute(`cx`))-r)/i*s[e]}var T=()=>n(w(`pickerH`),w(`pickerS`),w(`pickerL`));function E(){let{h:t,s:n,l:i}=T(),a=(e,t)=>{document.getElementById(e).value=String(t)};a(`pickerHSL_H`,r(t)),a(`pickerHSL_S`,r(n*100)),a(`pickerHSL_L`,r(i*100));let o=e(T());a(`pickerRGB_R`,o.r),a(`pickerRGB_G`,o.g),a(`pickerRGB_B`,o.b),a(`pickerHEX`,o.formatHex())}function D(){let e=Array.from(v(`pickerColors`).querySelectorAll(`rect`)),t=e.length,{h:r,s:i,l:a}=T();e.forEach((e,o)=>{let s=n(o/t*180+r,i,a).formatHex();e.id=`picker_${s}`,e.setAttribute(`fill`,s)})}function O(e,t){let r=e.getAttribute(`fill`);x(r),b(t);let{h:i}=n(r);Number.isNaN(i)||(C(`pickerH`,i,360),E())}function k(e,t){let n=e.currentTarget,r=n.getScreenCTM()?.e||0;n.nextElementSibling.setAttribute(`cx`,String(e.x-r)),E(),D(),b(t)}function A(e,t){let n=this.previousElementSibling,r=Number(n.getAttribute(`x1`)),i=Number(n.getAttribute(`x2`));e.on(`drag`,e=>{this.setAttribute(`cx`,String(Math.max(Math.min(e.x,i),r))),E(),D(),b(t)})}function j(t,r){let i=t.currentTarget,o=()=>a(`You must provide a correct value`,!1,`error`);if(!i.checkValidity())return void o();let s=i.dataset.space,c=Array.from(i.parentNode?.querySelectorAll(`input`)||[]).map(e=>e.value),l=s===`hex`?e(i.value):s===`rgb`?e(Number(c[0]),Number(c[1]),Number(c[2])):n(Number(c[0]),Number(c[1])/100,Number(c[2])/100),{l:u}=n(l);if(Number.isNaN(u))return void o();y(l.formatHex()),E(),D(),b(r)}function M(e){let n=t(this.getAttribute(`transform`)),i=Number(n[0])-e.x,a=Number(n[1])-e.y,o=this.getBBox();e.on(`drag`,e=>{let t=r((i+e.x+o.width)/svgWidth*100,2),n=r((a+e.y+o.height)/svgHeight*100,2);this.setAttribute(`transform`,`translate(${i+e.x},${a+e.y})`),this.dataset.x=String(t),this.dataset.y=String(n)})}var N={open:m};export{N as ColorPicker};