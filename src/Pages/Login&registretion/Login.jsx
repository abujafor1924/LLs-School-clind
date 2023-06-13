import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";
import SocialLogin from "../Shaerd/SosialLogin/SocialLogin";

const Login = () => {
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { singIn } = useContext(AuthContext);
  const navigat = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const onSubmit = (data) => {
    console.log(data);
    singIn(data.email, data.password).then((res) => {
      const logdUser = res.user;
      console.log(logdUser);
      navigat(from, { replace: true });
    });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col ">
        <h1 className="text-3xl font-bold">Login Now</h1>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                {...register("email", { required: true })}
                name="email"
                className="input input-bordered"
              />
              {errors.email && <span>This field is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <input
                type={show ? "text" : "password"}
                placeholder="password"
                name="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
                className="input input-bordered"
              />
              {errors.password?.type === "required" && (
                <p>This field is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p>is less than 6 characters</p>
              )}
              <p onClick={() => setShow(!show)}>
                <small>
                  {show ? (
                    <span>Hide Password</span>
                  ) : (
                    <span>Show Password</span>
                  )}
                </small>
              </p>
            </div>
            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value="Login" />
            </div>
            <SocialLogin></SocialLogin>

            <p>
              have no Account?{" "}
              <Link className="text-amber-500" to={"/registretion"}>
                sing up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
