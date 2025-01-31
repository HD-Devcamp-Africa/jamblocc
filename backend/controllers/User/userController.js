import bcrypt from "bcrypt";
import User from "../../models/User.js";
import jwt from "jsonwebtoken";
import sendVerificationEmail from "../../services/emailServices.js";
import Joi from "joi";
import crypto from "crypto";

export const registerUser = async (req, res) => {
  const { username, email, password, subjects } = req.body;
  const token = crypto.randomUUID(); // `.toString("hex")` is not necessary here

  console.log(req.body);
  // Define validation schema
  const schema = Joi.object({
    username: Joi.string().min(2).max(50).required().messages({
      "string.base": "Username must be a string",
      "string.empty": "Username is required",
      "string.min": "Username must be at least 2 characters",
      "string.max": "Username must not exceed 50 characters",
      "any.required": "Username is required",
    }),
    email: Joi.string().email().required().messages({
      "string.base": "Email must be a string",
      "string.email": "Invalid email format",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(6).max(50).required().messages({
      "string.base": "Password must be a string",
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "string.max": "Password must not exceed 50 characters",
      "any.required": "Password is required",
    }),
    subjects: Joi.array()
      .items(Joi.string().min(2).max(30))
      .min(1)
      .max(4)
      .required()
      .messages({
        "array.base": "Subjects must be an array",
        "array.min": "At least one subject is required",
        "array.max": "You can select up to 4 subjects only",
        "any.required": "Subjects are required",
        "string.base": "Each subject must be a string",
        "string.min": "Each subject must have at least 2 characters",
        "string.max": "Each subject must not exceed 30 characters",
      }),
  });

  // Validate request data
  const { error } = schema.validate({ username, email, password, subjects });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash password before saving
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Save user with verified: false initially
    const newUser = new User({
      username,
      email,
      password, //: hashedPassword, // Store the hashed password
      subjects,
      token,
      verified: false, // Set verified as false initially
    });

    // Save the user to the database
    await newUser.save();

    // Generate verification token
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

// LOGIN USER FUNCTION

// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   console.log("Login endpoint triggered");

//   if (!email || !password) {
//     return res.status(400).json({ error: "Email and password are required" });
//   }

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ error: "Invalid email or password" });
//     }

//     // Check if the user is verified
//     if (!user.verified) {
//       return res.status(400).json({ error: "Please verify your email first" });
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ error: "Invalid email or password" });
//     }

//     const token = jwt.sign(
//       {
//         userId: user._id,
//         username: user.username,
//         email: user.email,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.status(200).json({
//       token,
//       message: "Login successful",
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({
//       error: "Login failed",
//       details: error.message,
//     });
//   }
// };

// import User from "../../models/User.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import sendVerificationEmail from "../../services/emailServices.js";
// import Joi from "joi"; // Using Joi for schema-based validation (optional)

// export const registerUser = async (req, res) => {
//   const { name, email, password, subjects } = req.body;
//   const token = crypto.randomUUID(); // `.toString("hex")` is not necessary here

//   // Define validation schema
//   const schema = Joi.object({
//     name: Joi.string().min(2).max(50).required().messages({
//       "string.base": "Name must be a string",
//       "string.empty": "Name is required",
//       "string.min": "Name must be at least 2 characters",
//       "string.max": "Name must not exceed 50 characters",
//       "any.required": "Name is required",
//     }),
//     email: Joi.string().email().required().messages({
//       "string.base": "Email must be a string",
//       "string.email": "Invalid email format",
//       "string.empty": "Email is required",
//       "any.required": "Email is required",
//     }),
//     password: Joi.string().min(6).max(50).required().messages({
//       "string.base": "Password must be a string",
//       "string.empty": "Password is required",
//       "string.min": "Password must be at least 6 characters",
//       "string.max": "Password must not exceed 50 characters",
//       "any.required": "Password is required",
//     }),
//     subjects: Joi.array()
//       .items(Joi.string().min(2).max(30))
//       .min(1)
//       .max(4)
//       .required()
//       .messages({
//         "array.base": "Subjects must be an array",
//         "array.min": "At least one subject is required",
//         "array.max": "You can select up to 4 subjects only",
//         "any.required": "Subjects are required",
//         "string.base": "Each subject must be a string",
//         "string.min": "Each subject must have at least 2 characters",
//         "string.max": "Each subject must not exceed 30 characters",
//       }),
//   });

//   // Validate request data
//   const { error } = schema.validate({ name, email, password, subjects });
//   if (error) {
//     return res.status(400).json({ error: error.details[0].message });
//   }

//   try {
//     // Check if email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: "Email already in use" });
//     }

//     // Save user with verified: false initially
//     const newUser = new User({
//       name,
//       email,
//       password,
//       subjects,
//       token,
//       verified: false, // Set verified as false initially
//     });

//     // Save the user to the database
//     await newUser.save();

//     const verificationToken = jwt.sign(
//       { userId: newUser._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     // Send verification email
//     await sendVerificationEmail(email, verificationToken);

//     // Return success message
//     res.status(201).send({
//       message: "Signup successful! Check your email to verify.",
//       subjects: newUser.subjects,
//     });
//   } catch (error) {
//     console.error("Registration error:", error);
//     res
//       .status(500)
//       .json({ error: "Registration failed", details: error.message });
//   }
// };

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
      return res.status(401).json({ error: "Invalid email" });
    }

    console.log("User found:", user); // Log the found user for debugging

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      // Return error if passwords do not match
      return res.status(401).json({ error: "Invalid  password" });
    }

    console.log("Password match successful"); // Log password match result

    // Generate a JWT token for the authenticated user
    const token = jwt.sign(
      {
        userId: user._id, // Include user ID in the token payload
        username: user.username, // Include user name in the token payload
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
