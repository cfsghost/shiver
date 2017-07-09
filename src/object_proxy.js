
module.exports = (target) => {

	return new Proxy(target, {

		get: (target, name) => {
			return target.getProperty(name);
		}
	});
};
