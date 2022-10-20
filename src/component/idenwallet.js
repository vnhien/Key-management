import { Box } from "@mui/system";
import React from "react";
import { useState, useEffect } from "react";
import { Button, Popper } from "@mui/material";
import WalletApp from "./WalletApp";

const IdentityWallet = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        disablePortal
      >
        <WalletApp />
      </Popper>
      <Box
        sx={{
          position: "fixed",
          top: "20px",
          right: "40px",
        }}
      >
        <Button onClick={handleClick("bottom-end")} variant="contained">
          Identity Wallet
        </Button>
      </Box>
    </Box>
  );
};
export default IdentityWallet;
