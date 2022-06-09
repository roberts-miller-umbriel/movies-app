import { Component } from './Component.js';
import { MovieCard } from './components/MovieCard.js';

const Home = new Component({
    selector: 'main',
    data: {
        movies: 'Hello'
    },
    template: (props) => {
        //language=HTML
        return `
            <div>
                ${
                        props.movies.map(movie => {
                            return MovieCard;
                        })
                }
            </div>
        `;
    }
});

Home.render();