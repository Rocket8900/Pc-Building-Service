import { Accordion } from "../../Components/Accordion";
import { INTERNAL_DATA } from "./BuildPCData";
import { Dropdown } from "../../Components/Dropdown";

export function BuildPC() {

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

