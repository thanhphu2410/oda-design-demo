"use client";
import React, { useState } from "react";

const NAV_ITEMS = [
  { icon: "▦", label: "Dashboard", active: true },
  { icon: "🛒", label: "Sell", active: false },
  { icon: "📦", label: "Buy", active: false },
  { icon: "💳", label: "POS", active: false },
  { icon: "📋", label: "Inventory", active: false },
  { icon: "💡", label: "Suggestion", active: false },
  { icon: "📊", label: "Report", active: false },
  { icon: "👥", label: "Staffs", active: false },
  { icon: "🏢", label: "Branches", active: false },
  { icon: "⚙️", label: "Settings", active: false },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      style={{
        width: collapsed ? 64 : 240,
        minHeight: "100vh",
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.25s ease",
        flexShrink: 0,
        borderRight: "1px solid #EBE9F1",
      }}
    >
      {/* Logo - Oda */}
      <div
        style={{
          padding: "24px 16px",
          borderBottom: "1px solid #EBE9F1",
          display: "flex",
          flexDirection: "column",
          alignItems: collapsed ? "center" : "flex-start",
          gap: 4,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#E53935",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 700,
              color: "#fff",
              flexShrink: 0,
            }}
          >
            Oda
          </div>
          {!collapsed && (
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#263238" }}>
                Oda
              </div>
              <div style={{ fontSize: 11, color: "#6E6B7B", marginTop: 2 }}>
                order. so easy
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 12px" }}>
        {NAV_ITEMS.map(({ icon, label, active }) => (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "space-between",
              gap: 12,
              padding: "10px 14px",
              borderRadius: 8,
              marginBottom: 4,
              cursor: "pointer",
              background: active ? "#5cb85c" : "transparent",
              transition: "all 0.15s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  fontSize: 18,
                  flexShrink: 0,
                  color: active ? "#fff" : "#6E6B7B",
                }}
              >
                {icon}
              </span>
              {!collapsed && (
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: active ? 600 : 400,
                    color: active ? "#fff" : "#6E6B7B",
                  }}
                >
                  {label}
                </span>
              )}
            </div>
            {!collapsed && !active && (
              <span style={{ fontSize: 12, color: "#6E6B7B" }}>›</span>
            )}
          </div>
        ))}
      </nav>

      {/* User - moved to header in design, keep minimal or remove */}
      <div
        style={{
          padding: "14px 12px",
          borderTop: "1px solid #EBE9F1",
          display: collapsed ? "none" : "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#EBE9F1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 600,
            color: "#6E6B7B",
            flexShrink: 0,
          }}
        >
          HQ
        </div>
        {!collapsed && (
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#263238" }}>
              HQ Admin
            </div>
            <div style={{ fontSize: 10, color: "#6E6B7B" }}>Tổng công ty</div>
          </div>
        )}
      </div>
    </div>
  );
};
