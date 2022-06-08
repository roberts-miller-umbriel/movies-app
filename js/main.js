import { GenreColumn } from './components/GenreColumn.js';
import { MOVIE_DB_API_KEY } from './keys.js';
import { SearchModal } from './components/SearchModal.js';
import { animate, capitalizeString } from './utils.js';
import { GENRES } from './consts.js';
import { TMDB } from './api.js';

export const TMDB_IMG_URL = 'https://image.tmdb.org/t/p/original';
export const TMDB_API_URL = 'https://api.themoviedb.org/3';


export const changeSearchModal = (movie) => {
    const modal = document.querySelector('#search-modal');
    const newModal = SearchModal(movie);
    document.querySelector('body').style.overflow = 'hidden';
    modal.replaceWith(newModal);


    newModal.querySelector('.close-btn')
        .addEventListener('click', () => {
            document.querySelector('body').style.overflow = 'unset';
            closeSearchModal();
        });
};
export const closeSearchModal = () => {
    const modal = document.querySelector('#search-modal');
    animate(modal, { opacity: 0, visibility: 'hidden' }, 500);
};

export const getMovieById = (id) => {
    return fetch(`${TMDB_API_URL}/movie/${id}?api_key=${MOVIE_DB_API_KEY}`)
        .then(res => res.json())
        .then(data => data);
};

(() => {
    
    // Component Rendering
    const renderMovieCarousel = (movies, carouselLabel) => {
        const moviesContainer = document.querySelector('#movies-container');
        moviesContainer.appendChild(GenreColumn(movies, capitalizeString(carouselLabel)));


        const genreContainers = document.querySelectorAll('.genre-carousel');
        for (const genreContainer of genreContainers) {
            const flick = new Flickity(genreContainer, {
                wrapAround: true,
                // adaptiveHeight: true,
                // setGallerySize: false,
                pageDots: false,
                cellAlign: 'left',
                contain: true
            });
            flick.on('staticClick', (event, pointer, cellElement) => {
                getMovieById(cellElement.getAttribute('data-movie-id'))
                    .then(movie => {
                        changeSearchModal(movie);
                    });
            });
        }
    };


    TMDB.getPopularMovies()
        .then(movies => renderMovieCarousel(movies, 'Popular'))
        .then(() => {
            const genresToList = ['horror', 'animation', 'adventure'];
            for (const genre of genresToList) {
                TMDB.getMoviesByGenre(genre)
                    .then(movies => renderMovieCarousel(movies, genre));
            }
        })
        .then(() => {

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


})();
