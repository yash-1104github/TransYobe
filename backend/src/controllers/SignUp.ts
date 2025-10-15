import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../schema/user";
import { signupValidation } from "../middleware/useValidation";
import { Request, Response, NextFunction } from "express";

export default async function SignUp(req: Request, res: Response) {
  try {
    const { error } = signupValidation.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
