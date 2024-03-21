import { Accordion } from "../../Components/Accordion";
import { INTERNAL_DATA } from "./BuildPCData";
import { Dropdown } from "../../Components/Dropdown";
import { useState, useEffect } from "react";

export function BuildPC() {
  const [parts, setParts] = useState([]);
  const [categories, setCategories] = useState([]);
  // Object that is updated with backend Data
  const [compiledData, setCompiledData] = useState({
    "Core Components": {},
    "Storage and Memory": {},
    Case: {},
    Cooler: {},
    Audio: {},
  });

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

    console.log(updatedCompiledData);

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
  }, [categories, parts]);

  console.log(compiledData)

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
