import { Form, Link, redirect, useActionData } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Button from "./Button";
import useIsLoggedIn from "../hooks/useLoginStatus";
import styles from "../cssModules/Form.module.css";
export default function AuthForm() {
  const [searchParams] = useSearchParams();
  const isSignup = searchParams.get("mode") === "signup";
  let mode = isSignup || "login";
  console.log("isSignup", isSignup);
  console.log(searchParams.get("mode"));
  console.log("mode", mode);

  return (
    <>
      <Form
        method="post"
        action={`/?mode=${isSignup ? "signup" : "login"}`}
        className={styles.form}
      >
        <label htmlFor="email" className={styles.label}>
          E-mail
        </label>
        <input type="email" name="email" className={styles.input} />
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input type="password" name="password" className={styles.input} />
        {isSignup && (
          <>
            <label htmlFor="password" className={styles.label}>
              Confirm Password
            </label>
            <input
              type="password"
              name="confimPassword"
              className={styles.input}
            />
          </>
        )}
        <Button>{isSignup ? "Signup" : "Log In"}</Button>
        <Link to={`?mode=${isSignup ? "login" : "signup"}`}>
          {isSignup ? "Already have an account? Log in" : "Create an account"}
        </Link>
      </Form>
    </>
  );
}
