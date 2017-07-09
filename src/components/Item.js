const events = require('events');

module.exports = class extends events.EventEmitter {

	constructor(objectName) {
		super();

		this.priv = {};

		this.objectName = objectName;
		this.id = null;
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
		this.opacity = 1;
		this.visible = true;
	}

	updateProperty(propName) {

		let node = this.priv.node;

		switch(propName) {
		case 'x':
			node.style.left = this.x;
			break;
		case 'y':
			node.style.top = this.y;
			break;

		case 'priv':
		case 'visible':
		case 'id':
			break;

		default:
			if (this[propName]) {
				node.style[propName] = this[propName];
			}
		}
	}

	async render() {
	}
};
