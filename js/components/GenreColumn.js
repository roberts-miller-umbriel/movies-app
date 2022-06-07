import { htmlToElement } from '../utils.js';

export const GenreColumn = (movies) => {
    const container = document.createElement('div');

    //language=HTML
    return htmlToElement(`
        <div class="genre-container">
            ${

                    movies.map(movie =>
                            MovieCard(movie.title, movie.director, movie.rating, movie.genre)
                    ).join('')
            }
        </div>
    `);


};


export const MovieCard = (title, director, rating, genre) => {
    console.log(title);
    //language=HTML
    return `
        <div class="movie-card">
            <img src="/img/cardbackground.jpg">
            <h1>${title}</h1>
            <div class="movie-edit-controls">

            </div>

        </div>
    `;
};