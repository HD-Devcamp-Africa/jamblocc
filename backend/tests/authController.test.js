import request from "supertest";
import app from "../server.js"; // Import your Express app
import User from "../models/User.js";

describe("Auth Controller Tests", () => {
  beforeAll(async () => {
    // Mock database connection if necessary
  });

  afterAll(async () => {
    // Clean up the database or close connections
    await User.deleteMany(); // Remove test users
  });

  test("Should register a new user", async () => {
    const response = await request(app)
      .post("/api/register") // Adjust to your endpoint
      .send({
        username: "TestUser",
        email: "testuser@example.com",
        password: "TestPassword123",
        subjects: ["Math", "Science"],
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User registered successfully");
  });

  test("Should log in the registered user", async () => {
    // Ensure user is already registered
    const user = await User.findOne({ email: "testuser@example.com" });
    expect(user).not.toBeNull();

    const response = await request(app)
      .post("http://localhost:5000/api/user/login") // Adjust to your endpoint
      .send({
        email: "testuser@example.com",
        password: "TestPassword123",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.message).toBe("Login successful");
  });

  test("Should fail login with incorrect password", async () => {
    const response = await request(app)
      .post("http://localhost:5000/api/user/login")
      .send({
        email: "testuser@example.com",
        password: "WrongPassword123",
      });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Invalid password");
  });
});
