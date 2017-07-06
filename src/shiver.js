const Component = require('./component');

module.exports = {
	Type: (type, props, childrens) => {
		let comp = new Component();

		comp.load({
			type: type,
			props: props || {},
			childrens: childrens || []
		});

		return comp;
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
