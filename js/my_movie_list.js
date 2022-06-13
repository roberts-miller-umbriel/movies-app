import { Component } from './Component.js';
import { Layout } from './components/Layout.js';

const MyMovieList = new Component({ nodeType: 'div' }, {
    state: {
        title: 'a'
    },
    content: (props) => `<h1>${props.title}</h1>`
});

const App = new Component(document.querySelector('main'), {
    state: {},
    content: (props) => MyMovieList.updateTree().outerHTML
});




