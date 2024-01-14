import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const galleryBox = document.querySelector('.gallery-box');
const loader = document.querySelector('.loader');
const input = document.querySelector('input');

const searchParamsDefaults = {
  key: '41526940-8233d9bee139c8a54ba6bf59b',
  q: 'cat',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

const lightbox = new SimpleLightbox('.gallery a', {
  nav: true,
  captionDelay: 250,
  captionsData: 'alt',
  close: true,
  enableKeyboard: true,
  docClose: true,
});

function searchImg(params) {
  return fetch(`https://pixabay.com/api/?${params}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(({ hits }) => {
      if (hits.length > 0) {
        const renderImg = hits.reduce((html, hit) => {
          return (
            html +
            `<li class="gallery-item">
        <a href=${hit.largeImageURL}> 
          <img class="gallery-img" src =${hit.webformatURL} alt=${hit.tags}/>
        </a>
        <div class="gallery-text-box">
          <p>Likes: <span class="text-value">${hit.likes}</span></p>
          <p>Views: <span class="text-value">${hit.views}</span></p>
          <p>Comments: <span class="text-value">${hit.comments}</span></p>
          <p>Downloads: <span class="text-value">${hit.downloads}</span></p>
      </div>
      </li>`
          );
        }, '');

        gallery.innerHTML = renderImg;

        lightbox.refresh();
      } else {
        iziToast.error({
          position: 'topRight',
          maxWidth: 432,
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      }
    })
    .catch(error => {
      console.log(error.message);
    })
    .finally(() => {
      loader.style.display = 'none';
    });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  gallery.innerHTML = '';
  loader.style.display = 'block';
  searchParamsDefaults.q = event.target.elements.search.value.trim();
  const searchParams = new URLSearchParams(searchParamsDefaults);
  searchImg(searchParams);
  event.currentTarget.reset();
});