import { MovieCard } from './components/GenreColumn.js';
import { CUSTOM_MOVIE_LIST, TMDB } from './api.js';


const renderCustomMovies = (movies) => {
    for (const movie of movies) {
        TMDB.getMovieById(movie.tmdbId).then(tmbdMovie => {
            document.querySelector('#movie-list-container').appendChild(MovieCard(tmbdMovie, true, movie.id));
        });
    }
};


document.querySelector('#add-movie-form')
    .addEventListener('submit', (e) => {
        e.preventDefault();
        const searchVal = e.target.querySelector('#movie-query').value;
        TMDB.searchMovie(searchVal)
            .then(movie => {
                return CUSTOM_MOVIE_LIST.addCustomMovie({ tmdbId: movie.id, userRating: 5 });
            })
            .then(movie => console.log(movie));
    });

CUSTOM_MOVIE_LIST.getCustomMovies().then(movies => {
    renderCustomMovies(movies);
});