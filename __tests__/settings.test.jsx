import React from 'react';
import Settings from '../src/js/pages/Settings.jsx';
import renderer from 'react-test-renderer';

test('Settings page information correct',() =>{
    const component = renderer.create(
        <Settings />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

