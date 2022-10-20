import React from "react";
import { Typography, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";

const MnemonicsConfirm = ({
  mnemonicsData,
  setMnemonicsConfirm,
  pickedIndex,
}) => {
  const handleChangeConfirmData = (e, index) => {
    setMnemonicsConfirm((prev) => {
      return {
        ...prev,
        [index]: e.target.value,
      };
    });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-evenly",
      }}
    >
      <Typography>Confirm Recovery Phrase</Typography>
      <Grid container>
        {pickedIndex.map((itemIndex, index) => {
          return (
            <Grid item xs={6}>
              <TextField
                label={parseInt(itemIndex) + 1}
                onChange={(e) => {
                  handleChangeConfirmData(e, itemIndex);
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default MnemonicsConfirm;
