const {authenticateUser} = require("../../src/resolvers/User");
const {getProperties} = require("../../src/resolvers/Property");
const simplerRETS = require("../../src/integrations/SimplyRETS")
const {app} = require('../../src/config')
describe("Resolver test", () => {
    it("authenticateUser returns valid token called with correct user credentials", () => {
        const user = {
            username: app.username,
            password: app.password
        }
        const result = authenticateUser(null, {user});
        expect(typeof result).toBe('string')
    })

    it("authenticateUser throws error for incorrect user credentials", () => {
        const user = {
            username: "fake user",
            password: "fake password"
        }
        expect(() => {
            authenticateUser(null, {user})
        }).toThrow("Username and password mismatch")
    })

    it("Calling getProperty resolver with city as input calls SimplyRETS function with right parameters", async () => {
        jest.spyOn(simplerRETS, 'getProperties').mockReturnValue("Mock Data");
        const result = await getProperties(
            null,
          {city: "Houston"},
        {user:{username: "fakeuser"}}
        )
        expect(result).toBe("Mock Data")
        expect(simplerRETS.getProperties).toBeCalledWith("Houston")
        jest.resetAllMocks()
    })
})
