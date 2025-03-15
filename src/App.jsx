// // // import React from 'react';
// // // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // // import Signup from './pages/Signup';
// // // import Login from './pages/Login';
// // // import Dashboard from './pages/Dashboard';

// // // function App() {
// // //     return (
// // //         <Router>
// // //             <Routes>
// // //                 <Route path="/signup" element={<Signup />} />
// // //                 <Route path="/login" element={<Login />} />
// // //                 <Route path="/dashboard" element={<Dashboard />} />
// // //             </Routes>
// // //         </Router>
// // //     );
// // // }

// // // export default App;

// // import React from "react";
// // import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// // import Home from "./pages/home";
// // import Signup from "./pages/Signup";
// // import Login from "./pages/Login";
// // import Dashboard from "./pages/Dashboard";

// // // Protected Route Wrapper
// // // const ProtectedRoute = ({ element }) => {
// // //     const token = localStorage.getItem("token"); // Check if user is logged in
// // //     return token ? element : <Navigate to="/login" replace />;
// // // };
// // <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

// // function App() {
// //   return (
// //       <Router>
// //           <Routes>
// //               <Route path="/" element={<Home />} />  {/* ✅ Homepage Route */}
// //               <Route path="/signup" element={<Signup />} />
// //               <Route path="/login" element={<Login />} />
// //               <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
// //               <Route path="*" element={<Navigate to="/" />} />  {/* ✅ Redirect unknown paths to homepage */}
// //           </Routes>
// //       </Router>
// //   );
// // }

// // export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Home from "./pages/home";
// import Signup from "./pages/signup";
// import Login from "./pages/login";
// import Dashboard from "./pages/dashboard";

// // 🔹 Protected Route Wrapper to Restrict Access
// const ProtectedRoute = ({ element }) => {
//     const token = localStorage.getItem("token"); // Check if user is logged in
//     return token ? element : <Navigate to="/login" replace />;
// };

// function App() {
//   return (
//       <Router>
//           <Routes>
//               <Route path="/" element={<Home />} />  {/* ✅ Homepage Route */}
//               <Route path="/signup" element={<Signup />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
//               <Route path="*" element={<Navigate to="/" />} />  {/* ✅ Redirect unknown paths to homepage */}
//           </Routes>
//       </Router>
//   );
// }

// export default App;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";  // Ensure correct case
import Signup from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";

// Protected Route Wrapper
const ProtectedRoute = ({ element }) => {
    const token = localStorage.getItem("token"); // Check if user is logged in
    return token ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="*" element={<Navigate to="/" />} />
      </Routes>
  );
}

export default App;
