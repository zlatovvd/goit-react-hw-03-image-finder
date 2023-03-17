import axios from 'axios';

const key = '33829143-ea8670a872fa68e1952c5f18f';

export const getGallery = async (search, page = 1) => {
  const url = `https://pixabay.com/api/?q=${search}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`;

  const gallery = await axios.get(url);

  return gallery;
};
