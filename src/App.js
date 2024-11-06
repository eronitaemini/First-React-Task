import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavigatedPage from "./components/NavigatedPage";
import Home from "./components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/newTransaction",
    element: <NavigatedPage title="Create a new transction" />,
  },
  {
    path: "/loginSignup",
    element: <NavigatedPage title="Login/Signup" />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
