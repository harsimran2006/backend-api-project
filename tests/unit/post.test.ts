import { Post } from "../../src/infrastructure/mongodb/models/Post.js";

describe("Post Model Unit Tests", () => {

    it("should require title", async () => {
        const post = new Post({ body: "content", userId: "123" });

        let err;
        try {
            await post.validate();
        } catch (e) {
            err = e;
        }

        expect(err).toBeDefined();
    });

    it("should require body", async () => {
        const post = new Post({ title: "title", userId: "123" });

        let err;
        try {
            await post.validate();
        } catch (e) {
            err = e;
        }

        expect(err).toBeDefined();
    });

    it("should create valid post object", async () => {
        const post = new Post({
            title: "Test",
            body: "Content",
            userId: "123",
        });

        expect(post.title).toBe("Test");
    });

    it("should create post", async () => {
        jest.spyOn(Post, "create").mockResolvedValue({ _id: "1" } as any);

        const result = await Post.create({
            title: "test",
            body: "body",
            userId: "user1",
        });

        expect(result).toHaveProperty("_id");
    });

    it("should fail if DB fails", async () => {
        jest.spyOn(Post, "create").mockRejectedValue(new Error("DB error"));

        await expect(
            Post.create({
                title: "test",
                body: "body",
                userId: "user1",
            })
        ).rejects.toThrow("DB error");
    });


});