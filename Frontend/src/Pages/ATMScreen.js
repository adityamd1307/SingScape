import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  CircularProgress,
  Grid,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import Navbar from "../Components/Navbar";

export default function ATMScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const postalCode = location.state?.postalCode;

  const [atms, setAtms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [radius, setRadius] = useState(3000);
  const [radiusInput, setRadiusInput] = useState(3000);

  const fetchATMs = async () => {
    if (!postalCode) return;

    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(
        `http://172.20.10.3:8080/external/nearby-atms?postalCode=${postalCode}&radius=${radius}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch ATMs");
      const data = await res.json();
      setAtms(data);
    } catch (err) {
      console.error("Error fetching ATMs:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!postalCode) {
      navigate("/");
      return;
    }
    fetchATMs();
  }, [postalCode, radius]);

  const handleRadiusChange = () => {
    setLoading(true);
    setRadius(parseInt(radiusInput));
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <Container sx={{ py: 5, flex: 1 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Nearby ATMs
        </Typography>

        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <TextField
            label="Radius (meters)"
            type="number"
            size="small"
            value={radiusInput}
            onChange={(e) => setRadiusInput(e.target.value)}
          />
          <Button variant="contained" onClick={handleRadiusChange}>
            Update Radius
          </Button>
        </Box>

        <Typography variant="subtitle1" gutterBottom>
          Showing ATMs within {radius / 1000}km of postal code:{" "}
          <strong>{postalCode}</strong>
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : atms.length === 0 ? (
          <Typography>No ATMs found nearby.</Typography>
        ) : (
          <Grid container spacing={3} mt={1}>
            {atms.map((atm, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {atm.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {atm.vicinity}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
}
