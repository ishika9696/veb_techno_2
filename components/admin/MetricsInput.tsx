"use client";

import { Plus, X } from "lucide-react";

interface Metric {
  label: string;
  value: string;
}

interface MetricsInputProps {
  values: Metric[];
  onChange: (values: Metric[]) => void;
}

export default function MetricsInput({ values, onChange }: MetricsInputProps) {
  const addMetric = () => {
    onChange([...values, { label: "", value: "" }]);
  };

  const removeMetric = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  const updateMetric = (index: number, field: keyof Metric, val: string) => {
    const newValues = [...values];
    newValues[index] = { ...newValues[index], [field]: val };
    onChange(newValues);
  };

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        Key Results / Metrics
      </label>
      <div className="space-y-2">
        {values.map((metric, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={metric.label}
              onChange={(e) => updateMetric(index, "label", e.target.value)}
              placeholder="Label (e.g. Faster Reporting)"
              className="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
            />
            <input
              type="text"
              value={metric.value}
              onChange={(e) => updateMetric(index, "value", e.target.value)}
              placeholder="Value (e.g. +85%)"
              className="w-32 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
            />
            <button
              type="button"
              onClick={() => removeMetric(index)}
              className="shrink-0 rounded-lg border border-border p-2 text-muted-foreground hover:bg-red-50 hover:text-red-500 hover:border-red-200 dark:hover:bg-red-950 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addMetric}
        className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:border-accent-500/50 hover:text-accent-600 transition-colors"
      >
        <Plus size={14} /> Add metric
      </button>
    </div>
  );
}
