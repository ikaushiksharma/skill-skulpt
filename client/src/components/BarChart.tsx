"use client";
import { useTheme } from "next-themes";
import React from "react";
import { BarChart as BarGraph, ResponsiveContainer, XAxis, YAxis, Bar } from "recharts";
import { UserProgressProps } from "@/types";

export default function BarChart({ data }: { data: UserProgressProps[] }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const color = isDark ? "#ffffff" : "#000000";
  const chartData = data.map((item) => {
    return {
      name: item.course.name,
      total: Math.ceil((item.chapters.length / item.course.totalChapters) * 100),
      totalCount: 100,
    };
  });
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarGraph data={chartData}>
        <XAxis dataKey={"name"} tickLine={false} axisLine={false} stroke="#888888" fontSize={12} />
        <YAxis
          dataKey={"totalCount"}
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
          tickFormatter={(value) => `${value}`}
        />
        <Bar fill={color} dataKey={"total"} radius={[4, 4, 0, 0]} />
      </BarGraph>
    </ResponsiveContainer>
  );
}
