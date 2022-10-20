import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import CreateIdentity from "./CreateIdentity";
import { useIdWalletContext } from "../../context/identity-wallet-context";

const NewUser = () => {
  const { createIdMethod, setCreateIdMethod, goBack } = useIdWalletContext();

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {createIdMethod === 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            height: "300px",
          }}
        >
          <Button
            sx={{
              width: "200px",
              mb: 3,
              borderRadius: 2,
            }}
            variant="contained"
            onClick={() => setCreateIdMethod(1)}
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
            onClick={() => setCreateIdMethod(2)}
          >
            Restore account
          </Button>
        </Box>
      )}
      {createIdMethod === 1 && <CreateIdentity goBack={goBack} />}
    </Box>
  );
};

export default NewUser;
