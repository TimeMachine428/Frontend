import React from 'react';
import Home from '../src/js/pages/Home.jsx';
import renderer from 'react-test-renderer';

test('Home page information correct',() =>{
    const component = renderer.create(
        <Home />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

