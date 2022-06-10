import { Component } from '../Component.js';
import { Nav } from './Nav.js';

export const Layout = new Component(document.body, {
    state: {
        content: '',
        setMainContent: function (component) {
            this.content = component.outerHTML;
        }
    },
    //language=HTML
    content: (props) => `
        ${Nav.render().outerHTML}
        ${props.content}
    `
});
