import{D as e,k as t,vt as n}from"./utils-BQO-hFhv.js";import{n as r}from"./draw-heightmap-BWHc8b1E.js";import{n as i,t as a}from"./dialog-helpers-Rc_1Mfut.js";import{t as o}from"./preferences-k1kWUJ38.js";import{f as s,p as c}from"./index-CLCZ-FTJ.js";var l=1e4,u=n(),d=b(grid);p(),m(),h();function f(){a(`.stable`);let n=t(`templateInput`);_(n.value),d=b(d),$(`#heightmapSelection`).dialog({title:`Select Heightmap`,resizable:!1,position:{my:`center`,at:`center`,of:`svg`},buttons:{Cancel:function(){$(this).dialog(`close`)},Select:function(){let t=g();t&&(e(n,t,y(t)),o(`template`),$(this).dialog(`close`))},"New Map":function(){let t=g();if(!t)return;e(n,t,y(t)),o(`template`);let r=v();regeneratePrompt({seed:r,graph:d}),$(this).dialog(`close`)}}})}function p(){let e=document.createElement(`style`);e.textContent=`
    div.dialog > div.heightmap-selection {
      width: 70vw;
      height: 70vh;
    }

    .heightmap-selection_container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      grid-gap: 6px;
    }

    @media (max-width: 600px) {
      .heightmap-selection_container {
        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
        grid-gap: 4px;
      }
    }

    @media (min-width: 2000px) {
      .heightmap-selection_container {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        grid-gap: 8px;
      }
    }

    .heightmap-selection_options {
      display: grid;
      grid-template-columns: 2fr 1fr;
    }

    .heightmap-selection_options > div:first-child {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      align-items: center;
      justify-self: start;
      justify-items: start;
    }

    @media (max-width: 600px) {
      .heightmap-selection_options {
        grid-template-columns: 3fr 1fr;
      }

      .heightmap-selection_options > div:first-child {
        display: block;
      }
    }

    .heightmap-selection_options > div:last-child {
      justify-self: end;
    }

    .heightmap-selection article {
      padding: 4px;
      border-radius: 8px;
      transition: all 0.1s ease-in-out;
      filter: drop-shadow(1px 1px 4px #7d7d83);
    }

    .heightmap-selection article:hover {
      background-color: #f1f1f2;
      filter: drop-shadow(1px 1px 8px #7d7d83);
      cursor: pointer;
    }

    .heightmap-selection article.selected {
      background-color: #b5b5ba;
      outline: 1px solid var(--dark-solid);
      filter: drop-shadow(1px 1px 8px #7d7d83);
    }

    .heightmap-selection article > div {
      display: flex;
      justify-content: space-between;
      padding: 2px 1px;
    }

    .heightmap-selection article > img {
      width: 100%;
      aspect-ratio: ${graphWidth}/${graphHeight};
      border-radius: 8px;
      object-fit: fill;
    }

    .heightmap-selection article .regeneratePreview {
      outline: 1px solid #b5b5ba;
      padding: 1px 3px;
      border-radius: 4px;
      transition: all 0.1s ease-in-out;
    }

    .heightmap-selection article .regeneratePreview:hover {
      outline: 1px solid #66666d;
    }

    .heightmap-selection article .regeneratePreview:active {
      outline: 1px solid #35353a;
      color: #0b0b0c;
      transform: rotate(45deg);
    }
  `,document.head.appendChild(e)}function m(){let e=`<div id="heightmapSelection" class="dialog stable">
    <div class="heightmap-selection">
      <section data-tip="Select heightmap template – template provides unique, but similar-looking maps on generation">
        <header><h1>Heightmap templates</h1></header>
        <div class="heightmap-selection_container"></div>
      </section>
      <section data-tip="Select precreated heightmap – it will be the same for each map">
        <header><h1>Precreated heightmaps</h1></header>
        <div class="heightmap-selection_container"></div>
      </section>
      <section>
        <header><h1>Options</h1></header>
        <div class="heightmap-selection_options">
          <div>
            <label data-tip="Rerender all preview images" class="checkbox-label" id="heightmapSelectionRedrawPreview">
              <i class="icon-cw"></i>
              Redraw preview
            </label>
            <div>
              <input id="heightmapSelectionRenderOcean" class="checkbox" type="checkbox" />
              <label data-tip="Draw heights of water cells" for="heightmapSelectionRenderOcean" class="checkbox-label">Render ocean heights</label>
            </div>
            <div data-tip="Color scheme used for heightmap preview">
              Color scheme
              <select id="heightmapSelectionColorScheme">${Object.keys(heightmapColorSchemes).map(e=>`<option value="${e}">${e}</option>`).join(``)}</select>
            </div>
          </div>
          <div>
            <button data-tip="Open Template Editor" data-tool="templateEditor" id="heightmapSelectionEditTemplates">Edit Templates</button>
            <button data-tip="Open Image Converter" data-tool="imageConverter" id="heightmapSelectionImportHeightmap">Import Heightmap</button>
          </div>
        </div>
      </section>
    </div>
  </div>`;t(`dialogs`).insertAdjacentHTML(`beforeend`,e);let n=document.getElementsByClassName(`heightmap-selection_container`);n[0].innerHTML=Object.keys(c).map(e=>{let t=c[e].name;return Math.random=aleaPRNG(u),`<article data-id="${e}" data-seed="${u}">
        <img src="${E(HeightmapGenerator.fromTemplate(d,e))}" alt="${t}" />
        <div>
          ${t}
          <span data-tip="Regenerate preview" class="icon-cw regeneratePreview"></span>
        </div>
      </article>`}).join(``),n[1].innerHTML=Object.keys(s).map(e=>{let t=s[e].name;return S(e),`<article data-id="${e}" data-seed="${u}">
        <img alt="${t}" />
        <div>${t}</div>
      </article>`}).join(``)}function h(){t(`heightmapSelection`).addEventListener(`click`,e=>{let t=e.target,n=t.closest(`#heightmapSelection article`);if(!n)return;let r=n.dataset.id;r&&(t.matches(`span.icon-cw`)&&C(n,r),_(r))}),t(`heightmapSelectionRenderOcean`).addEventListener(`change`,w),t(`heightmapSelectionColorScheme`).addEventListener(`change`,w),t(`heightmapSelectionRedrawPreview`).addEventListener(`click`,w),t(`heightmapSelectionEditTemplates`).addEventListener(`click`,e=>T(e.currentTarget)),t(`heightmapSelectionImportHeightmap`).addEventListener(`click`,e=>T(e.currentTarget))}function g(){return t(`heightmapSelection`).querySelector(`.selected`)?.dataset?.id}function _(e){let n=t(`heightmapSelection`);n.querySelector(`.selected`)?.classList?.remove(`selected`),n.querySelector(`[data-id="${e}"]`)?.classList?.add(`selected`)}function v(){return t(`heightmapSelection`).querySelector(`.selected`)?.dataset?.seed}function y(e){return e in c?c[e].name:s[e].name}function b(e){let n=t(`pointsInput`),r=n.dataset.cells;n.dataset.cells=String(l);try{let t=Grid.shouldRegenerate(e,seed,graphWidth,graphHeight)?Grid.generate(seed,graphWidth,graphHeight):structuredClone(e);return Grid.resetHeights(t),t}finally{n.dataset.cells=r}}function x(e){let n=E(HeightmapGenerator.fromTemplate(d,e));t(`heightmapSelection`).querySelector(`[data-id="${e}"]`)?.querySelector(`img`)?.setAttribute(`src`,n)}async function S(e){let n=E(await HeightmapGenerator.fromPrecreated(d,e));t(`heightmapSelection`).querySelector(`[data-id="${e}"]`)?.querySelector(`img`)?.setAttribute(`src`,n)}function C(e,t){d=b(d);let r=n();e.dataset.seed=r,Math.random=aleaPRNG(r),x(t)}function w(){d=b(d);let e=t(`heightmapSelection`).querySelectorAll(`article`);for(let t of e){let{id:e,seed:n}=t.dataset;e&&n&&(Math.random=aleaPRNG(n),e in c?x(e):S(e))}}function T(e){let t=e.dataset.tool;t&&i({title:e.dataset.tip??``,message:`Opening the tool will erase the current map. Are you sure you want to proceed?`,confirm:`Continue`,onConfirm:()=>window.Controllers.HeightmapEditor.open({mode:`erase`,tool:t})})}function E(e){let n=getColorScheme(t(`heightmapSelectionColorScheme`).value),i=t(`heightmapSelectionRenderOcean`).checked;return r({heights:e,width:d.cellsX,height:d.cellsY,scheme:n,renderOcean:i})}var D={open:f};export{D as HeightmapSelection};