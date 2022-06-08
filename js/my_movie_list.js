import { MovieCard } from './components/GenreColumn.js';
import { getMovieById } from './main.js';

const MOVIE_API_URL = 'https://elderly-fanatical-windscreen.glitch.me/movies';


// Custom Movie Functionality
function addCustomMovie({ tmdbId, userRating }) {
    return fetch(MOVIE_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tmdbId, userRating })
    })
        .then(res => res.json())
        .then(movie => movie)
        .catch(error => console.error(error));
}

function updateCustomMovie({ id, title, director, rating, genre }) {
    return fetch(`${MOVIE_API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, director, rating, genre })
    })
        .then(res => res.json())
        .then(movie => movie)
        .catch(error => console.error(error));
}

function deleteCustomMovie(id) {
    return fetch(`${MOVIE_API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then(movie => movie)
        .catch(error => console.error(error));

}

function getCustomMovies() {
    return fetch(MOVIE_API_URL)
        .then(res => res.json())
        .then(movies => movies)
        .catch(error => console.error(error));
}


const renderCustomMovies = (movies) => {
    for (const movie of movies) {
        getMovieById(movie.tmdbId).then(movie => {
            document.querySelector('#movie-list-container').appendChild(MovieCard(movie));
        });
    }
};

getCustomMovies().then(movies => {
    renderCustomMovies(movies);
});