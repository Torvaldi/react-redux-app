import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';
import Pagination from '../Pagination';

configure({ adapter: new Adapter() });

describe('<Pagination />', () => {
    
    // snapshot & props
    it('should render Pagination Componenent', () => {
        let left = 1;
        let right = 3;
        let max = 3;
        let current =  2;
        const wrapper = shallow(<Pagination left={left} right={right} max={max} current={current} />);
        expect(wrapper).toMatchSnapshot();
    });
    
    
});