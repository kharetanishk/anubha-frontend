"use client";

import apiInstance from "@/lib/api";
import { useEffect, useState } from "react";

export default function TestPage() {
  const [backendData, setBackendData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      type response = {
        data: {
          message: string;
        };
      };
      try {
        const res: response = await apiInstance.get("/health");
        console.log("Backend Response:", res.data);

        const data: string = res.data.message;
        // Set data to UI state
        setBackendData(data.toLocaleUpperCase());
      } catch (err: any) {
        console.error("Backend Error:", err.response?.data || err.message);
        setBackendData("Error fetching data");
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Hello World</h1>

      <h2>Backend Response:</h2>

      <pre className="bg-gray-200 p-3 rounded">
        {backendData ? JSON.stringify(backendData, null, 2) : "Loading..."}
      </pre>
    </div>
  );
}
