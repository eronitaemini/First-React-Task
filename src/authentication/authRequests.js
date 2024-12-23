import { redirect } from "react-router-dom";
import { json } from "react-router-dom";
import { store } from "../store/store";
import { authActions } from "../store/AuthSlice";
export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode");
  const formData = await request.formData();
  const loginData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const signupData = {
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  try {
    if (mode === "login") {
      return loginRequest(loginData);
    }
    if (mode === "signup") {
      if (signupData.password !== signupData.confirmPassword) {
        store.dispatch(
          authActions.setErrorMessage("Password fields do not match!")
        );
        return { errorMessage: "Password fields do not match!" };
      }
      store.dispatch(authActions.setErrorMessage(""));
      return signupRequest(signupData);
    }
  } catch (err) {
    return { errorMessage: "An unexpected error occurred." };
  }
}

export async function loginRequest(authData) {
  try {
    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
      credentials: "include",
    });

    if (response.status === 400) {
      store.dispatch(
        authActions.setErrorMessage("E-mail and password are rquired")
      );
      throw Error({ message: "E-mail and password are required" });
    }

    if (response.status === 404) {
      store.dispatch(authActions.setErrorMessage("User not found"));
      throw Error({ message: " Not found" });
    }

    if (response.status === 401) {
      store.dispatch(authActions.setErrorMessage("Invalid e-mail or password"));
      throw Error("Invalid credentials");
    }

    if (response.status === 200) {
      store.dispatch(authActions.setIsLoggedIn());
      store.dispatch(authActions.setErrorMessage(""));
      return redirect("/auth/newTransaction");
    }
    if (!response.ok) {
      store.dispatch(
        authActions.setErrorMessage("There was an error getting your data")
      );
      throw Error({ message: "Rejected" });
    }
  } catch (error) {
    return json({ message: "error", error });
  }
}

async function signupRequest(authData) {
  try {
    const response = await fetch("http://localhost:8080/api/signup", {
      method: "POST",
      body: JSON.stringify(authData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 409) {
      store.dispatch(authActions.setErrorMessage("User already exists"));
      throw Error({ message: "User already exists" });
    }

    if (!response.ok) {
      throw Error({ message: "Rejected" });
    }

    const res = await response.json();
    return redirect("/comingSoon");
  } catch (error) {
    return json({ message: error });
  }
}

export async function logoutRequest() {
  try {
    const response = await fetch("http://localhost:8080/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      console.log("logout succesful");
      store.dispatch(authActions.setIsLoggedOut());
      store.dispatch(authActions.setErrorMessage(""));
    }

    if (!response.ok) {
      store.dispatch(
        authActions.setErrorMessage("There was a problem logging out")
      );
      throw Error({ message: "Rejected" });
    }

    const res = await response.json();
  } catch (error) {
    return json({ message: error });
  }
}
