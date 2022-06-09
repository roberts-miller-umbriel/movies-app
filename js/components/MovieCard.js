import { Component } from '../Component.js';


export const MovieCard = new Component('main', {
    state: {
        movie: {}
    },
    template: (props) => {
        //language=HTML
        return `
            <div class="movie-card" data-movie-id="${props.movie.id}">
                    <!--<img src="${TMDB.IMG_URL}/${movie.poster_path}" alt="${movie.title}">-->
                <h1>${props.movie.title}</h1>
            </div>
        `;
    }
});