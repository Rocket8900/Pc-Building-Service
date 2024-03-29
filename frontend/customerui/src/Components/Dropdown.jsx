import { useState, useEffect } from "react";

export function Dropdown({
  component,
  partInfo,
  setSelectedStatusDict,
  setPcName,
  updateTotalPrice,
}) {
  const [auth_key, setAuth_key] = useState();

  // Retrieve Auth Key from Local storage on mount
  useEffect(() => {
    setAuth_key(localStorage.getItem("AUTH_KEY"));
  }, []);

  async function handleSelectChange(event) {
    const value = event.target.value;
    const selectedArray = value.split(",");
    const component = selectedArray[0];
    const partId = selectedArray[1];

    if (partId) {
      // update selectedStatusDict, where selectedStatusDict[component] = true
      setSelectedStatusDict((prevState) => ({
        ...prevState,
        [component]: true,
      }));
    } else {
      // update selectedStatusDict, where selectedStatusDict[component] = false
      setSelectedStatusDict((prevState) => ({
        ...prevState,
        [component]: false,
      }));
      setPcName("");
    }

    const response = await fetch("http://localhost:5005/addPart", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth_key: auth_key,
        part_id: partId,
      }),
    });

    console.log(response);
    updateTotalPrice();
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
