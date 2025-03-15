// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Homepage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="homepage-container">
//       <h1>Welcome to Our Platform</h1>
//       <p>Join us and explore amazing features.</p>
//       <button onClick={() => navigate("/signup")}>Get Started</button>
//     </div>
//   );
// };

// export default Home;

import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";


const Home = () => {  // Renamed Homepage to Home to match the export
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <h1>Welcome to Our Platform</h1>
      <p>Join us and explore amazing features.</p>
      <button onClick={() => navigate("/signup")}>Get Started</button>
    </div>
  );
};

export default Home;  // Matches the component name

