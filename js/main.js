import { GenreColumn } from './components/GenreColumn.js';
import { SearchModal } from './components/SearchModal.js';
import { animate, capitalizeString } from './utils.js';
import { TMDB } from './api.js';


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

// Component Rendering
const renderMovieCarousel = (movies, carouselLabel) => {
    const moviesContainer = document.querySelector('#movies-container');
    moviesContainer.appendChild(GenreColumn(movies, capitalizeString(carouselLabel)));
};


TMDB.getPopularMovies()
    .then(movies => renderMovieCarousel(movies, 'Popular'))
    .then(() => {
        const genresToList = ['horror', 'animation', 'adventure'];
        for (const genre of genresToList) {
            TMDB.getMoviesByGenre(genre)
                .then(movies => renderMovieCarousel(movies, genre));
        }
    });


document.querySelector('#movie-search')
    .addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;
        const text = form.querySelector('input[type="text"]').value;
        TMDB.searchMovie(text)
            .then(results => {
                changeSearchModal(results);
            });

    });

document.body.innerHTML += '<div id="search-modal" class="hidden"></div>';