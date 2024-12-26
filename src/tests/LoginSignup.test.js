import { strict } from "assert";
import * as authActions from "../authentication/authRequests";
import { loginRequest } from "../authentication/authRequests";
import { signupRequest } from "../authentication/authRequests";
import "@testing-library/jest-dom/extend-expect";

global.fetch = jest.fn();

jest.mock("../authentication/authRequests", () => ({
  loginRequest: jest.fn(),
  signupRequest: jest.fn(),
}));

describe("Test if the login and signup functions work correctly", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Successfully logs in", async () => {
    const authData = { email: "eronita@gmail.com", password: "123" };

    fetch.mockResolvedValueOnce({
      status: 200,
      ok: true,
      json: async () => ({ message: "Login successful" }),
    });

    authActions.loginRequest.mockImplementation(async (data) => {
      return fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
    });

    const messageFromRequest = await loginRequest(authData);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
      credentials: "include",
    });
  });

  test("Throws an error for invalid credentials", async () => {
    fetch.mockResolvedValueOnce({
      status: 401,
      ok: false,
      json: async () => ({ error: "Invalid credentials" }),
    });

    authActions.loginRequest.mockImplementation(async (data) => {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      return response.json();
    });

    const authData = { email: "Invalid", password: "invalid" };

    await expect(loginRequest(authData)).rejects.toThrow("Invalid credentials");
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
      credentials: "include",
    });
  });

  test("Successfully signs up", async () => {
    const signUpData = {
      email: "newemail@gmail.com",
      password: "password",
      confirmedPassword: "password",
    };

    fetch.mockResolvedValueOnce({
      status: 200,
      ok: true,
      json: async () => ({ message: "Signup succesful" }),
    });

    authActions.signupRequest.mockImplementation(async (data) => {
      return fetch("http://localhost:8080/api/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    });

    const message = await signupRequest(signUpData);
    console.log("message from simulated signup API call", message);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:8080/api/signup", {
      method: "POST",
      body: JSON.stringify(signUpData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  test("Throws error if the user exists", async () => {
    const signUpData = {
      email: "newemail@gmail.com",
      password: "password",
      confirmedPassword: "confirmedPassword",
    };

    fetch.mockResolvedValueOnce({
      status: 409,
      ok: false,
      json: async () => ({ message: "User already exists" }),
    });
    authActions.signupRequest.mockImplementation(async (data) => {
      const response = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 409) {
        throw new Error("User already exists");
      }
      return response.json();
    });

    await expect(authActions.signupRequest(signUpData)).rejects.toThrow(
      "User already exists"
    );
  });
});
