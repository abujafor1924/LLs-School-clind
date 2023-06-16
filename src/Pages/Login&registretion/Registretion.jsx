import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";
import SocialLogin from "../Shaerd/SosialLogin/SocialLogin";
import { Link, useNavigate } from "react-router-dom";

const Registretion = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateUser } = useContext(AuthContext);

  const onSubmit = (data) => {
    console.log(data);

    createUser(data.email, data.password).then((res) => {
      const logdUser = res.user;
      console.log(logdUser);
      updateUser(data.name, data.photo)
        .then(() => {
          const collectUser = {
            name: data.name,
            email: data.email,
            photo: logdUser.photoURL,
          };
          fetch("https://assingmrnt-12-server.vercel.app/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(collectUser),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                navigate("/");
              }
            });
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col ">
        <h1 className="text-5xl font-bold">Sing up now!</h1>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                {...register("name")}
                name="name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">email</span>
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
                <span className="label-text">password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*?[A-Z])(?=.*?[#?!@$%^&*-])/,
                })}
                className="input input-bordered"
              />
              {errors.password?.type === "required" && (
                <p>This field is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p>is less than 6 characters</p>
              )}
              {errors.password?.type === "pattern" && (
                <p>
                  don,t have a capital letter and don,t have a special character
                </p>
              )}
            </div>
            {/* <div className="form-control">
              <label className="label">
                <span className="label-text">confirm Password</span>
              </label>

              <input
                className="input-field"
                type="password"
                placeholder="Password"
                name="cpassword"
                {...register("cpassword", {
                  validate: (value) => value === "password",
                })}
              ></input>
              <p>{errors.cpassword?.message}</p>
            </div> */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">picture</span>
              </label>
              <input
                type="url"
                placeholder="photo"
                name="photo"
                {...register("photo")}
                className="input input-bordered"
              />
            </div>

            <div className="form-control mt-6">
              <input
                className="btn btn-primary"
                type="submit"
                value="Sign up"
              />
            </div>
            <SocialLogin></SocialLogin>
            <p>
              have a Account?{" "}
              <Link className="text-amber-500" to={"/login"}>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registretion;
