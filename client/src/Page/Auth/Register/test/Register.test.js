import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Register from '../Register';

configure({ adapter: new Adapter() });

describe('<Register />', () => {
    it('should render Login Componenent', () => {
        const wrapper = shallow(<Register />);
        expect(wrapper).toMatchSnapshot();
    });
});