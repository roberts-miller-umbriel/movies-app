import { GenreColumn } from './components/GenreColumn.js';
import { MOVIE_DB_API_KEY } from './keys.js';

export const TMDB_IMG_URL = 'https://image.tmdb.org/t/p/original';


(() => {
    const MOVIE_API_URL = 'https://tricky-excessive-booklet.glitch.me/movies';
    const TMDB_API_URL = 'https://api.themoviedb.org/3';

    function getMovieData() {
        // return fetch(MOVIE_API_URL, {
        //     method: 'GET'
        // })
        //     .then(res => res.json())
        //     .then(movieData => movieData)
        //     .catch(error => console.error(error));
        return fetch(`${TMDB_API_URL}/movie/popular?api_key=${MOVIE_DB_API_KEY}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => data.results)
            .catch(error => console.error(error));

    }

    function addMovie({ title, director, rating, genre }) {
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

    function updateMovie({ id, title, director, rating, genre }) {
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

    function deleteMovie(id) {
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

    getMovieData().then(movies => {
        console.log(movies);
        const moviesContainer = document.querySelector('#movies-container');
        moviesContainer.appendChild(GenreColumn(movies));
        console.log(movies);

        // const uniqueGenres = movies
        //     .map(movie => movie.genre)
        //     .reduce((acc, curr) => {
        //         if (!acc.includes(curr)) return [...acc, curr];
        //         else return acc;
        //     }, []);
        //
        // for (const genre of uniqueGenres) {
        //     const moviesWithGenre = movies.filter(movie => movie.genre === genre);
        //     moviesContainer.appendChild(GenreColumn(moviesWithGenre));
        // }


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


    });

})();
