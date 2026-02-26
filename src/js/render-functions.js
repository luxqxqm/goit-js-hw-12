import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const gallery = new SimpleLightbox('.js-gallery a', {
  captions: true,
  captionPosition: 'bottom',
  captionsData: 'alt',
});
const container = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
export const loadMore = document.querySelector('.load-more-js');

export function createGallery(arr) {
  const img = arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class = "img-item">
        <a href = "${largeImageURL}">
        <img src = "${webformatURL}" alt = "${tags}" width = 300/>
        </a>
        <div class = "wrapper">
        <h2><span class = "text-weight">Likes</span> ${likes}</h2>
        <h2><span class = "text-weight">Views</span> ${views}</h2>
        <h2><span class = "text-weight">Comments</span> ${comments}</h2>
        <h2><span class = "text-weight">Downloads</span> ${downloads}</h2>
        </div>
        </li>
        `
    )
    .join('');

  container.insertAdjacentHTML('beforeend', img);
  gallery.refresh();
}

export function clearGallery() {
  container.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('blur');
}
export function hideLoader() {
  loader.classList.add('blur');
}

export function showLoadMoreButton() {
  loadMore.classList.remove('blur');
}

export function hideLoadMoreButton() {
  loadMore.classList.add('blur');
}
