import{C as e,J as t,S as n,Tt as r,k as i,un as a}from"./utils-omhVlsRt.js";import{A as o,E as s,j as c}from"./layers-DHltDypB.js";import{t as l}from"./drag-BkOXJRRX.js";import{n as u}from"./highlight-D0bzltDC.js";import{r as d,t as f}from"./tooltips-BQ3W48fB.js";import{r as p}from"./dialog-helpers-CdcIkxap.js";import{t as m}from"./emblems-generator-BN5o8bHo.js";var h,g,_,v;async function y(){let e=pack.states.find(e=>e.i&&!e.removed&&e.coa),t=pack.burgs.find(e=>e.i&&!e.removed&&e.coa),n=e?`state`:`burg`,r=e??t;if(!r?.coa){d(`No emblems to edit, please generate states and burgs first`,!1,`error`);return}let i=`${n}COA${r.i}`;await c.trigger(i,r.coa),b(n,i,r)}function b(e,t,n,r){if(!customization){if(!t&&r)S(r);else{if(!e||!t||!n?.coa)return;h=e,g=t,_=n}x(),q(),v?.(),v=o(q),C(),$(`#emblemEditor`).dialog({title:`Edit Emblem`,resizable:!0,width:`18.2em`,height:`auto`,position:{my:`left top`,at:`left+10 top+10`,of:`svg`,collision:`fit`},close:J})}}function x(){p(`emblemEditor`),i(`dialogs`).insertAdjacentHTML(`beforeend`,`<div id="emblemEditor" class="dialog stable">
      <svg viewBox="0 0 200 200"><use id="emblemImage"></use></svg>
      <div id="emblemBody">
        <div>
          <b id="emblemArmiger"></b>
        </div>
        <hr />
        <div data-tip="Select state">
          <div class="label">State:</div>
          <select id="emblemStates"></select>
        </div>
        <div data-tip="Select province in state">
          <div class="label">Province:</div>
          <select id="emblemProvinces"></select>
        </div>
        <div data-tip="Select burg in province or state">
          <div class="label">Burg:</div>
          <select id="emblemBurgs"></select>
        </div>
        <hr />
        <div data-tip="Select shape of the emblem">
          <div class="label">Shape:</div>
          <select id="emblemShapeSelector">
            <optgroup label="Basic">
              <option value="heater">Heater</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
            </optgroup>
            <optgroup label="Regional">
              <option value="horsehead">Horsehead</option>
              <option value="horsehead2">Horsehead Edgy</option>
              <option value="polish">Polish</option>
              <option value="hessen">Hessen</option>
              <option value="swiss">Swiss</option>
            </optgroup>
            <optgroup label="Historical">
              <option value="boeotian">Boeotian</option>
              <option value="roman">Roman</option>
              <option value="kite">Kite</option>
              <option value="oldFrench">Old French</option>
              <option value="renaissance">Renaissance</option>
              <option value="baroque">Baroque</option>
            </optgroup>
            <optgroup label="Specific">
              <option value="targe">Targe</option>
              <option value="targe2">Targe2</option>
              <option value="pavise">Pavise</option>
              <option value="wedged">Wedged</option>
            </optgroup>
            <optgroup label="Banner">
              <option value="flag">Flag</option>
              <option value="pennon">Pennon</option>
              <option value="guidon">Guidon</option>
              <option value="banner">Banner</option>
              <option value="dovetail">Dovetail</option>
              <option value="gonfalon">Gonfalon</option>
              <option value="pennant">Pennant</option>
            </optgroup>
            <optgroup label="Simple">
              <option value="round">Round</option>
              <option value="oval">Oval</option>
              <option value="vesicaPiscis">Vesica Piscis</option>
              <option value="square">Square</option>
              <option value="diamond">Diamond</option>
            </optgroup>
            <optgroup label="Fantasy">
              <option value="fantasy1">Fantasy1</option>
              <option value="fantasy2">Fantasy2</option>
              <option value="fantasy3">Fantasy3</option>
              <option value="fantasy4">Fantasy4</option>
              <option value="fantasy5">Fantasy5</option>
            </optgroup>
            <optgroup label="Middle Earth">
              <option value="noldor">Noldor</option>
              <option value="gondor">Gondor</option>
              <option value="easterling">Easterling</option>
              <option value="erebor">Erebor</option>
              <option value="ironHills">Iron Hills</option>
              <option value="urukHai">UrukHai</option>
              <option value="moriaOrc">Moria Orc</option>
            </optgroup>
          </select>
        </div>
        <div
          data-tip="Set size of particular Emblem. To hide set to 0. To change the entire category go to Menu ⭢ Style ⭢ Emblems"
        >
          <div class="label" style="width: 2.8em">Size:</div>
          <input id="emblemSizeSlider" type="range" min="0" max="5" step=".1" style="width: 7em" />
          <input id="emblemSizeNumber" type="number" min="0" max="5" step=".1" />
        </div>
      </div>
      <div id="emblemsBottom">
        <button id="emblemsRegenerate" data-tip="Regenerate emblem" class="icon-shuffle"></button>
        <button
          id="emblemsArmoria"
          data-tip="Edit the emblem in Armoria - dedicated heraldry editor. Download emblem and upload it back map the generator"
          class="icon-brush"
        ></button>
        <button
          id="emblemsDownload"
          data-tip="Set size, select file format and download emblem image"
          class="icon-download"
        ></button>
        <button
          id="emblemsUpload"
          data-tip="Upload png, jpg or svg image from Armoria or other sources as emblem"
          class="icon-upload"
        ></button>
        <button
          id="emblemsGallery"
          data-tip="Download emblems gallery as html document (open in browser; downloading takes some time)"
          class="icon-layer-group"
        ></button>
        <button id="emblemsFocus" data-tip="Show emblem associated area or place" class="icon-target"></button>
      </div>
      <div id="emblemUploadControl" class="hidden">
        <button
          id="emblemsUploadImage"
          data-tip="Upload SVG or PNG image from any source. Make sure background is transparent"
        >
          Any image
        </button>
        <button
          id="emblemsUploadSVG"
          data-tip="Upload prepared SVG image (SVG from Armoria or SVG processed with 'Optimize vector' tool)"
        >
          Prepared SVG
        </button>
        <a
          href="https://www.iloveimg.com/compress-image"
          target="_blank"
          data-tip="Use external tool to compress/resize raster images before upload"
          >Comperess raster</a
        >
        <span> | </span>
        <a
          href="https://jakearchibald.github.io/svgomg"
          target="_blank"
          data-tip="Use external tool to optimize vector images before upload"
          >Optimize vector</a
        >
      </div>
      <div id="emblemDownloadControl" class="hidden">
        <input
          id="emblemsDownloadSize"
          data-tip="Set image size in pixels"
          type="number"
          value="500"
          step="100"
          min="100"
          max="10000"
        />
        <button
          id="emblemsDownloadSVG"
          data-tip="Download as SVG: scalable vector image. Best quality, can be opened in browser or Inkscape"
        >
          SVG
        </button>
        <button id="emblemsDownloadPNG" data-tip="Download as PNG: lossless raster image with transparent background">
          PNG
        </button>
        <button
          id="emblemsDownloadJPG"
          data-tip="Download as JPG: lossy compressed raster image with solid white background"
        >
          JPG
        </button>
      </div>
    </div>`),i(`emblemStates`).oninput=T,i(`emblemProvinces`).oninput=E,i(`emblemBurgs`).oninput=D,i(`emblemShapeSelector`).oninput=O,i(`emblemSizeSlider`).oninput=A,i(`emblemSizeNumber`).oninput=A,i(`emblemsRegenerate`).onclick=j,i(`emblemsArmoria`).onclick=M,i(`emblemsUpload`).onclick=N,i(`emblemsUploadImage`).onclick=()=>i(`emblemImageToLoad`).click(),i(`emblemsUploadSVG`).onclick=()=>i(`emblemSVGToLoad`).click(),i(`emblemImageToLoad`).onchange=()=>P(`image`),i(`emblemSVGToLoad`).onchange=()=>P(`svg`),i(`emblemsDownload`).onclick=F,i(`emblemsDownloadSVG`).onclick=()=>I(`svg`),i(`emblemsDownloadPNG`).onclick=()=>I(`png`),i(`emblemsDownloadJPG`).onclick=()=>I(`jpeg`),i(`emblemsGallery`).onclick=V,i(`emblemsFocus`).onclick=k}function S(e){let t=e.parentNode,n=t.id===`burgEmblems`?`burg`:t.id===`provinceEmblems`?`province`:`state`,r=+e.dataset.i,i=G(n,r);if(!i)throw Error(`Cannot edit ${n} emblem ${r}`);h=n,g=`${h}COA${r}`,_=i}function C(){let e=h,t=_,n=i(`emblemStates`),r=i(`emblemProvinces`),a=i(`emblemBurgs`),o=0,s=0,l=0;n.parentElement.className=e===`state`?`active`:``,r.parentElement.className=e===`province`?`active`:``,a.parentElement.className=e===`burg`?`active`:``,e===`state`?o=t.i:e===`province`?(s=t.i,o=pack.states[t.state].i):(l=t.i,s=pack.cells.province[t.cell]?pack.provinces[pack.cells.province[t.cell]].i:0,o=t.state??0);let u=pack.burgs.filter(e=>e.i&&!e.removed&&e.coa);n.options.length=0,u.filter(e=>!e.state).length&&n.options.add(new Option(pack.states[0].name,`0`,!1,!o)),pack.states.filter(e=>e.i&&!e.removed).forEach(e=>{n.options.add(new Option(e.name,String(e.i),!1,e.i===o))}),r.options.length=0,r.options.add(new Option(``,`0`,!1,!s)),pack.provinces.filter(e=>!e.removed&&e.state===o).forEach(e=>{r.options.add(new Option(e.name,String(e.i),!1,e.i===s))}),a.options.length=0,a.options.add(new Option(``,`0`,!1,!l)),u.filter(e=>s?pack.cells.province[e.cell]===s:e.state===o).forEach(e=>{a.options.add(new Option(e.capital?`👑 ${e.name}`:e.name,String(e.i),!1,e.i===l))}),a.options[0].disabled=!0,c.trigger(g,t.coa),w()}function w(){let e=_;if(!e.coa)return;i(`emblemImage`).setAttribute(`href`,`#${g}`);let t=e.fullName||e.name;h===`burg`&&(t=`Burg of ${t}`),i(`emblemArmiger`).innerText=t??``;let n=i(`emblemShapeSelector`);e.coa.custom?n.disabled=!0:(n.disabled=!1,n.value=e.coa.shield??`heater`);let r=e.coa.size??1;i(`emblemSizeSlider`).value=String(r),i(`emblemSizeNumber`).value=String(r)}function T(){let e=+i(`emblemStates`).value;if(e){if(!K(`state`,e))return}else{let e=pack.burgs.filter(e=>e.i&&!e.removed&&!e.state);if(!e.length||!K(`burg`,e[0].i))return}C()}function E(){let e=+i(`emblemProvinces`).value;if(e){if(!K(`province`,e))return}else if(!K(`state`,+i(`emblemStates`).value))return;C()}function D(){K(`burg`,+i(`emblemBurgs`).value)&&C()}function O(){_.coa.shield=i(`emblemShapeSelector`).value;let e=document.getElementById(g);e&&e.remove(),c.trigger(g,_.coa)}function k(){u(h,_)}function A(e){let t=+e.currentTarget.value;i(`emblemSizeSlider`).value=String(t),i(`emblemSizeNumber`).value=String(t),_.coa.size=t,s(h,_.i)}function j(){let e=_,t;if(h===`province`)t=pack.states[e.state];else if(h===`burg`){let n=pack.cells.province[e.cell];t=n?pack.provinces[n]:pack.states[e.state]}let n=e.coa.shield||m.getShield(e.culture||t?.culture||0,e.state),{size:r,x:a,y:o}=e.coa;e.coa={...m.generate(t?t.coa:null,.3,.1,void 0),shield:n,size:r,x:a,y:o};let l=i(`emblemShapeSelector`);l.disabled=!1,l.value=e.coa.shield??`heater`,c.trigger(g,e.coa),s(h,_.i)}function M(){let e=_.coa&&!_.coa.custom?_.coa:{t1:`sable`},n=`https://azgaar.github.io/Armoria/?coa=${JSON.stringify(e).replaceAll(`#`,`%23`)}&from=FMG`;t(n)}function N(){i(`emblemDownloadControl`).classList.add(`hidden`),i(`emblemUploadControl`).classList.toggle(`hidden`)}function P(e){let t=_,n=i(e===`image`?`emblemImageToLoad`:`emblemSVGToLoad`),r=n.files[0];if(n.value=``,r.size>5e5){d(`File is too big, please optimize file size up to 500kB and re-upload. Recommended size is 200x200 px and up to 100kB`,!0,`error`,5e3);return}let a=new FileReader;a.onload=n=>{let r=n.target.result,a=i(`defs-emblems`),o=r;if(e===`svg`){let e=document.createElement(`html`);e.innerHTML=r,e.querySelectorAll(`*`).forEach(e=>{e.id===`adobe_illustrator_pgf`&&e.remove(),e.getAttributeNames().forEach(t=>{(t.includes(`inkscape`)||t.includes(`sodipodi`))&&e.removeAttribute(t)})});let t=e.querySelector(`svg`);if(!t){d(`The file is not a valid SVG. Please use Armoria or other relevant tools`,!1,`error`);return}let n=new XMLSerializer().serializeToString(t);o=`data:image/svg+xml;base64,${window.btoa(n)}`}let l=`<svg id="${g}" viewBox="0 0 200 200"><image width="200" height="200" href="${o}"/></svg>`;c.remove(g),a.insertAdjacentHTML(`beforeend`,l);let u={custom:!0};t.coa.size!==void 0&&(u.size=t.coa.size),t.coa.x!==void 0&&(u.x=t.coa.x),t.coa.y!==void 0&&(u.y=t.coa.y),t.coa=u,s(h,_.i),i(`emblemShapeSelector`).disabled=!0},e===`image`?a.readAsDataURL(r):a.readAsText(r)}function F(){i(`emblemUploadControl`).classList.add(`hidden`),i(`emblemDownloadControl`).classList.toggle(`hidden`)}async function I(t){let n=document.getElementById(g),r=+i(`emblemsDownloadSize`).value,a=await z(n,r),o=document.createElement(`a`);o.download=`${e(`Emblem ${_.fullName||_.name}`)}.${t}`,t===`svg`?L(a,o):R(t,a,o,r),i(`emblemDownloadControl`).classList.add(`hidden`)}function L(e,t){t.href=e,t.click()}function R(e,t,n,r){let i=document.createElement(`canvas`),a=i.getContext(`2d`);i.width=r,i.height=r;let o=new Image;o.src=t,o.onload=()=>{e===`jpeg`&&(a.fillStyle=`#fff`,a.fillRect(0,0,i.width,i.height)),a.drawImage(o,0,0,i.width,i.height);let t=i.toDataURL(`image/${e}`,.92);n.href=t,n.click(),window.setTimeout(()=>window.URL.revokeObjectURL(t),6e3)}}async function z(e,t){let n=B(e,t),r=new Blob([n],{type:`image/svg+xml;charset=utf-8`}),i=window.URL.createObjectURL(r);return window.setTimeout(()=>window.URL.revokeObjectURL(i),6e3),i}function B(e,t){let n=e.cloneNode(!0);return n.setAttribute(`width`,String(t)),n.setAttribute(`height`,String(t)),new XMLSerializer().serializeToString(n)}async function V(){let t=e(`Emblems Gallery`),r=pack.states.filter(e=>e.i&&!e.removed&&e.coa),i=pack.provinces.filter(e=>e.i&&!e.removed&&e.coa),a=pack.burgs.filter(e=>e.i&&!e.removed&&e.coa);await H(r,i,a);let o=`<a href="javascript:history.back()">Go Back</a>`,s=`<div><h2>States</h2>${r.map(e=>{let t=document.getElementById(`stateCOA${e.i}`);return`<figure id="state_${e.i}"><a href="#provinces_${e.i}"><figcaption>${e.fullName}</figcaption>${B(t,200)}</a></figure>`}).join(``)}</div>`,c=r.map(e=>{let t=i.filter(t=>t.state===e.i),n=t.map(e=>{let t=document.getElementById(`provinceCOA${e.i}`);return`<figure id="province_${e.i}"><a href="#burgs_${e.i}"><figcaption>${e.fullName}</figcaption>${B(t,200)}</a></figure>`}).join(``);return t.length?`<div id="provinces_${e.i}">${o}<h2>${e.fullName} provinces</h2>${n}</div>`:``}).join(``),l=r.map(e=>{let t=a.filter(t=>t.state===e.i),n=i.filter(t=>t.state===e.i).map(e=>{let n=t.filter(t=>pack.cells.province[t.cell]===e.i),r=n.map(e=>{let t=document.getElementById(`burgCOA${e.i}`);return t?`<figure id="burg_${e.i}"><figcaption>${e.name}</figcaption>${B(t,200)}</figure>`:``}).join(``);return n.length?`<div id="burgs_${e.i}">${o}<h2>${e.fullName} burgs</h2>${r}</div>`:``}).join(``),r=t.filter(e=>!pack.cells.province[e.cell]).map(e=>{let t=document.getElementById(`burgCOA${e.i}`);return t?`<figure id="burg_${e.i}"><figcaption>${e.name}</figcaption>${B(t,200)}</figure>`:``}).join(``);return r&&(n+=`<div><h2>${e.fullName} burgs under direct control</h2>${r}</div>`),n}).join(``),u=a.filter(e=>!e.state),d=u.length?`<div><h2>Independent burgs</h2>${u.map(e=>{let t=document.getElementById(`burgCOA${e.i}`);return t?`<figure id="burg_${e.i}"><figcaption>${e.name}</figcaption>${B(t,200)}</figure>`:``}).join(``)}</div>`:``,f=`<!DOCTYPE html>
    <html>
      <head>
        <title>${mapName.value} Emblems Gallery</title>
      </head>
      <style type="text/css">
        body { margin: 0; padding: 1em; font-family: serif; }
        h1, h2 { font-family: "Forum"; }
        div { width: 100%; max-width: 1018px; margin: 0 auto; border-bottom: 1px solid #ddd; }
        figure { margin: 0 0 2em; display: inline-block; transition: 0.2s; }
        figure:hover { background-color: #f6f6f6; }
        figcaption { text-align: center; margin: 0.4em 0; width: 200px; font-family: "Overlock SC"; }
        address { width: 100%; max-width: 1018px; margin: 0 auto; }
        a { color: black; }
        figure > a { text-decoration: none; }
        div > a { float: right; font-family: var(--monospace); margin-top: 0.8em; }
      </style>
      <link href="https://fonts.googleapis.com/css2?family=Forum&family=Overlock+SC" rel="stylesheet" />
      <body>
        <div><h1>${mapName.value} Emblems Gallery</h1></div>
        ${s} ${c} ${l} ${d}
        <address>Generated by <a href="https://azgaar.github.io/Fantasy-Map-Generator" target="_blank">Azgaar's Fantasy Map Generator</a>. The tool is free, but images may be copyrighted, see <a target="_blank" href="https://github.com/Azgaar/Armoria#license">the license</a></address>
      </body>
    </html>`;n(f,`${t}.html`,`text/plain`)}async function H(e,t,n){d(`Preparing for download...`,!0,`warn`);let r=e.map(e=>c.trigger(`stateCOA${e.i}`,e.coa)),i=t.map(e=>c.trigger(`provinceCOA${e.i}`,e.coa)),a=n.map(e=>c.trigger(`burgCOA${e.i}`,e.coa)),o=[...r,...i,...a];await Promise.allSettled(o),f()}function U(e){let t=Number(this.getAttribute(`x`))-e.x,n=Number(this.getAttribute(`y`))-e.y;e.on(`drag`,function(e){this.setAttribute(`x`,String(t+e.x)),this.setAttribute(`y`,String(n+e.y))}),e.on(`end`,function(e){let i=Number(this.parentNode.getAttribute(`font-size`))*Number.parseFloat(this.getAttribute(`width`)||`1`)/2,a=W(this.parentElement?.id),o=Number(this.dataset.i),c=a&&Number.isInteger(o)?G(a,o):void 0;a&&c&&(c.coa.x=r(t+e.x+i,2),c.coa.y=r(n+e.y+i,2),s(a,o))})}function W(e){if(e===`burgEmblems`)return`burg`;if(e===`provinceEmblems`)return`province`;if(e===`stateEmblems`)return`state`}function G(e,t){let n=e===`burg`?pack.burgs[t]:e===`province`?pack.provinces[t]:pack.states[t];return n?.coa?n:void 0}function K(e,t){let n=G(e,t);return n?(h=e,g=`${e}COA${t}`,_=n,!0):!1}function q(){a(`#emblems`).selectAll(`use`).call(l().on(`drag`,U)).classed(`draggable`,!0)}function J(){v?.(),v=void 0,a(`#emblems`).selectAll(`use`).on(`.drag`,null).attr(`class`,null),$(`#emblemEditor`).dialog(`destroy`),i(`emblemEditor`).remove()}var Y={open:b,openDefault:y};export{Y as EmblemsEditor};