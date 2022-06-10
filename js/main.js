import './components/Layout.js';
import { Layout } from './components/Layout.js';
import { Component } from './Component.js';
import { Nav } from './components/Nav.js';

export const Main = new Component(null, {
    state: {
        title: 'Hello'
    },
    //language=HTML
    template: (props) => `
        <h1>${props.title}</h1>
    `
});


Layout(Nav, Main).render();



