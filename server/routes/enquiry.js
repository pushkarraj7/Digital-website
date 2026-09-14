// server/routes/enquiry.js
import { Router } from "express";
import { Resend } from "resend";
import Enquiry from "../models/Enquiry.js";

const resend = new Resend(process.env.RESEND_API_KEY);

function sendEnquiryEmail(enquiry) {
  return resend.emails.send({
    from: "MVM Website <onboarding@resend.dev>",
    to: process.env.EMAIL_TO,
    subject: `New Enquiry from ${enquiry.name}`,
    html: `
      <h2>New Enquiry Received</h2>
      <p><strong>Name:</strong> ${enquiry.name}</p>
      <p><strong>Email:</strong> ${enquiry.email}</p>
      <p><strong>Phone:</strong> ${enquiry.phone || "-"}</p>
      <p><strong>Service:</strong> ${enquiry.service || "-"}</p>
      <p><strong>Message:</strong> ${enquiry.message || "-"}</p>
    `,
  });
}

const router = Router();

// simple in-memory rate limit: max 5 submissions per IP per 10 minutes
const submissionLog = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (submissionLog.get(ip) || []).filter(
    (t) => now - t < WINDOW_MS,
  );
  timestamps.push(now);
  submissionLog.set(ip, timestamps);
  return timestamps.length > MAX_PER_WINDOW;
}

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, service, message, honeypot } = req.body;

    // bots fill hidden fields — silently accept but don't save
    if (honeypot) {
      return res.status(200).json({ success: true });
    }

    if (isRateLimited(req.ip)) {
      return res
        .status(429)
        .json({ error: "Too many submissions. Try again later." });
    }

    if (!name?.trim() || !email?.trim()) {
      return res.status(400).json({ error: "Name and email are required." });
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      service,
      message,
    });

    sendEnquiryEmail(enquiry).catch((err) =>
      console.error("Email send failed:", err.message),
    );

    res.status(201).json({ success: true, id: enquiry._id });
  } catch (err) {
    console.error("Enquiry save failed:", err.message);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

export default router;
