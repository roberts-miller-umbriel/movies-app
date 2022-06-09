import { htmlToElement } from '../utils.js';
import { TMDB } from '../api.js';


// Function generates a reusable Modal DOM element from a movie
export const SearchModal = (movie) => {
    const element = htmlToElement(`
        <div id="search-modal">
            <div class="container">
                <button class="close-btn">X</button>

                <div class="info">
                    <h1>${movie.original_title}</h1>
                    <p>${movie.overview}</p>
                </div>
                <div class="poster" style="background-image: url('${TMDB.IMG_URL}/${movie.backdrop_path}')">

                </div>
            </div>
        </div>
    `);
    // Add event listener to the close button
    element.querySelector('.close-btn').addEventListener('click', closeSearchModal);

    //language=HTML
    return element;

};

// Handles changing the global search modal
export const changeSearchModal = (movie) => {
    // Get the modal on the page, then replace it with a newly generated one and disable scrolling
    const modal = document.querySelector('#search-modal');
    const newModal = SearchModal(movie);
    document.querySelector('body').style.overflowY = 'hidden';
    modal.replaceWith(newModal);

};
// Handles closing the global search modal
export const closeSearchModal = () => {
    const modal = document.querySelector('#search-modal');
    modal.animate({ opacity: 0, visibility: 'hidden' }, { duration: 500, fill: 'forwards' });
    document.querySelector('body').style.overflowY = 'unset';

};

// Inject the search modal container into every page
document.body.innerHTML += '<div id="search-modal" class="hidden"></div>';