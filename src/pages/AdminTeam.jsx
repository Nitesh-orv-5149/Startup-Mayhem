import { useState } from "react";

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("teamOwnership"); // default page
  const [darkMode, setDarkMode] = useState(false);

  // Example data
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
                <p className="text-sm text-slate-500 dark:text-slate-400">Startup Inc.</p>
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
              <button className="flex items-center gap-3 px-3 py-2 rounded-lg w-full text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 mt-2">
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

                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <button className="flex h-9 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3">
                    <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">Filter by Team</p>
                    <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-base">expand_more</span>
                  </button>
                  <button className="flex h-9 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3">
                    <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">Filter by Card Type</p>
                    <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-base">expand_more</span>
                  </button>
                  <div className="w-72">
                    <label className="flex flex-col">
                      <div className="flex w-full flex-1 items-stretch rounded-lg h-9">
                        <div className="flex border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 items-center justify-center pl-3 rounded-l-lg border-r-0 text-slate-500 dark:text-slate-400">
                          <span className="material-symbols-outlined text-xl">search</span>
                        </div>
                        <input className="form-input flex w-full min-w-0 flex-1 rounded-r-lg text-slate-900 dark:text-slate-50 h-full pl-2 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-0 focus:ring-2 focus:ring-primary/50" placeholder="Search by team or card..." />
                      </div>
                    </label>
                  </div>
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
                {/* You can insert Available Cards grid here (similar to your first page JSX) */}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
