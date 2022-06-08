import { MOVIE_DB_API_KEY } from './keys.js';
import { GENRES } from './consts.js';
import { TMDB_API_URL } from './main.js';


export const TMDB = {
    API_URL: 'https://api.themoviedb.org/3',
    IMG_URL: 'https://image.tmdb.org/t/p/original',
    getPopularMovies: () => {
        return fetch(`${TMDB_API_URL}/movie/popular?api_key=${MOVIE_DB_API_KEY}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => data.results)
            .catch(error => console.error(error));
    },
    getMoviesByGenre: (genreName) => {
        const genre = GENRES.filter(genre => genre.name.toLowerCase() === genreName.toLowerCase())[0];
        return fetch(`${TMDB_API_URL}/discover/movie?with_genres=${genre.id}&api_key=${MOVIE_DB_API_KEY}`)
            .then(res => res.json())
            .then(data => data.results)
            .catch(error => console.error(error));
    },
    searchMovie: (title) => {
        return fetch(`${TMDB_API_URL}/search/movie/?query=${encodeURIComponent(title)}&api_key=${MOVIE_DB_API_KEY}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                return fetch(`${TMDB_API_URL}/movie/${data.results[0].id}?api_key=${MOVIE_DB_API_KEY}`)
                    .then(res => res.json())
                    .then(movieData => movieData);
            })
            .catch(error => console.error(error));
    }
};


export const CUSTOM_MOVIE_LIST = {
    API_URL: 'https://elderly-fanatical-windscreen.glitch.me/movies',
    deleteMovie: (id) => {
        return fetch(`${MOVIE_API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(movie => movie)
            .catch(error => console.error(error));
    },
    addCustomMovie: ({ tmdbId, userRating }) => {
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
    },
    getCustomMovies: () => {
        return fetch(MOVIE_API_URL)
            .then(res => res.json())
            .then(movies => movies)
            .catch(error => console.error(error));
    }
};