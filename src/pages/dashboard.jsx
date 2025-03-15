// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/dashboard.css";

// const Dashboard = () => {
//     const navigate = useNavigate();

//     // Logout function
//     const handleLogout = () => {
//         localStorage.removeItem("token"); // Remove token from local storage
//         navigate("/login"); // Redirect to login page
//     };

//     return (
//         <div className="dashboard-container">
//             <h1>Welcome to Your Dashboard</h1>
//             <p>You are successfully logged in!</p>
//             <button onClick={handleLogout}>Logout</button>
//         </div>
//     );
// };

// export default Dashboard;


import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token from local storage
        navigate("/login"); // Redirect to login page
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Your Dashboard</h1>
                <p className="text-gray-600 mb-6">You are successfully logged in!</p>
                <button 
                    onClick={handleLogout} 
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
