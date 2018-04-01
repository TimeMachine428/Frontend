import React from 'react';
import Solutions from '../src/js/pages/Solutions.jsx';
import renderer from 'react-test-renderer';

test('Solution page renders correct information',() =>{
    const component = renderer.create(
        <Solutions/>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})