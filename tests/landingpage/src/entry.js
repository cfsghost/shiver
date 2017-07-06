const Shiver = require('../../../');

let component = Shiver.Type('Rectangle', {
	width: 200,
	height: 200,
	color: 'red'
}, [
	Shiver.Type('Rectangle', {
		x: 100,
		y: 100,
		width: 200,
		height: 200,
		color: 'blue'
	})
]);

Shiver.render(component, document.body);
