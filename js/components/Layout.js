import { Component } from '../Component.js';
import { Nav } from './Nav.js';

export const Layout = new Component('body', {
    state: {
        content: {},
    },
    //language=HTML
    template: (props) => `
        ${Nav.render().innerHTML}
        ${props.content}
    `
});
