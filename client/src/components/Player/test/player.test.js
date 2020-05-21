import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Player from '../Player';

configure({ adapter: new Adapter() });

describe('<Player />', () => {
    // snapshot
    it('should render Message Componenent', () => {
        let id = '1';
        let username = "bob"
        let message = 'Bonjour';
        let scores = [{id: 1, score: 7}];
        let authId = 2;

        const wrapper = shallow(<Player id={id} username={username} scores={scores} authId={authId} message={message}/>);
        expect(wrapper).toMatchSnapshot();
    });
    
    it('should render with props', () => {
        let id = '1';
        let username = "bob"
        let message = 'Bonjour';
        let scores = [{id: 1, score: 7}];
        let authId = 2;

        const playerComponent = mount(<Player id={id} username={username} scores={scores} authId={authId} message={message}/>);        
        
        expect(playerComponent.prop('id')).toEqual(id);
        expect(playerComponent.prop('username')).toEqual(username); 
        expect(playerComponent.prop('message')).toEqual(message); 
        expect(playerComponent.prop('scores')).toEqual(scores); 
        expect(playerComponent.prop('authId')).toEqual(authId); 
    });
    
});