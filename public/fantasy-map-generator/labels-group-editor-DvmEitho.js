import{k as e}from"./utils-D3KEhgY0.js";import{r as t}from"./tooltips-D1wvMKni.js";import{H as n,J as r,Q as i,T as a,U as o,W as s,ct as c,m as l,ut as u}from"./index-D3JPylQY.js";function d(){customization||(n(`.stable`),f(),p(),$(`#labelGroupsConfigurator`).dialog({title:`Configure Label Groups`,resizable:!1,maxHeight:Math.max(window.innerHeight-40,300),position:{my:`right top`,at:`right-10 top+10`,of:`svg`,collision:`fit`},close:E,buttons:{Apply:()=>{e(`labelGroupsForm`).requestSubmit()},Add:()=>{e(`labelGroupsBody`).insertAdjacentHTML(`beforeend`,g({name:``,type:`state`,zoom:{min:null,max:null}},!0,0))},Restore:()=>{let t=Labels.getDefaultOptions();e(`labelsResizeOnZoom`).checked=t.resizeOnZoom,e(`labelsShowAll`).checked=t.showAll,p(t.groups)},Cancel:function(){$(this).dialog(`close`)}}}))}function f(){s(`labelGroupsConfigurator`);let t=`<div id="labelGroupsConfigurator" class="dialog stable">
    <form id="labelGroupsForm">
      <table class="table" style="white-space:nowrap; overflow-x:auto; max-width:100%">
        <colgroup>
          <col style="width:2.5em">
          <col style="width:8em">
          <col style="width:5.5em">
          <col style="width:4em">
          <col style="width:3.5em">
          <col style="width:3.5em">
          <col style="width:8.5em">
          <col style="width:3.5em">
          <col style="width:3.2em">
          <col style="width:3.2em">
        </colgroup>
        <thead>
          <tr>
            <th data-tip="Activate/deactivate group. Deactivated group labels are not visible">Active</th>
            <th data-tip="Group name. Must start with a letter or underscore, followed by letters, digits, underscores, or dashes">Group</th>
            <th data-tip="Label type, cannot be changed after creation">Type</th>
            <th data-tip="Name display mode. Only applicable to States and Provinces">Mode</th>
            <th data-tip="Minimum zoom level to show the group">Zoom min</th>
            <th data-tip="Maximum zoom level to show the group">Zoom max</th>
            <th data-tip="Layer that must be toggled on for this group to be shown">Layer dependency</th>
            <th data-tip="Number of labels currently assigned to this group. Click the list icon to see them">Labels</th>
            <th data-tip="Rendering order: lower groups are rendered on top">Order</th>
            <th data-tip="Edit style or remove group">Actions</th>
          </tr>
        </thead>
        <tbody id="labelGroupsBody"></tbody>
      </table>
      <div id="labelGroupsMissingWrapper" style="display:none; gap:.4em; align-items:center; margin:.6em 0 0">
        <label data-tip="Groups referenced by labels but not defined here. Such labels are not rendered until they are reassigned to an existing group"><strong>Missing groups:</strong> <span id="labelGroupsMissing"></span></label>
      </div>
      <div style="display:flex; gap:1.2em; align-items:center; margin:.6em 0 0">
        <label data-tip="Automatically scale label font size as you zoom in or out"><input id="labelsResizeOnZoom" class="checkbox" type="checkbox" ${options.labels.resizeOnZoom?`checked`:``}><span class="checkbox-label">Resize labels on zoom</span></label>
        <label data-tip="Ignore zoom bounds and show all labels regardless of the current zoom level"><input id="labelsShowAll" class="checkbox" type="checkbox" ${options.labels.showAll?`checked`:``}><span class="checkbox-label">Show all labels <small>[slow]</small></span></label>
        <div style="padding: 0.5em 0; font-style: italic;">To change Burg Groups open <a id="labelGroupsBurgGroupsLink" style="text-decoration: underline;">Burg Group Configurator</a>.</div>
      </div>
    </form>
  </div>`;e(`dialogs`).insertAdjacentHTML(`beforeend`,t);let n=e(`labelGroupsForm`);n.addEventListener(`change`,S),n.addEventListener(`submit`,C),e(`labelGroupsBody`).addEventListener(`click`,y),e(`labelGroupsBody`).addEventListener(`change`,_),e(`labelGroupsBurgGroupsLink`).addEventListener(`click`,()=>r.BurgGroupEditor.open()),e(`labelGroupsMissing`).addEventListener(`click`,v)}function p(t=options.labels.groups){let n=h();e(`labelGroupsBody`).innerHTML=t.map(e=>g(e,!1,n.get(e.name)??0)).join(``),m(n,t)}function m(t,n){let r=new Set(n.map(({name:e})=>e)),i=[...t.entries()].filter(([e])=>!r.has(e)).sort();e(`labelGroupsMissingWrapper`).style.display=i.length?`flex`:`none`,e(`labelGroupsMissing`).innerHTML=i.map(([e,t])=>`${e} (${t})
        <button type="button" name="missing" data-group="${e}" class="icon-list-bullet"
          data-tip="Show labels of the ${e} group in Labels Overview to reassign them"></button>`).join(`, `)}function h(){let e=new Map,t=t=>e.set(t,(e.get(t)??0)+1);return c().forEach(e=>void t(e.group)),e}function g(e,t=!1,n=0){let r=[`auto`,`short`,`full`],i=!!e.isDefault,o=i?`Default group for this type, can't be renamed`:`Group name. Must start with a letter or underscore, followed by letters, digits, underscores, or dashes`,s=x(e.type),c=s?`Name display mode: auto picks the best fit, short/full force a specific name form`:`Name display mode is only applicable to States and Provinces`,u=[...a.keys()].sort();return`<tr data-group="${t?``:e.name}" data-is-default="${i?`1`:``}">
      <td data-tip="Activate/deactivate group"><input type="checkbox" name="active" class="native" ${e.active===!1?``:`checked`}></td>
      <td data-tip="${o}"><input type="text" name="name" value="${e.name}" ${i?`disabled`:`required`}></td>
      <td data-tip="Label type, fixed after creation"><select name="type" ${t?``:`disabled`}>
        ${l.map(t=>`<option value="${t}" ${e.type===t?`selected`:``}>${t}</option>`).join(``)}
      </select></td>
      <td data-tip="${c}"><select name="mode" ${s?``:`disabled`}>
        ${r.map(t=>`<option value="${t}" ${(e.mode||`auto`)===t?`selected`:``}>${t}</option>`).join(``)}
      </select></td>
      <td data-tip="Minimum zoom to show the group, leave empty for no limit"><input type="number" name="zoom-min" min="0.01" max="200" step=".01" value="${e.zoom.min??``}"></td>
      <td data-tip="Maximum zoom to show the group, leave empty for no limit"><input type="number" name="zoom-max" min="0.01" max="200" step=".01" value="${e.zoom.max??``}"></td>
      <td data-tip="Layer that must be toggled on for this group to be shown"><select name="dependency">
        <option value="">none</option>
        ${u.map(t=>`<option value="${t}" ${e.layerDependency===t?`selected`:``}>${t}</option>`).join(``)}
      </select></td>
      <td data-tip="Number of labels currently assigned to this group" style="text-align:center">
        <div style="min-width:2em; display:inline-block">${n}</div>
        <button type="button" name="list" class="icon-list-bullet" data-tip="Show labels of this group in Labels Overview"></button>
      </td>
      <td data-tip="Assignment order: move group up or down"><button type="button" name="up" class="icon-up-open" data-tip="Move up"></button><button type="button" name="down" class="icon-down-open" data-tip="Move down"></button></td>
      <td><button type="button" name="style" class="icon-brush" data-tip="Edit visual style"></button><span data-tip="${i?`Default groups can't be removed`:`Remove group`}"><button type="button" name="remove" class="icon-trash-empty" ${i?`disabled`:``}></button></span></td>
    </tr>`}function _(e){let t=e.target;if(!(t instanceof HTMLSelectElement)||t.name!==`type`)return;let n=t.closest(`tr`)?.querySelector(`[name="mode"]`);if(!n)return;let r=x(t.value);n.disabled=!r,r||(n.value=`auto`)}function v(e){let t=e.target.closest(`button[name='missing']`);t?.dataset.group&&r.LabelsOverview.open(t.dataset.group)}function y(e){let t=e.target.closest(`button[name]`);if(!t||t.disabled)return;let n=t.closest(`tr`);if(n){if(t.name===`up`){let e=n.previousElementSibling;e&&n.parentNode.insertBefore(n,e);return}if(t.name===`down`){let e=n.nextElementSibling;e&&n.parentNode.insertBefore(e,n);return}if(t.name===`style`){let e=n.querySelector(`[name="name"]`).value.trim();e&&editStyle(`labels`,e);return}if(t.name===`list`){let e=n.dataset.group;e&&r.LabelsOverview.open(e);return}t.name===`remove`&&b(n)}}function b(n){if(e(`labelGroupsBody`).children.length<2){t(`At least one group should be defined`,!1,`error`);return}o({title:`Remove Label Group`,message:`Remove the group? This won't affect labels unless the changes are applied.`,confirm:`Remove`,onConfirm:()=>{n.remove(),S()}})}function x(e){return[`state`,`province`].includes(e)}function S(){let t=e(`labelGroupsForm`),n=Array.from(t.querySelectorAll(`input[name="name"]`)),r=n.map(e=>e.value.trim());n.forEach(e=>{if(e.disabled){e.setCustomValidity(``);return}let t=``,n=e.value.trim(),i=/^[\p{L}_][\p{L}\p{N}_-]*$/u.test(n),a=r.filter(e=>e===n).length===1;i||(t=`Group name must start with a letter or underscore and not contain special characters`),a||(t=`Group name should be unique`),e.setCustomValidity(t)});let i=t.checkValidity();return i||t.reportValidity(),i}function C(n){if(n.preventDefault(),!S())return;let r=Array.from(e(`labelGroupsBody`).children);if(!r.length)return void t(`At least one group should be defined`,!1,`error`);let a=new Set;r.forEach(e=>{let t=e.dataset.group,n=w(e);a.add(n.name),n.name!==t&&(t?(T(t,n.name),style.labels.groups[n.name]=style.labels.groups[t],delete style.labels.groups[t]):style.labels.groups[n.name]=u(n))}),options.labels.groups.forEach(e=>{if(a.has(e.name))return;let t=Labels.getFallbackGroup(e.type);T(e.name,t.name),delete style.labels.groups[e.name]}),options.labels.groups=r.map(w),options.labels.resizeOnZoom=e(`labelsResizeOnZoom`).checked,options.labels.showAll=e(`labelsShowAll`).checked;for(let e of options.labels.groups)style.labels.groups[e.name]??=u(e);localStorage.setItem(`options-labels`,JSON.stringify(options.labels)),i.draw(`labels`),$(`#labelGroupsConfigurator`).dialog(`close`)}function w(e){let t=e.querySelector(`[name="name"]`).value.trim(),n=e.querySelector(`[name="type"]`).value,r=e.querySelector(`[name="active"]`).checked,a=e.querySelector(`[name="mode"]`).value,o=e.querySelector(`[name="zoom-min"]`),s=e.querySelector(`[name="zoom-max"]`),c=e.querySelector(`[name="dependency"]`).value.trim(),l={name:t,type:n,zoom:{min:o.value===``?null:o.valueAsNumber,max:s.value===``?null:s.valueAsNumber}};return r||(l.active=!1),a!==`auto`&&(l.mode=a),i.has(c)&&(l.layerDependency=c),e.dataset.isDefault===`1`&&(l.isDefault=!0),l}function T(e,t){let n=c();for(let{type:r,entityId:i,group:a}of n)a===e&&Labels.setGroup({type:r,entityId:i,group:t})}function E(){s(`labelGroupsConfigurator`)}var D={open:d};export{D as LabelGroupsConfigurator};