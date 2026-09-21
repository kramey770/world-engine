import{Cn as e,N as t,Tt as n,it as r,k as i,w as a}from"./utils-omhVlsRt.js";import{t as o}from"./layers-DHltDypB.js";import{r as s}from"./tooltips-BQ3W48fB.js";import{i as c,r as l}from"./dialog-helpers-CdcIkxap.js";import{t as u}from"./cultures-generator-BrxAhK52.js";import{n as d,t as f}from"./goods-generator-Bw_x7N6S.js";import{P as p}from"./index-DWZM8gkY.js";function m(r,a){let u=Array.from(i(`good-icons`).querySelectorAll(`symbol`)).map(e=>e.id),m={...r?.demandCoverage||{}},b={...r?.biomeOutput||{}},x=()=>{let e=d.map(e=>[e,m[e]??0]).filter(([,e])=>e>0);return e.length?e.map(([e,n])=>`${f[e]} ${t(e)}: ${n}`).join(`, `):`none`},S=()=>{let e=Object.entries(b).filter(([,e])=>(e??0)>0);return e.length?e.map(([e,t])=>`${pack.biomes[Number(e)].name}: ${t}`).join(`, `):`none`},C={cultureType:{...r?.multipliers?.cultureType??{}},culture:{...r?.multipliers?.culture??{}},state:{...r?.multipliers?.state??{}},religion:{...r?.multipliers?.religion??{}},biome:{...r?.multipliers?.biome??{}},zone:{...r?.multipliers?.zone??{}}},w=e=>{let t=C[e]??{},r=Object.entries(t).filter(([,e])=>e!==1);return r.length?r.map(([t,r])=>`${h(e,t)} ×${n(r,2)}`).join(`, `):`none`},T=(e,t)=>`
      <label data-tip="Production multiplier by ${t.toLowerCase()}. 1 = no effect, 0 = fully suppressed.">${t}</label>
      <div class="ge-edit-row">
        <span id="mSummary_${e}">${w(e)}</span>
        <button class="mEdit icon-pencil ge-edit" data-dim="${e}" data-tip="Edit ${t} multipliers"></button>
      </div>`,E=r?.recipes||[],D;O(),$(D).dialog({width:`30em`,resizable:!1,title:r?`Edit good`:`Add new good`,open:function(){r&&(this.parentElement?.querySelector(`.ui-dialog-buttonpane`))?.insertAdjacentHTML(`afterbegin`,`<div class="dontAsk" data-tip="Re-place this good and recompute production, trade and taxes. Uncheck to update the good only, without disturbing the current economy.">
          <input id="goodRegenerateEconomy" class="checkbox" type="checkbox" checked />
          <label for="goodRegenerateEconomy" class="checkbox-label"><i>regenerate economy on apply</i></label>
        </div>`)},close:()=>{l(`goodEditor`)},buttons:{Cancel:function(){$(this).dialog(`close`)},[r?`Apply`:`Add`]:()=>{let t=[],n=i(`newGoodName`).value.trim(),l=i(`newGoodTags`).value.trim(),u=e(l.split(`,`).map(e=>e.trim().toLocaleLowerCase())),d=+i(`newGoodValue`).value,f=+i(`newGoodChance`).value,p=i(`newGoodUnit`).value.trim(),h=i(`newGoodIcon`).value,g=i(`newGoodColor`).value,_=i(`newGoodDistribution`).textContent?.trim()??``;if(n||t.push(`Name is required`),(!Number.isFinite(d)||d<0)&&t.push(`Value must be a valid non-negative number`),(!Number.isFinite(f)||f<0||f>100)&&t.push(`Chance must be between 0 and 100`),_)try{let e=Goods.getMethods(),t=`{${Object.keys(e).join(`, `)}}`;Function(t,`return ${_}`)(e)}catch(e){t.push(`Distribution function is invalid: ${e.message||e}`)}for(let e of E){for(let[n,r]of Object.entries(e)){let e=Number(n),i=Goods.get(e);i||t.push(`Recipe references unknown good id: ${e}`);let a=Number(r);(Number.isNaN(a)||!Number.isFinite(a)||a<=0)&&t.push(`Invalid recipe amount for good ${i?.name}`)}Object.keys(e).length||t.push(`Each recipe must have at least one ingredient`)}if(i(`newGoodError`).textContent=t.join(`. `),t.length)return;function v(){let e={};for(let[t,n]of Object.entries(C)){let r=Object.fromEntries(Object.entries(n??{}).filter(([,e])=>e!==void 0&&e!==1));Object.keys(r).length&&(e[t]=r)}return Object.keys(e).length?e:void 0}r?(r.name=n,r.tags=u,r.icon=h,r.color=g,r.value=d,r.chance=f,r.unit=p,r.demandCoverage=m,r.multipliers=v(),r.distribution=_||void 0,r.biomeOutput=Object.keys(b).length?b:void 0,r.recipes=E.length?E:void 0,i(`goodRegenerateEconomy`).checked?(Goods.regeneratePlacement(r.i),Production.regenerateEconomy(),o.draw(`markets`,`goods`),o.draw(`trade`),c()):Goods.sync()):(pack.goods.push({i:(()=>{let e=pack.goods?.at(-1)?.i??1;for(;Goods.get(e);)e++;return e})(),name:n,tags:u,icon:h,color:g,value:d,chance:f,unit:p,demandCoverage:m,multipliers:v(),distribution:_||void 0,biomeOutput:Object.keys(b).length?b:void 0,recipes:E.length?E:void 0}),Goods.sync()),s(r?`Good is updated`:`Good is added`,!1,`success`,5e3),a?.(),$(D).dialog(`close`)}}});function O(){l(`goodEditor`),i(`dialogs`).insertAdjacentHTML(`beforeend`,`<div id="goodEditor" class="dialog">
    <style>
      .ge                 { display:flex; width: auto !important; flex-direction:column; gap:9px; max-height:72vh; overflow-y:auto; padding-right:2px; }
      .ge-section-title   { display:flex; align-items:center; justify-content:space-between; font-weight:bold; text-transform:uppercase; font-size:.8em; letter-spacing:.06em; margin-bottom:7px; padding-bottom:4px; border-bottom:1px solid #666; }
      .ge-grid            { display:grid; grid-template-columns:9em minmax(0, 1fr); gap:.2em; align-items:center; }
      .ge-grid--top       { align-items:start; }
      .ge-grid > *        { min-width:0; }
      .ge-grid > label    { color:#555; }
      .ge-field           { width:100%; }
      input.ge-num        { width:6em; }
      .ge-inline          { display:flex; align-items:center; gap:.4em; }
      .ge-icon-select     { flex:1; min-width:0; }
      .ge-icon-preview    { flex-shrink:0; }
      .ge-color           { width:2.4em; height:1.4em; padding:0; border:none; flex-shrink:0; }
      .ge-edit-row        { display:flex; align-items:flex-start; justify-content:space-between; gap:6px; }
      .ge-edit-row > span { flex:1; min-width:0; }
      .ge-edit            { flex-shrink:0; }
      .ge-dist            { flex:1; min-width:0; color:#555; font-size:.9em; font-family:var(--monospace); word-break:break-all; }
      .ge-note            { color:#777; font-style:italic; font-size:.9em; }
      .ge-error           { color:#b20000; min-height:1.2em; }
      .ge-recipe-list     { display:flex; flex-direction:column; gap:.45em; }
      .ge-recipe          { border:1px solid #ccc; border-radius:3px; }
      .ge-recipe-head     { display:flex; align-items:center; justify-content:space-between; padding:.2em .3em; }
      .ge-recipe-actions  { display:flex; gap:.3em; }
      .ge-recipe-ings     { display:flex; flex-direction:column; gap:.2em; padding:.3em .4em; }
      .ge-recipe-ing      { display:grid; grid-template-columns:1fr 5em 1.5em; gap:.25em; align-items:center; }
    </style>

    <div class="ge">
      <div>
        <div class="ge-section-title">General</div>
        <div class="ge-grid">
          <label for="newGoodName">Name*</label>
          <input id="newGoodName" class="ge-field" value="${r?.name||``}" />

          <label for="newGoodTags">Tags</label>
          <input id="newGoodTags" class="ge-field" value="${r?.tags.join(`, `)||``}" placeholder="comma separated" />

          <label for="newGoodValue">Base Price*</label>
          <span class="ge-inline"><input id="newGoodValue" class="ge-num" type="number" min="0" step="1" value="${r?.value??1}" /> 🟡</span>

          <label for="newGoodChance">Chance</label>
          <input id="newGoodChance" class="ge-num" type="number" min="0" max="100" step="0.1" value="${r?.chance??1}" />

          <label for="newGoodUnit">Unit</label>
          <input id="newGoodUnit" class="ge-field" placeholder="e.g. wagon, barrel" value="${r?.unit||``}" />

          <label for="newGoodIcon">Icon*</label>
          <div class="ge-inline">
            <select id="newGoodIcon" class="ge-icon-select">${u.map(e=>`<option value="${e}" ${r?.icon===e?`selected`:``}>${e}</option>`).join(``)}</select>
            <svg class="ge-icon-preview" width="2em" height="2em">
              <circle id="newGoodIconCircle" cx="50%" cy="50%" r="42%" fill="${r?.color||`#ff5959`}" stroke="${Goods.getStroke(r?.color||`#ff5959`)}"/>
              <use id="newGoodIconPreview" href="#${r?.icon||`good-unknown`}" x="10%" y="10%" width="80%" height="80%"/>
            </svg>
            <button id="newGoodUploadIconRaster" class="icon-upload" data-tip="Upload raster icon"></button>
            <button id="newGoodUploadIconVector" class="icon-upload-cloud" data-tip="Upload vector (SVG) icon"></button>
            <input id="newGoodColor" class="ge-color" type="color" data-tip="Set a stroke color" value="${r?.color||`#ff5959`}" />
          </div>

          <label data-tip="How much of each demand category this good satisfies. Click the pencil icon to edit.">Demand Coverage</label>
          <div class="ge-edit-row">
            <span id="demandCoverageSummary" >${x()}</span>
            <button class="dcEdit icon-pencil ge-edit" data-tip="Edit demand coverage"></button>
          </div>
        </div>
      </div>

      <div>
        <div class="ge-section-title">Raw Production</div>
        <div class="ge-grid ge-grid--top">
          <label data-tip="For raw resources: sets the baseline production per biome">Rural production</label>
          <div class="ge-edit-row">
            <span id="biomeProductionSummary">${S()}</span>
            <button class="bpEdit icon-pencil ge-edit" data-tip="Edit biome baseline production"></button>
          </div>

          <label data-tip="For raw resources: controls where and how this good is produced directly from the environment (e.g. biome, elevation, temperature)">Bonus distribution</label>
          <div class="ge-edit-row">
            <div id="newGoodDistribution" class="ge-dist">${r?.distribution||``}</div>
            <button id="newGoodDistributionEditor" class="icon-pencil ge-edit" data-tip="Open the Distribution visual editor"></button>
          </div>
        </div>
        <div id="newGoodRawNote" class="ge-note"></div>
      </div>

      <div>
        <div class="ge-section-title">
          <span data-tip="For manufactured goods: recipes define which other goods are required to produce this good">Recipes</span>
          <button id="newGoodAddRecipe" class="icon-plus" data-tip="Add a recipe"></button>
        </div>
        <div id="newGoodRecipeList" class="ge-recipe-list"></div>
        <div id="newGoodRecipeNote" class="ge-note"></div>
      </div>

      <div>
        <div class="ge-section-title">
          <span data-tip="Per-dimension production multipliers. 1 = no effect, 0 = fully suppressed.">Multipliers</span>
        </div>
        <div class="ge-grid ge-grid--top">
          ${T(`cultureType`,`Culture Type`)}
          ${T(`culture`,`Culture`)}
          ${T(`state`,`State`)}
          ${T(`religion`,`Religion`)}
          ${T(`biome`,`Biome`)}
          ${T(`zone`,`Zone`)}
        </div>
      </div>

      <div id="newGoodError" class="ge-error"></div>
    </div>
  </div>`),D=i(`goodEditor`);let e=i(`newGoodRecipeList`),t=pack.goods[0]?.i??0,n=[...pack.goods].sort((e,t)=>e.name.localeCompare(t.name)),a=()=>!Object.values(b).some(e=>(e??0)>0)&&!document.getElementById(`newGoodDistribution`)?.textContent?.trim(),o=()=>{let e=a(),t=E.length===0,n=i(`newGoodRecipeNote`);n.textContent=`This good is raw-only: gathered from the environment.`,n.style.display=t&&!e?``:`none`;let r=i(`newGoodRawNote`);r.textContent=`This good is manufactured-only: made from recipes in burgs.`,r.style.display=e&&!t?``:`none`},s=()=>{e.innerHTML=E.map((e,t)=>`
          <div class="recipeOption ge-recipe" data-recipe-index="${t}" >
            <div class="ge-recipe-head">
              <span>Recipe ${t+1}</span>
              <div class="ge-recipe-actions">
                <span class="recipeAddIngredient icon-plus pointer" data-recipe-index="${t}" data-tip="Add ingredient"></span>
                <span class="recipeRemoveOption icon-trash-empty pointer" data-recipe-index="${t}" data-tip="Remove recipe"></span>
              </div>
            </div>
            <div class="recipeIngredients ge-recipe-ings">
              ${Object.entries(e).map(([e,r],i)=>`
                    <div class="ge-recipe-ing" data-recipe-index="${t}" data-ingredient-index="${i}">
                      <select class="recipeGoodSelect" data-recipe-index="${t}" data-ingredient-index="${i}">${n.map(t=>`<option value="${t.i}" ${t.i===Number(e)?`selected`:``}>${t.name}</option>`).join(``)}</select>
                      <input class="recipeAmountInput" data-recipe-index="${t}" data-ingredient-index="${i}" type="number" min="1" step="1" value="${r}" />
                      <span class="recipeRemoveIngredient icon-trash-empty pointer" data-recipe-index="${t}" data-ingredient-index="${i}" data-tip="Remove ingredient" />
                    </div>`).join(``)}
            </div>
          </div>
        `).join(``),e.querySelectorAll(`.recipeGoodSelect`).forEach(e=>{e.onchange=()=>{let t=+e.value,n=+e.dataset.recipeIndex,r=+e.dataset.ingredientIndex,i=E[n],a=i[r]||0;delete i[r],i[t]=a,s()}}),e.querySelectorAll(`.recipeAmountInput`).forEach(e=>{e.onchange=()=>{let t=+e.dataset.recipeIndex,n=+e.dataset.ingredientIndex,r=E[t],i=Number(Object.keys(r)[n]);r[i]=+e.value}}),e.querySelectorAll(`.recipeAddIngredient`).forEach(e=>{e.onclick=n=>{n.preventDefault();let r=+e.dataset.recipeIndex,i=E[r],a=Object.keys(i).length?Math.max(...Object.keys(i).map(e=>+e))+1:t;i[a]=1,s()}}),e.querySelectorAll(`.recipeRemoveIngredient`).forEach(e=>{e.onclick=t=>{t.preventDefault();let n=+e.dataset.recipeIndex,r=+e.dataset.ingredientIndex,i=E[n];if(Object.keys(i).length>1){let e=Number(Object.keys(i)[r]);delete i[e],s()}}}),e.querySelectorAll(`.recipeRemoveOption`).forEach(e=>{e.onclick=t=>{t.preventDefault();let n=+e.dataset.recipeIndex;E.splice(n,1),s()}}),o()};s(),D.querySelectorAll(`.mEdit`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.dim;_(t,C[t]??{},e=>{C[t]=e;let n=document.getElementById(`mSummary_${t}`);n&&(n.textContent=w(t))})})}),D.querySelector(`.dcEdit`).addEventListener(`click`,()=>{v({...m},e=>{Object.keys(m).forEach(e=>void delete m[e]),Object.assign(m,e);let t=document.getElementById(`demandCoverageSummary`);t&&(t.textContent=x())})}),D.querySelector(`.bpEdit`).addEventListener(`click`,()=>{y({...b},e=>{Object.keys(b).forEach(e=>void delete b[+e]),Object.assign(b,e);let t=document.getElementById(`biomeProductionSummary`);t&&(t.textContent=S()),o()})}),i(`newGoodAddRecipe`).addEventListener(`click`,e=>{e.preventDefault(),E.push({[t]:1}),s()}),i(`newGoodDistributionEditor`).addEventListener(`click`,()=>{let e=i(`newGoodDistribution`);p.DistributionEditor.open(t=>{e.textContent=t,o()},e.textContent?.trim()??``)});let c=i(`newGoodIcon`);c.onchange=()=>i(`newGoodIconPreview`).setAttribute(`href`,`#${c.value}`);let d=i(`newGoodColor`);d.oninput=()=>{let e=i(`newGoodIconCircle`);e.setAttribute(`fill`,d.value),e.setAttribute(`stroke`,Goods.getStroke(d.value))};let f=(e,t)=>{i(`newGoodIconPreview`).setAttribute(`href`,`#${t}`),c.innerHTML+=`<option value="${t}">${t}</option>`,c.value=t};i(`newGoodUploadIconRaster`).onclick=()=>i(`imageToLoad`).click(),i(`newGoodUploadIconVector`).onclick=()=>i(`svgToLoad`).click(),i(`imageToLoad`).onchange=()=>g(`image`,f),i(`svgToLoad`).onchange=()=>g(`svg`,f)}}function h(e,t){return e===`cultureType`?t:e===`culture`?pack.cultures[+t]?.name??`Culture ${t}`:e===`state`?pack.states[+t]?.name??`State ${t}`:e===`religion`?pack.religions[+t]?.name??`Religion ${t}`:e===`zone`?pack.zones.find(e=>e.i===+t)?.name??`Zone ${t}`:pack.biomes[+t]?.name??`Biome ${t}`}function g(e,t){let n=i(e===`image`?`imageToLoad`:`svgToLoad`),r=n.files[0];if(n.value=``,r.size>2e5){s(`File is too big, please optimize file size up to 200kB and re-upload. Recommended size is 48x48 px and up to 10kB`,!0,`error`,5e3);return}let o=new FileReader;o.onload=n=>{let r=n.target;if(!r)return;let o=r.result,c=`good-custom-${Math.random().toString(36).slice(-6)}`,l=i(`good-icons`);if(e===`image`){let e=`<svg id="${c}" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><image x="0" y="0" width="200" height="200" href="${o}"/></svg>`;l.insertAdjacentHTML(`beforeend`,e)}else{let e=a(o);if(!e)return void s(`The file should be prepared for load to FMG. If you don't know why it's happening, try to upload raster image`,!1,`error`);let t=l.appendChild(e);t.id=c,t.setAttribute(`width`,`200`),t.setAttribute(`height`,`200`)}t(e,c)},e===`image`?o.readAsDataURL(r):o.readAsText(r)}function _(e,t,n){let i,a;switch(e){case`cultureType`:i=u.map(e=>({id:e,name:e})),a=`Culture Type`;break;case`culture`:i=pack.cultures.filter(e=>e.i&&!e.removed).map(e=>({id:String(e.i),name:e.name,color:e.color})),a=`Culture`;break;case`state`:i=pack.states.filter(e=>e.i&&!e.removed).map(e=>({id:String(e.i),name:e.fullName||e.name,color:e.color})),a=`State`;break;case`religion`:i=pack.religions.filter(e=>e.i&&!e.removed).map(e=>({id:String(e.i),name:e.name,color:e.color})),a=`Religion`;break;case`biome`:i=pack.biomes.filter(e=>!e.removed).map(({i:e,name:t,color:n})=>({id:String(e),name:t,color:n})),a=`Biome`;break;case`zone`:i=pack.zones.map(e=>({id:String(e.i),name:e.name,color:e.color})),a=`Zone`}let o=i.map(e=>{let n=t[e.id]??1;return`${`<fill-box fill="${e.color||r()}" size="1em" disabled data-tip="${e.name}"></fill-box>`}<span>${e.name}</span><input type="number" class="mPopupInput" data-id="${e.id}" min="0" step="0.1" style="width:5em;" value="${n}" />`}),s=document.createElement(`div`);document.body.appendChild(s),s.innerHTML=`<div style="max-height:320px; overflow-y:auto; padding:.2em;">${o.length?`<div style="display:grid; grid-template-columns:auto 1fr 5em; gap:.3em .5em; align-items:center;">${o.join(``)}</div>`:`<div style="color:#777; font-style:italic;">No ${a.toLowerCase()}s available</div>`}</div>`,$(s).dialog({title:`${a} multipliers`,width:`22em`,resizable:!1,buttons:{Cancel:function(){$(this).dialog(`close`)},Apply:function(){let e=Array.from(s.querySelectorAll(`.mPopupInput`)),t={};for(let n of e){let e=n.dataset.id,r=Number(n.value);Number.isFinite(r)&&r>=0&&r!==1&&(t[e]=r)}n(t),$(this).dialog(`close`)}},close:()=>{$(s).dialog(`destroy`),s.remove()}})}function v(e,n){let r=d.map(n=>{let r=e[n]??0;return`<span>${f[n]} ${t(n)}</span><input type="number" class="dcPopupInput" data-cat="${n}" min="0" step="0.05" style="width:5em;" value="${r}" />`}).join(``),i=document.createElement(`div`);document.body.appendChild(i),i.innerHTML=`<div style="display:grid;grid-template-columns:1fr 5em;gap:.3em .5em;align-items:center;padding:.2em;">${r}</div>`,$(i).dialog({title:`Demand Coverage`,width:`18em`,resizable:!1,buttons:{Cancel:function(){$(this).dialog(`close`)},Apply:function(){let e={};i.querySelectorAll(`.dcPopupInput`).forEach(t=>{let n=t.dataset.cat,r=Number(t.value);Number.isFinite(r)&&r>0&&(e[n]=r)}),n(e),$(this).dialog(`close`)}},close:()=>{$(i).dialog(`destroy`),i.remove()}})}function y(e,t){let n=pack.biomes.filter(e=>!e.removed).map(({i:t,name:n})=>`<span>${n}</span><input type="number" class="bpPopupInput" data-id="${t}" min="0" step="0.01" style="width:5em;" value="${e[t]??0}" />`).join(``),r=document.createElement(`div`);document.body.appendChild(r),r.innerHTML=`<div style="max-height:320px;overflow-y:auto;padding:.2em;"><div style="display:grid;grid-template-columns:1fr 5em;gap:.3em .5em;align-items:center;">${n}</div></div>`,$(r).dialog({title:`Biome Baseline Production`,width:`22em`,resizable:!1,buttons:{Cancel:function(){$(this).dialog(`close`)},Apply:function(){let e={};r.querySelectorAll(`.bpPopupInput`).forEach(t=>{let n=Number(t.dataset.id),r=Number(t.value);Number.isFinite(r)&&r>0&&(e[n]=r)}),t(e),$(this).dialog(`close`)}},close:()=>{$(r).dialog(`destroy`),r.remove()}})}var b={open:m};export{b as GoodEditor};