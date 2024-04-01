export function About() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl px-4 py-12 mt-5 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6">About Us</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <img
              src="src/assets/easter/clar.png"
              alt="Team Member"
              className="w-64 h-64 object-cover rounded-full"
            />
            <div className="text-lg text-gray-900 mt-2">
              <b>Clarissa</b>
            </div>
            <div className="text-md text-gray-900 mt-2">
              "DONT APOLOGISE - 8/3/2024"
            </div>
          </div>

          <div className="flex flex-col items-center">
            <img
              src="src/assets/easter/gerard.png"
              alt="Team Member"
              className="w-64 h-64 object-cover rounded-full"
            />
            <div className="text-lg text-gray-900 mt-2">
              <b>Gerard</b>
            </div>
            <div className="text-md text-gray-900 mt-2">
              "Atb for ESM quiz guys - 6/3/2024"
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="src/assets/easter/gabriel.png"
              alt="Team Member"
              className="w-64 h-64 object-cover rounded-full"
            />
            <div className="text-lg text-gray-900 mt-2">
              <b>Gabriel</b>
            </div>
            <div className="text-md text-gray-900 mt-2">
              "We definitely forgot to update Shyan - 10/2/2024"
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="src/assets/easter/nash.png"
              alt="Team Member"
              className="w-64 h-64 object-cover rounded-full"
            />
            <div className="text-lg text-gray-900 mt-2">
              <b>Nashwyn the Unstoppable</b>
            </div>
            <div className="text-md text-gray-900 mt-2">
              "i love donkey kong - 8/3/2024"
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="src/assets/easter/alex.jpg"
              alt="Team Member"
              className="w-64 h-64 object-cover rounded-full"
            />
            <div className="text-lg text-gray-900 mt-2">
              <b>Alexander</b>
            </div>
            <div className="text-md text-gray-900 mt-2">
              "pushed - 29/3/2024"
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="src/assets/easter/shyan.jpg"
              alt="Team Member"
              className="w-64 h-64 object-cover rounded-full"
            />
            <div className="text-lg text-gray-900 mt-2">
              <b>Shyan</b>
            </div>
            <div className="text-md text-gray-900 mt-2">
              "yup im good with that - 1/2/2024"
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
