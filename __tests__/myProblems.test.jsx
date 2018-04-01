import React from 'react';
import MyProblems from '../src/js/pages/MyProblems.jsx';
import renderer from 'react-test-renderer';

test('MyProblems page information correct',() =>{
    const component = renderer.create(
        <MyProblems />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

