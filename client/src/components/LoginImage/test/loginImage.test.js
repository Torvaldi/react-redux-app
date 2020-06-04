import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import image from '../../../asset/login.jpg';
import LoginImage from '../LoginImage';

configure({ adapter: new Adapter() });

describe('<LoginImage />', () => {
    // snapshot
    it('should render LoginImage Componenent', () => {
        const wrapper = shallow(<LoginImage image={image} />);
        expect(wrapper).toMatchSnapshot();
    });
    
    it('should render with props text', () => {
        const LoginImageComponent = mount(<LoginImage image={image} />);
        expect(LoginImageComponent.prop('image')).toEqual(image); 
    });
    
});