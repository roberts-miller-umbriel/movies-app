import { GenreColumn } from './components/GenreColumn.js';
import { capitalizeString } from './utils.js';
import { TMDB } from './api.js';
import { changeSearchModal } from './components/SearchModal.js';


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

