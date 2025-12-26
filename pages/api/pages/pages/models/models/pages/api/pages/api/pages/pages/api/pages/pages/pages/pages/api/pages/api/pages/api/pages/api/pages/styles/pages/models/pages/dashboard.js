<li key={l._id} className="border rounded shadow hover:shadow-lg transition overflow-hidden">
  {l.images && l.images[0] && (
    <img src={l.images[0]} alt={l.title} className="w-full h-40 object-cover" />
  )}
  <div className="p-3">
    <strong>{l.title}</strong>
    <p className="text-sm mt-1">${l.price}</p>
  </div>
</li>
