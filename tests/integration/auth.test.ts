import request from "supertest";
import app from "../../src/app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

process.env.NODE_ENV = "test";

describe("Auth API", () => {

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI_TEST!);
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase(); // clean DB
        await mongoose.connection.close();
    });

    it("should register a new user", async () => {
        const res = await request(app).post("/api/auth/register").send({
            username: "testuser",
            email: "test@test.com",
            password: "123456",
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("_id");
    });

    it("should NOT register duplicate user", async () => {
        const res = await request(app).post("/api/auth/register").send({
            username: "testuser",
            email: "test@test.com",
            password: "123456",
        });

        expect(res.statusCode).toBe(400);
    });

    it("should login user", async () => {
        const res = await request(app).post("/api/auth/login").send({
            email: "test@test.com",
            password: "123456",
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
    });

    it("should fail login with wrong password", async () => {
        const res = await request(app).post("/api/auth/login").send({
            email: "test@test.com",
            password: "wrongpassword",
        });

        expect(res.statusCode).toBe(400);
    });

});