import { useState } from "react";
import { Users, ChevronDown } from "lucide-react";
import { Logo } from "../../components/Logo";
import { replace, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/login", replace);
    toast.success("Berhasil Logout");
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-100">
      <header className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b bg-white px-4">
        <div className="flex items-center">
          <Logo size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} />
          <h1 className="hidden text-xl font-bold text-primary lg:block">
            Wakanda Forever
          </h1>
        </div>

        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
              onClick={toggleDropdown}
            >
              Hello
              <ChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {isOpen && (
            <div
              className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div className="py-1" role="none">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Edit Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Change Password
                </a>
              </div>
              <div className="py-1" role="none">
                <a
                  onClick={logout}
                  className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 hover:text-red-700"
                  role="menuitem"
                >
                  Logout
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="flex py-14 lg:px-11 lg:py-16">
        {/* Fixed Sidebar */}
        <aside
          className={`w- fixed inset-y-0 left-0 z-40 w-64 transform border-r bg-white p-5 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="flex h-full flex-col pt-16">
            <button className="mt-1 flex items-center bg-white text-black hover:bg-slate-300">
              <Users className="mr-2 h-4 w-4" />
              Heroes
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="left-0 right-0 ml-0 flex w-full flex-col items-start p-4 lg:ml-64">
          <div className="w-full rounded-lg border bg-white p-4">
            <h2 className="mb-4 text-left text-2xl font-bold">
              User management
            </h2>
            <hr />
            {/* Scrollable content */}
            <table className="w-full table-auto border-collapse border border-slate-500">
              <thead>
                <tr>
                  <th>Song</th>
                  <th>Artist</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-700">
                    The Sliding Mr. Bones (Next Stop, Pottersville)
                  </td>
                  <td>Malcolm Lockyer</td>
                  <td>1961</td>
                </tr>
                <tr>
                  <td>Witchy Woman</td>
                  <td>The Eagles</td>
                  <td>1972</td>
                </tr>
                <tr>
                  <td>Shining Star</td>
                  <td>Earth, Wind, and Fire</td>
                  <td>1975</td>
                </tr>
              </tbody>
            </table>
            {/* {Array.from({ length: 20 }).map((_, index) => (
              <div key={index} className="bg-muted mb-4 rounded-lg p-4">
                User {index + 1} details
              </div>
            ))} */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Admin;
