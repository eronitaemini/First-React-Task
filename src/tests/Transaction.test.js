import { render, screen } from "@testing-library/react";
import TransactionCard from "../components/TransactionCard";
import { Provider } from "react-redux";
import { mockStoreSimulation } from "./utilityTestingFunctions";

describe("Transaction Component", () => {
  const mockData = {
    title: "Transaction Title",
    category: { id: 2, name: "Transaction Category" },
    value: "100",
    createdAt: "2024-12-21",
  };
  test(`transaction details (title, amount, category, date) render correctly`, () => {
    const mockStore = mockStoreSimulation(true);
    render(
      <Provider store={mockStore}>
        <TransactionCard {...mockData} />
      </Provider>
    );

    const titleElement = screen.getByText(mockData.title);
    const categoryElement = screen.getByText(mockData.category.name);
    const valueElement = screen.getByText(`$${mockData.value}`);
    const createdAtElement = screen.getByText(mockData.createdAt);
    expect(titleElement).toBeInTheDocument();
    expect(categoryElement).toBeInTheDocument();
    expect(valueElement).toBeInTheDocument();
    expect(createdAtElement).toBeInTheDocument();
  });
});
