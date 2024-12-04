import { CATEGORIES } from "../data";

const convertCategoryTonumber = () => {};

export async function getAllTransactions() {
  try {
    const response = await fetch("http://localhost:8080/api/expenses");

    if (!response.ok) {
      throw new Error("Rejected");
    }

    const res = await response.json();
    console.log("Fetching trasnactions", res);
    return res;
  } catch (error) {
    console.error("error", error);
  }
}

export async function deleteTransaction(id) {
  try {
    const response = await fetch(`http://localhost:8080/api/expenses/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const res = await response.json();
    console.log("res", res);

    if (!response.ok) {
      throw new Error("An error occurred deleting the transaction");
    }
    if (response.status === 204) {
      console.log("succesfully deleted the transaction");
    }
  } catch (error) {
    console.error("error", error);
  }
}

export async function addTransaction({ request }) {
  const formData = await request.formData();
  const categoryId = CATEGORIES.find(
    (category) => category.name === formData.get("category")
  );

  const requestBody = {
    title: formData.get("title"),
    value: formData.get("value"),
    categoryId: categoryId.id,
  };

  try {
    const response = await fetch("http://localhost:8080/api/expenses", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error occurred while adding the transaction");
    }
    console.log("succesfully added transaction in the Database through API");
    const res = await response.json();
    return res;
  } catch (error) {
    console.error("error", error);
  }
}

export async function editTransaction(id, data) {
  const categoryId = CATEGORIES.find(
    (category) => category.name === data.category
  );
  console.log(data.category);
  const body = {
    title: data.title,
    value: data.value,
    category: categoryId,
  };
  try {
    const response = await fetch(`http://localhost:8080/api/expenses/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.status === 404) {
      throw new Error(`ERRORRR!, Not found`);
    }
    if (!response.ok) {
      throw new Error("Error editing the transacting");
    }

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("error", error);
  }
}
