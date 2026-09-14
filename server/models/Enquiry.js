// server/models/Enquiry.js
import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    service: { type: String, trim: true },
    message: { type: String, trim: true },

    // basic spam signal — filled only if bots fill the honeypot field
    honeypot: { type: String, select: false },

    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

export default mongoose.model("Enquiry", enquirySchema);
