import bcrypt from "bcrypt";
import { User } from "../../infrastructure/mongodb/models/User.js";

export class RegisterUser {
    async execute(username: string, email: string, password: string) {
        // Check if user exists
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