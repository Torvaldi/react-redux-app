import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Alerte from '../Alert';

configure({ adapter: new Adapter() });

describe('<Alerte />', () => {
    // snapshot
    it('should render Alerte Componenent', () => {
        const message = "hi there";
        const wrapper = shallow(<Alerte message={message} />);
        expect(wrapper).toMatchSnapshot();
    });
    
    // props
    it('should render with props message', () => {
        const message = "yo";
        const AuthLayoutComponent = mount(<Alerte message={message} />);

        expect(AuthLayoutComponent.prop('message')).toEqual(message);
    });
    
});