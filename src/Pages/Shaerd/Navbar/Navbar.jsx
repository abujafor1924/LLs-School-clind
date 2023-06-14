import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Components/AuthProvider/AuthProvider";

const Navbar = () => {
  const { user, logdOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logdOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  const navbar = (
    <>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/instructor"}>Instructors</Link>
      </li>
      <li>
        <Link to={"/allClass"}>Classes</Link>
      </li>
      {user ? (
        <li>
          <Link to={"/dashboard"}>Dashboard</Link>
        </li>
      ) : (
        ""
      )}
    </>
  );
  return (
    <div className="navbar  bg-primary">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navbar}
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">LLC School</a>
      </div>
      <div className="navbar-center hidden lg:flex text-white">
        <ul className="menu menu-horizontal px-1">{navbar}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <img
              className="w-16 h-16 rounded-full p-2"
              src={user.photoURL}
              title={user?.displayName}
            />
            <button onClick={handleLogOut} className="btn  btn-warning">
              Log Out
            </button>
          </>
        ) : (
          <Link to={"/login"} className="btn  btn-warning">
            Loging
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
