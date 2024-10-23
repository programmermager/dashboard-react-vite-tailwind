import { useState, createContext, useEffect } from "react";
import { Logo } from "../../../components/Logo";
import { replace, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "../../../lib/helper/supabase-client";
import { getLocalUser, logout } from "../../../services/services";
import Modal from "../../../components/modal/ModalDialog";
import { ChangePassword } from "../user/components/ChangePassword";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export const SidebarContext = createContext(false);

export const Header = ({ sidebarOpen, toggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const confirmSwal = () => {
    withReactContent(Swal).fire({
      title: "Keluar Akun",
      text: "Apakah anda yakin ingin keluar dari akun ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Keluar",
      cancelButtonText: "Batal",
      reverseButtons: true,
      preConfirm: async () => {
        const error = await logout();

        console.log(error);
        if (!error) {
          navigate("/login", replace);
          toast.success("Berhasil Logout");
        } else {
          toast.error("Gagal Logout");
        }
      },
    });
  };

  useEffect(() => {
    getLocalUser().then((user) => {
      setUser(user);
    });
  }, []);

  return (
    <div>
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
            <span className="text-sm lg:text-base">{user.name}</span>
            <img
              src={user.photo_profile}
              className="ml-2 h-5 w-5 cursor-pointer rounded-full shadow-lg lg:h-8 lg:w-8"
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
                <a
                  href="#"
                  onClick={() => openModal()}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Change Password
                </a>
              </div>
              <div className="py-1" role="none">
                <a
                  onClick={confirmSwal}
                  className="block cursor-pointer px-4 py-2 text-sm text-red-500 hover:bg-gray-100 hover:text-red-700"
                  role="menuitem"
                >
                  Logout
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Ganti Kata Sandi">
        <ChangePassword
          onClose={closeModal}
          onSubmit={async (e) => {
            const response = await supabase.auth.updateUser({
              password: e.password,
            });
            console.log(response);
            if (response.error) {
              toast.error(response.error.message);
              return;
            }

            toast.success("Berhasil ganti kata sandi");
            closeModal();
          }}
        />
      </Modal>
    </div>
  );
};
