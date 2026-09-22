import{C as e,Et as t,J as n,S as r,Vt as i,at as a,d as o,dn as s,i as c,k as l,r as u}from"./utils-BXw8fBj4.js";import{C as d,t as f,x as p}from"./layers-_nptVsMl.js";import{t as m}from"./sum-BpJJqxFM.js";import{t as h}from"./sin-DXK16t1M.js";import{t as g}from"./heightUtils-BfaaFPbS.js";import{r as _}from"./tooltips-0xeyl30m.js";import{a as v,r as y,t as ee}from"./dialog-helpers-DT2MP2B1.js";import{t as b}from"./population-generator-BP39CcGH.js";import{P as x,b as S,y as C}from"./index-CHSGsxIV.js";import{t as w}from"./highlighting-DTBMtNB_.js";import{i as T,n as E,r as D,t as O}from"./table-CN7n7WQR.js";var k=`biomesEditor`,A={my:`right top`,at:`right-10 top+10`,of:`svg`,collision:`fit`},j=[],M=[{key:`name`,label:`Biome`,width:`15em`,permanent:!0,sortBy:e=>e.name,sortType:`alpha`},{key:`habitability`,label:`Habitability`,width:`6.5em`,sortBy:e=>e.habitability},{key:`cells`,label:`Cells`,width:`5em`,sortBy:e=>j[e.i]?.cells??0,defaultSort:`desc`},{key:`area`,label:`Area`,width:`7em`,mobileHidden:!0,sortBy:e=>j[e.i]?.area??0},{key:`population`,label:`Population`,width:`6.2em`,mobileHidden:!0,sortBy:e=>{let t=j[e.i];return t?t.rural+t.urban:0}},{key:`actions`,width:`2em`,permanent:!0}],N=E({getData:()=>S(k,pack.biomes.filter(e=>e.i&&!e.removed),M),onUpdate:e=>z(e,j)});function P(){customization||(ee(`#${k}, .stable`),f.show(`biomes`),f.hide(`states`,`cultures`),f.hide(`religions`,`provinces`),F(),j=R(),N.reset(),$(`#${k}`).dialog({title:`Biomes Editor`,resizable:!1,close:ae,position:A}))}function F(){y(k);let e=`<div id="${k}" class="dialog stable editorDialog">
      ${D({dialogId:k,columns:M})}
      <div id="biomesBody" class="table" data-type="absolute"></div>
      <div id="biomesFooter" class="totalLine">
        <div data-tip="Number of land biomes" style="margin-left: 12px">
          Biomes:&nbsp;<span id="biomesFooterBiomes">0</span>
        </div>
        <div data-col="cells" data-tip="Total land cells number" style="margin-left: 12px">
          Cells:&nbsp;<span id="biomesFooterCells">0</span>
        </div>
        <div data-col="area" data-tip="Total land area" style="margin-left: 12px">
          Land Area:&nbsp;<span id="biomesFooterArea">0</span>
        </div>
        <div data-col="population" data-tip="Total population" style="margin-left: 12px">
          Population:&nbsp;<span id="biomesFooterPopulation">0</span>
        </div>
      </div>
      <div id="biomesBottom">
        <button id="biomesEditorRefresh" data-tip="Refresh the Editor" class="icon-cw"></button>
        <button id="biomesEditStyle" data-tip="Edit biomes style in Style Editor" class="icon-adjust"></button>
        <button id="biomesLegend" data-tip="Toggle Legend box" class="icon-list-bullet"></button>
        <button
          id="biomesPercentage"
          data-tip="Toggle percentage / absolute values views"
          class="icon-percent"
        ></button>
        <button
          id="biomesManually"
          data-tip="Manually re-assign biomes to not follow the default moisture/temperature pattern"
          class="icon-brush"
        ></button>
        <button id="biomesAdd" data-tip="Add a custom biome" class="icon-plus"></button>
        <button
          id="biomesRestore"
          data-tip="Restore the defaults and re-define biomes based on current moisture and temperature"
          class="icon-history"
        ></button>
        <button
          id="biomesExport"
          data-tip="Save biomes-related data as a text file (.csv)"
          class="icon-download"
        ></button>
      </div>
    </div>`;l(`dialogs`).insertAdjacentHTML(`beforeend`,e),O({dialogId:k,columns:M,onUpdate:()=>v(k,{width:`fit-content`,position:A})}),l(`biomesEditorRefresh`).addEventListener(`click`,I),l(`biomesEditStyle`).addEventListener(`click`,()=>editStyle(`biomes`)),l(`biomesLegend`).addEventListener(`click`,K),l(`biomesPercentage`).addEventListener(`click`,q),l(`biomesManually`).addEventListener(`click`,ne),l(`biomesRestore`).addEventListener(`click`,ie),l(`biomesAdd`).addEventListener(`click`,X),l(`biomesExport`).addEventListener(`click`,te),C(k,N.reset),w(k,({cellId:e})=>e&&pack.cells.biome[e]),l(`biomesBody`).addEventListener(`click`,e=>{let t=e.target,n=t.classList;t.tagName===`FILL-BOX`?H(t):n.contains(`icon-info-circled`)?G(t):n.contains(`icon-trash-empty`)&&Z(t)}),l(`biomesBody`).addEventListener(`change`,e=>{let t=e.target,n=t.classList;n.contains(`biomeName`)?U(t):n.contains(`biomeHabitability`)&&W(t)})}function I(){j=R(),N.refresh()}function L(e=pack){let{cells:t}=e,n=e.biomes.map(()=>({cells:0,area:0,rural:0,urban:0}));for(let r of t.i){if(t.h[r]<20)continue;let i=n[t.biome[r]];i.cells++,i.area+=t.area[r],i.rural+=t.pop[r];let a=t.burg[r]?e.burgs[t.burg[r]]:null;a&&(i.urban+=a.population??0)}return n}function R(){return L(pack)}function z(e,n){let r=` ${c()}`,i=``,a=0,s=0;for(let a of e.rows){let{i:e,name:s,color:c,habitability:l}=a,{cells:d,area:f,rural:p,urban:m}=n[e],h=u(f),g=p*populationRate,_=m*populationRate*urbanization,v=t(g+_),y=`Total population: ${o(v)}; Rural population: ${o(g)}; Urban population: ${o(_)}`;i+=`
      <div
        class="states biomes"
        data-id="${e}"
        data-name="${s}"
        data-habitability="${l}"
        data-cells=${d}
        data-area=${h}
        data-population=${v}
        data-color=${c}
      >
        <div data-col="name">
          <fill-box fill="${c}"></fill-box>
          <input data-tip="Biome name. Click and type to change" class="biomeName" value="${s}" autocorrect="off" spellcheck="false" />
        </div>
        <div data-col="habitability" class="hide">
          <span data-tip="Biome habitability percent">%</span>
          <input data-tip="Biome habitability percent. Click and set new value to change" type="number" min="0" max="9999" class="biomeHabitability" value=${l} />
        </div>
        <div data-col="cells" class="hide"><span data-tip="Cells count" class="icon-check-empty"></span><span data-tip="Cells count" class="biomeCells">${d}</span></div>
        <div data-col="area" class="hide"><span data-tip="Biome area" class="icon-map-o" style="padding-right: 2px"></span><span data-tip="Biome area" class="biomeArea">${o(h)+r}</span></div>
        <div data-col="population" class="hide"><span data-tip="${y}" class="icon-male"></span><span data-tip="${y}" class="biomePopulation">${o(v)}</span></div>
        <div data-col="actions" class="hide">
          <span data-tip="Open Wikipedia article about the biome" class="icon-info-circled pointer"></span>
          ${e>12&&!d?`<span data-tip="Remove the custom biome" class="icon-trash-empty"></span>`:``}
        </div>
      </div>
    `}let d=l(`biomesBody`);d.innerHTML=i;for(let r of e.all){let e=n[r.i];a+=u(e.area),s+=t(e.rural*populationRate+e.urban*populationRate*urbanization)}let f=u(m(pack.cells.area));l(`biomesFooterBiomes`).innerHTML=String(e.all.length),l(`biomesFooterCells`).innerHTML=String(pack.cells.h.filter(e=>e>=20).length);let p=l(`biomesFooterArea`);p.innerHTML=o(a)+r,l(`biomesFooterPopulation`).innerHTML=o(s),p.dataset.area=String(a),p.dataset.mapArea=String(f),l(`biomesFooterPopulation`).dataset.population=String(s),T(l(`biomesFooter`),e,N.goto),d.querySelectorAll(`div.biomes`).forEach(e=>{e.addEventListener(`mouseenter`,B)}),d.querySelectorAll(`div.biomes`).forEach(e=>{e.addEventListener(`mouseleave`,V)}),d.dataset.type===`percentage`&&(d.dataset.type=`absolute`,q()),v(k,{width:`fit-content`,position:A})}function B(e){if(customization===6)return;let t=+e.target.dataset.id,n=i().duration(2e3).ease(h);s(`#biomes > #biome${t}`).raise().transition(n).attr(`stroke-width`,2).attr(`stroke`,`#cd4c11`)}function V(e){if(customization===6)return;let t=+e.target.dataset.id,n=pack.biomes[t].color;s(`#biomes > #biome${t}`).transition().attr(`stroke-width`,.7).attr(`stroke`,n)}function H(e){let t=e.getAttribute(`fill`),n=+e.closest(`.biomes`).dataset.id;x.ColorPicker.open(t,t=>{e.fill=t,pack.biomes[n].color=t,f.draw(`biomes`)})}function U(e){let t=e.closest(`.biomes`),n=+t.dataset.id;t.dataset.name=e.value,pack.biomes[n].name=e.value}function W(e){let t=e.closest(`.biomes`),n=+t.dataset.id;if(Number.isNaN(+e.value)||+e.value<0||+e.value>9999){e.value=String(pack.biomes[n].habitability),_(`Please provide a valid number in range 0-9999`,!1,`error`);return}pack.biomes[n].habitability=+e.value,t.dataset.habitability=e.value,Q(),I()}function G(e){let t=e.closest(`.biomes`)?.dataset.name;if(t===`Custom`||!t){_(`Please fill in the biome name`,!1,`error`);return}let r={"Hot desert":`Desert_climate#Hot_desert_climates`,"Cold desert":`Desert_climate#Cold_desert_climates`,Savanna:`Tropical_and_subtropical_grasslands,_savannas,_and_shrublands`,Grassland:`Temperate_grasslands,_savannas,_and_shrublands`,"Tropical seasonal forest":`Seasonal_tropical_forest`,"Temperate deciduous forest":`Temperate_deciduous_forest`,"Tropical rainforest":`Tropical_rainforest`,"Temperate rainforest":`Temperate_rainforest`,Taiga:`Taiga`,Tundra:`Tundra`,Glacier:`Glacier`,Wetland:`Wetland`},i=`https://en.wikipedia.org/w/index.php?search=${t}`,a=r[t]?`https://en.wikipedia.org/wiki/`+r[t]:i;n(a)}function K(){if(s(`#legend`).selectAll(`*`).size()){p();return}let e=R(),t=pack.biomes.filter(({i:t})=>e[t].cells).sort((t,n)=>e[n.i].area-e[t.i].area).map(({i:e,color:t,name:n})=>[e,t,n]);d(`Biomes`,t)}function q(){let e=l(`biomesBody`);if(e.dataset.type===`absolute`){e.dataset.type=`percentage`;let n=+l(`biomesFooterCells`).innerHTML,r=l(`biomesFooterArea`),i=+r.dataset.area,a=+r.dataset.mapArea,o=+l(`biomesFooterPopulation`).dataset.population;e.querySelectorAll(`:scope > div`).forEach(e=>{e.querySelector(`.biomeCells`).innerHTML=`${t(+e.dataset.cells/n*100)}%`,e.querySelector(`.biomeArea`).innerHTML=`${t(+e.dataset.area/i*100)}%`,e.querySelector(`.biomePopulation`).innerHTML=`${t(+e.dataset.population/o*100)}%`}),r.innerHTML=`${t(i/a*100)}%`}else e.dataset.type=`absolute`,N.refresh()}function J(e,t){let n=e.length;if(n>254)return null;let r={i:n,name:`Custom`,color:t,habitability:50,iconsDensity:0,icons:[],cost:50};return e.push(r),r}function Y(e,t,n){let r=e[n];if(n<=12||!r||r.removed)return!1;for(let e=0;e<t.length;e++)if(t[e]===n)return!1;return r.removed=!0,!0}function X(){if(!J(pack.biomes,a())){_(`Maximum number of biomes reached (255), data cleansing is required`,!1,`error`);return}j=R(),N.refresh()}function Z(e){let t=+e.closest(`.biomes`).dataset.id;Y(pack.biomes,pack.cells.biome,t)&&(j=R(),N.refresh())}function te(){let n=`Id,Biome,Color,Habitability,Cells,Area ${areaUnit.value===`square`?`${distanceUnitInput.value}2`:areaUnit.value},Population\n`,i=R();for(let e of pack.biomes){if(!e.i||e.removed)continue;let{cells:r,area:a,rural:o,urban:s}=i[e.i],c=t(o*populationRate+s*populationRate*urbanization);n+=`${e.i},${e.name},${e.color},${e.habitability}%,${r},${u(a)},${c}\n`}let a=`${e(`Biomes`)}.csv`;r(n,a)}function ne(){f.show(`biomes`),x.PaintEditor.open({title:`Paint Biomes`,parentDialogId:k,onClose:P,items:pack.biomes.filter(e=>e.i&&!e.removed).map(e=>({id:e.i,name:e.name,color:e.color})),getValue:e=>pack.cells.biome[e],filterCell:e=>g(e,pack),onApply:re})}function re(e){for(let[t,n]of e)pack.cells.biome[t]=n;e.size&&(f.draw(`biomes`),document.getElementById(k)&&I())}function ie(){pack.biomes=Biomes.getDefault(),Biomes.define(),f.draw(`biomes`),Q(),I()}function ae(){$(`#biomesEditor`).dialog(`destroy`),l(`biomesEditor`).remove()}function Q(){b.regenerate(),f.draw(`population`,`goods`)}var oe={open:P};export{oe as BiomesEditor};