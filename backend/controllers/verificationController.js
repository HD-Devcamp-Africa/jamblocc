import User from "../models/User.js";

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    const user = await User.findOne({ token });
    if (!user) {
      return res.status(400).send("Invalid or expired token.");
    }

    user.verified = true;
    user.token = null; // Clear token after verification
    await user.save();

    res.status(200).send("Email verified successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error verifying email.");
  }
};

export default verifyEmail;
