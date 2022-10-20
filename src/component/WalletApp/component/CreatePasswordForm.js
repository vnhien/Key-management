import React from "react";
import { Typography, Box, Input } from "@mui/material";

const CreatePasswordForm = ({ setPasswordFormData }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-evenly",
      }}
    >
      <Typography>Create password</Typography>
      <Input
        onChange={(e) => {
          setPasswordFormData((prev) => {
            return {
              ...prev,
              password: e.target.value,
            };
          });
        }}
        placeholder="Enter password"
      />
      <Input
        onChange={(e) => {
          setPasswordFormData((prev) => {
            return {
              ...prev,
              confirm: e.target.value,
            };
          });
        }}
        placeholder="Confirm password"
      />
    </Box>
  );
};

export default CreatePasswordForm;
