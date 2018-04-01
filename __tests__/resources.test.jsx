import React from 'react';
import Resources from '../src/js/pages/Resources.jsx';
import renderer from 'react-test-renderer';

test('Resources page content',() =>{
	const component = renderer.create(
		<Resources />,
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
})

