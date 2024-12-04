import { redirect } from "react-router-dom";
import { json } from "react-router-dom";
import { store } from "../store/store";
import { authActions } from "../store/AuthSlice";
export async function action({ request }) {
  const url = new URL(request.url);

  console.log("url", url);
  const searchParams = new URL(request.url).searchParams;
  console.log("searchparams", searchParams);
  const mode = searchParams.get("mode");
  console.log("mode from the action", mode);
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

  if (mode === "login") {
    console.log("sending data to the backend...");
    return loginRequest(loginData);
  }
  if (mode === "signup") {
    return signupRequest(signupData);
  }
}

async function loginRequest(authData) {
  try {
    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
      credentials: "include",
    });
    if (!response.ok) {
      throw Error({ message: "Rejected" });
    }
    if (response.status === 404) {
      return json({ error: "User not found" }, { status: 400 });
      // throw Error("Not found");
    }

    if (response.status === 200) {
      store.dispatch(authActions.setIsLoggedIn());
      console.log("User is succesfully logged in");
      return redirect("/auth/newTransaction");
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
      console.error("This user already exists");
    }

    if (!response.ok) {
      throw Error({ message: "Rejected" });
    }

    const res = await response.json();
    console.log("response", res);
    return redirect("/comingSoon");
  } catch (error) {
    return json({ message: error });
  }
}
