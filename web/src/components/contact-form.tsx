"use client";

import { useId, useRef, useState } from "react";
import { ArrowRight } from "./ui/icons";
import { contact, services } from "@/lib/content";

type Errors = Partial<Record<"name" | "email" | "company" | "topic" | "message", string>>;
type State = "idle" | "sending" | "sent";

const field =
  "border-line focus:border-accent w-full rounded-[6px] border bg-white px-[15px] py-[13px] text-[15px] leading-[22px] text-ink transition-colors outline-none placeholder:text-[#9aa4bd]";

export function ContactForm() {
  const uid = useId();
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [failure, setFailure] = useState<string | null>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setState("sending");
    setErrors({});
    setFailure(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await res.json().catch(() => ({}));

      if (res.ok) {
        form.reset();
        setState("sent");
        statusRef.current?.focus();
        return;
      }
      if (res.status === 422 && payload.errors) {
        setErrors(payload.errors as Errors);
        setState("idle");
        return;
      }
      setFailure(payload.error ?? "Something went wrong. Please email us directly.");
      setState("idle");
    } catch {
      setFailure("We could not reach the server. Please email us directly.");
      setState("idle");
    }
    statusRef.current?.focus();
  }

  if (state === "sent") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="border-line rounded-[10px] border bg-white px-[26px] py-[34px] outline-none"
      >
        <h2 className="t-card-title text-[20px] leading-[28px]">
          Thank you — your message is on its way.
        </h2>
        <p className="t-body-sm text-body mt-[12px] max-w-[420px]">
          We read everything that comes in and will reply to the address you
          gave us.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="text-accent arrow-slide mt-[22px] inline-flex items-center gap-[10px] text-[15px] font-semibold"
        >
          Send another message
          <ArrowRight />
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="border-line rounded-[10px] border bg-white px-[24px] pt-[28px] pb-[30px] sm:px-[32px]"
    >
      {failure && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="mb-[24px] rounded-[6px] bg-[#fdeced] px-[16px] py-[13px] text-[14px] leading-[22px] text-[#8f1d24] outline-none"
        >
          {failure}{" "}
          <a href={`mailto:${contact.email}`} className="font-semibold underline">
            {contact.email}
          </a>
        </div>
      )}

      <div className="grid gap-[18px] sm:grid-cols-2">
        <Field id={`${uid}-name`} name="name" label="Your name" error={errors.name} required />
        <Field
          id={`${uid}-email`}
          name="email"
          type="email"
          label="Email"
          error={errors.email}
          required
        />
      </div>

      <div className="mt-[18px] grid gap-[18px] sm:grid-cols-2">
        <Field id={`${uid}-company`} name="company" label="Organisation" error={errors.company} />
        <div>
          <label
            htmlFor={`${uid}-topic`}
            className="text-ink block text-[14px] font-semibold"
          >
            What can we help with?
          </label>
          <select id={`${uid}-topic`} name="topic" defaultValue="" className={`${field} mt-[8px]`}>
            <option value="">Not sure yet</option>
            {services.map((s) => (
              <option key={s.title} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Something else">Something else</option>
          </select>
        </div>
      </div>

      <div className="mt-[18px]">
        <label
          htmlFor={`${uid}-message`}
          className="text-ink block text-[14px] font-semibold"
        >
          What are you trying to decide?{" "}
          <span className="text-accent" aria-hidden>
            *
          </span>
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={6}
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${uid}-message-error` : undefined}
          placeholder="The problem, the data you have, and what a good answer would let you do."
          className={`${field} mt-[8px] resize-y`}
        />
        {errors.message && (
          <p id={`${uid}-message-error`} className="mt-[7px] text-[13px] text-[#b3202a]">
            {errors.message}
          </p>
        )}
      </div>

      {/* honeypot — hidden from people, tempting to bots */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor={`${uid}-website`}>Leave this field empty</label>
        <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-[26px] flex flex-wrap items-center gap-x-[24px] gap-y-[14px]">
        <button
          type="submit"
          disabled={state === "sending"}
          className="bg-deep hover:bg-deep-hover arrow-slide inline-flex h-[54px] items-center gap-[12px] rounded-[6px] px-[26px] text-[15px] font-semibold text-white transition-colors disabled:opacity-70"
        >
          {state === "sending" ? "Sending…" : "Send message"}
          <ArrowRight />
        </button>
        <p className="text-body-light max-w-[300px] text-[13px] leading-[20px]">
          We only use your details to reply. No lists, no forwarding.
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  error,
  required,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-ink block text-[14px] font-semibold">
        {label}{" "}
        {required && (
          <span className="text-accent" aria-hidden>
            *
          </span>
        )}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={name === "email" ? "email" : name === "name" ? "name" : "organization"}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${field} mt-[8px]`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-[7px] text-[13px] text-[#b3202a]">
          {error}
        </p>
      )}
    </div>
  );
}
