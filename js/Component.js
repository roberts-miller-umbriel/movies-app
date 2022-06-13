export const Component = function (opts, callback) {
    this.opts = opts;
    this._id = genRandomId();
    this.callback = callback ? callback : null;
    this.elem = null;
    this.render();
};


Component.prototype.render = function () {
    if (this.callback !== null) this.callback(this);
    this.elem = nodeFromHtml(this._id, this.opts.template(this.opts.data), this.callback);
    const oldEl = document.querySelector(`[data-id="${this._id}"]`);
    if (oldEl) oldEl.innerHTML = this.elem.innerHTML;

    return this.elem;
};


Component.prototype.setData = function (callback) {
    callback(this.opts.data);
    this.render();
};

// Custom event listener that listens on the document, and checks for id
Component.prototype.addEventListener = function (type, callback) {
    document.addEventListener(type, (e) => {
        const parents = [];
        let node = e.target.parentNode;
        while (node && node.dataset.id !== undefined) {
            parents.push(node);
            if (node) node = node.parentNode;
        }
        for (const node of parents) {
            if (node.dataset.id === this._id) {
                callback(e);
            }
        }
    });
};


const nodeFromHtml = (id, html, callback) => {
    const temp = document.createElement('template');
    temp.innerHTML = html.trim();
    const newEl = temp.content.firstChild;
    newEl.dataset.id = id;
    return newEl;
};

const genRandomId = () => [1, 2, 3].map(_ => Math.floor(Math.random() * Date.now()).toString(36)).join('-');