import React from "react";

import Nav from "../src/js/components/layout/Nav.jsx";

import renderer from "react-test-renderer";



test("Login and logout functionality is present",() =>{

    const component = renderer.create(<Nav/>);
    let tree = component.toJSON();


    expect(tree).toMatchSnapshot();

})