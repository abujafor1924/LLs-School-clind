import { useQuery } from "@tanstack/react-query";
import useAxiusSecure from "../../../Components/Hook/useAxiusSecure";
import { Link } from "react-router-dom";

const Class = () => {
  const [axiosSecure] = useAxiusSecure();
  const { refetch, data: users = [] } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure("/enroll");
      // console.log("res from axios", res);
      return res.data;
    },
  });

  const handleDelete = (item) => {
    // console.log(item._id);
    fetch(`http://localhost:5000/enroll/${item._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          alert("remove Classes");
        }
        // console.log(data);
      });
  };

  const handleadded = (pd) => {
    console.log(pd);
  };

  return (
    <div>
      {/* <h1>Class student : {users.length}</h1> */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image& Name</th>
              <th>Price</th>
              <th>Remove</th>
              <th>Enroll</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((pd, index) => (
              <tr key={pd._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={pd.photo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{pd.Classname}</div>
                      <div className="text-sm opacity-50">{pd.name}</div>
                    </div>
                  </div>
                </td>
                <td>$ {pd.price}</td>
                <td>
                  <button
                    onClick={() => handleDelete(pd)}
                    className="btn btn-warning"
                  >
                    Remove
                  </button>
                </td>
                <th>
                  <Link
                    onClick={() => {
                      handleadded(pd);
                    }}
                    to={"/dashboard/pay"}
                    className="btn btn-primary"
                  >
                    Payment
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Class;
