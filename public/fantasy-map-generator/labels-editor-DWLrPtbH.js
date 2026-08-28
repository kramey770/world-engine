import{F as e,M as t,X as n,jt as r,k as i,un as a}from"./utils-D3KEhgY0.js";import{n as o,r as s}from"./tooltips-D1wvMKni.js";import{H as c,J as l,Kt as u,Nt as ee,Q as d,U as f,W as p,at as m,q as te,rt as h,st as ne}from"./index-D3JPylQY.js";import{t as g}from"./label-arc-DFc6hYjR.js";var _=``,v;function y(e,t){if(customization)return;c(`.stable`),d.show(`labels`);let n=document.querySelector(`#labels text[data-label-type='${e}'][data-id='${t}']`);if(!n)return;let r=h(e,t);r&&(v={...r},Q(n.id),a(`#viewbox`).on(`touchmove mousemove`,D),b(),$(`#labelEditor`).dialog({title:`Edit Label`,resizable:!1,width:`fit-content`,position:{my:`center top+10`,at:`bottom`,of:n,collision:`fit`},close:de}),O(),x(v.group),w(),S())}function b(){p(`labelEditor`),i(`dialogs`).insertAdjacentHTML(`beforeend`,`<div id="labelEditor" class="dialog">
      <button id="labelGroupShow" data-tip="Show the group selection" class="icon-tags"></button>
      <div id="labelGroupSection" style="display: none">
        <button id="labelGroupHide" data-tip="Hide the group selection" class="icon-tags"></button>
        <select id="labelGroupSelect" data-tip="Select a group for this label" style="width: 10em"></select>
        <button
          id="labelGroupsConfigure"
          data-tip="Open the Label Groups Configurator to create, edit and reorder groups"
          class="icon-cog"
        ></button>
      </div>
      <button id="labelTextShow" data-tip="Show the edit label text section" class="icon-pencil"></button>
      <div id="labelTextSection" style="display: none">
        <button id="labelTextHide" data-tip="Hide the edit label text section" class="icon-pencil"></button>
        <input
          id="labelText"
          data-tip='Type to change the label. Enter "|" to move to a new line'
          style="width: 12em"
        />
        <span id="labelTextSpeak" data-tip="Speak the name. You can change voice and language in options" class="speaker">🔊</span>
        <span id="labelTextRandom" data-tip="Generate random name" class="icon-shuffle pointer"></span>
      </div>
      <button id="labelEditStyle" data-tip="Edit label group style in Style Editor" class="icon-brush"></button>
      <button id="labelPathToggle"></button>
      <button id="labelSizeShow" data-tip="Show the font size section" class="icon-text-height"></button>
      <div id="labelSizeSection" style="display: none">
        <button id="labelSizeHide" data-tip="Hide the font size section" class="icon-text-height"></button>
        <span data-tip="Set relative size for the particular label">Size:</span>
        <input
          id="labelRelativeSize"
          data-tip="Set relative size for the particular label (% of group default)"
          type="number"
          min="30"
          max="300"
          step="1"
          style="width: 4.5em"
        />
      </div>
      <button id="labelOffsetShow" data-tip="Show the label offset section" class="icon-sliders"></button>
      <div id="labelOffsetSection" style="display: none">
        <button id="labelOffsetHide" data-tip="Hide the label offset section" class="icon-sliders"></button>
        <span data-tip="Set starting offset for the particular label">Offset:</span>
        <input
          id="labelStartOffset"
          data-tip="Set starting offset for the particular label (% along the path)"
          type="range"
          min="20"
          max="80"
          style="width: 8em"
        />
        <input
          id="labelStartOffsetValue"
          type="number"
          min="20"
          max="80"
          step="1"
          style="width: 3.5em"
          data-tip="Set starting offset numerically"
        />
      </div>
      <button id="labelLetterSpacingShow" data-tip="Show the letter spacing section" class="icon-text-width"></button>
      <div id="labelLetterSpacingSection" style="display: none">
        <button
          id="labelLetterSpacingHide"
          data-tip="Hide the letter spacing section"
          class="icon-text-width"
        ></button>
        <slider-input
          id="labelLetterSpacingSize"
          style="display: inline-block"
          data-tip="Set the letter spacing size for this label"
          min="0"
          max="20"
          step=".01"
          value="0"
        ></slider-input>
      </div>
      <button id="labelVisibility"></button>
      <button id="labelLegend" data-tip="Edit free text notes (legend) for this label" class="icon-edit"></button>
      <button id="labelReset" data-tip="Restore the default label" class="icon-arrows-cw"></button>
      <button
        id="labelRemoveSingle"
        data-tip="Remove the label"
        data-shortcut="Delete"
        class="icon-trash fastDelete"
      ></button>
    </div>`),i(`labelGroupShow`).addEventListener(`click`,F),i(`labelGroupHide`).addEventListener(`click`,I),i(`labelGroupSelect`).addEventListener(`change`,L),i(`labelGroupsConfigure`).addEventListener(`click`,()=>void l.LabelGroupsConfigurator.open()),i(`labelTextShow`).addEventListener(`click`,R),i(`labelTextHide`).addEventListener(`click`,z),i(`labelText`).addEventListener(`input`,B),i(`labelTextSpeak`).addEventListener(`click`,()=>n(i(`labelText`).value)),i(`labelTextRandom`).addEventListener(`click`,re),i(`labelEditStyle`).addEventListener(`click`,H),i(`labelSizeShow`).addEventListener(`click`,U),i(`labelSizeHide`).addEventListener(`click`,W),i(`labelOffsetShow`).addEventListener(`click`,G),i(`labelOffsetHide`).addEventListener(`click`,K),i(`labelStartOffset`).addEventListener(`input`,Y),i(`labelStartOffsetValue`).addEventListener(`input`,ie),i(`labelRelativeSize`).addEventListener(`input`,ae),i(`labelLetterSpacingShow`).addEventListener(`click`,q),i(`labelLetterSpacingHide`).addEventListener(`click`,J),i(`labelLetterSpacingSize`).addEventListener(`input`,oe),i(`labelPathToggle`).addEventListener(`click`,se),i(`labelVisibility`).addEventListener(`click`,ce),i(`labelLegend`).addEventListener(`click`,le),i(`labelReset`).addEventListener(`click`,ue),i(`labelRemoveSingle`).addEventListener(`click`,X)}function x(e){_=e,I();let t=i(`labelGroupSelect`);t.options.length=0;for(let n of options.labels.groups)t.options.add(new Option(n.name,n.name,!1,n.name===e))}function S(){let e=C(),t=!i(`labelEditor`).classList.contains(`section-open`);i(`labelOffsetShow`).style.display=t&&e?`inline-block`:`none`,i(`labelRemoveSingle`).style.display=t&&v.type===`added`?`inline-block`:`none`,i(`labelReset`).style.display=t&&Labels.hasOverride(v.type,v.entityId)?`inline-block`:`none`;let n=i(`labelPathToggle`);n.className=e?`icon-resize-horizontal`:`icon-bezier-curve`,n.dataset.tip=e?`Remove the label path, render the label as a straight text`:`Curve the label along a path`;let r=i(`labelVisibility`);r.className=v.hidden?`icon-eye-off`:`icon-eye`,r.dataset.tip=v.hidden?`Show the label`:`Hide the label. You can toggle it on later in Labels Overview`}function C(){return!!v.pathPoints?.length}function w(){let e=v.startOffset||50;i(`labelText`).value=v.text||``,i(`labelStartOffset`).value=String(e),i(`labelStartOffsetValue`).value=String(e),i(`labelRelativeSize`).value=String(v.fontSize??100),i(`labelLetterSpacingSize`).value=String(v.letterSpacing??0)}function T(){i(`labelEditor`).classList.add(`section-open`),document.querySelectorAll(`#labelEditor > button`).forEach(e=>{e.style.display=`none`})}function E(){i(`labelEditor`).classList.remove(`section-open`),document.querySelectorAll(`#labelEditor > button`).forEach(e=>{e.style.display=`inline-block`}),S()}function D(e){o();let t=e.target,n=t.parentNode;t.closest(`#${v.id}`)?s(`Drag to move the label`):n?.id===`controlPoints`&&(t.tagName===`circle`&&s(`Drag to move, click to delete the control point`),t.tagName===`path`&&s(`Click to add a control point`))}function O(){if(a(`#debug`).select(`#controlPoints`).remove(),!C())return;let e=v.dx||v.dy?`translate(${v.dx||0}, ${v.dy||0})`:null;a(`#debug`).append(`g`).attr(`id`,`controlPoints`).attr(`transform`,e).append(`path`).attr(`d`,ne(v)).style(`stroke-width`,Math.max(2.2/scale,.2)).on(`click`,N),v.pathPoints?.forEach(k)}function k(e){a(`#debug`).select(`#controlPoints`).append(`circle`).attr(`cx`,e[0]).attr(`cy`,e[1]).attr(`r`,Math.max(3/scale,.35)).style(`stroke-width`,Math.max(1/scale,.15)).call(u().on(`drag`,A)).on(`click`,M)}function A(e){this.setAttribute(`cx`,e.x),this.setAttribute(`cy`,e.y),j()}function j(){let t=[];a(`#debug > #controlPoints`).selectAll(`circle`).each(function(){let e=rn(+this.getAttribute(`cx`),2),n=rn(+this.getAttribute(`cy`),2);t.push([e,n])});let n=e(r().curve(ee)(t)||``);a(`#debug`).select(`#controlPoints > path`).attr(`d`,n),v.pathPoints=t,Z(),t.length||O()}function M(){this.remove(),j()}function N(e){let n=t(e,this),r=[];a(`#debug #controlPoints`).selectAll(`circle`).each(function(){let e=+this.getAttribute(`cx`),t=+this.getAttribute(`cy`);r.push((n[0]-e)**2+(n[1]-t)**2)});let i=r.length;if(r.length>1){let e=r.slice(0).sort((e,t)=>e-t),t=r.indexOf(e[0]),n=r.indexOf(e[1]);i=t<=n?t+1:n+1}let o=`:nth-child(${i+2})`;a(`#debug`).select(`#controlPoints`).insert(`circle`,o).attr(`cx`,n[0]).attr(`cy`,n[1]).attr(`r`,2.5).attr(`stroke-width`,.8).call(u().on(`drag`,A)).on(`click`,M),j()}function P(e){let t=(v.dx||0)-e.x,n=(v.dy||0)-e.y;e.on(`drag`,e=>{v.dx=rn(t+e.x,2),v.dy=rn(n+e.y,2);let r=`translate(${v.dx}, ${v.dy})`;this.setAttribute(`transform`,r),a(`#debug #controlPoints`).attr(`transform`,r)}),e.on(`end`,()=>Z())}function F(){T(),i(`labelGroupSection`).style.display=`inline-block`}function I(){E(),i(`labelGroupSection`).style.display=`none`}function L(){let e=this.value,t=options.labels.groups.find(t=>t.name===e)?.type,n=()=>{_=e,v.group=e,Z()};if(t===v.type)return void n();f({title:`Assign cross-type Label Group`,message:`Assign this ${v.type} label to the ${t} group "${e}"? It's better to avoid such cross-type assignment.`,confirm:`Assign`,onConfirm:n,onCancel:()=>{this.value=v.group}})}function R(){T(),i(`labelTextSection`).style.display=`inline-block`}function z(){E(),i(`labelTextSection`).style.display=`none`}function B(){let e=i(`labelText`).value;v.text=e,Z(),v.type===`state`&&s(`Use States Editor to change the actual state name, not just a label`,!1,`warn`),v.type===`province`&&s(`Use Provinces Editor to change the actual province name, not just a label`,!1,`warn`)}var V={burg:e=>Names.getCulture(pack.burgs[e.entityId].culture??0),state:e=>{let t=pack.states[e.entityId].culture;return Names.getState(Names.getCulture(t,4,7,``),t)},province:e=>{let t=pack.provinces[e.entityId];return Names.getState(t.name,pack.cells.culture[t.center])},added:e=>{let t=Pack.findCell(...e.anchor);return t?Names.getCulture(pack.cells.culture[t]):``},river:e=>{let t=Pack.findCell(...e.anchor);return t?Rivers.getName(t):``},route:e=>{let t=pack.routes.find(t=>t.i===e.entityId)?.points??[];return Routes.generateName({group:e.group,points:t})||`Unnamed route segment`}};function re(){i(`labelText`).value=V[v.type](v),B()}function H(){editStyle(`labels`,v.group)}function U(){T(),i(`labelSizeSection`).style.display=`inline-block`}function W(){E(),i(`labelSizeSection`).style.display=`none`}function G(){T(),i(`labelOffsetSection`).style.display=`inline-block`}function K(){E(),i(`labelOffsetSection`).style.display=`none`}function q(){T(),i(`labelLetterSpacingSection`).style.display=`inline-block`}function J(){E(),i(`labelLetterSpacingSection`).style.display=`none`}function Y(){if(!C())return;let e=this.value;i(`labelStartOffsetValue`).value=e,v.startOffset=+e,Z(),s(`Label offset: ${e}%`)}function ie(){if(!C())return;let e=Math.min(80,Math.max(20,+this.value));i(`labelStartOffset`).value=String(e),this.value=String(e),v.startOffset=e,Z(),s(`Label offset: ${e}%`)}function ae(){v.fontSize=+this.value,Z(),s(`Label relative size: ${this.value}%`)}function oe(){v.letterSpacing=+this.value,Z(),s(`Label letter-spacing size: ${this.value}px`)}function se(){v.pathPoints=C()?[]:g(v),Z(),O()}function ce(){v.hidden?delete v.hidden:v.hidden=!0,Z()}function le(){let e=v.type===`burg`?`burg${v.entityId}`:v.id;l.NotesEditor.open(e,v.text)}function X(){alertMessage.innerHTML=`Are you sure you want to remove the label?`,$(`#alert`).dialog({resizable:!1,title:`Remove label`,buttons:{Remove:function(){$(this).dialog(`close`),v.type===`added`&&(AddedLabels.remove(v.entityId),d.draw(`labels`),$(`#labelEditor`).dialog(`close`))},Cancel:function(){$(this).dialog(`close`)}}})}function Z(){let e=Labels.getEntity(v.type,v.entityId);e&&(e.label=fe(),m(v),Q(v.id),S())}function Q(e){a(`#${e}`).call(u().on(`start`,P)).classed(`draggable`,!0)}function ue(){let{type:e,entityId:t}=v;Labels.resetOverride(e,t),d.draw(`labels`),v={...h(e,t)??v},Q(v.id),x(v.group),w(),S(),O()}function de(){a(`#debug`).select(`#controlPoints`).remove(),a(`#${v.id}`).on(`.drag`,null).classed(`draggable`,!1),te(),$(`#labelEditor`).dialog(`destroy`),i(`labelEditor`).remove()}function fe(){return{text:v.text,group:v.group,dx:v.dx,dy:v.dy,fontSize:v.fontSize,letterSpacing:v.letterSpacing,pathPoints:v.pathPoints??[],startOffset:v.startOffset,hidden:v.hidden}}var pe={open:y,getLastSelectedGroup:()=>_};export{pe as LabelsEditor};