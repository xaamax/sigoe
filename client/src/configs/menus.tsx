import {
  LayoutDashboard,
  Plus,
  Search,
  CircleAlert,
} from "lucide-react";

const menus = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard className="h-[18px] w-[18px]" />,
    route: "/dashboard",
  },
  {
    name: "Ocorrências",
    icon: <CircleAlert className="h-[18px] w-[18px]" />,
    route: "ocorrencias",
    childs: [
      {
        name: "Incluir",
        icon: <Plus className="h-[18px] w-[18px]" />,
        route: "incluir",
      },
      {
        name: "Consultar",
        icon: <Search className="h-[18px] w-[18px]" />,
        route: "ocorrencias/consultar",
      },
    ],
  },
];

export default menus;
