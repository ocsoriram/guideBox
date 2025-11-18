"use client"

import { useEffect, useState } from "react";

export default function Home() {
  const apiBase =
    process.env.NEXT_PUBLIC_API_BASE_URL  || "http://localhost:8080";

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // 初回アクセス時にバックエンド(NEXT_PUBLIC_API_BASE_URL)から値を取得してmessageに格納
  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        setError("");
        const res = await fetch(`${apiBase}/hello`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        setMessage(text);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      }
    };
    fetchGreeting();
  }, []);

  return (
    <main style={{ fontFamily: "system-ui", padding: 24 }}>
      <h1>Hello, World! (Next.js)</h1>
      <p>
        Backend is expected at: <strong>{apiBase}</strong>
      </p>
      <p>
        Backend says: <strong>{message || "(loading...)"}</strong>
      </p>
      {error && <p style={{ color: "crimson" }}>Failed to fetch: {error}</p>}
      <p>
        Try backend endpoint:{" "}
        <a href={`${apiBase}/hello`} target="_blank" rel="noreferrer">
          {`${apiBase}/hello`}
        </a>
      </p>
    </main>
  );
}
