import { Comment } from "../../src/infrastructure/mongodb/models/Comment.js";

describe("Comment Model Unit Tests", () => {

    it("should require postId", async () => {
        const comment = new Comment({
            userId: "123",
            body: "test"
        });

        let err;
        try {
            await comment.validate();
        } catch (e) {
            err = e;
        }

        expect(err).toBeDefined();
    });

    it("should require body", async () => {
        const comment = new Comment({
            postId: "123",
            userId: "123"
        });

        let err;
        try {
            await comment.validate();
        } catch (e) {
            err = e;
        }

        expect(err).toBeDefined();
    });

    it("should create comment", async () => {
        jest.spyOn(Comment, "create").mockResolvedValue({ _id: "1" } as any);

        const result = await Comment.create({
            postId: "post1",
            userId: "user1",
            body: "hello",
        });

        expect(result).toHaveProperty("_id");
    });

    it("should fail if error occurs", async () => {
        jest.spyOn(Comment, "create").mockRejectedValue(new Error("error"));

        await expect(
            Comment.create({
                postId: "post1",
                userId: "user1",
                body: "hello",
            })
        ).rejects.toThrow();
    });

});