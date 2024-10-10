import { useState } from "react";

import { Sidebar } from "./components/Sidebar";
import { UserManagement } from "./user/UserManagement";
import { Product } from "./product/Product";
import { Header } from "./components/Header";
import { EditProfilePage } from "./profile/EditProfilePage";

function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menu, setMenu] = useState("Users");

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-100">
      <Header
      chooseMenuDropdown={(menu)=>{
        setMenu(menu);
        // chooseMenuDropdown(menu); // Uncomment this line if you want to trigger a callback function in the parent component
      }}
        sidebarOpen={sidebarOpen}
        toggleSidebar={(value) => {
          setSidebarOpen(value);
        }}
      />
      <div className="flex py-14 lg:px-11 lg:py-16">
        <Sidebar
          sidebarOpen={sidebarOpen}
          onClick={(name) => {
            console.log(name);
            setMenu(name);
          }}
        />

        <main className="left-0 right-0 ml-0 flex w-full flex-col items-start p-4 lg:ml-64">
          {/* {menu == "Users" ? <UserManagement /> : <Product />} */}
          {(() => {
            switch (menu) {
              case "Users":
                return <UserManagement />;
              case "edit_profile":
                return <EditProfilePage />;
              default:
                return <Product />;
            }
          })()}
        </main>
      </div>
    </div>
  );
}

export default Admin;
