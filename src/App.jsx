import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";  // Ensure correct case
import Signup from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import BudgetPage from "./pages/budgetPage";
// import jwtDecode from 'jwt-decode';

// // Token validation
// const isTokenValid = () => {
//     const token = localStorage.getItem("token");
//     if (!token) return false;
//     try {
//       const decoded = jwtDecode(token);
//       return decoded.exp * 1000 > Date.now();
//     } catch (error) {
//       console.error("Invalid token:", error);
//       return false;
//     }
//   };

const ProtectedRoute = ({ element }) => {
    const token = localStorage.getItem("token");
    if (token === null) {
        console.warn("No token found, redirecting to login...");
        return <Navigate to="/login" replace />;
    }
    return element;
};
function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/budgetPage" element={<ProtectedRoute element={<BudgetPage />} />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default App;
