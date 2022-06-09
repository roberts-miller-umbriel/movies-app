import { MovieCard } from './components/GenreColumn.js';
import { CUSTOM_MOVIE_LIST, TMDB } from './api.js';
import { LoadingMessage } from './components/LoadingMessage.js';

// State for Movie List
const STATE = {
    // When movie is added, get movie info from api then render the new movie on the page
    addMovie: ({ tmdbId, userRating }) => {
        return CUSTOM_MOVIE_LIST.addMovie({ tmdbId, userRating })
            .then(movie => {
                renderNewMovie(movie);
                return movie;
            })
            .catch(error => console.error(error));
    }
};

// Gets movie by id from TMDB then appends it to the movie list container
const renderNewMovie = (movie) => {
    TMDB.getMovieById(movie.tmdbId)
        .then(tmbdMovie => {
            document.querySelector('#movie-list-container')
                .appendChild(MovieCard(tmbdMovie, true, movie.id));
        });
};


// When the form for adding a movie is submitted
document.querySelector('#add-movie-form')
    .addEventListener('submit', (e) => {
        e.preventDefault();
        // Getting the value put into the input
        const searchVal = e.target.querySelector('#movie-query');

        // Get movie info from TMDB, then render new movie using state object
        TMDB.searchMovie(searchVal.value)
            .then(movie => {
                searchVal.value = '';
                return STATE.addMovie({ tmdbId: movie.id, userRating: 10 });
            })
            .then(movie => console.log(movie))
            .catch(error => console.error('Movie not found'));
    });

const loadingMsg = LoadingMessage();
// loadingMsg.classList.remove('hidden');
document.body.append(loadingMsg);
// document.body.style.overflow = 'hidden';

// Pull all custom movies from the json-server then render them all
CUSTOM_MOVIE_LIST.getMovies()
    .then(movies => {
        setTimeout(() => {
            loadingMsg.animate({ opacity: 0, visibility: 'hidden' }, { duration: 500, fill: 'forwards' });
            document.body.style.overflow = 'scroll';


        }, 3000);
        for (const movie of movies) {
            renderNewMovie(movie);
        }
    });