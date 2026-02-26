import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  loadMore,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

let currentValue = '';
let page = 1;
let totalHits = 0;

hideLoader();
hideLoadMoreButton();

form.addEventListener('submit', handleSubmit);
loadMore.addEventListener('click', handleLoadMore);

async function handleSubmit(event) {
  event.preventDefault();

  const inputValue = event.target.elements['search-text'].value.trim();
  if (!inputValue) return;

  page = 1;
  totalHits = 0;
  clearGallery();
  hideLoadMoreButton();

  currentValue = inputValue;

  showLoader();

  try {
    const res = await getImagesByQuery(currentValue, page);

    if (res.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please, try again!',
        position: 'topRight',
      });
      return;
    }

    totalHits = res.totalHits;

    createGallery(res.hits);

    if (page * 15 < totalHits) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    page++;
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

async function handleLoadMore() {
  showLoader();
  hideLoadMoreButton();
  try {
    const res = await getImagesByQuery(currentValue, page);
    createGallery(res.hits);

    const card = document.querySelector('.img-item');
    const cardHeight = card.getBoundingClientRect().height;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (page * 15 >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }

    page++;
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}
