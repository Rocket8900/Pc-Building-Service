import { Accordion } from "../../Components/Accordion";
import { Dropdown } from "../../Components/Dropdown";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function RepairPC() {
  const navigate = useNavigate();
  const [auth_key, setAuth_key] = useState();

  const [orders, setOrders] = useState([]);


  // Retrieve Auth Key from Local storage on mount
  useEffect(() => {
    const auth_key_retrieved = localStorage.getItem("AUTH_KEY");
    setAuth_key(auth_key_retrieved);
  }, []);


  // State of buildingPC
  const [startBuild, setStartBuild] = useState(false);


  // function to startBuilding
  async function clickStartBuild() {
    setStartBuild(true);
    // http://localhost:5005/createPc
    const response = await fetch("http://localhost:8000/createPc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        auth_key: auth_key,
      }),
    });
  }

  // useEffect to fetch orders
  useEffect(() => {
    // fetch categories
    async function fetchOrders() {
      // http://localhost:5950/categories
      const response = await fetch("http://localhost:8000/retrieve-customer-order", {
        method: "POST",
      });
      const resData = await response.json();
      setOrders(resData);
    }

    fetchOrders();
  }, []);




  return (
    <>
      <div
        id="createPC"
        className={`flex flex-col items-center mx-auto bg-red-300 p-20 my-20 w-4/5 rounded-lg ${
          startBuild ? "hidden" : ""
        }`}
      >
        <section>
          <p className=" text-5xl font-mono">Repair Your PC!</p>
          <button
            onClick={clickStartBuild}
            id="startBuild"
            className=" bg-orange-800 p-2 rounded-md text-neutral-200 hover:bg-violet-950 transition-all mt-10"
          >
            Select PC for repair
          </button>
        </section>
      </div>

      <div
        className={`flex mx-auto ${startBuild ? "" : "hidden"}`}
        style={{ width: "100%" }}
      >
        {/* <div style={{ width: "80%" }}>
          {sections.map((section) => {
            return (
              <Accordion key={section} name={section}>
                {Object.keys(compiledData[section]).map((part_category) => {
                  return (
                    <Dropdown
                      key={part_category}
                      component={part_category}
                      partInfo={compiledData[section]}
                      updateTotalPrice={updateTotalPrice}
                      selectedStatusDict={selectedStatusDict}
                      setSelectedStatusDict={setSelectedStatusDict}
                      setPcName={setPcName}
                      pcName={pcName}
                    />
                  );
                })}
              </Accordion>
            );
          })}
        </div> */}

      </div>
    </>
  );
}
