import { NextResponse } from 'next/server';
import { fetchDashboardData } from '@/app/lib/data.server';

export async function GET() {
  try {
    // Option 1: If using authentication
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json(
    //     { error: 'Unauthorized: Please login to access this resource' },
    //     { status: 401 }
    //   );
    // }
    
    // Fetch dashboard data from your database
    // Replace this with your actual data fetching logic
    const dashboardData = {
      summary: {
        totalProducts: 24,
        totalTransactions: 152,
        totalRevenue: "Rp 45.780.000",
        activeUsers: 85,
        topSellingProduct: "iPhone 13 Pro Max"
      },
      chartData: {
        revenueData: [
          { month: "Jan", online: 5000000, retail: 3200000 },
          { month: "Feb", online: 5500000, retail: 3400000 },
          { month: "Mar", online: 6200000, retail: 3800000 },
          { month: "Apr", online: 6800000, retail: 4100000 },
          { month: "May", online: 7500000, retail: 4600000 },
          { month: "Jun", online: 8200000, retail: 4900000 }
        ]
      }
    };

    // 3. Return JSON response
    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Dashboard API error:', error);
    
    // 4. Return error as JSON (not HTML)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}