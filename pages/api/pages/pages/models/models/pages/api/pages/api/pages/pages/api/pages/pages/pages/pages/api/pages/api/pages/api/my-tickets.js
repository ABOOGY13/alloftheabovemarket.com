import dbConnect from "../../lib/db";
import Ticket from "../../models/Ticket";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await dbConnect();

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  let userId;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = decoded.userId;
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const tickets = await Ticket.find({ user: userId }).populate({ path: "raffle", populate: "listing" });
  res.status(200).json(tickets);
}
