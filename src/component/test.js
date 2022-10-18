import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import KeyContainer from "../key-container/keyContainer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LocalStorageDB from "../db/localStorageDb";
import IndexedDB from "../db/indexedDb";
import IdentityWallet from "./idenwallet";

export default function Test() {
  const [x, setX] = useState("");
  const [openPasswordForm, setOpenPasswordForm] = useState(false);
  const [openRestoreForm, setOpenRestoreForm] = useState(false);

  const [password, setPassword] = useState("");
  const [mnemonics, setMnemonics] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [keyContainer, setKeyContainer] = useState();
  const [encrypted, setEncrypted] = useState();

  useEffect(() => {
    const db = new LocalStorageDB("ziden-db");
    const tempKeyContainer = new KeyContainer(db);
    setKeyContainer(tempKeyContainer);
  }, []);
  const handleInputChange = (e) => {
    setX(e.target.value);
  };
  const handleRequestPassword = () => {
    setOpenPasswordForm(true);
  };
  const handleClosePasswordForm = () => {
    setOpenPasswordForm(false);
  };

  const requireUnlock = async () => {
    if (keyContainer.isUnlock()) {
      console.log("unlocked");
    } else {
      handleRequestPassword();
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#FFFF",
      }}
    >
      <Box
        sx={{
          display: " flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IdentityWallet />
        <TextField
          sx={{
            color: "red",
            width: "400px",
            borderRadius: 3,
            mb: 3,
            mt: 3,
          }}
          onChange={handleInputChange}
        />
        <Button
          disableRipple
          onClick={() => {
            const enc = keyContainer.encrypt(x);
            setEncrypted(enc);
            console.log("encrypted message: ", enc);
          }}
          variant="outlined"
          sx={{
            mb: 3,
            width: "300px",
          }}
        >
          Encrypt input
        </Button>
        <Button
          disableRipple
          onClick={() => {
            if (encrypted !== undefined) {
              const raw = keyContainer.decrypt(encrypted);
              console.log("decrypted message: ", raw);
            }
          }}
          variant="outlined"
          sx={{
            mb: 3,
            width: "300px",
          }}
        >
          decrypt
        </Button>
        <Dialog open={openPasswordForm} onClose={handleClosePasswordForm}>
          <DialogTitle>Welcome!</DialogTitle>
          <DialogContent>
            <DialogContentText>password</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              disableRipple
              onClick={handleClosePasswordForm}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              disableRipple
              onClick={() => {
                keyContainer.unlock(password);
                handleClosePasswordForm();
              }}
              variant="outlined"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Button
          disableRipple
          onClick={() => {
            requireUnlock();
          }}
          variant="outlined"
          sx={{
            mb: 3,
            width: "300px",
          }}
        >
          input password
        </Button>
        <Button
          disableRipple
          onClick={() => {
            keyContainer.setMasterSeed();
          }}
          variant="outlined"
          sx={{
            mb: 3,
            width: "300px",
          }}
        >
          set mnemonic
        </Button>
        <Button
          disableRipple
          onClick={() => {
            const mnemonic = keyContainer.getMasterSeedDecrypted();
            console.log("user mnemonic:", mnemonic);
          }}
          variant="outlined"
          sx={{
            mb: 3,
            width: "300px",
          }}
        >
          get mnemonic raw
        </Button>
        <Button
          disableRipple
          onClick={() => {
            const mnemonic = keyContainer.getMasterSeedDecrypted();
            const keyPair = keyContainer.generateKeyFromSeed(mnemonic);
            console.log("generated publicKey: ", keyPair);
          }}
          variant="outlined"
          sx={{
            mb: 3,
            width: "300px",
          }}
        >
          Generate key
        </Button>
        <Button
          disableRipple
          onClick={() => {
            const keyPairs = keyContainer.getKeyDecrypted();
            console.log(keyPairs);
          }}
          variant="outlined"
          sx={{
            mb: 3,
            width: "300px",
          }}
        >
          Get Key
        </Button>
        <Dialog open={openRestoreForm}>
          <DialogTitle>Provide infomation to restore keys</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="mnemonics"
              type="text"
              fullWidth
              variant="standard"
              placeholder="Mnemonics"
              onChange={(e) => setMnemonics(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              type="text"
              fullWidth
              variant="standard"
              placeholder="password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              disableRipple
              variant="outlined"
              onClick={() => {
                setOpenRestoreForm(false);
              }}
            >
              Cancel
            </Button>
            <Button
              disableRipple
              variant="outlined"
              onClick={() => {
                keyContainer.lock();
                keyContainer.unlock(newPassword);
                const recoveredKey =
                  keyContainer.recoverFromMasterSeed(mnemonics);
                console.log("Recovered key: ", recoveredKey);
                setOpenRestoreForm(false);
              }}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <Button
          disableRipple
          variant="outlined"
          sx={{
            mb: 3,
            width: "300px",
          }}
          onClick={() => {
            setOpenRestoreForm(true);
          }}
        >
          Restore Key with mnemonics
        </Button>
        <Button
          disableRipple
          onClick={() => {
            const indexDB = new IndexedDB("ttt");
            indexDB.test();
          }}
          variant="outlined"
          sx={{
            mb: 3,
            width: "300px",
          }}
        >
          Test index DB
        </Button>
      </Box>
    </Box>
  );
}
