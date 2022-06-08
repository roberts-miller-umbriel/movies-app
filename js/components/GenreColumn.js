import { htmlToElement } from '../utils.js';
import { changeSearchModal, TMDB_IMG_URL } from '../main.js';

export const GenreColumn = (movies, label) => {
    const container = document.createElement('div');

    //language=HTML
    return htmlToElement(`
        <div class="genre-container">
            <h1>${label}</h1>
            <div class="genre-carousel">
                ${

                        movies.map(movie =>
                                MovieCard(movie).outerHTML
                        ).join('')
                }
            </div>

        </div>
    `);


};


export const MovieCard = (movie) => {
    const card = htmlToElement(`
        <div class="movie-card" data-movie-id="${movie.id}">
            <img src="${TMDB_IMG_URL}/${movie.poster_path}" alt="${movie.title}">
            <h1>${movie.title}</h1>
            <div class="movie-edit-controls">

            </div>
        </div>
    `);
    card.addEventListener('click', () => {
        changeSearchModal(movie);
    });
    //language=HTML
    return card;
};