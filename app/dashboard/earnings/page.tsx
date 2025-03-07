"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
 
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
 
// Remove direct imports of server functions
// import { monthlyAwarded, monthlyEarnings } from "@/app/lib/data-m"

const awardedChartConfig = {
    value: {
        label: "Awarded",
        color: "#10b981",
    },
} satisfies ChartConfig;

const earningsChartConfig = {
    value: {
        label: "Earnings",
        color: "#f59e0b",
    },
} satisfies ChartConfig;

import React, { useState, useEffect } from "react";

function CombinedChart() {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        // Fetch combined data for both awarded and earnings
        Promise.all([
          fetch('/api/chart-data?type=awarded').then((response) => response.json()),
          fetch('/api/chart-data?type=earnings').then((response) => response.json()),
        ])
          .then(([awardedData, earningsData]) => {
            const combinedData = awardedData.map((item: any) => {
              const earningsItem = earningsData.find((e: any) => e.month === item.month);
              return {
            ...item,
            earnings: earningsItem ? earningsItem.earnings : 0,
              };
            });
            setData(combinedData);
          })
          .catch((error) =>
            console.error("Error fetching combined data:", error)
          );
    }, []);

    console.log(data);

    return (
        <>
            <h2 className="text-lg font-semibold">Awarded & Earnings</h2>
            <ChartContainer config={awardedChartConfig} className="min-h-[200px] w-full max-w-[600px]">
                <BarChart accessibilityLayer data={data}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="earnings" fill="green" radius={4} />
                    <Bar dataKey="awarded" fill="orange" radius={4} />
                    
                </BarChart>
            </ChartContainer>
        </>
    );
}


export default function Page(){
     return (
        <div className="flex flex-col space-y-4">
            <CombinedChart />
        </div>
      )
}