import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

export async function protectRoutes(req, res, next) {
    const token = req.cookies.token; // Ensure this matches the cookie name you set

    if (!token) {
        return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(401).json({ message: "Unauthorized - User not found" });
        }

        req.user = user; // Attach user to request
        next(); // Proceed to the next middleware
    } catch (error) {
        console.error("Error in protecting middleware:", error);
        return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
}