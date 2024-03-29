import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const clientId =
  "563475264993-iungtfd9jc876mcg2550b79ipi0kfekb.apps.googleusercontent.com";

export function Login() {
  const navigate = useNavigate();

  const loginSuccess = (tokenResponse) => {
    console.log(tokenResponse);
    axios
      // http://localhost:5015/get_jwt
      .post(`http://localhost:8000/get_jwt`, { tokenResponse })
      .then((res) => {
        localStorage.setItem("AUTH_KEY", res.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error while fetching JWT:", error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("AUTH_KEY") != null) {
      navigate("/");
    }
  });

  return (
    <div className="bg-white p-8 rounded shadow-md max-w-md w-full mx-auto text-center">
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin onSuccess={loginSuccess} />
      </GoogleOAuthProvider>
    </div>
  );
}

//   const handleLogin = async () => {
//     const redirectUri = "http://localhost:5001/login/google";
//     const scope = encodeURIComponent("profile email");
//     const authUri = `https://accounts.google.com/o/oauth2/auth`;
//     const responseType = "code";
//     const accessType = "offline";
//     const prompt = "consent";

//     const url = `${authUri}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&access_type=${accessType}&prompt=${prompt}`;

//     // Open Google authentication page in a new window
//     const authWindow = window.open(url, "_blank");

//     // Listen for messages from the authentication window
//     window.addEventListener("message", async (event) => {
//       // Check if the message is from the authentication window and contains the code
//       if (
//         event.source === authWindow &&
//         event.data.type === "authorization_response"
//       ) {
//         const { code } = event.data;
//         // Exchange the code for an access token and other user info on the server
//         try {
//           const response = await axios.post("/api/auth/google", { code });
//           // Handle the response from the server
//           console.log(response.data);
//         } catch (error) {
//           // Handle error
//           console.error("Error:", error);
//         }
//         // Close the authentication window after processing the response
//         authWindow.close();
//       }
//     });
//   };

//   return (
//     <button
//       onClick={handleLogin}
//       className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 rounded-lg text-sm px-5 py-2.5 text-center"
//     >
//       Sign in with Google
//     </button>
//   );
// }
