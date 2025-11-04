import { createContext, useContext, useState } from "react";

const OCRContext = createContext(null);

export const OCRProvider = ({ children }) => {
  const [ocrText, setOCRText] = useState("(No text yet)");

  return (
    <OCRContext.Provider value={{ ocrText, setOCRText }}>
      {children}
    </OCRContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useOCR = () => {
  return useContext(OCRContext);
};
