import { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [qNO, setQNO] = useState();
    const [ansNo, setAnsNo] = useState(null);

  const data = {qNO,setQNO,ansNo,setAnsNo };

  return <StateContext.Provider value={data}>{children}</StateContext.Provider>;
};

export const useContextCustom = () => useContext(StateContext);