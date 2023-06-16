import { useQuery } from "@tanstack/react-query";
import useAxiusSecure from "../../Components/Hook/useAxiusSecure";

const SelectedEnroll = () => {
  const [axiosSecure] = useAxiusSecure();
  const { refetch, data: users = [] } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure("/users");

      return res.data;
    },
  });

  const handleAdmin = (user) => {
    fetch(`https://assingmrnt-12-server.vercel.app/users/admin/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
        }
      });
  };
  const handleInstructor = (user) => {
    fetch(
      `https://assingmrnt-12-server.vercel.app/users/instructor/${user._id}`,
      {
        method: "PATCH",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
        }
      });
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-4xl">Total User : {users.length}</h1>
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Addmin or Instructor</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <th>{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.role === "admin" ? (
                  "admin"
                ) : (
                  <button
                    onClick={() => handleAdmin(user)}
                    className="btn btn-ghost bg-orange-600  text-white"
                  >
                    <h1> Add Admin</h1>
                  </button>
                )}
                {user.role === "instructor" ? (
                  "instructor"
                ) : (
                  <button
                    onClick={() => handleInstructor(user)}
                    className="btn btn-ghost bg-orange-600  text-white"
                  >
                    <h1>Add Instructor</h1>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SelectedEnroll;
