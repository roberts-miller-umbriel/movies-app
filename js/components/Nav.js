import { htmlToElement } from '../utils.js';
import { TMDB } from '../api.js';
import { changeSearchModal } from './SearchModal.js';

const Nav = () => {
    //language=HTML
    return `
        <nav>
            <img src="/img/theaterseats.jpg" alt="Header Background">
            <h1 class="main-title">The Movie Depot</h1>
            <form id="movie-search">
                <input type="text" placeholder="Search.." name="search">
                <button type="submit"><i class="fa fa-search"></i></button>
            </form>
        </nav>
    `;
};

document.body.prepend(htmlToElement(Nav()));

document.querySelector('#movie-search')
    .addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;
        const text = form.querySelector('input[type="text"]').value;
        TMDB.searchMovie(text)
            .then(results => {
                changeSearchModal(results);
            });

    });