import{D as e,gt as t,k as n}from"./utils-D3KEhgY0.js";import{H as r,R as i,U as a,_ as o,v as s,wt as c}from"./index-D3JPylQY.js";var l=t(),u=y(grid);f(),p(),m();function d(){r(`.stable`);let t=n(`templateInput`);g(t.value),u=y(u),$(`#heightmapSelection`).dialog({title:`Select Heightmap`,resizable:!1,position:{my:`center`,at:`center`,of:`svg`},buttons:{Cancel:function(){$(this).dialog(`close`)},Select:function(){let n=h();n&&(e(t,n,v(n)),i(`template`),$(this).dialog(`close`))},"New Map":function(){let n=h();if(!n)return;e(t,n,v(n)),i(`template`);let r=_();regeneratePrompt({seed:r,graph:u}),$(this).dialog(`close`)}}})}function f(){let e=document.createElement(`style`);e.textContent=`
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
      filter: drop-shadow(1px 1px 4px #999);
    }

    .heightmap-selection article:hover {
      background-color: #ddd;
      filter: drop-shadow(1px 1px 8px #999);
      cursor: pointer;
    }

    .heightmap-selection article.selected {
      background-color: #ccc;
      outline: 1px solid var(--dark-solid);
      filter: drop-shadow(1px 1px 8px #999);
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
      outline: 1px solid #bbb;
      padding: 1px 3px;
      border-radius: 4px;
      transition: all 0.1s ease-in-out;
    }

    .heightmap-selection article .regeneratePreview:hover {
      outline: 1px solid #666;
    }

    .heightmap-selection article .regeneratePreview:active {
      outline: 1px solid #333;
      color: #000;
      transform: rotate(45deg);
    }
  `,document.head.appendChild(e)}function p(){let e=`<div id="heightmapSelection" class="dialog stable">
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
  </div>`;n(`dialogs`).insertAdjacentHTML(`beforeend`,e);let t=document.getElementsByClassName(`heightmap-selection_container`);t[0].innerHTML=Object.keys(s).map(e=>{let t=s[e].name;return Math.random=aleaPRNG(l),`<article data-id="${e}" data-seed="${l}">
        <img src="${T(HeightmapGenerator.fromTemplate(u,e))}" alt="${t}" />
        <div>
          ${t}
          <span data-tip="Regenerate preview" class="icon-cw regeneratePreview"></span>
        </div>
      </article>`}).join(``),t[1].innerHTML=Object.keys(o).map(e=>{let t=o[e].name;return x(e),`<article data-id="${e}" data-seed="${l}">
        <img alt="${t}" />
        <div>${t}</div>
      </article>`}).join(``)}function m(){n(`heightmapSelection`).addEventListener(`click`,e=>{let t=e.target,n=t.closest(`#heightmapSelection article`);if(!n)return;let r=n.dataset.id;r&&(t.matches(`span.icon-cw`)&&S(n,r),g(r))}),n(`heightmapSelectionRenderOcean`).addEventListener(`change`,C),n(`heightmapSelectionColorScheme`).addEventListener(`change`,C),n(`heightmapSelectionRedrawPreview`).addEventListener(`click`,C),n(`heightmapSelectionEditTemplates`).addEventListener(`click`,e=>w(e.currentTarget)),n(`heightmapSelectionImportHeightmap`).addEventListener(`click`,e=>w(e.currentTarget))}function h(){return n(`heightmapSelection`).querySelector(`.selected`)?.dataset?.id}function g(e){let t=n(`heightmapSelection`);t.querySelector(`.selected`)?.classList?.remove(`selected`),t.querySelector(`[data-id="${e}"]`)?.classList?.add(`selected`)}function _(){return n(`heightmapSelection`).querySelector(`.selected`)?.dataset?.seed}function v(e){return e in s?s[e].name:o[e].name}function y(e){let t=Grid.shouldRegenerate(e,seed,graphWidth,graphHeight)?Grid.generate(seed,graphWidth,graphHeight):structuredClone(e);return Grid.resetHeights(t),t}function b(e){let t=T(HeightmapGenerator.fromTemplate(u,e));n(`heightmapSelection`).querySelector(`[data-id="${e}"]`)?.querySelector(`img`)?.setAttribute(`src`,t)}async function x(e){let t=T(await HeightmapGenerator.fromPrecreated(u,e));n(`heightmapSelection`).querySelector(`[data-id="${e}"]`)?.querySelector(`img`)?.setAttribute(`src`,t)}function S(e,n){u=y(u);let r=t();e.dataset.seed=r,Math.random=aleaPRNG(r),b(n)}function C(){u=y(u);let e=n(`heightmapSelection`).querySelectorAll(`article`);for(let t of e){let{id:e,seed:n}=t.dataset;!e||!n||(Math.random=aleaPRNG(n),e in s?b(e):x(e))}}function w(e){let t=e.dataset.tool;t&&a({title:e.dataset.tip??``,message:`Opening the tool will erase the current map. Are you sure you want to proceed?`,confirm:`Continue`,onConfirm:()=>window.Controllers.HeightmapEditor.open({mode:`erase`,tool:t})})}function T(e){let t=getColorScheme(n(`heightmapSelectionColorScheme`).value),r=n(`heightmapSelectionRenderOcean`).checked;return c({heights:e,width:u.cellsX,height:u.cellsY,scheme:t,renderOcean:r})}var E={open:d};export{E as HeightmapSelection};