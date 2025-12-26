import Stripe from "stripe";
import dbConnect from "../../lib/db";
import Listing from "../../models/Listing";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { listingId, quantity } = req.body;

  if (!listingId || !quantity) return res.status(400).json({ message: "Missing fields" });

  const listing = await Listing.findById(listingId);
  if (!listing) return res.status(404).json({ message: "Listing not found" });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: listing.title },
            unit_amount: listing.price * 100, // cents
          },
          quantity,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
