"use client";
import React, { useState } from "react";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { StatusOverview } from "@/components/dashboard/StatusOverview";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { ProductRankingChart } from "@/components/dashboard/ProductRankingChart";
import { SupplierRankingChart } from "@/components/dashboard/SupplierRankingChart";
import { CompanyPerformanceTable } from "@/components/dashboard/CompanyPerformanceTable";
import { FilterBar } from "@/components/dashboard/FilterBar";
import {
  mockSummaryData,
  mockSellSummaryData,
  mockSellStatusOverview,
  mockStatusOverview,
  mockTrendData,
  mockProductRanking,
  mockSupplierRanking,
  mockCompanyPerformance,
} from "@/lib/mockData";

const TAB_ITEMS = [
  { key: "sell", label: "Sell" },
  { key: "buy", label: "Buy" },
];

const GREEN = "#5cb85c";
const GREY_TEXT = "#6E6B7B";
const GREY_LIGHT = "#EBE9F1";

export default function DashboardPage() {
  const [tab, setTab] = useState("sell");
  const [showComparison, setShowComparison] = useState(false);

  const isSell = tab === "sell";
  const summaryData = isSell ? mockSellSummaryData : mockSummaryData;
  const statusData = isSell ? mockSellStatusOverview : mockStatusOverview;
  const totalOrderKey = isSell ? "totalSellOrder" : "totalBuyOrder";

  return (
    <div
      style={{
        flex: 1,
        minHeight: "100vh",
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Header Bar */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #EBE9F1",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 56,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>🍎</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#263238" }}>
            Happy Oda
          </span>
          <span style={{ fontSize: 12, color: GREY_TEXT, marginLeft: 4 }}>▼</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              color: GREY_TEXT,
              fontSize: 18,
            }}
          >
            🔔
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: GREY_LIGHT,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 600,
                color: GREY_TEXT,
              }}
            >
              U
            </div>
            <span style={{ fontSize: 14, fontWeight: 500, color: "#263238" }}>
              Happy Oda Owner
            </span>
            <span style={{ fontSize: 12, color: GREY_TEXT }}>▼</span>
          </div>
          <button
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: `2px solid ${GREEN}`,
              background: "#fff",
              fontSize: 13,
              fontWeight: 600,
              color: GREEN,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>↻</span> Refresh
          </button>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: "24px 28px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          overflowY: "auto",
        }}
      >
        {/* Page Title */}
        <div style={{ fontSize: 24, fontWeight: 700, color: "#263238" }}>
          Dashboard
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #EBE9F1" }}>
          {TAB_ITEMS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                padding: "12px 20px",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: tab === t.key ? 700 : 400,
                color: tab === t.key ? "#263238" : GREY_TEXT,
                borderBottom:
                  tab === t.key ? `3px solid ${GREEN}` : "3px solid transparent",
                marginBottom: -1,
                transition: "all 0.2s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Filter */}
        <FilterBar
          variant={isSell ? "sell" : "buy"}
          onApply={(f) => setShowComparison(f.compare === "last_period")}
        />

        {/* Summary Section */}
        <div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#263238",
              marginBottom: 16,
            }}
          >
            Summary
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <SummaryCard
              title={isSell ? "Total sell order" : "Tổng đơn mua"}
              count={(summaryData as any)[totalOrderKey].count}
              value={(summaryData as any)[totalOrderKey].value}
              aov={(summaryData as any)[totalOrderKey].aov}
              comparison={
                showComparison && !isSell
                  ? (mockSummaryData as any).totalBuyOrder?.comparisonRatio
                  : undefined
              }
              variant="green"
            />
            <SummaryCard
              title={isSell ? "Completed order" : "Đơn hoàn thành"}
              count={summaryData.completedOrder.count}
              value={summaryData.completedOrder.value}
              aov={summaryData.completedOrder.aov}
              comparison={
                showComparison
                  ? mockSummaryData.completedOrder.comparisonRatio
                  : undefined
              }
              variant="green"
            />
          </div>
        </div>

        {/* Status Overview */}
        <div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#263238",
              marginBottom: 16,
            }}
          >
            Status overview
          </div>
          <StatusOverview data={statusData} variant="cards" />
        </div>

        {/* Trends and metrics */}
        <div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#263238",
              marginBottom: 4,
            }}
          >
            Trends and metrics
          </div>
          <div
            style={{
              fontSize: 14,
              color: GREY_TEXT,
              marginBottom: 16,
            }}
          >
            {isSell ? "Sell orders" : "Buy orders"}
          </div>
          <TrendChart
            data={mockTrendData}
            variant={isSell ? "sell" : "buy"}
          />
        </div>

        {/* Rankings Row - only for buy */}
        {!isSell && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <ProductRankingChart
              top10={mockProductRanking.top10}
              bottom10={mockProductRanking.bottom10}
            />
            <SupplierRankingChart
              top10={mockSupplierRanking.top10}
              bottom10={mockSupplierRanking.bottom10}
            />
          </div>
        )}

        {/* Company Performance - only for buy */}
        {!isSell && (
          <CompanyPerformanceTable
            data={mockCompanyPerformance}
            showComparison={showComparison}
          />
        )}
      </div>
    </div>
  );
}
