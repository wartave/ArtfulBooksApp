import React, {useState, useEffect} from 'react';
import HttpClient from '../utils/HttpClient';



function useGetRequest(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        const response = await HttpClient.get(url, {
          signal: controller.signal,
        });
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [url, token]);

  const reload = () => setToken(Date.now());

  return {
    data,
    error,
    loading,
    reload,
  };
}

export default useGetRequest;