const Component = require('./component');
const Binder = require('./binder');
const Engine = require('./engine');
const ScopeFactory = require('./scope_factory');

let engine = new Engine();
let scopeFactory = new ScopeFactory();

let Shiver = module.exports = {
	getEngine: () => {
		return engine;
	},
	Scope: (obj) => {

		if (obj instanceof Function) {
			let scope = scopeFactory.createScope();
			let component = obj.bind(scope)();
			component.setScope(scope);

			return component;
		}

		return scopeFactory.wrap(obj);
	},
	Type: (type, props, childrens, listeners) => {
		let comp = new Component(Shiver.getEngine());

		comp.load({
			type: type,
			props: props || {},
			childrens: childrens || [],
			listeners: listeners || {}
		});

		return comp;
	},
	binding: (fn) => {
		return new Binder(fn);
	},
	render: async (component, mountNode) => {

		let object = await component.createObject();

		let node = await object.render();

		if (node === undefined) {
			node = document.createElement('div');
		}

		mountNode.appendChild(node);
	}
};
