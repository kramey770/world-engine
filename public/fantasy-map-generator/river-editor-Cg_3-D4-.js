import{A as e,Et as t,G as n,M as r,X as i,bt as a,dn as o,k as s}from"./utils-BXw8fBj4.js";import{t as c}from"./layers-_nptVsMl.js";import{t as l}from"./drag-BxIG-06a.js";import{r as u,t as d}from"./tooltips-0xeyl30m.js";import{r as f,t as p}from"./dialog-helpers-DT2MP2B1.js";import{P as m}from"./index-CHSGsxIV.js";var h,g=!1;function _(t){if(customization||e(`riverEditor`)&&t===h.attr(`id`))return;p(`.stable`),c.show(`rivers`),g=!c.isOn(`cells`),c.show(`cells`),h=o(`#${t}`).on(`click`,k),u(`Drag control points to change the river course. Click on point to remove it. Click on river to add additional control point. For major changes please create a new river instead`,!0),o(`#debug`).append(`g`).attr(`id`,`controlCells`),o(`#debug`).append(`g`).attr(`id`,`controlPoints`),v(),S();let{cells:n,points:r}=x();T(Rivers.getRiverPoints(n,r??null)),E(n),$(`#riverEditor`).dialog({title:`Edit River`,resizable:!1,position:{my:`left top`,at:`left+10 top+10`,of:`#map`},close:V})}function v(){f(`riverEditor`),s(`dialogs`).insertAdjacentHTML(`beforeend`,`<div id="riverEditor" class="dialog">
    <div id="riverBody" style="padding-bottom: 0.3em">
      <div>
        <div class="label" style="width: 4.8em">Name:</div>
        <span id="riverNameCulture" data-tip="Generate culture-specific name for the river" class="icon-book pointer"></span>
        <span id="riverNameRandom" data-tip="Generate random name for the river" class="icon-globe pointer"></span>
        <input id="riverName" data-tip="Type to rename the river" autocorrect="off" spellcheck="false" />
        <span id="riverNameSpeak" data-tip="Speak the name. You can change voice and language in options" class="speaker">🔊</span>
      </div>
      <div data-tip="Type to change river type (e.g. fork, creek, river, brook, stream)">
        <div class="label">Type:</div>
        <input id="riverType" autocorrect="off" spellcheck="false" />
      </div>
      <div data-tip="Select parent river">
        <div class="label">Mainstem:</div>
        <select id="riverMainstem"></select>
      </div>
      <div data-tip="River drainage basin (watershed)">
        <div class="label">Basin:</div>
        <input id="riverBasin" disabled />
      </div>
      <div data-tip="River discharge (flux power)">
        <div class="label">Discharge:</div>
        <input id="riverDischarge" disabled />
      </div>
      <div data-tip="River length in selected units">
        <div class="label">Length:</div>
        <input id="riverLength" disabled />
      </div>
      <div data-tip="River mouth width in selected units">
        <div class="label">Mouth width:</div>
        <input id="riverWidth" disabled />
      </div>
      <div data-tip="River source additional width. Default value is 0">
        <div class="label">Source width:</div>
        <input id="riverSourceWidth" type="number" min="0" max="3" step=".01" />
      </div>
      <div data-tip="River width multiplier. Default value is 1">
        <div class="label">Width modifier:</div>
        <input id="riverWidthFactor" type="number" min=".1" max="4" step=".1" />
      </div>
    </div>
    <div id="riverBottom">
      <button id="riverCreateSelectingCells" data-tip="Create a new river selecting river cells" class="icon-map-pin"></button>
      <button id="riverEditStyle" data-tip="Edit style for all rivers in Style Editor" class="icon-brush"></button>
      <button id="riverElevationProfile" data-tip="Show the elevation profile for the river" class="icon-chart-area"></button>
      <button id="riverLegend" data-tip="Edit free text notes (legend) for the river" class="icon-edit"></button>
      <button id="riverRemove" data-tip="Remove river" data-shortcut="Delete" class="icon-trash fastDelete"></button>
    </div>
  </div>`),s(`riverCreateSelectingCells`).addEventListener(`click`,y),s(`riverEditStyle`).addEventListener(`click`,b),s(`riverElevationProfile`).addEventListener(`click`,R),s(`riverLegend`).addEventListener(`click`,z),s(`riverRemove`).addEventListener(`click`,B),s(`riverName`).addEventListener(`input`,j),s(`riverNameSpeak`).addEventListener(`click`,()=>i(s(`riverName`).value)),s(`riverType`).addEventListener(`input`,M),s(`riverNameCulture`).addEventListener(`click`,N),s(`riverNameRandom`).addEventListener(`click`,P),s(`riverMainstem`).addEventListener(`change`,F),s(`riverSourceWidth`).addEventListener(`input`,I),s(`riverWidthFactor`).addEventListener(`input`,L)}function y(){m.RiverCreator.open()}function b(){editStyle(`rivers`)}function x(){let e=+h.attr(`id`).slice(5);return pack.rivers.find(t=>t.i===e)}function S(){let e=x();s(`riverName`).value=e.name,s(`riverType`).value=e.type;let t=s(`riverMainstem`);t.options.length=0;let n=e.parent||e.i;pack.rivers.slice().sort((e,t)=>e.name>t.name?1:-1).forEach(e=>{let r=new Option(e.name,String(e.i),!1,e.i===n);t.options.add(r)}),s(`riverBasin`).value=pack.rivers.find(t=>t.i===e.basin).name,s(`riverDischarge`).value=`${e.discharge} m³/s`,s(`riverSourceWidth`).value=String(e.sourceWidth),s(`riverWidthFactor`).value=String(e.widthFactor),C(e),w(e)}function C(e){e.length=t(h.node().getTotalLength()/2,2);let n=`${t(e.length*distanceScale)} ${distanceUnitInput.value}`;s(`riverLength`).value=n}function w(e){let{cells:n,discharge:r,widthFactor:i,sourceWidth:a}=e,o=Rivers.addMeandering(n);e.width=Rivers.getWidth(Rivers.getOffset({flux:r,pointIndex:o.length,widthFactor:i,startingWidth:a}));let c=`${t(e.width*distanceScale,3)} ${distanceUnitInput.value}`;s(`riverWidth`).value=c}function T(e){o(`#controlPoints`).selectAll(`circle`).data(e).join(`circle`).attr(`cx`,e=>e[0]).attr(`cy`,e=>e[1]).attr(`r`,.6).call(l().on(`start`,D)).on(`click`,A)}function E(e){let t=[...new Set(e)].filter(e=>pack.cells.i[e]);o(`#controlCells`).selectAll(`polygon`).data(t).join(`polygon`).attr(`points`,e=>String(Pack.getPolygon(e)))}function D(e){let{r:n,fl:r}=pack.cells,i=x(),{x:a,y:o}=e,s=Pack.findCell(a,o),c=null;e.on(`drag`,function(e){let{x:n,y:r}=e,a=Pack.findCell(n,r);c=s===a?null:a,this.setAttribute(`cx`,n),this.setAttribute(`cy`,r),this.__data__=[t(n,1),t(r,1)],O(),E(i.cells)}),e.on(`end`,()=>{if(c&&!n[c]){n[s]=0,n[c]=i.i;let e=r[s];r[s]=r[c],r[c]=e,O()}})}function O(){let t=x();t.points=o(`#controlPoints`).selectAll(`*`).data(),t.cells=t.points.map(([e,t])=>Pack.findCell(e,t));let n=Rivers.addMeandering(t.cells,t.points),r=Rivers.getRiverPath(n,t.widthFactor,t.sourceWidth);h.attr(`d`,r),C(t),c.draw(`labels`),e(`elevationProfile`)&&R()}function k(e){let[i,a]=r(e,this),s=[t(i,1),t(a,1)],c=x();c.points||=o(`#controlPoints`).selectAll(`*`).data();let l=n(c.points,s,2);c.points.splice(l,0,s),T(c.points),O()}function A(){this.remove(),O();let{cells:e}=x();E(e)}function j(){x().name=this.value}function M(){x().type=this.value}function N(){let e=x();e.name=s(`riverName`).value=Rivers.getName(e.mouth)}function P(){let e=x();e&&(e.name=s(`riverName`).value=Names.getBase(a(Names.nameBases.length-1)))}function F(){let e=x();e.parent=+this.value,e.basin=pack.rivers.find(t=>t.i===e.parent).basin,s(`riverBasin`).value=pack.rivers.find(t=>t.i===e.basin).name}function I(){let e=x();e.sourceWidth=+this.value,w(e),O()}function L(){let e=x();e.widthFactor=+this.value,w(e),O()}function R(){let e=o(`#controlPoints`).selectAll(`*`).data().map(([e,t])=>Pack.findCell(e,t)),n=x(),r=t(n.length*distanceScale);m.ElevationProfile.open(e,r,!0)}function z(){let e=h.attr(`id`),t=x();m.NotesEditor.open(e,`${t.name} ${t.type}`)}function B(){alertMessage.innerHTML=`Are you sure you want to remove the river and all its tributaries`,$(`#alert`).dialog({resizable:!1,width:`22em`,title:`Remove river and tributaries`,buttons:{Remove:function(){$(this).dialog(`close`);let e=+h.attr(`id`).slice(5);Rivers.remove(e),h.remove(),c.draw(`labels`),$(`#riverEditor`).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}}})}function V(){o(`#controlPoints`).remove(),o(`#controlCells`).remove(),h.on(`click`,null),d(),g&&c.hide(`cells`),g=!1,f(`riverEditor`)}var H={open:_};export{H as RiverEditor};