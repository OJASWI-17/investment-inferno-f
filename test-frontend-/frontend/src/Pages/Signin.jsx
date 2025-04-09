// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "../components/Button";
// import Heading from "../components/Heading";
// import InputComponent from "../components/InputComponent";
// import BG from "../assets/BgInferno.svg";

// const SIGNIN_URL = import.meta.env.VITE_SIGNIN;
// const VERIFY_OTP_URL = import.meta.env.VITE_OTP;

// export default function Signin() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState(""); // ✅ OTP state
//   const [error, setError] = useState(null);
//   const [otpSent, setOtpSent] = useState(false); // ✅ Track OTP sent status
//   const [resendDisabled, setResendDisabled] = useState(false); // ✅ Track resend cooldown
//   const [resendTimer, setResendTimer] = useState(30); // ✅ Resend timer countdown

//   const handleSubmit = async () => {
//     setError(null);
//     console.log("Login attempt with:", username);
    
//     // Basic validation
//     if (!username || !password) {
//       setError("Username and password are required");
//       return;
//     }
  
//     try {
//       const response = await fetch(`${SIGNIN_URL}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ 
//           username, 
//           password 
//         }),
//       });
  
//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.error || "Login failed. Please try again.");
//       }
  
//       setOtpSent(true);
//       startResendTimer();
//       // Don't alert - show in UI instead
//       setError("OTP sent to your registered email"); // Success message
      
//     } catch (err) {
//       console.error("Login error:", err);
//       setError(err.message || "An error occurred during login");
//     }
//   };
  
//   const handleOtpVerification = async () => {
//     if (!otp || otp.length !== 6) {
//       setError("Please enter a valid 6-digit OTP");
//       return;
//     }
  
//     try {
//       const response = await fetch(`${VERIFY_OTP_URL}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username,
//           useotp: otp
//         }),
//       });
  
//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.error || "OTP verification failed");
//       }
  
//       // Secure token handling
//       if (data.token) {
//         // Store token securely (consider httpOnly cookies in production)
//         localStorage.setItem("jwt_token", data.token);
        
//         // Add to axios/default headers if using
        
//         // Redirect to dashboard
//         navigate("/landing", { 
//           state: { freshLogin: true }, 
//           replace: true 
//         });
//       } else {
//         throw new Error("Authentication token missing");
//       }
      
//     } catch (err) {
//       console.error("OTP verification error:", err);
//       setError(err.message || "Could not verify OTP");
      
//       // Clear OTP field on failure
//       setOtp("");
//     }
//   };

//   const handleResendOtp = async () => {
//     setError(null);
//     setResendDisabled(true);
//     startResendTimer();
    
//     try {
//       const response = await fetch(`${SIGNIN_URL}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ 
//           username, 
//           password 
//         }),
//       });
  
//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.error || "Failed to resend OTP");
//       }
  
//       setError("New OTP sent to your registered email");
      
//     } catch (err) {
//       console.error("Resend OTP error:", err);
//       setError(err.message || "An error occurred while resending OTP");
//       setResendDisabled(false);
//     }
//   };

//   const startResendTimer = () => {
//     setResendTimer(30);
//     const timer = setInterval(() => {
//       setResendTimer((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           setResendDisabled(false);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };
  
//   return (
//     <div
//       className="flex items-center justify-center min-h-screen bg-cover"
//       style={{ backgroundImage: `url(${BG})` }}
//     >
//       <div className="bg-gray-900 bg-opacity-90 p-8 rounded-lg shadow-lg text-center w-96 backdrop-blur-sm">
//         <Heading heading="Sign In" className="text-white" />
//         {error && <p className="text-red-500">{error}</p>}
//         <div className="mt-4 space-y-4 flex flex-col items-center">
//           <div className="w-full">
//             <label className="block text-gray-300 font-medium mb-1 text-left">
//               Username
//             </label>
//             <InputComponent
//               type="text"
//               placeholder="Enter your username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 w-full"
//             />
//           </div>

//           <div className="w-full">
//             <label className="block text-gray-300 font-medium mb-1 text-left">
//               Email ID
//             </label>
//             <InputComponent
//               type="text"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 w-full"
//             />
//           </div>

//           <div className="w-full">
//             <label className="block text-gray-300 font-medium mb-1 text-left">
//               Password
//             </label>
//             <InputComponent
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 w-full"
//             />
//           </div>

//           {!otpSent && (
//             <Button
//               text="Submit"
//               onClick={handleSubmit}
//               className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             />
//           )}

