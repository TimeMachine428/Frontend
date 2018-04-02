import React from 'react';
import Help from '../src/js/pages/Help.jsx';
import renderer from 'react-test-renderer';

test('Help page information correct',() =>{
    const component = renderer.create(
        <Help />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

