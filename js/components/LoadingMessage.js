import { htmlToElement } from '../utils.js';

export const LoadingMessage = () => {

    //language=HTML
    return htmlToElement(`
        <div id="loading-msg" class="hidden"></div>
    `);
};

