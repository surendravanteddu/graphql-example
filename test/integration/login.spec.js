const request = require('supertest')
const config = require('../../src/config')

const agent = request(`http://localhost:${config.app.port}/`);

describe("Testing graphql api login", () => {
    it("login: returns auth token for valid user credentials", () => {
        const query = `query {
                      login(user: {
                          username: "${config.app.username}",
                          password: "${config.app.password}"
                        })
                    }`
        return agent
            .post('/')
            .send({
                query
            })
            .expect(200)
            .expect((res) => {
                const data = res.body;
                expect(data).toHaveProperty('data')
                expect(data.errors).toBe(undefined)
                expect(data.data).toHaveProperty('login')
                expect(typeof data.data.login).toBe('string')
            })
    })

    it("login: returns error message for invalid user credentials", () => {
        const query = `query {
                      login(user: {
                          username: "fakeuser",
                          password: "fakepassword"
                        })
                    }`
        return agent
            .post('/')
            .send({
                query
            })
            .expect(200)
            .expect((res) => {
                const data = res.body;
                expect(data).toHaveProperty('errors')
                expect(Array.isArray(data.errors)).toBeTruthy()
                expect(data.errors[0].message).toBe('Username and password mismatch')
            })
    })
})
