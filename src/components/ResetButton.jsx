import { useState } from "react";
import { resetToDefaultValues } from "../firebase/gameState";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

export default function ResetButton() {
  const [status, setStatus] = useState("idle"); 
  // "idle" | "loading" | "success" | "error"

  const handleReset = async () => {
    setStatus("loading");
    try {
      await resetToDefaultValues();
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2000); // auto-reset after 2s
    } catch (err) {
      console.error("Reset failed:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const getButtonContent = () => {
    switch (status) {
      case "loading":
        return (
          <>
            <Loader2 className="animate-spin mr-2" size={18} /> Resetting...
          </>
        );
      case "success":
        return (
          <>
            <CheckCircle2 className="text-green-400 mr-2" size={18} /> Reset Complete
          </>
        );
      case "error":
        return (
          <>
            <XCircle className="text-red-400 mr-2" size={18} /> Failed
          </>
        );
      default:
        return "RESET ALL VALUES";
    }
  };

  return (
    <button
      onClick={handleReset}
      disabled={status === "loading"}
      className={`flex items-center justify-center gap-2 text-white font-semibold px-5 rounded-4xl transition-all
        ${
          status === "loading"
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-700"
        }
      `}
    >
      {getButtonContent()}
    </button>
  );
}
