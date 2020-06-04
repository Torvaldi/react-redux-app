import React, { Fragment } from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import GameLayout from '../GameLayout';

configure({ adapter: new Adapter() });

describe('<GameLayout />', () => {
    // snapshot
    it('should render GameLayout Componenent', () => {
        let element = <Fragment></Fragment>;
        const wrapper = shallow(<GameLayout left={element} right={element} />);
        expect(wrapper).toMatchSnapshot();
    });
    
    it('should render with props', () => {
        let element = <Fragment></Fragment>;
        const gameLayoutComponent = mount(<GameLayout left={element} right={element}/>);
        expect(gameLayoutComponent.prop('left')).toEqual(element); 
        expect(gameLayoutComponent.prop('right')).toEqual(element); 
    });
    
});