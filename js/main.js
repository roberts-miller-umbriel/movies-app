import { Component } from './Component.js';
import { Layout } from './components/Layout.js';

const Index = new Component({ nodeType: 'div' }, {
    state: {
        title: 'Testing'
    },
    content: (props) => `<h1>${props.title}</h1>`
});

const App = new Component(document.querySelector('main'), {
    state: {},
    content: (props) => Index.render().outerHTML
});


Layout.state.setMainContent(App.render());
Layout.render();

