import { useQuery } from "@tanstack/react-query";
import useAxiusSecure from "../../Components/Hook/useAxiusSecure";

const SelectedCls = () => {
  const [axiosSecure] = useAxiusSecure();
  const { refetch, data: users = [] } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure("/addDatas");
      // console.log("res from axios", res);
      return res.data;
    },
  });

  const handleapproved = (pd) => {
    fetch(`http://localhost:5000/addDatas/approved/${pd._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          alert("Approved");
        }
      });
  };
  const handleDenai = (pd) => {
    fetch(`http://localhost:5000/addDatas/denai/${pd._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          alert("Denai");
        }
      });
  };

  const handaleModal = () => {
    console.log("Open Modal");
  };
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
                <th>Image</th>
                <th>Name</th>
                <th>Email & Site</th>
                <th>Price</th>
                <th>Stetus</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {users.map((pd, index) => (
                <tr key={pd._id}>
                  <td>{index + 1}</td>
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
                    {" "}
                    <div>
                      <div>
                        Class name :{" "}
                        <span className="font-bold">{pd.Classname}</span>
                      </div>
                      <div className="text-sm ">Instructor : {pd.name}</div>
                    </div>
                  </td>
                  <td>
                    {pd.email}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      Aviable Site : {pd.available}
                    </span>
                  </td>
                  <td>Price : {pd.price}</td>
                  <th>
                    {pd.role === "approved" ? (
                      "approved"
                    ) : (
                      <button
                        onClick={() => handleapproved(pd)}
                        className="btn btn-ghost bg-orange-600  text-white"
                      >
                        <h1> approved</h1>
                      </button>
                    )}
                    {pd.role === "denai" ? (
                      "denai"
                    ) : (
                      <button
                        onClick={() => handleDenai(pd)}
                        className="btn btn-ghost bg-orange-600  text-white"
                      >
                        <h1> Denai</h1>
                      </button>
                    )}

                    {/* You can open the modal using ID.showModal() method */}
                    <button className="btn" onClick={() => handaleModal()}>
                      open modal
                    </button>
                    <dialog id="my_modal_3" className="modal">
                      <form method="dialog" className="modal-box">
                        <textarea
                          name="textarea"
                          cols="30"
                          rows="10"
                        ></textarea>
                      </form>
                    </dialog>
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

export default SelectedCls;
