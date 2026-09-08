
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function StatCard({ label, value, icon }) {
  return (
    <Card sx={{ minWidth: 200 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Box>
          {icon}
        </Box>
      </CardContent>
    </Card>
  );
}