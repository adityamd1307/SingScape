import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function LandingScreen() {
  const navigate = useNavigate();
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <header
        style={{
          backgroundColor: "#fff",
          color: "black",
          textAlign: "center",
          padding: "16px",
          fontSize: "48px",
          fontWeight: "bold",
        }}
      >
        <span>SingScape</span>
      </header>

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f4f4f4",
          padding: "24px",
        }}
      >
        <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
          <Button
            variant="contained"
            size="large"
            style={{
              backgroundColor: "#1976D2",
              color: "#fff",
              padding: "12px 24px",
              fontSize: "16px",
              borderRadius: "8px",
            }}
            onClick={() => navigate("/login")}
          >
            Log In
          </Button>
          <Button
            variant="contained"
            size="large"
            style={{
              backgroundColor: "#fff",
              color: "#000",
              padding: "12px 24px",
              fontSize: "16px",
              borderRadius: "8px",
            }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
        </div>
      </main>
      <footer
        style={{
          backgroundColor: "#00002a",
          color: "white",
          textAlign: "center",
          padding: "16px",
          fontSize: "14px",
        }}
      >
        &copy; 2025 SingScape. Created by Group FDAC - SC2006.
      </footer>
    </div>
  );
}
