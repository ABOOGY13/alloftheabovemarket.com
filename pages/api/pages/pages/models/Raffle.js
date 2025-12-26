import mongoose from "mongoose";

const RaffleSchema = new mongoose.Schema({
  listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true },
  ticketPrice: { type: Number, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ["active", "completed"], default: "active" },
  winner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.models.Raffle || mongoose.model("Raffle", RaffleSchema);
