import React from 'react';
import {shallow} from 'enzyme';

import LoginForm from '../containers/form/LoginForm';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Provider } from 'react-redux';
import store from '../store';

configure({ adapter: new Adapter() });

test('<LoginForm />', () => {
        const wrapper = shallow( 
        <Provider store={store}>
            <LoginForm />
        </Provider>);
        expect(wrapper);
  });