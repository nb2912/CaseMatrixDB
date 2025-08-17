"use client";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log error to monitoring service
    // console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Something went wrong</h1>
      <p className="text-lg text-gray-700 mb-8">{error.message}</p>
      <button onClick={reset} className="px-4 py-2 bg-blue-600 text-white rounded">Try Again</button>
    </div>
  );
}
