"use client";

import { FormEvent, useEffect, useState } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CITY_SUGGESTIONS = ["Mumbai", "Delhi", "Bengaluru", "Pune"];

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [cityHintIndex, setCityHintIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCityHintIndex((prev) => (prev + 1) % CITY_SUGGESTIONS.length);
    }, 1400);

    return () => clearInterval(timer);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    if (!EMAIL_REGEX.test(normalizedEmail)) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizedEmail,
          name: name.trim(),
          city: city.trim(),
          website: website.trim(),
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        message?: string;
      };

      if (!response.ok) {
        throw new Error(data.message || "Could not submit right now.");
      }

      setStatus("success");
      setMessage(
        data.message || "You're in. We will notify you when VOOM launches.",
      );
      setEmail("");
      setName("");
      setCity("");
      setWebsite("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Could not submit right now.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="surface-card border-[#F5A623] p-6">
        <p className="headline-display text-4xl text-[#F0EDE8]">
          YOU&apos;RE IN. WE&apos;LL HIT YOU WHEN YOUR CITY GOES LIVE.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="surface-card p-5 sm:p-6"
      aria-label="Join VOOM Cabs waitlist"
    >
      <p className="section-label">Join the private beta</p>
      <div className="mt-3 grid gap-3">
        <label htmlFor="waitlist-email" className="text-[12px] text-[#7A7A7A]">
          EMAIL (REQUIRED)
        </label>
        <input
          id="waitlist-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          placeholder="you@example.com"
          className="tight-input"
        />
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="waitlist-name" className="text-[12px] text-[#7A7A7A]">
            NAME (OPTIONAL)
          </label>
          <input
            id="waitlist-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            className="tight-input"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="waitlist-city" className="text-[12px] text-[#7A7A7A]">
            CITY (OPTIONAL)
          </label>
          <input
            id="waitlist-city"
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder={CITY_SUGGESTIONS[cityHintIndex]}
            className="tight-input"
          />
        </div>
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-4 w-full rounded-[2px] bg-[#F5A623] px-4 py-3 text-2xl leading-none text-black headline-display transition duration-150 ease-out hover:brightness-110 hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? "SYNCING..." : "JOIN THE WAITLIST"}
      </button>

      <p className="mt-3 text-[10px] uppercase tracking-[0.12em] text-[#7A7A7A]">
        NO SPAM. ONLY LAUNCH UPDATES, CITY ROLLOUTS, AND EARLY ACCESS INVITES.
      </p>

      {message ? (
        <p className="mt-3 text-sm text-[#E05252]" role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
