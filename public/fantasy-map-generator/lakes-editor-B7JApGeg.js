import{A as e,Et as t,X as n,bt as r,c as i,d as a,dn as o,gn as s,i as c,k as l,r as u,wn as d}from"./utils-BXw8fBj4.js";import{t as f}from"./layers-_nptVsMl.js";import{t as p}from"./mean-4Awewi9R.js";import{t as m}from"./drag-BxIG-06a.js";import{r as h}from"./tooltips-0xeyl30m.js";import{t as g}from"./coastline-generator-CYzNWmTY.js";import{r as _,t as v}from"./dialog-helpers-DT2MP2B1.js";import{P as y,j as b}from"./index-CHSGsxIV.js";import{t as x}from"./graph-override-DQqBictu.js";function S(e){for(var t=-1,n=e.length,r=e[n-1],i,a,o=r[0],s=r[1],c=0;++t<n;)i=o,a=s,r=e[t],o=r[0],s=r[1],i-=o,a-=s,c+=Math.hypot(i,a);return c}var C;function w(e){customization||(v(`.stable`),f.hide(`cells`),T(),o(`#debug`).append(`g`).attr(`id`,`vertices`),C=o(e),D(),I(),O(),o(`#viewbox`).on(`touchmove mousemove`,null),$(`#lakeEditor`).dialog({title:`Edit Lake`,resizable:!1,position:{my:`center top+20`,at:`top`,of:`svg`,collision:`fit`},close:U}))}function T(){_(`lakeEditor`),l(`dialogs`).insertAdjacentHTML(`beforeend`,`<div id="lakeEditor" class="dialog">
    <div id="lakeBody" style="padding-bottom: 0.3em">
      <div>
        <div class="label" style="width: 4.8em">Name:</div>
        <span id="lakeNameCulture" data-tip="Generate culture-specific name for the lake" class="icon-book pointer"></span>
        <span id="lakeNameRandom" data-tip="Generate random name for the lake" class="icon-globe pointer"></span>
        <input id="lakeName" data-tip="Type to rename the lake" autocorrect="off" spellcheck="false" />
        <span id="lakeNameSpeak" data-tip="Speak the name. You can change voice and language in options" class="speaker">🔊</span>
      </div>
      <div data-tip="Type to change lake type (group)">
        <div class="label" style="width: 4.8em">Type:</div>
        <span id="lakeGroupRemove" data-tip="Remove the group" class="icon-trash-empty pointer"></span>
        <span id="lakeGroupAdd" data-tip="Create a new type (group) for the lake" class="icon-plus pointer"></span>
        <select id="lakeGroup" data-tip="Select lake type (group)"></select>
        <input id="lakeGroupName" placeholder="type name" data-tip="Provide a name for the new group" style="display: none" />
        <span id="lakeEditStyle" data-tip="Edit lake group style in Style Editor" class="icon-brush pointer"></span>
      </div>
      <div data-tip="Lake area in selected units">
        <div class="label">Area:</div>
        <input id="lakeArea" disabled />
      </div>
      <div data-tip="Lake shore length in selected units">
        <div class="label">Shore length:</div>
        <input id="lakeShoreLength" disabled />
      </div>
      <div data-tip="Lake elevation in selected units">
        <div class="label">Elevation:</div>
        <input id="lakeElevation" disabled />
      </div>
      <div data-tip="Lake average depth in selected units">
        <div class="label">Average depth:</div>
        <input id="lakeAverageDepth" disabled />
      </div>
      <div data-tip="Lake maximum depth in selected units">
        <div class="label">Max depth:</div>
        <input id="lakeMaxDepth" disabled />
      </div>
      <div data-tip="Lake water supply. If supply > evaporation and there is an outlet, the lake water is fresh. If supply is very low, the lake becomes dry">
        <div class="label">Supply:</div>
        <input id="lakeFlux" disabled />
      </div>
      <div data-tip="Evaporation from lake surface. If evaporation > supply, the lake water is saline. If difference is high, the lake becomes dry">
        <div class="label">Evaporation:</div>
        <input id="lakeEvaporation" disabled />
      </div>
      <div data-tip="Number of lake inlet rivers">
        <div class="label">Inlets:</div>
        <input id="lakeInlets" disabled />
      </div>
      <div data-tip="Lake outlet river">
        <div class="label">Outlet:</div>
        <input id="lakeOutlet" disabled />
      </div>
    </div>
    <div id="lakeBottom">
      <button id="lakeLegend" data-tip="Edit free text notes (legend) for the lake" class="icon-edit"></button>
    </div>
  </div>`),l(`lakeName`).addEventListener(`input`,j),l(`lakeNameSpeak`).addEventListener(`click`,()=>n(l(`lakeName`).value)),l(`lakeNameCulture`).addEventListener(`click`,M),l(`lakeNameRandom`).addEventListener(`click`,N),l(`lakeGroup`).addEventListener(`change`,L),l(`lakeGroupAdd`).addEventListener(`click`,R),l(`lakeGroupName`).addEventListener(`change`,z),l(`lakeGroupRemove`).addEventListener(`click`,B),l(`lakeEditStyle`).addEventListener(`click`,V),l(`lakeLegend`).addEventListener(`click`,H)}function E(){let e=+C.attr(`data-f`);return pack.features.find(t=>t.i===e)}function D(){let{cells:e,vertices:t,rivers:n}=pack,r=E();l(`lakeName`).value=r.name,l(`lakeArea`).value=`${a(u(r.area))} ${c()}`;let o=S(r.vertices.map(e=>t.p[e]));l(`lakeShoreLength`).value=`${a(o*distanceScale)} ${distanceUnitInput.value}`;let d=Array.from(e.i.filter(t=>e.f[t]===r.i)).map(t=>e.h[t]);l(`lakeElevation`).value=i(r.height),l(`lakeAverageDepth`).value=i(p(d)??0,!0),l(`lakeMaxDepth`).value=i(s(d)??0,!0),l(`lakeFlux`).value=String(r.flux),l(`lakeEvaporation`).value=String(r.evaporation);let f=r.inlets?.map(e=>n.find(t=>t.i===e)?.name),m=r.outlet?n.find(e=>e.i===r.outlet)?.name:`no`,h=l(`lakeInlets`);h.value=f?String(f.length):`no`,h.title=f?f.join(`, `):``,l(`lakeOutlet`).value=m??`no`}function O(){let e=E().vertices,t=d(e.flatMap(e=>pack.vertices.c[e]));o(`#debug`).select(`#vertices`).selectAll(`polygon`).data(t).enter().append(`polygon`).attr(`points`,e=>String(Pack.getPolygon(e))).attr(`data-c`,e=>e),o(`#debug`).select(`#vertices`).selectAll(`circle`).data(e).enter().append(`circle`).attr(`cx`,e=>pack.vertices.p[e][0]).attr(`cy`,e=>pack.vertices.p[e][1]).attr(`r`,.4).attr(`data-v`,e=>e).call(m().on(`drag`,k).on(`end`,A)).on(`mousemove`,()=>h(`Drag to move the vertex. Please use for fine-tuning only! Edit heightmap to change actual cell heights`))}function k(e,n){let r=t(e.x,2),i=t(e.y,2);this.setAttribute(`cx`,String(r)),this.setAttribute(`cy`,String(i)),x.movePackVertex(n,[r,i]);let s=E();o(`#deftemp`).select(`#featurePaths > path#feature_${s.i}`).attr(`d`,g.getFeaturePath(s)),l(`lakeArea`).value=`${a(u(s.area))} ${c()}`,o(`#debug`).select(`#vertices`).selectAll(`polygon`).attr(`points`,e=>String(Pack.getPolygon(e)))}function A(){f.draw(`states`,`provinces`,`borders`,`biomes`,`religions`,`cultures`)}function j(){E().name=this.value}function M(){let e=E();e.name=l(`lakeName`).value=Lakes.getName(e)}function N(){let e=E();e.name=l(`lakeName`).value=Names.getBase(r(Names.nameBases.length-1))}var P=e=>f.get(`lakes`).children.some(t=>t.id===e);function F(e,t){for(let n of e){let e=pack.features[+(n.getAttribute(`data-f`)||0)];e&&(P(t)&&(e.subtype=t),e.group=t)}}function I(){let e=E().group,t=l(`lakeGroup`);t.options.length=0,o(`#lakes`).selectAll(`g`).each(function(){t.options.add(new Option(this.id,this.id,!1,this.id===e))})}function L(){l(this.value).appendChild(C.node()),F([C.node()],this.value)}function R(){let e=l(`lakeGroupName`),t=l(`lakeGroup`);e.style.display===`none`?(e.style.display=`inline-block`,e.focus(),t.style.display=`none`):(e.style.display=`none`,t.style.display=`inline-block`)}function z(){if(!this.value){h(`Please provide a valid group name`);return}let t=this.value.toLowerCase().replace(/ /g,`_`).replace(/[^\w\s]/gi,``);if(e(t)){h(`Element with this id already exists. Please provide a unique name`,!1,`error`);return}if(Number.isFinite(+t.charAt(0))){h(`Group name should start with a letter`,!1,`error`);return}let n=C.node().parentNode;if(!P(n.id)&&n.childElementCount===1){l(`lakeGroup`).selectedOptions[0].remove(),l(`lakeGroup`).options.add(new Option(t,t,!1,!0)),n.id=t,F(Array.from(n.children),t),R(),l(`lakeGroupName`).value=``;return}let r=C.node().parentNode.cloneNode(!1);l(`lakes`).appendChild(r),r.id=t,l(`lakeGroup`).options.add(new Option(t,t,!1,!0)),l(t).appendChild(C.node()),F([C.node()],t),R(),l(`lakeGroupName`).value=``}function B(){let e=C.node().parentNode.id;if(P(e)){h(`This is one of the default groups, it cannot be removed`,!1,`error`);return}let t=C.node().parentNode.childElementCount;alertMessage.innerHTML=`Are you sure you want to remove the group? All lakes of the group (${t}) will be turned into Freshwater`,$(`#alert`).dialog({resizable:!1,title:`Remove lake group`,width:`26em`,buttons:{Remove:function(){$(this).dialog(`close`);let t=l(`freshwater`),n=l(e);for(F(Array.from(n.children),`freshwater`);n.childNodes.length;)t.appendChild(n.childNodes[0]);n.remove(),l(`lakeGroup`).selectedOptions[0].remove(),l(`lakeGroup`).value=`freshwater`},Cancel:function(){$(this).dialog(`close`)}}})}function V(){let e=C.node().parentNode.id;editStyle(`lakes`,e)}function H(){let e=C.attr(`id`);y.NotesEditor.open(e,`${E().name} ${l(`lakeGroup`).value} lake`)}function U(){o(`#debug`).select(`#vertices`).remove(),b(),_(`lakeEditor`)}var W={open:w};export{W as LakesEditor};