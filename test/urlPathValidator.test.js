let expect = require('chai').expect;
let validator = require('../src/tools/urlPathValidator');

describe("URL path validator", () => { 
    it("should detect a full match of path", () => {
        path = '/sissy/emma';
        allowedPaths = ['/sissy/emilia', '/sissy/emma'];

        let result = validator.with(allowedPaths).accepts(path);

        expect(result).to.be.true;
    });

    it("should detect element not matching", () => {
        path = '/sissy/karina';
        allowedPaths = ['/sissy/emilia', '/sissy/emma'];

        let result = validator.with(allowedPaths).accepts(path);

        expect(result).to.be.false;
    });

    it('should detect partial matches', () => {
        path = '/mistress/frida/wild';
        allowedPaths = ['/sissy/emilia', '/sissy/emma', '/mistress/.*'];

        let result = validator.with(allowedPaths).accepts(path);

        expect(result).to.be.true;
    });
});