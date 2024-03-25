import React, { useState, useEffect } from 'react';
import {getRepairsAPI, getEmployeeRepairsAPI} from '../api/repair.api'
import UnclaimedRepairGroup from '../components/repairs/UnclaimedRepairGroup';
import Layout from '../layout/Layout';

function Repairs() {

    const [unclaimedRepairs, setUnclaimedRepairs] = useState([]);
    const [myRepairs, setMyRepairs] = useState([])

    useEffect(() => {
        const fetchRepairs = async () => {
          try {
            const repairsData = await getRepairsAPI(); 
            console.log(repairsData, "here it is")
            setUnclaimedRepairs(repairsData.filter(repair => repair.EmployeeID === ""));
            const myRepairsData = await getEmployeeRepairsAPI()
            setMyRepairs(myRepairsData); 
          } catch (error) {
            console.error('Error fetching repairs:', error);
          }
        };
        fetchRepairs(); 
      }, []);

      console.log(myRepairs)

    return (
      <Layout>
        <div className="">
            <h2 className='font-bold text-2xl'>Unclaimed Repairs</h2>
            <UnclaimedRepairGroup repairs={unclaimedRepairs}></UnclaimedRepairGroup>
            <UnclaimedRepairGroup repairs={myRepairs}></UnclaimedRepairGroup>
            <div>My Repairs</div>
        </div>
        </Layout>
    );
}

export default Repairs;
