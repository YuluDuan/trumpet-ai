import { createContext, useContext } from "react";

interface VariantContext {
  numVariants: string;
  setVariants: (value: string) => void;
}

const VariantContext = createContext<VariantContext>({
  numVariants: "",
  setVariants: () => {},
});

export const useVariantContext = () => useContext(VariantContext);

export default VariantContext;
