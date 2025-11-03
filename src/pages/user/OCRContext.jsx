import { createContext, useContext, useState } from "react";

const OCRContext = createContext<any>(null);

export const OCRProvider = ({ children }) => {
  const [ocrText, setOCRText] = useState("(No text yet)");

  return (
    <OCRContext.Provider value={{ ocrText, setOCRText }}>
      {children}
    </OCRContext.Provider>
  );
};

export const useOCR = () => useContext(OCRContext);
