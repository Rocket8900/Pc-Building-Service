import { useState } from "react";

export function Dropdown({ component, partInfo, setSelectedStatusDict, setPcName }) {

  async function handleSelectChange(event) {
    const value = event.target.value
    const selectedArray = value.split(",")
    const component = selectedArray[0]
    const partId = selectedArray[1]

    if(partId) {
      // update selectedStatusDict, where selectedStatusDict[component] = true
      setSelectedStatusDict(prevState => ({
        ...prevState,
        [component]: true
      }));
    }
    else {
      // update selectedStatusDict, where selectedStatusDict[component] = false
      setSelectedStatusDict(prevState => ({
        ...prevState,
        [component]: false
      }))
      setPcName('');
    }

    console.log(partId)

    // send selected part to buildingPC complex
    const response = await fetch("http://localhost:5005/addPart", {
      method: "POST",
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: "112",
        part_id: partId
      }),
    });


  }

  return (
    <div id="dropdown" className="bg-white text-left p-2 mt-3">
      <label className="md:w-full">{component}</label>
      <select
        id={component}
        className="border border-black md:w-full p-1 mt-1 rounded-lg"
        onChange={handleSelectChange}
      >
        <option value={[component, ""]}>Please Select a {component}</option>
        {partInfo[component].map((item) => {  
          return (
            <option key={item["part_id"]} value={[component, item["part_id"]]}>
              {item["part_name"]} (${item["part_price"]})
            </option>
          );
        })}
      </select>
    </div>
  );
}
