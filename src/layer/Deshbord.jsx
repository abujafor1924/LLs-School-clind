import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Components/Hook/useAdmin";
import useInstructor from "../Components/Hook/useInstructor";

const Deshbord = () => {
  // TODO: lod data isAdmin
  // const isInstructor = false;
  // const isAdmin = true;
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-red-600 text-base-content">
          {isAdmin ? (
            <>
              <div>
                <li>
                  <NavLink to="/dashboard/class">Manage Classes</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/enroll">Manage Users</NavLink>
                </li>
              </div>
            </>
          ) : isInstructor ? (
            <>
              <div>
                <li>
                  <NavLink to="/dashboard/add">Add Class</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/myClass">My Classes</NavLink>
                </li>
              </div>
            </>
          ) : (
            <>
              <div>
                <li>
                  <NavLink to="/dashboard/studentclass">
                    My Selected Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/studentenroll">
                    My Enrolled Classes
                  </NavLink>
                </li>
              </div>
            </>
          )}

          <div className="divider"></div>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Deshbord;
