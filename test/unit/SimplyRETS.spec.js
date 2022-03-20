const {getProperties} =  require("../../src/integrations/SimplyRETS");

describe("SimpleRETS", () => {
    it("getProperties with valid city name returns results", async () => {
        const result = await getProperties("Houston")
        expect(Array.isArray(result)).toBeTruthy()
        expect(result.length > 0).toBeTruthy()
    })

    it("getProperties with invalid city name returns empty array", async () => {
        const result = await getProperties("HoustonFakeCityName")
        expect(Array.isArray(result)).toBeTruthy()
        expect(result.length).toBe(0)
    })
})
