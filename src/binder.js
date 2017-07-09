
module.exports = class {

	constructor(fn) {
		this.fn = fn;
	}

	init(engine, object, property, scope) {

		return this.fn(new Proxy(scope.getProxy(), {

			get: (scopeProxy, objName) => {

				let origTarget = scope.getProperty(objName);
				let targetObj = scopeProxy[objName];

				return new Proxy(targetObj, {

					get: (target, targetProp) => {

						// Hook to specific object and its property
						engine.bindingManager.hook(object, property, origTarget, targetProp);

						return target[targetProp];
					}
				});
			}
		}));
	}

	update(scope) {
		return this.fn(scope.getProxy());
	}
};
