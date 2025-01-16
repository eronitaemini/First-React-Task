import { store } from "../store/store";
import { authActions } from "../store/AuthSlice";
import { json } from "react-router-dom";

export async function getAllTransactions() {
  try {
    const response = await fetch("http://localhost:5130/api/Expense");
    const res = await response.json();
    const results = res.result;

    if (!response.ok) {
      throw new Error("Rejected");
    }

    return results;
  } catch (error) {
    console.error("error", error);
  }
}
export async function getAllCategories() {
  // http://localhost:8080/api/categories
  try {
    const response = await fetch("http://localhost:5130/api/category");

    if (!response.ok) {
      throw new Error("Rejected");
    }

    const res = await response.json();
    return res.result;
  } catch (error) {
    console.error("error", error);
  }
}
export async function deleteTransaction(id) {
  // http://localhost:8080/api/expenses/${id}
  try {
    const response = await fetch(`http://localhost:5130/api/expense/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    console.log("response status while trying to delete", response.status);
    if (response.status === 404) {
      // store.dispatch(authActions.setErrorMessage("Transaction not found"));
      throw new Error("Transaction not found");
    }
    if (response.status === 500) {
      // store.dispatch(
      //   authActions.setErrorMessage(
      //     "An error occurred deleting the transaction! Please try again later"
      //   )
      // );
      throw new Error("An error occurred");
    }
    if (response.status === 204) {
      console.log("succesfully deleted the transaction");
      store.dispatch(
        authActions.setErrorMessage("Succesfully deleted the transaction")
      );
    }
    if (!response.ok) {
      throw new Error("An error occurred deleting the transaction");
    }
  } catch (error) {
    console.error("error", error);
  }
}

export async function addTransaction({ request }) {
  // http://localhost:8080/api/expenses
  const formData = await request.formData();

  const requestBody = {
    title: formData.get("title"),
    value: formData.get("value"),
    categoryId: formData.get("category"),
  };

  console.log("request body", requestBody);

  console.log("checking data types:", typeof requestBody.categoryId);
  try {
    const response = await fetch("http://localhost:5130/api/expense", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    // if (response.status === 201) {
    //   store.dispatch(
    //     authActions.setErrorMessage("Transaction added succesfully")
    //   );
    // }
    if (response.status === 404) {
      // store.dispatch(
      //   authActions.setErrorMessage("An error occured! Not found")
      // );
      throw new Error("Error! Not found");
    }
    if (!response.ok) {
      // store.dispatch(
      //   authActions.setErrorMessage("Error occurred creating the transaction")
      // );
      throw new Error("Error occurred creating the transaction");
    }
    const res = await response.json();
    return res;
  } catch (error) {
    return json({ message: error });
  }
}

export async function editTransaction(id, data) {
  // http://localhost:8080/api/expenses/${id}
  const body = {
    id: id,
    title: data.title,
    value: data.value,
    categoryId: data.category,
  };

  console.log(
    "editing request body",
    body,
    "typeof categoryid",
    typeof body.categoryId
  );

  try {
    const response = await fetch(`http://localhost:5130/api/Expense/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.status === 404) {
      // store.dispatch(authActions.setErrorMessage("Error!Not found"));
      throw new Error(`Error!, Not found`);
    }
    if (!response.ok) {
      // store.dispatch(
      //   authActions.setErrorMessage("Error editing the transaction")
      // );
      throw new Error("Error editing the transaction");
    }

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("error", error);
  }
}
