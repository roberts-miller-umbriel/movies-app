import { htmlToElement } from '../utils.js';
import { changeSearchModal } from '../components/SearchModal.js';
import { CUSTOM_MOVIE_LIST, TMDB } from '../api.js';

// Function that takes in an array of movies, and a label, then generates a DOM element
export const GenreColumn_old = (movies, label) => {
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
    // Element has to be injected first to be used with flickity. Janky fix :(
    document.body.appendChild(container);

    // Create flickity instance on our carousel container
    const flick = new Flickity(container.querySelector('.genre-carousel'), {
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
    return container;
};

// Function that takes in a movie object, a boolean for edit-ability and a customId reference to the JSON-Server object
// Generates a DOM element and registers event listeners for the edit buttons, if they are enabled.
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
    // Event listener for deleting the movie
    card.querySelector('.movie-edit-controls .delete-btn')
        .addEventListener('click', (e) => {
            // Stops the click from registering on parent
            e.stopPropagation();

            // Deletes the movie from json server
            CUSTOM_MOVIE_LIST.deleteMovie(customId)
                .then(() => {
                    card.style.display = 'none';
                })
                .catch(e => console.error(e));
        });

    const editCard = MovieCardEdit(card, customId);
    card.appendChild(editCard);

    card.querySelector('.movie-edit-controls .edit-btn')
        .addEventListener('click', (e) => {
            e.stopPropagation();
            editCard.classList.toggle('hidden');
        });

    // Event listener to change the modal when the card is clicked
    card.addEventListener('click', (e) => {
        changeSearchModal(movie);
    });

    return card;
};

export const MovieCardEdit = (parent, id) => {
    const element = htmlToElement(`
        <div class="movie-edit hidden">
            <form>
                <input type="text">
                <button>Change Movie</button>
            </form>
        </div>
    `);
    element.addEventListener('click', (e) => e.stopPropagation());
    element.querySelector('form')
        .addEventListener('submit', (e) => {
            e.preventDefault();
            console.log(id);
            TMDB.searchMovie(e.target.querySelector('input').value)
                .then(movie => {
                    CUSTOM_MOVIE_LIST.updateMovie(id, { tmdbId: movie.id, userRating: 10 })
                        .then(data => data);
                });
        });


    //language=HTML
    return element;
};