// import React from "react";
// import ReactDOM from "react-dom/client";
// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// // import Home from "./pages/home";
// // import Signup from "./pages/signup";
// // import Login from "./pages/login";
// // import Dashboard from "./pages/dashboard"; // Import dashboard
// import "./index.css"; // Ensure styles are loaded

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       {/* <Routes>
//         <Route path="/" element={<App />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes> */}
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css"; // Ensure styles are loaded

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
