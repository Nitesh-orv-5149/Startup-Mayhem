import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // your AuthContext
import { getAuth } from "../firebase/Authfunctions"; // your Firebase auth function
import { useNavigate } from "react-router-dom";

const AdminApp = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth(); // Context state
  const [startup, setStartup] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState("teamOwnership");
  const [darkMode, setDarkMode] = useState(false);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    // Firebase authentication function
    const result = await getAuth(startup.trim(), password);
    setMessage(result.message);
    setLoading(false);

    if (result.success) {
      const loggedUser = { loggedInStartup: startup, isAdmin: result.isAdmin };
      localStorage.setItem("user", JSON.stringify(loggedUser));
      setUser(loggedUser);
      navigate("/"); // works correctly now
    }

  };

  // Example team cards data
  const teamCards = [
    { team: "Innovate Inc.", card: "Velocity Card", type: "Premium", date: "2023-10-26", status: "Active" },
    { team: "Synergy Solutions", card: "DataStream Card", type: "Analytics", date: "2023-09-15", status: "Active" },
    { team: "Quantum Leap", card: "Momentum Card", type: "Standard", date: "2022-11-01", status: "Expired" },
    { team: "Future Forward", card: "Velocity Card", type: "Premium", date: "2023-10-05", status: "Expiring Soon" },
    { team: "Apex Innovations", card: "Momentum Card", type: "Standard", date: "2023-08-20", status: "Active" },
  ];

  const statusStyles = {
    "Active": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    "Expired": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    "Expiring Soon": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  };

  // If user is not logged in, show Login page
  if (!user) {
    return (
      <div className="relative flex min-h-screen w-full flex-col bg-gray-100 dark:bg-[#0f0f0f] transition-colors duration-300 font-display">
        <div className="flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-5xl overflow-hidden rounded-xl bg-white dark:bg-[#1a1a1a] shadow-2xl flex flex-col md:grid md:grid-cols-2 transition-all duration-300">

            {/* LEFT SECTION */}
            <div className="flex flex-col justify-center items-center md:items-start p-8 sm:p-10 lg:p-12 bg-gray-50 dark:bg-[#141414] text-center md:text-left order-1 md:order-none">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white"></div>
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

            {/* RIGHT SECTION - Login Form */}
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12 bg-white dark:bg-[#1a1a1a]">
              <div className="mb-6">
                <p className="text-gray-900 dark:text-gray-100 text-3xl sm:text-4xl font-black leading-tight tracking-[-0.03em] text-center md:text-left">
                  Welcome Back
                </p>
              </div>

              <form onSubmit={handleLogin} className="flex flex-col gap-6">
                <label className="flex flex-col">
                  <p className="text-gray-700 dark:text-gray-300 text-base font-medium pb-2">
                    Startup Name
                  </p>
                  <input
                    type="text"
                    placeholder="Enter your startup name"
                    value={startup}
                    onChange={(e) => setStartup(e.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121212] h-14 pl-4 text-base text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </label>

                <label className="flex flex-col">
                  <p className="text-gray-700 dark:text-gray-300 text-base font-medium pb-2">
                    Password
                  </p>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121212] h-14 pl-4 text-base text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-14 w-full items-center justify-center rounded-lg bg-indigo-600 text-base font-bold text-white transition-all duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-[#1a1a1a]"
                >
                  {loading ? "Logging in..." : "Log In"}
                </button>
              </form>

              {message && (
                <p
                  className={`mt-4 text-center font-medium text-sm sm:text-base ${
                    message.includes("successful") ? "text-green-600" : "text-red-500"
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

  // User is logged in -> show Admin Dashboard
  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="flex min-h-screen w-full bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-200">
        {/* Sidebar */}
        <aside className="flex flex-col w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark p-4">
          <div className="flex flex-col gap-4 h-full">
            <div className="flex items-center gap-3 px-3">
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 h-10" 
                   style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCwVfYq6FLxQzxbUyJNmlTT6bVeQjSYSMZyV9vzbMHBSU5rl_hy7fPXtP40Wt6Fz0WiQGmHs-vCnefL4q_WVQJsFO7kDKXL7leYuBC7gO1ifnQdFyImXNOxjpmhQCxU12ZuffOkqGmL9J9ZC-g53Kaa_HVdnIxp2Nf6YF05HifE947ICXmcD-znvYfow_ESUUrbBGY1oZat3F28oJ1DOw2BgZfHKAwBz4HVyyM0geXLtw9kPgvUV1JdyYK9474MF5k_mUdqcVKHkOU")'}}></div>
              <div className="flex flex-col">
                <h1 className="text-base font-medium text-slate-900 dark:text-slate-50">Admin Panel</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">{user.loggedInStartup}</p>
              </div>
            </div>

            <nav className="flex flex-col gap-2 mt-4">
              <button
                onClick={() => setActivePage("teamOwnership")}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg w-full text-left ${
                  activePage === "teamOwnership" ? "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary" : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <span className="material-symbols-outlined fill">group</span>
                <p className="text-sm font-medium">Team Card Ownership</p>
              </button>
              <button
                onClick={() => setActivePage("availableCards")}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg w-full text-left ${
                  activePage === "availableCards" ? "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary" : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <span className="material-symbols-outlined">credit_card</span>
                <p className="text-sm font-medium">Available Cards</p>
              </button>
            </nav>

            <div className="mt-auto">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg w-full text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <span className="material-symbols-outlined">{darkMode ? "light_mode" : "dark_mode"}</span>
                <p className="text-sm font-medium">{darkMode ? "Light Mode" : "Dark Mode"}</p>
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  setUser(null);
                }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg w-full text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 mt-2"
              >
                <span className="material-symbols-outlined">logout</span>
                <p className="text-sm font-medium">Logout</p>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col p-8">
          <div className="w-full max-w-7xl mx-auto">
            {activePage === "teamOwnership" && (
              <>
                <div className="flex flex-col gap-1 mb-6">
                  <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">Team Card Ownership</p>
                  <p className="text-base text-slate-500 dark:text-slate-400">Manage and view which teams have purchased which cards.</p>
                </div>

                <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
                      <thead className="text-xs text-slate-700 dark:text-slate-300 uppercase bg-slate-50 dark:bg-slate-800">
                        <tr>
                          <th className="px-6 py-3 font-medium">Team Name</th>
                          <th className="px-6 py-3 font-medium">Card Name</th>
                          <th className="px-6 py-3 font-medium">Card Type</th>
                          <th className="px-6 py-3 font-medium">Date Purchased</th>
                          <th className="px-6 py-3 font-medium">Status</th>
                          <th className="px-6 py-3 font-medium"><span className="sr-only">Actions</span></th>
                        </tr>
                      </thead>
                      <tbody>
                        {teamCards.map((item, idx) => (
                          <tr key={idx} className="bg-white dark:bg-slate-900 border-b dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap"><a className="hover:text-primary" href="#">{item.team}</a></td>
                            <td className="px-6 py-4"><a className="hover:text-primary" href="#">{item.card}</a></td>
                            <td className="px-6 py-4">{item.type}</td>
                            <td className="px-6 py-4">{item.date}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[item.status]}`}>{item.status}</span>
                            </td>
                            <td className="px-6 py-4 text-right"><a className="font-medium text-primary hover:underline" href="#">Edit</a></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {activePage === "availableCards" && (
              <div>
                <p className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4">Available Cards</p>
                <p className="text-base text-slate-500 dark:text-slate-400 mb-6">Summary of available cards by team.</p>
                {/* You can add Available Cards table or grid here */}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminApp;
