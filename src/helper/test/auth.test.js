import * as auth from '../auth';

describe('auth helper', () => {

    it('should valide the token, tokenVerify()', () => {
        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImtldmluIiwiaWF0IjoxNTE2MjM5MDIyfQ.ZfFgdAL15M48lPkiCfDmXfAPrAeb5OSZM-P0g06XQmQ";
        let response = auth.tokenVerify(token);
        response.then(response => {
            expect(response).toEqual(true);
        });
    });

    it('should not valide the token, tokenVerify()', () => {
        let token = "someString";
        let response = auth.tokenVerify(token);
        response
        .then(response => {
            expect(response).toEqual(false);
        })
        .catch(e => console.log('handle promise'));
    });

    it('should return cookie value, splitCookie()', () =>  {
        let value = "; username=falia";
        let name = "username"
        let expectedResult = "falia";
        expect(auth.splitCookie(value, name)).toEqual(expectedResult);
    });

    it("should return an empty string because the cookie doesn't exist, splitCookie()", () => {
        let value = "; username=falia";
        let name = "password"
        let expectedResult = "";
        expect(auth.splitCookie(value, name)).toEqual(expectedResult);
    });

    it('should match expected token value', () => {
        // acces debuger https://jwt.io/#debugger
        let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1LCJ1c2VybmFtZSI6ImtldmluNCIsInRpbWUiOiIyMDE5LTA2LTI0IDE5OjIyOjUwIn0.YVSsyfOgx3_W2mXtl-4tAk-zkA0iFHEHgArJHNsVqk8";
        let decodedToken = auth.tokenDecode(token);
        expect(decodedToken.payload.user_id).toEqual(5);
        expect(decodedToken.payload.username).toEqual("kevin4");
    });

});