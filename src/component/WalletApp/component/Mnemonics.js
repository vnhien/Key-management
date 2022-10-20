import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import { DEFAULT_ATTRIBUTE } from "@mui/system/cssVars/getInitColorSchemeScript";

const Mnemonics = ({ mnemonicsData }) => {
  const mnemonicsArray =
    mnemonicsData !== undefined ? Object.values(mnemonicsData) : [""];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-evenly",
      }}
    >
      <Typography>
        Your Secret Recovery Phrase is a 12-word phrase that is the “master key”
        to your identity wallet
      </Typography>
      <Grid container>
        {mnemonicsArray.map((word, index) => {
          return (
            <Grid key={index + "-" + word} item xs={4}>
              <Box
                sx={{
                  pl: 1,
                  py: 1,
                  pr: 0.5,
                  borderRadius: 1,
                  border: "1px solid ",
                  textAlign: "left",
                }}
              >
                {index + 1}
                {". "}
                {word}
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
export default Mnemonics;
