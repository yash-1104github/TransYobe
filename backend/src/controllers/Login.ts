import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../schema/user";
import { loginValidation } from "../middleware/useValidation";
import { Request, Response, NextFunction } from "express";

export default async function Login(req: Request, res: Response) {
  try {
    const { error } = loginValidation.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );

    res.json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ error: err});
  }
}
