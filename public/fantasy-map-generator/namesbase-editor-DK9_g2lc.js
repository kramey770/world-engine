import{C as e,Cn as t,E as n,J as r,S as i,Tt as a,X as o,gn as s,hn as c,k as l}from"./utils-omhVlsRt.js";import{t as u}from"./median-1RIswsEP.js";import{t as d}from"./mean-4Awewi9R.js";import{r as f}from"./tooltips-BQ3W48fB.js";import{r as p,t as m}from"./dialog-helpers-CdcIkxap.js";function h(){customization||(m(`#namesbaseEditor, .stable`),g(),v(),y(),$(`#namesbaseEditor`).dialog({title:`Namesbase Editor`,width:`60vw`,position:{my:`center`,at:`center`,of:`svg`},close:_}))}function g(){p(`namesbaseEditor`),l(`dialogs`).insertAdjacentHTML(`beforeend`,`<div id="namesbaseEditor" class="dialog stable textual">
      <div id="namesbaseBasesTop">
        <span>Select base: </span>
        <select id="namesbaseSelect" data-tip="Select base to edit" style="width: 12em" value="0"></select>
        <span style="margin-left: 2px">Names data: </span>
      </div>
      <div id="namesbaseBody" style="margin-block: 2px; width: auto">
        <textarea
          id="namesbaseTextarea"
          data-base="0"
          rows="13"
          data-tip="Names data: a comma separated list of source names used for names generation"
          placeholder="Provide a names data: a comma separated list of source names"
          autocorrect="off"
          spellcheck="false"
          style="resize: none"
        ></textarea>
        <div>
          <span>Name: </span>
          <input
            id="namesbaseName"
            data-tip="Type to change a base name"
            placeholder="Base name"
            autocorrect="off"
            spellcheck="false"
            style="width: 12em"
          />
          <span>Length: </span>
          <input id="namesbaseMin" data-tip="Recommended minimum name length" type="number" min="2" max="100" />
          <input id="namesbaseMax" data-tip="Recommended maximum name length" type="number" min="2" value="10" />
          <span>Doubled: </span>
          <input
            id="namesbaseDouble"
            data-tip="Populate with letters that can be used twice in a row (geminates)"
            autocorrect="off"
            spellcheck="false"
            style="width: 10em"
          />
        </div>
        <fieldset>
          <legend>Generated examples:</legend>
          <div id="namesbaseExamples" data-tip="Examples. Click to re-generate"></div>
        </fieldset>
      </div>
      <div id="namesbaseBottom">
        <button
          id="namesbaseUpdateExamples"
          data-tip="Re-generate examples based on provided data"
          class="icon-arrows-cw"
        ></button>
        <button id="namesbaseAdd" data-tip="Add new namesbase" class="icon-plus"></button>
        <button id="namesbaseDefault" data-tip="Restore default namesbase" class="icon-cancel"></button>
        <button id="namesbaseDownload" data-tip="Download namesbase to PC" class="icon-download"></button>
        <button
          id="namesbaseUpload"
          data-tip="Upload a namesbase from PC, replacing the current set"
          class="icon-upload"
        ></button>
        <button
          id="namesbaseUploadExtend"
          data-tip="Upload a namesbase from PC, extending the current set"
          class="icon-up-circled2"
        ></button>
        <button
          id="namesbaseCA"
          data-tip="Find or share custom namesbase on Cartography Assets portal"
          class="icon-drafting-compass"
        ></button>
        <button
          id="namesbaseAnalyze"
          data-tip="Analyze namesbase to get a validity and quality overview"
          class="icon-flask"
        ></button>
        <button
          id="namesbaseSpeak"
          data-tip="Speak the examples. You can change voice and language in options"
          class="icon-voice"
        ></button>
      </div>
    </div>`);let e=l(`namesbaseToLoad`);l(`namesbaseSelect`).addEventListener(`change`,y),l(`namesbaseTextarea`).addEventListener(`change`,x),l(`namesbaseUpdateExamples`).addEventListener(`click`,b),l(`namesbaseExamples`).addEventListener(`click`,b),l(`namesbaseName`).addEventListener(`input`,e=>S(e.target.value)),l(`namesbaseMin`).addEventListener(`input`,e=>C(e.target.value)),l(`namesbaseMax`).addEventListener(`input`,e=>w(e.target.value)),l(`namesbaseDouble`).addEventListener(`input`,e=>T(e.target.value)),l(`namesbaseAdd`).addEventListener(`click`,D),l(`namesbaseAnalyze`).addEventListener(`click`,E),l(`namesbaseDefault`).addEventListener(`click`,O),l(`namesbaseDownload`).addEventListener(`click`,k),l(`namesbaseUpload`).addEventListener(`click`,()=>{e.addEventListener(`change`,e=>n(e.target,e=>A(e,!0)),{once:!0}),e.click()}),l(`namesbaseUploadExtend`).addEventListener(`click`,()=>{e.addEventListener(`change`,e=>n(e.target,e=>A(e,!1)),{once:!0}),e.click()}),l(`namesbaseCA`).addEventListener(`click`,()=>r(`https://cartographyassets.com/asset-category/specific-assets/azgaars-generator/namebases/`)),l(`namesbaseSpeak`).addEventListener(`click`,()=>o(l(`namesbaseExamples`).textContent??``))}function _(){$(`#namesbaseEditor`).dialog(`destroy`),l(`namesbaseEditor`).remove()}function v(){let e=l(`namesbaseSelect`);e.innerHTML=``,Names.nameBases.forEach((t,n)=>{e.options.add(new Option(t.name,String(n)))})}function y(){let e=+l(`namesbaseSelect`).value;if(!Names.nameBases[e]){f(`Namesbase ${e} is not defined`,!1,`error`);return}l(`namesbaseTextarea`).value=Names.nameBases[e].b,l(`namesbaseName`).value=Names.nameBases[e].name,l(`namesbaseMin`).value=String(Names.nameBases[e].min),l(`namesbaseMax`).value=String(Names.nameBases[e].max),l(`namesbaseDouble`).value=Names.nameBases[e].d,b()}function b(){let e=+l(`namesbaseSelect`).value,t=``;for(let n=0;n<7;n++){let r=Names.getBase(e);if(r===void 0){t=`Cannot generate examples. Please verify the data`;break}n&&(t+=`, `),t+=r}l(`namesbaseExamples`).innerHTML=t}function x(){let e=+l(`namesbaseSelect`).value,t=l(`namesbaseTextarea`);if(t.value.split(`,`).length<3){f(`The names data provided is too short or incorrect`,!1,`error`);return}let n=t.value.replace(/[/|]/g,``);Names.nameBases[e].b=n,t.value=n,Names.updateChain(e)}function S(e){let t=+l(`namesbaseSelect`).value,n=l(`namesbaseSelect`),r=e.replace(/[/|]/g,``);n.options[n.selectedIndex].innerHTML=r,Names.nameBases[t].name=r}function C(e){let t=+l(`namesbaseSelect`).value;if(+e>Names.nameBases[t].max){f(`Minimal length cannot be greater than maximal`,!1,`error`);return}Names.nameBases[t].min=+e}function w(e){let t=+l(`namesbaseSelect`).value;if(+e<Names.nameBases[t].min){f(`Maximal length should be greater than minimal`,!1,`error`);return}Names.nameBases[t].max=+e}function T(e){let t=+l(`namesbaseSelect`).value;Names.nameBases[t].d=e}function E(){let e=l(`namesbaseTextarea`).value,n=e.toLowerCase().split(`,`),r=n.length;if(!e||!r){f(`Names data should not be empty`,!1,`error`);return}let i=Names.calculateChain(e),o=Object.values(i),p=a(d(o.map(e=>e.length))??0),m=n.map(e=>e.length),h=e.match(/[\u0080-\uFFFF]/gu)?t(e.match(/[\u0080-\uFFFF]/gu).join(``).toLowerCase().split(``)).join(``):`none`,g=n.flatMap(e=>e.match(/[^\w\s]|(.)(?=\1)/g)??[]),_=t(g).filter(e=>g.filter(t=>t===e).length>3),v=_.length?_.join(``):`none`,y=t(n.filter((e,t,n)=>n.indexOf(e)!==t)).join(`, `)||`none`,b=d(n.map(e=>+e.includes(` `)))??0,x=()=>r<30?`<span data-tip='Namesbase contains < 30 names - not enough to generate reasonable data' style='color:red'>[not enough]</span>`:r<100?`<span data-tip='Namesbase contains < 100 names - not enough to generate good names' style='color:darkred'>[low]</span>`:r<=400?`<span data-tip='Namesbase contains a reasonable number of samples' style='color:green'>[good]</span>`:`<span data-tip='Namesbase contains > 400 names. That is too much, try to reduce it to ~300 names' style='color:darkred'>[overmuch]</span>`,S=()=>p<15?`<span data-tip='Namesbase average variety < 15 - generated names will be too repetitive' style='color:red'>[low]</span>`:p<30?`<span data-tip='Namesbase average variety < 30 - names can be too repetitive' style='color:orange'>[mean]</span>`:`<span data-tip='Namesbase variety is good' style='color:green'>[good]</span>`;alertMessage.innerHTML=`<div style="line-height: 1.6em; max-width: 20em">
      <div data-tip="Number of names provided">Namesbase length: ${r} ${x()}</div>
      <div data-tip="Average number of generation variants for each key in the chain">Namesbase variety: ${p} ${S()}</div>
      <hr />
      <div data-tip="The shortest name length">Min name length: ${c(m)}</div>
      <div data-tip="The longest name length">Max name length: ${s(m)}</div>
      <div data-tip="Average name length">Mean name length: ${a(d(m)??0,1)}</div>
      <div data-tip="Common name length">Median name length: ${u(m)}</div>
      <hr />
      <div data-tip="Characters outside of Basic Latin have bad font support">Non-basic chars: ${h}</div>
      <div data-tip="Characters that are frequently (more than 3 times) doubled">Doubled chars: ${v}</div>
      <div data-tip="Names used more than one time">Duplicates: ${y}</div>
      <div data-tip="Percentage of names containing space character">Multi-word names: ${a(b*100,2)}%</div>
    </div>`,$(`#alert`).dialog({resizable:!1,title:`Data Analysis`,width:`auto`,position:{my:`left top-30`,at:`right+10 top`,of:`#namesbaseEditor`},buttons:{OK:function(){$(this).dialog(`close`)}}})}function D(){let e=Names.nameBases.length,t=`This,is,an,example,of,name,base,showing,correct,format,It,should,have,at,least,one,hundred,names,separated,with,comma`;Names.nameBases.push({name:`Base${e}`,i:e,min:5,max:12,d:``,m:0,b:t}),l(`namesbaseSelect`).add(new Option(`Base${e}`,String(e))),l(`namesbaseSelect`).value=String(e),l(`namesbaseTextarea`).value=t,l(`namesbaseName`).value=`Base${e}`,l(`namesbaseMin`).value=`5`,l(`namesbaseMax`).value=`12`,l(`namesbaseDouble`).value=``,l(`namesbaseExamples`).innerHTML=`Please provide names data`}function O(){alertMessage.innerHTML=`Are you sure you want to restore default namesbase?`,$(`#alert`).dialog({resizable:!1,title:`Restore default data`,buttons:{Restore:function(){$(this).dialog(`close`),Names.clearChains(),Names.nameBases=Names.getNameBases(),v(),y()},Cancel:function(){$(this).dialog(`close`)}}})}function k(){let t=Names.nameBases.map(e=>`${e.name}|${e.min}|${e.max}|${e.d}|${e.m}|${e.b}`).join(`\r
`),n=`${e(`Namesbase`)}.txt`;i(t,n)}function A(e,t=!0){let n=e.replace(/\r\n|\r/g,`
`).split(`
`).filter(Boolean);if(!n.length){f(`Cannot load a namesbase. Please check the data format`,!1,`error`);return}Names.clearChains(),t&&(Names.nameBases=[]);let r=[];if(n.forEach((e,t)=>{try{let[t,n,r,i,a,o]=e.split(`|`),s=t?.replace(j,``);if(!s)throw Error(`Name is missing`);let c=o?.replace(j,``);if(!c)throw Error(`Names are missing`);Names.nameBases.push({name:s,i:Names.nameBases.length,min:+n,max:+r,d:i,m:+a,b:c})}catch(n){r.push({id:t+1,line:e,error:n.message}),ERROR&&console.error(n)}}),r.length>0){ERROR&&console.error(`Namesbase upload errors`,r);let e=r.map(({id:e,line:t,error:n})=>`<li style="padding:0.6em 0;border-top:1px solid #ddd;">
            <div>
              Line ${e}:
              <span style="color:#8b0000">${M(n)}.</span> Data:
            </div>
            <div style="margin-top:0.35em;font-family:var(--font-monospace,monospace);font-size:0.95em;line-height:1.4;word-break:break-word;color:#333;">
              ${M(t)||`<empty line>`}
            </div>
          </li>`).join(``);alertMessage.innerHTML=`<div>
        <p style="margin:0.75em;">
          <strong>File parsing error. Only ${n.length-r.length} out of ${n.length} namebases added.</strong>
          Each namebase should be on its own line and follow the format: <code>name|min|max|duplication|m|names</code>. Parameters should be separated with the <code>|</code> character, and this character should not be used within the parameters. Another prohibited character is <code>/</code>. The most common issue is names and other parameters being on two separate lines.
          <ul style="margin:0.5em;">
            <li><code>name</code>: name of the base.</li>
            <li><code>min</code>: minimal recommended length of generated names. It should be a number.</li>
            <li><code>max</code>: maximal recommended length of generated names. It should be a number greater than minimal length.</li>
            <li><code>duplication</code>: characters that can be duplicated in generated names. For example <code>lkd</code> means names like "Kalla", "Mikkor", "Dalddur" are possible. This parameter can be empty.</li>
            <li><code>m</code>: unused parameter, populate with <code>0</code>.</li>
            <li><code>names</code>: names data, separated with commas. It should contain at least 3 names to be valid.</li>
          </ul>
        </p>
        <div>
          <ul style="margin:0;padding-left:1.5em;">
            ${e}
          </ul>
        </div>
      </div>`,$(`#alert`).dialog({resizable:!1,title:`Parsing error`,width:`min(72vw, 68em)`,position:{my:`center center-4em`,at:`center`,of:`svg`},buttons:{Continue:function(){$(this).dialog(`close`)}}})}v(),y()}var j=/[|/]/g,M=e=>e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`),N={open:h};export{N as NamesbaseEditor};