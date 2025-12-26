import { useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ name: data.name, userId: data.userId }));
      router.push("/");
    } else {
      setError(data.message);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-md mx-auto mt-10 p-4 border rounded">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required className="p-2 border rounded" />
          <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} required className="p-2 border rounded" />
          <button type="submit" className="bg-green-500 text-white p-2 rounded">Login</button>
        </form>
      </div>
    </>
  );
}
