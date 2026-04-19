import bcrypt from "bcrypt";
import { User } from "../mongodb/models/User.js";

export class RegisterUser {
    async execute(
        username: string,
        email: string,
        password: string,
        userModel = User
    ) {
        if (!email || !password) {
            throw new Error("Missing fields");
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            throw new Error("Email already registered");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword,
        });

        return user;
    }
}