import React, { useState, useEffect } from 'react';
import  {getOrderByIdAPI} from '../../api/order.api'
import {getRepairByIdAPI, updateRepairPart} from '../../api/repair.api'

const IdentifyPartModal = ({ data, closeModal, setRepairDetails }) => {
    const [orderDetails, setOrderDetails] = useState([]);
  
    useEffect(() => {
      const fetchOrderbyID = async () => {
        try {
          const OrderData = await getOrderByIdAPI(data.OrderID);
          setOrderDetails(OrderData["data"]["order_item"]);
        } catch (error) {
          console.error('Error fetching repairs:', error);
        }
      };
      fetchOrderbyID();
    }, []);

    const handleupdateRepairPart = async (partName) => {
        try {
            await updateRepairPart(data.RepairID, partName); 
            // await updateRepairStatusSimple(data.RepairID, "Repair In progress")
            const repairsData = await getRepairByIdAPI(data.RepairID); 
            console.log("this is the updated stuff", repairsData[0])
            setRepairDetails(repairsData[0]);
            closeModal()

        } catch (error) {
            console.error('Error updating repair employee:', error);
        }
    };
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-75">
        <div className="relative bg-white rounded-lg max-w-xl mx-auto mt-12 p-12 flex flex-col overflow-scroll">
          <button className="absolute top-0 right-0 p-2" onClick={closeModal}>
            <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <ul className="overflow-auto flex-grow">
            {orderDetails.map((order, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-md font-semibold mb-2">{order.pc_name}</h3>
                <ul>
                  {order.parts.map((part, partIndex) => (
                    <li key={partIndex} className="flex justify-between">
                      <span>{part.parts_name}</span>
                      <button onClick={() => handleupdateRepairPart(part.parts_name)}>Identify</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </ul>
          <div className="mt-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" onClick={closeModal}>
              Close Popup
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default IdentifyPartModal;
  