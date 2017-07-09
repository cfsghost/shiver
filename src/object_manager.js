
module.exports = class {

	constructor() {
		this.objects = {};
	}

	addObject(object) {
		this.objects[object.id] = object;
	}

	removeObject(object) {
		delete this.objects[object.id];
	}

	getObject(id) {
		return this.objects[id];
	}
};
