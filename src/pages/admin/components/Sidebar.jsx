import { Box } from "lucide-react";
import { Users } from "lucide-react";
import { useState } from "react";

export const Sidebar = ({ sidebarOpen, onClick }) => {
  const sideLinks = [
    {
      name: "Users",
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      name: "Products",
      icon: <Box className="mr-2 h-4 w-4" />,
    },
  ];
  const [active, setActive] = useState(sideLinks[0].name);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r bg-white p-5 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <nav className="flex h-full flex-col pt-16">
        {sideLinks.map(({ name, icon }) => (
          <button
            key={name}
            className={`mt-1 flex items-center ${active == name ? `bg-primary` : `bg-white`} ${active == name ? `text-white` : `text-black`} hover:bg-slate-300`}
            onClick={() => {
              setActive(name);
              onClick(name);
            }}
          >
            {icon}
            {name}
          </button>
        ))}
      </nav>
    </aside>
  );
};
