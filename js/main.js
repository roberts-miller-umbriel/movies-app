import { GenreColumn } from './components/GenreColumn.js';
import { MOVIE_DB_API_KEY } from './keys.js';

export const TMDB_IMG_URL = 'https://image.tmdb.org/t/p/original';


(() => {
    const MOVIE_API_URL = 'https://tricky-excessive-booklet.glitch.me/movies';
    const TMDB_API_URL = 'https://api.themoviedb.org/3';

    function getPopularMovies() {
        return fetch(`${TMDB_API_URL}/movie/popular?api_key=${MOVIE_DB_API_KEY}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => data.results)
            .catch(error => console.error(error));

    }

    function getNowPlayingMovies() {
        return fetch(`${TMDB_API_URL}/movie/now_playing?api_key=${MOVIE_DB_API_KEY}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => data.results)
            .catch(error => console.error(error));
    }

    function movieSearch(title) {
        return fetch(`${TMDB_API_URL}/search/movie/?query=${encodeURIComponent(title)}&api_key=${MOVIE_DB_API_KEY}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => data.results)
            .catch(error => console.error(error));

    }

    function addCustomMovie({ title, director, rating, genre }) {
        return fetch(MOVIE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, director, rating, genre })
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

    function renderMovieCarousel(movies, carouselLabel) {
        const moviesContainer = document.querySelector('#movies-container');
        moviesContainer.appendChild(GenreColumn(movies, carouselLabel));


        const genreContainers = document.querySelectorAll('.genre-carousel');
        for (const genreContainer of genreContainers) {
            new Flickity(genreContainer, {
                wrapAround: true,
                // adaptiveHeight: true,
                // setGallerySize: false,
                pageDots: false,
                cellAlign: 'left',
                contain: true
            });

        }
    }


    getPopularMovies().then(movies => {
        renderMovieCarousel(movies, 'Popular');
    });
    getNowPlayingMovies().then(movies => {
        renderMovieCarousel(movies, 'Now Playing');
    });


    document.querySelector('#movie-search')
        .addEventListener('submit', (e) => {
            e.preventDefault();
            const form = e.target;
            const text = form.querySelector('input[type="text"]').value;
            movieSearch(text)
                .then(results => {
                    console.log(results);
                });

        });

})();
