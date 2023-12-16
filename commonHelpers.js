import"https://cdn.jsdelivr.net/npm/izitoast@1.4.0/+esm";import{a as g,S as f,i as c}from"./assets/vendor-5f0e12e0.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function u(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerpolicy&&(s.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?s.credentials="include":t.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=u(t);fetch(t.href,s)}})();g.defaults.baseURL="https://pixabay.com";const h=document.querySelector(".search-form"),y=h.querySelector('[name="search-query"]'),r=document.querySelector(".loader"),l=document.querySelector(".next-page-btn");let i=0,m=document.querySelector(".gallery"),b=new f(".gallery a",{captionsData:"alt",captionDelay:250});const n={params:{key:"41169627-a3aa19c241ef281e8692ca10a",q:"",image_type:"photo",orientation:"horizontal",per_page:40,safesearch:!0,page:1}},p={async httpsRequest(){i=0,r.style.display="block",this.removeChilds();try{const e=await g.get("/api/?",n);this.totalHitsCheck(e),console.log(e.data),this.resultsRunner(e)}catch(e){c.show({message:"Looks like we got some errors =(",messageColor:"white",backgroundColor:"rgb(255, 132, 132)",position:"topRight"}),r.style.display="none",console.log(e)}},async httpsRequestLoadMore(){r.style.display="block",l.style.display="none";try{const e=await g.get("/api/?",n);console.log(e),this.totalHitsCheck(e),console.log(e.data),this.resultsRunner(e)}catch(e){c.show({message:"Looks like we got some errors =(",messageColor:"white",backgroundColor:"rgb(255, 132, 132)",position:"topRight"}),r.style.display="none",console.log(e)}},noResults(){c.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"white",backgroundColor:"rgb(255, 132, 132)",position:"topRight"})},imagesOnPage(e){let o="";(()=>{e.data.hits.forEach(a=>{o+=`<li class="gallery-item">
    <a class="gallery-link" href="${a.largeImageURL}">
      <img
        class="gallery-image"
        src="${a.webformatURL}"
        alt="${a.tags}"
      />
    </a>
    <div class="characteristics-container">
      <div class="photo-characteristics">
        <p>Likes</p>
        <p>${a.likes}</p>
      </div>
      <div class="photo-characteristics">
        <p>Views</p>
        <p>${a.views}</p>
      </div>
      <div class="photo-characteristics">
        <p>Comments</p>
        <p>${a.comments}</p>
      </div>
      <div class="photo-characteristics">
        <p>Downloads</p>
        <p>${a.downloads}</p>
      </div>
    </div>
  </li>`})})(),m.insertAdjacentHTML("beforeend",o),b.refresh(),o="",y.value=""},removeChilds(){m.querySelectorAll(".gallery-item").forEach(o=>{o.remove()})},resultsRunner(e){e.data.hits.length==40?(this.imagesOnPage(e),l.style.display="block",r.style.display="none"):e.data.hits.length<40&&e.data.hits.length>0?(this.imagesOnPage(e),r.style.display="none",l.style.display="none"):(this.noResults(),r.style.display="none")},autoScroll(){let o=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollTo({top:window.scrollY+(o.height*2+48),behavior:"smooth"})},totalHitsCheck(e){console.log("im try"),i+=e.data.hits.length,console.log("im done"),console.log(i),i>=e.data.totalHits&&i!=0&&(l.style.display="none",c.show({message:"We're sorry, but you've reached the end of search results.",messageColor:"white",backgroundColor:"rgb(255, 132, 132)",position:"topRight"}))}};h.addEventListener("submit",e=>{e.preventDefault(),l.style.display="none",n.params.page=1,n.params.q=y.value.toString(),h.after(r),p.httpsRequest()});l.addEventListener("click",async e=>{e.preventDefault(),n.params.page+=1,l.after(r),await p.httpsRequestLoadMore(),p.autoScroll()});
//# sourceMappingURL=commonHelpers.js.map
