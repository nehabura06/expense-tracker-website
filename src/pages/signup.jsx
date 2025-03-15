// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';

// // const Signup = () => {
// //     const [formData, setFormData] = useState({ name: '', email: '', password: '' });
// //     const [error, setError] = useState('');
// //     const navigate = useNavigate();

// //     const handleChange = (e) => {
// //         setFormData({ ...formData, [e.target.name]: e.target.value });
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         setError(""); // Clear previous errors

// //         try {
// //             const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
// //             alert(res.data.msg); // Show success message
// //             navigate('/login'); // Redirect to login after signup
// //         } catch (error) {
// //             setError(error.response?.data?.msg || 'Signup failed. Try again.'); // Prevent crashes
// //         }
// //     };

// //     return (
// //         <div className="signup-container">
// //             <h2>Signup</h2>
// //             {error && <p className="error">{error}</p>}
// //             <form onSubmit={handleSubmit}>
// //                 <input 
// //                     type="text" 
// //                     name="name" 
// //                     placeholder="Name" 
// //                     value={formData.name}
// //                     onChange={handleChange} 
// //                     required 
// //                 />
// //                 <input 
// //                     type="email" 
// //                     name="email" 
// //                     placeholder="Email" 
// //                     value={formData.email}
// //                     onChange={handleChange} 
// //                     required 
// //                 />
// //                 <input 
// //                     type="password" 
// //                     name="password" 
// //                     placeholder="Password" 
// //                     value={formData.password}
// //                     onChange={handleChange} 
// //                     required 
// //                 />
// //                 <button type="submit">Signup</button>
// //             </form>
// //         </div>
// //     );
// // };

// // export default Signup;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Signup = () => {
//     const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false); // Disable button during API call
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(""); // Clear previous errors
//         setLoading(true); // Start loading

//         try {
//             const res = await axios.post(
//                 'http://localhost:5000/api/auth/signup',
//                 formData,
//                 { headers: { "Content-Type": "application/json" } } // Ensure correct headers
//             );

//             alert("Signup successful! Please log in."); // Notify the user
//             navigate('/login'); // Redirect to login after signup
//         } catch (error) {
//             console.error("Signup Error:", error);
//             setError(error.response?.data?.msg || 'Signup failed. Try again.');
//         } finally {
//             setLoading(false); // Stop loading
//         }
//     };

//     return (
//         <div className="signup-container">
//             <h2>Signup</h2>
//             {error && <p className="error">{error}</p>}
//             <form onSubmit={handleSubmit}>
//                 <input 
//                     type="text" 
//                     name="name" 
//                     placeholder="Name" 
//                     value={formData.name}
//                     onChange={handleChange} 
//                     required 
//                 />
//                 <input 
//                     type="email" 
//                     name="email" 
//                     placeholder="Email" 
//                     value={formData.email}
//                     onChange={handleChange} 
//                     required 
//                 />
//                 <input 
//                     type="password" 
//                     name="password" 
//                     placeholder="Password" 
//                     value={formData.password}
//                     onChange={handleChange} 
//                     required 
//                 />
//                 <button type="submit" disabled={loading}>
//                     {loading ? "Signing up..." : "Signup"}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Signup;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import "../styles/signup.css";

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long.");
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post(
                'http://localhost:5000/api/auth/signup',
                formData,
                { headers: { "Content-Type": "application/json" } }
            );

            console.log("Signup Response:", res.data); // Debugging line
            if (res.status === 201 || res.status === 200) {
                setSuccess("Signup successful! You can now login.");
                setFormData({ name: '', email: '', password: '' }); // Clear form
            } else {
                setError("Unexpected response. Please try again.");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            setError(error.response?.data?.msg || 'Signup failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <h2>Signup</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password (min. 6 characters)"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Signing up..." : "Signup"}
                </button>
            </form>

            {/* ✅ Login Button with Text */}
            <p className="login-text">
                Already have an account?{" "}
                <Link to="/login">
                    <button className="login-btn">Login</button>
                </Link>
            </p>
        </div>
    );
};

export default Signup;
