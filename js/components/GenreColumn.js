import { htmlToElement } from '../utils.js';
import { TMDB_IMG_URL } from '../main.js';

export const GenreColumn = (movies, label) => {
    const container = document.createElement('div');

    //language=HTML
    return htmlToElement(`
        <div class="genre-container">
            <h1>${label}</h1>
            <div class="genre-carousel">
                ${

                        movies.map(movie =>
                                MovieCard({
                                    title: movie.title,
                                    posterUrl: `${TMDB_IMG_URL}/${movie.poster_path}`
                                })
                        ).join('')
                }
            </div>

        </div>
    `);


};


export const MovieCard = ({ title, director, rating, genre, posterUrl }) => {
    //language=HTML
    return `
        <div class="movie-card">
            <img src="${posterUrl}" alt="${title}">
            <h1>${title}</h1>
            <div class="movie-edit-controls">

            </div>

        </div>
    `;
};