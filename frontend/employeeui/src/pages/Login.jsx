import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {googleAuthAPI} from '../api/auth.api'
import { useNavigate } from "react-router-dom";

const clientId = "563475264993-iungtfd9jc876mcg2550b79ipi0kfekb.apps.googleusercontent.com";

function Login() {
  const navigate = useNavigate();

  const loginSuccess = (tokenResponse) => {
    console.log(tokenResponse)
    googleAuthAPI(tokenResponse).then((res) => {localStorage.setItem("AUTH_KEY", res); })
  };

  useEffect(() => {
    if(localStorage.getItem("AUTH_KEY") != null){
      // navigate('/dashboard')
    }
  });

  return (
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full mx-auto text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Employee Login</h2>
        <GoogleOAuthProvider clientId={clientId} >
          <GoogleLogin onSuccess={loginSuccess} />
        </GoogleOAuthProvider>
      </div>
  );
}

export default Login;
