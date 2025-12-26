import { useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Signup successful! Please login.");
      router.push("/login");
    } else {
      setError(data.message);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-md mx-auto mt-10 p-4 border rounded">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="p-2 border rounded" />
          <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required className="p-2 border rounded" />
          <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} required className="p-2 border rounded" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Sign Up</button>
        </form>
      </div>
    </>
  );
}
