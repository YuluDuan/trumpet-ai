import { MouseEventHandler, createContext, useContext, useState } from "react";

interface VariantContext {
  numVariants: string;
  setVariants: (value: string) => void;
  showVariants: boolean;
  handleShowVariants: MouseEventHandler<HTMLImageElement>;
}

interface VariantContextProviderProps {
  children: React.ReactNode;
}

const VariantContext = createContext<VariantContext>({
  numVariants: "",
  setVariants: () => {},
  showVariants: true,
  handleShowVariants: () => {},
});

export const VariantContextProvider = ({
  children,
}: VariantContextProviderProps) => {
  const [numVariants, setVariants] = useState("");
  const [showVariants, setShowVariants] = useState(true);

  const handleShowVariants: MouseEventHandler<HTMLImageElement> = () => {
    setShowVariants((pre) => !pre);
  };

  return (
    <VariantContext.Provider
      value={{
        numVariants: numVariants,
        setVariants: setVariants,
        showVariants: showVariants,
        handleShowVariants: handleShowVariants,
      }}
    >
      {children}
    </VariantContext.Provider>
  );
};

export const useVariantContext = () => useContext(VariantContext);

export default VariantContext;
