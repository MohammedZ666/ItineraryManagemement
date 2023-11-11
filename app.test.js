const request = require('supertest')
const user = require('./test_data/user.json')
const itineraries = require('./test_data/itineraries')
const app = require('./app')
const agent = request.agent(app)

describe("User authentication and authorization", () => {
    test("register user", async () => {
        const result = await agent.post("/signup").send(user)
        expect(result.statusCode === 201 || result.body.message.email === 'that email is already registered').toBeTruthy()
        expect(result['headers']['content-type'].includes('json')).toBe(true)

    }, 10 * 1000)
    test("login user", async () => {
        const result = await agent.post("/login").send(user)
        expect(result.statusCode).toBe(200);
    })
})

describe("Itinerary CRUD", () => {
    let itenirary = ''
    test("create itenirary", async () => {
        const result = await agent.post("/api/v1/itinerary/create").send(itineraries[0]);
        itenirary = result.body;
        expect(result.statusCode === 201).toBe(true)
        expect(result['headers']['content-type'].includes('json')).toBe(true)

    })
    test("read itenirary", async () => {
        const result = await agent.get("/api/v1/itinerary/detail").send(
            { id: itenirary._id }
        );
        expect(result.statusCode === 201).toBe(true)
        expect(result['headers']['content-type'].includes('json')).toBe(true)

    })
    test("read all iteniraries", async () => {
        const result = await agent.get("/api/v1/itinerary/list").send();
        expect(result.statusCode === 201).toBe(true)
        expect(result['headers']['content-type'].includes('json')).toBe(true)

    })
    test("update itenirary", async () => {
        itenirary.name = 'Travel to Bandarban'
        const result = await agent.put("/api/v1/itinerary/update").send(itenirary);
        expect(result.statusCode === 201).toBe(true)
        expect(result['headers']['content-type'].includes('json')).toBe(true)

    })
    test("delete itenirary", async () => {
        const result = await agent.delete("/api/v1/itinerary/delete").send({ id: itenirary._id });
        expect(result.statusCode === 201).toBe(true)
        expect(result['headers']['content-type'].includes('json')).toBe(true)

    })
})

describe("Rate limit test", () => {
    test("read all iteniraries exceeding rate limit", async () => {
        let result = {}
        for (let index = 0; index <= 3; index++) {
            result = await agent.get("/api/v1/itinerary/list").send();
        }
        expect(result.statusCode === 500 && result.body.message === 'Request limit exceeded. You can only request 10 times per minute.').toBe(true)
        expect(result['headers']['content-type'].includes('json')).toBe(true)

    })
})