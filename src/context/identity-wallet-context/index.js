import React from "react";
import { useMemo, useState } from "react";
import KeyContainer from "../../key-container/keyContainer";
import LocalStorageDB from "../../db/localStorageDb";

const IdentityWalletContext = React.createContext({});
export function IdentityWalletProvider({ children }) {
  const [isNewUser, setIsNewUser] = useState(true);
  const updateUserData = () => {
    console.log("update new user");
    setIsNewUser(true);
  };
  const [createIdMethod, setCreateIdMethod] = useState(0);
  const goBack = () => {
    setCreateIdMethod(0);
  };
  const keyContainer = useMemo(() => {
    const localStorageDB = new LocalStorageDB("ziden-db");
    console.log("init");
    return new KeyContainer(localStorageDB);
  }, []);
  const IdWalletContextData = useMemo(
    () => ({
      isNewUser,
      createIdMethod,
      setCreateIdMethod,
      goBack,
      updateUserData,
      keyContainer,
    }),
    [isNewUser, createIdMethod, keyContainer]
  );
  return (
    <IdentityWalletContext.Provider value={IdWalletContextData}>
      {children}
    </IdentityWalletContext.Provider>
  );
}

export const useIdWalletContext = () => React.useContext(IdentityWalletContext);
