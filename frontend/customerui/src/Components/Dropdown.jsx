import { useState } from "react";

export function Dropdown({ component, partInfo, selectedStatusDict, setSelectedStatusDict }) {
  const [selectedPartId, setselectedPartId] = useState()

  function handleSelectChange(event) {
    const value = event.target.value
    const selectedArray = value.split(",")
    const component = selectedArray[0]
    const partId = selectedArray[1]

    if(partId) {
      console.log(component, "partId:", partId)
      // update selectedStatusDict, where selectedStatusDict[component] = true
      setSelectedStatusDict(prevState => ({
        ...prevState,
        [component]: true
      }));
    }
    else {
      console.log(component, "no partId")
      // update selectedStatusDict, where selectedStatusDict[component] = false
      setSelectedStatusDict(prevState => ({
        ...prevState,
        [component]: false
      }));
    }

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
