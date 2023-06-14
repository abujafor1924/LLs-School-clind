import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold p-4">404 errors?</h1>
      <Link to={"/"}>Home</Link>
    </div>
  );
};

export default Error;
