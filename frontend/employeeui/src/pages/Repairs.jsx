import React, { useState, useEffect } from "react";
import { getRepairsAPI, getEmployeeRepairsAPI } from "../api/repair.api";
import UnclaimedRepairGroup from "../components/repairs/UnclaimedRepairGroup";
import Layout from "../layout/Layout";

function Repairs() {
  const [unclaimedRepairs, setUnclaimedRepairs] = useState([]);
  const [myRepairs, setMyRepairs] = useState([]);

  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const repairsData = await getRepairsAPI();
        console.log(repairsData, "Repair data");
        setUnclaimedRepairs(
          repairsData.filter((repair) => repair.EmployeeID === "")
        );
        const myRepairsData = await getEmployeeRepairsAPI();
        setMyRepairs(myRepairsData);
      } catch (error) {
        console.error("Error fetching repairs:", error);
      }
    };
    fetchRepairs();
  }, []);

  return (
    <Layout>
      <div className="">
        <h2 className="font-bold text-2xl">Unclaimed Repairs</h2>
        <UnclaimedRepairGroup repairs={unclaimedRepairs}></UnclaimedRepairGroup>
        <h2 className="mt-5 font-bold text-2xl">My Repairs</h2>
        <UnclaimedRepairGroup repairs={myRepairs}></UnclaimedRepairGroup>
      </div>
    </Layout>
  );
}

export default Repairs;
