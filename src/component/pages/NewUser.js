import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const NewUser = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 5,
        backgroundColor: "#F5F7FA",
      }}
    >
      <Button
        sx={{
          width: "200px",
          mb: 3,
          borderRadius: 2,
        }}
        variant="contained"
      >
        Create account
      </Button>
      <Button
        sx={{
          width: "200px",
          mb: 3,
          borderRadius: 2,
        }}
        variant="contained"
      >
        Restore account
      </Button>
    </Box>
  );
};

export default NewUser;
