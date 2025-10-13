import React, { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

const Home = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const styles = {
    container: {
      background: theme === "light" ? "#fdfdfd" : "#1e1e1e",
      color: theme === "light" ? "#333" : "#fdfdfd",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      transition: "all 0.3s ease-in-out",
    },
    card: {
      background: theme === "light" ? "#fff" : "#2c2c2c",
      padding: "30px",
      borderRadius: "12px",
      boxShadow:
        theme === "light"
          ? "0 4px 12px rgba(0,0,0,0.1)"
          : "0 4px 12px rgba(0,0,0,0.5)",
      textAlign: "center",
      transition: "all 0.3s ease-in-out",
    },
    title: {
      fontSize: "28px",
      marginBottom: "20px",
    },
    button: {
      background: theme === "light" ? "#333" : "#fdfdfd",
      color: theme === "light" ? "#fff" : "#333",
      border: "none",
      padding: "12px 24px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "600",
      transition: "all 0.3s ease-in-out",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🌗 Current Theme: {theme}</h1>
        <button style={styles.button} onClick={toggleTheme}>
          Toggle Theme
        </button>
      </div>
    </div>
  );
};

export default Home;
