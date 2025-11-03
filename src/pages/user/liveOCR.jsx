import { useEffect, useRef, useState } from "react";
import { createWorker } from "tesseract.js";
import { useOCR } from "./OCRContext"; // keep this if using context

const LiveOCR = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [text, setText] = useState("Initializing OCR...");
  const { setOCRText } = useOCR(); // remove if not using context

  useEffect(() => {
    let worker;
    let stream;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setText("Camera access denied: " + err.message);
      }
    };

    const startOCR = async () => {
      worker = await createWorker("eng");
      setText("Ready. Extracting text...");
      captureLoop();
    };

    const captureLoop = async () => {
      if (!canvasRef.current || !videoRef.current) return;
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      const imageData = canvasRef.current.toDataURL("image/png");
      const { data: { text } } = await worker.recognize(imageData);

      const result = text.trim() || "(No text detected)";
      setText(result);
      setOCRText(result); // ✅ share globally across routes

      setTimeout(captureLoop, 2000);
    };

    startCamera().then(startOCR);

    return () => {
      if (stream) stream.getTracks().forEach((track) => track.stop());
      if (worker) worker.terminate();
    };
  }, [setOCRText]);

  return (
    <div className="text-white flex flex-col items-center w-full">
      <h1>Live OCR with Tesseract.js</h1>

      <video ref={videoRef} autoPlay width={400} height={300}></video>

      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        style={{ display: "none" }}
      />

      <div
        style={{
          marginTop: "20px",
          fontSize: "1.2em",
          background: "#222",
          color: "white",
          padding: "10px",
          borderRadius: "10px",
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
          whiteSpace: "pre-wrap",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default LiveOCR;
