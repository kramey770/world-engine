import{Bt as e,J as t,S as n,T as r,Tt as i,d as a,i as o,it as s,k as c,r as l,un as u,w as d}from"./utils-D3KEhgY0.js";import{t as f}from"./sin-DXK16t1M.js";import{r as p}from"./tooltips-D1wvMKni.js";import{C as m,H as h,J as g,K as _,Q as v,V as y,W as ee,bt as b,qt as x,w as S,xt as C}from"./index-D3JPylQY.js";import{t as w}from"./highlighting-Dl5muJeM.js";import{i as T,n as E,r as D,t as O}from"./table-D__vupD5.js";var k=`biomesEditor`,A={my:`right top`,at:`right-10 top+10`,of:`svg`,collision:`fit`},j=[],M=[{key:`name`,label:`Biome`,width:`15em`,permanent:!0,sortBy:e=>e.name,sortType:`alpha`},{key:`habitability`,label:`Habitability`,width:`6.5em`,sortBy:e=>e.habitability},{key:`cells`,label:`Cells`,width:`5em`,sortBy:e=>j[e.i]?.cells??0,defaultSort:`desc`},{key:`area`,label:`Area`,width:`7em`,mobileHidden:!0,sortBy:e=>j[e.i]?.area??0},{key:`population`,label:`Population`,width:`6.2em`,mobileHidden:!0,sortBy:e=>{let t=j[e.i];return t?t.rural+t.urban:0}},{key:`actions`,width:`2em`,permanent:!0}],N=E({getData:()=>S(k,pack.biomes.filter(e=>e.i&&!e.removed),M),onUpdate:e=>z(e,j)});function P(){customization||(h(`#${k}, .stable`),v.show(`biomes`),v.hide(`states`,`cultures`),v.hide(`religions`,`provinces`),F(),j=R(),N.reset(),$(`#${k}`).dialog({title:`Biomes Editor`,resizable:!1,close:ae,position:A}))}function F(){ee(k);let e=`<div id="${k}" class="dialog stable editorDialog">
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
    </div>`;c(`dialogs`).insertAdjacentHTML(`beforeend`,e),O({dialogId:k,columns:M,onUpdate:()=>_(k,{width:`fit-content`,position:A})}),c(`biomesEditorRefresh`).addEventListener(`click`,I),c(`biomesEditStyle`).addEventListener(`click`,()=>editStyle(`biomes`)),c(`biomesLegend`).addEventListener(`click`,K),c(`biomesPercentage`).addEventListener(`click`,q),c(`biomesManually`).addEventListener(`click`,ne),c(`biomesRestore`).addEventListener(`click`,ie),c(`biomesAdd`).addEventListener(`click`,X),c(`biomesExport`).addEventListener(`click`,te),m(k,N.reset),w(k,({cellId:e})=>e&&pack.cells.biome[e]),c(`biomesBody`).addEventListener(`click`,e=>{let t=e.target,n=t.classList;t.tagName===`FILL-BOX`?H(t):n.contains(`icon-info-circled`)?G(t):n.contains(`icon-trash-empty`)&&Z(t)}),c(`biomesBody`).addEventListener(`change`,e=>{let t=e.target,n=t.classList;n.contains(`biomeName`)?U(t):n.contains(`biomeHabitability`)&&W(t)})}function I(){j=R(),N.refresh()}function L(e=pack){let{cells:t}=e,n=e.biomes.map(()=>({cells:0,area:0,rural:0,urban:0}));for(let r of t.i){if(t.h[r]<20)continue;let i=n[t.biome[r]];i.cells++,i.area+=t.area[r],i.rural+=t.pop[r];let a=t.burg[r]?e.burgs[t.burg[r]]:null;a&&(i.urban+=a.population??0)}return n}function R(){return L(pack)}function z(e,t){let n=` ${o()}`,r=``,s=0,u=0;for(let o of e.rows){let{i:e,name:s,color:c,habitability:u}=o,{cells:d,area:f,rural:p,urban:m}=t[e],h=l(f),g=p*populationRate,_=m*populationRate*urbanization,v=i(g+_),y=`Total population: ${a(v)}; Rural population: ${a(g)}; Urban population: ${a(_)}`;r+=`
      <div
        class="states biomes"
        data-id="${e}"
        data-name="${s}"
        data-habitability="${u}"
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
          <input data-tip="Biome habitability percent. Click and set new value to change" type="number" min="0" max="9999" class="biomeHabitability" value=${u} />
        </div>
        <div data-col="cells" class="hide"><span data-tip="Cells count" class="icon-check-empty"></span><span data-tip="Cells count" class="biomeCells">${d}</span></div>
        <div data-col="area" class="hide"><span data-tip="Biome area" class="icon-map-o" style="padding-right: 2px"></span><span data-tip="Biome area" class="biomeArea">${a(h)+n}</span></div>
        <div data-col="population" class="hide"><span data-tip="${y}" class="icon-male"></span><span data-tip="${y}" class="biomePopulation">${a(v)}</span></div>
        <div data-col="actions" class="hide">
          <span data-tip="Open Wikipedia article about the biome" class="icon-info-circled pointer"></span>
          ${e>12&&!d?`<span data-tip="Remove the custom biome" class="icon-trash-empty"></span>`:``}
        </div>
      </div>
    `}let d=c(`biomesBody`);d.innerHTML=r;for(let n of e.all){let e=t[n.i];s+=l(e.area),u+=i(e.rural*populationRate+e.urban*populationRate*urbanization)}let f=l(x(pack.cells.area));c(`biomesFooterBiomes`).innerHTML=String(e.all.length),c(`biomesFooterCells`).innerHTML=String(pack.cells.h.filter(e=>e>=20).length);let p=c(`biomesFooterArea`);p.innerHTML=a(s)+n,c(`biomesFooterPopulation`).innerHTML=a(u),p.dataset.area=String(s),p.dataset.mapArea=String(f),c(`biomesFooterPopulation`).dataset.population=String(u),T(c(`biomesFooter`),e,N.goto),d.querySelectorAll(`div.biomes`).forEach(e=>{e.addEventListener(`mouseenter`,B)}),d.querySelectorAll(`div.biomes`).forEach(e=>{e.addEventListener(`mouseleave`,V)}),d.dataset.type===`percentage`&&(d.dataset.type=`absolute`,q()),_(k,{width:`fit-content`,position:A})}function B(t){if(customization===6)return;let n=+t.target.dataset.id,r=e().duration(2e3).ease(f);u(`#biomes > #biome${n}`).raise().transition(r).attr(`stroke-width`,2).attr(`stroke`,`#cd4c11`)}function V(e){if(customization===6)return;let t=+e.target.dataset.id,n=pack.biomes[t].color;u(`#biomes > #biome${t}`).transition().attr(`stroke-width`,.7).attr(`stroke`,n)}function H(e){let t=e.getAttribute(`fill`),n=+e.closest(`.biomes`).dataset.id;g.ColorPicker.open(t,t=>{e.fill=t,pack.biomes[n].color=t,v.draw(`biomes`)})}function U(e){let t=e.closest(`.biomes`),n=+t.dataset.id;t.dataset.name=e.value,pack.biomes[n].name=e.value}function W(e){let t=e.closest(`.biomes`),n=+t.dataset.id;if(Number.isNaN(+e.value)||+e.value<0||+e.value>9999){e.value=String(pack.biomes[n].habitability),p(`Please provide a valid number in range 0-9999`,!1,`error`);return}pack.biomes[n].habitability=+e.value,t.dataset.habitability=e.value,Q(),I()}function G(e){let n=e.closest(`.biomes`)?.dataset.name;if(n===`Custom`||!n){p(`Please fill in the biome name`,!1,`error`);return}let r={"Hot desert":`Desert_climate#Hot_desert_climates`,"Cold desert":`Desert_climate#Cold_desert_climates`,Savanna:`Tropical_and_subtropical_grasslands,_savannas,_and_shrublands`,Grassland:`Temperate_grasslands,_savannas,_and_shrublands`,"Tropical seasonal forest":`Seasonal_tropical_forest`,"Temperate deciduous forest":`Temperate_deciduous_forest`,"Tropical rainforest":`Tropical_rainforest`,"Temperate rainforest":`Temperate_rainforest`,Taiga:`Taiga`,Tundra:`Tundra`,Glacier:`Glacier`,Wetland:`Wetland`},i=`https://en.wikipedia.org/w/index.php?search=${n}`;t(r[n]?`https://en.wikipedia.org/wiki/`+r[n]:i)}function K(){if(u(`#legend`).selectAll(`*`).size()){b();return}let e=R();C(`Biomes`,pack.biomes.filter(({i:t})=>e[t].cells).sort((t,n)=>e[n.i].area-e[t.i].area).map(({i:e,color:t,name:n})=>[e,t,n]))}function q(){let e=c(`biomesBody`);if(e.dataset.type===`absolute`){e.dataset.type=`percentage`;let t=+c(`biomesFooterCells`).innerHTML,n=c(`biomesFooterArea`),r=+n.dataset.area,a=+n.dataset.mapArea,o=+c(`biomesFooterPopulation`).dataset.population;e.querySelectorAll(`:scope > div`).forEach(e=>{e.querySelector(`.biomeCells`).innerHTML=`${i(+e.dataset.cells/t*100)}%`,e.querySelector(`.biomeArea`).innerHTML=`${i(+e.dataset.area/r*100)}%`,e.querySelector(`.biomePopulation`).innerHTML=`${i(+e.dataset.population/o*100)}%`}),n.innerHTML=`${i(r/a*100)}%`}else e.dataset.type=`absolute`,N.refresh()}function J(e,t){let n=e.length;if(n>254)return null;let r={i:n,name:`Custom`,color:t,habitability:50,iconsDensity:0,icons:[],cost:50};return e.push(r),r}function Y(e,t,n){let r=e[n];if(n<=12||!r||r.removed)return!1;for(let e=0;e<t.length;e++)if(t[e]===n)return!1;return r.removed=!0,!0}function X(){if(!J(pack.biomes,s())){p(`Maximum number of biomes reached (255), data cleansing is required`,!1,`error`);return}j=R(),N.refresh()}function Z(e){let t=+e.closest(`.biomes`).dataset.id;Y(pack.biomes,pack.cells.biome,t)&&(j=R(),N.refresh())}function te(){let e=`Id,Biome,Color,Habitability,Cells,Area ${areaUnit.value===`square`?`${distanceUnitInput.value}2`:areaUnit.value},Population\n`,t=R();for(let n of pack.biomes){if(!n.i||n.removed)continue;let{cells:r,area:a,rural:o,urban:s}=t[n.i],c=i(o*populationRate+s*populationRate*urbanization);e+=`${n.i},${n.name},${n.color},${n.habitability}%,${r},${l(a)},${c}\n`}let n=`${r(`Biomes`)}.csv`;d(e,n)}function ne(){v.show(`biomes`),g.PaintEditor.open({title:`Paint Biomes`,parentDialogId:k,onClose:P,items:pack.biomes.filter(e=>e.i&&!e.removed).map(e=>({id:e.i,name:e.name,color:e.color})),getValue:e=>pack.cells.biome[e],filterCell:e=>n(e,pack),onApply:re})}function re(e){for(let[t,n]of e)pack.cells.biome[t]=n;e.size&&(v.draw(`biomes`),document.getElementById(k)&&I())}function ie(){pack.biomes=Biomes.getDefault(),Biomes.define(),v.draw(`biomes`),Q(),I()}function ae(){$(`#biomesEditor`).dialog(`destroy`),c(`biomesEditor`).remove()}function Q(){y.regenerate(),v.draw(`population`,`goods`)}var oe={open:P};export{oe as BiomesEditor};