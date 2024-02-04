import{S as d,i}from"./assets/vendor-46aac873.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const u=new d(".card a",{captions:!0,captionsData:"alt"}),m=document.querySelector("form"),l=document.querySelector(".gallery"),c=document.querySelector(".loader");m.addEventListener("submit",h);function h(o){o.preventDefault(),c.style.display="inline-block",l.innerHTML="";const r=o.target.elements.text.value;if(r==="")return c.style.display="none",i.error({message:"Sorry, there are no images matching your search query. Please, try again!",position:"topRight",backgroundColor:"#EF4040",messageColor:"#FAFAFB",theme:"dark"});p(r),o.currentTarget.reset()}function p(o){const r="https://pixabay.com/api/",s=new URLSearchParams({key:"6682685-2020f07934f1586c5464d55ac",q:`${o}`,image_type:"photo",orientation:"horizontal",safesearch:!0}),n=`${r}?${s}`;fetch(n).then(e=>e.json()).then(e=>{if(e.hits.length===0)return i.error({message:"Sorry, there are no images matching your search query. Please, try again!",position:"topRight",backgroundColor:"#EF4040",messageColor:"#FAFAFB",theme:"dark"});f(e),u.refresh()}).catch(()=>i.error({message:"An error occurred while fetching data. Please try again later.",position:"topRight",backgroundColor:"#EF4040",messageColor:"#FAFAFB",theme:"dark"})).finally(()=>c.style.display="none")}function f(o){const r=o.hits.map(s=>g(s)).join("");l.innerHTML=r}function g({webformatURL:o,tags:r,likes:s,views:n,comments:e,downloads:t,largeImageURL:a}){return`<li class="card">
      <a class="link" href="${a}">
        <img src="${o}" alt="${r}" class="image">
        <div class="container">
          <div class="content">
            <h4 class="name">Likes</h4>
            <p class="description">${s}</p>
          </div>
          <div class="content">
            <h4 class="name">Views</h4>
            <p class="description">${n}</p>
          </div>
          <div class="content">
            <h4 class="name">Comments</h4>
            <p class="description">${e}</p>
          </div>
          <div class="content">
            <h4 class="name">Downloads</h4>
            <p class="description">${t}</p>
          </div>
        </div>
      </a>
    </li>`}
//# sourceMappingURL=commonHelpers.js.map
