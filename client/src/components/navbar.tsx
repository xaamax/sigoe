import { logout } from "@/core/services/api";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Ínicio</Link>
      <Link to="/ocorrencias">Ocorrências</Link>
      <Link to="/sair" onClick={() => logout()}>
        Sair
      </Link>
    </nav>
  );
}

export default Navbar;
