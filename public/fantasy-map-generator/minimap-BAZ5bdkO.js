import{Et as e,k as t,wt as n}from"./utils-BIleyWmR.js";import{t as r}from"./dialog-helpers-50LJgx0U.js";function i(){r(`#minimap, .stable`),a(),c(),$(`#minimap`).dialog({title:`Minimap`,resizable:!1,width:`auto`,position:{my:`left bottom`,at:`left+10 bottom-25`,of:`svg`,collision:`fit`},open:function(){$(this).parent().addClass(`minimap-dialog`)},close:o})}function a(){document.getElementById(`minimap`)?.remove(),t(`dialogs`).insertAdjacentHTML(`beforeend`,`<div id="minimap" class="dialog stable">
      <div id="minimapViewportWrap">
        <svg id="minimapSurface" preserveAspectRatio="xMidYMid meet" aria-label="Map minimap">
          <use id="minimapMapUse" href="#viewbox"></use>
          <rect id="minimapViewport"></rect>
        </svg>
      </div>
    </div>`),t(`minimapSurface`).addEventListener(`click`,s),document.getElementById(`minimapStyles`)?.remove();let e=document.createElement(`style`);e.id=`minimapStyles`,e.textContent=`
    .minimap-dialog .ui-dialog-content {
      padding: 0 !important;
      overflow: hidden;
    }

    #minimap {
      padding: 0 !important;
      background: transparent;
    }

    #minimapViewportWrap {
      position: relative;
      width: 20em;
      border: 0;
    }

    #minimapSurface {
      display: block;
      width: 100%;
      height: auto;
      cursor: crosshair;
    }

    #minimapMapUse {
      pointer-events: none;
    }

    #minimapViewport {
      fill: rgba(190, 255, 137, 0.1);
      stroke: #624954;
      stroke-width: 1;
      stroke-dasharray: 4;
      vector-effect: non-scaling-stroke;
      pointer-events: none;
    }
  `,document.head.append(e)}function o(){$(`#minimap`).dialog(`destroy`),t(`minimap`).remove(),document.getElementById(`minimapStyles`)?.remove()}function s(e){let t=document.getElementById(`minimapSurface`);if(!t)return;let r=t.createSVGPoint();r.x=e.clientX,r.y=e.clientY;let i=t.getScreenCTM();if(!i)return;let a=r.matrixTransform(i.inverse()),o=n(a.x,0,graphWidth),s=n(a.y,0,graphHeight);zoomTo(o,s,scale,450)}function c(){let t=document.getElementById(`minimapSurface`),n=document.getElementById(`minimapViewport`),r=document.getElementById(`minimapMapUse`);if(!t||!n||!r)return;t.setAttribute(`viewBox`,`0 0 ${graphWidth} ${graphHeight}`);let i=scale?1/scale:1;r.setAttribute(`transform`,`translate(${e(-viewX*i,3)} ${e(-viewY*i,3)}) scale(${e(i,6)})`);let a=Math.max(0,-viewX*i),o=Math.max(0,-viewY*i),s=Math.min(graphWidth,a+svgWidth*i),c=Math.min(graphHeight,o+svgHeight*i);n.setAttribute(`x`,String(e(a,3))),n.setAttribute(`y`,String(e(o,3))),n.setAttribute(`width`,String(e(Math.max(0,s-a),3))),n.setAttribute(`height`,String(e(Math.max(0,c-o),3)))}window.updateMinimap=c;var l={open:i};export{l as Minimap};