//           {otpSent && (
//             <>
//               <div className="w-full">
//                 <label className="block text-gray-300 font-medium mb-1 text-left">
//                   Enter OTP
//                 </label>
//                 <InputComponent
//                   type="text"
//                   placeholder="Enter the OTP sent to your email"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   className="bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 w-full"
//                 />
//               </div>
//               <div className="flex space-x-4 w-full">
//                 <Button
//                   text="Verify OTP"
//                   onClick={handleOtpVerification}
//                   className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex-1"
//                 />
//                 <Button
//                   text={resendDisabled ? `Resend (${resendTimer}s)` : "Resend OTP"}
//                   onClick={handleResendOtp}
//                   disabled={resendDisabled}
//                   className={`mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex-1 ${
//                     resendDisabled ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                 />
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputComponent from "../components/InputComponent";
import BG from "../assets/BgInferno.svg";

const SIGNIN_URL = import.meta.env.VITE_SIGNIN;
const VERIFY_OTP_URL = import.meta.env.VITE_OTP;

export default function Signin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(""); // ✅ OTP state
  const [error, setError] = useState(null);
  const [otpSent, setOtpSent] = useState(false); // ✅ Track OTP sent status
  const [resendDisabled, setResendDisabled] = useState(false); // ✅ Track resend cooldown
  const [resendTimer, setResendTimer] = useState(30); // ✅ Resend timer countdown

  // Check if the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      // Optionally, validate the token with the server here
      navigate("/landing", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async () => {
    setError(null);
    console.log("Login attempt with:", username);

    // Basic validation
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    try {
      const response = await fetch(`${SIGNIN_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed. Please try again.");
      }

      setOtpSent(true);
      startResendTimer();
      setError("OTP sent to your registered email"); // Success message
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "An error occurred during login");
    }
  };

  const handleOtpVerification = async () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const response = await fetch(`${VERIFY_OTP_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          useotp: otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "OTP verification failed");
      }

      // Secure token handling
      if (data.token) {
        // Store token securely (consider httpOnly cookies in production)
        localStorage.setItem("jwt_token", data.token);

        // Redirect to dashboard
        navigate("/landing", {
          state: { freshLogin: true },
          replace: true,
        });
      } else {
        throw new Error("Authentication token missing");
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      setError(err.message || "Could not verify OTP");

      // Clear OTP field on failure
      setOtp("");
    }
  };

  const handleResendOtp = async () => {
    setError(null);
    setResendDisabled(true);
    startResendTimer();

    try {
      const response = await fetch(`${SIGNIN_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to resend OTP");
      }

      setError("New OTP sent to your registered email");
    } catch (err) {
      console.error("Resend OTP error:", err);
      setError(err.message || "An error occurred while resending OTP");
      setResendDisabled(false);
    }
  };

  const startResendTimer = () => {
    setResendTimer(30);
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover"
      style={{ backgroundImage: `url(${BG})` }}
    >
      <div className="bg-gray-900 bg-opacity-90 p-8 rounded-lg shadow-lg text-center w-96 backdrop-blur-sm">
        <Heading heading="Sign In" className="text-white" />
        {error && <p className="text-red-500">{error}</p>}
        <div className="mt-4 space-y-4 flex flex-col items-center">
          <div className="w-full">
            <label className="block text-gray-300 font-medium mb-1 text-left">
              Username
            </label>
            <InputComponent
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 w-full"
            />
          </div>

          <div className="w-full">
            <label className="block text-gray-300 font-medium mb-1 text-left">
              Email ID
            </label>
            <InputComponent
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 w-full"
            />
          </div>

          <div className="w-full">
            <label className="block text-gray-300 font-medium mb-1 text-left">
              Password
            </label>
            <InputComponent
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 w-full"
            />
          </div>

          {!otpSent && (
            <Button
              text="Submit"
              onClick={handleSubmit}
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
          )}

          {otpSent && (
            <>
              <div className="w-full">
                <label className="block text-gray-300 font-medium mb-1 text-left">
                  Enter OTP
                </label>
                <InputComponent
                  type="text"
                  placeholder="Enter the OTP sent to your email"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 w-full"
                />
              </div>
              <div className="flex space-x-4 w-full">
                <Button
                  text="Verify OTP"
                  onClick={handleOtpVerification}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex-1"
                />
                <Button
                  text={resendDisabled ? `Resend (${resendTimer}s)` : "Resend OTP"}
                  onClick={handleResendOtp}
                  disabled={resendDisabled}
                  className={`mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex-1 ${
                    resendDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}