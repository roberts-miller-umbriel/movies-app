export const Component = (function () {
    const Component = function (elem, opts) {
        this.elem = elem;
        this.state = opts ? opts.state : null;
        this.template = opts ? opts.template : null;
    };

    Component.sanitize = (str) => {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    };

    Component.prototype.render = function () {
        const elem = typeof this.elem === 'string' ? document.querySelector(this.elem) : this.elem;
        if (!elem) return;
        const template = (typeof this.template === 'function' ? this.template(this.state) : this.template);

        if (['string', 'number'].indexOf(typeof template) === -1) return;

        if (elem.innerHTML === template) return;
        elem.innerHTML = template;

        if (typeof window.CustomEvent === 'function') {
            let event = new CustomEvent('render', {
                bubbles: true
            });
            elem.dispatchEvent(event);
        }

        return elem;
    };


    return Component;
})();