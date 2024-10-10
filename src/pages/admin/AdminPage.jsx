import { useState } from "react";

import { Sidebar } from "./components/Sidebar";
import { UserManagement } from "./user/UserManagement";
import { Product } from "./product/Product";
import { Header } from "./components/Header";

function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menu, setMenu] = useState("Users");

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-100">
      <Header
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
          {menu == "Users" ? <UserManagement /> : <Product />}
        </main>
      </div>
    </div>
  );
}

export default Admin;
