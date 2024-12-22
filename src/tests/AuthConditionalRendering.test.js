import { render, screen } from "@testing-library/react";
import TransactionCard from "../components/TransactionCard";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Sidebar from "../components/Sidebar";
import { MemoryRouter } from "react-router-dom";
import { mockStoreSimulation } from "./utilityTestingFunctions";
describe("Conditional rendering", () => {
  const mockData = {
    title: "Transaction Title",
    category: { name: "Food" },
    value: 100,
    createdAt: "2024-12-21",
  };

  test("Buttons are displayed if the user is logged in", () => {
    const store = mockStoreSimulation(true);
    render(
      <Provider store={store}>
        <TransactionCard {...mockData} />
      </Provider>
    );
    const deleteButton = screen.queryByText("Delete");
    const editButton = screen.queryByText("Edit");
    expect(deleteButton).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
  });

  test("Buttons are not displayed if the user is not logged in", () => {
    const store = mockStoreSimulation(false);
    render(
      <Provider store={store}>
        <TransactionCard {...mockData} />
      </Provider>
    );

    const deleteButton = screen.queryByText("Delete");
    const editButton = screen.queryByText("Edit");
    expect(editButton).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
  });

  test("'New transaction link' is not displayed if the user is not logged in", () => {
    const store = mockStoreSimulation(false);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Sidebar />
        </MemoryRouter>
      </Provider>
    );
    const newTransactionLink = screen.queryByRole("link", {
      name: /new transaction/i,
    });
    expect(newTransactionLink).not.toBeInTheDocument();
  });

  test("'New transaction link' is displayed if the user is logged in", () => {
    const store = mockStoreSimulation(true);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Sidebar />
        </MemoryRouter>
      </Provider>
    );
    const newTransactionLink = screen.queryByRole("link", {
      name: /new transaction/i,
    });
    expect(newTransactionLink).toBeInTheDocument();
  });
});
