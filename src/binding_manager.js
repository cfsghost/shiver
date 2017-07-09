
module.exports = class {

	constructor(engine) {

		this.engine = engine;
		this.mapping = new Map();
	}

	makeSymbol(target, propName) {
		return target.id + '.' + propName;
	}

	register(recvSymbol, targetSymbol) {

		let targets = this.mapping.get(recvSymbol) || [];

		targets.push(targetSymbol);

		this.mapping.set(recvSymbol, targets);
	}

	unregister(symbol) {
		this.mapping.delete(symbol);
	}

	hook(receiver, recvName, target, targetProp) {

		let recvSymbol = this.makeSymbol(receiver, recvName);
		let targetSymbol = this.makeSymbol(target, targetProp);

		// Register
		this.register(recvSymbol, targetSymbol);

		// Hook
		target.on('propertyChanged', (propName) => {
			if (propName === targetProp) {
				this.updateValue(receiver, recvName);
			}
		});
	}

	updateValue(object, propName) {
		object.updateProperty(propName);
	}
};
