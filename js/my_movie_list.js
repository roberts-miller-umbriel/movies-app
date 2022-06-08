import { MovieCard } from './components/GenreColumn.js';
import { getMovieById } from './main.js';
import { CUSTOM_MOVIE_LIST } from './api';


const renderCustomMovies = (movies) => {
    for (const movie of movies) {
        getMovieById(movie.tmdbId).then(movie => {
            document.querySelector('#movie-list-container').appendChild(MovieCard(movie));
        });
    }
};

CUSTOM_MOVIE_LIST.getCustomMovies().then(movies => {
    renderCustomMovies(movies);
});