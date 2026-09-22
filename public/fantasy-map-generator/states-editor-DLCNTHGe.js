import{C as e,D as t,Et as n,Kt as r,M as i,S as a,X as o,_n as s,at as c,bt as l,d as u,dn as d,ft as f,i as p,it as m,k as h,n as g,r as _,st as v,yt as ee}from"./utils-BXw8fBj4.js";import{C as y,D as te,E as b,O as x,j as ne,n as re,r as S,t as C,x as ie}from"./layers-_nptVsMl.js";import{t as ae}from"./drag-BxIG-06a.js";import{t as oe}from"./highlight-jHumwiM5.js";import{t as se}from"./stratify-CGdiYggi.js";import{t as ce}from"./pack-CyBKcrr4.js";import{t as le}from"./heightUtils-BfaaFPbS.js";import{n as ue,r as w,t as T}from"./tooltips-0xeyl30m.js";import{a as E,n as de,r as D,t as fe}from"./dialog-helpers-DT2MP2B1.js";import{t as O}from"./emblems-generator-Bvd9Hj5Y.js";import{n as pe,t as k}from"./brush-circle-5_MK8VXE.js";import{P as A,b as j,g as M,j as N,y as me}from"./index-CHSGsxIV.js";import{t as P}from"./highlighting-DTBMtNB_.js";import{a as F,i as he,n as ge,r as _e,t as ve}from"./table-CN7n7WQR.js";var I=[],L=`statesEditor`,R={my:`right top`,at:`right-10 top+10`,of:`svg`,collision:`fit`};function ye(){return pack.states.filter(e=>!e.removed)}var z=[{key:`color`,width:`1.2em`,permanent:!0},{key:`name`,label:`State`,width:`8em`,permanent:!0,sortBy:e=>e.name||``,sortType:`alpha`},{key:`emblem`,width:`1.4em`,permanent:!0},{key:`form`,label:`Form`,width:`8em`,mobileHidden:!0,sortBy:e=>e.i&&e.formName||``,sortType:`alpha`},{key:`capital`,label:`Capital`,width:`7em`,sortBy:e=>e.i&&pack.burgs[e.capital]?.name||``,sortType:`alpha`},{key:`culture`,label:`Culture`,width:`7em`,mobileHidden:!0,sortBy:e=>e.i&&pack.cultures[e.culture]?.name||``,sortType:`alpha`},{key:`burgs`,label:`Burgs`,width:`5em`,mobileHidden:!0,sortBy:e=>e.burgs||0},{key:`cells`,label:`Cells`,width:`6em`,mobileHidden:!0,sortBy:e=>e.cells||0},{key:`area`,label:`Area`,width:`6em`,mobileHidden:!0,defaultSort:`desc`,sortBy:e=>_(e.area||0)},{key:`population`,label:`Population`,width:`6em`,sortBy:e=>n((e.rural||0)*populationRate+(e.urban||0)*populationRate*urbanization)},{key:`treasury`,label:`Treasury`,width:`7em`,mobileHidden:!0,tip:`Click to sort by state treasury. Click on a value to view and edit taxes`,sortBy:e=>e.treasury||0},{key:`type`,label:`Type`,width:`5em`,hidden:!0,sortBy:e=>e.i&&e.type||``,sortType:`alpha`},{key:`expansionism`,label:`Expansion`,width:`5em`,hidden:!0,sortBy:e=>e.i&&e.expansionism||0},{key:`actions`,width:`6em`,permanent:!0}],B=ge({getData:()=>j(L,ye(),z),onUpdate:Ce});function be(){customization||(fe(`#${L}, .stable`),C.show(`states`,`borders`),C.hide(`cultures`,`biomes`,`religions`),xe(),States.collectStatistics(),B.reset(),$(`#statesEditor`).dialog({title:`States Editor`,resizable:!1,width:M(),close:Se,position:{my:`right top`,at:`right-10 top+10`,of:`svg`,collision:`fit`}}))}function xe(){D(`statesEditor`);let e=`<div id="statesEditor" class="dialog stable editorDialog">
    <div id="statesBodySection" class="table" data-type="absolute">${_e({dialogId:L,columns:z})}</div>

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
      <div id="statesRegenerateButtons" class="editorToolbarPanel" style="display: none">
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
      <div id="statesManuallyButtons" class="editorToolbarPanel" style="display: none">
        <div data-tip="State to paint with. Lists every state, so states beyond the current page are still selectable" style="margin-block: 0.3em;">
          <label><span id="statesManuallyStateLabel">Paint as: </span><select id="statesManuallyState" style="max-width: 14em"></select></label>
        </div>
        <div data-tip="Picker mode: click a whole state on the map to stage it for demotion into a single province of the state selected above (keeping its name, form, colour and emblem). Staged states are committed on Apply." style="margin-block: 0.3em;">
          <input id="statesManuallyDemote" class="checkbox" type="checkbox" />
          <label for="statesManuallyDemote" class="checkbox-label"><i>demote clicked state to a province</i></label>
        </div>
        <div data-tip="Change brush size. Shortcuts: + / ] to increase; - / [ to decrease" style="margin-block: 0.3em;">
          <slider-input id="statesBrush" min="1" max="100" value="15">Brush size:</slider-input>
        </div>
        <button id="statesManuallyUndo" data-tip="Undo last brush stroke" class="icon-ccw"></button>
        <button id="statesManuallyApply" data-tip="Apply assignment" class="icon-check"></button>
        <button id="statesManuallyCancel" data-tip="Cancel assignment" class="icon-cancel"></button>
        <div data-tip="When enabled, only neutral cells can be painted" style="display: inline-block">
          <input id="statesManuallyProtect" class="checkbox" type="checkbox" />
          <label for="statesManuallyProtect" class="checkbox-label"><i>do not overwrite existing</i></label>
        </div>
      </div>

      <button id="statesAdd" data-tip="Add a new state. Hold Shift to add multiple" class="icon-plus"></button>
      <button id="statesMerge" data-tip="Merge several states into one" class="icon-layer-group"></button>
      <button id="statesExport" data-tip="Save state-related data as a text file (.csv)" class="icon-download"></button>
    </div>
  </div>`;h(`dialogs`).insertAdjacentHTML(`beforeend`,e),me(L,B.reset),P(`statesEditor`,({cellId:e})=>pack.cells.h[e]<20?void 0:pack.cells.state[e]),h(`statesEditorRefresh`).addEventListener(`click`,V),ve({dialogId:L,columns:z,onUpdate:()=>E(L,{width:M(),position:R})}),F(L,[`type`,`expansionism`]),h(`statesEditStyle`).addEventListener(`click`,()=>editStyle(`regions`)),h(`statesLegend`).addEventListener(`click`,Re),h(`statesPercentage`).addEventListener(`click`,K),h(`statesChart`).addEventListener(`click`,ze),h(`statesRegenerate`).addEventListener(`click`,Be),h(`statesRegenerateBack`).addEventListener(`click`,He),h(`statesRecalculate`).addEventListener(`click`,()=>q(!0)),h(`statesRandomize`).addEventListener(`click`,Ve),h(`statesGrowthRate`).addEventListener(`input`,()=>q(!1)),h(`statesManually`).addEventListener(`click`,Ue),h(`statesManuallyState`).addEventListener(`change`,Y),h(`statesManuallyDemote`).addEventListener(`change`,Ge),h(`statesManuallyUndo`).addEventListener(`click`,tt),h(`statesManuallyApply`).addEventListener(`click`,Qe),h(`statesManuallyCancel`).addEventListener(`click`,()=>Z(!1)),h(`statesAdd`).addEventListener(`click`,nt),h(`statesMerge`).addEventListener(`click`,it),h(`statesExport`).addEventListener(`click`,ot),h(`statesBodySection`).addEventListener(`click`,e=>{let t=e.target,n=t.classList,r=t.closest(`.states`);if(!r)return;let i=Number(r.dataset.id);t.tagName===`FILL-BOX`?we(t):n.contains(`name`)?Te(i):n.contains(`coaIcon`)?A.EmblemsEditor.open(`state`,`stateCOA${i}`,pack.states[i]):n.contains(`icon-star-empty`)?je(i):n.contains(`icon-dot-circled`)?A.BurgsOverview.open({stateId:i}):n.contains(`statePopulation`)?ke(i):n.contains(`stateTreasury`)?Ae(i):n.contains(`icon-pin`)?Fe(i,n):n.contains(`icon-target`)?oe(d(`#regions`).select(`#state${i}`).node(),4):n.contains(`icon-trash-empty`)?Ie(i):(n.contains(`icon-lock`)||n.contains(`icon-lock-open`))&&st(i,n)}),h(`statesBodySection`).addEventListener(`input`,e=>{let t=e.target,n=t.classList,r=t.closest(`.states`);if(!r)return;let i=+r.dataset.id;n.contains(`stateCapital`)&&Oe(i,r,t.value)}),h(`statesBodySection`).addEventListener(`change`,e=>{let t=e.target,n=t.classList,r=t.closest(`.states`);if(!r)return;let i=+r.dataset.id;n.contains(`stateCulture`)?Me(i,r,t.value):n.contains(`cultureType`)?Ne(i,r,t.value):n.contains(`statePower`)&&Pe(i,r,t.value)})}function Se(){customization===2&&Z(!0),customization===3&&Q(),d(`#debug`).selectAll(`.highlight`).remove(),$(`#statesEditor`).dialog(`destroy`),h(`statesEditor`).remove()}function V(){States.collectStatistics(),B.refresh()}function Ce(e){let t=p(),r=0,i=0,a=0;for(let t of e.all){r+=_(t.area||0);let e=(t.rural||0)*populationRate,o=(t.urban||0)*populationRate*urbanization;i+=n(e+o),a+=t.burgs||0}let o=``;for(let r of e.rows){let e=_(r.area||0),i=(r.rural||0)*populationRate,a=(r.urban||0)*populationRate*urbanization,s=n(i+a),c=`Total population: ${u(s)}; Rural population: ${u(i)}; Urban population: ${u(a)}. Click to change`,l=d(`#deftemp`).select(`#fog #focusState${r.i}`).size(),f=`Current treasury: 🟡 ${u(r.treasury)}. Sales Tax: ${n((r.salesTax||0)*100,1)}%. Poll Tax: ${n((r.pollTax||0)*100,1)}%. Click to view and edit taxes`;if(!r.i){o+=`<div
        class="states"
        data-id=${r.i}
        data-name="${r.name}"
        data-cells=${r.cells}
        data-area=${e}
        data-population=${s}
        data-burgs=${r.burgs}
        data-treasury="0"
        data-color=""
        data-form=""
        data-capital=""
        data-culture=""
        data-type=""
        data-expansionism=""
      >
        <svg width="1em" height="1em" class="placeholder" data-col="color"></svg>
        <input data-tip="Neutral lands name. Click to change" class="stateName name pointer italic" value="${r.name}" readonly data-col="name" />
        <svg class="coaIcon placeholder" viewBox="0 0 200 200" data-col="emblem"></svg>
        <input class="stateForm placeholder" value="none" data-col="form" />
        <div data-col="capital">
          <span class="icon-star-empty placeholder"></span>
          <input class="stateCapital placeholder" />
        </div>
        <select class="stateCulture placeholder hide" data-col="culture">${H(0)}</select>
        <div data-col="burgs">
          <span data-tip="Click to overview neutral burgs" class="icon-dot-circled pointer hide" style="padding-right: 1px"></span>
          <div data-tip="Burgs count" class="stateBurgs hide">${r.burgs}</div>
        </div>
        <div data-col="cells">
          <span data-tip="Cells count" class="icon-check-empty hide"></span>
          <div data-tip="Cells count" class="stateCells hide">${r.cells}</div>
        </div>
        <div data-col="area">
          <span data-tip="Neutral lands area" style="padding-right: 4px" class="icon-map-o hide"></span>
          <div data-tip="Neutral lands area" class="stateArea hide">${u(e)} ${t}</div>
        </div>
        <div data-col="population">
          <span data-tip="${c}" class="icon-male hide"></span>
          <div data-tip="${c}" class="statePopulation pointer hide">${u(s)}</div>
        </div>
        <div data-tip="Neutrals collect no taxes" class="stateTreasury placeholder hide" data-col="treasury"></div>
        <select class="cultureType placeholder hide" data-col="type">${U(0)}</select>
        <div data-col="expansionism">
          <span class="icon-resize-full placeholder hide"></span>
          <input class="statePower placeholder hide" type="number" value="0" />
        </div>
        <div data-col="actions"></div>
      </div>`;continue}let p=pack.burgs[r.capital].name;ne.trigger(`stateCOA${r.i}`,r.coa),o+=`<div
      class="states"
      data-id=${r.i}
      data-name="${r.name}"
      data-form="${r.formName}"
      data-capital="${p}"
      data-color="${r.color}"
      data-cells=${r.cells}
      data-area=${e}
      data-population=${s}
      data-burgs=${r.burgs}
      data-treasury="${r.treasury}"
      data-culture=${pack.cultures[r.culture].name}
      data-type=${r.type}
      data-expansionism=${r.expansionism}
    >
      <fill-box fill="${r.color}" data-col="color"></fill-box>
      <input data-tip="State name. Click to change" class="stateName name pointer" value="${r.name}" readonly data-col="name" />
      <svg data-tip="Click to show and edit state emblem" class="coaIcon pointer" viewBox="0 0 200 200" data-col="emblem"><use href="#stateCOA${r.i}"></use></svg>
      <input data-tip="State form name. Click to change" class="stateForm name pointer" value="${r.formName}" readonly data-col="form" />
      <div data-col="capital">
        <span data-tip="State capital. Click to zoom into view" class="icon-star-empty pointer"></span>
        <input data-tip="Capital name. Click and type to rename" class="stateCapital" value="${p}" autocorrect="off" spellcheck="false" />
      </div>
      <select data-tip="Dominant culture. Click to change" class="stateCulture hide" data-col="culture">${H(r.culture)}</select>
      <div data-col="burgs">
        <span data-tip="Click to overview state burgs" style="padding-right: 1px" class="icon-dot-circled pointer hide"></span>
        <div data-tip="Burgs count" class="stateBurgs hide">${r.burgs}</div>
      </div>
      <div data-col="cells">
        <span data-tip="Cells count" class="icon-check-empty hide"></span>
        <div data-tip="Cells count" class="stateCells hide">${r.cells}</div>
      </div>
      <div data-col="area">
        <span data-tip="State area" style="padding-right: 4px" class="icon-map-o hide"></span>
        <div data-tip="State area" class="stateArea hide">${u(e)} ${t}</div>
      </div>
      <div data-col="population">
        <span data-tip="${c}" class="icon-male hide"></span>
        <div data-tip="${c}" class="statePopulation pointer hide">${u(s)}</div>
      </div>
      <div data-tip="${f}" class="stateTreasury pointer hide" data-col="treasury">🟡 ${u(r.treasury)}</div>
      <select data-tip="State type. Defines growth model. Click to change" class="cultureType hide" data-col="type">${U(r.type)}</select>
      <div data-col="expansionism">
        <span data-tip="State expansionism" class="icon-resize-full hide"></span>
        <input data-tip="Expansionism (defines competitive size). Change to re-calculate states based on new value"
          class="statePower hide" type="number" min="0" max="99" step=".1" value=${r.expansionism} />
      </div>
      <div data-col="actions">
        <span data-tip="Locate the state" class="icon-target hide"></span>
        <span data-tip="Toggle state focus" class="icon-pin ${l?``:` inactive`} hide"></span>
        <span data-tip="Lock the state to protect it from re-generation" class="icon-lock${r.lock?``:`-open`} hide"></span>
        <span data-tip="Remove the state" class="icon-trash-empty hide"></span>
      </div>
    </div>`}let s=h(`statesBodySection`);s.querySelectorAll(`:scope > .states`).forEach(e=>{e.remove()}),s.insertAdjacentHTML(`beforeend`,o),h(`statesFooterStates`).innerHTML=String(pack.states.filter(e=>e.i&&!e.removed).length),h(`statesFooterBurgs`).innerHTML=String(a),h(`statesFooterArea`).innerHTML=u(r)+t,h(`statesFooterArea`).dataset.area=String(r),h(`statesFooterPopulation`).innerHTML=u(i),h(`statesFooterPopulation`).dataset.population=String(i),he(h(`statesFooter`),e,B.goto),h(`statesBodySection`).querySelectorAll(`:scope > .states`).forEach(e=>{e.addEventListener(`mouseenter`,W),e.addEventListener(`mouseleave`,G),e.addEventListener(`click`,qe)}),h(`statesBodySection`).dataset.type===`percentage`&&(h(`statesBodySection`).dataset.type=`absolute`,K()),E(L,{width:M(),position:R})}function H(e){let t=``;return pack.cultures.forEach(n=>{n.removed||(t+=`<option ${n.i===e?`selected`:``} value="${n.i}">${n.name}</option>`)}),t}function U(e){let t=``;return[`Generic`,`River`,`Lake`,`Naval`,`Nomadic`,`Hunting`,`Highland`].forEach(n=>{t+=`<option ${e===n?`selected`:``} value="${n}">${n}</option>`}),t}function W(e){if(!C.isOn(`states`)||d(`#deftemp`).select(`#fog path`).size())return;let t=+e.target.dataset.id;if(customization||!t)return;let n=d(`#regions`).select(`#state${t}`).attr(`d`),i=d(`#debug`).append(`path`).attr(`class`,`highlight`).attr(`d`,n).attr(`fill`,`none`).attr(`stroke`,`red`).attr(`stroke-width`,1).attr(`opacity`,1).attr(`filter`,`url(#blur1)`),a=i.node().getTotalLength(),o=(a+5e3)/2,s=r(`0, ${a}`,`${a}, ${a}`);i.transition().duration(o).attrTween(`stroke-dasharray`,()=>s)}function G(){d(`#debug`).selectAll(`.highlight`).each(function(){d(this).transition().duration(1e3).attr(`opacity`,0).remove()})}function we(e){let t=e.getAttribute(`fill`)||`#ffffff`,n=+e.closest(`.states`).dataset.id;A.ColorPicker.open(t,t=>{e.fill=t,pack.states[n].color=t,C.draw(`states`),C.draw(`military`)})}function Te(e){Ee();let n=h(`stateNameEditorCustomForm`),r=h(`stateNameEditorSelectForm`);n.value=``,n.style.display===`inline-block`&&(n.style.display=`none`,r.style.display=`inline-block`);let i=pack.states[e];h(`stateNameEditor`).dataset.state=String(e),h(`stateNameEditorShort`).value=i.name||``,t(r,i.formName||``),h(`stateNameEditorFull`).value=i.fullName||``,$(`#stateNameEditor`).dialog({resizable:!1,title:`Change state name`,buttons:{Apply:function(){d(i),$(this).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}},position:{my:`center`,at:`center`,of:`svg`},close:De}),h(`stateNameEditorShortCulture`).addEventListener(`click`,a),h(`stateNameEditorShortRandom`).addEventListener(`click`,s),h(`stateNameEditorShortSpeak`).addEventListener(`click`,()=>o(h(`stateNameEditorShort`).value)),h(`stateNameEditorAddForm`).addEventListener(`click`,c),h(`stateNameEditorCustomForm`).addEventListener(`change`,c),h(`stateNameEditorFullRegenerate`).addEventListener(`click`,u),h(`stateNameEditorFullSpeak`).addEventListener(`click`,()=>o(h(`stateNameEditorFull`).value));function a(){let e=+h(`stateNameEditor`).dataset.state,t=pack.states[e].culture,n=Names.getState(Names.getCultureShort(t),t);h(`stateNameEditorShort`).value=n}function s(){let e=l(Names.nameBases.length-1),t=Names.getState(Names.getBase(e),void 0,e);h(`stateNameEditorShort`).value=t}function c(){let e=n.value,i=n.style.display===`inline-block`;n.style.display=i?`none`:`inline-block`,r.style.display=i?`inline-block`:`none`,e&&i&&t(r,e),n.value=``}function u(){let e=h(`stateNameEditorShort`).value,t=h(`stateNameEditorSelectForm`).value;h(`stateNameEditorFull`).value=n();function n(){if(!t)return e;if(!e&&t)return`The ${t}`;let n=h(`stateNameEditorFullRegenerate`),r=+n.dataset.tick;return n.dataset.tick=String(r+1),r%2?`${v(e)} ${t}`:`${t} of ${e}`}}function d(e){let t=h(`stateNameEditorShort`),n=h(`stateNameEditorSelectForm`),r=h(`stateNameEditorFull`),i=t.value!==e.name,a=n.value!==e.formName,o=r.value!==e.fullName,s=i||a||o;if(a){let t=n.selectedOptions[0].parentElement?.getAttribute(`label`)||null;t&&(e.form=t)}e.name=t.value,e.formName=n.value,e.fullName=r.value,s&&h(`stateNameEditorUpdateLabel`).checked&&(e.label?.text&&delete e.label.text,C.draw(`labels`)),V()}}function Ee(){D(`stateNameEditor`),h(`dialogs`).insertAdjacentHTML(`beforeend`,`    <div id="stateNameEditor" class="dialog" data-state="0">
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
    </div>`)}function De(){$(`#stateNameEditor`).dialog(`destroy`),h(`stateNameEditor`).remove()}function Oe(e,t,n){t.dataset.capital=n;let r=pack.states[e].capital;if(!r)return;pack.burgs[r].name=n;let i=pack.burgs[r];i&&(i.label||={},Object.assign(i.label,{text:n}),drawLabels())}function ke(e){let t=pack.states[e];if(!t.cells){w(`State does not have any cells, cannot change population`,!1,`error`);return}let r=n((t.rural||0)*populationRate),i=n((t.urban||0)*populationRate*urbanization),a=r+i,o=e=>Number(e).toLocaleString();alertMessage.innerHTML=`<div>
    <i>Change population of all cells assigned to the state</i>
    <div style="margin: 0.5em 0">
      Rural: <input type="number" min="0" step="1" id="ruralPop" value=${r} style="width:6em" />
      Urban: <input type="number" min="0" step="1" id="urbanPop" value=${i} style="width:6em" />
    </div>
    <div>Total population: ${o(a)} ⇒ <span id="totalPop">${o(a)}</span>
      (<span id="totalPopPerc">100</span>%)
    </div>
  </div>`;let s=h(`ruralPop`),c=h(`urbanPop`),l=h(`totalPop`),u=h(`totalPopPerc`),d=()=>{let e=s.valueAsNumber+c.valueAsNumber;Number.isNaN(e)||(l.innerHTML=o(e),u.innerHTML=String(n(e/a*100)))};s.oninput=()=>d(),c.oninput=()=>d(),$(`#alert`).dialog({resizable:!1,title:`Change state population`,width:`24em`,buttons:{Apply:function(){f(),$(this).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}},position:{my:`center`,at:`center`,of:`svg`}});function f(){let t=+s.value/r;if(Number.isFinite(t)&&t!==1&&pack.cells.i.filter(t=>pack.cells.state[t]===e).forEach(e=>{pack.cells.pop[e]*=t}),!Number.isFinite(t)&&+s.value>0){let t=+s.value/populationRate,n=pack.cells.i.filter(t=>pack.cells.state[t]===e),r=t/n.length;n.forEach(e=>{pack.cells.pop[e]=r})}let a=+c.value/i;if(Number.isFinite(a)&&a!==1&&pack.burgs.filter(t=>!t.removed&&t.state===e).forEach(e=>{e.population=n((e.population||0)*a,4)}),!Number.isFinite(a)&&+c.value>0){let t=+c.value/populationRate/urbanization,r=pack.burgs.filter(t=>!t.removed&&t.state===e),i=n(t/r.length,4);r.forEach(e=>{e.population=i})}C.draw(`population`),V()}}function Ae(e){let t=pack.states[e];if(!e||!t||t.removed)return;let r=n(t.pollTax*((t.rural||0)+(t.urban||0)),2),i=pack.deals.reduce((t,n)=>{if(!n.tax)return t;let r=0;if(n.sellerType===`burg`)r=pack.burgs[n.seller]?.state||0;else if(n.sellerType===`market`){let e=Markets.get(n.seller)?.centerBurgId;r=e&&pack.burgs[e]?.state||0}return r===e?t+n.tax:t},0);alertMessage.innerHTML=`<div data-tip="Sales tax is applied to deals with a seller from the state. Poll tax is applied to all population of the state. Tax changes take effect on Production regeneration" style="margin: 0.6em 0; display: grid; grid-template-columns: 7em auto auto; row-gap: 0.4em; align-items: center">
      <label for="stateSalesTaxInput">Sales Tax:</label>
      <input id="stateSalesTaxInput" type="number" min="0" max="1" step="0.01" value="${t.salesTax}" style="width: 6em"/> = ${g(i)}
      <label for="statePollTaxInput">Poll Tax:</label>
      <input id="statePollTaxInput" type="number" min="0" max="10" step="0.01" value="${t.pollTax}" style="width: 6em"/> = ${g(r)}
      <label for="stateTreasuryInput">Treasury:</label>
      <input id="stateTreasuryInput" type="number" step="1" value="${t.treasury}" style="width: 6em" />
    </div>`,$(`#alert`).dialog({resizable:!1,title:`Taxes and Treasury: ${t.name}`,width:`26em`,buttons:{Apply:function(){let e=h(`stateSalesTaxInput`),r=h(`statePollTaxInput`),i=h(`stateTreasuryInput`),a=Math.max(0,Math.min(1,+e.value)),o=Math.max(0,+r.value),s=+i.value;Number.isFinite(a)&&(t.salesTax=n(a,4)),Number.isFinite(o)&&(t.pollTax=n(o,4)),Number.isFinite(s)&&(t.treasury=n(s,2)),V(),$(this).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}},position:{my:`center`,at:`center`,of:`svg`}})}function je(e){let t=pack.states[e].capital,{x:n,y:r}=pack.burgs[t];zoomTo(n,r,8,2e3)}function Me(e,t,n){pack.states[e].culture=+n,t.dataset.base=String(+n)}function Ne(e,t,n){pack.states[e].type=n,t.dataset.type=n,q()}function Pe(e,t,n){pack.states[e].expansionism=Number(n),t.dataset.expansionism=n,q()}function Fe(e,t){if(customization)return;let n=d(`#statesBody`).select(`#state${e}`).attr(`d`),r=`focusState${e}`;t.contains(`inactive`)?re(r,n):S(r),t.toggle(`inactive`)}function Ie(e){customization||de({title:`Remove state`,message:`Are you sure you want to remove the state? <br>This action cannot be reverted`,confirm:`Remove`,onConfirm:()=>Le(e)})}function Le(e){d(`#statesBody`).select(`#state${e}`).remove(),d(`#statesBody`).select(`#state-gap${e}`).remove(),d(`#statesHalo`).select(`#state-border${e}`).remove(),delete pack.states[e].label,S(`focusState${e}`),pack.burgs.forEach(t=>{t.state===e&&(t.state=0,t.capital&&(t.capital=0,Burgs.changeGroup(t,null)))}),C.draw(`burgIcons`,`labels`),pack.cells.state.forEach((t,n)=>{t===e&&(pack.cells.state[n]=0)}),x(`state`,e),(pack.states[e].provinces||[]).forEach(e=>{pack.provinces[e]={i:e,removed:!0},pack.cells.province.forEach((t,n)=>{t===e&&(pack.cells.province[n]=0)}),x(`province`,e);let t=d(`#provs`).select(`#provincesBody`);t.select(`#province${e}`).remove(),t.select(`#province-gap${e}`).remove()}),(pack.states[e].military||[]).forEach(t=>{let n=`regiment${e}-${t.i}`,r=notes.findIndex(e=>e.id===n);r!==-1&&notes.splice(r,1)}),d(`#armies g#army${e}`).remove(),pack.states.forEach(t=>{t.i&&!t.removed&&t.neighbors&&(t.neighbors=t.neighbors.filter(t=>t!==e))}),pack.states[e]={i:e,removed:!0},d(`#debug`).selectAll(`.highlight`).remove(),C.draw(`states`,`borders`,`provinces`),V()}function Re(){if(d(`#legend`).selectAll(`*`).size()){ie();return}let e=pack.states.filter(e=>e.i&&!e.removed&&e.cells).sort((e,t)=>(t.area??0)-(e.area??0)).map(e=>[e.i,e.color,e.name]);y(`States`,e)}function K(){if(h(`statesBodySection`).dataset.type===`absolute`){h(`statesBodySection`).dataset.type=`percentage`;let e=+h(`statesFooterBurgs`).innerText,t=+h(`statesFooterArea`).dataset.area,r=+h(`statesFooterPopulation`).dataset.population,i=pack.states.reduce((e,t)=>e+(t.treasury||0),0),a=pack.states.reduce((e,t)=>e+(t.i&&!t.removed&&t.cells||0),0);h(`statesBodySection`).querySelectorAll(`:scope > .states`).forEach(o=>{let{burgs:s,area:c,population:l,treasury:u,cells:d}=o.dataset;o.querySelector(`.stateBurgs`).innerText=`${n(+s/e*100)}%`,o.querySelector(`.stateCells`).innerText=`${n(+d/a*100)}%`,o.querySelector(`.stateArea`).innerText=`${n(+c/t*100)}%`,o.querySelector(`.statePopulation`).innerText=`${n(+l/r*100)}%`,o.querySelector(`.stateTreasury`).innerText=`${n(+u/i*100,2)}%`})}else h(`statesBodySection`).dataset.type=`absolute`,B.refresh()}function ze(){let e=pack.states.filter(e=>!e.removed);if(e.length<2){w(`There are no states to show`,!1,`error`);return}let t=se().id(e=>String(e.i)).parentId(e=>e.i?`0`:null)(e).sum(e=>e.area).sort((e,t)=>t.value-e.value),r=150+200*h(`uiSize`).valueAsNumber,i={top:0,right:-50,bottom:0,left:-50},a=r-i.left-i.right,o=r-i.top-i.bottom,c=ce().size([a,o]).padding(3);alertMessage.innerHTML=`<select id="statesTreeType" style="display:block; margin-left:13px; font-size:11px">
    <option value="area" selected>Area</option>
    <option value="population">Total population</option>
    <option value="rural">Rural population</option>
    <option value="urban">Urban population</option>
    <option value="burgs">Burgs number</option>
  </select>`,alertMessage.innerHTML+=`<div id='statesInfo' class='chartInfo'>&#8205;</div>`;let l=d(`#alertMessage`).insert(`svg`,`#statesInfo`).attr(`id`,`statesTree`).attr(`width`,r).attr(`height`,r).style(`font-family`,`Almendra SC`).attr(`text-anchor`,`middle`).attr(`dominant-baseline`,`central`).append(`g`).attr(`transform`,`translate(-50, 0)`);h(`statesTreeType`).addEventListener(`change`,y),c(t);let f=l.selectAll(`g`).data(t.leaves()).enter().append(`g`).attr(`transform`,e=>`translate(${e.x},${e.y})`).attr(`data-id`,e=>e.data.i).on(`mouseenter`,(e,t)=>v(e,t)).on(`mouseleave`,e=>ee(e));f.append(`circle`).attr(`fill`,e=>e.data.color).attr(`r`,e=>e.r);let m=/(?=[A-Z][^A-Z])/g,g=e=>(s(e.split(m).map(e=>e.length))??0)+1;f.append(`text`).attr(`text-rendering`,`optimizeSpeed`).style(`font-size`,e=>`${n(e.r**.97*4/g(e.data.name),2)}px`).selectAll(`tspan`).data(e=>e.data.name.split(m)).join(`tspan`).attr(`x`,0).text(e=>e).attr(`dy`,(e,t,n)=>`${t?1:(n.length-1)/-2}em`);function v(e,t){d(e.target).select(`circle`).classed(`selected`,!0);let r=t.data.fullName,i=`${_(t.data.area)} ${p()}`,a=n(t.data.rural*populationRate),o=n(t.data.urban*populationRate*urbanization),s=h(`statesTreeType`).value,c=s===`area`?`Area: ${i}`:s===`rural`?`Rural population: ${u(a)}`:s===`urban`?`Urban population: ${u(o)}`:s===`burgs`?`Burgs number: ${t.data.burgs}`:`Population: ${u(a+o)}`;h(`statesInfo`).innerHTML=`${r}. ${c}`,W(e)}function ee(e){G(),document.getElementById(`statesInfo`)&&(h(`statesInfo`).innerHTML=`&#8205;`,d(e.target).select(`circle`).classed(`selected`,!1))}function y(){let e=this.value===`area`?e=>e.area:this.value===`rural`?e=>e.rural:this.value===`urban`?e=>e.urban:this.value===`burgs`?e=>e.burgs:e=>e.rural+e.urban;t.sum(e),f.data(c(t).leaves()),f.transition().duration(1500).attr(`transform`,e=>`translate(${e.x},${e.y})`),f.select(`circle`).transition().duration(1500).attr(`r`,e=>e.r),f.select(`text`).transition().duration(1500).style(`font-size`,e=>`${n(e.r**.97*4/g(e.data.name),2)}px`)}$(`#alert`).dialog({title:`States bubble chart`,width:M(),position:{my:`left bottom`,at:`left+10 bottom-10`,of:`svg`},buttons:{},close:()=>{alertMessage.innerHTML=``}})}function Be(){h(`statesBottom`).querySelectorAll(`:scope > button`).forEach(e=>{e.style.display=`none`}),h(`statesRegenerateButtons`).style.display=`block`,F(`statesEditor`,[]),$(`#statesEditor`).dialog({position:{my:`right top`,at:`right-10 top+10`,of:`svg`,collision:`fit`}})}function q(e){if(e||h(`statesAutoChange`).checked){if(States.expandStates(),Provinces.generate(),Provinces.getPoles(),States.getPoles(),C.draw(`states`,`borders`,`provinces`,`goods`,`emblems`),h(`adjustLabels`).checked){for(let e of pack.states)e.label&&(e.label.pathPoints=void 0);C.draw(`labels`)}V()}}function Ve(){pack.states.forEach(e=>{if(!e.i||e.removed)return;let t=n(Math.random()*4+1,1);e.expansionism=t;let r=h(`statesBodySection`).querySelector(`div.states[data-id='${e.i}'] input.statePower`);r&&(r.value=String(t))}),q(!0)}function He(){h(`statesBottom`).querySelectorAll(`:scope > button`).forEach(e=>{e.style.display=`inline-block`}),h(`statesRegenerateButtons`).style.display=`none`,F(`statesEditor`,[`type`,`expansionism`]),$(`#statesEditor`).dialog({position:{my:`right top`,at:`right-10 top+10`,of:`svg`,collision:`fit`}})}function Ue(){C.show(`states`),customization=2,B.reset(),d(`#statesBody`).append(`g`).attr(`id`,`temp`),document.querySelectorAll(`#statesBottom > button`).forEach(e=>{e.style.display=`none`}),h(`statesManuallyButtons`).style.display=`inline-block`,h(`statesHalo`).style.display=`none`,h(`statesEditor`).querySelectorAll(`.hide:not([data-col])`).forEach(e=>{e.classList.add(`hidden`)}),h(`statesFooter`).style.display=`none`,h(`statesBodySection`).querySelectorAll(`div > input, select, span, svg`).forEach(e=>{e.style.pointerEvents=`none`}),$(`#statesEditor`).dialog({position:{my:`right top`,at:`right-10 top+10`,of:`svg`,collision:`fit`}}),We(),Y(),h(`statesManuallyDemote`).checked=!1,Ge(),w(`Pick a state to paint with, then drag the circle. Click the map to pick the state under the cursor`,!0),d(`#viewbox`).style(`cursor`,`crosshair`).on(`click`,Je).call(ae().on(`start`,Ye)).on(`touchmove mousemove`,Ze),I=[]}function We(){let e=h(`statesManuallyState`);e&&(e.innerHTML=j(L,pack.states.filter(e=>!e.removed),z).map(e=>`<option value="${e.i}">${e.i?e.fullName:e.name}</option>`).join(``))}function J(){let e=h(`statesManuallyState`);return e&&e.value!==``?+e.value:0}function Y(){let e=J();h(`statesBodySection`).querySelector(`div.selected`)?.classList.remove(`selected`),h(`statesBodySection`).querySelector(`div[data-id='${e}']`)?.classList.add(`selected`)}function X(){return!!h(`statesManuallyDemote`)?.checked}function Ge(){let e=h(`statesManuallyStateLabel`);e&&(e.textContent=X()?`Demote into: `:`Paint as: `)}function Ke(e){let t=J();if(!e){w(`Neutral land cannot be demoted to a province`,!1,`error`);return}if(!t){w(`Pick a receiving state from the dropdown first`,!1,`error`);return}if(t===e){w(`A state cannot be demoted into itself`,!1,`error`);return}et();let n=statesBody.select(`#temp`),r=pack.states[t].color||`#ffffff`,{state:i,h:a}=pack.cells;for(let o=0;o<i.length;o++){if(i[o]!==e||a[o]<20)continue;let s=n.select(`polygon[data-cell='${o}']`);s.size()?s.attr(`data-state`,t).attr(`data-demote`,e).attr(`fill`,r).attr(`stroke`,r):n.append(`polygon`).attr(`data-cell`,o).attr(`data-state`,t).attr(`data-demote`,e).attr(`points`,String(Pack.getPolygon(o))).attr(`fill`,r).attr(`stroke`,r)}w(`${pack.states[e].fullName} staged to become a province of ${pack.states[t].name}. Apply to commit`,!0)}function qe(){if(customization!==2||this.parentNode.id!==`statesBodySection`)return;let e=h(`statesManuallyState`);e&&(e.value=this.dataset.id),Y()}function Je(e){let t=i(e,this),n=Pack.findCell(t[0],t[1]);if(pack.cells.h[n]<20)return;if(X()){Ke(pack.cells.state[n]);return}let r=d(`#statesBody`).select(`#temp`).select(`polygon[data-cell='${n}']`),a=r.size()?+r.attr(`data-state`):pack.cells.state[n],o=h(`statesManuallyState`);o&&(o.value=String(a)),Y()}function Ye(e){if(X())return;let t=+h(`statesBrush`).value;et(),e.on(`drag`,e=>{if(!e.dx&&!e.dy)return;let n=i(e,this);k(n[0],n[1],t);let r=(t>5?Pack.findAll(n[0],n[1],t):[Pack.findCell(n[0],n[1])]).filter(e=>e!==void 0&&le(e,pack));r&&Xe(r)})}function Xe(e){let t=d(`#statesBody`).select(`#temp`),n=J(),r=pack.states[n].color||`#ffffff`,i=document.getElementById(`statesManuallyProtect`)?.checked;e.forEach(e=>{let a=t.select(`polygon[data-cell='${e}']`),o=a.size()?+a.attr(`data-state`):pack.cells.state[e];n!==o&&(i&&o||e!==pack.states[o].center&&(a.size()?a.attr(`data-state`,n).attr(`fill`,r).attr(`stroke`,r):t.append(`polygon`).attr(`data-cell`,e).attr(`data-state`,n).attr(`points`,String(Pack.getPolygon(e))).attr(`fill`,r).attr(`stroke`,r)))})}function Ze(e){ue();let t=i(e,this),n=+h(`statesBrush`).value;k(t[0],t[1],n)}function Qe(){let{cells:e}=pack,t=[],n=[],r=new Map;if(d(`#statesBody`).select(`#temp`).selectAll(`polygon`).each(function(){if(this.dataset.demote){let e=+this.dataset.state,t=+this.dataset.demote;e&&t&&e!==t&&(r.has(e)||r.set(e,new Set),r.get(e).add(t));return}let i=+this.dataset.cell,a=+this.dataset.state;t.push(e.state[i],a),n.push(e.province[i]),e.state[i]=a,e.burg[i]&&(pack.burgs[e.burg[i]].state=a)}),t.length){if(States.getPoles(),$e([...new Set(n)]),C.draw(`states`,`borders`,`provinces`),h(`adjustLabels`).checked){let e=[...new Set(t)];for(let t of e)pack.states[t].label&&delete pack.states[t].label;C.draw(`labels`)}V()}Z(!1),r.forEach((e,t)=>{let n=[...e].filter(e=>pack.states[e]&&!pack.states[e].removed);n.length&&at(n,t,!0)})}function $e(e){let{cells:t,provinces:n,states:r,burgs:i}=pack,a=[];e.forEach(e=>{if(!n[e])return;let r=t.i.filter(n=>t.province[n]===e),i=[...new Set(r.map(e=>t.state[e]))];if(e&&i.length===1){o(e,i[0],r);return}s(e,i,r)}),te(a.map(e=>[`province`,e]));function o(e,i,a){let o=n[e],s=r[o.state];s.provinces=s.provinces.filter(t=>t!==e),i?(o.state=i,r[i].provinces.push(e)):(n[e]={i:e,removed:!0},x(`province`,e),a.forEach(e=>{t.province[e]=0}))}function s(e,i,a){let o=n[e],s=r[o.state],u=t.state[o.center];i.forEach(i=>{let d=a.filter(e=>t.state[e]===i);if(i===u){if(i===s.i)return;if(!i){n[e]={i:e,removed:!0},x(`province`,e),d.forEach(e=>{t.province[e]=0});return}s.provinces=s.provinces.filter(t=>t!==e),o.state=i,o.color=m(r[i].color),r[i].provinces.push(e);return}if(!i){d.forEach(e=>{t.province[e]=0});return}if(d.length<20){let n=l(e,i,d);if(n){d.forEach(e=>{t.province[e]=n});return}}c(o,i,d)})}function c(e,o,s){let c=n.length,l=s.find(e=>t.burg[e]),u=l||s[0],d=l?t.burg[l]:0,p=d?i[d]:null,h=t.culture[u],g=l&&f(.5),_=g?p.name:e.name||Names.getState(Names.getCultureShort(h),h),v=l&&e.formName?e.formName:ee([`Zone`,`Area`,`Territory`,`Province`]),y=m(r[o].color),te=g?.8:.4,b=Burgs.getType(u,p?.port),x=O.generate(p?.coa||r[o].coa,te,p?null:.9,b);x.shield=O.getShield(h,o),n.push({i:c,state:o,center:u,burg:d,name:_,formName:v,fullName:`${_} ${v}`,color:y,coa:x}),s.forEach(e=>{t.province[e]=c}),r[o].provinces.push(c),a.push(c)}function l(e,n,r){let i=r.find(r=>t.c[r].some(r=>t.state[r]===n&&t.province[r]&&t.province[r]!==e));return i&&t.c[i].map(e=>t.province[e]).find(t=>t&&t!==e)}}function Z(e){customization=0,I=[],d(`#statesBody`).select(`#temp`).remove(),pe(),document.querySelectorAll(`#statesBottom > button`).forEach(e=>{e.style.display=`inline-block`}),h(`statesManuallyButtons`).style.display=`none`,h(`statesHalo`).style.display=`block`,h(`statesEditor`).querySelectorAll(`.hide:not([data-col])`).forEach(e=>{e.classList.remove(`hidden`)}),h(`statesFooter`).style.display=`flex`,h(`statesBodySection`).querySelectorAll(`div > input, select, span, svg`).forEach(e=>{e.style.removeProperty(`pointer-events`)}),e||$(`#statesEditor`).dialog({position:{my:`right top`,at:`right-10 top+10`,of:`svg`,collision:`fit`}}),N(),T();let t=h(`statesBodySection`).querySelector(`div.selected`);t&&t.classList.remove(`selected`)}function et(){let e=d(`#statesBody`).select(`#temp`).node();e&&(I.push(e.innerHTML),I.length>100&&I.shift())}function tt(){let e=d(`#statesBody`).select(`#temp`).node();e&&I.length&&(e.innerHTML=I.pop())}function nt(){if(this.classList.contains(`pressed`)){Q();return}customization=3,this.classList.add(`pressed`),w(`Click on the map to create a new capital or promote an existing burg`,!0),d(`#viewbox`).style(`cursor`,`crosshair`).on(`click`,rt),h(`statesBodySection`).querySelectorAll(`div > input, select, span, svg`).forEach(e=>{e.style.pointerEvents=`none`})}function rt(e){let{cells:t,states:n,burgs:r}=pack,a=i(e,this),o=Pack.findCell(a[0],a[1]);if(t.h[o]<20){w(`You cannot place state into the water. Please click on a land cell`,!1,`error`);return}let s=t.burg[o];if(s&&r[s].capital){w(`Existing capital cannot be selected as a new state capital! Select other cell`,!1,`error`);return}s||(s=Burgs.add(a),b(`burg`,s));let l=t.state[o],u=n.length;r[s].capital=1,r[s].state=u,Burgs.changeGroup(r[s],null),C.draw(`burgIcons`,`labels`,`routes`),e.shiftKey===!1&&Q();let d=t.culture[o],f=o%5==0?r[s].name:Names.getCulture(d),p=Names.getState(f,d),m=c(),h=pack.cultures[d].type,g=O.generate(r[s].coa,.4,null,h);g.shield=O.getShield(d,void 0);let _=n.map(e=>{if(!e.i||e.removed)return`x`;if(!l)return e.diplomacy.push(`Neutral`),`Neutral`;let t=n[l].diplomacy[e.i];return e.i===l?t=`Enemy`:t===`Ally`||t===`Friendly`?t=`Suspicion`:t===`Suspicion`?t=`Neutral`:t===`Enemy`||t===`Rival`?t=`Friendly`:t===`Vassal`?t=`Suspicion`:t===`Suzerain`&&(t=`Enemy`),e.diplomacy.push(t),t});_.push(`x`),n[0].diplomacy.push([`Independance declaration`,`${p} declared its independance from ${n[l].name}`]),t.state[o]=u,t.province[o]=0,n.push({i:u,name:p,diplomacy:_,provinces:[],color:m,expansionism:.5,capital:s,type:`Generic`,center:o,culture:d,military:[],alert:1,coa:g}),States.getPoles(),States.findNeighbors(),States.collectStatistics(),States.defineStateForms([u]),$e([t.province[o]]),C.draw(`labels`),b(`state`,u),C.hide(`provinces`),C.show(`states`,`borders`),B.refresh()}function Q(){customization=0,N(),T(),h(`statesBodySection`).querySelectorAll(`div > input, select, span, svg`).forEach(e=>{e.style.removeProperty(`pointer-events`)});let e=h(`statesAdd`);e.classList.contains(`pressed`)&&e.classList.remove(`pressed`)}function it(){let e=e=>`<svg class="coaIcon" viewBox="0 0 200 200"><use href="#stateCOA${e}"></use></svg>`,t=j(L,pack.states.filter(e=>e.i&&!e.removed),z).map(t=>`
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
      <label style="display:flex; align-items:center; gap:.4em; margin:0; cursor:pointer">
        <input id="mergeStatesToProvinces" type="checkbox" name="mergeToProvinces" class="native" />
        <span>Merge <b>down to provinces</b>: instead of dissolving the selected states, demote each one into a single province of the ruling state (keeping its name, color and emblem).</span>
      </label>
      <main style='display: grid; grid-template-columns: 1fr 1fr; gap: .3em;'>
        ${t}
      </main>
    </form>
  `,h(`mergeStatesForm`).querySelectorAll(`div[data-id]`).forEach(e=>{e.addEventListener(`mouseenter`,n),e.addEventListener(`mouseleave`,G)}),P(`mergeStatesForm`,({cellId:e})=>pack.cells.state[e]);function n(e){if(!C.isOn(`states`))return;let t=+e.currentTarget.dataset.id;if(!t)return;let n=d(`#regions`).select(`#state${t}`).attr(`d`);if(!n)return;G();let i=d(`#debug`).append(`path`).attr(`class`,`highlight`).attr(`d`,n).attr(`fill`,`none`).attr(`stroke`,`red`).attr(`stroke-width`,1).attr(`opacity`,1).attr(`filter`,`url(#blur1)`),a=i.node().getTotalLength(),o=(a+5e3)/2,s=r(`0, ${a}`,`${a}, ${a}`);i.transition().duration(o).attrTween(`stroke-dasharray`,()=>s)}$(`#alert`).dialog({width:600,title:`Merge states`,close:G,buttons:{Merge:function(){let t=new FormData(h(`mergeStatesForm`)),n=Number(t.get(`rulingState`));if(!n){w(`Please select a state to merge into`,!1,`error`);return}let r=pack.states[n],i=t.getAll(`statesToMerge`).map(Number).filter(e=>e!==n);if(!i.length){w(`Please select several states to merge`,!1,`error`);return}let a=t.has(`mergeToProvinces`),o=i.map(t=>`${e(t)}${pack.states[t].name}`).join(`, `),s=a?`
            <p>The following states will lose their state status and each become a single <strong>province</strong> of ${e(r.i)}${r.name}: ${o}.</p>
            <p>Their burgs, regiments and lands (along with any existing internal provinces, which are collapsed into the new province) will be assigned to ${e(r.i)}${r.name}.</p>
            <p>Are you sure you want to merge states? This action cannot be reverted.</p>`:`
            <p>The following states will be <strong>removed</strong>: ${o}.</p>
            <p>Removed states data (burgs, provinces, regiments) will be assigned to ${e(r.i)}${r.name}.</p>
            <p>Are you sure you want to merge states? This action cannot be reverted.</p>`;de({title:`Merge states`,message:s,confirm:`Merge`,onConfirm:()=>{at(i,n,a),$(this).dialog(`close`)}})},Cancel:function(){$(this).dialog(`close`)}}})}function at(e,t,n=!1){let r=pack.states[t],i=document.getElementById(`army${t}`);function a(e){let n=pack.states[e],i=pack.provinces.length;pack.provinces.forEach(t=>{t.i&&!t.removed&&t.state===e&&(x(`province`,t.i),pack.provinces[t.i]={i:t.i,removed:!0})}),pack.cells.state.forEach((t,n)=>{t===e&&(pack.cells.province[n]=i)});let a=n.capital||0,o=a?pack.burgs[a].cell:n.center,s=n.name,c=n.formName||`Province`,l=`${s} ${c}`,u=m(n.color),d=n.coa,f=n.pole||pack.cells.p[o];pack.provinces.push({i,state:t,center:o,burg:a,name:s,formName:c,fullName:l,color:u,coa:d,pole:f}),r.provinces=r.provinces||[],r.provinces.push(i),b(`province`,i)}e.forEach(e=>{let o=pack.states[e];o.removed=!0,d(`#statesBody`).select(`#state${e}`).remove(),d(`#statesBody`).select(`#state-gap${e}`).remove(),d(`#statesHalo`).select(`#state-border${e}`).remove(),delete pack.states[e].label,x(`state`,e),(o.military||[]).forEach(n=>{let a=`regiment${e}-${n.i}`,o=(r.military||[]).length;(r.military||[]).push({...n,i:o});let s=`regiment${t}-${o}`,c=notes.find(e=>e.id===a);c&&(c.id=s);let l=document.getElementById(a);l&&(l.id=s,l.dataset.state=String(t),l.dataset.id=String(o),i?.appendChild(l))}),armies.select(`g#army${e}`).remove(),n&&a(e)}),pack.burgs.forEach(r=>{e.includes(r.state??0)&&(r.capital&&(r.capital=0,n||Burgs.changeGroup(r,null)),r.state=t)}),pack.provinces.forEach(n=>{e.includes(n.state)&&(n.state=t)}),pack.cells.state.forEach((n,r)=>{e.includes(n)&&(pack.cells.state[r]=t)}),S(),d(`#debug`).selectAll(`.highlight`).remove(),States.getPoles(),C.show(`states`,`borders`),n?(Provinces.getPoles(),C.show(`provinces`)):C.draw(`provinces`),pack.states[t].label||delete pack.states[t].label,drawLabels(),V()}function ot(){let t=`Id,State,Full Name,Form,Color,Capital,Culture,Type,Expansionism,Cells,Burgs,Area ${p(`2`)},Total Population,Rural Population,Urban Population`,r=B.view().all.map(e=>{let t=e.rural||0,r=e.urban||0,i=n(t*populationRate+r*populationRate*urbanization);return[e.i,e.name,e.fullName||``,e.i?e.formName:``,e.i?e.color:``,e.i?pack.burgs[e.capital].name:``,e.i?pack.cultures[e.culture].name:``,e.i?e.type:``,e.i?e.expansionism:``,e.cells,e.burgs,_(e.area||0),i,Math.round(t*populationRate),Math.round(r*populationRate*urbanization)].join(`,`)}),i=[t].concat(r).join(`
`),o=`${e(`States`)}.csv`;a(i,o)}function st(e,t){let n=pack.states[e];n.lock=!n.lock,t.toggle(`icon-lock-open`),t.toggle(`icon-lock`)}var ct={open:be};export{ct as StatesEditor};