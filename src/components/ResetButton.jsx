import { resetToDefaultValues } from "../firebase/gameState";

export default function ResetButton() {
  return (
    <button
      onClick={resetToDefaultValues}
      className="bg-red-600 w-50 text-white px-4 py-2 rounded-full hover:bg-red-700 disabled:opacity-60"
    >
        RESET ALL VALUES
    </button>
  );
}
