import { RegisterUser } from "../../src/infrastructure/auth/RegisterUser.js";
import bcrypt from "bcrypt";

jest.mock("bcrypt");

describe("RegisterUser Unit Tests", () => {

    const mockUserModel: any = {
        findOne: jest.fn(),
        create: jest.fn(),
    };

    const registerUser = new RegisterUser();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should throw error if email is missing", async () => {
        await expect(
            registerUser.execute("test", "", "123456", mockUserModel)
        ).rejects.toThrow();
    });

    it("should throw error if password is missing", async () => {
        await expect(
            registerUser.execute("test", "test@test.com", "", mockUserModel)
        ).rejects.toThrow();
    });

    it("should throw error if user already exists", async () => {
        mockUserModel.findOne.mockResolvedValue({ email: "test@test.com" });

        await expect(
            registerUser.execute("test", "test@test.com", "123456", mockUserModel)
        ).rejects.toThrow("Email already registered");
    });

    it("should create user if valid", async () => {
        mockUserModel.findOne.mockResolvedValue(null);
        (bcrypt.hash as jest.Mock).mockResolvedValue("hashed");

        mockUserModel.create.mockResolvedValue({ _id: "123" });

        const result = await registerUser.execute(
            "test",
            "test@test.com",
            "123456",
            mockUserModel
        );

        expect(result).toHaveProperty("_id");
    });

    it("should call create function", async () => {
        mockUserModel.findOne.mockResolvedValue(null);
        (bcrypt.hash as jest.Mock).mockResolvedValue("hashed");
        mockUserModel.create.mockResolvedValue({});

        await registerUser.execute(
            "test",
            "test@test.com",
            "123456",
            mockUserModel
        );

        expect(mockUserModel.create).toHaveBeenCalled();
    });

    it("should call findOne before create", async () => {
        mockUserModel.findOne.mockResolvedValue(null);
        (bcrypt.hash as jest.Mock).mockResolvedValue("hashed");
        mockUserModel.create.mockResolvedValue({});

        await registerUser.execute(
            "test",
            "test@test.com",
            "123456",
            mockUserModel
        );

        expect(mockUserModel.findOne).toHaveBeenCalled();
    });

});