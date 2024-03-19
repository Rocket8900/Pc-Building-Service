import { Accordion } from "../../Components/Accordion";
import { INTERNAL_DATA } from "./BuildPCData";
import { Dropdown } from "../../Components/Dropdown";
import { useState, useEffect } from "react";

export function BuildPC() {
  // State to store the data
  const [partsData, setPartsData] = useState({});

  // Fetching data from the endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5950/all-parts", {
          method: "POST", // Set the method to POST
          headers: {
            "Content-Type": "application/json",
            // Include any other headers your endpoint requires
          },
          body: JSON.stringify({}), // Include body if your endpoint requires it
        });
        const data = await response.json();

        setPartsData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []); // The empty array ensures this runs once on component mount

  console.log(partsData)

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
