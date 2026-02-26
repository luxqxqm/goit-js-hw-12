import axios from 'axios';
const API_KEY = '54634417-32a9cc2e653c0a3a9a7b25778';

const url = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1) {
  const result = await axios(url, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 15,
    },
  });

  return result.data;
}
