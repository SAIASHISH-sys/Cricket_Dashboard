"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { dummyCricketPlayers } from "../lib/dummycricketdata";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface PerformanceChartsProps {
  playerId: string;
}

export function PerformanceCharts({ playerId }: PerformanceChartsProps) {
  const [loading, setLoading] = React.useState(true);
  const [comparisonPlayerId, setComparisonPlayerId] = useState<string>("");

  // Get the selected player's data
  const selectedPlayer = dummyCricketPlayers.find((p) => p.id === playerId);
  const performanceData = selectedPlayer?.performanceTrend || [];

  // Get comparison data based on selected comparison player
  const getComparisonData = () => {
    if (!selectedPlayer) return [];
    
    if (comparisonPlayerId && comparisonPlayerId !== "default") {
      // Compare with selected player
      const comparisonPlayer = dummyCricketPlayers.find((p) => p.id === comparisonPlayerId);
      if (comparisonPlayer) {
        return [
          {
            name: selectedPlayer.name,
            runs: selectedPlayer.totalRuns,
            centuries: selectedPlayer.totalCenturies,
          },
          {
            name: comparisonPlayer.name,
            runs: comparisonPlayer.totalRuns,
            centuries: comparisonPlayer.totalCenturies,
          },
        ];
      }
    }
    
    // Default: show top 3 players
    return dummyCricketPlayers
      .filter((p) => p.role === "Batsman" || p.role === "All-rounder" || p.role === "Wicketkeeper-Batsman")
      .sort((a, b) => b.totalRuns - a.totalRuns)
      .slice(0, 3)
      .map((p) => ({
        name: p.name,
        runs: p.totalRuns,
        centuries: p.totalCenturies,
      }));
  };

  const comparisonData = getComparisonData();

  React.useEffect(() => {
    // Simulate data fetching
    setLoading(true);
    // Reset comparison when main player changes
    setComparisonPlayerId("");
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [playerId]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="h-[300px] flex items-center justify-center">
          <Skeleton className="h-[80%] w-[90%]" />
        </Card>
        <Card className="h-[300px] flex items-center justify-center">
          <Skeleton className="h-[80%] w-[90%]" />
        </Card>
      </div>
    );
  }

  if (!selectedPlayer) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <p className="text-muted-foreground">No player data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Player Info Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Country</p>
              <p className="text-lg font-semibold">{selectedPlayer.country}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <p className="text-lg font-semibold">{selectedPlayer.role}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Runs</p>
              <p className="text-lg font-semibold">{selectedPlayer.totalRuns.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Centuries</p>
              <p className="text-lg font-semibold">{selectedPlayer.totalCenturies}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Runs Scored Over Years</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={performanceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="runs"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                  animationDuration={800}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average & Strike Rate Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={performanceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" orientation="left" stroke="#82ca9d" />
                <YAxis yAxisId="right" orientation="right" stroke="#ffc658" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="average"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  animationDuration={800}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="strikeRate"
                  stroke="#ffc658"
                  strokeWidth={2}
                  animationDuration={800}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle>Player Comparison (Runs & Centuries)</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Compare with:</span>
              <Select value={comparisonPlayerId} onValueChange={setComparisonPlayerId}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Top 3 players" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Top 3 players</SelectItem>
                  {dummyCricketPlayers
                    .filter((p) => p.id !== playerId)
                    .map((player) => (
                      <SelectItem key={player.id} value={player.id}>
                        {player.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={comparisonData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="runs" fill="#8884d8" animationDuration={800} />
                <Bar yAxisId="right" dataKey="centuries" fill="#82ca9d" animationDuration={800} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}