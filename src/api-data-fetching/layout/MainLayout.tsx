import { Outlet } from "react-router";
import Navbar from "../components/navbar/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main className="p-4 ">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
