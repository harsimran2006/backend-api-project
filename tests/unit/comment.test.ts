import { Comment } from "../../src/infrastructure/database/models/Comment.js";

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

});