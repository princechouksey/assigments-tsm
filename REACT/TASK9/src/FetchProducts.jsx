import React from "react";
import useFetch from "./useFetch";

function FetchProducts() {
  const { data, error, loading } = useFetch(
    "https://fakestoreapi.com/products/1"
  );
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-blue-950">
      <div className=" p-4 w-[35vw] h-[50vh] bg-white rounded ring-0 ">
      
      <h1 className="text-2xl font-bold">{data?.title}</h1>
      <p className="mt-3 text-gray-800 mb-5">{data?.description}</p>
      <p className="font-bold ">Price: ${data?.price}</p>
    </div>
    </div>

  );
}

export default FetchProducts;
