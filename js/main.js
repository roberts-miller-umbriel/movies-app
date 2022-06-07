import { GenreColumn } from './components/GenreColumn.js';


(() => {
    const MOVIE_API_URL = 'https://tricky-excessive-booklet.glitch.me/movies';

    function getMovieData() {
        return fetch(MOVIE_API_URL, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(movieData => movieData)
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
        document.querySelector('#movies-container').appendChild(GenreColumn(movies));
        const genre = document.querySelector('.genre-container');
        new Flickity(genre, {
            wrapAround: true,
            // adaptiveHeight: true,
            // setGallerySize: false,
            pageDots: false,
            cellAlign: 'left',
            contain: true
        });


    });

})();
