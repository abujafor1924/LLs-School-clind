import { useQuery } from "@tanstack/react-query";
import useAxiusSecure from "../../Components/Hook/useAxiusSecure";

const Instructor = () => {
  const [axiosSecure] = useAxiusSecure();
  const { data: users = [] } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure("/users/instructor");
      // console.log("res from axios", res);
      return res.data;
    },
  });
  return (
    <div className="py-8">
      <h1 className="text-4 font-bold">All Instructor : {users.length}</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Imaige</th>
              <th>Name</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={user?.photo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>

                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Instructor;
