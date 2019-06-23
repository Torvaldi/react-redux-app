import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Alerte from '../Alert';

configure({ adapter: new Adapter() });

describe('<Alerte />', () => {
    
    // snapshot
    it('should render Alerte Componenent', () => {
        const message = "hi there";
        const wrapper = shallow(<Alerte message={message} type={0} />);
        expect(wrapper).toMatchSnapshot();
    });
    
    // PROPS
    it('should render with props message', () => {
        const message = "yo";
        const AuthLayoutComponent = mount(<Alerte message={message} type={0}/>);
        expect(AuthLayoutComponent.prop('message')).toEqual(message);
    });

    it('should render with props message', () => {
        const message = "yo";
        const AuthLayoutComponent = mount(<Alerte message={message} type={0}/>);
        expect(AuthLayoutComponent.prop('type')).toEqual(0);
    });

    // dynamic class
    it('should find class blockError and textError when type is 0', () => {
        const message = "yo";
        const AuthLayoutComponent = mount(<Alerte message={message} type={0}/>);
        expect(AuthLayoutComponent.find('.alertBlockError').length).toEqual(1);
        expect(AuthLayoutComponent.find('.alertTextError').length).toEqual(1);
    });

    it('should find class alertBlockSuccess and textSuccess when type is 1', ()=>{
        const message = "yo";
        const AuthLayoutComponent = mount(<Alerte message={message} type={1}/>);
        expect(AuthLayoutComponent.find('.alertBlockSuccess').length).toEqual(1);
        expect(AuthLayoutComponent.find('.alertTextSuccess').length).toEqual(1);
    });
    
});