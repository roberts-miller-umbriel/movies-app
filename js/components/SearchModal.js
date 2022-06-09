import { htmlToElement } from '../utils.js';
import { TMDB } from '../api.js';

export const SearchModal = (movie) => {

    //language=HTML
    return htmlToElement(`
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

};