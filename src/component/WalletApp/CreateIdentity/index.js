import {
  Input,
  Button,
  Typography,
  Grid,
  StepButton,
  TextField,
  Avatar,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useMemo, useRef } from "react";
import { MobileStepper } from "@mui/material";
import { useState } from "react";
import { useIdWalletContext } from "../../../context/identity-wallet-context";
import CreatePasswordForm from "../component/CreatePasswordForm";
import Mnemonics from "../component/Mnemonics";
import MnemonicsConfirm from "../component/MnemonicsConfirm";
import UserAccount from "../component/UserAccount";
const CreateIdentity = ({ goBack }) => {
  const { keyContainer } = useIdWalletContext();
  const [activeStep, setActiveStep] = useState(0);

  //passwordform state
  const [passwordFormData, setPasswordFormData] = useState({
    password: "",
    confirm: "",
  });
  // mnemonic state
  const [mnemonicsData, setMnemonicsData] = useState({});
  const [mnemonics, setMnemonics] = useState("");
  // confirm page state
  const [mnemonicsConfirm, setMnemonicsConfirm] = useState({});
  const [pickedIndex, setPickedIndex] = useState([]);

  //handle confirm button
  const handleConfirmStep1 = () => {
    console.log(passwordFormData);
    if (passwordFormData.password === passwordFormData.confirm) {
      keyContainer.unlock(passwordFormData.password);
      const generatedMnemonics = keyContainer.generateMasterSeed();
      setMnemonics(generatedMnemonics);
      var mnemonicsObject = {};
      generatedMnemonics.split(" ").map((word, index) => {
        // convert mnemonics string to mnemonic object
        mnemonicsObject[index] = word;
        return 0;
      });
      setMnemonicsData(mnemonicsObject);
      //choose random 4 word from mnemonics
      const allkeys = Object.keys(mnemonicsObject);
      const random = [...allkeys].sort(() => 0.5 - Math.random());
      setPickedIndex(random.slice(0, 4));
      setActiveStep((prev) => prev + 1);
    } else {
      console.log(`password doesn't match`);
    }
  };
  const handleConfirmStep2 = () => {
    setActiveStep((prev) => prev + 1);
  };
  const checkFinalConfirm = () => {
    let isValid = true;
    for (const k in mnemonicsConfirm) {
      if (mnemonicsData[k] !== mnemonicsConfirm[k]) {
        isValid = false;
      }
    }
    return isValid;
  };
  const handleFinalConfirm = () => {
    const isValid = checkFinalConfirm();
    if (isValid) {
      console.log(
        "🚀 ~ file: index.js ~ line 194 ~ handleFinalConfirm ~ mnemonics",
        mnemonics
      );
      console.log(
        "🚀 ~ file: index.js ~ line 195 ~ handleFinalConfirm ~ mnemonicsData",
        mnemonicsData
      );
      keyContainer.setMasterSeed(mnemonics);
      keyContainer.generateKeyFromSeed(mnemonics);
      console.log(
        "🚀 ~ file: index.js ~ line 202 ~ handleFinalConfirm ~ keyContainer.generateKeyFromSeed(mnemonics)",
        keyContainer.generateKeyFromSeed(mnemonics)
      );
    } else {
      console.log("wrong confirm");
    }
  };
  const handleConfirm = () => {
    switch (activeStep) {
      case 0:
        handleConfirmStep1();
        break;
      case 1:
        handleConfirmStep2();
        break;
      case 2:
        handleFinalConfirm();
        break;
      // case 3:
      //   handleFinalConfirm();
      //   break;
      default:
        break;
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        "& .MuiLinearProgress-root": {
          width: "100%",
        },
      }}
    >
      <MobileStepper
        sx={{
          padding: 0,
          backgroundColor: "inherit",
        }}
        variant="progress"
        steps={3}
        position="static"
        activeStep={activeStep}
      />
      <Box
        sx={{
          height: "300px",
        }}
      >
        {activeStep === 0 && (
          <CreatePasswordForm setPasswordFormData={setPasswordFormData} />
        )}
        {activeStep === 1 && <Mnemonics mnemonicsData={mnemonicsData} />}
        {activeStep === 2 && (
          <MnemonicsConfirm
            mnemonicsData={mnemonicsData}
            setMnemonicsConfirm={setMnemonicsConfirm}
            pickedIndex={pickedIndex}
          />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {activeStep !== 0 && (
          <Button
            component={StepButton}
            variant="outlined"
            onClick={() => setActiveStep((prev) => prev - 1)}
            disableRipple
          >
            Back
          </Button>
        )}
        {activeStep === 0 && (
          <Button
            sx={{
              width: "100%",
            }}
            variant="outlined"
            onClick={() => goBack()}
          >
            Back
          </Button>
        )}

        {activeStep !== 2 && (
          <Button
            component={StepButton}
            onClick={() => handleConfirm()}
            disableRipple
            variant="outlined"
          >
            Confirm
          </Button>
        )}
        {activeStep === 2 && (
          <Button
            sx={{
              width: "100%",
            }}
            variant="outlined"
            onClick={() => handleConfirm()}
          >
            Confirm
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CreateIdentity;
