const entries = require("../data/entries.json");

import 'regenerator-runtime/runtime';

describe("Tests data", () => {

    test("data integrity", async () => {
        expect(entries[0].id).toEqual(1);
        expect(typeof entries[1].description === "string").toBe.true;
    });
});
