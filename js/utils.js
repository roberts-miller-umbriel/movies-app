export const htmlToElement = (html) => {
    let template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
};


export const animate = (element, properties, duration) => {
    const anim = element.animate(properties, { duration });
    anim.finished.then(() => {
        for (const property of Object.keys(properties)) {
            element.style[property] = properties[property];
        }
    });

};