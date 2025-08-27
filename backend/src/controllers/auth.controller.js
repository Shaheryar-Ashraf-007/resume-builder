import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Ensure you import jwt
import { User } from "../models/user.js";

export async function Signup(req, res) {
  try {
    const { username, email, password, profileImageUrl } = req.body; // Use req.body

    if (!username || !email || !password) {
      return res.json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.json({
        message: "Password must be at least 6 characters long",
      });
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return res.json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      profileImageUrl: profileImageUrl || null, 
    });

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ message: "User created successfully", user: newUser }); // Return after sending response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function Login(req, res) {

    try{

        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({ message: "Login successful", user }); // Return after sending response

    } catch(error){
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }

}
export async function Logout(req, res) {
    res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "Logout successful" });
}

