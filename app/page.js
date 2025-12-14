"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/auth"); // redirect to login page
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to AI Recruiter!</h1>
      <p style={styles.subtitle}>Start your interview journey with us</p>
      <button style={styles.button} onClick={handleStart}>
        Click Here to Start Your Interview Journey
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    textAlign: "center",
    padding: "0 20px",
    background: "linear-gradient(to right, #667eea, #764ba2)",
    color: "#fff",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
  },
  button: {
    padding: "1rem 2rem",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#764ba2",
    backgroundColor: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};
