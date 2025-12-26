import { useEffect, useState } from "react";
import Header from "../components/Header";

export default function Dashboard() {
  const [listings, setListings] = useState([]);
  const [raffles, setRaffles] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) return;

    fetch("/api/my-listings", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setListings(data))
      .catch(() => setError("Failed to load listings"));

    fetch("/api/my-raffles", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setRaffles(data))
      .catch(() => setError("Failed to load raffles"));

    fetch("/api/my-tickets", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setTickets(data))
      .catch(() => setError("Failed to load tickets"));
  }, [token]);

  if (!token) return <p className="text-center mt-10">You must be logged in to view the dashboard.</p>;

  const filteredListings = listings.filter(l => l.title.toLowerCase().includes(search.toLowerCase()));
  const filteredRaffles = raffles.filter(r => filter === "all" || r.status === filter);

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto mt-10 p-4">
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="Search listings..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border p-2 rounded w-full md:w-1/3"
          />
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">All Raffles</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Listings */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">My Listings</h2>
          {filteredListings.length === 0 ? <p>No listings found.</p> : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredListings.map(l => (
                <li key={l._id} className="border p-3 rounded shadow hover:shadow-lg transition">
                  <strong>{l.title}</strong>
                  <p className="text-sm mt-1">${l.price}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Raffles */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">My Raffles</h2>
          {filteredRaffles.length === 0 ? <p>No raffles found.</p> : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRaffles.map(r => (
                <li key={r._id} className="border p-3 rounded shadow hover:shadow-lg transition">
                  <strong>{r.listing.title}</strong>
                  <p>Ticket: ${r.ticketPrice}</p>
                  <p>Status: {r.status}</p>
                  {r.status === "completed" && r.winner && (
                    <p className="text-green-600">Winner: {r.winner.name}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Tickets */}
        <section>
          <h2 className="text-2xl font-bold mb-4">My Tickets</h2>
          {tickets.length === 0 ? <p>No tickets purchased yet.</p> : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tickets.map(t => (
                <li key={t._id} className="border p-3 rounded shadow hover:shadow-lg transition">
                  {t.raffle.listing.title}
                  <p className="text-sm mt-1">Purchased at: {new Date(t.purchasedAt).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
