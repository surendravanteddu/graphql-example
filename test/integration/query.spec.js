const request = require('supertest')
const config = require('../../src/config')
const {generateToken} = require("../../src/utils");

const agent = request(`http://localhost:${config.app.port}`);
let token = ""
const validQuery = `query {
                        properties(city: "Houston") {
                            address {
                                city
                                state
                            }
                            property {
                                bedrooms
                                bathrooms
                            }
                        }
                    }`

const isValidPropertyListing = (res) => {
    let data = res.body;
    expect(data).toHaveProperty("data")
    data = data.data
    expect(data).toHaveProperty("properties")
    data = data.properties
    expect(Array.isArray(data)).toBeTruthy()
    const listing = data[0]
    expect(listing).toHaveProperty('address')
    expect(listing).toHaveProperty('property')
    expect(listing.address).toHaveProperty('city')
    expect(listing.address).toHaveProperty('state')
    expect(listing.property).toHaveProperty('bedrooms')
    expect(listing.property).toHaveProperty('bathrooms')
    expect(Object.keys(listing.property).length).toBe(2)
    expect(Object.keys(listing.address).length).toBe(2)
}

describe("Testing graphql api to get properties", () => {
    beforeAll(() => {
        token = generateToken({
            username: config.app.username
        })
    })
    it("getProperties: returns property listing in a city with only the requested fields", () => {
        return agent
            .post('/')
            .set({Authorization: `Bearer ${token}`})
            .send({
                query: validQuery
            })
            .expect(200)
            .expect(isValidPropertyListing)
    })

    it("getProperties: also returns property listing when no city is specified", () => {
        const query = `query {
                        properties {
                            address {
                                city
                                state
                            }
                            property {
                                bedrooms
                                bathrooms
                            }
                        }
                    }`
        return agent
            .post('/')
            .set({Authorization: `Bearer ${token}`})
            .send({
                query
            })
            .expect(200)
            .expect(isValidPropertyListing)
    })

    it("getProperties: try to fetch properties without token returns error", () => {
        return agent
            .post('/')
            .send({
                query: validQuery
            })
            .expect(200)
            .expect(200)
            .expect((res) => {
                const data = res.body;
                expect(data).toHaveProperty('errors')
                expect(Array.isArray(data.errors)).toBeTruthy()
                expect(data.errors[0].message).toBe('Invalid authorization')
            })
    })

})
