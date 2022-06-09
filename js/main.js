import { Component } from './Component.js';
import { Layout } from './components/Layout.js';

const Home = new Component('main', {
    state: {
        counter: 0
    },
    template: (props) => {
        //language=HTML
        return `
            <div>
                Hello
            </div>
        `;
    }
});


Layout.state.content = Home.render().innerHTML;
Layout.render();
