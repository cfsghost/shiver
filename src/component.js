const SObject = require('./object');

module.exports = class Component {

	constructor() {
		this.source = {};
		this.comp_prototype = null;
	}

	load(source) {
		this.source = source || {};

		// Load component prototype
		this.comp_prototype = require('./components/' + this.source.type);
	}

	async createObject() {

		// Create instance
		let object = new SObject(this.comp_prototype);

		object.applyProperties(this.source.props);

		// Create object for childrens
		if (this.source.childrens.length !== 0) {

			let tasks = this.source.childrens.map((component) => {
				return component.createObject();
			});

			let objects = await Promise.all(tasks);

			object.addChildrens(objects);
		}

		return object;
	}
};
