import React from 'react';
import MyProblems from '../src/js/pages/MyProblems.jsx';
import axios from "axios";
import Nav from '../src/js/components/layout/Nav.jsx';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
import renderer from 'react-test-renderer';

test('MyProblems page information correct',() =>{
    const component = renderer.create(
        <MyProblems />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

