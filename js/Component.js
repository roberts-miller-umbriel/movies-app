export class Component {
    constructor(parentNode, opts) {
        this.componentId = Math.floor((Date.now() * Math.random()) / 10000);
        this.parentNode = parentNode ? parentNode : null;
        this.state = opts ? opts.state : null;
        this.content = opts ? opts.content : null;
    }

    render() {
        let elem = document.querySelector(`[data-component-id="${this.componentId}"]`);
        if (!elem) {
            if (typeof this.parentNode.nodeType === 'string') {
                console.log(this.parentNode);
                const newEl = document.createElement(this.parentNode.nodeType);
                const elId = this.parentNode.id;
                const elClasses = this.parentNode.classes;
                if (elId) newEl.id = elId;
                if (elClasses) {
                    for (const el of this.parentNode.classes) {
                        newEl.classList.add(el);
                    }
                }
                elem = newEl;

            } else {
                elem = this.parentNode;
            }
        }


        if (!elem) return;
        const template = (typeof this.content === 'function' ? this.content(this.state) : this.content);

        if (['string', 'number'].indexOf(typeof template) === -1) return;

        if (elem.innerHTML === template) return;
        elem.innerHTML = template;
        elem.dataset.componentId = String(this.componentId);

        let event = new CustomEvent('render', {
            bubbles: true
        });
        elem.dispatchEvent(event);
        return elem;
    }


    static sanitize(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }
}

