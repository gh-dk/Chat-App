import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.config.js";
import "dotenv/config";

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ ...rest, password: hashedPassword });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

// User login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashpass = await bcrypt.hash(password, 10);
    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .send({ token, user: { ...user.toObject(), password: undefined } });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Send reset password email
export const sendResetPasswordEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const resetLink = `${process.env.CLIENT_URL}/users/reset-password?token=${token}`;
    console.log(resetLink);
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      text: `You requested a password reset. Click the link to reset your password: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send({ message: "Reset password email sent" });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { token } = req.query;
    console.log(token);
    console.log(token, newPassword);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).send(error);
  }
};
