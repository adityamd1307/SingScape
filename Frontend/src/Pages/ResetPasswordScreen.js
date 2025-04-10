import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import supabase from "../helper/SupabaseClient";

export default function ResetPasswordScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const emailFromURL = params.get("email") || "";
    const access_token = localStorage.get("access_token");
    const refresh_token = localStorage.get("refresh_token");

    if (access_token && refresh_token) {
      supabase.auth
        .setSession({ access_token, refresh_token })
        .then(({ error }) => {
          if (error) {
            console.error("Session error:", error.message);
            setMessage(
              "Unable to verify session. Please retry from the reset link."
            );
          }
        });
    } else {
      setMessage("Invalid or expired reset link.");
    }
  }, [location.hash]);

  const handleReset = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setMessage(error.message);
    } else {
      Swal.fire({
        title: "Success!",
        text: "Your password has been updated.",
        icon: "success",
        confirmButtonText: "Go to Login",
      }).then(() => navigate("/login"));
    }
  };

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
          fontSize: "36px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => navigate("/home")}
      >
        SingScape
      </header>

      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f4f4f4",
          padding: "24px",
        }}
      >
        <Paper
          elevation={3}
          style={{
            padding: "24px",
            maxWidth: "400px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Reset Password
          </Typography>

          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "16px" }}
            onClick={handleReset}
            disabled={!newPassword || !confirmPassword}
          >
            Reset Password
          </Button>

          {message && (
            <Typography color="error" style={{ marginTop: "16px" }}>
              {message}
            </Typography>
          )}
        </Paper>
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
