import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Message from '../Message';

configure({ adapter: new Adapter() });

describe('<Message />', () => {
    // snapshot
    it('should render Message Componenent', () => {
        let authUser = {id:1}
        let user = {id: 1, username : "bob"}
        let message = 'Bonjour';

        const wrapper = shallow(<Message authUser={authUser} user={user} message={message} />);
        expect(wrapper).toMatchSnapshot();
    });
    
    it('should render with props', () => {
        let authUser = { id: 1}
        let user = {id: 1, username : "bob"}
        let message = 'Bonjour';
        const messageCompenent = mount(<Message authUser={authUser} user={user} message={message} />);
        
        expect(messageCompenent.prop('authUser')).toEqual(authUser);
        expect(messageCompenent.prop('user')).toEqual(user); 
        expect(messageCompenent.prop('message')).toEqual(message); 
    });
    
});