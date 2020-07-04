import * as game from 'helper/game';

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

    it('should print right paginate input, getPaginationInputData()', () => {
        let data = [
            { title: 1 }, {title: 2 }, {title: 3 }, {title: 4 }, {title: 5 }, {title: 6 }, {title: 7 }
        ];
        
        let dataInput = game.getPaginationInputData(data);
        // current page is 0, as its the default page when there are not page parameter
        let expectedResult = {
             current: 0,
             max: 1,
             left: 0,
             right: 1,
            };
        expect(dataInput).toEqual(expectedResult);
        
    });

    it('should return the max page, getMaxPage()', () => {
        let data = [
            { title: 1 }, {title: 2 }, {title: 3 }, {title: 4 }, {title: 5 }, {title: 6 }, {title: 7 }
        ];

        let maxPage = game.getMaxPage(data);
        // data can be slice one time, so there are only one page (without the default page with the first 5 data)
        expect(maxPage).toEqual(1);
    });

});