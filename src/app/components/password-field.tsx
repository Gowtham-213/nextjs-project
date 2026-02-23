"use client";

import { useState } from "react";

type PasswordFieldProps = {
  label: string;
  name: string;
  placeholder?: string;
  autoComplete?: string;
};

export function PasswordField({
  label,
  name,
  placeholder,
  autoComplete = "current-password",
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="text-sm font-medium text-slate-800"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          required
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="absolute inset-y-1.5 right-1.5 rounded-lg px-3 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50"
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}
