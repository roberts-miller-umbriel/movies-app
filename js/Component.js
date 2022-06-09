export const Component = function (opts) {
    this.elem = document.querySelector(opts.selector);
    this.data = opts.data;
    this.template = opts.template;
    
};

Component.prototype.render = function () {
    this.elem.innerHTML = this.template(this.data);
};