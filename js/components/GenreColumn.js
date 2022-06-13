import { Component } from '../Component.js';
import { TMDB } from '../api.js';
import { changeSearchModal } from './SearchModal.js';


const MovieCard = (movie) => new Component({
        data: {
            movie
        },
        //language=HTML
        template: ({ movie }) => {
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
        }
    }
);


export const GenreColumn = (movies, label) => new Component({
    data: {
        movies
    },
    //language=HTML
    template: ({ movies }) => {
        return `
            <div class="genre-container">
                <h1>${label}</h1>
                <div class="genre-carousel">
                    ${movies.map(movie => MovieCard(movie).render().outerHTML).join('')}
                </div>

            </div>
        `;
    }
});

const genresToShow = ['Action', 'Horror', 'Comedy', 'Thriller'];
const promises = genresToShow.map((genre) => TMDB.getMoviesByGenre(genre)
    .then(movies => {
        document.querySelector('#movie-carousels-container').innerHTML += GenreColumn(movies, genre).render().outerHTML;
    })
);

// Wait for all movies to be loaded in then setup flickity
Promise.all(promises).then(() => {
    // Create flickity instance on our carousel container
    const carousels = document.querySelectorAll('.genre-carousel');
    console.log(carousels);
    for (const carousel of carousels) {
        const flick = new Flickity(carousel, {
            wrapAround: true,
            pageDots: false,
            cellAlign: 'left',
            contain: true
        });

        // Register event listener on flickity to display modal when a movie is clicked
        flick.on('staticClick', (event, pointer, cellElement) => {
            TMDB.getMovieById(cellElement.getAttribute('data-movie-id'))
                .then(movie => {
                    changeSearchModal(movie);
                });
        });
    }
});

