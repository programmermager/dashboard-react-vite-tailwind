import { useState, createContext, useEffect } from "react";
import { Logo } from "../../../components/Logo";
import { replace, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const SidebarContext = createContext(false);

export const Header = ({ sidebarOpen, toggleSidebar, chooseMenuDropdown }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const [user, setUser] = useState({});

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
    <header className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b bg-white px-4">
      <div className="flex items-center">
        <Logo
          onClick={() => {
            toggleSidebar(!sidebarOpen);
          }}
        />
        <h1 className="hidden text-xl font-bold text-primary lg:block">
          Wakanda Forever
        </h1>
      </div>

      <div className="relative inline-block text-left">
        <div className="flex items-center">
          <span className="mr-1 text-sm font-bold lg:text-base">Halo</span>{" "}
          <span className="text-sm lg:text-base">
            {user.user_metadata?.name}
          </span>
          <img
            src={user.user_metadata?.image}
            className="ml-2 h-5 w-5 lg:h-8 lg:w-8"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
            onClick={toggleDropdown}
          />
        </div>

        {isOpen && (
          <div
            className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="py-1" role="none">
              <div
                onClick={()=>{
                  chooseMenuDropdown('edit_profile');
                  toggleDropdown();
                }}               
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Edit Profile
              </div>
              <div
                onClick={()=> {
                  chooseMenuDropdown('edit_profile');
                  toggleDropdown();
                }}  
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Change Password
              </div>
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
  );
};
