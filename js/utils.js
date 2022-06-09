// Takes in a string of html, then turns it into a usable DOM element
export const htmlToElement = (html) => {
    let template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
};

// Takes in a string, then capitalizes the first character.
export const capitalizeString = (str) => str.charAt(0).toUpperCase() + str.slice(1);