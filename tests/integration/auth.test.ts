import request from "supertest";
import app from "../../src/app.js";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;

jest.setTimeout(30000);

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
}, 30000);

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
}, 30000);


describe("Auth API", () => {
    it("should register a user", async () => {
        const res = await request(app).post("/api/auth/register").send({
            username: "testuser",
            email: "test@test.com",
            password: "123456",
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("_id");
    });

    it("should login a user", async () => {
        const res = await request(app).post("/api/auth/login").send({
            email: "test@test.com",
            password: "123456",
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
    });
});