import React from 'react';
import { Provider } from 'react-redux';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import {BrowserRouter} from 'react-router-dom';

import LoginForm from '../LoginForm';

configure({ adapter: new Adapter() });

describe('<LoginForm />', () => {

    const initialeState = {username: 'max'};
    const mockStore = configureStore();
    let store, wrapper;

    beforeEach(()=> {
        store = mockStore(initialeState);
        wrapper = mount(
        <Provider store={store}>
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        </Provider>
        );
    });

    it('should make snapshot of LoginForm container', () => {
        expect(wrapper.find(LoginForm).length).toEqual(1)
    });
    
    /*
    TODO Make this work
    it('should find props username', () => {
        expect(wrapper.find(LoginForm).prop('username')).toEqual('max');
    });
    */

});