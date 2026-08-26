"use client";

import type { ReactNode } from "react";

/* ---------- Slider over a continuous range ---------- */

export function Slider({
  label,
  min,
  max,
  step,
  value,
  onChange,
  fmt,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  fmt?: (v: number) => string;
}) {
  return (
    <div className="ctl-row">
      <label>{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <span className="read">{fmt ? fmt(value) : String(value)}</span>
    </div>
  );
}

/* ---------- Slider over a discrete list of values ---------- */

export function PickSlider({
  label,
  values,
  index,
  onChange,
  fmt,
}: {
  label: string;
  values: number[];
  index: number;
  onChange: (index: number) => void;
  fmt: (v: number) => string;
}) {
  return (
    <div className="ctl-row">
      <label>{label}</label>
      <input
        type="range"
        min={0}
        max={values.length - 1}
        step={1}
        value={index}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <span className="read">{fmt(values[index])}</span>
    </div>
  );
}

/* ---------- Segmented button group ---------- */

export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label?: string;
  options: Array<{ value: T; label: string }>;
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="ctl-row">
      {label ? <label>{label}</label> : null}
      <div className="seg">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            className={`seg-btn${o.value === value ? " active" : ""}`}
            onClick={() => onChange(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Select dropdown ---------- */

export function Select({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="ctl-row">
      <label>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ---------- Readout tiles ---------- */

export function Readouts({ children }: { children: ReactNode }) {
  return <div className="readouts">{children}</div>;
}

export function Readout({
  label,
  value,
  tone,
}: {
  label: string;
  value: ReactNode;
  tone?: "warn" | "good" | "amber";
}) {
  return (
    <div className="ro">
      <div className="ro-label">{label}</div>
      <div className={`ro-val${tone ? ` ${tone}` : ""}`}>{value}</div>
    </div>
  );
}

export function Controls({ children }: { children: ReactNode }) {
  return <div className="controls">{children}</div>;
}
