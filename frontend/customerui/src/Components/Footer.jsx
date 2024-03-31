export function Footer() {
  return (
    <footer className="mt-10 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 rounded-lg mb-4 mt-4">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2.5">
        <div className="flex flex-wrap justify-between">
          <div className="w-full sm:w-auto">
            <p className="text-white">&copy; ESD Timez. All rights reserved.</p>
          </div>
          <div className="w-full sm:w-auto">
            <ul className="ml-10 flex space-x-4 text-white">
              <li>
                <a href="/" className="hover:text-gray-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
