export class Component {

    constructor(parentNode, opts) {
        const _componentId = generateComponentId();
        this.getComponentId = () => _componentId;
        this.parentNode = parentNode ? parentNode : document.querySelector('body');
        this.state = opts.state;
        this.template = opts.template;
    }

    render() {
        const elem = document.querySelector(`[data-component-id="${this.getComponentId()}"]`);
        const node = htmlToNode(this.template(this.state));
        node.dataset.componentId = this.getComponentId();

        // If elem already exists, replace it with the new one
        if (elem) elem.replaceWith(node);
        // Else, append to the parent node before script tags
        else this.parentNode.insertBefore(node, this.parentNode.querySelector('script'));

        return node;
    }


    setState(obj) {
        for (const key in obj) {
            this.state[key] = obj[key];
        }
        this.render();
    }


}

const htmlToNode = (strOfHTML) => {
    const temp = document.createElement('template');
    temp.innerHTML = strOfHTML.trim();
    return temp.content.firstChild;
};

const generateComponentId = () => [Math.random(), Math.random(), Math.random()].map(num =>
    Math.floor(num * Date.now() / 100000000)).join('-');