import React, {createContext, useContext, useState} from "react";

// Create context.
export const GlobalContext = createContext();

// Provider component.
export const GlobalProvider = (props) => {

  // Original user is null because there is no user.
  const [user, setUser] = useState(null);


  // Makes it so user and setUser are available globally.
  const value = { user, setUser };

  return (
      //value is called in here.
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  return useContext(GlobalContext);
};