import { animate, htmlToElement } from '../utils.js';
import { changeSearchModal } from '../main.js';
import { CUSTOM_MOVIE_LIST, TMDB } from '../api.js';

export const GenreColumn = (movies, label) => {
    //language=HTML
    const container = htmlToElement(`
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
    document.body.appendChild(container);

    const flick = new Flickity(container.querySelector('.genre-carousel'), {
        wrapAround: true,
        pageDots: false,
        cellAlign: 'left',
        contain: true
    });
    flick.on('staticClick', (event, pointer, cellElement) => {
        TMDB.getMovieById(cellElement.getAttribute('data-movie-id'))
            .then(movie => {
                changeSearchModal(movie);
            });
    });


    //language=HTML
    return container;


};


export const MovieCard = (movie, editable = false, customId) => {
    //language=HTML
    const card = htmlToElement(`
        <div class="movie-card" data-movie-id="${movie.id}">
            <img src="${TMDB.IMG_URL}/${movie.poster_path}" alt="${movie.title}">
            <h1>${movie.title}</h1>
            <div class="movie-edit-controls" style="display: ${editable ? 'block' : 'none'}">
                <i class="fa-solid fa-pen-to-square edit-btn"></i>
                <i class="fa-regular fa-trash-can delete-btn"></i>
            </div>
        </div>
    `);
    card.querySelector('.movie-edit-controls .delete-btn')
        .addEventListener('click', (e) => {
            e.stopPropagation();
            CUSTOM_MOVIE_LIST.deleteMovie(customId)
                .then(() => {
                    card.style.display = 'none';
                })
                .catch(e => console.error(e));
        });
    card.addEventListener('click', (e) => {
        changeSearchModal(movie);
    });

    return card;
};