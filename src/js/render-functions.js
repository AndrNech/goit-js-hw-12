import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
let lightbox = new SimpleLightbox('.gallery a');

export function clearGallery() {
  gallery.innerHTML = '';
}

export function createGallery(images) {
  const markup = images
    .map(
      img => `
      <li class="gallery-item">
        <a href="${img.largeImageURL}">
          <img src="${img.webformatURL}" alt="${img.tags}" />
        </a>
        <div class="info">
          <p>Likes: ${img.likes}</p>
          <p>Views: ${img.views}</p>
          <p>Comments: ${img.comments}</p>
          <p>Downloads: ${img.downloads}</p>
        </div>
      </li>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function showLoader() {
  document.querySelector('.loader').classList.remove('hidden');
}

export function hideLoader() {
  document.querySelector('.loader').classList.add('hidden');
}

const loadMoreBtn = document.querySelector('#load-more');

export function showLoadMore() {
  loadMoreBtn.style.display = 'block';
}

export function hideLoadMore() {
  loadMoreBtn.style.display = 'none';
}
