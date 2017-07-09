const events = require('events');
const Binder = require('./binder');
const createObjectProxy = require('./object_proxy');

module.exports = class extends events.EventEmitter {

	constructor(engine, prototype) {
		super(engine, prototype);

		this.id = Math.random().toString().substr(2) + Date.now();;
		this.engine = engine;
		this.scope = null;
		this.instance = new prototype(this.id);
		this.childrens = [];
		this.node = null;
		this.proxy = new Proxy(this, {
			get: (target, propName) => {
				return target.getProperty(propName);
			},
			set: (target, propName, value) => {
				target.setProperty(propName, value);
			}
		});
		this.binders = {};
	}

	setScope(scope) {
		this.scope = scope;
		this.scope.setProperty(this.id, this);
	}

	applyProperties(props) {

		Object.entries(props).map(([ propName, value ]) => {

			if (propName === 'id') {
				this.scope.removeProperty(value);
				this.scope.setProperty(value, this);
			} else if (value instanceof Binder) {
				this.binders[propName] = value;
				this.instance[propName] = value.init(this.engine, this, propName, this.scope);
			} else {
				this.instance[propName] = value;
			}
		});
		
	}

	applyListeners(listeners) {
		Object.entries(listeners).forEach(([ eventName, listener ]) => {
			this.on(eventName, (...args) => {
				args = [ this.scope, this.proxy ].concat(args);
				listener.apply(this, args);
			});
		});
	}

	updateProperty(propName) {
		if (this.binders[propName] !== undefined) {
			this.setProperty(propName, this.binders[propName].update(this.scope));
		}
	}

	addChildrens(objects) {
		this.childrens = this.childrens.concat(objects);
	}

	getProperty(propName) {
		return this.instance[propName];
	}

	setProperty(propName, value) {
		this.instance[propName] = value;
		this.instance.updateProperty(propName);

		this.emit('propertyChanged', propName);
	}

	async render() {

		let node = this.node = await this.instance.render();
		let tasks = this.childrens.map((childObject) => {
			return childObject.render();
		});

		let childNodes = await Promise.all(tasks);

		childNodes.forEach((child) => {

			if (child === undefined)
				return;

			node.appendChild(child);
		});

		this.emit('completed');

		return node;
	}
};
