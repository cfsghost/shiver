
module.exports = class extends require('./Item') {

	constructor() {
		super();

		this.visible = true;
		this.color = '#fff';
	}

	async render() {

		let node = document.createElement('div');

		// Apply style
		node.style.position = 'absolute';
		node.style.left = this.x;
		node.style.top = this.y;
		node.style.width = this.width;
		node.style.height = this.height;
		node.style.opacity = this.opacity;
		node.style.backgroundColor = this.color;

		console.log(node.style);

		return node;
	}
};
