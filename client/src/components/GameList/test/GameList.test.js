import React, { Fragment } from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import GameList from '../GameList';

configure({ adapter: new Adapter() });

describe('<GameList />', () => {

    // snapshot & props testing
    it('should render GameList Componenent', () => {
        let joinGame = () => {};
        let gameType = 'disable';
        let game = { id: 1, 
            creator: "Bob", 
            timestamp: "2019-07-22 13:52:36", 
            level: 2, 
            answer: 12, 
            score_to_win: 100, 
            total_player: 4, 
            status: 1 
        }
        const wrapper = shallow(<GameList joinGame={joinGame} gameType={gameType} game={game} />);
        expect(wrapper).toMatchSnapshot();

        const gameListComponent = mount(<GameList joinGame={joinGame} gameType={gameType} game={game} />);
        expect(gameListComponent.prop('joinGame')).toEqual(joinGame); 
        expect(gameListComponent.prop('gameType')).toEqual(gameType); 
        expect(gameListComponent.prop('game')).toEqual(game); 
    });
    
});