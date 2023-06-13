// import { useContext } from "react";
import { useForm } from "react-hook-form";
// import { AuthContext } from "../../../Components/AuthProvider/AuthProvider";

const AddClasses = () => {
  // const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    //     formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    fetch("http://localhost:5000/addDatas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        alert("added your product");
        reset(result);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between gap-4 my-4">
          <input
            type="text"
            placeholder="Class name"
            {...register("Classname")}
            className="input input-bordered input-primary w-full max-w-xs"
          />
          <input
            type="url"
            placeholder=" Image"
            {...register("photo")}
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>
        <div className="flex justify-between gap-4 my-4">
          <input
            type="text"
            placeholder=" name"
            // defaultValue={user.displayName}
            {...register("name")}
            className="input input-bordered input-primary w-full max-w-xs"
          />
          <input
            type="email"
            placeholder="email"
            // defaultValue={user.email}
            {...register("email")}
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>
        <div className="flex justify-between gap-4 my-4">
          <input
            type="number"
            placeholder="available"
            // {...register("available")}
            {...register("available", {
              setValueAs: (value) => parseInt(value),
            })}
            className="input input-bordered input-primary w-full max-w-xs"
          />
          <input
            type="number"
            placeholder="Number"
            // {...register("Price")}
            {...register("price", { setValueAs: (value) => parseInt(value) })}
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>
        <div className="my-4">
          <input
            className="btn btn-primary"
            type="submit"
            value="Add Classes"
          />
        </div>
      </form>
    </div>
  );
};

export default AddClasses;
