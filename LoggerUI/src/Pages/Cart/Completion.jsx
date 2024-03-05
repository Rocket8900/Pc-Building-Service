import { useNavigate } from "react-router-dom";
import { React, useEffect } from "react";

export function Completion() {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const customerID = searchParams.get("customerID");

  console.log(customerID);

  // Once user gets to this page, trigger the post-payment processing in Handling Order CMS
  useEffect(() => {
    const sendEmail = async () => {
      try {
        const response = await fetch(
          `http://localhost:5100/send-confirmation-email/${customerID}`
        );

        if (!response.ok) throw new Error("Failed to send confirmation email");
      } catch (error) {
        console.error("Error sending confirmation email");
      }
    };

    sendEmail();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-4 py-12 bg-white shadow-lg rounded-lg">
        <svg
          className="text-green-600 w-16 h-16 mx-auto my-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0  0  24  24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5  13l4  4L19  7"
          />
        </svg>
        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
          Payment Done!
        </h3>
        <p className="text-gray-600 my-2">
          Thank you for completing your secure online payment.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-700 hover:bg-gray-600 mt-5 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
