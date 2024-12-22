import React from "react";
import styles from "../cssModules/ErroPage.module.css";
export default function ErrorPage() {
  return (
    <div className={styles.errorPageContainer}>
      <h1 className={styles.errorTitle}>Error! Not Found</h1>

      <p className={styles.errorMessage}>Page not found</p>
      <a href="/home" className={styles.errorLink}>
        Go back home
      </a>
    </div>
  );
}
