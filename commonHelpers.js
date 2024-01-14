import{S as m,a as f,i as y}from"./assets/vendor-c145bea9.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const g=new m(".gallery a",{nav:!0,captionDelay:250,captionsData:"alt",close:!0,enableKeyboard:!0,docClose:!0}),i=document.querySelector(".form"),l=document.querySelector(".gallery"),c=document.querySelector(".loader"),h=f.create({baseURL:"https://pixabay.com/api/",params:{key:"41526940-8233d9bee139c8a54ba6bf59b",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40}});function b(a=[]){const r=a.reduce((o,{largeImageURL:s,webformatURL:e,tags:t,likes:n,views:u,comments:p,downloads:d})=>o+`<li class="gallery-item">
        <a href=${s}> 
          <img class="gallery-img" src =${e} alt=${t}/>
        </a>
        <div class="gallery-text-box">
          <p>Likes: <span class="text-value">${n}</span></p>
          <p>Views: <span class="text-value">${u}</span></p>
          <p>Comments: <span class="text-value">${p}</span></p>
          <p>Downloads: <span class="text-value">${d}</span></p>
        </div>
       </li>`,"");l.insertAdjacentHTML("beforeend",r)}const v=async a=>{try{return(await h.get("",{params:a})).data}catch(r){throw new Error(r.statusText)}},x=a=>{let o=1,s=!1;return async()=>{try{if(s)return;const{images:e,totalResults:t}=await v({page:o,pageSize:40,q:a});return o>=Math.ceil(t/40)&&(s=!0),o+=1,g.refresh(),e}catch{y.error({position:"topRight",maxWidth:432,message:"Sorry, there are no images matching your search query. Please try again!"})}finally{c.style.display="none"}}};i.addEventListener("submit",async a=>{a.preventDefault(),l.innerHTML="",c.style.display="block";const r=i.elements.search.value.trim(),s=await x(r)();b(s)});
//# sourceMappingURL=commonHelpers.js.map
