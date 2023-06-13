import { useEffect, useState } from "react";

const PopularInstruction = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        const insteuctor = data.filter((item) => item.role === "instructor");
        setData(insteuctor);
      });
  }, []);
  return (
    <div className="py-6">
      <h1 className="text-4xl font-bold">Popular Enstruction</h1>
      <div className="grid grid-cols-4 gap-4">
        {data.map((pd) => (
          <div key={pd._id} className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img src={pd?.photo} alt="Shoes" className="rounded-xl h-72" />
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularInstruction;
