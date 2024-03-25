import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {getRepairByIdAPI, updateRepairStatus, updateRepairEmployee} from '../api/repair.api'
import Layout from '../layout/Layout';

function RepairDetail() {

    const [repairDetails, setRepairDetails] = useState([]);
    const [ searchParam ] = useSearchParams();
    const RepairID = searchParam.get('id')
    const EmployeeID = ""

    
    useEffect(() => {
        const fetchRepairbyID = async () => {
          try {
            const repairsData = await getRepairByIdAPI(RepairID); 
            setRepairDetails(repairsData[0]); 
          } catch (error) {
            console.error('Error fetching repairs:', error);
          }
        };
        fetchRepairbyID(); 
      }, []);
    
      const handleStatusUpdate = async () => {
        try {
            await updateRepairStatus(RepairID, 'New Statusfasef fes2'); 
            const updatedRepairDetails = await getRepairByIdAPI(RepairID);
            setRepairDetails(updatedRepairDetails[0]);
        } catch (error) {
            console.error('Error updating repair status:', error);
        }
    };

    const handleEmployeeUpdate = async () => {
      try {
          await updateRepairEmployee(RepairID, EmployeeID); 
          const updatedRepairDetails = await getRepairByIdAPI(RepairID);
          setRepairDetails(updatedRepairDetails[0]);
      } catch (error) {
          console.error('Error updating repair employee:', error);
      }
  };

    return (
      <Layout>
        <div className="">
          <table className="table-auto w-full">
            <tbody>
              <tr>
                <td className='font-bold'>Repair ID</td>
                <td>{repairDetails.RepairID}</td>
              </tr>
              <tr>
                <td className='font-bold'>User ID</td>
                <td>{repairDetails.UserID}</td>
              </tr>
              <tr>
                <td className='font-bold'>Created At</td>
                <td>{repairDetails.CreatedAt}</td>
              </tr>
              <tr>
                <td className='font-bold'>Status</td>
                <td>{repairDetails.Status}</td>
              </tr>
            </tbody>
          </table>

          {repairDetails.EmployeeID == '' ? (
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleEmployeeUpdate}>Take this repair</button>
          ) : (
            <button onClick={handleStatusUpdate}>Update Status</button>
          )}
        </div>
      </Layout>
    );
}

export default RepairDetail;
