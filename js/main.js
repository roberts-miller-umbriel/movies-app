import './components/Nav.js';
import './components/GenreColumn.js';

export const LOADING_MODAL = document.querySelector('#loading-msg');


const loadingMsg = LOADING_MODAL.querySelector('.msg');
const loadingAnim = (time) => {
    loadingMsg.innerHTML = '...' + '.'.repeat(time / 500 % 10);
    if (LOADING_MODAL.classList.contains('closed')) return window.cancelAnimationFrame(load);
    load = window.requestAnimationFrame(loadingAnim);
};
let load = window.requestAnimationFrame(loadingAnim);


