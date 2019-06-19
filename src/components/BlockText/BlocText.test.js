import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import BlockText from './BlockText';

configure({ adapter: new Adapter() });

describe('<BlockText />', () => {
    // snapshot
    it('should render Auth Componenent', () => {
        const wrapper = shallow(<BlockText />);
        expect(wrapper).toMatchSnapshot();
    });
    
    it('should render with props text', () => {
        let text = "I like cat";
        const BlockTextComponent = mount(<BlockText text={text} />);
        expect(BlockTextComponent.prop('text')).toEqual(text); 
    });
    
});