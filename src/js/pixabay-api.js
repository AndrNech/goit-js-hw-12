import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY_API = '57464539-19ea2289c3195b6eb6e9382b1';

export async function getImagesByQuery(query, page = 1, perPage = 15) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: KEY_API,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Pixabay API error:', error);
    throw error;
  }
}
