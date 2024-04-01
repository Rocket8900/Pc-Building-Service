import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {getRepairByIdAPI, updateRepairCompletion, updateRepairEmployee} from '../api/repair.api'
import Layout from '../layout/Layout';
import IdentifyPartModal from '../components/repairs/IdentifyPartModal';

function RepairDetail() {

    const [repairDetails, setRepairDetails] = useState([]);
    const [ searchParam ] = useSearchParams();
    const RepairID = searchParam.get('id')
    const EmployeeID = ""
    const [customerEmail, setCustomerEmail] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(repairDetails)

    
    useEffect(() => {
        const fetchRepairbyID = async () => {
          try {
            const repairsData = await getRepairByIdAPI(RepairID); 
            setRepairDetails(repairsData[0]); 
            setCustomerEmail(repairsData[0].CustomerEmail)
          } catch (error) {
            console.error('Error fetching repairs:', error);
          }
        };
        fetchRepairbyID(); 
      }, []);
    
      const handleStatusUpdate = async () => {
        try {
            await updateRepairCompletion(RepairID, 'Repair Completed', customerEmail); 
            const updatedRepairDetails = await getRepairByIdAPI(RepairID);
            setRepairDetails(updatedRepairDetails[0]);
        } catch (error) {
            console.error('Error updating repair status:', error);
        }
    };


    const handleRepairIdentification = async () => {
      setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
      setIsModalOpen(false); // Close the modal
  };


    const handleEmployeeUpdate = async () => {
      try {
          await updateRepairEmployee(RepairID, customerEmail); 
          console.log(customerEmail)
          // await updateRepairStatusSimple(RepairID, "Employee Assigned")
          const updatedRepairDetails = await getRepairByIdAPI(RepairID, customerEmail);
          setRepairDetails(updatedRepairDetails[0]);
      } catch (error) {
          console.error('Error updating repair employee:', error);
      }
  };

    return (
      <Layout>
        <div className="">
            {isModalOpen && (
                <IdentifyPartModal closeModal={closeModal} data={repairDetails} setRepairDetails={setRepairDetails} customerEmail={customerEmail} />
            )}
          <table className="table-auto w-full mb-6">
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
              <tr>
                <td className='font-bold'>Description</td>
                <td>{repairDetails.Description}</td>
              </tr>
              <tr>
                <td className='font-bold'>Customer Email</td>
                <td>{repairDetails.CustomerEmail}</td>
              </tr>
            </tbody>
          </table>

          {repairDetails.Status === 'Repair Completed' && repairDetails.EmployeeID !== '' ? (
            <div>Repair has been completed.</div>
          ) : repairDetails.EmployeeID === '' ? (
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleEmployeeUpdate}>Take this repair</button>
          ) : repairDetails.Status === 'Employee Assigned' ? (
            <button onClick={handleRepairIdentification}>Identify Damaged Part</button>
          ) : (
            <button onClick={handleStatusUpdate}>Finish Repair</button>
          )}



        </div>
      </Layout>
    );
}

export default RepairDetail;
