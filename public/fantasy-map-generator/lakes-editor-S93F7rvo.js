import{A as e,Cn as t,Tt as n,X as r,c as i,d as a,hn as o,i as s,k as c,r as l,un as u,yt as d}from"./utils-D3KEhgY0.js";import{t as f}from"./mean-4Awewi9R.js";import{r as p}from"./tooltips-D1wvMKni.js";import{H as m,J as h,Kt as g,Q as _,St as v,W as y,q as b}from"./index-D3JPylQY.js";import{t as x}from"./graph-override-O0bC0K6n.js";function S(e){for(var t=-1,n=e.length,r=e[n-1],i,a,o=r[0],s=r[1],c=0;++t<n;)i=o,a=s,r=e[t],o=r[0],s=r[1],i-=o,a-=s,c+=Math.hypot(i,a);return c}var C;function w(e){customization||(m(`.stable`),_.hide(`cells`),T(),u(`#debug`).append(`g`).attr(`id`,`vertices`),C=u(e),D(),I(),O(),u(`#viewbox`).on(`touchmove mousemove`,null),$(`#lakeEditor`).dialog({title:`Edit Lake`,resizable:!1,position:{my:`center top+20`,at:`top`,of:`svg`,collision:`fit`},close:U}))}function T(){y(`lakeEditor`),c(`dialogs`).insertAdjacentHTML(`beforeend`,`<div id="lakeEditor" class="dialog">
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
  </div>`),c(`lakeName`).addEventListener(`input`,j),c(`lakeNameSpeak`).addEventListener(`click`,()=>r(c(`lakeName`).value)),c(`lakeNameCulture`).addEventListener(`click`,M),c(`lakeNameRandom`).addEventListener(`click`,N),c(`lakeGroup`).addEventListener(`change`,L),c(`lakeGroupAdd`).addEventListener(`click`,R),c(`lakeGroupName`).addEventListener(`change`,z),c(`lakeGroupRemove`).addEventListener(`click`,B),c(`lakeEditStyle`).addEventListener(`click`,V),c(`lakeLegend`).addEventListener(`click`,H)}function E(){let e=+C.attr(`data-f`);return pack.features.find(t=>t.i===e)}function D(){let{cells:e,vertices:t,rivers:n}=pack,r=E();c(`lakeName`).value=r.name,c(`lakeArea`).value=`${a(l(r.area))} ${s()}`;let u=S(r.vertices.map(e=>t.p[e]));c(`lakeShoreLength`).value=`${a(u*distanceScale)} ${distanceUnitInput.value}`;let d=Array.from(e.i.filter(t=>e.f[t]===r.i)).map(t=>e.h[t]);c(`lakeElevation`).value=i(r.height),c(`lakeAverageDepth`).value=i(f(d)??0,!0),c(`lakeMaxDepth`).value=i(o(d)??0,!0),c(`lakeFlux`).value=String(r.flux),c(`lakeEvaporation`).value=String(r.evaporation);let p=r.inlets?.map(e=>n.find(t=>t.i===e)?.name),m=r.outlet?n.find(e=>e.i===r.outlet)?.name:`no`,h=c(`lakeInlets`);h.value=p?String(p.length):`no`,h.title=p?p.join(`, `):``,c(`lakeOutlet`).value=m??`no`}function O(){let e=E().vertices,n=t(e.flatMap(e=>pack.vertices.c[e]));u(`#debug`).select(`#vertices`).selectAll(`polygon`).data(n).enter().append(`polygon`).attr(`points`,e=>String(Pack.getPolygon(e))).attr(`data-c`,e=>e),u(`#debug`).select(`#vertices`).selectAll(`circle`).data(e).enter().append(`circle`).attr(`cx`,e=>pack.vertices.p[e][0]).attr(`cy`,e=>pack.vertices.p[e][1]).attr(`r`,.4).attr(`data-v`,e=>e).call(g().on(`drag`,k).on(`end`,A)).on(`mousemove`,()=>p(`Drag to move the vertex. Please use for fine-tuning only! Edit heightmap to change actual cell heights`))}function k(e,t){let r=n(e.x,2),i=n(e.y,2);this.setAttribute(`cx`,String(r)),this.setAttribute(`cy`,String(i)),x.movePackVertex(t,[r,i]);let o=E();u(`#deftemp`).select(`#featurePaths > path#feature_${o.i}`).attr(`d`,v.getFeaturePath(o)),c(`lakeArea`).value=`${a(l(o.area))} ${s()}`,u(`#debug`).select(`#vertices`).selectAll(`polygon`).attr(`points`,e=>String(Pack.getPolygon(e)))}function A(){_.draw(`states`,`provinces`,`borders`,`biomes`,`religions`,`cultures`)}function j(){E().name=this.value}function M(){let e=E();e.name=c(`lakeName`).value=Lakes.getName(e)}function N(){let e=E();e.name=c(`lakeName`).value=Names.getBase(d(Names.nameBases.length-1))}var P=e=>_.get(`lakes`).children.some(t=>t.id===e);function F(e,t){for(let n of e){let e=pack.features[+(n.getAttribute(`data-f`)||0)];e&&(P(t)&&(e.subtype=t),e.group=t)}}function I(){let e=E().group,t=c(`lakeGroup`);t.options.length=0,u(`#lakes`).selectAll(`g`).each(function(){t.options.add(new Option(this.id,this.id,!1,this.id===e))})}function L(){c(this.value).appendChild(C.node()),F([C.node()],this.value)}function R(){let e=c(`lakeGroupName`),t=c(`lakeGroup`);e.style.display===`none`?(e.style.display=`inline-block`,e.focus(),t.style.display=`none`):(e.style.display=`none`,t.style.display=`inline-block`)}function z(){if(!this.value){p(`Please provide a valid group name`);return}let t=this.value.toLowerCase().replace(/ /g,`_`).replace(/[^\w\s]/gi,``);if(e(t)){p(`Element with this id already exists. Please provide a unique name`,!1,`error`);return}if(Number.isFinite(+t.charAt(0))){p(`Group name should start with a letter`,!1,`error`);return}let n=C.node().parentNode;if(!P(n.id)&&n.childElementCount===1){c(`lakeGroup`).selectedOptions[0].remove(),c(`lakeGroup`).options.add(new Option(t,t,!1,!0)),n.id=t,F(Array.from(n.children),t),R(),c(`lakeGroupName`).value=``;return}let r=C.node().parentNode.cloneNode(!1);c(`lakes`).appendChild(r),r.id=t,c(`lakeGroup`).options.add(new Option(t,t,!1,!0)),c(t).appendChild(C.node()),F([C.node()],t),R(),c(`lakeGroupName`).value=``}function B(){let e=C.node().parentNode.id;if(P(e)){p(`This is one of the default groups, it cannot be removed`,!1,`error`);return}let t=C.node().parentNode.childElementCount;alertMessage.innerHTML=`Are you sure you want to remove the group? All lakes of the group (${t}) will be turned into Freshwater`,$(`#alert`).dialog({resizable:!1,title:`Remove lake group`,width:`26em`,buttons:{Remove:function(){$(this).dialog(`close`);let t=c(`freshwater`),n=c(e);for(F(Array.from(n.children),`freshwater`);n.childNodes.length;)t.appendChild(n.childNodes[0]);n.remove(),c(`lakeGroup`).selectedOptions[0].remove(),c(`lakeGroup`).value=`freshwater`},Cancel:function(){$(this).dialog(`close`)}}})}function V(){let e=C.node().parentNode.id;editStyle(`lakes`,e)}function H(){let e=C.attr(`id`);h.NotesEditor.open(e,`${E().name} ${c(`lakeGroup`).value} lake`)}function U(){u(`#debug`).select(`#vertices`).remove(),b(),y(`lakeEditor`)}var W={open:w};export{W as LakesEditor};