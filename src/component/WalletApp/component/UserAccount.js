import React from "react";
import { Box } from "@mui/system";
import { Button, Typography, Avatar } from "@mui/material";

const UserAccount = () => {
  return (
    <Box>
      <Box>
        <Avatar />
        <Typography>Your account</Typography>
        <Typography></Typography>
      </Box>
      <Box>
        <Button variant="outlined">Change password</Button>
        <Button variant="outlined">Export key file</Button>
        <Button variant="outlined">Back up</Button>
        <Button variant="outlined">Recover</Button>
      </Box>
      <Box>
        <Button>Logout</Button>
      </Box>
    </Box>
  );
};

export default UserAccount;
