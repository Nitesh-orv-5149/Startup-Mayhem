import { useState } from "react";
import { getAuth } from "../firebase/Authfunctions";

export default function LoginPage() {
  const [startup, setStartup] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const result = await getAuth(startup.trim(), password);
    setMessage(result.message);
    setLoading(false);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gray-100 dark:bg-[#0f0f0f] transition-colors duration-300 font-display">
      <div className="flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-5xl overflow-hidden rounded-xl bg-white dark:bg-[#1a1a1a] shadow-2xl flex flex-col md:grid md:grid-cols-2 transition-all duration-300">

          {/* LEFT SECTION */}
          <div className="flex flex-col justify-center items-center md:items-start p-8 sm:p-10 lg:p-12 bg-gray-50 dark:bg-[#141414] text-center md:text-left order-1 md:order-none">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white">
                
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Startup Mayhem
              </p>
            </div>
            <h1 className="text-gray-800 dark:text-gray-100 tracking-tight text-[26px] sm:text-[30px] md:text-[32px] font-bold leading-tight">
              Powering the next generation of startups.
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Join a community of innovators and builders. Your journey to change
              the world starts here.
            </p>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12 bg-white dark:bg-[#1a1a1a]">
            <div className="mb-6">
              <p className="text-gray-900 dark:text-gray-100 text-3xl sm:text-4xl font-black leading-tight tracking-[-0.03em] text-center md:text-left">
                Welcome Back
              </p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-6">
              {/* Startup name */}
              <label className="flex flex-col">
                <p className="text-gray-700 dark:text-gray-300 text-base font-medium pb-2">
                  Startup Name
                </p>
                <div className="relative flex items-center">
                  
                  <input
                    type="text"
                    placeholder="Enter your startup name"
                    value={startup}
                    onChange={(e) => setStartup(e.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121212] h-14 pl-12 p-[15px] text-base text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </label>

              {/* Password */}
              <label className="flex flex-col">
                <p className="text-gray-700 dark:text-gray-300 text-base font-medium pb-2">
                  Password
                </p>
                <div className="relative flex items-center">
                  
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121212] h-14 pl-12 p-[15px] text-base text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex h-14 w-full items-center justify-center rounded-lg bg-indigo-600 text-base font-bold text-white transition-all duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-[#1a1a1a] mt-2"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>

            {/* Message */}
            {message && (
              <p
                className={`mt-4 text-center font-medium text-sm sm:text-base ${
                  message.includes("successful")
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
