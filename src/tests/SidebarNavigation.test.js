import { render, screen } from "@testing-library/react";
import useLoginStatus from "../hooks/useLoginStatus";
import Sidebar from "../components/Sidebar";
import { MemoryRouter } from "react-router-dom";
import { mockStoreSimulation } from "./utilityTestingFunctions";
import { Provider } from "react-redux";

jest.mock("../hooks/useLoginStatus");
describe("Navigation options appear correctly based on user authentication", () => {
  describe("when logged in", () => {
    test("'Home, NewTransaction links and Sign Out button' show when the user is logged in", () => {
      useLoginStatus.mockReturnValue(true);
      const store = mockStoreSimulation(true);
      render(
        <MemoryRouter>
          <Provider store={store}>
            <Sidebar />
          </Provider>
        </MemoryRouter>
      );

      const NewTransactionLink = screen.getByRole("link", {
        name: /New Transaction/i,
      });
      const HomeLink = screen.getByRole("link", { name: /Home/i });
      const SignOutBtn = screen.getByRole("button", { name: /Sign out/i });
      expect(NewTransactionLink).toBeInTheDocument();
      expect(HomeLink).toBeInTheDocument();
      expect(SignOutBtn).toBeInTheDocument();
    });
    test("LoginSignup link does not show when the user is logged in", () => {
      useLoginStatus.mockReturnValue(true);
      render(
        <MemoryRouter>
          <Sidebar />
        </MemoryRouter>
      );

      const LoginSignupLink = screen.queryByRole("link", {
        name: /LoginSignup/i,
      });
      expect(LoginSignupLink).not.toBeInTheDocument();
    });
  });

  describe("When user is logged out", () => {
    test("Sign Out button and New Transaction link do not show when the user is not logged in", () => {
      useLoginStatus.mockReturnValue(false);
      render(
        <MemoryRouter>
          <Sidebar />
        </MemoryRouter>
      );

      const SignOutBtn = screen.queryByRole("button", { name: /Sign out/i });
      const NewTransactionLink = screen.queryByRole("link", {
        name: /New Transaction/i,
      });
      expect(SignOutBtn).not.toBeInTheDocument();
      expect(NewTransactionLink).not.toBeInTheDocument();
    });
  });
  test("'Home and LoginSignup' links show when the user is not logged in", () => {
    useLoginStatus.mockReturnValue(false);
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    const LoginSignupLink = screen.getByRole("link", { name: /LoginSignup/i });
    const HomeLink = screen.getByRole("link", { name: /Home/i });
    expect(LoginSignupLink).toBeInTheDocument();
    expect(HomeLink).toBeInTheDocument();
  });
});
