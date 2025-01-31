import User from "../../models/User.js"; // Assuming you have a User model
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Get User Profile (Dashboard Data)
// Controller to get the user data
export const getUserData = async (req, res) => {
  try {
    // Extract the token from the request headers (assumes the token is passed in the Authorization header)
    const token = req.header("Authorization").replace("Bearer ", "");

    // Decode the token to get the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user data from the database using the user ID from the token
    const user = await User.findById(decoded.userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user data (excluding password and token)
    res.status(200).json({
      username: user.username,
      email: user.email,
      subjects: user.subjects,
      verified: user.verified,
      image: user.image,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Server error, please try again later" });
  }
};
// Update User Account (Profile)
// export const updateUserProfile = async (req, res) => {
//   const { username, email, password, subjects, image } = req.body;

//   // Input validation
//   if (!username || !email || !subjects) {
//     return res
//       .status(400)
//       .json({ error: "Username, email, and subjects are required" });
//   }

//   try {
//     // Find the user by ID (from the token)
//     const user = await User.findById(req.user.userId);

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Check if email is already taken by another user
//     const existingUser = await User.findOne({ email });
//     if (existingUser && existingUser._id.toString() !== user._id.toString()) {
//       return res.status(400).json({ error: "Email is already in use" });
//     }

//     // Update the user fields
//     user.username = username;
//     user.email = email;
//     user.subjects = subjects;
//     user.image = image; // Update image URL or file path

//     // If password is provided, hash it and update
//     if (password) {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       user.password = hashedPassword;
//     }

//     // Save the updated user
//     await user.save();

//     res.status(200).json({ message: "Profile updated successfully" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Failed to update user profile", details: error.message });
//   }
// };
export const updateUserProfile = async (req, res) => {
  const { username } = req.body;
  const profileImage = req.file ? req.file.path : null; // Store uploaded image path

  try {
    // Get user ID from token
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update only username and image
    if (username) user.username = username;
    if (profileImage) user.image = profileImage;

    await user.save();
    res.status(200).json({
      message: "Profile updated successfully",
      username: user.username,
      image: user.image,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update profile",
      details: error.message,
    });
  }
};
