const { database, server } = require("./index")
const request = require("supertest")

describe("POST /api/login", () => {
    it("should return 200", async () => {
        await request(server)
            .post("/api/login")
            .send({ user: "Root", password: "Root" })
            .expect(200);
    })
})
describe("POST /api/create_user", () => {
    it("should return 200", async () => {
        const response = await request(server)
            .post("/api/login")
            .send({ user: "Root", password: "Root" })
        const token = response.body.token

        await request(server)
            .post("/api/create_user")
            .set('authorization', `Bearer ${token}`)
            .send({ user: "Sup", password: "Dude", role: "Edit" })
            .expect(201);
    })
})

describe("GET /api/verify_token", () => {
    it("should return 200", async () => {
        const response = await request(server)
            .post("/api/login")
            .send({ user: "Root", password: "Root" })
        const token = response.body.token
        await request(server)
            .get("/api/verify_token")
            .set('authorization', `Bearer ${token}`)
            .expect(200);
    })
})

describe("PUT /api/edit_user", () => {
    it("should return 200", async () => {
        const response = await request(server)
            .post("/api/login")
            .send({ user: "Root", password: "Root" })
        const token = response.body.token

        await request(server)
            .put("/api/edit_user/2")
            .set('authorization', `Bearer ${token}`)
            .send({ user: "Second User " + Math.random().toFixed(2), password: "Dude", role: "View" })
            .expect(201);
    })
})
describe("DELETE /api/delete_user", () => {
    it("should return 200", async () => {
        const response = await request(server)
            .post("/api/login")
            .send({ user: "Root", password: "Root" })
        const token = response.body.token

        const a = await request(server)
            .post("/api/create_user")
            .set('authorization', `Bearer ${token}`)
            .send({ user: "Sup", password: "Dude", role: "Edit" })
            .expect(201);


        await request(server)
            .delete(`/api/delete_user/${a.body.id}`)
            .set('authorization', `Bearer ${token}`)
            .expect(201);
    })
})

afterAll(() => {
    server.close();
    database.destroy();
});