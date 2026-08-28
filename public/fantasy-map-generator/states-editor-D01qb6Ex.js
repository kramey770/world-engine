import{D as e,Gt as t,M as n,S as r,T as i,Tt as a,X as o,d as s,dt as c,gn as l,i as u,it as d,k as f,n as p,ot as m,r as h,rt as g,un as _,vt as v,w as y,yt as b}from"./utils-D3KEhgY0.js";import{t as x}from"./stratify-CGdiYggi.js";import{t as S}from"./pack-CyBKcrr4.js";import{r as C,t as ee}from"./tooltips-D1wvMKni.js";import{t as w}from"./emblems-generator-BtgqM7bc.js";import{C as T,Dt as te,Et as E,H as D,J as O,K as k,Mt as ne,Ot as A,Q as j,U as M,W as N,X as re,bt as ie,nt as P,q as F,tt as I,w as ae,xt as oe}from"./index-D3JPylQY.js";import{t as L}from"./highlighting-Dl5muJeM.js";import{i as se,n as ce,r as le,t as ue}from"./table-D__vupD5.js";var R=`statesEditor`,z={my:`right top`,at:`right-10 top+10`,of:`svg`,collision:`fit`},B=[{key:`color`,width:`1.2em`,permanent:!0},{key:`name`,label:`State`,width:`7em`,permanent:!0,sortBy:e=>e.name||``,sortType:`alpha`},{key:`emblem`,width:`1.4em`},{key:`form`,label:`Form`,width:`8em`,mobileHidden:!0,sortBy:e=>e.i&&e.formName||``,sortType:`alpha`},{key:`capital`,label:`Capital`,width:`7em`,sortBy:e=>e.i&&pack.burgs[e.capital]?.name||``,sortType:`alpha`},{key:`culture`,label:`Culture`,width:`10em`,mobileHidden:!0,sortBy:e=>e.i&&pack.cultures[e.culture]?.name||``,sortType:`alpha`},{key:`burgs`,label:`Burgs`,width:`5em`,mobileHidden:!0,sortBy:e=>e.burgs||0},{key:`cells`,label:`Cells`,width:`5em`,hidden:!0,mobileHidden:!0,sortBy:e=>e.cells||0},{key:`area`,label:`Area`,width:`7em`,mobileHidden:!0,defaultSort:`desc`,sortBy:e=>h(e.area||0)},{key:`population`,label:`Population`,width:`6em`,sortBy:e=>a((e.rural||0)*populationRate+(e.urban||0)*populationRate*urbanization)},{key:`treasury`,label:`Treasury`,width:`6em`,mobileHidden:!0,tip:`Click to sort by state treasury. Click on a value to view and edit taxes`,sortBy:e=>e.treasury||0},{key:`type`,label:`Type`,width:`5em`,hidden:!0,sortBy:e=>e.i&&e.type||``,sortType:`alpha`},{key:`expansionism`,label:`Expansion`,width:`5em`,hidden:!0,sortBy:e=>e.i&&e.expansionism||0},{key:`actions`,width:`4.2em`,permanent:!0,align:`right`}],V=ce({getData:()=>ae(R,pack.states.filter(e=>!e.removed),B),onUpdate:pe});function H(){customization||(D(`#${R}, .stable`),j.show(`states`,`borders`),j.hide(`cultures`,`biomes`,`religions`),de(),States.collectStatistics(),V.reset(),$(`#${R}`).dialog({title:`States Editor`,resizable:!1,width:`fit-content`,position:z,close:fe}))}function de(){N(R);let e=`<div id="${R}" class="dialog stable editorDialog">
    <div id="statesBodySection" class="table" data-type="absolute">
      ${le({dialogId:R,columns:B})}
    </div>

    <div id="statesFooter" class="totalLine">
      <div data-tip="States number" style="margin-left: 5px">States:&nbsp;<span id="statesFooterStates">0</span></div>
      <div data-tip="Total burgs number" style="margin-left: 12px" data-col="burgs">Burgs:&nbsp;<span id="statesFooterBurgs">0</span></div>
      <div data-tip="Total land area" style="margin-left: 12px" data-col="area">Land Area:&nbsp;<span id="statesFooterArea">0</span></div>
      <div data-tip="Total population" style="margin-left: 12px" data-col="population">Population:&nbsp;<span id="statesFooterPopulation">0</span></div>
    </div>

    <div id="statesBottom" class="editorToolbar">
      <button id="statesEditorRefresh" data-tip="Refresh the Editor" class="icon-cw"></button>
      <button id="statesEditStyle" data-tip="Edit states style in Style Editor" class="icon-adjust"></button>
      <button id="statesLegend" data-tip="Toggle Legend box" class="icon-list-bullet"></button>
      <button id="statesPercentage" data-tip="Toggle percentage / absolute values views" class="icon-percent"></button>
      <button id="statesChart" data-tip="Show states bubble chart" class="icon-chart-area"></button>

      <button id="statesRegenerate" data-tip="Show the regeneration menu and more data" class="icon-cog-alt"></button>
      <div id="statesRegenerateButtons" style="display: none">
        <button id="statesRegenerateBack" data-tip="Hide the regeneration menu" class="icon-cog-alt"></button>
        <button id="statesRandomize" data-tip="Randomize states Expansion value and re-calculate states and provinces" class="icon-shuffle"></button>
        <div data-tip="Additional growth rate. Defines how many land cells remain neutral" style="display: inline-block">
          <slider-input id="statesGrowthRate" min=".1" max="3" step=".05" value="1">Growth rate:</slider-input>
        </div>
        <button id="statesRecalculate" data-tip="Recalculate states based on current values of growth-related attributes" class="icon-retweet"></button>
        <div data-tip="Allow states neutral distance, expansion and type changes to take an immediate effect" style="display: inline-block">
          <input id="statesAutoChange" class="checkbox" type="checkbox" />
          <label for="statesAutoChange" class="checkbox-label"><i>auto-apply changes</i></label>
        </div>
        <div data-tip="Allow system to change state labels when states data is change" style="display: inline-block">
          <input id="adjustLabels" class="checkbox" type="checkbox" />
          <label for="adjustLabels" class="checkbox-label"><i>auto-change labels</i></label>
        </div>
      </div>

      <button id="statesManually" data-tip="Manually re-assign states" class="icon-brush"></button>

      <button id="statesAdd" data-tip="Add a new state. Hold Shift to add multiple" class="icon-plus"></button>
      <button id="statesMerge" data-tip="Merge several states into one" class="icon-layer-group"></button>
      <button id="statesExport" data-tip="Save state-related data as a text file (.csv)" class="icon-download"></button>
    </div>
  </div>`;f(`dialogs`).insertAdjacentHTML(`beforeend`,e),T(R,V.reset),L(R,({cellId:e})=>pack.cells.h[e]<20?void 0:pack.cells.state[e]),ue({dialogId:R,columns:B,onUpdate:()=>k(R,{width:`fit-content`,position:z})}),f(`statesEditorRefresh`).addEventListener(`click`,U),f(`statesEditStyle`).addEventListener(`click`,()=>editStyle(`regions`)),f(`statesLegend`).addEventListener(`click`,De),f(`statesPercentage`).addEventListener(`click`,J),f(`statesChart`).addEventListener(`click`,Oe),f(`statesRegenerate`).addEventListener(`click`,ke),f(`statesRegenerateBack`).addEventListener(`click`,je),f(`statesRecalculate`).addEventListener(`click`,()=>Y(!0)),f(`statesRandomize`).addEventListener(`click`,Ae),f(`statesGrowthRate`).addEventListener(`input`,()=>Y(!1)),f(`statesManually`).addEventListener(`click`,Me),f(`statesAdd`).addEventListener(`click`,Z),f(`statesMerge`).addEventListener(`click`,Fe),f(`statesExport`).addEventListener(`click`,Ie),f(`statesBodySection`).addEventListener(`click`,e=>{let t=e.target,n=t.classList,r=t.closest(`.states`);if(!r)return;let i=Number(r.dataset.id);t.tagName===`FILL-BOX`?me(t):n.contains(`name`)?he(i):n.contains(`coaIcon`)?O.EmblemsEditor.open(`state`,`stateCOA${i}`,pack.states[i]):n.contains(`icon-star-empty`)?be(i):n.contains(`icon-dot-circled`)?O.BurgsOverview.open({stateId:i}):n.contains(`statePopulation`)?ve(i):n.contains(`stateTreasury`)?ye(i):n.contains(`icon-pin`)?we(i,n):n.contains(`icon-target`)?re(_(`#regions`).select(`#state${i}`).node(),4):n.contains(`icon-trash-empty`)?Te(i):(n.contains(`icon-lock`)||n.contains(`icon-lock-open`))&&Le(i,n)}),f(`statesBodySection`).addEventListener(`change`,e=>{let t=e.target,n=t.classList,r=t.closest(`.states`);if(!r)return;let i=+r.dataset.id;n.contains(`stateCulture`)?xe(i,r,t.value):n.contains(`cultureType`)?Se(i,r,t.value):n.contains(`statePower`)&&Ce(i,r,t.value)})}function fe(){customization===3&&Q(),_(`#debug`).selectAll(`.highlight`).remove(),N(R)}function U(){States.collectStatistics(),V.refresh()}function pe(e){let t=u(),n=0,r=0,i=0;for(let t of e.all){n+=h(t.area||0);let e=(t.rural||0)*populationRate,o=(t.urban||0)*populationRate*urbanization;r+=a(e+o),i+=t.burgs||0}let o=``;for(let n of e.rows){let e=h(n.area||0),r=(n.rural||0)*populationRate,i=(n.urban||0)*populationRate*urbanization,c=a(r+i),l=`Total population: ${s(c)}; Rural population: ${s(r)}; Urban population: ${s(i)}. Click to change`,u=_(`#deftemp`).select(`#fog #focusState${n.i}`).size(),d=`Current treasury: 🟡 ${s(n.treasury)}. Sales Tax: ${a((n.salesTax||0)*100,1)}%. Poll Tax: ${a((n.pollTax||0)*100,1)}%. Click to view and edit taxes`;if(!n.i){o+=`<div
        class="states"
        data-id=${n.i}
        data-name="${n.name}"
        data-cells=${n.cells}
        data-area=${e}
        data-population=${c}
        data-burgs=${n.burgs}
        data-treasury="0"
        data-color=""
        data-form=""
        data-capital=""
        data-culture=""
        data-type=""
        data-expansionism=""
      >
        <svg width="1em" height="1em" class="placeholder" data-col="color"></svg>
        <input data-tip="Neutral lands name. Click to change" class="stateName name pointer italic" value="${n.name}" readonly data-col="name" />
        <svg class="coaIcon placeholder" viewBox="0 0 200 200" data-col="emblem"></svg>
        <input class="stateForm placeholder" value="none" data-col="form" />
        <div data-col="capital">
          <span class="icon-star-empty placeholder"></span>
          <div class="stateCapital placeholder"></div>
        </div>
        <select class="stateCulture placeholder" data-col="culture">${W(0)}</select>
        <div data-col="burgs">
          <span data-tip="Click to overview neutral burgs" class="icon-dot-circled pointer" style="padding-right: 1px"></span>
          <div data-tip="Burgs count" class="stateBurgs">${n.burgs}</div>
        </div>
        <div data-col="cells">
          <span data-tip="Cells count" class="icon-check-empty"></span>
          <div data-tip="Cells count" class="stateCells">${n.cells}</div>
        </div>
        <div data-col="area">
          <span data-tip="Neutral lands area" style="padding-right: 4px" class="icon-map-o"></span>
          <div data-tip="Neutral lands area" class="stateArea">${s(e)} ${t}</div>
        </div>
        <div data-col="population">
          <span data-tip="${l}" class="icon-male"></span>
          <div data-tip="${l}" class="statePopulation pointer">${s(c)}</div>
        </div>
        <div data-tip="Neutrals collect no taxes" class="stateTreasury placeholder" data-col="treasury"></div>
        <select class="cultureType placeholder" data-col="type">${G(0)}</select>
        <div data-col="expansionism">
          <span class="icon-resize-full placeholder"></span>
          <input class="statePower placeholder" type="number" value="0" />
        </div>
        <div data-col="actions"></div>
      </div>`;continue}let f=pack.burgs[n.capital].name;ne.trigger(`stateCOA${n.i}`,n.coa),o+=`<div
      class="states"
      data-id=${n.i}
      data-name="${n.name}"
      data-form="${n.formName}"
      data-capital="${f}"
      data-color="${n.color}"
      data-cells=${n.cells}
      data-area=${e}
      data-population=${c}
      data-burgs=${n.burgs}
      data-treasury="${n.treasury}"
      data-culture=${pack.cultures[n.culture].name}
      data-type=${n.type}
      data-expansionism=${n.expansionism}
    >
      <fill-box fill="${n.color}" data-col="color"></fill-box>
      <input data-tip="State name. Click to change" class="stateName name pointer" value="${n.name}" readonly data-col="name" />
      <svg data-tip="Click to show and edit state emblem" class="coaIcon pointer" viewBox="0 0 200 200" data-col="emblem"><use href="#stateCOA${n.i}"></use></svg>
      <input data-tip="State form name. Click to change" class="stateForm name pointer" value="${n.formName}" readonly data-col="form" />
      <div data-col="capital">
        <span data-tip="State capital. Click to zoom into view" class="icon-star-empty pointer"></span>
        <div data-tip="Capital name" class="stateCapital">${f}</div>
      </div>
      <select data-tip="Dominant culture. Click to change" class="stateCulture" data-col="culture">${W(n.culture)}</select>
      <div data-col="burgs">
        <span data-tip="Click to overview state burgs" style="padding-right: 1px" class="icon-dot-circled pointer"></span>
        <div data-tip="Burgs count" class="stateBurgs">${n.burgs}</div>
      </div>
      <div data-col="cells">
        <span data-tip="Cells count" class="icon-check-empty"></span>
        <div data-tip="Cells count" class="stateCells">${n.cells}</div>
      </div>
      <div data-col="area">
        <span data-tip="State area" style="padding-right: 4px" class="icon-map-o"></span>
        <div data-tip="State area" class="stateArea">${s(e)} ${t}</div>
      </div>
      <div data-col="population">
        <span data-tip="${l}" class="icon-male"></span>
        <div data-tip="${l}" class="statePopulation pointer">${s(c)}</div>
      </div>
      <div data-tip="${d}" class="stateTreasury pointer" data-col="treasury">🟡 ${s(n.treasury)}</div>
      <select data-tip="State type. Defines growth model. Click to change" class="cultureType" data-col="type">${G(n.type)}</select>
      <div data-col="expansionism">
        <span data-tip="State expansionism" class="icon-resize-full"></span>
        <input data-tip="Expansionism (defines competitive size). Change to re-calculate states based on new value"
          class="statePower" type="number" min="0" max="99" step=".1" value=${n.expansionism} />
      </div>
      <div data-col="actions">
        <span data-tip="Locate the state" class="icon-target"></span>
        <span data-tip="Toggle state focus" class="icon-pin ${u?``:` inactive`}"></span>
        <span data-tip="Lock the state to protect it from re-generation" class="icon-lock${n.lock?``:`-open`}"></span>
        <span data-tip="Remove the state" class="icon-trash-empty"></span>
      </div>
    </div>`}let c=f(`statesBodySection`);c.querySelectorAll(`:scope > .states`).forEach(e=>{e.remove()}),c.insertAdjacentHTML(`beforeend`,o),f(`statesFooterStates`).innerHTML=String(pack.states.filter(e=>e.i&&!e.removed).length),f(`statesFooterBurgs`).innerHTML=String(i),f(`statesFooterArea`).innerHTML=s(n)+t,f(`statesFooterArea`).dataset.area=String(n),f(`statesFooterPopulation`).innerHTML=s(r),f(`statesFooterPopulation`).dataset.population=String(r),se(f(`statesFooter`),e,V.goto),f(`statesBodySection`).querySelectorAll(`:scope > .states`).forEach(e=>{e.addEventListener(`mouseenter`,K),e.addEventListener(`mouseleave`,q)}),f(`statesBodySection`).dataset.type===`percentage`&&(f(`statesBodySection`).dataset.type=`absolute`,J()),k(R,{width:`fit-content`,position:z})}function W(e){let t=``;return pack.cultures.forEach(n=>{n.removed||(t+=`<option ${n.i===e?`selected`:``} value="${n.i}">${n.name}</option>`)}),t}function G(e){let t=``;return[`Generic`,`River`,`Lake`,`Naval`,`Nomadic`,`Hunting`,`Highland`].forEach(n=>{t+=`<option ${e===n?`selected`:``} value="${n}">${n}</option>`}),t}function K(e){if(!j.isOn(`states`)||_(`#deftemp`).select(`#fog path`).size())return;let n=+e.target.dataset.id;if(customization||!n)return;let r=_(`#regions`).select(`#state${n}`).attr(`d`),i=_(`#debug`).append(`path`).attr(`class`,`highlight`).attr(`d`,r).attr(`fill`,`none`).attr(`stroke`,`red`).attr(`stroke-width`,1).attr(`opacity`,1).attr(`filter`,`url(#blur1)`),a=i.node().getTotalLength(),o=(a+5e3)/2,s=t(`0, ${a}`,`${a}, ${a}`);i.transition().duration(o).attrTween(`stroke-dasharray`,()=>s)}function q(){_(`#debug`).selectAll(`.highlight`).each(function(){_(this).transition().duration(1e3).attr(`opacity`,0).remove()})}function me(e){let t=e.getAttribute(`fill`)||`#ffffff`,n=+e.closest(`.states`).dataset.id;O.ColorPicker.open(t,t=>{e.fill=t,pack.states[n].color=t,j.draw(`states`),j.draw(`military`)})}function he(t){ge();let n=f(`stateNameEditorCustomForm`),r=f(`stateNameEditorSelectForm`);n.value=``,n.style.display===`inline-block`&&(n.style.display=`none`,r.style.display=`inline-block`);let i=pack.states[t];f(`stateNameEditor`).dataset.state=String(t),f(`stateNameEditorShort`).value=i.name||``,e(r,i.formName||``),f(`stateNameEditorFull`).value=i.fullName||``,$(`#stateNameEditor`).dialog({resizable:!1,title:`Change state name`,buttons:{Apply:function(){u(i),$(this).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}},position:{my:`center`,at:`center`,of:`svg`},close:_e}),f(`stateNameEditorShortCulture`).addEventListener(`click`,a),f(`stateNameEditorShortRandom`).addEventListener(`click`,s),f(`stateNameEditorShortSpeak`).addEventListener(`click`,()=>o(f(`stateNameEditorShort`).value)),f(`stateNameEditorAddForm`).addEventListener(`click`,c),f(`stateNameEditorCustomForm`).addEventListener(`change`,c),f(`stateNameEditorFullRegenerate`).addEventListener(`click`,l),f(`stateNameEditorFullSpeak`).addEventListener(`click`,()=>o(f(`stateNameEditorFull`).value));function a(){let e=+f(`stateNameEditor`).dataset.state,t=pack.states[e].culture,n=Names.getState(Names.getCultureShort(t),t);f(`stateNameEditorShort`).value=n}function s(){let e=b(Names.nameBases.length-1),t=Names.getState(Names.getBase(e),void 0,e);f(`stateNameEditorShort`).value=t}function c(){let t=n.value,i=n.style.display===`inline-block`;n.style.display=i?`none`:`inline-block`,r.style.display=i?`inline-block`:`none`,t&&i&&e(r,t),n.value=``}function l(){let e=f(`stateNameEditorShort`).value,t=f(`stateNameEditorSelectForm`).value;f(`stateNameEditorFull`).value=n();function n(){if(!t)return e;if(!e&&t)return`The ${t}`;let n=f(`stateNameEditorFullRegenerate`),r=+n.dataset.tick;return n.dataset.tick=String(r+1),r%2?`${m(e)} ${t}`:`${t} of ${e}`}}function u(e){let t=f(`stateNameEditorShort`),n=f(`stateNameEditorSelectForm`),r=f(`stateNameEditorFull`),i=t.value!==e.name,a=n.value!==e.formName,o=r.value!==e.fullName,s=i||a||o;if(a){let t=n.selectedOptions[0].parentElement?.getAttribute(`label`)||null;t&&(e.form=t)}e.name=t.value,e.formName=n.value,e.fullName=r.value,s&&f(`stateNameEditorUpdateLabel`).checked&&(e.label?.text&&delete e.label.text,j.draw(`labels`)),U()}}function ge(){N(`stateNameEditor`),f(`dialogs`).insertAdjacentHTML(`beforeend`,`<div id="stateNameEditor" class="dialog" data-state="0">
      <div>
        <div data-tip="State short name" class="label">Short name:</div>
        <input
          id="stateNameEditorShort"
          data-tip="Type to change the short name"
          autocorrect="off"
          spellcheck="false"
          style="width: 11em"
        />
        <span id="stateNameEditorShortSpeak" data-tip="Speak the name. You can change voice and language in options" class="speaker">🔊</span>
        <span
          id="stateNameEditorShortCulture"
          data-tip="Generate culture-specific name"
          class="icon-book pointer"
        ></span>
        <span id="stateNameEditorShortRandom" data-tip="Generate random name" class="icon-globe pointer"></span>
      </div>
      <div data-tip="Select form name">
        <div data-tip="State form name" class="label">Form name:</div>
        <select id="stateNameEditorSelectForm" style="width: 11em">
          <option value="">blank</option>
          <optgroup label="Monarchy">
            <option value="Beylik">Beylik</option>
            <option value="Despotate">Despotate</option>
            <option value="Dominion">Dominion</option>
            <option value="Duchy">Duchy</option>
            <option value="Emirate">Emirate</option>
            <option value="Empire">Empire</option>
            <option value="Horde">Horde</option>
            <option value="Grand Duchy">Grand Duchy</option>
            <option value="Heptarchy">Heptarchy</option>
            <option value="Khaganate">Khaganate</option>
            <option value="Khanate">Khanate</option>
            <option value="Kingdom">Kingdom</option>
            <option value="Marches">Marches</option>
            <option value="Principality">Principality</option>
            <option value="Satrapy">Satrapy</option>
            <option value="Shogunate">Shogunate</option>
            <option value="Sultanate">Sultanate</option>
            <option value="Tsardom">Tsardom</option>
            <option value="Ulus">Ulus</option>
            <option value="Viceroyalty">Viceroyalty</option>
          </optgroup>
          <optgroup label="Republic">
            <option value="Chancellery">Chancellery</option>
            <option value="City-state">City-state</option>
            <option value="Diarchy">Diarchy</option>
            <option value="Federation">Federation</option>
            <option value="Free City">Free City</option>
            <option value="Most Serene Republic">Most Serene Republic</option>
            <option value="Oligarchy">Oligarchy</option>
            <option value="Protectorate">Protectorate</option>
            <option value="Republic">Republic</option>
            <option value="Tetrarchy">Tetrarchy</option>
            <option value="Trade Company">Trade Company</option>
            <option value="Triumvirate">Triumvirate</option>
          </optgroup>
          <optgroup label="Union">
            <option value="Confederacy">Confederacy</option>
            <option value="Confederation">Confederation</option>
            <option value="Conglomerate">Conglomerate</option>
            <option value="Commonwealth">Commonwealth</option>
            <option value="League">League</option>
            <option value="Union">Union</option>
            <option value="United Hordes">United Hordes</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United Provinces">United Provinces</option>
            <option value="United Republic">United Republic</option>
            <option value="United States">United States</option>
            <option value="United Tribes">United Tribes</option>
          </optgroup>
          <optgroup label="Theocracy">
            <option value="Bishopric">Bishopric</option>
            <option value="Brotherhood">Brotherhood</option>
            <option value="Caliphate">Caliphate</option>
            <option value="Diocese">Diocese</option>
            <option value="Divine Duchy">Divine Duchy</option>
            <option value="Divine Grand Duchy">Divine Grand Duchy</option>
            <option value="Divine Principality">Divine Principality</option>
            <option value="Divine Kingdom">Divine Kingdom</option>
            <option value="Divine Empire">Divine Empire</option>
            <option value="Eparchy">Eparchy</option>
            <option value="Exarchate">Exarchate</option>
            <option value="Holy State">Holy State</option>
            <option value="Imamah">Imamah</option>
            <option value="Patriarchate">Patriarchate</option>
            <option value="Theocracy">Theocracy</option>
          </optgroup>
          <optgroup label="Anarchy">
            <option value="Commune">Commune</option>
            <option value="Community">Community</option>
            <option value="Council">Council</option>
            <option value="Free Territory">Free Territory</option>
            <option value="Tribes">Tribes</option>
          </optgroup>
        </select>
        <input
          id="stateNameEditorCustomForm"
          placeholder="type form name"
          data-tip="Enter custom form name"
          style="display: none; width: 11em"
        />
        <span
          id="stateNameEditorAddForm"
          data-tip="Click to add custom state form name to the list"
          class="icon-plus pointer"
        ></span>
      </div>
      <div>
        <div data-tip="State full name" class="label">Full name:</div>
        <input
          id="stateNameEditorFull"
          data-tip="Type to change the full name"
          autocorrect="off"
          spellcheck="false"
          style="width: 11em"
        />
        <span id="stateNameEditorFullSpeak" data-tip="Speak the name. You can change voice and language in options" class="speaker">🔊</span>
        <span
          id="stateNameEditorFullRegenerate"
          data-tip="Click to re-generate full name"
          data-tick="0"
          class="icon-arrows-cw pointer"
        ></span>
      </div>
      <div data-tip="Uncheck to not update state label on name change" style="padding-block: 0.2em">
        <input id="stateNameEditorUpdateLabel" class="checkbox" type="checkbox" checked />
        <label for="stateNameEditorUpdateLabel" class="checkbox-label"><i>Update label on Apply</i></label>
      </div>
    </div>`)}function _e(){$(`#stateNameEditor`).dialog(`destroy`),f(`stateNameEditor`).remove()}function ve(e){let t=pack.states[e];if(!t.cells){C(`State does not have any cells, cannot change population`,!1,`error`);return}let n=a((t.rural||0)*populationRate),r=a((t.urban||0)*populationRate*urbanization),i=n+r,o=e=>Number(e).toLocaleString();alertMessage.innerHTML=`<div>
    <i>Change population of all cells assigned to the state</i>
    <div style="margin: 0.5em 0">
      Rural: <input type="number" min="0" step="1" id="ruralPop" value=${n} style="width:6em" />
      Urban: <input type="number" min="0" step="1" id="urbanPop" value=${r} style="width:6em" />
    </div>
    <div>Total population: ${o(i)} ⇒ <span id="totalPop">${o(i)}</span>
      (<span id="totalPopPerc">100</span>%)
    </div>
  </div>`;let s=f(`ruralPop`),c=f(`urbanPop`),l=f(`totalPop`),u=f(`totalPopPerc`),d=()=>{let e=s.valueAsNumber+c.valueAsNumber;Number.isNaN(e)||(l.innerHTML=o(e),u.innerHTML=String(a(e/i*100)))};s.oninput=()=>d(),c.oninput=()=>d(),$(`#alert`).dialog({resizable:!1,title:`Change state population`,width:`24em`,buttons:{Apply:function(){p(),$(this).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}},position:{my:`center`,at:`center`,of:`svg`}});function p(){let t=+s.value/n;if(Number.isFinite(t)&&t!==1&&pack.cells.i.filter(t=>pack.cells.state[t]===e).forEach(e=>{pack.cells.pop[e]*=t}),!Number.isFinite(t)&&+s.value>0){let t=+s.value/populationRate,n=pack.cells.i.filter(t=>pack.cells.state[t]===e),r=t/n.length;n.forEach(e=>{pack.cells.pop[e]=r})}let i=+c.value/r;if(Number.isFinite(i)&&i!==1&&pack.burgs.filter(t=>!t.removed&&t.state===e).forEach(e=>{e.population=a((e.population||0)*i,4)}),!Number.isFinite(i)&&+c.value>0){let t=+c.value/populationRate/urbanization,n=pack.burgs.filter(t=>!t.removed&&t.state===e),r=a(t/n.length,4);n.forEach(e=>{e.population=r})}j.draw(`population`),U()}}function ye(e){let t=pack.states[e];if(!e||!t||t.removed)return;let n=a(t.pollTax*((t.rural||0)+(t.urban||0)),2),r=pack.deals.reduce((t,n)=>{if(!n.tax)return t;let r=0;if(n.sellerType===`burg`)r=pack.burgs[n.seller]?.state||0;else if(n.sellerType===`market`){let e=Markets.get(n.seller)?.centerBurgId;r=e&&pack.burgs[e]?.state||0}return r===e?t+n.tax:t},0);alertMessage.innerHTML=`<div data-tip="Sales tax is applied to deals with a seller from the state. Poll tax is applied to all population of the state. Tax changes take effect on Production regeneration" style="margin: 0.6em 0; display: grid; grid-template-columns: 7em auto auto; row-gap: 0.4em; align-items: center">
      <label for="stateSalesTaxInput">Sales Tax:</label>
      <input id="stateSalesTaxInput" type="number" min="0" max="1" step="0.01" value="${t.salesTax}" style="width: 6em"/> = ${p(r)}
      <label for="statePollTaxInput">Poll Tax:</label>
      <input id="statePollTaxInput" type="number" min="0" max="10" step="0.01" value="${t.pollTax}" style="width: 6em"/> = ${p(n)}
      <label for="stateTreasuryInput">Treasury:</label>
      <input id="stateTreasuryInput" type="number" step="1" value="${t.treasury}" style="width: 6em" />
    </div>`,$(`#alert`).dialog({resizable:!1,title:`Taxes and Treasury: ${t.name}`,width:`26em`,buttons:{Apply:function(){let e=f(`stateSalesTaxInput`),n=f(`statePollTaxInput`),r=f(`stateTreasuryInput`),i=Math.max(0,Math.min(1,+e.value)),o=Math.max(0,+n.value),s=+r.value;Number.isFinite(i)&&(t.salesTax=a(i,4)),Number.isFinite(o)&&(t.pollTax=a(o,4)),Number.isFinite(s)&&(t.treasury=a(s,2)),U(),$(this).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}},position:{my:`center`,at:`center`,of:`svg`}})}function be(e){let t=pack.states[e].capital,{x:n,y:r}=pack.burgs[t];zoomTo(n,r,8,2e3)}function xe(e,t,n){pack.states[e].culture=+n,t.dataset.base=String(+n)}function Se(e,t,n){pack.states[e].type=n,t.dataset.type=n,Y()}function Ce(e,t,n){pack.states[e].expansionism=Number(n),t.dataset.expansionism=n,Y()}function we(e,t){if(customization)return;let n=_(`#statesBody`).select(`#state${e}`).attr(`d`),r=`focusState${e}`;t.contains(`inactive`)?I(r,n):P(r),t.toggle(`inactive`)}function Te(e){customization||M({title:`Remove state`,message:`Are you sure you want to remove the state? <br>This action cannot be reverted`,confirm:`Remove`,onConfirm:()=>Ee(e)})}function Ee(e){_(`#statesBody`).select(`#state${e}`).remove(),_(`#statesBody`).select(`#state-gap${e}`).remove(),_(`#statesHalo`).select(`#state-border${e}`).remove(),delete pack.states[e].label,P(`focusState${e}`),pack.burgs.forEach(t=>{t.state===e&&(t.state=0,t.capital&&(t.capital=0,Burgs.changeGroup(t,null)))}),j.draw(`burgIcons`,`labels`),pack.cells.state.forEach((t,n)=>{t===e&&(pack.cells.state[n]=0)}),A(`state`,e),(pack.states[e].provinces||[]).forEach(e=>{pack.provinces[e]={i:e,removed:!0},pack.cells.province.forEach((t,n)=>{t===e&&(pack.cells.province[n]=0)}),A(`province`,e);let t=_(`#provs`).select(`#provincesBody`);t.select(`#province${e}`).remove(),t.select(`#province-gap${e}`).remove()}),(pack.states[e].military||[]).forEach(t=>{let n=`regiment${e}-${t.i}`,r=notes.findIndex(e=>e.id===n);r!==-1&&notes.splice(r,1)}),_(`#armies g#army${e}`).remove(),pack.states.forEach(t=>{!t.i||t.removed||!t.neighbors||(t.neighbors=t.neighbors.filter(t=>t!==e))}),pack.states[e]={i:e,removed:!0},_(`#debug`).selectAll(`.highlight`).remove(),j.draw(`states`,`borders`,`provinces`),U()}function De(){if(_(`#legend`).selectAll(`*`).size()){ie();return}oe(`States`,pack.states.filter(e=>e.i&&!e.removed&&e.cells).sort((e,t)=>(t.area??0)-(e.area??0)).map(e=>[e.i,e.color,e.name]))}function J(){if(f(`statesBodySection`).dataset.type===`absolute`){f(`statesBodySection`).dataset.type=`percentage`;let e=+f(`statesFooterBurgs`).innerText,t=+f(`statesFooterArea`).dataset.area,n=+f(`statesFooterPopulation`).dataset.population,r=pack.states.reduce((e,t)=>e+(t.treasury||0),0),i=pack.states.reduce((e,t)=>e+(t.i&&!t.removed&&t.cells||0),0);f(`statesBodySection`).querySelectorAll(`:scope > .states`).forEach(o=>{let{burgs:s,area:c,population:l,treasury:u,cells:d}=o.dataset;o.querySelector(`.stateBurgs`).innerText=`${a(+s/e*100)}%`,o.querySelector(`.stateCells`).innerText=`${a(+d/i*100)}%`,o.querySelector(`.stateArea`).innerText=`${a(+c/t*100)}%`,o.querySelector(`.statePopulation`).innerText=`${a(+l/n*100)}%`,o.querySelector(`.stateTreasury`).innerText=`${a(+u/r*100,2)}%`})}else f(`statesBodySection`).dataset.type=`absolute`,V.refresh()}function Oe(){let e=pack.states.filter(e=>!e.removed);if(e.length<2){C(`There are no states to show`,!1,`error`);return}let t=x().id(e=>String(e.i)).parentId(e=>e.i?`0`:null)(e).sum(e=>e.area).sort((e,t)=>t.value-e.value),n=150+200*f(`uiSize`).valueAsNumber,r={top:0,right:-50,bottom:0,left:-50},i=n-r.left-r.right,o=n-r.top-r.bottom,c=S().size([i,o]).padding(3);alertMessage.innerHTML=`<select id="statesTreeType" style="display:block; margin-left:13px; font-size:11px">
    <option value="area" selected>Area</option>
    <option value="population">Total population</option>
    <option value="rural">Rural population</option>
    <option value="urban">Urban population</option>
    <option value="burgs">Burgs number</option>
  </select>`,alertMessage.innerHTML+=`<div id='statesInfo' class='chartInfo'>&#8205;</div>`;let d=_(`#alertMessage`).insert(`svg`,`#statesInfo`).attr(`id`,`statesTree`).attr(`width`,n).attr(`height`,n).style(`font-family`,`Almendra SC`).attr(`text-anchor`,`middle`).attr(`dominant-baseline`,`central`).append(`g`).attr(`transform`,`translate(-50, 0)`);f(`statesTreeType`).addEventListener(`change`,b),c(t);let p=d.selectAll(`g`).data(t.leaves()).enter().append(`g`).attr(`transform`,e=>`translate(${e.x},${e.y})`).attr(`data-id`,e=>e.data.i).on(`mouseenter`,(e,t)=>v(e,t)).on(`mouseleave`,e=>y(e));p.append(`circle`).attr(`fill`,e=>e.data.color).attr(`r`,e=>e.r);let m=/(?=[A-Z][^A-Z])/g,g=e=>(l(e.split(m).map(e=>e.length))??0)+1;p.append(`text`).attr(`text-rendering`,`optimizeSpeed`).style(`font-size`,e=>`${a(e.r**.97*4/g(e.data.name),2)}px`).selectAll(`tspan`).data(e=>e.data.name.split(m)).join(`tspan`).attr(`x`,0).text(e=>e).attr(`dy`,(e,t,n)=>`${t?1:(n.length-1)/-2}em`);function v(e,t){_(e.target).select(`circle`).classed(`selected`,!0);let n=t.data.fullName,r=`${h(t.data.area)} ${u()}`,i=a(t.data.rural*populationRate),o=a(t.data.urban*populationRate*urbanization),c=f(`statesTreeType`).value,l=c===`area`?`Area: ${r}`:c===`rural`?`Rural population: ${s(i)}`:c===`urban`?`Urban population: ${s(o)}`:c===`burgs`?`Burgs number: ${t.data.burgs}`:`Population: ${s(i+o)}`;f(`statesInfo`).innerHTML=`${n}. ${l}`,K(e)}function y(e){q(),document.getElementById(`statesInfo`)&&(f(`statesInfo`).innerHTML=`&#8205;`,_(e.target).select(`circle`).classed(`selected`,!1))}function b(){let e=this.value===`area`?e=>e.area:this.value===`rural`?e=>e.rural:this.value===`urban`?e=>e.urban:this.value===`burgs`?e=>e.burgs:e=>e.rural+e.urban;t.sum(e),p.data(c(t).leaves()),p.transition().duration(1500).attr(`transform`,e=>`translate(${e.x},${e.y})`),p.select(`circle`).transition().duration(1500).attr(`r`,e=>e.r),p.select(`text`).transition().duration(1500).style(`font-size`,e=>`${a(e.r**.97*4/g(e.data.name),2)}px`)}$(`#alert`).dialog({title:`States bubble chart`,width:`fit-content`,position:{my:`left bottom`,at:`left+10 bottom-10`,of:`svg`},buttons:{},close:()=>{alertMessage.innerHTML=``}})}function ke(){f(`statesBottom`).querySelectorAll(`:scope > button`).forEach(e=>{e.style.display=`none`}),f(`statesRegenerateButtons`).style.display=`block`,$(`#statesEditor`).dialog({position:{my:`right top`,at:`right-10 top+10`,of:`svg`,collision:`fit`}})}function Y(e){if(!(!e&&!f(`statesAutoChange`).checked)){if(States.expandStates(),Provinces.generate(),Provinces.getPoles(),States.getPoles(),j.draw(`states`,`borders`,`provinces`,`goods`,`emblems`),f(`adjustLabels`).checked){for(let e of pack.states)e.label&&(e.label.pathPoints=void 0);j.draw(`labels`)}U()}}function Ae(){pack.states.forEach(e=>{if(!e.i||e.removed)return;let t=a(Math.random()*4+1,1);e.expansionism=t,f(`statesBodySection`).querySelector(`div.states[data-id='${e.i}'] input.statePower`).value=String(t)}),Y(!0)}function je(){f(`statesBottom`).querySelectorAll(`:scope > button`).forEach(e=>{e.style.display=`inline-block`}),f(`statesRegenerateButtons`).style.display=`none`,$(`#statesEditor`).dialog({position:{my:`right top`,at:`right-10 top+10`,of:`svg`,collision:`fit`}})}function Me(){j.show(`states`);let e=f(`adjustLabels`).checked;O.PaintEditor.open({title:`Paint States`,parentDialogId:R,onClose:H,items:pack.states.filter(e=>!e.removed).map(e=>({id:e.i,name:e.name,color:e.color||`#ffffff`})),dontOverrideControl:!0,getValue:e=>pack.cells.state[e],filterCell:(e,t)=>r(e,pack)&&e!==pack.states[t].center,onApply:t=>Ne(t,e)})}function Ne(e,t){let{cells:n}=pack,r=[],i=[];for(let[t,a]of e)r.push(n.state[t],a),i.push(n.province[t]),n.state[t]=a,n.burg[t]&&(pack.burgs[n.burg[t]].state=a);if(r.length){if(States.getPoles(),X([...new Set(i)]),j.draw(`states`,`borders`,`provinces`),t){let e=[...new Set(r)];for(let t of e)pack.states[t].label&&delete pack.states[t].label;j.draw(`labels`)}document.getElementById(R)&&U()}}function X(e){let{cells:t,provinces:n,states:r,burgs:i}=pack,a=[];e.forEach(e=>{if(!n[e])return;let r=t.i.filter(n=>t.province[n]===e),i=[...new Set(r.map(e=>t.state[e]))];if(e&&i.length===1){o(e,i[0],r);return}s(e,i,r)}),te(a.map(e=>[`province`,e]));function o(e,i,a){let o=n[e],s=r[o.state];s.provinces=s.provinces.filter(t=>t!==e),i?(o.state=i,r[i].provinces.push(e)):(n[e]={i:e,removed:!0},A(`province`,e),a.forEach(e=>{t.province[e]=0}))}function s(e,i,a){let o=n[e],s=r[o.state],c=t.state[o.center];i.forEach(i=>{let d=a.filter(e=>t.state[e]===i);if(i===c){if(i===s.i)return;if(!i){n[e]={i:e,removed:!0},A(`province`,e),d.forEach(e=>{t.province[e]=0});return}s.provinces=s.provinces.filter(t=>t!==e),o.state=i,o.color=g(r[i].color),r[i].provinces.push(e);return}if(!i){d.forEach(e=>{t.province[e]=0});return}if(d.length<20){let n=u(e,i,d);if(n){d.forEach(e=>{t.province[e]=n});return}}l(o,i,d)})}function l(e,o,s){let l=n.length,u=s.find(e=>t.burg[e]),d=u||s[0],f=u?t.burg[u]:0,p=f?i[f]:null,m=t.culture[d],h=u&&c(.5),_=h?p.name:e.name||Names.getState(Names.getCultureShort(m),m),y=u&&e.formName?e.formName:v([`Zone`,`Area`,`Territory`,`Province`]),b=g(r[o].color),x=h?.8:.4,S=Burgs.getType(d,p?.port),C=w.generate(p?.coa||r[o].coa,x,p?null:.9,S);C.shield=w.getShield(m,o),n.push({i:l,state:o,center:d,burg:f,name:_,formName:y,fullName:`${_} ${y}`,color:b,coa:C}),s.forEach(e=>{t.province[e]=l}),r[o].provinces.push(l),a.push(l)}function u(e,n,r){let i=r.find(r=>t.c[r].some(r=>t.state[r]===n&&t.province[r]&&t.province[r]!==e));return i&&t.c[i].map(e=>t.province[e]).find(t=>t&&t!==e)}}function Z(){if(this.classList.contains(`pressed`)){Q();return}customization=3,this.classList.add(`pressed`),C(`Click on the map to create a new capital or promote an existing burg`,!0),_(`#viewbox`).style(`cursor`,`crosshair`).on(`click`,Pe),f(`statesBodySection`).querySelectorAll(`div > input, select, span, svg`).forEach(e=>{e.style.pointerEvents=`none`})}function Pe(e){let{cells:t,states:r,burgs:i}=pack,a=n(e,this),o=Pack.findCell(a[0],a[1]);if(t.h[o]<20){C(`You cannot place state into the water. Please click on a land cell`,!1,`error`);return}let s=t.burg[o];if(s&&i[s].capital){C(`Existing capital cannot be selected as a new state capital! Select other cell`,!1,`error`);return}s||(s=Burgs.add(a),E(`burg`,s));let c=t.state[o],l=r.length;i[s].capital=1,i[s].state=l,Burgs.changeGroup(i[s],null),j.draw(`burgIcons`,`labels`,`routes`),e.shiftKey===!1&&Q();let u=t.culture[o],f=o%5==0?i[s].name:Names.getCulture(u),p=Names.getState(f,u),m=d(),h=pack.cultures[u].type,g=w.generate(i[s].coa,.4,null,h);g.shield=w.getShield(u,void 0);let _=r.map(e=>{if(!e.i||e.removed)return`x`;if(!c)return e.diplomacy.push(`Neutral`),`Neutral`;let t=r[c].diplomacy[e.i];return e.i===c?t=`Enemy`:t===`Ally`||t===`Friendly`?t=`Suspicion`:t===`Suspicion`?t=`Neutral`:t===`Enemy`||t===`Rival`?t=`Friendly`:t===`Vassal`?t=`Suspicion`:t===`Suzerain`&&(t=`Enemy`),e.diplomacy.push(t),t});_.push(`x`),r[0].diplomacy.push([`Independance declaration`,`${p} declared its independance from ${r[c].name}`]),t.state[o]=l,t.province[o]=0,r.push({i:l,name:p,diplomacy:_,provinces:[],color:m,expansionism:.5,capital:s,type:`Generic`,center:o,culture:u,military:[],alert:1,coa:g}),States.getPoles(),States.findNeighbors(),States.collectStatistics(),States.defineStateForms([l]),X([t.province[o]]),j.draw(`labels`),E(`state`,l),j.hide(`provinces`),j.show(`states`,`borders`),V.refresh()}function Q(){customization=0,F(),ee(),f(`statesBodySection`).querySelectorAll(`div > input, select, span, svg`).forEach(e=>{e.style.removeProperty(`pointer-events`)});let e=f(`statesAdd`);e.classList.contains(`pressed`)&&e.classList.remove(`pressed`)}function Fe(){let e=e=>`<svg class="coaIcon" viewBox="0 0 200 200"><use href="#stateCOA${e}"></use></svg>`,n=pack.states.filter(e=>e.i&&!e.removed).map(t=>`
      <div data-id="${t.i}" data-tip="${t.fullName}" style="cursor:default">
        <input type="radio" name="rulingState" value="${t.i}" />
        <input id="selectState${t.i}" class="checkbox" type="checkbox" name="statesToMerge" value="${t.i}" />
        <label for="selectState${t.i}" class="checkbox-label"><fill-box fill="${t.color}" disabled></fill-box>${e(t.i)}${t.fullName}</label>
      </div>
    `).join(``);alertMessage.innerHTML=`
    <form id='mergeStatesForm' style="overflow: hidden; display: flex; flex-direction: column; gap: 1em;">
      <p style="margin:0">
        Check the <b>checkbox</b> next to each state you want to merge.
        Use the <b>radio button</b> to pick the <em>ruling state</em> that will absorb all others (its name, color, and capital will be kept).
        Hover over a row to highlight the state on the map.
      </p>
      <main style='display: grid; grid-template-columns: 1fr 1fr; gap: .3em;'>
        ${n}
      </main>
    </form>
  `,f(`mergeStatesForm`).querySelectorAll(`div[data-id]`).forEach(e=>{e.addEventListener(`mouseenter`,r),e.addEventListener(`mouseleave`,q)}),L(`mergeStatesForm`,({cellId:e})=>pack.cells.state[e]);function r(e){if(!j.isOn(`states`))return;let n=+e.currentTarget.dataset.id;if(!n)return;let r=_(`#regions`).select(`#state${n}`).attr(`d`);if(!r)return;q();let i=_(`#debug`).append(`path`).attr(`class`,`highlight`).attr(`d`,r).attr(`fill`,`none`).attr(`stroke`,`red`).attr(`stroke-width`,1).attr(`opacity`,1).attr(`filter`,`url(#blur1)`),a=i.node().getTotalLength(),o=(a+5e3)/2,s=t(`0, ${a}`,`${a}, ${a}`);i.transition().duration(o).attrTween(`stroke-dasharray`,()=>s)}$(`#alert`).dialog({width:600,title:`Merge states`,close:q,buttons:{Merge:function(){let t=new FormData(f(`mergeStatesForm`)),n=Number(t.get(`rulingState`));if(!n){C(`Please select a state to merge into`,!1,`error`);return}let r=pack.states[n],a=t.getAll(`statesToMerge`).map(Number).filter(e=>e!==n);if(!a.length){C(`Please select several states to merge`,!1,`error`);return}M({title:`Merge states`,message:`
            <p>The following states will be <strong>removed</strong>: ${a.map(t=>`${e(t)}${pack.states[t].name}`).join(`, `)}.</p>
            <p>Removed states data (burgs, provinces, regiments) will be assigned to ${e(r.i)}${r.name}.</p>
            <p>Are you sure you want to merge states? This action cannot be reverted.</p>`,confirm:`Merge`,onConfirm:()=>{i(a,n),$(this).dialog(`close`)}})},Cancel:function(){$(this).dialog(`close`)}}});function i(e,t){let n=pack.states[t],r=f(`army${t}`);e.forEach(e=>{let i=pack.states[e];i.removed=!0,_(`#statesBody`).select(`#state${e}`).remove(),_(`#statesBody`).select(`#state-gap${e}`).remove(),_(`#statesHalo`).select(`#state-border${e}`).remove(),delete pack.states[e].label,A(`state`,e),(i.military||[]).forEach(i=>{let a=`regiment${e}-${i.i}`,o=(n.military||[]).length;(n.military||[]).push({...i,i:o});let s=`regiment${t}-${o}`,c=notes.find(e=>e.id===a);c&&(c.id=s);let l=document.getElementById(a);l&&(l.id=s,l.dataset.state=String(t),l.dataset.id=String(o),r.appendChild(l))}),_(`#armies g#army${e}`).remove()}),pack.burgs.forEach(n=>{e.includes(n.state??0)&&(n.capital&&(n.capital=0,Burgs.changeGroup(n,null)),n.state=t)}),pack.provinces.forEach(n=>{e.includes(n.state)&&(n.state=t)}),pack.cells.state.forEach((n,r)=>{e.includes(n)&&(pack.cells.state[r]=t)}),P(),_(`#debug`).selectAll(`.highlight`).remove(),States.getPoles(),pack.states[t].label||delete pack.states[t].label,j.show(`states`,`borders`),j.draw(`burgIcons`,`labels`,`provinces`),U()}}function Ie(){let e=`Id,State,Full Name,Form,Color,Capital,Culture,Type,Expansionism,Cells,Burgs,Area ${u(`2`)},Total Population,Rural Population,Urban Population`,t=V.view().all.map(e=>{let t=e.rural||0,n=e.urban||0,r=a(t*populationRate+n*populationRate*urbanization);return[e.i,e.name,e.fullName||``,e.i?e.formName:``,e.i?e.color:``,e.i?pack.burgs[e.capital].name:``,e.i?pack.cultures[e.culture].name:``,e.i?e.type:``,e.i?e.expansionism:``,e.cells,e.burgs,h(e.area||0),r,Math.round(t*populationRate),Math.round(n*populationRate*urbanization)].join(`,`)});y([e].concat(t).join(`
`),`${i(`States`)}.csv`)}function Le(e,t){let n=pack.states[e];n.lock=!n.lock,t.toggle(`icon-lock-open`),t.toggle(`icon-lock`)}var Re={open:H};export{Re as StatesEditor};