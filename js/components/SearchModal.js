import { animate, htmlToElement } from '../utils.js';
import { TMDB } from '../api.js';

export const SearchModal = (movie) => {

    //language=HTML
    return htmlToElement(`
        <div id="search-modal">
            <div class="container">
                <button class="close-btn">X</button>

                <div class="info">
                    <h1>${movie.original_title}</h1>
                    <p>${movie.overview}</p>
                </div>
                <div class="poster" style="background-image: url('${TMDB.IMG_URL}/${movie.backdrop_path}')">

                </div>
            </div>
        </div>
    `);

};

export const changeSearchModal = (movie) => {
    const modal = document.querySelector('#search-modal');
    const newModal = SearchModal(movie);
    document.querySelector('body').style.overflowY = 'hidden';
    modal.replaceWith(newModal);


    newModal.querySelector('.close-btn')
        .addEventListener('click', () => {
            document.querySelector('body').style.overflowY = 'unset';
            closeSearchModal();
        });
};
export const closeSearchModal = () => {
    const modal = document.querySelector('#search-modal');
    animate(modal, { opacity: 0, visibility: 'hidden' }, 500);
};

document.body.innerHTML += '<div id="search-modal" class="hidden"></div>';