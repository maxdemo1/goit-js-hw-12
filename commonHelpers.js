import"https://cdn.jsdelivr.net/npm/izitoast@1.4.0/+esm";import{a as p,S as y,i as n}from"./assets/vendor-5f0e12e0.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function g(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerpolicy&&(s.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?s.credentials="include":t.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(t){if(t.ep)return;t.ep=!0;const s=g(t);fetch(t.href,s)}})();p.defaults.baseURL="https://pixabay.com";const d=document.querySelector(".search-form"),m=d.querySelector('[name="search-query"]'),a=document.querySelector(".loader"),l=document.querySelector(".next-page-btn");let h=document.querySelector(".gallery"),f=new y(".gallery a",{captionsData:"alt",captionDelay:250});const i={params:{key:"41169627-a3aa19c241ef281e8692ca10a",q:"",image_type:"photo",orientation:"horizontal",per_page:40,safesearch:!0,page:1}},u={async httpsRequest(){a.style.display="block",this.removeChilds();try{const e=await p.get("/api/?",i);this.resultsRunner(e)}catch(e){n.show({message:"Looks like we got some errors =(",messageColor:"white",backgroundColor:"rgb(255, 132, 132)",position:"topRight"}),a.style.display="none",console.log(e)}},async httpsRequestLoadMore(){a.style.display="block",l.style.display="none";try{const e=await p.get("/api/?",i);e.data.hits.length==0?(a.style.display="none",n.show({message:"We're sorry, but you've reached the end of search results.",messageColor:"white",backgroundColor:"rgb(255, 132, 132)",position:"topRight"})):this.resultsRunner(e)}catch(e){n.show({message:"Looks like we got some errors =(",messageColor:"white",backgroundColor:"rgb(255, 132, 132)",position:"topRight"}),a.style.display="none",console.log(e)}},noResults(){n.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"white",backgroundColor:"rgb(255, 132, 132)",position:"topRight"})},imagesOnPage(e){let o="";(()=>{e.data.hits.forEach(r=>{o+=`<li class="gallery-item">
    <a class="gallery-link" href="${r.largeImageURL}">
      <img
        class="gallery-image"
        src="${r.webformatURL}"
        alt="${r.tags}"
      />
    </a>
    <div class="characteristics-container">
      <div class="photo-characteristics">
        <p>Likes</p>
        <p>${r.likes}</p>
      </div>
      <div class="photo-characteristics">
        <p>Views</p>
        <p>${r.views}</p>
      </div>
      <div class="photo-characteristics">
        <p>Comments</p>
        <p>${r.comments}</p>
      </div>
      <div class="photo-characteristics">
        <p>Downloads</p>
        <p>${r.downloads}</p>
      </div>
    </div>
  </li>`})})(),h.insertAdjacentHTML("beforeend",o),f.refresh(),o="",m.value=""},removeChilds(){h.querySelectorAll(".gallery-item").forEach(o=>{o.remove()})},resultsRunner(e){e.data.hits.length>0?(this.imagesOnPage(e),l.style.display="block",a.style.display="none"):(this.noResults(),a.style.display="none")},autoScroll(){let o=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollTo({top:window.scrollY+(o.height*2+48),behavior:"smooth"})}};d.addEventListener("submit",e=>{e.preventDefault(),l.style.display="none",i.params.page=1,i.params.q=m.value.toString(),d.after(a),u.httpsRequest()});l.addEventListener("click",async e=>{e.preventDefault(),i.params.page+=1,l.after(a),await u.httpsRequestLoadMore(),u.autoScroll()});
//# sourceMappingURL=commonHelpers.js.map
