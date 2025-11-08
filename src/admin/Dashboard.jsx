import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";

export default function Dashboard() {
  const stats = [
    { title: "Total Products", value: 128 },
    { title: "Orders", value: 56 },
    { title: "Users", value: 72 },
    { title: "Revenue", value: "$12,340" },
  ];

  return (
    <Box sx={{ p: 3, backgroundColor: "#f1f1f3", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight={600} color="#303e4c" mb={3}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.title}>
            <Paper
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 3,
                boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
              }}
            >
              <Typography variant="h6" color="#303e4c">
                {item.title}
              </Typography>
              <Typography variant="h5" fontWeight={700} color="#1976d2">
                {item.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
