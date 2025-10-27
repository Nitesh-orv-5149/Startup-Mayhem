import { resetToDefaultValues } from "../firebase/gameState";

export default function ResetButton() {
  return (
    <button
      onClick={resetToDefaultValues}
      className="bg-red-500 w-45 h-15 text-white px-4 py-2 rounded-3xl hover:bg-red-700 disabled:opacity-60"
    >
        RESET ALL VALUES
    </button>
  );
}
