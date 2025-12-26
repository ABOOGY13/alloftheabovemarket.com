import dbConnect from "../../lib/db";
import Raffle from "../../models/Raffle";
import Ticket from "../../models/Ticket";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { raffleId, token } = req.body;
  if (!token) return res.status(401).json({ message: "No token provided" });

  let userId;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = decoded.userId;
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const raffle = await Raffle.findById(raffleId);
  if (!raffle || raffle.status !== "active") return res.status(400).json({ message: "Raffle not active" });

  const ticket = await Ticket.create({ raffle: raffleId, user: userId });
  return res.status(201).json({ ticket });
}
