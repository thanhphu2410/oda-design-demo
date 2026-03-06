"use client";
import React from "react";
import {
  formatCurrency,
  formatNumber,
  formatPercent,
  getTrendColor,
  getTrendIcon,
} from "@/lib/utils";

interface MetricRowProps {
  label: string;
  value: string;
  ratio?: number;
}

const MetricRow = ({ label, value, ratio }: MetricRowProps) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "6px 0",
    }}
  >
    <span style={{ fontSize: 13, color: "inherit", opacity: 0.9 }}>
      {label}
    </span>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 13, fontWeight: 600 }}>{value}</span>
      {ratio !== undefined && (
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: getTrendColor(ratio),
          }}
        >
          {getTrendIcon(ratio)} {formatPercent(Math.abs(ratio))}
        </span>
      )}
    </div>
  </div>
);

interface SummaryCardProps {
  title: string;
  count: number;
  value: number;
  aov: number;
  comparison?: { count: number; value: number; aov: number };
  accentColor?: string;
  variant?: "default" | "green";
}

const GREEN = "#5cb85c";
const LIGHT_GREEN_BG = "rgba(92, 184, 92, 0.12)";

export const SummaryCard = ({
  title,
  count,
  value,
  aov,
  comparison,
  accentColor = "#1565C0",
  variant = "default",
}: SummaryCardProps) => {
  const isGreen = variant === "green";
  const color = isGreen ? GREEN : accentColor;
  const bgColor = isGreen ? LIGHT_GREEN_BG : "#fff";
  const borderColor = isGreen ? "transparent" : accentColor;

  return (
    <div
      style={{
        background: bgColor,
        borderRadius: 12,
        padding: "20px 24px",
        border: `1px solid ${isGreen ? "rgba(92, 184, 92, 0.2)" : "#ECEFF1"}`,
        flex: 1,
        minWidth: 260,
        color: color,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            textTransform: "capitalize",
          }}
        >
          {title}
        </span>
        {isGreen && (
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              border: `2px solid ${color}`,
              fontSize: 10,
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            i
          </span>
        )}
      </div>
      <div
        style={{
          fontSize: 32,
          fontWeight: 700,
          marginBottom: 12,
        }}
      >
        {formatNumber(count)}
      </div>
      <MetricRow
        label="Total value"
        value={formatCurrency(value, true)}
        ratio={comparison?.value}
      />
      <MetricRow
        label="Average order value"
        value={formatCurrency(aov, true)}
        ratio={comparison?.aov}
      />
    </div>
  );
};
