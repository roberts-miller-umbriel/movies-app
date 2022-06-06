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

    function postNewMovie(title, director, rating, genre) {
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


})();
