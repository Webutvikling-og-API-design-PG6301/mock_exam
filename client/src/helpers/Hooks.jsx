import { useState, useEffect } from "react";

export function useLoading(loadingFn) {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  async function reload() {
    try {
      setLoading(true);
      setData(await loadingFn());
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reload();
  }, []);

  return { data, error, loading };
}

export async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("failed to fetch: " + res.status + " " + res.statusText);
  }
  return await res.json();
}
