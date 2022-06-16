import { CUSTOM_MOVIE_LIST, TMDB } from '../api.js';
import { changeSearchModal } from './SearchModal.js';
import { LOADING_MODAL } from '../main.js';

export const MovieCard = (movie) => {
    //language=HTML
    return `
        <div class="movie-card" data-movie-id="${movie.id}">
            <img src="${TMDB.IMG_URL}/${movie.poster_path}" alt="${movie.title}">
            <h1>${movie.title}</h1>
            <div class="movie-edit-controls">
                <i class="fa-solid fa-pen-to-square edit-btn"></i>
                <i class="fa-regular fa-trash-can delete-btn"></i>
            </div>
        </div>
    `;
};


export const GenreColumn = (movies, label) => {
    //language=HTML
    return `
        <div class="genre-container">
            <h1>${label}</h1>
            <div class="genre-carousel">
                ${movies.map(movie => MovieCard(movie)).join('')}
            </div>
        </div>
    `;
};


const genresToShow = ['Action', 'Horror', 'Comedy', 'Thriller'];
const genrePromises = genresToShow.map((genre) => TMDB.getMoviesByGenre(genre)
    .then(movies => {
        const twentyMovies = movies.slice(0, 20);
        document.querySelector('#movie-carousels-container')
            .innerHTML += GenreColumn(twentyMovies, genre);
    })
);

const customMoviePromise = CUSTOM_MOVIE_LIST.getMovies().then(movies => {
    const movieProms = movies.map(movie => {
        return TMDB.getMovieById(movie.tmdbId).then(movie => movie);
    });
    return Promise.all(movieProms).then(movies => {
        document.querySelector('#movie-list-container')
            .innerHTML += GenreColumn(movies, 'My Movie List');
    });
});


export const FLICKITIES = [];

// Wait for all movies to be loaded in then setup flickity
Promise.all([...genrePromises, customMoviePromise]).then(() => {
    // Create flickity instance on our carousel container
    const carousels = document.querySelectorAll('.genre-carousel');
    console.log(carousels);
    for (const carousel of carousels) {
        const flick = new Flickity(carousel, {
            wrapAround: true,
            pageDots: false,
            cellAlign: 'left',
            contain: true,
            // freeScroll: true
        });
        FLICKITIES.push(flick);

        // Register event listener on flickity to display modal when a movie is clicked
        flick.on('staticClick', (event, pointer, cellElement) => {
            TMDB.getMovieById(cellElement.getAttribute('data-movie-id'))
                .then(tmdbMovie => {
                    changeSearchModal(tmdbMovie);
                });

        });
    }
    setTimeout(() => {
        LOADING_MODAL.classList.add('closed');

    }, 1000);
});

