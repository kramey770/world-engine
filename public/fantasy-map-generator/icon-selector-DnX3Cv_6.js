import{k as e}from"./utils-D3KEhgY0.js";import{r as t}from"./tooltips-D1wvMKni.js";import{W as n}from"./index-D3JPylQY.js";var r=`⚔️.🏹.🐴.💣.🌊.🎯.⚓.🔮.📯.⚒️.🛡️.👑.⚜️.☠️.🎆.🗡️.🔪.⛏️.🔥.🩸.💧.🐾.🎪.🏰.🏯.⛓️.❤️.💘.💜.📜.🔔.🔱.💎.🌈.🌠.✨.💥.☀️.🌙.⚡.❄️.♨️.🎲.🚨.🌉.🗻.🌋.🧱.⚖️.✂️.🎵.👗.🎻.🎨.🎭.⛲.💉.📖.📕.🎁.💍.⏳.🕸️.⚗️.☣️.☢️.🔰.🎖️.🚩.🏳️.🏴.💪.✊.👊.🤜.🤝.🙏.🧙.🧙‍♀️.💂.🤴.🧛.🧟.🧞.🧝.👼.👻.👺.👹.🦄.🐲.🐉.🐎.🦓.🐺.🦊.🐱.🐈.🦁.🐯.🐅.🐆.🐕.🦌.🐵.🐒.🦍.🦅.🕊️.🐓.🦇.🦜.🐦.🦉.🐮.🐄.🐂.🐃.🐷.🐖.🐗.🐏.🐑.🐐.🐫.🦒.🐘.🦏.🐭.🐁.🐀.🐹.🐰.🐇.🦔.🐸.🐊.🐢.🦎.🐍.🐳.🐬.🦈.🐠.🐙.🦑.🐌.🦋.🐜.🐝.🐞.🦗.🕷️.🦂.🦀.🌳.🌲.🎄.🌴.🍂.🍁.🌵.☘️.🍀.🌿.🌱.🌾.🍄.🌽.🌸.🌹.🌻.🍒.🍏.🍇.🍉.🍅.🍓.🥔.🥕.🥩.🍗.🍞.🍻.🍺.🍲.🍷`.split(`.`);function i(r,i){let l=a(),u=e(`iconTable`),d=e(`iconInput`);if(d.value=r,!u.innerHTML){o(u);for(let e of s())c(e,i)}d.oninput=()=>i(d.value),u.onclick=e=>{let t=e.target;t.tagName===`TD`&&(d.value=t.textContent||``,i(d.value))},u.onmouseover=e=>{let n=e.target;n.tagName===`TD`&&t(`Click to select ${n.textContent} icon`)};let f=e(`addImage`);f.onclick=()=>{let e=f.previousElementSibling,n=e.value;if(!n)return t(`Enter image URL to add`,!1,`error`,4e3);if(!n.match(/^((http|https):\/\/)|data:image\//))return t(`Enter valid URL`,!1,`error`,4e3);c(n,i),i(n),e.value=``};for(let t of Array.from(e(`addedIcons`).querySelectorAll(`div`)))t.onclick=()=>i(t.style.backgroundImage.slice(5,-2));$(l).dialog({width:`fit-content`,title:`Select Icon`,close:()=>n(`iconSelector`),buttons:{Apply:function(){$(this).dialog(`close`)},Close:function(){i(r),$(this).dialog(`close`)}}})}function a(){n(`iconSelector`);let t=document.createElement(`div`);return t.id=`iconSelector`,t.className=`dialog`,t.style.display=`none`,t.innerHTML=`<div>
      <b>Unicode emojis</b>
      <div style="font-style: italic">
        <span>Select from the list or paste a Unicode character here: </span>
        <input id="iconInput" style="width: 2.5em" />
        <span>. See <a href="https://emojidb.org" target="_blank">EmojiDB</a> to search for emojis</span>
      </div>
      <table id="iconTable" class="table pointer" style="font-size: 2em; text-align: center; width: 100%"></table>
    </div>
    <div style="margin-top: 0.5em">
      <b>External images</b>
      <div style="font-style: italic">
        <span>Paste link to the image here: </span>
        <input id="imageInput" style="width: 20em" />
        <button id="addImage" type="button">Add</button>
      </div>
      <div id="addedIcons" class="pointer" style="display: flex; flex-wrap: wrap; max-width: 420px"></div>
    </div>`,e(`dialogs`).appendChild(t),t}function o(e){let t=null;r.forEach((n,r)=>{r%17==0&&(t=e.insertRow(Math.floor(r/17))),t?.insertCell(r%17).appendChild(document.createTextNode(n))})}function s(){let e=e=>e.startsWith(`http`)||e.startsWith(`data:image`),t=new Set;for(let n of options.military)e(n.icon)&&t.add(n.icon);for(let n of pack.states)for(let r of n?.military||[])e(r.icon)&&t.add(r.icon);return t}function c(t,n){let r=document.createElement(`div`);r.style.cssText=`width: 2.2em; height: 2.2em; background-size: cover; background-image: url(${t})`,r.onclick=()=>n(t),e(`addedIcons`).appendChild(r)}var l={open:i};export{l as IconSelector};