import { useState } from "react";

export function Accordion({ name, children }) {
    const [accordionOpen, setAccordionOpen] = useState(false);
    function clickAccordion() {
        setAccordionOpen(!accordionOpen);
    }

    return (
        <div id="accordion" className="border border-blue-800 p-4 m-1 rounded-lg bg-blue-800 w-5/5" >
            <div id="button" onClick={clickAccordion} className="flex justify-between">
                <span className="text-neutral-300">{name}</span>
                <span className="text-neutral-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </span>
            </div>
            <div id="content" className={`overflow-hidden grid transition-all duration-300 ease-in-out ${accordionOpen ? " grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                {/* Dropdown that repeats x times, same number of times as item in list  */}
                <div className="overflow-hidden">
                    {children}
                </div>
            </div>
            
        </div>
    );
}