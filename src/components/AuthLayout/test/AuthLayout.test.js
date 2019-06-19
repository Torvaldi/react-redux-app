import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AuthLayout from '../AuthLayout';

configure({ adapter: new Adapter() });

// required props
let element;
let text;
beforeEach(() => {
    element = <React.Fragment></React.Fragment>;
    text = 'hi there';
});


describe('<AuthLayout />', () => {
    // snapshot
    it('should render Auth Componenent', () => {
        const wrapper = shallow(<AuthLayout left={element} right={element} text={text} />);
        expect(wrapper).toMatchSnapshot();
    });
    
    // props
    it('should render with props left', () => {
        const AuthLayoutComponent = mount(<AuthLayout text={text} right={element} left={element} />);

        expect(AuthLayoutComponent.prop('left')).toEqual(element);
        expect(AuthLayoutComponent.prop('right')).toEqual(element);
        expect(AuthLayoutComponent.prop('text')).toEqual(text);
    });
    
});