import { htmlToElement } from '../utils.js';
import { TMDB_IMG_URL } from '../main.js';

export const SearchModal = (movie) => {

    //language=HTML
    return htmlToElement(`
        <div id="search-modal">
            <div class="info">
                <h1> ${movie.original_title}</h1>
            </div>
            <div class="poster" style="background-image: url('${TMDB_IMG_URL}/${movie.backdrop_path}')">

            </div>
        </div>
    `);

};