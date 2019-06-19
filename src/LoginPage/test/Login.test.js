import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Login from '../Login';

configure({ adapter: new Adapter() });

describe('<Login />', () => {
    it('should render Login Componenent', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper).toMatchSnapshot();
    });
});