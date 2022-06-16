import { MOVIE_DB_API_KEY } from './keys.js';
import { GENRES } from './consts.js';

// All api calls in functions for TMDB
export const TMDB = {
    API_URL: 'https://api.themoviedb.org/3',
    IMG_URL: 'https://image.tmdb.org/t/p/original',
    getPopularMovies: () => {
        return fetch(`${TMDB.API_URL}/movie/popular?api_key=${MOVIE_DB_API_KEY}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => data.results)
            .catch(error => console.error(error));
    },
    getMoviesByGenre: (genreName) => {
        const genre = GENRES.filter(genre => genre.name.toLowerCase() === genreName.toLowerCase())[0];
        return fetch(`${TMDB.API_URL}/discover/movie?with_genres=${genre.id}&api_key=${MOVIE_DB_API_KEY}`)
            .then(res => res.json())
            .then(data => data.results)
            .catch(error => console.error(error));
    },
    searchMovie: (title) => {
        return fetch(`${TMDB.API_URL}/search/movie/?query=${encodeURIComponent(title)}&api_key=${MOVIE_DB_API_KEY}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                return fetch(`${TMDB.API_URL}/movie/${data.results[0].id}?api_key=${MOVIE_DB_API_KEY}`)
                    .then(res => res.json())
                    .then(movieData => movieData);
            });
    },
    getMovieById: (id) => {
        return fetch(`${TMDB.API_URL}/movie/${id}?api_key=${MOVIE_DB_API_KEY}`)
            .then(res => res.json())
            .then(data => data)
            .catch(error => console.error(error));
    },
    getMovieCast: (id) => {
        return fetch(`${TMDB.API_URL}/movie/${id}/credits?api_key=${MOVIE_DB_API_KEY}`)
            .then(res => res.json())
            .then(data => data)
            .catch(error => console.error(error));
    }
};

// All api calls in functions for Json-Server
export const CUSTOM_MOVIE_LIST = {
    API_URL: 'https://utopian-enthusiastic-sloop.glitch.me/movies',
    deleteMovie: (id) => {
        return fetch(`${CUSTOM_MOVIE_LIST.API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(movie => movie)
            .catch(error => console.error(error));
    },
    addMovie: ({ tmdbId, userRating }) => {

        return fetch(CUSTOM_MOVIE_LIST.API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tmdbId, userRating })
        })
            .then(res => res.json())
            .then(data => data)
            .catch(e => console.error(e));
    },
    getMovies: () => {
        return fetch(CUSTOM_MOVIE_LIST.API_URL)
            .then(res => res.json())
            .then(movies => movies)
            .catch(error => console.error(error));
    },
    updateMovie: (id, { tmdbId, userRating }) => {
        return fetch(`${CUSTOM_MOVIE_LIST.API_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tmdbId, userRating })
        })
            .then(res => res.json())
            .then(movie => movie)
            .catch(error => console.error(error));
    }
};