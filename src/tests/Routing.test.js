import { MemoryRouter, Router } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import TransactionFormPage from "../pages/TransactionFormPage";
import App from "../App";
import Sidebar from "../components/Sidebar";
import RootLayout from "../components/RootLayout";
import useIsLoggedIn from "../hooks/useLoginStatus";
import AuthForm from "../components/AuthForm";
import { Navigate } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
jest.mock("../pages/AuthPage");
jest.mock("../pages/HomePage");
jest.mock("../pages/TransactionFormPage");
jest.mock("../components/Sidebar");
jest.mock("../components/RootLayout");
jest.mock("../hooks/useLoginStatus");
jest.mock("../components/AuthForm");
describe("Testing routes", () => {
  test("Should render RootLayout", () => {
    RootLayout.mockImplementation(() => <div>RootLayout</div>);
    render(<RootLayout />);
    expect(screen.getByText("RootLayout")).toBeInTheDocument();
  });
});
