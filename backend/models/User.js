import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters"],
    },
    subjects: {
      type: [String],
      required: true,
      validate: {
        validator: (subjects) => subjects.length <= 4,
        message: "You can select up to 4 subjects only",
      },
      enum: [
        "english",
        "mathematics",
        "commerce",
        "accounting",
        "biology",
        "physics",
        "chemistry",
        "englishlit",
        "government",
        "crk",
        "geography",
        "economics",
        "irk",
        "civiledu",
        "insurance",
        "currentaffairs",
        "history",
      ],
    },
    // Add `token` and `verified` fields explicitly
    token: { type: String, default: null },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true, strict: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
