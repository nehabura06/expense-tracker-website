import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Overall Budget");
  const [budget, setBudget] = useState("");
  const [overallBudget, setOverallBudget] = useState(0); // State to store overall budget


  // const categories = [
  //   "Overall Budget", "Food", "Transport", "Entertainment", "Education", "Housing", "Health"
  // ].map(c => c.trim()); // Ensure consistent category names

  const categories = [
    "Overall Budget", "Food", "Transport", "Entertainment", "Education", "Housing", "Health"
  ];

  // // Fetch overall budget when the component mounts
  // useEffect(() => {
  //   const fetchOverallBudget = async () => {
  //     try {
  //       let token = localStorage.getItem("token");
  //       if (!token) {
  //         navigate("/login");
  //         return;
  //       }

  //       if (!token.startsWith("Bearer ")) {
  //         token = `Bearer ${token}`;
  //       }

  //       const response = await axios.get("http://localhost:5000/api/budget/overall", {
  //         headers: { Authorization: token },
  //       });

  //       if (response.data) {
  //         setOverallBudget(response.data.budgetAmount); // Update state with fetched budget
  //       }
  //     } catch (error) {
  //       console.error("Error fetching overall budget:", error?.response?.data || error.message);
  //     }
  //   };

  //   fetchOverallBudget();
  // }, [navigate]); // Runs once when the component mounts


  const fetchOverallBudget = async () => {
    try {
      let token = localStorage.getItem("token");
      if (!token) {
        // alert("User not found. Please login again.");
        // navigate("/login");
        return;
      }
      if (!token.startsWith("Bearer ")) {
        token = `Bearer ${token}`;
      }

      const response = await axios.get("http://localhost:5000/api/budget/overall", {
        headers: { Authorization: token }
      });

      setOverallBudget(response.data.budgetAmount || 0);
    } catch (error) {
      console.error("Error fetching overall budget:", error);
      setOverallBudget(0); // Default if fetch fails
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not found. Please login again.");
      navigate("/login");
      return;
    }
    fetchOverallBudget();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSaveBudget = async () => {
    try {
      let token = localStorage.getItem("token");

      if (!token) {
        alert("User not found. Please login again.");
        navigate("/login");
        return;
      }
      if (!token.startsWith("Bearer ")) {
        token = `Bearer ${token}`; // Ensure correct format
      }

      console.log("Token being sent:", token); // Debugging


      if (!budget || isNaN(budget) || Number(budget) <= 0) {
        alert("Please enter a valid budget amount.");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/budget/set",
        {
          category: selectedCategory,
          budgetAmount: Number(budget),
        },
        {
          // headers: { Authorization: `Bearer ${token}` },
          headers: { Authorization: token }  // Ensure correct format

        }
      );

      setIsModalOpen(false);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
      setBudget(""); // Reset input after saving
      if (selectedCategory === "Overall Budget") {
        fetchOverallBudget(); // Refresh overall budget after saving
      }
    } catch (error) {
      console.log("Full error response:", error.response); // <--- ADD THIS LINE
      console.error("Error saving budget:", error?.response?.data || error.message);
      // alert(error?.response?.data?.message || "Error saving budget! Please try again.");
      if (error.response) {
        alert(error.response.data.message || "Error saving budget! Please try again.");
      } else {
        alert("Server not reachable. Please check your connection.");
      }
    }
  };

  const handleBudgetChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setBudget(value);
    // const value = e.target.value.replace(/^0+(?=\d)/, "");
    // setBudget(value.replace(/\D/g, ""));
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-6 ${isModalOpen ? 'bg-white bg-opacity-40 backdrop-blur-lg' : 'bg-gray-100'}`}>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center relative">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Your Dashboard</h1>
        <p className="text-gray-600 mb-6">You are successfully logged in!</p>
        {/* Display Overall Budget */}
        <div className="bg-green-100 p-4 rounded-lg shadow-md mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Monthly Budget</h3>
          <p className="text-2xl font-bold text-green-600">₹{overallBudget}</p>
        </div>
        <div className="flex gap-4 justify-center">
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md">Set Budget</button>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-md">Logout</button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <div className="bg-white p-10 rounded-2xl shadow-lg max-w-lg w-full relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-800 text-2xl">&times;</button>
            <h2 className="text-2xl font-bold mb-4">Set Monthly Budget</h2>

            {/* Category Dropdown */}
            <label className="block font-semibold mb-2">Category</label>
            <select className="w-full border-2 p-3 rounded-md" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>

            {/* Budget Input Field */}
            <label className="block mt-4 font-semibold">Monthly Budget</label>
            <div className="relative flex items-center border-2 rounded-md p-2">
              <span className="text-gray-500 text-lg px-2">₹</span>
              <input
                type="text"
                className="w-full outline-none"
                value={budget}
                onChange={handleBudgetChange}
                placeholder="Enter amount"
              />
            </div>

            {/* Save Budget Button */}
            <button onClick={handleSaveBudget} className="w-full mt-6 bg-purple-600 text-white py-2 rounded-lg font-semibold">Save Budget</button>
          </div>
        </div>
      )}

      {showMessage && (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg">Budget saved successfully!</div>
      )}
    </div>
  );
};

export default Dashboard;
