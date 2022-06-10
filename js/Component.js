class Component {
    constructor(opts) {
        this.state = opts.state;
        this.template = opts.template;
    }

    updateTree() {
        const element = this.template(this.state);
    }

    setState(stateObj) {
        for (const stateObjKey in stateObj) {
            this.state[stateObjKey] = stateObj[stateObjKey];
        }
    }
}