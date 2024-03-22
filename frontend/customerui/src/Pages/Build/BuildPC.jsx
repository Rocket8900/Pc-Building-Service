import { Accordion } from "../../Components/Accordion";
import { Dropdown } from "../../Components/Dropdown";
import { useState, useEffect } from "react";

export function BuildPC() {
  const [parts, setParts] = useState([]);
  const [categories, setCategories] = useState([]);
  // Object that is updated with backend Data
  const [compiledData, setCompiledData] = useState({
    "Core Components": {},
    "Storage and Memory": {},
    "Case": {},
    "Cooler": {},
    "Audio": {},
  });
  // useState to pass down to Dropdown component, to check if employee has selected all parts
  const [selectedStatusDict, setSelectedStatusDict] = useState({
    "Power Supply": true,
    "CPU": true,
    "GPU": true,
    "Motherboard": true,
    "RAM": true,
    "Storage": true,
    "Case": true,
    "CPU Cooler": true,
    "Headset": true
  });

  // State to track the pcName value
  const [pcName, setPcName] = useState('');

  // Function to update the input value state
  function handlePcNameChange(event) {
    setPcName(event.target.value);
  }

  // Determine visibility of the addToCartSection based on pcName having text
  function shouldShowAddToCart() {
    return pcName.trim() !== '';
  }

  // useEffect to fetch parts and categories
  useEffect(() => {
    // fetch categories
    async function fetchCategories() {
      const response = await fetch("http://localhost:5950/categories", {
        method: "POST",
      });
      const resData = await response.json();
      setCategories(resData);
    }
    // fetch parts
    async function fetchParts() {
      const response = await fetch("http://localhost:5950/all-parts", {
        method: "POST",
      });
      const resData = await response.json();
      setParts(resData);
    }

    fetchParts();
    fetchCategories();
  }, []);

  // populating compiledData
  useEffect(() => {
    // make deep copy so that nested objects / arrays will not reflect in compiledData
    const updatedCompiledData = JSON.parse(JSON.stringify(compiledData));

    // fields
    const coreCoponents = ["CPU", "GPU", "Power Supply", "Motherboard"];
    const storageAndMemory = ["RAM", "Storage"];
    const computerCase = ["Case"];
    const cooler = ["CPU Cooler"];
    const headset = ["Headset"];

    // add in category(CPU...) to each section (Main Component)
    for (let i = 0; i < categories.length; i++) {
      if (coreCoponents.includes(categories[i])) {
        updatedCompiledData["Core Components"][categories[i]] = [];
      } else if (storageAndMemory.includes(categories[i])) {
        updatedCompiledData["Storage and Memory"][categories[i]] = [];
      } else if (computerCase.includes(categories[i])) {
        updatedCompiledData["Case"][categories[i]] = [];
      } else if (cooler.includes(categories[i])) {
        updatedCompiledData["Cooler"][categories[i]] = [];
      } else if (headset.includes(categories[i])) {
        updatedCompiledData["Audio"][categories[i]] = [];
      }
    }

    // check if category (CPU) in section (main component)
    let allEmpty = true;
    for (let key in updatedCompiledData) {
      if (Object.keys(updatedCompiledData[key]).length !== 0) {
        allEmpty = false;
        break;
      }
    }

    // add parts to respective category
    if (!allEmpty) {
      for (let i = 0; i < parts.length; i++) {
        var part = parts[i];
        var category = parts[i]["part_category"];
        if (coreCoponents.includes(category)) {
          updatedCompiledData["Core Components"][category].push(part);
        } else if (storageAndMemory.includes(category)) {
          updatedCompiledData["Storage and Memory"][category].push(part);
        } else if (computerCase.includes(category)) {
          updatedCompiledData["Case"][category].push(part);
        } else if (cooler.includes(category)) {
          updatedCompiledData["Cooler"][category].push(part);
        } else if (headset.includes(category)) {
          updatedCompiledData["Audio"][category].push(part);
        }
      }
    }

    setCompiledData(updatedCompiledData);
  }, [categories, parts]);

  var sections = Object.keys(compiledData);
  const HideEnterPcName = Object.values(selectedStatusDict).includes(false);

  return (
    <>
      <div className="flex flex-col items-center mx-auto">
        {sections.map((section) => {
          return (
            <Accordion key={section} name={section}>
              {Object.keys(compiledData[section]).map((part_category) => {
                return (
                  <Dropdown
                    key={part_category}
                    component={part_category}
                    partInfo={compiledData[section]}
                    selectedStatusDict={selectedStatusDict}
                    setSelectedStatusDict={setSelectedStatusDict}
                  />
                );
              })}
            </Accordion>
          );
        })}
      </div>

      <div className="flex justify-center">
        <div id="endingSection" className="flex justify-between w-4/5">
          <div id="enterPcName" className={`mt-2 ${HideEnterPcName ? 'hidden' : '' }`}>
            <label htmlFor="pcName" className="mr-2">PC Name</label>
            <input id="pcName" placeholder="Your PC's name" className="border border-blue p-2 rounded-md" value={pcName} onChange={handlePcNameChange}></input>
          </div>
          <div id="addToCartSection" className={`mt-2 ${shouldShowAddToCart() ? '' : 'hidden'}`}>
            <label className="mr-2 text-lg"><b>$100</b></label>
            <button id="addToCart" className="bg-violet-700 p-2 rounded-md text-neutral-300 hover:bg-violet-950 transition-all"> Add to Cart</button>
          </div>
        </div>
      </div>

      
    </>
  );
}
