import { htmlToElement } from '../utils.js';
import { CUSTOM_MOVIE_LIST, TMDB } from '../api.js';
import { FLICKITIES, MovieCard } from './GenreColumn.js';


// Function generates a reusable Modal DOM element from a movie
export const SearchModal = (movie) => {
    //language=HTML
    const element = htmlToElement(`
        <div id="search-modal">
            <div class="container">
                <button class="close-btn">X</button>
                ${
                        !movie.customMovieId
                                ? `<button class="add-btn custom-movie-btn" data-tmdb-id="${movie.id}">Add to your list</button>`
                                : `<button class="remove-btn custom-movie-btn" data-tmdb-id="${movie.id}" data-custom-id="${movie.customMovieId}">Remove from your list</button>`
                }

                <div class="info">
                    <h1>${movie.original_title}</h1>
                    <p>${movie.overview}</p>
                </div>
                <div class="poster" style="background-image: url('${TMDB.IMG_URL}/${movie.backdrop_path}')">
                </div>
            </div>
        </div>
    `);
    const movieListFlickity = FLICKITIES.filter(flick => flick.element.parentNode.parentNode.id === 'movie-list-container')[0];
    // Add event listener to the close button
    element.querySelector('.close-btn').addEventListener('click', closeSearchModal);
    element.querySelector('.add-btn')?.addEventListener('click', (e) => {
        CUSTOM_MOVIE_LIST.addMovie({ tmdbId: parseInt(e.target.dataset.tmdbId), userRating: 5 })
            .then(movie => {
                TMDB.getMovieById(movie.tmdbId).then(movie => {
                    closeSearchModal();
                    movieListFlickity.append(htmlToElement(MovieCard(movie)));
                    // const container = document.querySelector('#movie-list-container .genre-container');
                });
            });
    });
    element.querySelector('.remove-btn')?.addEventListener('click', (e) => {
        const customMovieId = parseInt(e.target.dataset.customId);
        const tmdbId = parseInt(e.target.dataset.tmdbId);
        CUSTOM_MOVIE_LIST.deleteMovie(parseInt(e.target.dataset.customId)).then(movie => {
            closeSearchModal();
            const elementToRemove = document.querySelector(`#movie-list-container .movie-card[data-movie-id="${tmdbId}"]`);
            movieListFlickity.remove(elementToRemove);
            // document.querySelector(`#movie-list-container .movie-card[data-movie-id="${tmdbId}"]`).remove();
        });
    });

    //language=HTML
    return element;

};

// Handles changing the global search modal
export const changeSearchModal = (tmdbMovie) => {
    CUSTOM_MOVIE_LIST.getMovies().then(customMovies => {
        const hasMovie = customMovies.filter(movie => movie.tmdbId === tmdbMovie.id)[0];
        // Get the modal on the page, then replace it with a newly generated one and disable scrolling
        const modal = document.querySelector('#search-modal');
        const newModal = SearchModal({ ...tmdbMovie, customMovieId: hasMovie?.id });
        document.querySelector('body').style.overflowY = 'hidden';
        modal.replaceWith(newModal);
    });


};
// Handles closing the global search modal
export const closeSearchModal = () => {
    const modal = document.querySelector('#search-modal');
    modal.animate({ opacity: 0, visibility: 'hidden' }, { duration: 500, fill: 'forwards' });
    document.querySelector('body').style.overflowY = 'unset';

};

// Inject the search modal container into every page
document.body.innerHTML += '<div id="search-modal" class="hidden"></div>';