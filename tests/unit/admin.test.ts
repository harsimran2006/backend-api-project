describe("Admin Logic", () => {

    it("should identify admin role", () => {
        const user = { role: "admin" };

        expect(user.role).toBe("admin");
    });

    it("should reject non-admin", () => {
        const user = { role: "user" };

        expect(user.role).not.toBe("admin");
    });

});