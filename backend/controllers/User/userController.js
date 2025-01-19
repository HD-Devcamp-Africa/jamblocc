import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendVerificationEmail from "../../services/emailServices.js";

export const registerUser = async (req, res) => {
  const { name, email, password, subjects } = req.body;
  const token = crypto.randomUUID().toString("hex");

  // Input validation
  if (!name || !email || !password || !subjects) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (subjects.length > 4) {
    return res
      .status(400)
      .json({ error: "You can select up to 4 subjects only" });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Save user with verified: false initially
    const newUser = new User({
      name,
      email,
      password,
      subjects,
      token,
      verified: false, // Set verified as false initially
    });

    // Save the user to the database
    await newUser.save();

    const verificationToken = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    // Return success message
    res.status(201).send({
      message: "Signup successful! Check your email to verify.",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ error: "Registration failed", details: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }

    console.log("User found:", user);

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed", details: error.message });
  }
};
