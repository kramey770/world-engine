import{Ct as e,Tt as t,k as n}from"./utils-D3KEhgY0.js";import{H as r}from"./index-D3JPylQY.js";function i(){r(`#minimap, .stable`),a(),c(),$(`#minimap`).dialog({title:`Minimap`,resizable:!1,width:`auto`,position:{my:`left bottom`,at:`left+10 bottom-25`,of:`svg`,collision:`fit`},open:function(){$(this).parent().addClass(`minimap-dialog`)},close:o})}function a(){document.getElementById(`minimap`)?.remove(),n(`dialogs`).insertAdjacentHTML(`beforeend`,`<div id="minimap" class="dialog stable">
      <div id="minimapViewportWrap">
        <svg id="minimapSurface" preserveAspectRatio="xMidYMid meet" aria-label="Map minimap">
          <use id="minimapMapUse" href="#viewbox"></use>
          <rect id="minimapViewport"></rect>
        </svg>
      </div>
    </div>`),n(`minimapSurface`).addEventListener(`click`,s),document.getElementById(`minimapStyles`)?.remove();let e=document.createElement(`style`);e.id=`minimapStyles`,e.textContent=`
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
  `,document.head.append(e)}function o(){$(`#minimap`).dialog(`destroy`),n(`minimap`).remove(),document.getElementById(`minimapStyles`)?.remove()}function s(t){let n=document.getElementById(`minimapSurface`);if(!n)return;let r=n.createSVGPoint();r.x=t.clientX,r.y=t.clientY;let i=n.getScreenCTM();if(!i)return;let a=r.matrixTransform(i.inverse()),o=e(a.x,0,graphWidth),s=e(a.y,0,graphHeight);zoomTo(o,s,scale,450)}function c(){let e=document.getElementById(`minimapSurface`),n=document.getElementById(`minimapViewport`),r=document.getElementById(`minimapMapUse`);if(!e||!n||!r)return;e.setAttribute(`viewBox`,`0 0 ${graphWidth} ${graphHeight}`);let i=scale?1/scale:1;r.setAttribute(`transform`,`translate(${t(-viewX*i,3)} ${t(-viewY*i,3)}) scale(${t(i,6)})`);let a=Math.max(0,-viewX*i),o=Math.max(0,-viewY*i),s=Math.min(graphWidth,a+svgWidth*i),c=Math.min(graphHeight,o+svgHeight*i);n.setAttribute(`x`,String(t(a,3))),n.setAttribute(`y`,String(t(o,3))),n.setAttribute(`width`,String(t(Math.max(0,s-a),3))),n.setAttribute(`height`,String(t(Math.max(0,c-o),3)))}window.updateMinimap=c;var l={open:i};export{l as Minimap};