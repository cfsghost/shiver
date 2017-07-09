const SObject = require('./object');

module.exports = class Component {

	constructor(engine) {
		this.engine = engine;
		this.scope = null;
		this.source = {};
		this.comp_prototype = null;
	}

	load(source) {
		this.source = source || {};

		// Load component prototype
		this.comp_prototype = require('./components/' + this.source.type);
	}

	setScope(scope) {
		this.scope = scope;
	}

	async createObject() {

		// Create instance
		let object = new SObject(this.engine, this.comp_prototype);

		object.setScope(this.scope);
		object.applyProperties(this.source.props);
		object.applyListeners(this.source.listeners);

		// Register object to object manager
		this.engine.objectManager.addObject(object);

		// Create object for childrens
		if (this.source.childrens.length !== 0) {

			let tasks = this.source.childrens.map((component) => {
				component.setScope(this.scope);

				return component.createObject();
			});

			let objects = await Promise.all(tasks);

			object.addChildrens(objects);
		}

		return object;
	}
};
