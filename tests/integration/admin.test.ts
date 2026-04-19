import mongoose from "mongoose";
import request from "supertest";
import app from "../../src/app.js";
import dotenv from "dotenv";
dotenv.config();

jest.setTimeout(20000);

process.env.NODE_ENV = "test";


let adminToken = "";
let userToken = "";
let postId = "";

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST!);

    await mongoose.connection.db.dropDatabase();

    // 👤 Create normal user
    await request(app).post("/api/auth/register").send({
        username: "user1",
        email: "user1@test.com",
        password: "123456",
    });

    const userLogin = await request(app).post("/api/auth/login").send({
        email: "user1@test.com",
        password: "123456",
    });

    userToken = userLogin.body.token;

    // 👑 Create admin user
    await request(app).post("/api/auth/register").send({
        username: "admin1",
        email: "admin@test.com",
        password: "123456",
    });

    // 🔥 Make admin manually in DB
    const db = mongoose.connection.db;
    await db.collection("users").updateOne(
        { email: "admin@test.com" },
        { $set: { role: "admin" } }
    );

    const adminLogin = await request(app).post("/api/auth/login").send({
        email: "admin@test.com",
        password: "123456",
    });

    adminToken = adminLogin.body.token;

    // 📝 Create post (by normal user)
    const postRes = await request(app)
        .post("/api/posts")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
            title: "Test Post",
            body: "Hello",
        });

    postId = postRes.body._id;
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Admin API", () => {
    it("should allow admin to delete post", async () => {
        const res = await request(app)
            .delete(`/api/admin/posts/${postId}`)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);
    });

    it("should NOT allow normal user to delete post", async () => {
        const res = await request(app)
            .delete(`/api/admin/posts/${postId}`)
            .set("Authorization", `Bearer ${userToken}`);

        expect(res.statusCode).toBe(403);
    });


});