import * as game from '../game';

describe('game helper', () => {

    it('should find right game status, getGameStatus()', () => {
        expect(game.getGameStatus(1)).toEqual("Waiting for player");
        expect(game.getGameStatus(2)).toEqual("Running");
        expect(game.getGameStatus(3)).toEqual("Finish");
    });

    it('should paginate 2 pages, pagination()', () => {
        let data = [
            { title: 1 }, {title: 2 }, {title: 3 }, {title: 4 }, {title: 5 }, {title: 6 }, {title: 7 }
        ];

        let expectedResult =  [
            [
                {title: 1}, {title: 2}, {title: 3}, {title: 4}, {title: 5}
            ], 
            [
                {title: 6}, {title: 7}
            ]
        ];
        let result = game.pagination(data);

        expect(result).toEqual(expectedResult);
        expect(result.length).toEqual(2);
    });

});