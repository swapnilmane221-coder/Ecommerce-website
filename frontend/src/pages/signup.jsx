import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const BASE = import.meta.env.VITE_DJANGO_BASE_URL;
  const [form, setForm] = useState({ username: "", email: "", password: "", password2: "" });
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch(`${BASE}/api/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("success:Account created. Redirecting to login...");
        setTimeout(() => nav("/login"), 1200);
      } else {
        const errorMsg = data.username || data.password || JSON.stringify(data);
        setMsg(`error:${errorMsg}`);
      }
    } catch (err) {
      console.error(err);
      setMsg("error:Signup failed. Please try again later.");
    }
  };

  // Helper to render message with conditional styling
  const renderMessage = () => {
    if (!msg) return null;
    const isError = msg.startsWith("error:");
    const text = msg.replace(/^(error:|success:)/, "");
    return (
      <div className={`mt-4 p-3 rounded text-sm font-medium border ${
        isError ? "bg-red-50 text-red-700 border-red-200" : "bg-green-50 text-green-700 border-green-200"
      }`}>
        {text}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900 tracking-tight">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join us today to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Username</label>
            <input
              name="username"
              onChange={handleChange}
              value={form.username}
              placeholder="johndoe"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Email Address</label>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              value={form.email}
              placeholder="name@company.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Password</label>
              <input
                name="password"
                type="password"
                onChange={handleChange}
                value={form.password}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Confirm</label>
              <input
                name="password2"
                type="password"
                onChange={handleChange}
                value={form.password2}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Create Account
          </button>
        </form>

        {renderMessage()}

        <p className="text-center text-sm text-gray-500 pt-4">
          Already have an account?{" "}
          <button onClick={() => nav("/login")} className="font-medium text-blue-600 hover:text-blue-500 underline-offset-4 hover:underline">
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;