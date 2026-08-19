import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const RootLayout = () => {
  return (
    <div className="bg-black h-max">
      <Navbar />
      <div className="p-10 h-max">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
