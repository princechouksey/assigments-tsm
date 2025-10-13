import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(
    () => {
      if (!url) return new Error("Url is not provided");
      const fetchData = async () => {
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error("Response is not ok");
          const result =await  res.json();
          setData(result);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    },
    [url]
  );
  return {data , loading, error}
}
export default useFetch;
