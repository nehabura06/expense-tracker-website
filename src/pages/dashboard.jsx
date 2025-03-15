// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//     const navigate = useNavigate();
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     // Logout function
//     const handleLogout = () => {
//         localStorage.removeItem("token"); // Remove token from local storage
//         navigate("/login"); // Redirect to login page
//     };

//     return (
//         <div className={`flex flex-col items-center justify-center min-h-screen p-6 ${isModalOpen ? 'bg-white bg-opacity-40 backdrop-blur-lg' : 'bg-gray-100'}`}>
//             <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center relative">
//                 <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Your Dashboard</h1>
//                 <p className="text-gray-600 mb-6">You are successfully logged in!</p>
//                 <div className="flex gap-4 justify-center">
//                     <button 
//                         onClick={() => setIsModalOpen(true)}
//                         className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
//                     >
//                         Set Budget
//                     </button>
//                     <button 
//                         onClick={handleLogout} 
//                         className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
//                     >
//                         Logout
//                     </button>
//                 </div>
//             </div>
            
//             {/* Budget Modal */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
//                     <div className="bg-white p-10 rounded-2xl shadow-lg max-w-lg w-full relative">
//                         <button
//                             onClick={() => setIsModalOpen(false)}
//                             className="absolute top-4 right-4 text-gray-800 text-2xl font-bold hover:text-gray-500 transition duration-300"
//                         >
//                             &times;
//                         </button>
//                         <h2 className="text-2xl font-bold text-gray-800 mb-4">Set Monthly Budget</h2>
//                         <p className="text-gray-600 mb-6">Set a budget for each category to help manage your expenses.</p>
                        
//                         <label className="block text-gray-700 font-semibold mb-2">Category</label>
//                         <select className="w-full border-2 border-red-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500 mb-4">
//                             <option>Overall Budget</option>
//                         </select>
                        
//                         <label className="block text-gray-700 font-semibold mb-2">Monthly Budget</label>
//                         <input 
//                             type="text" 
//                             className="w-full border-2 border-gray-300 rounded-md p-3 mb-4" 
//                             defaultValue="$500"
//                         />
                        
//                         <div className="flex items-center justify-between mb-6">
//                             <span className="text-gray-600">$0</span>
//                             <input type="range" className="w-full mx-2" min="0" max="2000" step="100" defaultValue="500" />
//                             <span className="text-red-600 font-bold">$500</span>
//                         </div>
                        
//                         <div className="flex justify-end mt-6">
//                             <button 
//                                 onClick={() => setIsModalOpen(false)}
//                                 className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
//                             >
//                                 Save Budget
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Dashboard;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token from local storage
        navigate("/login"); // Redirect to login page
    };

    const handleSaveBudget = () => {
        setIsModalOpen(false);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
    };

    return (
        <div className={`flex flex-col items-center justify-center min-h-screen p-6 ${isModalOpen ? 'bg-white bg-opacity-40 backdrop-blur-lg' : 'bg-gray-100'}`}>
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center relative">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Your Dashboard</h1>
                <p className="text-gray-600 mb-6">You are successfully logged in!</p>
                <div className="flex gap-4 justify-center">
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
                    >
                        Set Budget
                    </button>
                    <button 
                        onClick={handleLogout} 
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
                    >
                        Logout
                    </button>
                </div>
            </div>
            
            {/* Budget Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
                    <div className="bg-white p-10 rounded-2xl shadow-lg max-w-lg w-full relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-800 text-2xl font-bold hover:text-gray-500 transition duration-300"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Set Monthly Budget</h2>
                        <p className="text-gray-600 mb-6">Set a budget for each category to help manage your expenses.</p>
                        
                        <label className="block text-gray-700 font-semibold mb-2">Category</label>
                        <select className="w-full border-2 border-purple-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4">
                            <option>Overall Budget</option>
                        </select>
                        
                        <label className="block text-gray-700 font-semibold mb-2">Monthly Budget</label>
                        <input 
                            type="text" 
                            className="w-full border-2 border-gray-300 rounded-md p-3 mb-4" 
                            defaultValue="$500"
                        />
                        
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-gray-600">$0</span>
                            <input type="range" className="w-full mx-2" min="0" max="2000" step="100" defaultValue="500" />
                            <span className="text-purple-600 font-bold">$500</span>
                        </div>
                        
                        <div className="flex justify-end mt-6">
                            <button 
                                onClick={handleSaveBudget}
                                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-8 rounded-md transition duration-300"
                            >
                                Save Budget
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Success Message */}
            {showMessage && (
                <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg">
                    Budget saved successfully!
                </div>
            )}
        </div>
    );
};

export default Dashboard;
