<section className="mb-10">
  <h2 className="text-2xl font-bold mb-4">My Raffles</h2>
  {raffles.length === 0 ? <p>No raffles yet.</p> : (
    <ul className="space-y-2">
      {raffles.map(r => (
        <li key={r._id} className="border p-3 rounded">
          <strong>{r.listing.title}</strong> - Ticket: ${r.ticketPrice} - Status: {r.status}
          {r.status === "completed" && r.winner && (
            <p className="text-green-600">Winner: {r.winner.name}</p>
          )}
        </li>
      ))}
    </ul>
  )}
</section>
