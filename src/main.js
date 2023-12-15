import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com';

const searchForm = document.querySelector('.search-form');
const searchQuery = searchForm.querySelector('[name="search-query"]');
const loading = document.querySelector('.loader');
const nextPage = document.querySelector('.next-page-btn');
let gallery = document.querySelector('.gallery');
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const pixabayOptions = {
  params: {
    key: '41169627-a3aa19c241ef281e8692ca10a',
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 40,
    safesearch: true,
    page: 1,
  },
};

const mainObject = {
  async httpsRequest() {
    loading.style.display = 'block';
    this.removeChilds();
    try {
      const posts = await axios.get('/api/?', pixabayOptions);
      this.resultsRunner(posts);
    } catch (error) {
      iziToast.show({
        message: 'Looks like we got some errors =(',
        messageColor: 'white',
        backgroundColor: 'rgb(255, 132, 132)',
        position: 'topRight',
      });
      loading.style.display = 'none';
      console.log(error);
    }
  },

  async httpsRequestLoadMore() {
    loading.style.display = 'block';
    nextPage.style.display = 'none';
    try {
      const posts = await axios.get('/api/?', pixabayOptions);
      if (posts.data.hits.length == 0) {
        loading.style.display = 'none';
        iziToast.show({
          message: "We're sorry, but you've reached the end of search results.",
          messageColor: 'white',
          backgroundColor: 'rgb(255, 132, 132)',
          position: 'topRight',
        });
      } else {
        this.resultsRunner(posts);
      }
    } catch (error) {
      iziToast.show({
        message: 'Looks like we got some errors =(',
        messageColor: 'white',
        backgroundColor: 'rgb(255, 132, 132)',
        position: 'topRight',
      });
      loading.style.display = 'none';
      console.log(error);
    }
  },

  noResults() {
    iziToast.show({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      messageColor: 'white',
      backgroundColor: 'rgb(255, 132, 132)',
      position: 'topRight',
    });
  },

  imagesOnPage(posts) {
    let htmlCode = '';
    const htmlGen = () => {
      posts.data.hits.forEach(hit => {
        htmlCode += `<li class="gallery-item">
    <a class="gallery-link" href="${hit.largeImageURL}">
      <img
        class="gallery-image"
        src="${hit.webformatURL}"
        alt="${hit.tags}"
      />
    </a>
    <div class="characteristics-container">
      <div class="photo-characteristics">
        <p>Likes</p>
        <p>${hit.likes}</p>
      </div>
      <div class="photo-characteristics">
        <p>Views</p>
        <p>${hit.views}</p>
      </div>
      <div class="photo-characteristics">
        <p>Comments</p>
        <p>${hit.comments}</p>
      </div>
      <div class="photo-characteristics">
        <p>Downloads</p>
        <p>${hit.downloads}</p>
      </div>
    </div>
  </li>`;
      });
    };

    htmlGen();
    gallery.insertAdjacentHTML('beforeend', htmlCode);
    lightbox.refresh();
    htmlCode = '';
    searchQuery.value = '';
  },

  removeChilds() {
    let removeChilds = gallery.querySelectorAll('.gallery-item');
    removeChilds.forEach(child => {
      child.remove();
    });
  },

  resultsRunner(posts) {
    if (posts.data.hits.length > 0) {
      this.imagesOnPage(posts);
      nextPage.style.display = 'block';
      loading.style.display = 'none';
    } else {
      this.noResults();
      loading.style.display = 'none';
    }
  },

  autoScroll() {
    let scrollItem = document.querySelector('.gallery-item');
    let scrollStep = scrollItem.getBoundingClientRect();
    window.scrollTo({
      top: window.scrollY + (scrollStep.height * 2 + 48),
      behavior: 'smooth',
    });
  },
};

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  nextPage.style.display = 'none';
  pixabayOptions.params.page = 1;
  pixabayOptions.params.q = searchQuery.value.toString();
  searchForm.after(loading);
  mainObject.httpsRequest();
});

nextPage.addEventListener('click', async event => {
  event.preventDefault();
  pixabayOptions.params.page += 1;
  nextPage.after(loading);
  await mainObject.httpsRequestLoadMore();
  mainObject.autoScroll();
});
