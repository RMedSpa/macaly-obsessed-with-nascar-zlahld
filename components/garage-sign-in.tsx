"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";

type Step =
  | "signIn"
  | "signUp"
  | "forgot"
  | { type: "verifyEmail"; email: string }
  | { type: "resetPassword"; email: string };

const inputClass =
  "w-full rounded-md border border-white/15 bg-black/40 px-3 py-2.5 font-oswald text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-strategy-yellow";

export default function GarageSignIn() {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<Step>("signIn");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const field = (
    <div>
      {error && (
        <p className="mb-3 rounded-md border border-nascar-red/40 bg-nascar-red/10 px-3 py-2 font-oswald text-sm text-nascar-red">
          {error}
        </p>
      )}
    </div>
  );

  if (step === "forgot") {
    return (
      <form
        className="space-y-4"
        onSubmit={async (event) => {
          event.preventDefault();
          setError(null);
          setIsLoading(true);
          const formData = new FormData(event.currentTarget);
          try {
            await signIn("password", formData);
            setStep({ type: "resetPassword", email: String(formData.get("email") ?? "") });
          } catch (err) {
            setError(err instanceof Error ? err.message : "Could not send reset code.");
          } finally {
            setIsLoading(false);
          }
        }}
      >
        <h2 className="font-archivo uppercase text-white text-2xl">Reset code</h2>
        <input name="email" type="email" required className={inputClass} placeholder="Email" />
        <input name="flow" type="hidden" value="reset" />
        {field}
        <button type="submit" disabled={isLoading} className="w-full rounded-md bg-nascar-red py-3 font-oswald uppercase tracking-wider text-white">
          {isLoading ? "Sending…" : "Send reset code"}
        </button>
        <button type="button" className="w-full font-oswald text-sm text-white/60" onClick={() => setStep("signIn")}>
          Back to sign in
        </button>
      </form>
    );
  }

  if (typeof step === "object" && step.type === "resetPassword") {
    return (
      <form
        className="space-y-4"
        onSubmit={async (event) => {
          event.preventDefault();
          setError(null);
          setIsLoading(true);
          const formData = new FormData(event.currentTarget);
          try {
            await signIn("password", formData);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Could not reset password.");
          } finally {
            setIsLoading(false);
          }
        }}
      >
        <h2 className="font-archivo uppercase text-white text-2xl">New password</h2>
        <input name="code" inputMode="numeric" pattern="\d{6}" required className={inputClass} placeholder="6-digit code" />
        <input name="newPassword" type="password" required minLength={8} className={inputClass} placeholder="New password" />
        <input name="email" type="hidden" value={step.email} />
        <input name="flow" type="hidden" value="reset-verification" />
        {field}
        <button type="submit" disabled={isLoading} className="w-full rounded-md bg-nascar-red py-3 font-oswald uppercase tracking-wider text-white">
          {isLoading ? "Saving…" : "Reset password"}
        </button>
      </form>
    );
  }

  if (typeof step === "object" && step.type === "verifyEmail") {
    return (
      <form
        className="space-y-4"
        onSubmit={async (event) => {
          event.preventDefault();
          setError(null);
          setIsLoading(true);
          const formData = new FormData(event.currentTarget);
          try {
            await signIn("resend-otp", formData);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Invalid or expired code.");
          } finally {
            setIsLoading(false);
          }
        }}
      >
        <h2 className="font-archivo uppercase text-white text-2xl">Verify email</h2>
        <p className="font-oswald text-sm text-white/60">Code sent to {step.email}</p>
        <input name="code" inputMode="numeric" pattern="\d{6}" required className={inputClass} placeholder="6-digit code" />
        <input name="email" type="hidden" value={step.email} />
        <input name="flow" type="hidden" value="email-verification" />
        {field}
        <button type="submit" disabled={isLoading} className="w-full rounded-md bg-nascar-red py-3 font-oswald uppercase tracking-wider text-white">
          {isLoading ? "Checking…" : "Verify"}
        </button>
      </form>
    );
  }

  return (
    <form
      data-testid="garage-sign-in"
      className="space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();
        setError(null);
        setIsLoading(true);
        const formData = new FormData(event.currentTarget);
        try {
          await signIn("password", formData);
          if (step === "signUp") {
            setStep({ type: "verifyEmail", email: String(formData.get("email") ?? "") });
          }
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Sign-in failed.";
          setError(msg.includes("already exists") ? "That email is already in. Sign in." : msg);
        } finally {
          setIsLoading(false);
        }
      }}
    >
      <h2 className="font-archivo uppercase text-white text-2xl">
        {step === "signUp" ? "Join the garage" : "Sign in"}
      </h2>
      <p className="font-oswald text-sm text-white/60">One car per account. Crew chief, not a driving game.</p>
      <input name="email" type="email" required className={inputClass} placeholder="Email" />
      <input
        name="password"
        type="password"
        required
        minLength={8}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={inputClass}
        placeholder="Password (8+)"
      />
      <input name="flow" type="hidden" value={step === "signUp" ? "signUp" : "signIn"} />
      {field}
      <button type="submit" disabled={isLoading} className="w-full rounded-md bg-nascar-red py-3 font-oswald uppercase tracking-wider text-white">
        {isLoading ? "Working…" : step === "signUp" ? "Create account" : "Sign in"}
      </button>
      <div className="flex flex-wrap justify-between gap-2 font-oswald text-xs uppercase tracking-wide">
        <button type="button" className="text-strategy-yellow" onClick={() => setStep(step === "signUp" ? "signIn" : "signUp")}>
          {step === "signUp" ? "Have an account?" : "Need an account?"}
        </button>
        <button type="button" className="text-white/50" onClick={() => setStep("forgot")}>
          Forgot
        </button>
      </div>
    </form>
  );
}
