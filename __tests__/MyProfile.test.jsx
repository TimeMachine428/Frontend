import React from 'react';
import TermsConditions from '../src/js/pages/TermsConditions.jsx';
import renderer from 'react-test-renderer';

test('TermsConditions page information correct',() =>{
	const component = renderer.create(
		<TermsConditions />,
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
})