import { useState } from "react";

export default function Login({ onLogin }) {
  const [token, setToken] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("gh_token", token);
    onLogin();
  };

  return (
    <div className="w-full max-w-md mx-auto mt-20 p-6 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Enter GitHub Token</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="password"
          placeholder="GitHub Personal Access Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
