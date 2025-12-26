const handleBuy = async (listingId) => {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ listingId, quantity: 1 }),
  });
  const data = await res.json();
  if (data.url) window.location.href = data.url;
};
