import { useEffect, useState } from "react";
import axios from "axios";

const base_url = "https://fakestoreapi.com";

export default function useFetch(id) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await axios.get(`${base_url + id}`);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return { data, error, loading };
}