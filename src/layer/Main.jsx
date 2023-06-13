import { Outlet } from "react-router-dom";

import Navbar from "../Pages/Shaerd/Navbar/Navbar";
import Footer from "../Pages/Shaerd/Footer/Footer";

const Main = () => {
  return (
    <div>
      <Navbar />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};

export default Main;
