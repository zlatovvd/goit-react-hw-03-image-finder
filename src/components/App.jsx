import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { ThreeDots } from 'react-loader-spinner';
import React, { Component } from 'react';
import { getGallery } from 'services/galleryApi';
import css from './App.module.css';

class App extends Component {
  state = {
    gallery: [],
    image: '',
    search: '',
    page: 0,
    status: 'idle',
    error: '',
    isModal: false,
  };

  toogle = () => {
    this.setState({ isModal: !this.state.isModal });
  };

  modalOpen = img => {
    this.setState({ image: img });
    this.toogle();
  };

  onSubmit = search => {
    console.log('onSubmit');
    if (search === this.state.search) {
      return;
    }
    this.setState({ search, page: 1, gallery: [] });
  };

  onClickMoreBtn = () => {
    console.log('onClickMoreBtn');
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  loadGallery = async () => {
    const { page, search } = this.state;
    this.setState({ status: 'pending' });
    try {
      const gallery = await getGallery(search, page);
      if (gallery.data.total === 0) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      this.setState(prevState => ({
        gallery: [...prevState.gallery, ...gallery.data.hits],
        status: 'success',
      }));
    } catch (error) {
      this.setState({ error: error.message, status: 'error' });
    }
  };

  componentDidUpdate(_, prevState) {
    console.log('did update');
    const { page, search } = this.state;
    if (page !== prevState.page || search !== prevState.search) {
      this.loadGallery();
    }
  }

  render() {
    const { status, gallery, image, error } = this.state;

    return (
      <div
        className={css.App}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={this.onSubmit} />

        {gallery.length > 0 && (
          <ImageGallery
            gallery={this.state.gallery}
            modalOpen={this.modalOpen}
          />
        )}

        {status === 'pending' && (
          <div className={css.wrapper}>
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#4fa94d"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </div>
        )}

        {status === 'success' && (
          <div className={css.wrapper}>
            <Button onClick={this.onClickMoreBtn} />
          </div>
        )}

        {status === 'error' && <h1>{error}</h1>}

        {this.state.isModal && <Modal img={image} onClose={this.toogle} />}
      </div>
    );
  }
}

export { App };
