import { useQuery } from "@tanstack/react-query";
import useAxiusSecure from "../../../Components/Hook/useAxiusSecure";

const MyClass = () => {
  const [axiosSecure] = useAxiusSecure();
  const { data: users = [] } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get(`allClass?email${users?.email}`);
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
                <th>Favorite Color</th>
                <th></th>
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
                  <td>Purple</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
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
