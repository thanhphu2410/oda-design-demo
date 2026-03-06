"use client";
import React, { useState } from "react";

interface FilterBarProps {
  onApply?: (filters: FilterState) => void;
  variant?: "sell" | "buy";
}

interface FilterState {
  scope: "headquarters" | "company";
  period: string;
  compare: "none" | "last_period";
  status: string[];
}

const GREEN = "#5cb85c";
const GREY = "#6E6B7B";
const GREY_LIGHT = "#EBE9F1";

const STATUS_OPTIONS_SELL = [
  "Unconfirmed",
  "Confirmed",
  "Delivered",
  "Completed",
];

export const FilterBar = ({ onApply, variant = "buy" }: FilterBarProps) => {
  const [filters, setFilters] = useState<FilterState>({
    scope: "headquarters",
    period: "this_month",
    compare: "none",
    status: ["Unconfirmed", "Confirmed", "Delivered", "Completed"],
  });

  const btnBase: React.CSSProperties = {
    padding: "8px 14px",
    borderRadius: 8,
    border: `1px solid ${GREY_LIGHT}`,
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
    background: "#fff",
    color: GREY,
  };

  const filterBtnStyle: React.CSSProperties = {
    ...btnBase,
    background: "#F5F5F5",
    borderColor: GREY_LIGHT,
  };

  const downloadBtnStyle: React.CSSProperties = {
    padding: "8px 18px",
    borderRadius: 8,
    border: "none",
    background: GREEN,
    color: "#fff",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 8,
  };

  if (variant === "sell") {
    return (
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 500, color: GREY }}>
          Filter:
        </span>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            onClick={() => setFilters({ ...filters, scope: "headquarters" })}
            style={filterBtnStyle}
          >
            Happy Oda
          </button>
          <button style={filterBtnStyle}>By order date</button>
          <button
            onClick={() => setFilters({ ...filters, period: "this_month" })}
            style={filterBtnStyle}
          >
            This month
          </button>
          <button
            onClick={() => setFilters({ ...filters, compare: "none" })}
            style={filterBtnStyle}
          >
            No comparison
          </button>
          {STATUS_OPTIONS_SELL.map((s) => (
            <button key={s} style={filterBtnStyle}>
              {s}
            </button>
          ))}
        </div>
        <button style={filterBtnStyle}>
          <span style={{ marginRight: 6 }}>☰</span> Filter
        </button>
        <button style={downloadBtnStyle}>
          <span>☁↓</span> Download
        </button>
      </div>
    );
  }

  // Buy variant - original
  const activeBtn: React.CSSProperties = {
    ...btnBase,
    background: "rgba(92, 184, 92, 0.12)",
    borderColor: GREEN,
    color: GREEN,
  };

  const inactiveBtn: React.CSSProperties = {
    ...btnBase,
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: "14px 20px",
        border: `1px solid ${GREY_LIGHT}`,
        display: "flex",
        gap: 16,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <span
          style={{
            fontSize: 11,
            color: GREY,
            fontWeight: 600,
            marginRight: 4,
          }}
        >
          PHẠM VI
        </span>
        {(["headquarters", "company"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilters({ ...filters, scope: s })}
            style={filters.scope === s ? activeBtn : inactiveBtn}
          >
            {s === "headquarters" ? "Tổng công ty" : "Chi nhánh"}
          </button>
        ))}
      </div>

      <div style={{ width: 1, height: 28, background: GREY_LIGHT }} />

      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <span
          style={{
            fontSize: 11,
            color: GREY,
            fontWeight: 600,
            marginRight: 4,
          }}
        >
          KỲ
        </span>
        {[
          { key: "this_week", label: "Tuần này" },
          { key: "this_month", label: "Tháng này" },
          { key: "this_quarter", label: "Quý này" },
          { key: "this_year", label: "Năm nay" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilters({ ...filters, period: key })}
            style={filters.period === key ? activeBtn : inactiveBtn}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ width: 1, height: 28, background: GREY_LIGHT }} />

      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <span
          style={{
            fontSize: 11,
            color: GREY,
            fontWeight: 600,
            marginRight: 4,
          }}
        >
          SO SÁNH
        </span>
        {(["none", "last_period"] as const).map((c) => (
          <button
            key={c}
            onClick={() => setFilters({ ...filters, compare: c })}
            style={filters.compare === c ? activeBtn : inactiveBtn}
          >
            {c === "none" ? "Không" : "Kỳ trước"}
          </button>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      <button
        onClick={() => onApply?.(filters)}
        style={{
          padding: "8px 20px",
          borderRadius: 8,
          border: "none",
          background: GREEN,
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        Áp dụng
      </button>
    </div>
  );
};
