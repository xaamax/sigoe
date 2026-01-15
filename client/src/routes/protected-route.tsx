import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar";
import Wrapper from "@/components/wrapper";

const ProtectedRoute = () => {
  return (
    <main>
      <Wrapper>
        <Navbar />
        <Outlet />
      </Wrapper>
    </main>
  );
};

export default ProtectedRoute;
