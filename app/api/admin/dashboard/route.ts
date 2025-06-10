// app/api/admin/dashboard/route.ts
import { NextResponse } from "next/server";
import { fetchDashboardData } from "@/app/lib/data.server";

export async function GET() {
  try {
    const dashboardData = await fetchDashboardData();
    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}