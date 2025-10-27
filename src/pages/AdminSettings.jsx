import React from "react";
import ResetButton from "../components/ResetButton";
import PhaseChangeButton from "../components/PhaseChangeButton";
import { Shield, Settings2 } from "lucide-react";
import NavbarAdmin from "../components/NavBarAdmin";

export default function AdminSettings() {
  return (
    <div className="min-h-screen bg-linear-to-b from-zinc-950 via-zinc-900 to-black text-white flex flex-col items-center py-20 px-6">
      <NavbarAdmin/>
      <div className="w-full max-w-3xl space-y-12">
        {/* Header */}
        <div className="flex items-center justify-center gap-3">
          <Shield className="w-10 h-10 text-red-500" />
          <h1 className="text-4xl font-bold tracking-tight">
            Admin Control Panel
          </h1>
        </div>

        {/* Card Section */}
        <div className="bg-zinc-900/60 backdrop-blur-xl rounded-2xl shadow-lg border border-zinc-800 p-10 space-y-8">
          <div className="flex items-center gap-3 mb-6">
            <Settings2 className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-semibold text-zinc-200">
              System Settings
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <ResetButton />
            <PhaseChangeButton />
          </div>
        </div>
      </div>
    </div>
  );
}
