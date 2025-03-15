import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token from local storage
        navigate("/signup"); // Redirect to login page
    };

    return (
        <div className="dashboard-container">
            <h1>Welcome to Your Dashboard</h1>
            <p>You are successfully logged in!</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
