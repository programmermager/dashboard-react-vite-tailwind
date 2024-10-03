import { useState } from "react";
import { Users, ChevronDown } from "lucide-react";
import { Logo } from "../../components/Logo";
import { replace, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";
import { Pencil } from "lucide-react";
import { Trash } from "lucide-react";

function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});

  const toggleDropdown = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", replace);
    toast.success("Berhasil Logout");
  }

  async function getLocalUser() {
    const userStr = localStorage.getItem("user");
    const userr = JSON.parse(userStr);
    setUser(userr);
  }

  useEffect(() => {
    getLocalUser();
  }, []);

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
          <div className="flex">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
              onClick={toggleDropdown}
            >
              Halo {user.email}
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
              Users
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="left-0 right-0 ml-0 flex w-full flex-col items-start p-4 lg:ml-56">
          <div className="w-full rounded-lg border bg-white p-4">
            <h2 className="mb-4 text-left text-2xl font-bold">
              User management
            </h2>
            <hr />
            {/* Scrollable content */}

            <div className="relative overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Nama Lengkap
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Dibuat Tanggal
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      Udin
                    </th>
                    <td className="px-6 py-4">udin@mamayukero.com</td>
                    <td className="px-6 py-4">1200 SM</td>
                    <td className="flex px-6 py-4">
                      <Pencil className="mr-4 h-8 w-8 cursor-pointer rounded-full bg-white p-2 text-blue-500" />

                      <Trash className="h-8 w-8 cursor-pointer rounded-full bg-white p-2 text-red-500" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Admin;
