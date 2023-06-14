import { useEffect, useState } from "react";

const PopularClass = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://assingmrnt-12-server.vercel.app/allClass")
      .then((res) => res.json())
      .then((data) => {
        const approved = data.filter((item) => item.role === "approved");
        setData(approved);
      });
  }, []);
  return (
    <div>
      <h1 className="text-4xl font-bold">Popular Class</h1>
      <div className="grid md:grid-cols-4 gap-4 mx-auto">
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

export default PopularClass;
