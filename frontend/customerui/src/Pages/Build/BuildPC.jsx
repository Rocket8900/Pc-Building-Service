import { Accordion } from "../../Components/Accordion";
import { INTERNAL_DATA } from "./BuildPCData";
import { Dropdown } from "../../Components/Dropdown";
import { useState, useEffect } from "react";

export function BuildPC() {
  const [parts, setParts] = useState([]);
  const [categories, setCategories] = useState([]);
  // Object that is updated with backend Data
  const [partsData, setPartsData] = useState({
    "Core Components": {
    },
    "Storage and Memory": {},
    "Case": {},
    "Cooler": {},
    "Audio": {}
  });

  // useEffect to fetch parts and categories
  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("http://localhost:5950/categories", {
        method: "POST",
      });
      const resData = await response.json();
      setCategories(resData);
    }

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

  // populating partsData
  useEffect(() => {
    const updatedPartsData = {partsData}
    // fields 
    const coreCoponents = ["CPU", "GPU", "Power Supply", "Motherboard"]
    const storageAndMemory = ["RAM", "Storage"]
    const computerCase = ["Case"]
    const cooler = ["CPU Cooler"]
    const headset = ["Headset"]

      
    for (let i = 0; i < categories.length; i++) {
      if (coreCoponents.includes(categories[i])) {
        updatedPartsData["partsData"]["Core Components"][categories[i]] = []
      }
      else if (storageAndMemory.includes(categories[i])) {
        updatedPartsData["partsData"]["Storage and Memory"][categories[i]] = []
      }
      else if (computerCase.includes(categories[i])) {
        updatedPartsData["partsData"]["Case"][categories[i]] = []
      }
      else if (cooler.includes(categories[i])){
        updatedPartsData["partsData"]["Cooler"][categories[i]] = []
      }
      else if (headset.includes(categories[i])) {
        updatedPartsData["partsData"]["Audio"][categories[i]] = []
      }
    }

    console.log(updatedPartsData)

  }, [parts, categories]);

  

  var sections = Object.keys(INTERNAL_DATA);

  return (
    <div className="flex flex-col items-center mx-auto">
      {sections.map((section) => {
        // Retrieve the categories for the current section
        const categories = INTERNAL_DATA[section].category;

        return (
          <Accordion key={section} name={section}>
            {Object.keys(categories).map((categoryKey) => {
              const category = categories[categoryKey];
              return (
                <Dropdown
                  key={categoryKey}
                  component={categoryKey}
                  itemsAndCosts={Object.entries(category.variants)}
                />
              );
            })}
          </Accordion>
        );
      })}
    </div>
  );
}
