import { Box } from "@mui/system";
import React from "react";
import {
  IdentityWalletProvider,
  useIdWalletContext,
} from "../../context/identity-wallet-context";

import NewUser from "./NewUser";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <NewUser />,
//   },
//   {
//     path: "/new-user",
//     element: <NewUser />,
//   },
//   {
//     path: "/create-identity",
//     element: <CreateIdentity />,
//   },
// ]);
const WalletApp = () => {
  return (
    <IdentityWalletProvider>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#F5F7FA",
          width: " 350px",
          minHeight: "400px",
          px: 3,
          py: 4,
          borderRadius: 2,
        }}
      >
        <NewUser />
      </Box>
    </IdentityWalletProvider>
  );
};
export default WalletApp;
