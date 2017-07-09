const Shiver = require('../../../');

let component = Shiver.Scope(() => {

	let component = Shiver.Type('Rectangle', {
		id: 'a',
		width: 200,
		height: 200,
		color: 'red'
	}, [
		Shiver.Type('Rectangle', {
			x: Shiver.binding((scope) => scope.a.x + 300),
			y: 100,
			width: 200,
			height: 200,
			opacity: 0.5,
			color: 'blue'
		})
	],
	{
		propertyChanged: (scope, self, propName) => {
			console.log('propertyChanged', propName, self[propName]);
		},
		completed: (scope, self) => {
			self.x += 100;
		}
	});

	return component;
});

Shiver.render(component, document.body);
