import { Form, Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Button from "./Button";
import styles from "../cssModules/Form.module.css";
import { useSelector } from "react-redux";
import style from "../cssModules/Text.module.css";
import React from "react";
export default function AuthForm() {
  const [searchParams] = useSearchParams();
  const isSignup = searchParams.get("mode") === "signup";
  let mode = isSignup || "login";
  const errorMessage = useSelector(
    (state: { auth: { errorMessage: string } }) => state.auth.errorMessage
  );
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
              name="confirmPassword"
              className={styles.input}
            />
          </>
        )}
        <Button>{isSignup ? "Signup" : "Log In"}</Button>
        <Link to={`?mode=${isSignup ? "login" : "signup"}`}>
          {isSignup ? "Already have an account? Log in" : "Create an account"}
        </Link>
        <p className={style.errorMsg}>{errorMessage}</p>
      </Form>
    </>
  );
}
