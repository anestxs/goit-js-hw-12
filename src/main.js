import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from "axios";

const lightbox = new SimpleLightbox('.gallery a', {
  nav: true,
  captionDelay: 250,
  captionsData: 'alt',
  close: true,
  enableKeyboard: true,
  docClose: true,
});

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');


const api = axios.create({
  baseURL: "https://pixabay.com/api/",
  params: { 
    key: "41526940-8233d9bee139c8a54ba6bf59b",
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  }
});

function renderImages(images = []) { 
  const markup = images.reduce((html, { largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
    return html +
      `<li class="gallery-item">
        <a href=${largeImageURL}> 
          <img class="gallery-img" src =${webformatURL} alt=${tags}/>
        </a>
        <div class="gallery-text-box">
          <p>Likes: <span class="text-value">${likes}</span></p>
          <p>Views: <span class="text-value">${views}</span></p>
          <p>Comments: <span class="text-value">${comments}</span></p>
          <p>Downloads: <span class="text-value">${downloads}</span></p>
        </div>
       </li>`
    }, '');
  gallery.insertAdjacentHTML("beforeend", markup);
}

const getImages = async (params) => { 
  try { 
    const response = await api.get("", { params });
    return response.data;
  } catch(response) { 
    throw new Error(response.statusText);
  }
}

const createRequestToGetImages = (q) => { 
  const pageSize = 40;
  let page = 1; 
  let isLastPage = false;

  return async () => { 
    try { 
      if(isLastPage) return;

      const { images, totalResults } = await getImages({ page, pageSize, q});

      if (page >= Math.ceil(totalResults / pageSize)) { 
        isLastPage = true;
      }

      page += 1;

      lightbox.refresh();
      return images;
    } catch(error) { 
        iziToast.error({
          position: 'topRight',
          maxWidth: 432,
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
    } finally { 
        loader.style.display = 'none';
    }
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  gallery.innerHTML = '';

  loader.style.display = 'block';
  
  const query = form.elements.search.value.trim();

  const fetchImages = createRequestToGetImages(query);

  const images = await fetchImages();
  
  renderImages(images);
});
