import React, { useEffect, useState } from "react";
import { token } from "../config";
import axios from 'axios'

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(url, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        const result = await res.json();
        

        if (!res.ok) {
          return new Error(result.message);
        }
        setData(result.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };

    fetchData();
  }, [url]);
  return {
    data:data,
    loading:loading,
    error:error
  };
};

export default useFetchData;
