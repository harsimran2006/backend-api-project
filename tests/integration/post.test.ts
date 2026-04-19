import mongoose from "mongoose";
import request from "supertest";
import app from "../../src/app.js";

import dotenv from "dotenv";
dotenv.config();

jest.setTimeout(20000);

process.env.NODE_ENV = "test";


let token = "";

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST!);

    await request(app).post("/api/auth/register").send({
        username: "testuser2",
        email: "test2@test.com",
        password: "123456",
    });

    const res = await request(app).post("/api/auth/login").send({
        email: "test2@test.com",
        password: "123456",
    });

    token = res.body.token;
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Post API", () => {
    it("should create post", async () => {
        const res = await request(app)
            .post("/api/posts")
            .set("Authorization", `Bearer ${token}`) // ✅ IMPORTANT
            .send({
                title: "Test Post",
                body: "Hello world",
            });

        expect(res.statusCode).toBe(201);
    });

    it("should get all posts", async () => {
        const res = await request(app).get("/api/posts");

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("should fail to create post without token", async () => {
        const res = await request(app).post("/api/posts").send({
            title: "No Auth",
            body: "Should fail",
        });

        expect(res.statusCode).toBe(401);
    });

    it("should add comment to post", async () => {
        const postRes = await request(app)
            .post("/api/posts")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Post for comment",
                body: "Test",
            });

        const postId = postRes.body._id;

        const res = await request(app)
            .post("/api/comments")
            .set("Authorization", `Bearer ${token}`)
            .send({
                postId,
                body: "Nice post!",
            });

        expect(res.statusCode).toBe(201);
    });

});