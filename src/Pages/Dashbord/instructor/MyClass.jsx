import { useQuery } from "@tanstack/react-query";
import useAxiusSecure from "../../../Components/Hook/useAxiusSecure";
import useAuth from "../../../Components/Hook/useAuth";

const MyClass = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiusSecure();
  const { data: users = [] } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get(`allClass?email=${user?.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <h1 className="text-4xl font bold">my class : {users.length}</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Images</th>
                <th>Status</th>
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
                    </div>
                  </td>
                  <td>
                    <p>{pd.role}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyClass;
