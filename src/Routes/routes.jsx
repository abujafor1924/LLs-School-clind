import { createBrowserRouter } from "react-router-dom";
import Main from "../layer/Main";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login&registretion/Login";
import Registretion from "../Pages/Login&registretion/Registretion";
import Deshbord from "../layer/Deshbord";
import SelectedCls from "../Pages/Dashbord/SelectedCls";
import SelectedEnroll from "../Pages/Dashbord/SelectedEnroll";
import AddClasses from "../Pages/Dashbord/instructor/AddClasses";
import MyClass from "../Pages/Dashbord/instructor/MyClass";
import Class from "../Pages/Dashbord/student/Class";
import StudentEnroll from "../Pages/Dashbord/student/StudentEnroll";
import Instructor from "../Pages/Instructor/Instructor";
import AllClass from "../Pages/AllClass/AllClass";
import Payment from "../Pages/Dashbord/student/Payment";
import Protective from "./Protective";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "registretion",
        element: <Registretion></Registretion>,
      },
      {
        path: "instructor",
        element: <Instructor></Instructor>,
      },
      {
        path: "allClass",
        element: <AllClass></AllClass>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Deshbord></Deshbord>,
    errorElement: <Error />,
    children: [
      {
        path: "class",
        element: <SelectedCls></SelectedCls>,
      },
      {
        path: "enroll",
        element: <SelectedEnroll></SelectedEnroll>,
      },
      {
        path: "add",
        element: <AddClasses></AddClasses>,
      },
      {
        path: "myClass",
        element: <MyClass></MyClass>,
      },
      {
        path: "studentclass",
        element: (
          <Protective>
            <Class></Class>
          </Protective>
        ),
      },
      {
        path: "pay",
        element: <Payment></Payment>,
      },
      {
        path: "studentenroll",
        element: <StudentEnroll></StudentEnroll>,
      },
    ],
  },
]);
export default routes;
