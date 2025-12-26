import { useEffect, useState } from "react";
import Header from "../components/Header";

export default function Dashboard() {
  const [listings, setListings] = useState([]);
  const [raffles, setRaffles] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) return;

    // Fetch user's listings
    fetch("/api/my-listings", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setListings(data))
      .catch(err => setError("Failed to load listings"));

    // Fetch user's raffles
    fetch("/api/my-raffles", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setRaffles(data))
      .catch(err => setError("Failed to load raffles"));

    // Fetch user's tickets
    fetch("/api/my-tickets", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setTickets(data))
      .catch(err => setError("Failed to load tickets"));
  }, [token]);

  if (!token) return <p className="text-center mt-10">You must be logged in to view the dashboard.</p>;

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto mt-10 p-4">
        {error && <p className="text-red-500">{error}</p>}

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">My Listings</h2>
          {listings.length === 0 ? <p>No listings yet.</p> : (
            <ul className="space-y-2">
              {listings.map(l => (
                <li key={l._id} className="border p-3 rounded">
                  <strong>{l.title}</strong> - ${l.price}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">My Raffles</h2>
          {raffles.length === 0 ? <p>No raffles yet.</p> : (
            <ul className="space-y-2">
              {raffles.map(r => (
                <li key={r._id} className="border p-3 rounded">
                  <strong>{r.listing.title}</strong> - Ticket: ${r.ticketPrice} - Status: {r.status}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">My Tickets</h2>
          {tickets.length === 0 ? <p>No tickets purchased yet.</p> : (
            <ul className="space-y-2">
              {tickets.map(t => (
                <li key={t._id} className="border p-3 rounded">
                  {t.raffle.listing.title} - Purchased at {new Date(t.purchasedAt).toLocaleString()}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
