import dbConnect from "../../lib/db";
import Listing from "../../models/Listing";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { title, description, price, images, token } = req.body;
    if (!token) return res.status(401).json({ message: "No token provided" });

    let userId;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.userId;
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const listing = await Listing.create({ title, description, price, images, user: userId });
    return res.status(201).json({ message: "Listing created", listing });
  }

  // GET all listings
  if (req.method === "GET") {
    const listings = await Listing.find().populate("user", "name email");
    return res.status(200).json(listings);
  }

  res.status(405).json({ message: "Method not allowed" });
}
