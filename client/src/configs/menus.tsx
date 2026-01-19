import {
  LayoutDashboard,
  Plus,
  Search,
  TriangleAlert,
} from "lucide-react";

const menus = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard className="h-[18px] w-[18px]" />,
    route: "/dashboard",
  },
  {
    name: "Ocorrências",
    icon: <TriangleAlert className="h-[18px] w-[18px]" />,
    route: "ocorrencias",
    childs: [
      {
        name: "Incluir",
        icon: <Plus className="h-[18px] w-[18px]" />,
        route: "ocorrencias/incluir",
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
