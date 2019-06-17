import React from 'react';
import { shallow } from 'enzyme';

import LoginForm from '../LoginPage/LoginForm';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Provider } from 'react-redux';
import store from '../store';

configure({ adapter: new Adapter() });

describe('<LoginForm />', () => {
    it('should render ', () => {
        const wrapper = shallow( 
            <Provider store={store}>
                <LoginForm />
            </Provider>);
        expect(wrapper);
    });
});