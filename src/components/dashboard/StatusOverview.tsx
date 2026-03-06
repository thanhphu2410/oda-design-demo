"use client";
import React from "react";
import { formatCurrency, formatNumber } from "@/lib/utils";

interface StatusItem {
  status: string;
  count: number;
  value: number;
  color: string;
  bgColor?: string;
}

interface StatusOverviewProps {
  data: StatusItem[];
  variant?: "bar" | "cards";
}

export const StatusOverview = ({
  data,
  variant = "bar",
}: StatusOverviewProps) => {
  const total = data.reduce((s, d) => s + d.count, 0);

  if (variant === "cards") {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, minmax(180px, 1fr))`,
          gap: 16,
        }}
      >
        {data.map((item) => {
          const isGreen = item.color === "#5cb85c";
          const isRed = item.color === "#F46A6A";
          const bgColor =
            item.bgColor ||
            (isGreen
              ? "rgba(92, 184, 92, 0.15)"
              : isRed
                ? "rgba(244, 106, 106, 0.12)"
                : "rgba(144, 139, 165, 0.12)");
          return (
            <div
              key={item.status}
              style={{
                background: bgColor,
                borderRadius: 12,
                padding: "20px",
                border: "1px solid transparent",
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: item.color,
                  marginBottom: 12,
                }}
              >
                {item.status}
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: item.color,
                  marginBottom: 4,
                }}
              >
                {formatNumber(item.count)}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: item.color,
                  opacity: 0.9,
                }}
              >
                Total value {formatCurrency(item.value)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Bar variant (original)
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: "20px 24px",
        border: "1px solid #EBE9F1",
      }}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: "#37474F",
          marginBottom: 16,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        Trạng thái đơn hàng
      </div>

      <div
        style={{
          display: "flex",
          height: 8,
          borderRadius: 4,
          overflow: "hidden",
          marginBottom: 16,
        }}
      >
        {data.map((item) => (
          <div
            key={item.status}
            style={{
              width: `${total > 0 ? (item.count / total) * 100 : 0}%`,
              background: item.color,
              transition: "width 0.5s ease",
            }}
          />
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {data.map((item) => (
          <div
            key={item.status}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  background: item.color,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 12, color: "#546E7A" }}>
                {item.status}
              </span>
            </div>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#263238",
                  minWidth: 40,
                  textAlign: "right",
                }}
              >
                {formatNumber(item.count)}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "#90A4AE",
                  minWidth: 80,
                  textAlign: "right",
                }}
              >
                {formatCurrency(item.value, true)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
