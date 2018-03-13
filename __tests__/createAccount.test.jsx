import React from 'react';
import CreateAccount from '../src/js/pages/CreateAccount.jsx';
import renderer from 'react-test-renderer';

test('CreateAccount page information correct',() =>{
	const component = renderer.create(
		<CreateAccount />,
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
})

