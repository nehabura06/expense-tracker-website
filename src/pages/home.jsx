// // // import React from "react";
// // // import { useNavigate } from "react-router-dom";

// // // const Homepage = () => {
// // //   const navigate = useNavigate();

// // //   return (
// // //     <div className="homepage-container">
// // //       <h1>Welcome to Our Platform</h1>
// // //       <p>Join us and explore amazing features.</p>
// // //       <button onClick={() => navigate("/signup")}>Get Started</button>
// // //     </div>
// // //   );
// // // };

// // // export default Home;

// // import React from "react";
// // import { useNavigate } from "react-router-dom";
// // import "../styles/home.css";


// // const Home = () => {  // Renamed Homepage to Home to match the export
// //   const navigate = useNavigate();

// //   return (
// //     <div className="homepage-container">
// //       <h1>Welcome to Our Platform</h1>
// //       <p>Join us and explore amazing features.</p>
// //       <button onClick={() => navigate("/signup")}>Get Started</button>
// //     </div>
// //   );
// // };

// // export default Home;  // Matches the component name


// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6">
//       <div className="bg-white text-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full text-center">
//         <h1 className="text-3xl font-bold mb-4">Welcome to Our Platform</h1>
//         <p className="text-gray-600 mb-6">Join us and explore amazing features.</p>
//         <button 
//           onClick={() => navigate("/signup")} 
//           className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
//         >
//           Get Started
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Our Platform</h1>
        <p className="text-gray-600 mb-6">Join us and explore amazing features.</p>
        <button 
          onClick={() => navigate("/signup")} 
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
