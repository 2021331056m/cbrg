"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { withBasePath } from "@/lib/utils";

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
      const res = await fetch(withBasePath("/api/contact"), {
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
    "w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] transition-all shadow-xs";

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-7 space-y-4 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Name *</label>
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
          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Email *</label>
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
        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Subject *</label>
        <select required value={form.subject} onChange={update("subject")} className={inputClass + " cursor-pointer"}>
          <option value="">Select a subject…</option>
          {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Message *</label>
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
        <p className="text-sm font-semibold text-emerald-600">Message sent! We will get back to you soon.</p>
      )}
      {status === "error" && (
        <p className="text-sm font-semibold text-red-600">Something went wrong. Please try again or email us directly.</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 bg-[#002147] hover:bg-[#0284C7] disabled:opacity-50 text-white px-7 py-3 rounded-lg font-bold text-sm transition-all shadow-sm"
      >
        <Send className="w-4 h-4" />
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
