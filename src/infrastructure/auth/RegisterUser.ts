import bcrypt from "bcrypt";
import { User } from "../database/models/User.js";

export class RegisterUser {
    async execute(username: string, email: string, password: string) {
        console.log("RegisterUser.execute", {
            username,
            email,
            userModel: {
                modelName: User?.modelName,
                findOne: typeof User?.findOne,
                create: typeof User?.create,
            },
        });

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new Error("Email already registered");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        return user;
    }
}