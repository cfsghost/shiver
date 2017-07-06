const events = require('events');

module.exports = class extends events.EventEmitter {

	constructor() {
		super();

		this.id = null;
		this.width = 0;
		this.height = 0;
		this.opacity = 1;
		this.visible = true;
	}

	async render() {
	}
};
