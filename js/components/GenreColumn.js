import { Component } from '../Component.js';

export const GenreColumn = (state) => new Component(null, {
    state,
    //language=HTML
    template: (props) => {
        return `
            <div class="genre-container">

                <div class="genre-carousel">
                    ${props.title}
                </div>

            </div>
        `;
    }
});