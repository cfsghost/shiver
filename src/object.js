const events = require('events');

module.exports = class extends events.EventEmitter {

	constructor(prototype) {
		super(prototype);

		this.instance = new prototype();
		this.childrens = [];
	}

	applyProperties(props) {

		Object.entries(props).map((entry) => {
			this.instance[entry[0]] = entry[1];
		});
		
	}

	addChildrens(objects) {
		this.childrens = this.childrens.concat(objects);
	}

	async render() {

		let node = await this.instance.render();
		let tasks = this.childrens.map((childObject) => {
			return childObject.render();
		});

		let childNodes = await Promise.all(tasks);

		childNodes.forEach((child) => {

			if (child === undefined)
				return;

			node.appendChild(child);
		});

		return node;
	}
};
