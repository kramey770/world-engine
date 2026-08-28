import{Ct as e,T as t,Tt as n,Z as r,Zt as i,w as a}from"./utils-D3KEhgY0.js";import{E as o,L as s,Q as c,St as l,b as u,ut as d}from"./index-D3JPylQY.js";var f=20,p={freshwater:1,salt:2,sinkhole:3,dry:4,lava:5,frozen:6},m=null;function h(e){let t=2166136261,n=e=>{t^=e&255,t=Math.imul(t,16777619)>>>0},r=e=>{if(e)for(let t=0;t<e.length;t++){let r=e[t];n(r),r>255&&n(r>>8)}},i=[seed,graphWidth,graphHeight,grid.cellsX,grid.cellsY,e.strength,e.riverDepth,e.octaves,e.bakeResolution].join(`|`);for(let e=0;e<i.length;e++)n(i.charCodeAt(e));return r(grid.cells.h),r(pack.cells.r),r(pack.cells.fl),t.toString(36)}function g(e){let t=graphHeight/graphWidth,n=e,r=Math.max(64,Math.round(n*(t<=1?t:1/t)));return t<=1?[n,r]:[r,n]}function _(){let{cellsX:e,cellsY:t}=grid,n=grid.cells.h.length,r=new Uint8Array(n*4),i=Uint8Array.from(grid.cells.h),a=new Float64Array(n),o=new Uint16Array(n);for(let e=0;e<pack.cells.g.length;e++){let t=pack.cells.g[e];a[t]+=pack.cells.h[e],o[t]++}for(let e=0;e<n;e++)o[e]>0&&(i[e]=Math.round(a[e]/o[e]));for(let e=0;e<n;e++){let t=i[e],n=0;if(grid.cells.c[e])for(let r of grid.cells.c[e]){if(i[r]<f)continue;let e=Math.abs(t-i[r]);e>n&&(n=e)}r[e*4]=t,r[e*4+1]=Math.min(n*10,255),r[e*4+3]=255}let s=new THREE.DataTexture(r,e,t,THREE.RGBAFormat,THREE.UnsignedByteType);return s.minFilter=s.magFilter=THREE.LinearFilter,s.needsUpdate=!0,s}function v(e,t){let n=e/graphWidth,r=t/graphHeight,i=e=>e&&e.type!==`ocean`&&e.type!==`lake`,a=document.createElement(`canvas`);a.width=e,a.height=t;let o=a.getContext(`2d`);o.fillStyle=`#000`,o.fillRect(0,0,e,t),o.save(),o.scale(n,r),o.fillStyle=`#fff`;for(let e of pack.features)i(e)&&o.fill(new Path2D(l.getFeaturePath(e)));o.fillStyle=`#000`;for(let e of pack.features)!e||e.type!==`lake`||o.fill(new Path2D(l.getFeaturePath(e)));o.restore();let s=Math.max(1,grid.spacing*.5*n),c=document.createElement(`canvas`);c.width=e,c.height=t;let u=c.getContext(`2d`);u.fillStyle=`#000`,u.fillRect(0,0,e,t),u.save(),u.scale(n,r),u.fillStyle=u.strokeStyle=`#fff`,u.lineJoin=u.lineCap=`round`;let d=1.1/n;for(let e of pack.rivers||[]){if(!e.cells||e.cells.length<2)continue;let t=e.points&&e.points.length===e.cells.length?e.points:null;try{let n=Rivers.addMeandering(e.cells,t);u.fill(new Path2D(Rivers.getRiverPath(n,e.widthFactor,e.sourceWidth)));let r=n[0][2];for(let t=1;t<n.length;t++){n[t][2]>r&&(r=n[t][2]);let i=Rivers.getOffset({flux:r,pointIndex:t,widthFactor:e.widthFactor,startingWidth:e.sourceWidth});u.lineWidth=Math.max(2*i,d),u.beginPath(),u.moveTo(n[t-1][0],n[t-1][1]),u.lineTo(n[t][0],n[t][1]),u.stroke()}}catch{}}u.restore();let m=s*2,h=document.createElement(`canvas`);h.width=e,h.height=t;let g=h.getContext(`2d`);g.fillStyle=`#fff`,g.fillRect(0,0,e,t),g.save(),g.scale(n,r),g.fillStyle=`#000`;for(let e of pack.features)i(e)&&g.fill(new Path2D(l.getFeaturePath(e)));g.strokeStyle=`#fff`,g.lineJoin=`round`,g.lineWidth=m*2/n;for(let e of pack.features){if(!e||e.type===`ocean`)continue;let t=new Path2D(l.getFeaturePath(e));e.type===`lake`&&g.fill(t),g.stroke(t)}g.restore();let _=document.createElement(`canvas`);_.width=e,_.height=t;let v=_.getContext(`2d`);v.drawImage(c,0,0),v.globalCompositeOperation=`multiply`,v.drawImage(h,0,0),o.globalCompositeOperation=`multiply`,o.filter=`invert(1)`,o.drawImage(_,0,0),o.filter=`none`,o.globalCompositeOperation=`source-over`;let y=document.createElement(`canvas`);y.width=e,y.height=t;let b=y.getContext(`2d`);b.filter=`blur(${s}px)`,b.drawImage(a,0,0);let x=document.createElement(`canvas`);x.width=e,x.height=t;let S=x.getContext(`2d`);S.fillStyle=`rgb(${f},${f},${f})`,S.fillRect(0,0,e,t),S.save(),S.scale(n,r),S.lineJoin=`round`;for(let e of pack.features){if(!e||e.type!==`lake`)continue;let t=Math.round(Math.max(e.height||f,f)),r=new Path2D(l.getFeaturePath(e));S.fillStyle=S.strokeStyle=`rgb(${t},${t},${t})`,S.lineWidth=s*6/n,S.fill(r),S.stroke(r)}S.restore();let C=document.createElement(`canvas`);C.width=e,C.height=t;let w=C.getContext(`2d`);w.filter=`blur(${s}px)`,w.drawImage(x,0,0);let ee=document.createElement(`canvas`);ee.width=e,ee.height=t;let T=ee.getContext(`2d`);T.fillStyle=`#000`,T.fillRect(0,0,e,t),T.save(),T.scale(n,r),T.lineJoin=`round`,T.lineWidth=s*6/n;for(let e of pack.features){if(!e||e.type!==`lake`)continue;let t=(p[e.subtype]??1)*40,n=new Path2D(l.getFeaturePath(e));T.fillStyle=T.strokeStyle=`rgb(${t},${t},${t})`,T.fill(n),T.stroke(n)}T.restore();let te=u.getImageData(0,0,e,t).data,ne=b.getImageData(0,0,e,t).data,E=w.getImageData(0,0,e,t).data,re=T.getImageData(0,0,e,t).data,D=new Uint8Array(e*t*4);for(let n=0;n<e*t;n++)D[n*4]=ne[n*4],D[n*4+1]=E[n*4],D[n*4+2]=te[n*4],D[n*4+3]=re[n*4];let O=new THREE.DataTexture(D,e,t,THREE.RGBAFormat,THREE.UnsignedByteType);return O.minFilter=O.magFilter=THREE.LinearFilter,O.needsUpdate=!0,{texture:O,data:D}}function y(e,t){let n=e;for(let e=0;e<t;e++){let e=[n[0]];for(let t=0;t<n.length-1;t++){let r=n[t],i=n[t+1];e.push([r[0]*.75+i[0]*.25,r[1]*.75+i[1]*.25,r[2]*.75+i[2]*.25],[r[0]*.25+i[0]*.75,r[1]*.25+i[1]*.75,r[2]*.25+i[2]*.75])}e.push(n[n.length-1]),n=e}return n}function b(e,t){let n=document.createElement(`canvas`);n.width=Math.max(256,Math.round(e/4)),n.height=Math.max(2,Math.round(n.width*t/e));let r=n.getContext(`2d`);r.fillStyle=`#000`,r.fillRect(0,0,n.width,n.height);let i=()=>{let e=new THREE.CanvasTexture(n);return e.flipY=!1,e.minFilter=e.magFilter=THREE.LinearFilter,e.generateMipmaps=!1,e};if(!pack.rivers?.length||!pack.cells.fl)return i();let a=[1,1,2,3,5,8,13,21,34].map(e=>e/200),o=[];for(let e of pack.rivers){let t=[];for(let n=0;n<e.cells.length;n++){let r=e.cells[n];if(r<0||pack.cells.h[r]<f)continue;let i=Math.min(pack.cells.fl[r]**.7/500,1),o=n/200+(a[n]??.17),s=e.widthFactor*(o+i)+(e.sourceWidth||0);t.push([pack.cells.p[r][0],pack.cells.p[r][1],s])}t.length>1&&o.push(y(t,2))}let s=n.width/graphWidth,c=grid.spacing*.6,l=[{grow:1,gray:255},{grow:2,gray:140},{grow:3.4,gray:70},{grow:5.2,gray:30}];r.lineCap=`round`,r.lineJoin=`round`,r.globalCompositeOperation=`lighten`;for(let{grow:e,gray:t}of l){r.strokeStyle=`rgb(${t},${t},${t})`;for(let t of o)for(let n=0;n<t.length-1;n++){let[i,a,o]=t[n],[l,u,d]=t[n+1],f=c+(o+d)/2*3;r.lineWidth=Math.max(1,f*e*s),r.beginPath(),r.moveTo(i*s,a*s),r.lineTo(l*s,u*s),r.stroke()}}let{fl:u,h:d,c:p,p:m,r:h}=pack.cells;for(let e of pack.cells.i){if(d[e]<f||h[e]||!u[e]||u[e]<20)continue;let t=-1,n=d[e];for(let r of p[e])d[r]<n&&(n=d[r],t=r);if(t===-1)continue;let i=Math.min(u[e]/100,1),a=Math.round(12+28*i);r.strokeStyle=`rgb(${a},${a},${a})`,r.lineWidth=Math.max(1,c*.4*s),r.beginPath(),r.moveTo(m[e][0]*s,m[e][1]*s),r.lineTo(m[t][0]*s,m[t][1]*s),r.stroke()}return i()}var x=`
    precision highp float;
    attribute vec3 position;
    void main() {
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,S=`
    precision highp float;

    uniform sampler2D uHeight; // R: height byte 0-100, G: local relief
    uniform sampler2D uCoast;  // R: blurred land mask (0.5 = true coastline),
                               // G: water surface byte 0-100 -- bake resolution, sampled directly
    uniform sampler2D uRivers; // R: valley intensity
    uniform vec2 uGridSize;    // (cellsX, cellsY)
    uniform vec2 uResolution;  // bake size in px
    uniform float uAspect;     // graphHeight / graphWidth
    uniform float uSeed;
    uniform float uStrength;   // gully amplitude factor (1 = default)
    uniform float uRiverDepth; // 0..1
    uniform int uOctaves;

    const int MAX_OCTAVES = 6;
    const float TAU = 6.2831853;
    const float SEA = 0.20;

    const float BASE_NOISE_CELLS = 0.7;  // base-FBM wavelength in grid cells
    const float BASE_NOISE_AMP = 0.008;
    const float NOISE_STEER = 0.5;       // fraction of FBM gradient perturbing the flow
    const float GULLY_CELLS0 = 0.16;     // octave-0 erosion lattice: ~6 grid cells per kernel
    const float GULLY_AMP0 = 0.07;
    const float GULLY_GAIN = 0.55;       // per-octave amplitude falloff
    const float DIR_SCALE = 0.5;         // stripes per lattice cell per unit slope
    const float MAX_STRIPE_FREQ = 4.0;   // cap stripes per lattice cell
    const float RIVER_RELIEF_CAP = 0.15; // max carve depth, in 0..1 height units
    const float COAST_RAMP = 0.2;        // land mask span
    const float RIDGE_SHARPEN = 0.8;      // unsharp-mask strength for crest sharpening
    const float EDGE_SHARP = 0.7;         // edge-shaping exponent: sharper crests, rounder gully floors
    const float SLOPE_LO = 0.015;         // gradient trick: local slope (height delta per grid cell
    const float SLOPE_HI = 0.05;          // slope above which erosion energy is unaffected
    const float FLAT_ENERGY_FLOOR = 0.5;  // min energy fraction kept on dead-flat ground
    const bool QUANTIZE_GULLY_DIR = true; // runevision sign trick: feed back only the sign of the derivative

    float hash12(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }

    vec2 hash22(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.xx + p3.yz) * p3.zy);
    }

    // value noise with analytic derivative: (value [-1,1], d/dx, d/dy)
    vec3 noised(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      float a = hash12(i);
      float b = hash12(i + vec2(1.0, 0.0));
      float c = hash12(i + vec2(0.0, 1.0));
      float d = hash12(i + vec2(1.0, 1.0));
      vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
      vec2 du = 30.0 * f * f * (f * (f - 2.0) + 1.0);
      float k0 = b - a;
      float k1 = c - a;
      float k2 = a - b - c + d;
      float value = a + k0 * u.x + k1 * u.y + k2 * u.x * u.y;
      vec2 grad = vec2((k0 + k2 * u.y) * du.x, (k1 + k2 * u.x) * du.y);
      return vec3(value * 2.0 - 1.0, grad * 2.0);
    }

    // sample the coarse heightmap; half-texel alignment maps uv 0..1 onto
    // cell centers 0..N-1, matching how the classic mesh spans the map.
    // returns (height 0..1, local relief: max land-neighbor delta, 0..1 height units)
    vec2 heightSample(vec2 uv) {
      vec2 t = 1.0 / uGridSize;
      vec2 huv = uv * (1.0 - t) + 0.5 * t;
      vec2 rg = texture2D(uHeight, huv).rg;
      return vec2(rg.x * 2.55, rg.y * 0.255);
    }

    float baseHeight(vec2 uv) {
      return heightSample(uv).x;
    }

    // unsharp-mask blur: average of 4 taps at ~1.5 grid cells, used to pull
    // out the high-frequency detail the bilinear base already implies
    float blurredHeight(vec2 uv) {
      vec2 e = 1.5 / uGridSize;
      float h0 = baseHeight(uv + vec2(e.x, 0.0));
      float h1 = baseHeight(uv - vec2(e.x, 0.0));
      float h2 = baseHeight(uv + vec2(0.0, e.y));
      float h3 = baseHeight(uv - vec2(0.0, e.y));
      return (h0 + h1 + h2 + h3) * 0.25;
    }

    // built at bake resolution from the actual coastline geometry, sampled
    // directly (no half-texel cell alignment): R = blurred land mask, 0.5 at
    // the true coastline; G = water surface byte 0-100
    vec4 coastSample(vec2 uv) {
      return texture2D(uCoast, uv);
    }

    // gradient in isotropic map space p = (u, v * aspect), per unit map width
    vec2 baseGradient(vec2 uv) {
      vec2 e = 1.0 / uGridSize;
      float hx1 = baseHeight(uv + vec2(e.x, 0.0));
      float hx0 = baseHeight(uv - vec2(e.x, 0.0));
      float hy1 = baseHeight(uv + vec2(0.0, e.y));
      float hy0 = baseHeight(uv - vec2(0.0, e.y));
      return vec2((hx1 - hx0) / (2.0 * e.x), (hy1 - hy0) / (2.0 * e.y) / uAspect);
    }

    // Erosion kernel after the technique of clayjohn (2018) / Fewes (2023),
    // implemented from the published descriptions: a 4x4 window of cosine-wave
    // kernels around jittered pivots, blended with a gaussian falloff. The
    // phase is dot(p - pivot, dir) with UNNORMALIZED dir, so stripe frequency
    // scales with the slope: steep faces get dense gullies, flats degenerate
    // to cos(0) = 1 — a constant — which is the technique's built-in fade and
    // what makes summits (slope 0) rise into points. The sine term carries the
    // analytic derivative used to steer later octaves (kernel-falloff
    // derivatives are deliberately ignored, like the reference, to keep the
    // steering smooth). Returns (value, d/dx, d/dy) in lattice units
    vec3 erosionKernel(vec2 p, vec2 dir) {
      vec2 ip = floor(p);
      vec2 fp = fract(p);
      vec3 acc = vec3(0.0);
      float wsum = 0.0;
      for (int j = -2; j <= 1; j++) {
        for (int i = -2; i <= 1; i++) {
          vec2 o = vec2(float(i), float(j));
          vec2 pivot = o + hash22(ip + o + uSeed * 7.0) * 0.5;
          vec2 d = fp - pivot;
          float w = exp(-2.0 * dot(d, d));
          float phase = TAU * dot(d, dir);
          acc += w * vec3(cos(phase), -sin(phase) * dir);
          wsum += w;
        }
      }
      return acc / wsum;
    }

    vec2 pack16(float v) {
      float s = clamp(v, 0.0, 1.0) * 65535.0;
      float hi = floor(s / 256.0);
      float lo = floor(s - hi * 256.0);
      return vec2(hi, lo) / 255.0;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / uResolution;
      vec2 p = vec2(uv.x, uv.y * uAspect); // isotropic map space

      float base = baseHeight(uv);
      vec2 grad = baseGradient(uv);
      vec4 coast = coastSample(uv);
      float landFactor = coast.r; // 0.5 = the true coastline
      float waterSurface = coast.g * 2.55;

      // keep detail off the water and let it ramp in over the first ~10 height
      // units of land, so beaches and shores stay clean
      float land = landFactor;
      float aboveSea = clamp((base - SEA) / 0.10, 0.0, 1.0);
      float contrib = land * aboveSea;

      // erosion energy follows the map's terrain classes: h 50+ are hills and
      // h 70+ mountains (full sculpting), rugged areas qualify via local
      // relief regardless of elevation. Flat lowlands get exactly zero energy
      // h<=30 gets none even if locally rugged)
      vec2 heightData = heightSample(uv);
      float localRelief = heightData.y;
      float hillCurve = smoothstep(0.40, 0.70, base);
      float reliefCurve = smoothstep(0.03, 0.10, localRelief);
      float anomalyWeight = smoothstep(0.30, 0.55, base);
      float energy = max(hillCurve, reliefCurve * anomalyWeight);

      // gradient trick: scale energy by the local slope of the base
      // heightmap so genuinely flat ground (plains, plateau tops, valley
      // floors) stays smooth even inside a height band that would
      // otherwise get full erosion detail
      float slopeMag = length(grad) / uGridSize.x;
      float slopeCurve = smoothstep(SLOPE_LO, SLOPE_HI, slopeMag);
      energy *= mix(FLAT_ENERGY_FLOOR, 1.0, slopeCurve);

      float gate = contrib * energy;

      float h = base;

      // small analytic FBM perturbs the flow direction so gullies on the
      // blobby bilinear base don't all run perfectly parallel
      float baseFreq = uGridSize.x * BASE_NOISE_CELLS;
      vec3 n = noised(p * baseFreq + uSeed * 17.0);
      h += n.x * BASE_NOISE_AMP * gate;
      grad += n.yz * BASE_NOISE_AMP * baseFreq * NOISE_STEER * gate;

      // octave stack after the reference technique: each octave's stripes run
      // along the slope of base + previous octaves (analytic derivative
      // feedback), branching like real drainage. The slope-scaled phase makes
      // summits rise toward +1 (pointy peaks) and flats stay quiet — no
      // explicit fade or slope gating is needed
      vec3 acc = vec3(0.0); // accumulated erosion: value, d/dx, d/dy (map units)
      float amp = GULLY_AMP0 * uStrength;
      float freq = uGridSize.x * GULLY_CELLS0;
      for (int i = 0; i < MAX_OCTAVES; i++) {
        if (i >= uOctaves) break;
        if (freq > uResolution.x * 0.3) break; // Nyquist guard

        vec2 flowGrad = grad + acc.yz;
        vec2 dir = vec2(flowGrad.y, -flowGrad.x) * DIR_SCALE;
        float dirLen = length(dir);
        if (dirLen > MAX_STRIPE_FREQ) dir *= MAX_STRIPE_FREQ / dirLen;
        vec3 e = erosionKernel(p * freq, dir);

        // edge shaping (runevision "edge rounding"): sharpens crests between
        // gullies while rounding the gully floors. Only the value channel is
        // reshaped; e.yz keeps the kernel's raw derivative for steering
        e.x = 1.0 - 2.0 * pow(clamp((1.0 - e.x) * 0.5, 1e-4, 1.0), EDGE_SHARP);

        // on flats the kernel returns ~+1 (its built-in fade). Keep that lift
        // only for mountain summits (pointy peaks); neutralize it elsewhere so
        // plains, plateau tops and coastal shelves are not raised into mesas
        float flatness = 1.0 - smoothstep(0.05, 0.4, dirLen);
        e.x = mix(e.x, hillCurve, flatness);

        acc.x += e.x * amp;
        // runevision sign trick: feed back the sign of the derivative rather
        // than its value, so smaller-scale gullies snap to a consistent
        // angle instead of wobbling with the noise magnitude
        vec2 feedback = QUANTIZE_GULLY_DIR ? sign(e.yz) : e.yz;
        acc.yz += feedback * freq * amp;

        amp *= GULLY_GAIN;
        freq *= 2.0;
      }
      float ridgeAcc = acc.x * gate;
      h += ridgeAcc;

      // unsharp-mask crest sharpening: pull the high-frequency detail the
      // bilinear base already implies into defined peaked crests, gated to
      // the hill/mountain band so lowlands stay untouched
      float detail = base - blurredHeight(uv);
      float crestDetail = detail * RIDGE_SHARPEN * hillCurve;
      h += crestDetail;

      // texturing signal: positive on ridges/crests, negative in gullies,
      // ~0 on untouched ground. Consumed by the terrain texture pass
      // (draw-satellite-texture) to blend exposed rock vs. dirt-filled gullies
      float erosionDetail = ridgeAcc + crestDetail;

      // carve valleys toward the real rivers; depth is limited by the relief
      // above the local water surface, so beds never drop below water level.
      // pow() narrows the deep core and softens the rims (V-profile), and the
      // terrain modulation keeps floodplain rivers in shallow swales while
      // rivers cutting through hills get real valleys
      float riverIntensity = pow(texture2D(uRivers, uv).r, 1.4);
      float carveMod = mix(0.3, 1.0, max(hillCurve, 0.85 * reliefCurve));
      float available = max(h - waterSurface, 0.0);
      h -= uRiverDepth * riverIntensity * carveMod * min(available, RIVER_RELIEF_CAP);

      // water flattening + coastal taper in one step, driven by the true
      // coastline mask: fully flat at the water surface for landFactor <= 0.5
      // (the coastline itself and everything seaward of it), ramping up to
      // the full land height over the next COAST_RAMP of mask inland. The
      // 0-elevation line therefore sits exactly on the true coastline, not in
      // the middle of a grid cell
      float coastBlend = smoothstep(0.5, 0.5 + COAST_RAMP, landFactor);
      h = mix(waterSurface, max(h, waterSurface), coastBlend);

      // pack the texturing signals alongside the height: B = erosion detail
      // (ridge/gully, scaled to fit ±0.4 into 0..1), A = drainage intensity
      // (rivers + sub-river flow, already 0..1)
      float erosionPacked = clamp(erosionDetail / 0.4 + 0.5, 0.0, 1.0);
      gl_FragColor = vec4(pack16(h), erosionPacked, riverIntensity);
    }
  `;function C(e,t,n,r,i){let a=new THREE.WebGLRenderTarget(n,r,{format:THREE.RGBAFormat,type:THREE.UnsignedByteType,minFilter:THREE.NearestFilter,magFilter:THREE.NearestFilter,depthBuffer:!1,stencilBuffer:!1}),o=new THREE.RawShaderMaterial({vertexShader:x,fragmentShader:S,uniforms:{uHeight:{value:i.height},uCoast:{value:i.coast},uRivers:{value:i.rivers},uGridSize:{value:new THREE.Vector2(grid.cellsX,grid.cellsY)},uResolution:{value:new THREE.Vector2(n,r)},uAspect:{value:graphHeight/graphWidth},uSeed:{value:(Number.parseInt(seed,10)%1e5||1)/1e5+1},uStrength:{value:t.strength/50},uRiverDepth:{value:t.riverDepth/100},uOctaves:{value:t.octaves}},depthTest:!1,depthWrite:!1}),s=new THREE.BufferGeometry;s.setAttribute(`position`,new THREE.BufferAttribute(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3));let c=new THREE.Mesh(s,o);c.frustumCulled=!1;let l=new THREE.Scene;l.add(c);let u=new THREE.OrthographicCamera(-1,1,1,-1,0,1),d=e.getRenderTarget();e.setRenderTarget(a),e.render(l,u);let f=new Uint8Array(n*r*4);return e.readRenderTargetPixels(a,0,0,n,r,f),e.setRenderTarget(d),a.dispose(),o.dispose(),s.dispose(),f}function w(e){if(!pack.rivers?.length)return;let{heights:t,pixels:n,coast:r,cols:i,rows:a}=e,o=i/graphWidth,s=a/graphHeight,c=(e,r)=>{if(t[e]<=r)return;t[e]=r;let i=Math.round(r*65535);n[e*4]=i>>8,n[e*4+1]=i&255},l=(e,n,l,u,d)=>{let f=l+Math.min(Math.max(u*150,1.5),10),p=e*o-.5,m=n*s-.5,h=Math.max(Math.ceil(p-f),0),g=Math.min(Math.floor(p+f),i-1),_=Math.max(Math.ceil(m-f),0),v=Math.min(Math.floor(m+f),a-1);for(let e=_;e<=v;e++)for(let n=h;n<=g;n++){let a=Math.hypot(n-p,e-m);if(a>f)continue;let o=e*i+n,s=r[o*4+1]/100,u=Math.max(d,s);if(a>l){let e=(a-l)/(f-l);u+=(t[o]-u)*e*e*(3-2*e)}c(o,u)}};for(let n of pack.rivers){if(!n.cells||n.cells.length<2)continue;let r=n.points&&n.points.length===n.cells.length?n.points:null,i;try{i=Rivers.addMeandering(n.cells,r)}catch{continue}if(i.length<2)continue;let a=n.sourceWidth||0,c=0,u=1/0,[d,f]=i[0],p=a;for(let r=0;r<i.length;r++){let[m,h,g]=i[r];g>c&&(c=g);let _=Rivers.getOffset({flux:c,pointIndex:r,widthFactor:n.widthFactor,startingWidth:a}),v=Math.hypot((m-d)*o,(h-f)*s),y=r===0?1:Math.max(Math.ceil(v/.75),1);for(let n=1;n<=y;n++){let r=n/y,i=d+(m-d)*r,a=f+(h-f)*r,s=T(e,t,i,a);s>u+1e-4?l(i,a,(p+(_-p)*r)*o+1,s-u,u):s<u&&(u=s)}d=m,f=h,p=_}}}async function ee(e,t){let n=h(t);if(m&&m.key===n)return m;try{TIME&&console.time(`erosionBake`);let[r,i]=g(t.bakeResolution),a=v(r,i),o={height:_(),coast:a.texture,rivers:b(r,i)},s=C(e,t,r,i,o);for(let e of Object.values(o))e.dispose();let c=new Float32Array(r*i);for(let e=0,t=0;e<c.length;e++,t+=4)c[e]=(s[t]*256+s[t+1])/65535;let l={key:n,heights:c,pixels:s,coast:a.data,cols:r,rows:i};return t.riverDepth>0&&w(l),m=l,TIME&&console.timeEnd(`erosionBake`),m}catch(e){return console.error(`3D erosion bake failed:`,e),m=null,null}}function T(e,t,n,r){let{cols:i,rows:a}=e,o=Math.min(Math.max(n/graphWidth*i-.5,0),i-1),s=Math.min(Math.max(r/graphHeight*a-.5,0),a-1),c=Math.floor(o),l=Math.floor(s),u=Math.min(c+1,i-1),d=Math.min(l+1,a-1),f=o-c,p=s-l,m=t[l*i+c]*(1-f)+t[l*i+u]*f,h=t[d*i+c]*(1-f)+t[d*i+u]*f;return m*(1-p)+h*p}var te=18,ne=100-te;function E(e,t,n){return m?(T(m,m.heights,e,t)*100-te)/ne*n:0}function re(e){return e===void 0?!!m:!!(m&&m.key===e)}function D(){m=null}var O=null,ie=[{color:[.24,.58,.71],density:0},{color:[.89,.78,.57],density:.02},{color:[.75,.68,.54],density:.05},{color:[.62,.61,.34],density:.35},{color:[.45,.59,.25],density:.45},{color:[.25,.48,.18],density:.85},{color:[.17,.4,.15],density:.9},{color:[.11,.36,.13],density:1},{color:[.13,.38,.15],density:1},{color:[.15,.3,.18],density:.85},{color:[.6,.57,.46],density:.12},{color:[.93,.95,.97],density:0},{color:[.26,.4,.23],density:.65}];function ae(e,t){let n=ie[t]||ie[0],r=ie[e];if(r)return r;let a=i(pack.biomes[e].color)?.rgb();return a?{color:[a.r/255,a.g/255,a.b/255],density:n.density}:n}function oe(){let{cellsX:e,cellsY:t}=grid,{temp:n,prec:r,h:i,c:a}=grid.cells,o=n.length,s=Float32Array.from(i);for(let e=0;e<3;e++){let e=Float32Array.from(s);for(let t=0;t<o;t++){if(i[t]>=20)continue;let n=s[t],r=1;for(let e of a[t])i[e]<20&&(n+=s[e],r++);e[t]=n/r}s=e}let c=new Uint8Array(o*4);for(let e=0;e<o;e++)c[e*4]=Math.max(0,Math.min(255,n[e]+128)),c[e*4+1]=Math.min(r[e]/30,1)*255,c[e*4+2]=Math.min(i[e]>=20?i[e]:s[e],100)*2.55,c[e*4+3]=255;let l=new THREE.DataTexture(c,e,t,THREE.RGBAFormat,THREE.UnsignedByteType);return l.minFilter=l.magFilter=THREE.LinearFilter,l.needsUpdate=!0,l}function se(){let{cellsX:e,cellsY:t}=grid,{temp:n,prec:r,h:i}=grid.cells,a=n.length,o=new Uint8Array(a),s=new Uint8Array(a),c=pack.cells.g,l=pack.cells.biome;for(let e=0;e<c.length;e++){let t=c[e];s[t]||(o[t]=l[e],s[t]=1)}let u=new Uint8Array(a*4);for(let e=0;e<a;e++){let t=Biomes.getId(r[e]+4,n[e],i[e],!1),{color:a,density:c}=ae(s[e]?o[e]:t,t);u[e*4]=a[0]*255,u[e*4+1]=a[1]*255,u[e*4+2]=a[2]*255,u[e*4+3]=c*255}let d=new THREE.DataTexture(u,e,t,THREE.RGBAFormat,THREE.UnsignedByteType);return d.minFilter=d.magFilter=THREE.LinearFilter,d.needsUpdate=!0,d}var ce=`
  precision highp float;
  attribute vec3 position;
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,le=`
  precision highp float;

  uniform sampler2D uField;   // R/G: height 16-bit hi/lo, B: ridge(+)/gully(-) packed, A: drainage
  uniform sampler2D uCoast;   // R: blurred land mask (0.5 = true coastline), G: water surface byte 0-100,
                              // B: river mask, A: lake group code * 40
  uniform sampler2D uClimate; // R: temperature C + 128, G: moisture (prec capped at 30), B: grid height (bathymetry)
  uniform sampler2D uBiome;   // RGB: biome satellite albedo, A: vegetation density
  uniform vec2 uResolution;   // output size in px (>= field size when supersampling)
  uniform vec2 uFieldSize;    // baked field size in px (uField/uCoast texels)
  uniform vec2 uGridSize;     // (cellsX, cellsY), for half-texel climate alignment
  uniform vec2 uSlopeScale;   // height gradient per texel -> world-space tan(slope), per axis
  uniform float uAspect;      // graphHeight / graphWidth
  uniform float uSeed;

  // accents over the biome albedo
  const vec3 GOLD      = vec3(0.72, 0.66, 0.35); // sun-dried grass patches
  const vec3 SEDIMENT  = vec3(0.45, 0.44, 0.38); // wet stream-bed soil

  // material palette
  const vec3 ROCK_COLOR  = vec3(0.55, 0.50, 0.45); // brown-gray mountain rock
  const vec3 ROCK_DRY    = vec3(0.69, 0.52, 0.36); // sun-baked red-brown rock
  const vec3 CLIFF_COLOR = vec3(0.37, 0.34, 0.32);
  const vec3 DIRT_COLOR  = vec3(0.58, 0.47, 0.34);
  const vec3 GRAVEL      = vec3(0.72, 0.70, 0.64); // cold-shore beaches
  const vec3 SAND_COLOR  = vec3(0.94, 0.87, 0.66);
  const vec3 SNOW_COLOR  = vec3(0.99, 1.00, 1.00);

  // water palette: saturated teal ocean, bright turquoise shallows
  const vec3 LAGOON_WARM = vec3(0.45, 0.86, 0.84); // tropical turquoise shallows
  const vec3 LAGOON_COLD = vec3(0.42, 0.70, 0.72); // steel-green northern shallows
  const vec3 SHELF_BLUE  = vec3(0.24, 0.58, 0.71); // sunlit continental shelf
  const vec3 OCEAN_BLUE  = vec3(0.15, 0.44, 0.62); // open sea
  const vec3 ABYSS_BLUE  = vec3(0.10, 0.31, 0.48); // deepest ocean
  const vec3 FOAM_COLOR  = vec3(0.97, 1.00, 1.00); // breaking surf

  // lake group palette (hues follow the 2D default style)
  // freshwater reads LIGHTER than the ocean (the 2D style is a pale
  // periwinkle), not a darker basin
  const vec3 FRESH_DEEP    = vec3(0.3, 0.58, 0.86); // freshwater basin
  const vec3 FRESH_RIM     = vec3(0.65, 0.76, 0.97); // #a6c1fd shallow rim
  const vec3 SALT_WATER    = vec3(0.27, 0.60, 0.54); // #409b8a mineral teal
  const vec3 SALT_CRUST    = vec3(0.93, 0.91, 0.85); // evaporite shore rim
  const vec3 SINKHOLE_RIM  = vec3(0.36, 0.79, 0.99); // #5bc9fd cenote cyan
  const vec3 SINKHOLE_DEEP = vec3(0.12, 0.34, 0.60);
  const vec3 DRY_BED       = vec3(0.79, 0.75, 0.65); // #c9bfa7 clay pan
  const vec3 DRY_RIM       = vec3(0.61, 0.56, 0.47); // damp fringe
  const vec3 LAVA_CRUST    = vec3(0.14, 0.10, 0.09); // cooled basalt
  const vec3 LAVA_RED      = vec3(0.56, 0.15, 0.05); // #90270d dull crust red
  const vec3 LAVA_GLOW     = vec3(0.98, 0.36, 0.08); // #f93e0c crack glow
  const vec3 ICE_COLOR     = vec3(0.80, 0.83, 0.91); // #cdd4e7 frozen lid

  const float ROCK_SLOPE_LO = 0.65;  // tan(slope) where bare rock starts breaking through
  const float ROCK_SLOPE_HI = 1.35;  // tan(slope) of solid rock cover
  const float CLIFF_SLOPE   = 2.2;   // near-vertical faces darken further
  const float SAND_BAND     = 0.022; // beach thickness above the water surface, height units

  float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash12(i);
    float b = hash12(i + vec2(1.0, 0.0));
    float c = hash12(i + vec2(0.0, 1.0));
    float d = hash12(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  // ~[-0.5, 0.5]
  float fbm(vec2 p) {
    float value = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 5; i++) {
      value += (vnoise(p) - 0.5) * amp;
      amp *= 0.55;
      p = p * 2.13 + 17.7;
    }
    return value;
  }

  float decodeHeight(vec4 t) {
    return (t.r * 65280.0 + t.g * 255.0) / 65535.0;
  }

  // uField is NearestFilter (the packed 16-bit height must not be hardware-
  // interpolated), so when the output is supersampled past the field size the
  // four neighboring texels are decoded first and mixed after.
  // Returns (height, ridge/gully packed, drainage)
  vec3 fieldAt(vec2 uv) {
    vec2 p = uv * uFieldSize - 0.5;
    vec2 base = floor(p);
    vec2 f = p - base;
    vec2 t0 = (base + 0.5) / uFieldSize;
    vec2 t1 = (base + 1.5) / uFieldSize;
    vec4 s00 = texture2D(uField, t0);
    vec4 s10 = texture2D(uField, vec2(t1.x, t0.y));
    vec4 s01 = texture2D(uField, vec2(t0.x, t1.y));
    vec4 s11 = texture2D(uField, t1);
    vec3 d00 = vec3(decodeHeight(s00), s00.ba);
    vec3 d10 = vec3(decodeHeight(s10), s10.ba);
    vec3 d01 = vec3(decodeHeight(s01), s01.ba);
    vec3 d11 = vec3(decodeHeight(s11), s11.ba);
    return mix(mix(d00, d10, f.x), mix(d01, d11, f.x), f.y);
  }

  float heightAt(vec2 uv) {
    return fieldAt(uv).x;
  }

  void main() {
    vec2 fragUv = gl_FragCoord.xy / uResolution;
    vec2 uv = vec2(fragUv.x, 1.0 - fragUv.y); // baked-field space: row 0 = map top
    vec2 texel = 1.0 / uFieldSize;

    vec3 fieldSample = fieldAt(uv);
    float h = fieldSample.x;
    vec4 coast = texture2D(uCoast, uv);
    float landFactor = coast.r;
    float waterSurface = coast.g * 2.55;

    // ridge(+)/gully(-) signal: packed as detail / 0.4 + 0.5, typical |detail|
    // well under 0.1, so amplify into a usable 0..1 ridge/gully pair
    float relief = (fieldSample.y - 0.5) * 2.0;
    float ridge = clamp(relief * 4.0, 0.0, 1.0);
    float gully = clamp(-relief * 4.0, 0.0, 1.0);
    float drainage = fieldSample.z;

    // per-texel slope (tan of the steepest angle) from central differences;
    // single FIELD-texel taps on purpose: the baked gullies and ridge walls
    // must register as steep so rock streaks follow the erosion pattern, and
    // sub-field-texel taps on bilinear data would stair-step
    float hL = heightAt(uv - vec2(texel.x, 0.0));
    float hR = heightAt(uv + vec2(texel.x, 0.0));
    float hU = heightAt(uv - vec2(0.0, texel.y));
    float hD = heightAt(uv + vec2(0.0, texel.y));
    vec2 grad = vec2((hR - hL) * 0.5 * uSlopeScale.x, (hD - hU) * 0.5 * uSlopeScale.y);
    float slope = length(grad);

    // breakup noise dithers every material threshold so blend edges read as
    // natural patchiness instead of contour lines; macro adds large-scale
    // tonal variation; patch clusters vegetation into woods and clearings
    vec2 np = vec2(uv.x, uv.y * uAspect);
    float breakup = fbm(np * 220.0 + uSeed * 37.0);
    float macro = fbm(np * 9.0 + uSeed * 53.0);
    float patch = fbm(np * 38.0 + uSeed * 71.0);

    // climate, sampled at cell centers like the bake's heightmap
    vec2 cuv = uv * (1.0 - 1.0 / uGridSize) + 0.5 / uGridSize;
    vec3 climate = texture2D(uClimate, cuv).rgb;
    float tempC = climate.r * 255.0 - 128.0 + macro * 6.0 + breakup * 2.0;
    float moisture = clamp(climate.g + macro * 0.08 + breakup * 0.05, 0.0, 1.0);

    float warm = smoothstep(2.0, 14.0, tempC);    // shore/lagoon character
    float scorch = smoothstep(20.0, 28.0, tempC); // hot rock bakes red

    // biome albedo, sampled with a noise-wobbled uv so zone borders wander
    // off the cell lattice; density = vegetation cover for clumping
    vec2 wobble = vec2(macro, patch) * (1.6 / uGridSize);
    vec4 biome = texture2D(uBiome, cuv + wobble);
    vec3 color = biome.rgb;
    float density = biome.a;

    // canopy clumping: dense cover breaks into sunlit and shadowed woods;
    // sparse grassland gets sun-dried golden patches
    float clump = patch * 0.6 + breakup * 0.4;
    color *= 1.0 + clump * 0.3 * density;
    float grassy = smoothstep(0.05, 0.3, density) * (1.0 - smoothstep(0.5, 0.8, density));
    color = mix(color, GOLD * (1.0 + breakup * 0.2), smoothstep(0.15, 0.4, patch) * grassy * 0.4);
    color *= 1.0 + macro * 0.12 + breakup * 0.1;

    // drainage lines read as damp ground: a touch darker and greener, and
    // only the strongest streams pick up a hint of wet sediment; kept off
    // steep walls so carved canyons still show rock
    float riparian = smoothstep(0.1, 0.7, drainage);
    float flatGround = 1.0 - smoothstep(ROCK_SLOPE_LO, ROCK_SLOPE_HI, slope);
    color = mix(color, color * vec3(0.78, 0.95, 0.72), riparian * 0.5 * flatGround);
    float stream = smoothstep(0.8, 0.97, drainage);
    color = mix(color, SEDIMENT * (1.0 + breakup * 0.2), stream * 0.25 * flatGround);

    // dirt breaks through on moderate slopes and collects in eroded gullies
    float dirtBlend = smoothstep(ROCK_SLOPE_LO - 0.35, ROCK_SLOPE_LO + 0.15, slope + breakup * 0.5);
    dirtBlend = max(dirtBlend, gully * smoothstep(0.25, 0.6, slope));
    color = mix(color, DIRT_COLOR * (1.0 + breakup * 0.35), dirtBlend);

    // bare rock on steep faces: strata bands keyed to elevation, crests
    // bleached, near-vertical walls darkening toward cliff, arid rock baked
    // red-brown. The albedo is a top-down projection, so high-frequency
    // detail smears into streaks on steep walls; fade it out with slope
    float stretchFade = 1.0 - smoothstep(1.2, 2.2, slope) * 0.7;
    float strata = 0.5 + 0.5 * sin(h * 70.0 + breakup * 9.0);
    vec3 rockBase = mix(ROCK_COLOR, ROCK_DRY, scorch * (1.0 - moisture));
    vec3 rockColor = mix(rockBase, CLIFF_COLOR, smoothstep(ROCK_SLOPE_HI, CLIFF_SLOPE, slope + breakup * 0.3));
    rockColor *= (1.0 + (strata - 0.5) * 0.22 * stretchFade) * (1.0 + ridge * 0.15) * (1.0 + macro * 0.18);
    float rockBlend = smoothstep(ROCK_SLOPE_LO, ROCK_SLOPE_HI, slope + breakup * 0.45);
    color = mix(color, rockColor, rockBlend);

    // beaches on flat ground within a thin band above the water surface:
    // warm shores get sand, cold ones gravel; riparian floors stay green
    vec3 beachColor = mix(GRAVEL, SAND_COLOR, warm);
    float sandBlend = smoothstep(SAND_BAND, SAND_BAND * 0.4, h - waterSurface + breakup * 0.012)
      * (1.0 - smoothstep(0.5, 1.0, slope))
      * (1.0 - riparian);
    color = mix(color, beachColor * (1.0 + breakup * 0.2), sandBlend);

    // permanent snow only where truly cold (FMG treats < -5 C as permafrost;
    // grid temperature already accounts for altitude). The band is narrow
    // and dithered at two scales so the snow limit is a patchy fringe, not
    // fog; snow collects in gullies (white streaks down the couloirs),
    // near-vertical faces shed it and tree canopies poke through
    float snow = (1.0 - smoothstep(-5.5, -3.5, tempC - gully * 2.5 + breakup * 3.0 + patch * 2.0))
      * (1.0 - smoothstep(1.4, 2.4, slope));
    snow *= 1.0 - density * 0.45;
    color = mix(color, SNOW_COLOR, snow);

    // cavity shading baked into the albedo: gullies dim, crests catch light
    color *= 1.0 - gully * 0.28 + ridge * 0.16;

    // baked hillshade, Swiss-relief style: warm afternoon sun from the
    // north-west, cool blue sky-light in the shade. The 3D scene light is
    // monochrome, so this tint contrast is what makes the relief glow
    vec3 nrm = normalize(vec3(-grad.x, -grad.y, 1.0));
    vec3 sunDir = normalize(vec3(-0.55, -0.55, 0.85));
    float shade = clamp((dot(nrm, sunDir) - sunDir.z) * 2.0, -1.0, 1.0) * 0.5 + 0.5;
    color *= mix(vec3(0.84, 0.88, 1.03), vec3(1.16, 1.10, 0.97), shade);

    // aerial perspective: the high country pales toward the sky
    color = mix(color, vec3(0.93, 0.96, 1.00), smoothstep(0.45, 0.95, h) * 0.16);

    // final grade: a restrained saturation and mid lift — keep the land
    // closer to true aerial color than to a postcard
    float lum = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(vec3(lum), color, 1.1);
    color = pow(clamp(color, 0.0, 1.0), vec3(0.94));

    // water is fully procedural. Bathymetry from the grid heightmap drives a
    // sunlit shelf-to-abyss gradient; near the shore a sandy seabed glow, a
    // climate-tinted lagoon and a frayed foam line breaking on the true
    // vector coastline
    float seabed = climate.b * 100.0;
    float bathy = clamp((20.0 - seabed) / 18.0 + macro * 0.12, 0.0, 1.0);
    vec3 waterColor = mix(SHELF_BLUE, OCEAN_BLUE, smoothstep(0.05, 0.55, bathy));
    waterColor = mix(waterColor, ABYSS_BLUE, smoothstep(0.55, 1.0, bathy));
    waterColor *= 1.0 + macro * 0.08 + breakup * 0.03;

    // shore: 0 at the true coastline, growing seaward over the mask taper
    float shore = clamp((0.5 - landFactor) * 2.0, 0.0, 1.0);
    // baked river channel (true 2D widths); estuary water keeps the lagoon
    // tint but sheds the sand glow and the breaking surf line
    float riverMask = coast.b;
    float riverWater = smoothstep(0.2, 0.6, riverMask);
    vec3 lagoonColor = mix(LAGOON_COLD, LAGOON_WARM, warm) * (1.0 + breakup * 0.1);
    waterColor = mix(waterColor, lagoonColor, (1.0 - smoothstep(0.02, 0.25, shore)) * 0.95);
    waterColor = mix(waterColor, beachColor * 1.05,
      (1.0 - smoothstep(0.0, 0.07, shore)) * 0.45 * (1.0 - riverWater * 0.7));
    float foam = (1.0 - smoothstep(0.008, 0.04, shore - breakup * 0.02))
      * smoothstep(0.25, 0.85, 0.5 + breakup + patch * 0.3)
      * (1.0 - riverWater);
    waterColor = mix(waterColor, FOAM_COLOR, foam * 0.6);

    // lake groups override the generic ocean recipe (code baked in coast.a,
    // dilated past the shore so the decode is stable wherever water shows).
    // Fresh/salt/sinkhole stay water (calm-lake animation band, no ocean
    // surf), dry/lava/frozen turn into static beds via the alpha below
    float lakeCode = floor(coast.a * 6.375 + 0.5); // byte / 40
    float lakeRim = 1.0 - smoothstep(0.0, 0.14, shore + breakup * 0.06);
    if (lakeCode > 0.5 && lakeCode < 1.5) {
      // freshwater: still periwinkle-blue water, paler over the shallow rim
      waterColor = mix(FRESH_DEEP, FRESH_RIM, clamp(lakeRim * 0.85 + breakup * 0.08, 0.0, 1.0));
      waterColor *= 1.0 + macro * 0.06 + breakup * 0.04;
    } else if (lakeCode > 1.5 && lakeCode < 2.5) {
      // salt: milky mineral teal with an evaporite crust ring at the shore
      vec3 saltWater = mix(SALT_WATER, vec3(1.0), 0.12 + breakup * 0.08);
      waterColor = mix(saltWater, SALT_CRUST * (1.0 + breakup * 0.08), lakeRim * 0.85);
    } else if (lakeCode > 2.5 && lakeCode < 3.5) {
      // sinkhole: bright cenote cyan rim dropping into a deep blue eye
      waterColor = mix(SINKHOLE_DEEP, SINKHOLE_RIM, clamp(lakeRim * 0.9 + breakup * 0.1, 0.0, 1.0));
    } else if (lakeCode > 3.5 && lakeCode < 4.5) {
      // dry: cracked clay pan with a damp fringe
      waterColor = DRY_BED * (1.0 + breakup * 0.15 + macro * 0.08);
      float cracks = 1.0 - smoothstep(0.0, 0.05, abs(breakup));
      waterColor *= 1.0 - cracks * 0.18;
      waterColor = mix(waterColor, DRY_RIM, lakeRim * 0.5);
    } else if (lakeCode > 4.5 && lakeCode < 5.5) {
      // lava: cooled basalt crust veined with glowing cracks
      vec3 lava = mix(LAVA_CRUST * (1.0 + breakup * 0.3), LAVA_RED, smoothstep(0.1, 0.45, macro + patch * 0.3) * 0.5);
      float veins = 1.0 - smoothstep(0.0, 0.045, abs(breakup));
      waterColor = mix(lava, LAVA_GLOW, veins * clamp(0.55 + patch, 0.0, 1.0));
    } else if (lakeCode > 5.5) {
      // frozen: pale ice lid with brighter pressure-crack veins
      waterColor = ICE_COLOR * (1.0 + breakup * 0.06 + macro * 0.05);
      float iceVeins = 1.0 - smoothstep(0.0, 0.04, abs(breakup));
      waterColor = mix(waterColor, vec3(0.97, 0.98, 1.0), iceVeins * 0.5 + lakeRim * 0.25);
    }

    // the land ramp spans ~2 bake texels: soft enough to antialias the
    // waterline, tight enough that the beach still meets the water
    float land = smoothstep(0.5, 0.54, landFactor);
    vec3 finalColor = mix(waterColor, color, land);

    // baked river courses are real water: a deep teal channel that reads
    // against the land greens, damp sediment banks on the flats. The mask
    // carries the true 2D river widths (hairline at the source, flux-widened
    // downstream), so only antialias the bank line here and hand the channel
    // off to the ocean/lake water at the coastline, which the land-mask
    // mouth cut bends around the river entrance
    float river = smoothstep(0.35, 0.65, riverMask) * smoothstep(0.42, 0.52, landFactor);
    // rivers freeze over in extreme cold: same band as the permafrost snow
    // line (tempC already carries the breakup jitter, so the freeze edge is
    // a dithered fringe, not a contour); frozen courses also lose their
    // sediment banks (buried with the rest of the snowed-in floodplain) and
    // their flow animation via the alpha below
    float riverIce = 1.0 - smoothstep(-5.5, -3.0, tempC + patch * 1.5);
    float bank = smoothstep(0.12, 0.32, riverMask) * (1.0 - river) * smoothstep(0.45, 0.55, landFactor);
    finalColor = mix(finalColor, SEDIMENT * (1.05 + breakup * 0.2), bank * 0.5 * flatGround * (1.0 - riverIce));
    vec3 riverColor = mix(OCEAN_BLUE, lagoonColor, 0.25) * (0.88 + breakup * 0.1);
    // white water: only genuinely steep runs aerate into rapids and falls
    // (slope at the channel centerline is the along-course gradient; the
    // animated churn in the mesh material uses the same steepness signal).
    // The foam is clumpy — noise-textured white, not a flat wash
    float rapids = smoothstep(0.55, 1.5, slope + breakup * 0.2) * (1.0 - riverIce);
    vec3 foamTex = FOAM_COLOR * clamp(0.78 + breakup * 0.55 + patch * 0.2, 0.6, 1.05);
    riverColor = mix(riverColor, foamTex, min(rapids * 0.95, 0.8));
    riverColor = mix(riverColor, ICE_COLOR * (1.02 + breakup * 0.06), riverIce);
    finalColor = mix(finalColor, riverColor, river);

    // alpha packs land coverage for the mesh material's water animation:
    // land 1, rivers 0.45 (course-flow band; frozen rivers read as land),
    // enclosed lakes 0.7 (calm-ripple band), open water 0 with a shore-
    // proximity hint (up to 0.3 at the coastline) that drives the animated
    // surf; dry/lava/frozen lake beds read as static land
    float shoreHint = (1.0 - smoothstep(0.0, 0.25, shore)) * 0.3;
    float alpha = mix(shoreHint, 1.0, land);
    if (lakeCode > 0.5 && lakeCode < 3.5) alpha = mix(0.7, 1.0, land);
    alpha = mix(alpha, mix(0.45, 1.0, riverIce), river);
    if (lakeCode > 3.5) alpha = 1.0;
    gl_FragColor = vec4(finalColor, alpha);
  }
`;function ue(e,t,{scale:n,maxOutput:r}){if(!t?.pixels||!t?.coast)return null;de();let i,a,o,s,c,l;try{let{cols:u,rows:d}=t;i=new THREE.DataTexture(t.pixels,u,d,THREE.RGBAFormat,THREE.UnsignedByteType),i.minFilter=i.magFilter=THREE.NearestFilter,i.needsUpdate=!0,a=new THREE.DataTexture(t.coast,u,d,THREE.RGBAFormat,THREE.UnsignedByteType),a.minFilter=a.magFilter=THREE.LinearFilter,a.needsUpdate=!0,o=oe(),s=se();let f=Math.max(u,d),p=Math.min(r,e.capabilities.maxTextureSize,f*2),m=Math.max(p/f,1),h=Math.round(u*m),g=Math.round(d*m),_=e.capabilities.isWebGL2,v=new THREE.WebGLRenderTarget(h,g,{format:THREE.RGBAFormat,type:THREE.UnsignedByteType,generateMipmaps:_,minFilter:_?THREE.LinearMipmapLinearFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter,depthBuffer:!1,stencilBuffer:!1});O=v,v.texture.anisotropy=e.capabilities.getMaxAnisotropy();let y=n*100/82;c=new THREE.RawShaderMaterial({vertexShader:ce,fragmentShader:le,uniforms:{uField:{value:i},uCoast:{value:a},uClimate:{value:o},uBiome:{value:s},uResolution:{value:new THREE.Vector2(h,g)},uFieldSize:{value:new THREE.Vector2(u,d)},uGridSize:{value:new THREE.Vector2(grid.cellsX,grid.cellsY)},uSlopeScale:{value:new THREE.Vector2(y/(graphWidth/u),y/(graphHeight/d))},uAspect:{value:graphHeight/graphWidth},uSeed:{value:(Number.parseInt(seed,10)%1e5||1)/1e5+1}},depthTest:!1,depthWrite:!1}),l=new THREE.BufferGeometry,l.setAttribute(`position`,new THREE.BufferAttribute(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3));let b=new THREE.Mesh(l,c);b.frustumCulled=!1;let x=new THREE.Scene;x.add(b);let S=new THREE.OrthographicCamera(-1,1,1,-1,0,1),C=e.getRenderTarget();return e.setRenderTarget(v),e.render(x,S),e.setRenderTarget(C),v.texture}catch(e){return console.error(`Satellite texture generation failed:`,e),de(),null}finally{c?.dispose(),l?.dispose(),i?.dispose(),a?.dispose(),o?.dispose(),s?.dispose()}}function de(){O&&=(O.dispose(),null)}var fe=10,pe=null;function me(){he();let e=1024/Math.max(graphWidth,graphHeight),t=document.createElement(`canvas`);t.width=Math.max(64,Math.round(graphWidth*e)),t.height=Math.max(64,Math.round(graphHeight*e));let n=t.getContext(`2d`);n.fillStyle=`#000`,n.fillRect(0,0,t.width,t.height),n.save(),n.scale(e,e),n.lineJoin=n.lineCap=`round`;let r=Math.PI*2/fe,i=4/e,a=(e,t)=>`rgb(${Math.round(127.5+127.5*Math.sin(e*r))},${Math.round(127.5+127.5*Math.cos(e*r))},${Math.round(40+t*215)})`,o=e=>Math.min(Math.max((e-.6)/2.4,0),1);for(let e of pack.rivers||[]){if(!e.cells||e.cells.length<2)continue;let t=e.points&&e.points.length===e.cells.length?e.points:null;try{let r=Rivers.addMeandering(e.cells,t),s=0,c=r[0][2],l=0;for(let t=1;t<r.length;t++){let[u,d]=r[t-1],[f,p]=r[t],m=Math.hypot(f-u,p-d);if(m<.01)continue;r[t][2]>c&&(c=r[t][2]);let h=Rivers.getOffset({flux:c,pointIndex:t,widthFactor:e.widthFactor,startingWidth:e.sourceWidth});n.lineWidth=Math.max(2*h,i);let g=Math.max(1,Math.ceil(m/(fe/5))),_=m/g;for(let e=0;e<g;e++){let t=e/g,r=(e+1)/g,i=u+(f-u)*t,c=d+(p-d)*t,h=u+(f-u)*r,v=d+(p-d)*r,y=Math.max(0,E(i,c,82)-E(h,v,82))/_;l=Math.max(o(y),l*.55);let b=n.createLinearGradient(i,c,h,v);b.addColorStop(0,a(s+m*t,l)),b.addColorStop(1,a(s+m*r,l)),n.strokeStyle=b,n.beginPath(),n.moveTo(i,c),n.lineTo(h,v),n.stroke()}s+=m}}catch{}}n.restore();let s=new THREE.CanvasTexture(t);return s.minFilter=s.magFilter=THREE.LinearFilter,s.generateMipmaps=!1,pe=s,s}function he(){pe&&=(pe.dispose(),null)}var k,ge=null,A,j,M,N,_e=0,P,F=null,I,L,R,z,ve,B,V,H,U=[],ye=[],W=[],be=new Map,G=!1,xe=null,K=null,Se={value:0},q=document.createElement(`canvas`).getContext(`2d`),Ce=async(e,t=`viewMesh`)=>(options.threeD.isOn=!0,options.threeD.isGlobe=t===`viewGlobe`,options.threeD.isGlobe?ct(e):Je(e)),J=()=>{$e(),j.remove(L),A.setSize(A.domElement.width,A.domElement.height),options.threeD.isGlobe?dt(!0):nt(graphWidth,graphHeight,grid.cellsX,grid.cellsY),Q()},we=()=>{options.threeD.isGlobe?dt():st()},Te=()=>{N&&N.dispose(),cancelAnimationFrame(_e),F&&F.dispose(),I&&I.dispose(),P&&P.dispose(),ve&&ve.dispose(),B&&B.dispose(),D(),de(),he(),gt(),G=!1,xe=null,$e(),A.renderLists.dispose(),A.dispose(),j.remove(L),j.remove(z),j.remove(R),j.remove(V),F=null,options.threeD.isOn=!1},Ee=e=>{if(options.threeD.scale=e,G){J();return}if(!I)return;let t=I.getAttribute(`position`);for(let e=0;e<t.count;e++)t.setZ(e,at(e));I.setAttribute(`position`,t),I.computeVertexNormals(),J()},De=e=>{z&&(options.threeD.sunColor=e,z.color=new k.Color(e),Q())},Y=t=>e(t,512,8192),X=e=>{let t=A?.capabilities?.maxTextureSize;return t?Math.min(Y(e),t):Y(e)},Z=t=>e(.5,Y(t)/1024,8),Oe=e=>{options.threeD.resolutionScale=X(e),options.threeD.resolution=Z(options.threeD.resolutionScale),J()},ke=e=>{R&&(options.threeD.lightness=e,R.intensity=e,Q())},Ae=(e,t,n=options.threeD.sun.z)=>{z&&(options.threeD.sun={x:e,y:t,z:n},z.position.set(e,t,n),Q())},je=e=>{if(!N)return;options.threeD.isGlobe?options.threeD.rotateGlobe=e:options.threeD.rotateMesh=e,N.autoRotateSpeed=e;let t=!N.autoRotate&&!!e,n=N.autoRotate&&!e;N.autoRotate=!!e,t&&$(),n&&cancelAnimationFrame(_e)},Me=()=>{options.threeD.extendedWater?(j.background=null,j.fog=null,j.remove(V)):ot(graphWidth,graphHeight),options.threeD.extendedWater=!options.threeD.extendedWater,J()},Ne=()=>{options.threeD.labels3d=!options.threeD.labels3d,options.threeD.labels3d?Qe().then(()=>we()):($e(),we())},Pe=()=>{options.threeD.subdivide=!options.threeD.subdivide,J()};function Fe(){let e=document.getElementById(`options3dErosion`);e&&(e.checked=options.threeD.erosion);let t=document.getElementById(`options3dErosionSection`);t&&(t.style.display=options.threeD.erosion?`block`:`none`);let n=document.getElementById(`options3dSubdivide`);n&&(n.disabled=options.threeD.erosion)}var Ie=()=>{options.threeD.erosion=!options.threeD.erosion,J()},Le=e=>{options.threeD.erosionStrength=e,J()},Re=e=>{options.threeD.erosionRiverDepth=e,J()},ze=e=>{options.threeD.erosionDetail=e,J()},Be=e=>{options.threeD.erosionOctaves=e,J()},Ve=()=>{options.threeD.satellite=!options.threeD.satellite,J()},He=()=>{options.threeD.wireframe=!options.threeD.wireframe,J()},Ue=(e,t)=>{j&&(options.threeD.skyColor=e,j.background=new k.Color(e),j.fog&&(j.fog.color=new k.Color(e)),options.threeD.waterColor=t,B&&(B.color=new k.Color(t)),Q())},We=e=>{let t=u[e];t&&(Ae(t.sun.x,t.sun.y,t.sun.z),De(t.sunColor),ke(t.lightness),options.threeD.extendedWater&&Ue(t.skyColor,t.waterColor))},Ge=e=>{let t=X(Number(e)*1024);options.threeD.resolutionScale=t,options.threeD.resolution=Z(t),J()},Ke=async()=>{let e=A.domElement.toDataURL(`image/jpeg`),n=document.createElement(`a`);n.download=`${t()}.jpeg`,n.href=e,n.click(),window.tip(s(`Screenshot`),!0,`success`,7e3),window.setTimeout(()=>window.URL.revokeObjectURL(e),5e3)},qe=async()=>{a(await(await bt()).parse(L),`${t()}.obj`,`text/plain;charset=UTF-8`)};async function Je(e){if(!await vt())return window.tip(`Cannot load 3d library`,!1,`error`,4e3);j=new k.Scene,R=new k.AmbientLight(13421772,options.threeD.lightness),j.add(R),z=new k.SpotLight(options.threeD.sunColor,.8,2e3,.8,0,0),z.position.set(options.threeD.sun.x,options.threeD.sun.y,options.threeD.sun.z),z.castShadow=!0,z.shadow.mapSize.width=2048,z.shadow.mapSize.height=2048,j.add(z),A=new k.WebGLRenderer({canvas:e,antialias:!0,preserveDrawingBuffer:!0}),A.setSize(e.width,e.height),A.shadowMap.enabled=!0,A.shadowMap.type=k.PCFSoftShadowMap,options.threeD.resolutionScale=X(options.threeD.resolutionScale),options.threeD.resolution=Z(options.threeD.resolutionScale),options.threeD.extendedWater&&ot(graphWidth,graphHeight),nt(graphWidth,graphHeight,grid.cellsX,grid.cellsY),M=new k.PerspectiveCamera(70,e.width/e.height,.1,2e3),M.position.set(0,400,500);let t=await ut(M,e);return t?(N=t,N.target&&N.target.set(0,0,0),N.enableDamping=!0,N.dampingFactor=.05,N.screenSpacePanning=!1,N.minDistance=50,N.maxDistance=1e3,N.minZoom=.05,N.maxZoom=4,N.zoomSpeed=.6,N.panSpeed=1.6,N.enableRotate=!0,N.rotateSpeed=.5,N.maxPolarAngle=Math.PI/2,N.minPolarAngle=0,N.autoRotate=!!options.threeD.rotateMesh,N.autoRotateSpeed=options.threeD.rotateMesh,$(),N.addEventListener(`change`,Q),!0):!1}function Ye(e,t,n){let r=new k.TextureLoader().load(e);r.anisotropy=A.capabilities.getMaxAnisotropy();let i=new k.SpriteMaterial({map:r}),a=new k.Sprite(i);return a.scale.set(t,n,1),a.renderOrder=1,a}async function Xe({text:e,font:t,size:n,color:r,quality:i,letterSpacing:a}){let o=e.split(`|`),s=n*i,c=s*1.25,l=()=>{q.font=`${s}px ${t}`,q.letterSpacing=`${a*i}px`};return l(),q.canvas.width=Math.max(1,...o.map(e=>Math.ceil(q.measureText(e).width))),q.canvas.height=Math.max(1,Math.ceil(c*o.length)),q.clearRect(0,0,q.canvas.width,q.canvas.height),l(),q.fillStyle=r,o.forEach((e,t)=>{q.fillText(e,0,s+c*t)}),Ye(q.canvas.toDataURL(),q.canvas.width/i,q.canvas.height/i)}function Ze(e,t){let n=e-graphWidth/2,r=t-graphHeight/2;return G?[n,E(e,t,options.threeD.scale),r]:!H||!L?[n,0,r]:(H.ray.origin.x=n,H.ray.origin.z=r,[n,H.intersectObject(L)[0].point.y,r])}async function Qe(){H=new k.Raycaster,H.set(new k.Vector3(0,1e3,0),new k.Vector3(0,-1,0));let e={},t={},n={};function r(e){let t=d({name:e.label?.group||e.group||`burg`,type:`burg`}),n=Number.parseFloat(String(t[`font-size`])),r=Number(e?.label?.letterSpacing??t[`letter-spacing`])||0;return{font:String(t[`font-family`]),size:n,color:String(t.fill||`#000`),letterSpacing:r,elevation:Math.max(5,n*.5),iconSize:Math.max(.3,n*.08),iconColor:`#666`,quality:40}}function i(e){let t=d({name:e.label?.group||`state`,type:`state`}),n=Number.parseFloat(String(t[`font-size`])),r=Number(e?.label?.letterSpacing??t[`letter-spacing`])||0;return{text:e.label?.text||e.name,font:String(t[`font-family`]),size:n,color:String(t.fill||`#000`),letterSpacing:r,elevation:20,quality:80}}function a(t,n){if(!e[t]){let r=new k.MeshPhongMaterial({color:n});r.wireframe=options.threeD.wireframe,e[t]=r}return e[t]}function o(e,n){let r=`${e}_${n.toFixed(2)}`;return t[r]||(t[r]=new k.CylinderGeometry(n*2,n*2,n,16,1)),t[r]}function s(e,t){return n[e]||(n[e]=new k.LineBasicMaterial({color:t})),n[e]}for(let e=1;e<pack.burgs.length;e++){let t=pack.burgs[e];if(t.removed)continue;let n=r(t),[i,l,u]=Ze(t.x,t.y);if(c.isOn(`labels`)&&!t.label?.hidden){let e=await Xe({text:t.label?.text??t.name??``,...n});e.position.set(i,l+n.elevation,u),e.size=n.size,U.push(e),j.add(e)}if(c.isOn(`burgIcons`)){let e=o(t.group,n.iconSize),r=a(t.group,n.iconColor),c=new k.Mesh(e,r);c.position.set(i,l,u),ye.push(c),j.add(c);let d=s(t.group,n.iconColor),f=l+n.iconSize/2,p=l+n.elevation-n.size*.5,m=[new k.Vector3(i,f,u),new k.Vector3(i,p,u)],h=new k.BufferGeometry().setFromPoints(m),g=new k.Line(h,d);W.push(g),j.add(g)}}if(c.isOn(`labels`))for(let e=1;e<pack.states.length;e++){let t=pack.states[e];if(t.removed||t.label?.hidden)continue;let[n,r,a]=Ze(t.pole[0],t.pole[1]),o=i(t),s=await Xe(o);s.position.set(n,r+o.elevation,a),s.size=o.size,U.push(s),j.add(s)}mt()}function $e(){if(j){for(let e of U)j.remove(e),e.material.map&&e.material.map.dispose(),e.material.dispose(),e.geometry.dispose();U=[];for(let e of ye)j.remove(e),e.material.dispose(),e.geometry.dispose();ye=[];for(let e of W)j.remove(e),e.material.dispose(),e.geometry.dispose();W=[]}}async function et(){let e=await o.ExportMap.getMapURL(`mesh`,{noLabels:options.threeD.labels3d,noWater:options.threeD.extendedWater,noViewbox:!0,fullMap:!0});return new Promise(t=>{let n=document.createElement(`canvas`),r=n.getContext(`2d`);n.width=options.threeD.resolutionScale,n.height=options.threeD.resolutionScale;let i=new Image;i.src=e,i.onload=()=>{r.drawImage(i,0,0,n.width,n.height),n.toBlob(e=>{let r=window.URL.createObjectURL(e);window.setTimeout(()=>{n.remove(),window.URL.revokeObjectURL(r)},100),t(r)})}})}async function tt(){if(!A)return null;F&&F.dispose();let e=await et();return await new Promise(t=>{F=new k.TextureLoader().load(e,e=>{t(e)},void 0,()=>t(null))}),F&&(F.anisotropy=A.capabilities.getMaxAnisotropy()),F}async function nt(e,t,n,r){if(!j||!A)return;if(gt(),be=new Map,pack.cells?.g&&pack.cells?.i)for(let e of pack.cells.i){let t=pack.cells.g[e];be.has(t)||be.set(t,e)}let i=!!(options.threeD.satellite&&!options.threeD.isGlobe&&!options.threeD.wireframe);!options.threeD.wireframe&&!i&&await tt(),P&&P.dispose(),P=new k.MeshLambertMaterial,options.threeD.wireframe?P.wireframe=!0:i||(P.map=F,P.transparent=!0);let a=null;if((options.threeD.erosion||i)&&!options.threeD.isGlobe){let e=options.threeD.erosionDetail>=2048?4096:options.threeD.erosionDetail>512?2048:1024,t=options.threeD.resolutionScale>=8192?8192:options.threeD.resolutionScale>=4096?2048:1024,n=i?Math.max(e,t):e,r=Math.min(A.capabilities.maxTextureSize,8192);a=await ee(A,{strength:options.threeD.erosion?options.threeD.erosionStrength:0,riverDepth:options.threeD.erosion?options.threeD.erosionRiverDepth:0,octaves:options.threeD.erosion?options.threeD.erosionOctaves:1,bakeResolution:Math.min(n,r)}),!a&&options.threeD.erosion&&(console.warn(`3D erosion bake failed, falling back to standard mesh`),window.tip(`Eroded terrain is not supported on this device`,!1,`warn`,4e3),options.threeD.erosion=!1,Fe())}if(G=!!a&&!!options.threeD.erosion,xe=a,i||(de(),he()),I&&I.dispose(),L&&j.remove(L),G){let n=options.threeD.erosionDetail,r=e>=t?n:Math.max(2,Math.round(n*e/t)),i=e>=t?Math.max(2,Math.round(n*t/e)):n;I=new k.PlaneGeometry(e,t,r-1,i-1);let a=I.getAttribute(`position`);for(let n=0;n<a.count;n++){let r=a.getX(n)+e/2,i=t/2-a.getY(n);a.setZ(n,E(r,i,options.threeD.scale))}I.computeVertexNormals(),L=new k.Mesh(I,P)}else{I=new k.PlaneGeometry(e,t,n-1,r-1);let i=I.getAttribute(`position`);for(let e=0;e<i.count;e++)i.setZ(e,at(e));if(I.setAttribute(`position`,i),I.computeVertexNormals(),options.threeD.subdivide){await yt();let e=window.loopSubdivision.modify(I,1,{split:!0,uvSmooth:!1,preserveEdges:!0,flatOnly:!1,maxTriangles:1/0});L=new k.Mesh(e,P)}else L=new k.Mesh(I,P)}if(i){let e=a&&ue(A,a,{scale:options.threeD.scale,maxOutput:Y(options.threeD.resolutionScale)});e?(P.map=e,_t(P,me()),ht()):(P.map=await tt(),P.transparent=!0)}L.rotation.x=-Math.PI/2,L.castShadow=!0,L.receiveShadow=!0,j.add(L),Q(),options.threeD.labels3d&&(await Qe(),Q())}var rt=18,it=100-rt;function at(e){let t=grid.cells.h[e],n=null;if(t<20?n=e:grid.cells.c[e]&&(n=grid.cells.c[e].find(e=>grid.cells.h[e]<20)??null),n!==null){let e=be.get(n);if(e===void 0)return 0;let t=pack.cells.f[e];if(t===void 0)return 0;let r=pack.features[t];return((r.type===`lake`&&r.height?r.height:20)-rt)/it*options.threeD.scale}return(t-rt)/it*options.threeD.scale}function ot(e,t){j&&(j.background=new k.Color(options.threeD.skyColor),ve=new k.PlaneGeometry(e*10,t*10,1),B=new k.MeshBasicMaterial({color:options.threeD.waterColor}),j.fog=new k.Fog(j.background,500,3e3),V=new k.Mesh(ve,B),V.rotation.x=-Math.PI/2,V.position.y-=3,j.add(V))}async function st(){if(!P||!A)return;if(options.threeD.satellite&&xe&&!options.threeD.isGlobe&&!options.threeD.wireframe){let e=ue(A,xe,{scale:options.threeD.scale,maxOutput:Y(options.threeD.resolutionScale)});if(e){P.map=e,Q();return}}F&&F.dispose();let e=await et();window.setTimeout(()=>window.URL.revokeObjectURL(e),4e3),F=new k.TextureLoader().load(e,Q),P.map=F}async function ct(e){if(!await vt())return window.tip(`Cannot load 3d library`,!1,`error`,4e3),!1;j=new k.Scene,j.background=new k.TextureLoader().load(`https://i0.wp.com/azgaar.files.wordpress.com/2019/10/stars-1.png`,Q),A=new k.WebGLRenderer({canvas:e,antialias:!0,preserveDrawingBuffer:!0}),A.setSize(e.width,e.height),options.threeD.resolutionScale=X(options.threeD.resolutionScale),options.threeD.resolution=Z(options.threeD.resolutionScale),P&&P.dispose(),P=new k.MeshBasicMaterial,dt(!0),M=new k.PerspectiveCamera(45,e.width/e.height,.1,1e3),M.translateZ(5);let t=await lt(M,A.domElement);return t?(N=t,N.zoomSpeed=.25,N.minDistance=1.5,N.maxDistance=10,N.autoRotate=!!options.threeD.rotateGlobe,N.autoRotateSpeed=options.threeD.rotateGlobe,N.mouseButtons={LEFT:k.MOUSE.ROTATE,MIDDLE:k.MOUSE.DOLLY,RIGHT:k.MOUSE.PAN},N.screenSpacePanning=!0,N.minPolarAngle=0,N.maxPolarAngle=Math.PI,N.addEventListener(`change`,Q),!0):!1}async function lt(e,t){return k.OrbitControls?new k.OrbitControls(e,t):new Promise(n=>{let r=document.createElement(`script`);r.src=`libs/orbitControls.min.js`,document.head.append(r),r.onload=()=>n(k.OrbitControls?new k.OrbitControls(e,t):!1),r.onerror=()=>n(!1)})}async function ut(e,t){return k.MapControls?new k.MapControls(e,t):new Promise(n=>{let r=document.createElement(`script`);r.src=`libs/mapControls.min.js`,document.head.append(r),r.onload=()=>n(k.MapControls?new k.MapControls(e,t):!1),r.onerror=()=>n(!1)})}async function dt(e){let t=(mapCoordinates.latT??0)>179;options.threeD.resolutionScale=X(options.threeD.resolutionScale);let r=options.threeD.resolutionScale;options.threeD.resolution=Z(r);let i=Math.max(1,Math.round(r/2)),a=n((mapCoordinates.latT??0)/180*i),s=t?a*2:n(graphWidth/graphHeight*a),c=t?0:(90-(mapCoordinates.latN??0))/180*i,l=t?0:s/4,u=document.createElement(`canvas`).getContext(`2d`);if(u.canvas.width=r,u.canvas.height=i,!t){let e=new Image;e.onload=()=>{u.drawImage(e,0,0,r,i)},e.src=`data:image/png;base64,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`}let d=new Image;d.onload=()=>{u.drawImage(d,l,c,s,a),F&&F.dispose(),F=new k.CanvasTexture(u.canvas),P.map=F,e&&ft()},d.src=await o.ExportMap.getMapURL(`mesh`,{noScaleBar:!0,fullMap:!0,noVignette:!0})}function ft(){!j||!P||(I=new k.SphereGeometry(1,64,64),L=new k.Mesh(I,P),j.add(L),N?.autoRotate?$():Q())}var pt=r(mt,200);function Q(){!A||!j||!M||(A.render(j,M),pt())}function mt(){if(M)for(let[e,t]of U.entries()){let n=t.position.distanceTo(M.position),r=n<100*t.size&&n>t.size*6;t.visible=r,W[e]&&(W[e].visible=r)}}function $(){_e=requestAnimationFrame($),N?.update&&N.update()}function ht(){if(K)return;let e=t=>{K=requestAnimationFrame(e),Se.value=t/1e3,Q()};K=requestAnimationFrame(e)}function gt(){K&&cancelAnimationFrame(K),K=null}function _t(e,t){e.onBeforeCompile=e=>{e.uniforms.uTime=Se,e.uniforms.uFlow={value:t},e.fragmentShader=`uniform float uTime;
        uniform sampler2D uFlow;
        float fmgWaterHash(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * 0.1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
        }
        float fmgWaterNoise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          float a = fmgWaterHash(i);
          float b = fmgWaterHash(i + vec2(1.0, 0.0));
          float c = fmgWaterHash(i + vec2(0.0, 1.0));
          float d = fmgWaterHash(i + vec2(1.0, 1.0));
          return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
        }
        `+e.fragmentShader.replace(`#include <map_fragment>`,`#include <map_fragment>
          float waterMask = 1.0 - smoothstep(0.30, 0.38, diffuseColor.a);
          if (waterMask > 0.001) {
            // two octaves of value noise drifting in different directions:
            // organic moving glitter instead of a static interference lattice
            vec2 wp = vUv * vec2(140.0, 100.0);
            float n1 = fmgWaterNoise(wp + vec2(uTime * 0.6, uTime * 0.25));
            float n2 = fmgWaterNoise(wp * 2.3 - vec2(uTime * 0.45, -uTime * 0.7));
            float waves = n1 * 0.65 + n2 * 0.35;
            float crest = pow(waves, 4.0); // rare bright patches = sun glitter
            float swell = sin(dot(vUv, vec2(36.0, 28.0)) + uTime * 0.6) * 0.025;
            diffuseColor.rgb *= 1.0 + waterMask * ((waves - 0.5) * 0.12 + swell);
            diffuseColor.rgb += waterMask * crest * vec3(0.04, 0.09, 0.09);
            // surf lapping the shore, driven by the baked shore-proximity hint
            float shoreGlow = smoothstep(0.02, 0.3, diffuseColor.a) * waterMask;
            float surf = shoreGlow * (0.5 + 0.5 * sin(uTime * 1.5 + (n1 - 0.5) * 9.0 + dot(vUv, vec2(420.0, 380.0))));
            diffuseColor.rgb += surf * 0.08 * vec3(0.9, 1.0, 1.0);
          }
          // enclosed lakes (fresh/salt/sinkhole): a slow calm ripple, far
          // gentler than the ocean shimmer — no surf line, no sun glitter
          float lakeBand = smoothstep(0.64, 0.69, diffuseColor.a) * (1.0 - smoothstep(0.71, 0.78, diffuseColor.a));
          if (lakeBand > 0.001) {
            vec2 lp = vUv * vec2(160.0, 115.0);
            float l1 = fmgWaterNoise(lp + vec2(uTime * 0.18, uTime * 0.12));
            float l2 = fmgWaterNoise(lp * 2.1 - vec2(uTime * 0.14, -uTime * 0.21));
            diffuseColor.rgb *= 1.0 + lakeBand * (l1 * 0.6 + l2 * 0.4 - 0.5) * 0.05;
          }
          // rivers sit in their own alpha band: a luminance wave traveling
          // down the course, phase = sin/cos of the arc length packed in
          // the flow texture. B carries coverage + along-course steepness:
          // steep water flows faster, ripples shorter and brighter, and on
          // sheer drops aerates into churning white — a waterfall. Integer
          // harmonics of the phase stay seam-free across the sin/cos wrap
          float riverBand = smoothstep(0.36, 0.42, diffuseColor.a) * (1.0 - smoothstep(0.50, 0.58, diffuseColor.a));
          if (riverBand > 0.001) {
            vec4 flow = texture2D(uFlow, vUv);
            if (flow.b > 0.1) {
              float steep = clamp(flow.b * 1.186 - 0.186, 0.0, 1.0); // byte 40..255 -> 0..1
              float flowPhase = atan(flow.r - 0.5, flow.g - 0.5);
              float speedMul = 1.0 + steep * 2.0;
              // static noises: spatial variation only. ALL motion must come
              // from waves traveling in +phase (downstream) — a noise field
              // drifting in uv has one fixed direction for the whole map and
              // reads as upstream flow on rivers oriented against it
              float texNoise = fmgWaterNoise(vUv * vec2(380.0, 280.0));
              float fineNoise = fmgWaterNoise(vUv * vec2(880.0, 640.0));
              // noise-offset phases break the ripple bands into irregular
              // tongues while keeping the motion strictly down-course
              float flowWave = sin(flowPhase - uTime * 2.2 * speedMul + texNoise * 2.5) * 0.6
                + sin(flowPhase * 2.0 - uTime * 3.4 * speedMul + 1.7 + texNoise * 3.5) * 0.4;
              diffuseColor.rgb *= 1.0 + riverBand * flowWave * (0.5 + texNoise) * mix(0.05, 0.11, steep);
              if (steep > 0.01) {
                // waterfall churn: phase-locked pulses tumbling downstream,
                // broken into clumps by the static noises, plus a fast
                // in-place shimmer (time-hashed, so it boils with no
                // direction at all). Froth MIXES toward white so heavy spray
                // reads as foam, and the rare peaks pop as splashes
                float tumble = sin(flowPhase * 5.0 - uTime * 16.0 + fineNoise * 9.0) * 0.5 + 0.5;
                float boil = sin(flowPhase * 3.0 - uTime * 11.0 + texNoise * 7.0 + 2.1) * 0.5 + 0.5;
                float shimmer = fmgWaterNoise(vec2(fineNoise * 37.0, uTime * 2.5));
                float froth = tumble * 0.5 + boil * 0.35 + shimmer * 0.4;
                float splash = pow(max(froth - 0.55, 0.0) * 2.2, 2.0);
                vec3 spray = vec3(0.93, 0.97, 1.0);
                diffuseColor.rgb = mix(diffuseColor.rgb, spray, clamp(riverBand * steep * froth * 0.38, 0.0, 1.0));
                diffuseColor.rgb += riverBand * steep * splash * 0.2 * spray;
              }
            }
          }
          diffuseColor.a = 1.0;`)}}function vt(){return k?Promise.resolve(!0):(ge||=new Promise(e=>{let t=document.createElement(`script`);t.src=`libs/three.min.js`,document.head.append(t),t.onload=()=>{k=window.THREE,e(!0)},t.onerror=()=>e(!1)}),ge)}function yt(){return window.loopSubdivision?Promise.resolve(!0):new Promise(e=>{let t=document.createElement(`script`);t.src=`libs/loopsubdivison.min.js`,document.head.append(t),t.onload=()=>e(!0),t.onerror=()=>e(!1)})}function bt(){return k.OBJExporter?new k.OBJExporter:new Promise(e=>{let t=document.createElement(`script`);t.src=`libs/objexporter.min.js?v=1.89.35`,document.head.append(t),t.onload=()=>e(k.OBJExporter?new k.OBJExporter:!1),t.onerror=()=>e(!1)})}export{Ce as create,E as heightAt,re as isCached,J as redraw,qe as saveOBJ,Ke as saveScreenshot,Ue as setColors,ze as setErosionDetail,Be as setErosionOctaves,Re as setErosionRiverDepth,Le as setErosionStrength,ke as setLightness,Ge as setResolution,Oe as setResolutionScale,je as setRotation,Ee as setScale,Ae as setSun,De as setSunColor,We as setTimeOfDay,Te as stop,Pe as toggle3dSubdivision,Ie as toggleErosion,Ne as toggleLabels,Ve as toggleSatellite,Me as toggleSky,He as toggleWireframe,we as update};