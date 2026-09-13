import { getImagesByQuery } from './js/pixabay-api';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMore,
  hideLoadMore,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('#load-more');
const loader = document.querySelector('.loader');

let query = '';
let currentPage = 1;
const perPage = 15;
let totalHits = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();
  query = e.target.elements['search-text'].value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
    });
    return;
  }

  clearGallery();
  currentPage = 1;
  hideLoadMore();
  showLoader();

  try {
    const { hits, totalHits: total } = await getImagesByQuery(
      query,
      currentPage,
      perPage
    );
    totalHits = total;

    if (hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      createGallery(hits);
      if (currentPage * perPage < totalHits) {
        showLoadMore();
      } else {
        iziToast.info({
          title: 'Info',
          message: "We're sorry, but you've reached the end of search results.",
        });
      }
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Try again later.',
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  hideLoadMore();
  showLoader();

  try {
    const { hits } = await getImagesByQuery(query, currentPage, perPage);

    createGallery(hits);

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (currentPage * perPage < totalHits) {
      showLoadMore();
    } else {
      hideLoadMore();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Try again later.',
    });
  } finally {
    hideLoader();
  }
});
