import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";

const AllClass = () => {
  const [datas, setData] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    fetch("https://assingmrnt-12-server.vercel.app/allClass")
      .then((res) => res.json())
      .then((data) => {
        const approved = data.filter((item) => item.role === "approved");
        setData(approved);
      });
  }, []);

  const handleAddToEnroll = (item) => {
    console.log(item);
    if (user) {
      fetch("https://assingmrnt-12-server.vercel.app/enroll", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(item),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            alert("add to class");
          }
        });
    }
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 my-12">
        {datas.map((pd) => (
          <div key={pd._id} className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img src={pd.photo} alt="Shoes" className="rounded-xl h-72 " />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{pd.Classname}</h2>
              <p>{pd.name}</p>
              <div className="flex justify-evenly">
                <p className="mr-4"> Price : {pd.price}</p>
                <p> Site : {pd.available}</p>
              </div>
              <div className="card-actions">
                <button
                  onClick={() => handleAddToEnroll(pd)}
                  className="btn btn-primary"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllClass;
