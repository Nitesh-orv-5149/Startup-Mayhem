import React, { useState } from "react";
import Navbar from "../components/NavBar";
import { submitExpectations } from "../firebase/Teamfunctions";
import { useAuth } from "../context/AuthContext";
import { getAuth } from "../firebase/Authfunctions";

const ExpectationForm = () => {
  const { user } = useAuth();
  console.log(user?.userData)
  const [formData, setFormData] = useState({
    startup: "",
    cac: "",
    ltv: "",
    runway: "",
    capitalLeft: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to submit expectations.");
      return;
    }

    setLoading(true);
    try {
      // Send data to Firestore
      await submitExpectations(user?.userData?.id, formData);
      console.log("Submitted Data:", formData);

      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting expectations:", error);
      alert("❌ Failed to submit. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // if phase is not 0 or already submitted, show success message
  const alreadySubmitted = user?.userData?.phase !== 0 || submitted;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#0f0f0f] transition-colors duration-300 font-display p-6">
      <Navbar />
      <div className="w-full max-w-3xl rounded-xl bg-white dark:bg-[#1a1a1a] shadow-2xl p-18">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center">
            Startup Expectations Form
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
            Fill in your startup’s expected CAC, LTV, runway, and other financial details.
          </p>
        </div>

        {alreadySubmitted ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-2">
              ✅ Submission Successful!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Thank you for submitting your expectations.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Startup Name */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Startup Name
              </label>
              <input
                type="text"
                name="startup"
                value={formData.startup}
                onChange={handleChange}
                placeholder="Enter your startup name (in CAPS)"
                required
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121212] h-14 pl-4 text-base text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* CAC Expected */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                CAC (Expected)
              </label>
              <input
                type="number"
                name="cac"
                value={formData.cac}
                onChange={handleChange}
                placeholder="Enter expected Customer Acquisition Cost"
                required
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121212] h-14 pl-4 text-base text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* LTV Expected */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                LTV (Expected)
              </label>
              <input
                type="number"
                name="ltv"
                value={formData.ltv}
                onChange={handleChange}
                placeholder="Enter expected Lifetime Value"
                required
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121212] h-14 pl-4 text-base text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Runway */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Runway
              </label>
              <input
                type="number"
                name="runway"
                value={formData.runway}
                onChange={handleChange}
                placeholder="e.g., 12"
                required
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121212] h-14 pl-4 text-base text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Capital Left */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Final Capital
              </label>
              <input
                type="number"
                name="capitalLeft"
                value={formData.capitalLeft}
                onChange={handleChange}
                placeholder="Enter capital left (in ₹M)"
                required
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121212] h-14 pl-4 text-base text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`h-14 rounded-lg text-white text-base font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Submitting..." : "Submit Expectations"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ExpectationForm;
