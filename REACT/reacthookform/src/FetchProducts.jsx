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
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.description}</p>
      <p>Price: ${data?.price}</p>
    </div>
  );
}

export default FetchProducts;
