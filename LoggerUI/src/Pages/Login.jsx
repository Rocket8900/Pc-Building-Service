import React from "react";

const clientId =
  "103401913594-aq4cvr1j7uipabj86vjc4nnv4p418sh6.apps.googleusercontent.com";

export function Login() {
  const handleLogin = () => {
    const redirectUri = "http://localhost:5001/login/google";
    const scope = encodeURIComponent("profile email");
    const authUri = `https://accounts.google.com/o/oauth2/auth`;
    const responseType = "code";
    const accessType = "offline";
    const prompt = "consent";

    const url = `${authUri}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&access_type=${accessType}&prompt=${prompt}`;
    window.location.href = url;
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
