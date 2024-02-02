import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css'; 
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox('.card a', {
    captions: true,
    captionsData: 'alt',
});

const form = document.querySelector('form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader')

form.addEventListener('submit', searchPhoto);

function searchPhoto(e) {
    e.preventDefault();
    loader.style.display = 'inline-block';
    gallery.innerHTML = '';
    const input = e.target.elements.text.value;

    if (input === '') {
        return iziToast.error({
            message: `Sorry, there are no images matching your search query. Please, try again!`,
            position: "topRight",
            backgroundColor: '#EF4040',
            messageColor: '#FAFAFB',
            theme: 'dark',
        });
    } else {
        getPhotoByName(input);
        e.currentTarget.reset();
    }
}

function getPhotoByName(name) {
    const BASE_URL = 'https://pixabay.com/api/';
    const searchParams = new URLSearchParams({
        key: '6682685-2020f07934f1586c5464d55ac',
        q: `${name}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    });
    const url = `${BASE_URL}?${searchParams}`;

    fetch(url)
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (data.hits.length === 0) {
                return iziToast.error({
                    message: `Sorry, there are no images matching your search query. Please, try again!`,
                    position: "topRight",
                    backgroundColor: '#EF4040',
                    messageColor: '#FAFAFB',
                    theme: 'dark',
                });
            } else {
                render(data);
                lightbox.refresh();
            }  
        })
        .catch(() => {
            return iziToast.error({
                message: `An error occurred while fetching data. Please try again later.`,
                position: "topRight",
                backgroundColor: '#EF4040',
                messageColor: '#FAFAFB',
                theme: 'dark',
            })
        })
        .finally(() => loader.style.display = 'none');
};

function render(images) {
    const markup = images.hits.map(image => template(image)).join('');
    gallery.innerHTML = markup;
}

function template({webformatURL, tags, likes, views, comments, downloads, largeImageURL}) {
    return `<li class="card">
      <a class="link" href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" class="image">
        <div class="container">
          <div class="content">
            <h4 class="name">Likes</h4>
            <p class="description">${likes}</p>
          </div>
          <div class="content">
            <h4 class="name">Views</h4>
            <p class="description">${views}</p>
          </div>
          <div class="content">
            <h4 class="name">Comments</h4>
            <p class="description">${comments}</p>
          </div>
          <div class="content">
            <h4 class="name">Downloads</h4>
            <p class="description">${downloads}</p>
          </div>
        </div>
      </a>
    </li>`
}