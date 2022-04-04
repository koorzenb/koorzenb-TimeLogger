
const entries = require("../data/entries.json");
const sinon = require("sinon");

import 'regenerator-runtime/runtime';

describe("Tests data", () => {

    beforeAll(() => {
        sinon.stub = () => { };
    });

    test('data-control component ', () => {
        console.log(this);
    });
});
