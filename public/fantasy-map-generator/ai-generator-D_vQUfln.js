import{J as e,k as t}from"./utils-D3KEhgY0.js";import{r as n}from"./tooltips-D1wvMKni.js";import{W as r}from"./index-D3JPylQY.js";var i={openai:{keyLink:`https://platform.openai.com/account/api-keys`,generate:l},anthropic:{keyLink:`https://console.anthropic.com/account/keys`,generate:u},ollama:{keyLink:`https://github.com/Azgaar/Fantasy-Map-Generator/wiki/Ollama-text-generation`,generate:d}},a=`gpt-5.6-luna`,o={"gpt-5.6-luna":`openai`,"gpt-5.6-terra":`openai`,"gpt-5.6-sol":`openai`,"gpt-5-mini":`openai`,"gpt-5-nano":`openai`,"claude-opus-4-8":`anthropic`,"claude-sonnet-5":`anthropic`,"claude-haiku-4-5":`anthropic`,"ollama (local models)":`ollama`},s=new Set([`gpt-5.6-luna`,`gpt-5.6-terra`,`gpt-5.6-sol`,`gpt-5-mini`,`gpt-5-nano`,`claude-opus-4-8`,`claude-sonnet-5`]),c=`I'm working on my fantasy map.`;async function l({key:e,model:t,prompt:n,temperature:r,onContent:i}){let a={"Content-Type":`application/json`,Authorization:`Bearer ${e}`},o={model:t,messages:[{role:`system`,content:c},{role:`user`,content:n}],stream:!0};s.has(t)||(o.temperature=r),await f(await fetch(`https://api.openai.com/v1/chat/completions`,{method:`POST`,headers:a,body:JSON.stringify(o)}),e=>{let t=e.choices?.[0]?.delta?.content;t&&i(t)})}async function u({key:e,model:t,prompt:n,temperature:r,onContent:i}){await f(await fetch(`https://api.anthropic.com/v1/messages`,{method:`POST`,headers:{"Content-Type":`application/json`,"x-api-key":e,"anthropic-version":`2023-06-01`,"anthropic-dangerous-direct-browser-access":`true`},body:JSON.stringify({model:t,system:c,messages:[{role:`user`,content:n}],max_tokens:4096,stream:!0,...s.has(t)?{}:{temperature:r}})}),e=>{let t=e.delta?.text;t&&i(t)})}async function d({key:e,model:t,prompt:n,temperature:r,onContent:i}){await f(await fetch(`http://localhost:11434/api/generate`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({model:e,prompt:n,system:c,options:{temperature:r},stream:!0})}),e=>{e.response&&i(e.response)})}async function f(e,t){if(!e.ok){let t=`Failed to generate (${e.status} ${e.statusText})`;try{let n=await e.json();t=n.error?.message||n.error||t}catch(e){ERROR&&console.error(`Failed to parse AI provider error response`,e)}throw Error(t)}if(!e.body)throw Error(`Response has no body to stream`);let n=e.body.getReader(),r=new TextDecoder(`utf-8`),i=``;for(;;){let{done:e,value:a}=await n.read();if(e)break;i+=r.decode(a,{stream:!0});let o=i.split(`
`);for(let e=0;e<o.length-1;e++){let n=o[e].trim();if(n){if(n===`data: [DONE]`)break;try{t(n.startsWith(`data: `)?JSON.parse(n.slice(6)):JSON.parse(n))}catch(e){ERROR&&console.error(`Failed to parse line:`,n,e)}}}i=o.at(-1)??``}}function p(e,i){m(),h(e),$(`#aiGenerator`).dialog({title:`AI Text Generator`,position:{my:`center`,at:`center`,of:`svg`},resizable:!1,close:()=>r(`aiGenerator`),buttons:{Generate:e=>{g(e.target)},Apply:function(){let e=t(`aiGeneratorResult`).value;if(!e)return n(`No result to apply`,!0,`error`,4e3);i(e),$(this).dialog(`close`)},Close:function(){$(this).dialog(`close`)}}})}function m(){r(`aiGenerator`),t(`dialogs`).insertAdjacentHTML(`beforeend`,`<div id="aiGenerator" class="dialog stable">
    <div style="display: flex; flex-direction: column; gap: 0.3em; width: 100%">
      <textarea id="aiGeneratorResult" placeholder="Generated text will appear here" cols="30" rows="10"></textarea>
      <textarea id="aiGeneratorPrompt" placeholder="Type a prompt here" cols="30" rows="5"></textarea>
      <div style="display: flex; align-items: center; gap: 1em">
        <label for="aiGeneratorModel"
          >Model:
          <select id="aiGeneratorModel"></select>
        </label>
        <label
          for="aiGeneratorTemperature"
          data-tip="Temperature controls response randomness; higher values mean more creativity, lower values mean more predictability"
        >
          Temperature:
          <input id="aiGeneratorTemperature" type="number" min="-1" max="2" step=".1" class="icon-key" />
        </label>
        <label for="aiGeneratorKey"
          >Key:
          <input
            id="aiGeneratorKey"
            placeholder="Enter API key"
            class="icon-key"
            data-tip="Enter API key. Note: the Generator doesn't store the key or any generated data"
          />
          <button
            id="aiGeneratorKeyHelp"
            class="icon-help-circled"
            data-tip="Click to see the usage instructions"
          ></button>
        </label>
      </div>
    </div>
  </div>`),t(`aiGeneratorKeyHelp`).addEventListener(`click`,()=>{let n=o[t(`aiGeneratorModel`).value];e(i[n].keyLink)})}function h(e){t(`aiGeneratorResult`).value=``,t(`aiGeneratorPrompt`).value=e,t(`aiGeneratorTemperature`).value=localStorage.getItem(`fmg-ai-temperature`)||`1`;let n=t(`aiGeneratorModel`);n.options.length=0,Object.keys(o).forEach(e=>{n.options.add(new Option(e,e))}),n.value=localStorage.getItem(`fmg-ai-model`)??``,(!n.value||!o[n.value])&&(n.value=a);let r=o[n.value];t(`aiGeneratorKey`).value=localStorage.getItem(`fmg-ai-kl-${r}`)||``}async function g(e){let r=t(`aiGeneratorKey`).value;if(!r)return n(`Please enter an API key`,!0,`error`,4e3);let a=t(`aiGeneratorModel`).value;if(!a)return n(`Please select a model`,!0,`error`,4e3);localStorage.setItem(`fmg-ai-model`,a);let s=o[a];localStorage.setItem(`fmg-ai-kl-${s}`,r);let c=t(`aiGeneratorPrompt`).value;if(!c)return n(`Please enter a prompt`,!0,`error`,4e3);let l=t(`aiGeneratorTemperature`).valueAsNumber;if(Number.isNaN(l))return n(`Temperature must be a number`,!0,`error`,4e3);localStorage.setItem(`fmg-ai-temperature`,String(l));try{e.disabled=!0;let n=t(`aiGeneratorResult`);n.disabled=!0,n.value=``,await i[s].generate({key:r,model:a,prompt:c,temperature:l,onContent:e=>{n.value+=e}})}catch(e){return n(e instanceof Error&&e.message||String(e)||`Failed to generate text`,!0,`error`,4e3)}finally{e.disabled=!1,t(`aiGeneratorResult`).disabled=!1}}var _={open:p};export{_ as AiGenerator};