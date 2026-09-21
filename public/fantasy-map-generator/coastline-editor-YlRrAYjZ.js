import{n as e,t}from"./alea-DV1ySCb3.js";import{k as n}from"./utils-omhVlsRt.js";import{t as r}from"./coastline-generator-DoQgut8s.js";import{r as i,t as a}from"./dialog-helpers-CdcIkxap.js";var o=e(t()),s=[{id:`coastMaxDepth`,label:`Detail depth`,tip:`Maximum recursion levels per edge. Each +1 can double point count in rough zones.`,min:1,max:5,step:1,key:`maxDepth`},{id:`coastBaseAmplitude`,label:`Roughness amplitude`,tip:`Peak perpendicular displacement. Scales with √(edge length) so large edges stay proportional.`,min:.2,max:4,step:.1,key:`baseAmplitude`},{id:`coastAmplitudeDecay`,label:`Amplitude decay`,tip:`Amplitude multiplier per recursion level (Hurst exponent). Lower = more jagged finer detail.`,min:.01,max:.99,step:.01,key:`amplitudeDecay`},{id:`coastMinEdge`,label:`Minimum edge`,tip:`Edges shorter than this (map units) are never subdivided regardless of roughness.`,min:.1,max:10,step:.1,key:`minEdge`},{id:`coastSmoothThreshold`,label:`Smooth threshold`,tip:`Profile values below this receive zero displacement → glassy arc. Controls calm-coast coverage.`,min:.01,max:.5,step:.01,key:`smoothThreshold`},{id:`coastRoughnessContrast`,label:`Roughness contrast`,tip:`Power applied to the roughness profile. Higher = sharper calm/rough transition.`,min:.5,max:10,step:.1,key:`roughnessContrast`},{id:`coastProfileHarmonics`,label:`Roughness zones`,tip:`Number of cosine harmonics shaping the roughness envelope. 1 = one large concentrated patch; 8 = many small scattered zones.`,min:1,max:8,step:1,key:`profileHarmonics`},{id:`coastLakeSmoothThreshMult`,label:`Lake smooth multiplier`,tip:`Smooth-threshold multiplier for lake shores. 1 = same roughness as ocean.`,min:.1,max:5,step:.1,key:`lakeSmoothThreshMult`}],c={Default:r.getDefaultSettings(),Smooth:{maxDepth:3,baseAmplitude:1,amplitudeDecay:.6,minEdge:1,smoothThreshold:.3,roughnessContrast:2,profileHarmonics:1,lakeSmoothThreshMult:3},Rocky:{maxDepth:4,baseAmplitude:3,amplitudeDecay:.7,minEdge:.5,smoothThreshold:.05,roughnessContrast:.8,profileHarmonics:7,lakeSmoothThreshMult:1.2},Fjords:{maxDepth:4,baseAmplitude:2.8,amplitudeDecay:.92,minEdge:.3,smoothThreshold:.25,roughnessContrast:5,profileHarmonics:2,lakeSmoothThreshMult:2.5},Archipelago:{maxDepth:4,baseAmplitude:1.8,amplitudeDecay:.88,minEdge:.5,smoothThreshold:.18,roughnessContrast:1,profileHarmonics:8,lakeSmoothThreshMult:1.5}},l=`preview_coastline`;function u(){customization||(a(`#culturesEditor, .stable`),d(),m(),$(`#coastlineSettingsDialog`).dialog({title:`Coastline Settings Editor`,resizable:!1,width:`auto`,position:{my:`right top`,at:`right-10 top+10`,of:`svg`},close:()=>{i(`coastlineSettingsDialog`)}}))}function d(){i(`coastlineSettingsDialog`),document.body.insertAdjacentHTML(`beforeend`,p());for(let{id:e,key:t}of s){let i=n(e),a=n(`${e}Reset`),o=r.getDefaultSettings()[t];i.addEventListener(`input`,e=>{e.target===e.currentTarget&&f({[t]:i.valueAsNumber})}),a.addEventListener(`click`,()=>{i.value=String(o),f({[t]:o})})}let e=n(`coastEnabled`),t=n(`coastSliders`),a=n(`coastEnabledTrack`),o=n(`coastEnabledThumb`);e.checked=r.settings.enabled;let l=()=>{let{enabled:e}=r.settings;a.style.background=e?`#33bb88`:`#bbb`,o.style.left=e?`18px`:`2px`,t.style.opacity=e?``:`0.4`,t.style.pointerEvents=e?``:`none`,Object.keys(c).forEach(t=>{let r=n(`coastPreset_${t}`);r.disabled=!e})};l(),e.addEventListener(`change`,()=>{f({enabled:e.checked}),l()});for(let e of Object.keys(c))n(`coastPreset_${e}`).addEventListener(`click`,()=>{let t=c[e];for(let{id:e,key:r}of s)r in t&&(n(e).value=String(t[r]));f(t)})}function f(e){r.update(e),m(),Layers.draw(`landmass`,`coastline`,`lakes`)}function p(){let e=r.settings,t=Object.keys(c).map(e=>`<button id="coastPreset_${e}" style="font-size:.78em;padding:2px 8px">${e}</button>`).join(``),n=s.map(({id:t,label:n,tip:r,min:i,max:a,step:o,key:s})=>`
      <tr data-tip="${r}">
        <td style="padding:2px 0;white-space:nowrap">${n}</td>
        <td style="padding:2px 4px">
          <slider-input id="${t}" min="${i}" max="${a}" step="${o}" value="${e[s]}"></slider-input>
        </td>
        <td style="padding:2px 0">
          <button id="${t}Reset" title="Reset to default"
            style="font-size:.75em;padding:1px 5px;cursor:pointer">↺</button>
        </td>
      </tr>`).join(``);return`
    <div id="coastlineSettingsDialog" style="display:none" class="dialog">
      <style>
        #coastlineSettingsDialog slider-input input[type=range] { width:100%; }
      </style>
      <div style="display:flex;justify-content:space-between;gap:10px;margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid #ddd">
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;user-select:none" data-tip="Enable or disable coastline fractalization. When disabled, coastlines are simple arcs between feature vertices. Enabling adds naturalistic roughness but can increase rendering time, especially at high detail levels.">
          <input id="coastEnabled" type="checkbox" ${e.enabled?`checked`:``}
            style="position:absolute;opacity:0;pointer-events:none;width:0;height:0"/>
          <span id="coastEnabledTrack" style="position:relative;display:inline-block;width:36px;height:20px;border-radius:10px;background:${e.enabled?`#33bb88`:`#bbb`};cursor:pointer;flex-shrink:0">
            <span id="coastEnabledThumb" style="position:absolute;top:2px;left:${e.enabled?`18px`:`2px`};width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.3)"></span>
          </span>
        </label>
        <div style="display:flex;align-items:center;gap:4px">
          <span style="color:#999;font-size:.85em">Preset</span>
          ${t}
        </div>
      </div>
      <div id="coastSliders">
        <table style="border-collapse:collapse;width:100%">
          <colgroup>
            <col style="width:35%">
            <col style="width:60%">
            <col style="width:5%">
          </colgroup>
          <tbody>${n}</tbody>
        </table>
      </div>
      <div style="display:flex;gap:6px;margin-top:10px;align-items:flex-start">
        <div style="flex:1;min-width:0">
          <div style="color:#999;font-size:.85em;margin-bottom:3px">Roughness profile</div>
          <canvas id="coastRoughnessGraph" width="auto" height="100" style="display:block"></canvas>
        </div>
        <div>
          <div style="color:#999;font-size:.85em;margin-bottom:3px">Shape preview</div>
          <canvas id="coastShapePreview" width="100" height="100" style="display:block"></canvas>
        </div>
      </div>
    </div>`}function m(){h(n(`coastRoughnessGraph`)),g(n(`coastShapePreview`))}function h(e){let t=e.width,n=e.height,i=e.getContext(`2d`);i.clearRect(0,0,t,n);let a=r.settings,s=(0,o.default)(l),c=r.getRoughnessProfile(s,a.roughnessContrast,a.profileHarmonics),u=n*(1-Math.min(Math.max(a.smoothThreshold,0),1)),d=n,f=[],p=[];for(let e=0;e<=r.PROFILE_SIZE;e++)f.push(e/r.PROFILE_SIZE*t),p.push(n*(1-c[e%r.PROFILE_SIZE]));let m=(e,n,r)=>{let a=n-e;if(!(a<=0)){i.save(),i.beginPath(),i.rect(0,e,t,a),i.clip(),i.beginPath(),i.moveTo(f[0],p[0]);for(let e=1;e<f.length;e++)i.lineTo(f[e],p[e]);i.lineTo(f[f.length-1],d),i.lineTo(f[0],d),i.closePath(),i.fillStyle=r,i.fill(),i.restore()}},h=(e,n,r)=>{let a=n-e;if(!(a<=0)){i.save(),i.beginPath(),i.rect(0,e,t,a),i.clip(),i.beginPath(),i.moveTo(f[0],p[0]);for(let e=1;e<f.length;e++)i.lineTo(f[e],p[e]);i.strokeStyle=r,i.lineWidth=1.5,i.stroke(),i.restore()}};m(0,u,`rgba(210,90,30,0.20)`),h(0,u,`#c85520`),m(u,d,`rgba(30,165,135,0.20)`),h(u,d,`#18a888`),i.save(),i.beginPath(),i.setLineDash([4,3]),i.moveTo(0,u),i.lineTo(t,u),i.strokeStyle=`rgba(30,140,100,0.75)`,i.lineWidth=1,i.stroke(),i.setLineDash([]),i.restore(),i.font=`bold 8px sans-serif`,i.textAlign=`left`,u>12&&(i.fillStyle=`#c85520`,i.fillText(`ROUGH`,12,11)),d-u>10&&(i.fillStyle=`#18a888`,i.fillText(`CALM`,12,d-4)),a.enabled||(i.fillStyle=`rgba(0,0,0,0.38)`,i.fillRect(0,0,t,n),i.fillStyle=`#fff`)}function g(e){let t=e.width,n=e.height,i=e.getContext(`2d`);i.clearRect(0,0,t,n);let a=t/2,s=n/2,c=Math.min(t,n)*.34,u=[[a,s-c],[a+c,s],[a,s+c],[a-c,s]],d=r.settings,f=d.enabled?r.fractalize(u,(0,o.default)(l),d):{points:u,origIndices:[0,1,2,3]},p=new Path2D(`${r.buildPath(f)}Z`),m=i.createRadialGradient(a,s,0,a,s,Math.max(t,n)*.85);m.addColorStop(0,`#cce5f5`),m.addColorStop(1,`#6aa4cb`),i.fillStyle=m,i.fillRect(0,0,t,n);let h=i.createRadialGradient(a-c*.1,s-c*.1,c*.05,a,s,c*1.1);h.addColorStop(0,`#d8c87a`),h.addColorStop(.5,`#9cbc60`),h.addColorStop(1,`#5c8e40`),i.save(),i.shadowColor=`rgba(0,20,60,0.35)`,i.shadowBlur=8,i.shadowOffsetX=3,i.shadowOffsetY=3,i.fillStyle=h,i.fill(p),i.restore(),i.strokeStyle=`#5c4526`,i.lineWidth=1.5,i.stroke(p);let g=f.origIndices.map(e=>f.points[e]);i.beginPath();for(let e=0;e<g.length;e++){let[t,n]=g[e];e===0?i.moveTo(t,n):i.lineTo(t,n)}i.closePath(),i.strokeStyle=`rgba(255,255,255,0.45)`,i.lineWidth=.8,i.setLineDash([3,3]),i.stroke(),i.setLineDash([]);for(let[e,t]of g)i.beginPath(),i.arc(e,t,2.5,0,Math.PI*2),i.fillStyle=`rgba(255,255,255,0.85)`,i.fill(),i.strokeStyle=`rgba(60,40,10,0.55)`,i.lineWidth=.8,i.stroke();d.enabled||(i.fillStyle=`rgba(0,0,0,0.38)`,i.fillRect(0,0,t,n),i.fillStyle=`#fff`,i.font=`bold 11px sans-serif`,i.textAlign=`center`,i.textBaseline=`middle`,i.fillText(`OFF`,a,s),i.textBaseline=`alphabetic`,i.textAlign=`left`)}var _={open:u};export{_ as CoastlineEditor};