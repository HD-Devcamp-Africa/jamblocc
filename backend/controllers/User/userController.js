import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendVerificationEmail from "../../services/emailServices.js";
// Import necessary modules and dependencies

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
      subjects: newUser.subjects,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ error: "Registration failed", details: error.message });
  }
};

// Controller for user login
export const loginUser = async (req, res) => {
  // Destructure email and password from the request body
  const { email, password } = req.body;

  console.log("Login endpoint triggered"); // Log when the endpoint is hit

  // Validate that both email and password are provided
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Find the user in the database by email
    const user = await User.findOne({ email });
    if (!user) {
      // Return error if the email is not found
      return res.status(401).json({ error: "Invalid email or password" });
    }

    console.log("User found:", user); // Log the found user for debugging

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      // Return error if passwords do not match
      return res.status(401).json({ error: "Invalid email or password" });
    }

    console.log("Password match successful"); // Log password match result

    // Generate a JWT token for the authenticated user
    const token = jwt.sign(
      {
        userId: user._id, // Include user ID in the token payload
        name: user.name, // Include user name in the token payload
        email: user.email, // Include user email in the token payload
      },
      process.env.JWT_SECRET, // Secret key from environment variables
      { expiresIn: "1h" } // Token expiration time
    );

    console.log("JWT token generated:", token); // Log the generated token

    // Respond with the token and a success message
    res.status(200).json({
      token,
      message: "Login successful",
    });
  } catch (error) {
    // Log and return an error response in case of exceptions
    console.error("Login error:", error);
    res.status(500).json({
      error: "Login failed",
      details: error.message,
    });
  }
};
