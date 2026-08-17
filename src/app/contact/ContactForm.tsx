"use client";

import { useState } from "react";
import { Send } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

const SUBJECTS = [
  "Research Collaboration",
  "Prospective Student Inquiry",
  "Media / Press",
  "General Question",
];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full bg-[#0A1628] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00D4FF]/40 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="bg-[#0A1628] border border-white/5 rounded-xl p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1.5">Name *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={update("name")}
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1.5">Email *</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={update("email")}
            placeholder="your@email.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1.5">Subject *</label>
        <select required value={form.subject} onChange={update("subject")} className={inputClass}>
          <option value="">Select a subject…</option>
          {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1.5">Message *</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={update("message")}
          placeholder="Your message…"
          className={inputClass + " resize-none"}
        />
      </div>

      {status === "success" && (
        <p className="text-sm text-emerald-400">Message sent! We will get back to you soon.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400">Something went wrong. Please try again or email us directly.</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 bg-[#0D4F6B] hover:bg-[#1A6F91] disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium text-sm transition-all"
      >
        <Send className="w-4 h-4" />
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
