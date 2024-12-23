import * as authActions from "../authentication/authRequests";
global.fetch = jest.fn();

jest.mock("../authentication/authRequests", () => ({
  loginRequest: jest.fn((data) => {
    return fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
  }),
}));

describe("Test if the login and signup functions work correctly", () => {
  test("calls fetch with the correct URL and options", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
    });
    const authData = { email: "user@gmail.com", password: "password" };
    await authActions.loginRequest(authData);

    expect(fetch).toHaveBeenCalledWith("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
      credentials: "include",
    });
  });
});
