import React from "react";

export const StatRow: React.FC<{
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
}> = ({ label, value, valueClassName }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-gray-300">{label}</span>
    <span
      className={`font-semibold ${valueClassName ?? "text-green-200"}`}
    >
      {value ?? "-"}
    </span>
  </div>
);

export const SectionCard: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <section className="rounded-lg border border-green-700/40 bg-[#161616] p-4 shadow">
    <h3 className="mb-3 font-[Cinzel] text-lg text-green-200">{title}</h3>
    <div className="space-y-2">{children}</div>
  </section>
);

export const Spinner: React.FC<{ label?: string }> = ({ label }) => (
  <div className="flex flex-col items-center gap-3 text-green-200">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
    {label ? (
      <span className="text-sm font-semibold text-green-200">{label}</span>
    ) : null}
  </div>
);

