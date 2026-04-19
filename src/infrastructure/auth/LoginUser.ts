import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../mongodb/models/User.js";

export class LoginUser {
    async execute(email: string, password: string) {
        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("Invalid email or password");
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error("Invalid email or password");
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            "secretkey",
            { expiresIn: "1h" }
        );

        return {
            token,
            user
        };
    }
}