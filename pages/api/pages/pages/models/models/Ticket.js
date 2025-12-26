import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
  raffle: { type: mongoose.Schema.Types.ObjectId, ref: "Raffle", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  purchasedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Ticket || mongoose.model("Ticket", TicketSchema);
