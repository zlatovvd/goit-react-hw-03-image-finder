import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ img, largeImg, modalOpen }) => (
  <li className={css.ImageGalleryItem}>
    <img
      src={img}
      alt=""
      className={css.ImageGalleryItemImage}
      onClick={() => modalOpen(largeImg)}
    />
  </li>
);

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  img: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  modalOpen: PropTypes.func.isRequired,
};
