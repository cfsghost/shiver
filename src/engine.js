const ObjectManager = require('./object_manager');
const BindingManager = require('./binding_manager');

module.exports = class {

	constructor() {
		this.objectManager = new ObjectManager(this);
		this.bindingManager = new BindingManager(this);
	}
};
