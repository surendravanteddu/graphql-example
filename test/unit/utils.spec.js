const {generateToken, getUserFromToken, privateQuery} = require("../../src/utils");
const  jwt = require('jsonwebtoken');

const user = {
    username: "testuser@side.com"
}

const generateRandomToken = (payload) => {
    return  jwt.sign(
        user,
        "invalidsecret",
        {
            expiresIn: '24h'
        }
    );
}

describe("Testing util functions", () => {
    it("getUserFromToken takes in valid Bearer token and returns user", () => {
        const token = `Bearer ${generateToken(user)}`
        const decodedUser = getUserFromToken(token)
        expect(decodedUser).toMatchObject(user)
    })

    it("getUserFromToken returns null when Bearer prefix is missing", () => {
        const token = generateToken(user)
        const decodedUser = getUserFromToken(token)
        expect(decodedUser).toBeNull()
    })

    it("getUserFromToken returns null for invalid token ", () => {
        const token = generateRandomToken(user)
        const decodedUser = getUserFromToken(token)
        expect(decodedUser).toBeNull()
    })

    it("privateQuery calls the resolver passed to it for valid user context", () => {
        const fakeResolver = jest.fn(() => 'Resolved')
        const resolver = privateQuery(fakeResolver)
        const validContext = {
            user: "testuser"
        }
        expect(resolver(null, {}, validContext)).toEqual("Resolved")
        expect(fakeResolver).toBeCalledWith(null, {}, validContext, undefined)
    })

    it("privateQuery throws error for no user context", () => {
        const fakeResolver = () => {
            return "Resolved"
        }
        const resolver = privateQuery(fakeResolver)
        const validContext = {}
        expect(() => {
            resolver(null, {}, validContext)
        }).toThrow("Invalid authorization")
    })
})
