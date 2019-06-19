import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import LoginForm from '../LoginForm';

const store = createStore(() => ({}));

configure({ adapter: new Adapter() });

// set up High Order Compoenant
let BaseFieldHOCComponent;
beforeEach(() => {
    BaseFieldHOCComponent = <Provider store={store}><LoginForm /></Provider>;
});


describe('<LoginForm />', () => {
    it('should render LoginForm component', () => {
        const wrapper = shallow(BaseFieldHOCComponent);
        expect(wrapper);
    });
});