'use client'
import React, { createContext, Dispatch, FC, useContext, useReducer } from "react";
import { ContextProviderProp } from "@/types";
import { defaultGenerateBlurbContext, GenerateBlurbContext } from "@/context/GenerateBlurbContext/Context";
import { GenerateBlurbAction } from "@/context/GenerateBlurbContext/Actions";
import { generateBlurbContextReducer } from "@/context/GenerateBlurbContext/Reducer";

const GenerateBlurbDispatchContext = createContext<Dispatch<GenerateBlurbAction>>(() => {
});
export const GenerateBlurbContextProvider: FC<ContextProviderProp> = ({ children }) => {
  const [generateBlurbContext, dispatch] = useReducer(generateBlurbContextReducer, defaultGenerateBlurbContext);

  return (
    <GenerateBlurbContext.Provider value={generateBlurbContext}>
      <GenerateBlurbDispatchContext.Provider value={dispatch}>
        {children}
      </GenerateBlurbDispatchContext.Provider>
    </GenerateBlurbContext.Provider>
  );
};

export function useGenerateBlurbDispatch() {
  return useContext(GenerateBlurbDispatchContext);
}