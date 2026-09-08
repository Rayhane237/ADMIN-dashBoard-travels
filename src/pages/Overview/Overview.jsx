// src/pages/Overview/Overview.jsx
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import adminAxios from "../../api/axiosInstance";
import StatCard from "../../Component/StatCard";

export default function Overview() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    adminAxios.get("/statCards").then((res) => setStats(res.data));
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard label="Flights" value={stats?.totalFlightBookings ?? "—"} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard label="Hotels" value={stats?.totalHotelBookings ?? "—"} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard label="Messages" value={stats?.totalMessages ?? "—"} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard label="Users" value={stats?.totalUsers ?? "—"} />
      </Grid>
    </Grid>
  );
}