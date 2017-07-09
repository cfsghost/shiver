class Scope {

	constructor() {
		this.objects = {};
		this.proxy = null;
	}

	getProperty(name) {
		return this.objects[name];
	}

	setProperty(propName, object) {
		this.objects[propName] = object;
	}

	removeProperty(name) {
		delete this.objects[name];
	}

	getProxy() {
		if (this.proxy === null) {
			this.proxy = new Proxy(this, {
				get: (target, propName) => {
					return target.getProperty(propName).proxy;
				}
			});
		}

		return this.proxy;
	}
}

module.exports = class ScopeFactory {

	wrap(component) {

		let scope = this.createScope();

		component.setScope(scope);

		return component;
	}

	createScope() {
		return new Scope(); 
	}
};
