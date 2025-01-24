import React from "react";
import { useRouter } from "next/router";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

export default function Sidebar() {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <Box
      sx={{
        width: "240px",
        height: "100vh",
        backgroundColor: "#1976d2",
        color: "#ffffff",
        padding: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: "20px" }}>
        Admin Panel
      </Typography>
      <List>
        <ListItem button onClick={() => handleNavigation("/students")}>
          <ListItemText primary="Student Management" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation("/login")}>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );
}


