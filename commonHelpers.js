import{S as u,i as m}from"./assets/vendor-9310f15c.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const d=document.querySelector(".form"),c=document.querySelector(".gallery");document.querySelector(".gallery-box");const i=document.querySelector(".loader");document.querySelector("input");const l={key:"41526940-8233d9bee139c8a54ba6bf59b",q:"cat",image_type:"photo",orientation:"horizontal",safesearch:!0},p=new u(".gallery a",{nav:!0,captionDelay:250,captionsData:"alt",close:!0,enableKeyboard:!0,docClose:!0});function f(o){return fetch(`https://pixabay.com/api/?${o}`).then(t=>{if(!t.ok)throw new Error(t.statusText);return t.json()}).then(({hits:t})=>{if(t.length>0){const s=t.reduce((a,e)=>a+`<li class="gallery-item">
        <a href=${e.largeImageURL}> 
          <img class="gallery-img" src =${e.webformatURL} alt=${e.tags}/>
        </a>
        <div class="gallery-text-box">
          <p>Likes: <span class="text-value">${e.likes}</span></p>
          <p>Views: <span class="text-value">${e.views}</span></p>
          <p>Comments: <span class="text-value">${e.comments}</span></p>
          <p>Downloads: <span class="text-value">${e.downloads}</span></p>
      </div>
      </li>`,"");c.innerHTML=s,p.refresh()}else m.error({position:"topRight",maxWidth:432,message:"Sorry, there are no images matching your search query. Please try again!"})}).catch(t=>{console.log(t.message)}).finally(()=>{i.style.display="none"})}d.addEventListener("submit",o=>{o.preventDefault(),c.innerHTML="",i.style.display="block",l.q=o.target.elements.search.value.trim();const t=new URLSearchParams(l);f(t),o.currentTarget.reset()});
//# sourceMappingURL=commonHelpers.js.map
