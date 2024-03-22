import { useState } from "react";

export function Dropdown({ component, partInfo, selectedStatusDict, setSelectedStatusDict }) {
  const [selectedPartId, setselectedPartId] = useState()

  function handleSelectChange(event) {
    const value = event.target.value

    if(value) {
      const id = value.split(",")[0]
      const category = value.split(",")[1]
      setSelectedStatusDict([...selectedStatusDict, category])
    }
    // setselectedPartId(value)
  }

  return (
    <div id="dropdown" className="bg-white text-left p-2 mt-3">
      <label className="md:w-full">{component}</label>
      <select
        id={component}
        className="border border-black md:w-full p-1 mt-1 rounded-lg"
        onChange={handleSelectChange}
      >
        <option value="">Please Select a {component}</option>
        {partInfo[component].map((item) => {  
          return (
            <option key={item["part_id"]} value={ [item["part_id"], item["part_category"]] }>
              {item["part_name"]} (${item["part_price"]})
            </option>
          );
        })}
      </select>
    </div>
  );
}
