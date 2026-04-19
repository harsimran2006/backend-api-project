import { Like } from "../../src/infrastructure/mongodb/models/Like.js";

describe("Like Model Unit Tests", () => {

    it("should require postId", async () => {
        const like = new Like({ userId: "123" });

        let err;
        try {
            await like.validate();
        } catch (e) {
            err = e;
        }

        expect(err).toBeDefined();
    });


});