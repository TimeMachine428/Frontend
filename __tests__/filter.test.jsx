import React from 'react';
import Problems from '../src/js/pages/Problems.jsx';
import renderer from 'react-test-renderer';

import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;

test('problems page displays correct number of problems initially', () => {
    const wrapper = shallow(<Problems />);
    
    expect(wrapper.find('div.row')).to.have.length(4);
});

/*
 * Tested manually:
 *  1) Searching for a problem
 *  2) Filtering problems from low to high
 *  3) Filtering new problems
 *  4) Filtering old problems
 *  5) Empty search
 *  
 * Outcomes:
 *  1) Correct problem appears
 *  2) Problems properly ordered
 *  3) New problems displayed
 *  4) Old problems displayed
 *  5) Nothing to display message appears
*/