import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavigatedPage from "./components/NavigatedPage";
import Home from "./pages/HomePage";
import RootLayout from "./components/RootLayout";
import AuthPage from "./pages/AuthPage";
import ErrorPage from "./pages/ErrorPage";
import { action as authAction } from "./authentication/authRequests";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { ProtectedRoutes } from "./authentication/ProtectedRoutes";
import { getAllTransactions } from "./services/transaction";
import TransactionFormPage from "./pages/TransactionFormPage";
import { addTransaction } from "./services/transaction";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    action: authAction,
    children: [
      {
        index: true,
        element: <AuthPage />,
      },
      {
        path: "home",
        element: <Home />,
        loader: getAllTransactions,
      },
      {
        path: "auth",
        element: <ProtectedRoutes />,
        children: [
          {
            path: "newTransaction",
            element: <TransactionFormPage />,
            action: addTransaction,
          },
        ],
      },
      {
        path: "comingSoon",
        element: <NavigatedPage title="You succesfully signed up" />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
