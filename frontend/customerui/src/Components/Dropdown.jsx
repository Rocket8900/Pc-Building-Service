import { useState } from "react";

export function Dropdown({ component, partInfo }) {
  const [selectedPartId, setselectedPartId] = useState("")

  function handleSelectChange(event) {
    setselectedPartId(event.target.value)
  }

  console.log(selectedPartId)

  return (
    <div id="dropdown" className="bg-white text-left p-2 mt-3">
      <label className="md:w-full">{component}</label>
      <select
        id={component}
        className="border border-black md:w-full p-1 mt-1 rounded-lg"
        onChange={handleSelectChange}
        value={selectedPartId}
      >
        <option value="">Please Select a {component}</option>
        {partInfo[component].map((item) => {  
          return (
            <option key={item["part_id"]} value={item["part_id"]}>
              {item["part_name"]} (${item["part_price"]})
            </option>
          );
        })}
      </select>
    </div>
  );
}
