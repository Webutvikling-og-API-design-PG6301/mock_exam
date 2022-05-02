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

  useEffect(() => reload(), []);

  return { reload, data, error, loading };
}

export async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("failed to fetch: " + res.status + " " + res.statusText);
  }
  return await res.json();
}

export async function postJSON(url, object) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(object),
  });
  if (!res.ok) {
    throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
  }
}
