import React from "react";
import axios from "axios"; // Import Axios for making HTTP requests

const clientId =
  "103401913594-aq4cvr1j7uipabj86vjc4nnv4p418sh6.apps.googleusercontent.com";

export function Login() {
  const handleLogin = async () => {
    const redirectUri = "http://localhost:5001/login/google";
    const scope = encodeURIComponent("profile email");
    const authUri = `https://accounts.google.com/o/oauth2/auth`;
    const responseType = "code";
    const accessType = "offline";
    const prompt = "consent";

    const url = `${authUri}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&access_type=${accessType}&prompt=${prompt}`;

    // Open Google authentication page in a new window
    const authWindow = window.open(url, "_blank");

    // Listen for messages from the authentication window
    window.addEventListener("message", async (event) => {
      // Check if the message is from the authentication window and contains the code
      if (
        event.source === authWindow &&
        event.data.type === "authorization_response"
      ) {
        const { code } = event.data;
        // Exchange the code for an access token and other user info on the server
        try {
          const response = await axios.post("/api/auth/google", { code });
          // Handle the response from the server
          console.log(response.data);
        } catch (error) {
          // Handle error
          console.error("Error:", error);
        }
        // Close the authentication window after processing the response
        authWindow.close();
      }
    });
  };

  return (
    <button
      onClick={handleLogin}
      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 rounded-lg text-sm px-5 py-2.5 text-center"
    >
      Sign in with Google
    </button>
  );
}
