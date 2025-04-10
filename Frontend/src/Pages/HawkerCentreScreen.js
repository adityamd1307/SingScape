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
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function HawkerCentreScreen() {
  const location = useLocation();
  const navigate = useNavigate();

  const postalCode = location.state?.postalCode;
  const [centres, setCentres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [radius, setRadius] = useState(3000);
  const [radiusInput, setRadiusInput] = useState(3000);

  const fetchHawkerCentres = async () => {
    if (!postalCode) return;

    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(
        `http://172.20.10.3:8080/external/hawker-centres?postalCode=${postalCode}&radius=${radius}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch hawker centres");
      const data = await res.json();
      console.log(data)
      setCentres(data);
    } catch (err) {
      console.error("Error fetching hawker centres:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!postalCode) {
      navigate("/");
      return;
    }
    fetchHawkerCentres();
  }, [postalCode, radius]);

  const handleRadiusChange = () => {
    setLoading(true);
    setRadius(parseInt(radiusInput));
  };

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar />
      <Container sx={{ py: 5, flex: 1 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Nearby Hawker Centres
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
          Showing results within {radius / 1000}km of postal code:{" "}
          <strong>{postalCode}</strong>
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : centres.length === 0 ? (
          <Typography>No hawker centres found nearby.</Typography>
        ) : (
          <Grid container spacing={3} mt={1}>
            {centres.map((centre, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {centre.nameOfCentre}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="body2" color="textSecondary">
                        {centre.locationOfCentre}
                      </Typography>
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        href={`https://www.google.com/maps/search/?api=1&query=${centre.latitude},${centre.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ textTransform: "none", fontSize: "0.7rem" }}
                        startIcon={<LocationOnIcon />}
                      >
                        View on Map
                      </Button>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body2">
                      <strong>Type:</strong> {centre.typeOfCentre}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Owner:</strong> {centre.owner}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Stalls:</strong> {centre.noOfStalls}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Cooked Food:</strong>{" "}
                      {centre.noOfCookedFoodStalls}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Market Produce:</strong>{" "}
                      {centre.noOfMktProduceStalls}
                    </Typography>
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
