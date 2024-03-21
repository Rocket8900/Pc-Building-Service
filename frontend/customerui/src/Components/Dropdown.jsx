export function Dropdown({ component, partInfo }) {
  return (
    <div id="dropdown" className="bg-white text-left p-2 mt-3">
      <label className="w-1/5 md:w-full">{component}</label>
      <select className="border border-black w-4/5 md:w-full p-1 mt-1 rounded-lg">
        <option value="">Please Select a {component}</option>
        {partInfo[component].map((item) => {
          return <option key={item["part_id"]}>{item["part_name"]} ------------ ${item["part_price"]}</option>
        })}
      </select>
    </div> 
  );
}
