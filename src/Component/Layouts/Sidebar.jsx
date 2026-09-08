
import { Drawer, List, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

const links = [
  { to: "/overview", label: "Overview" },
  { to: "/flights", label: "Flights" },
  { to: "/hotels", label: "Hotels" },
  { to: "/messages", label: "Messages" },
  { to: "/users", label: "Users" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar>Phnes Admin</Toolbar>
      <List>
        {links.map((link) => (
          <ListItemButton
            key={link.to}
            selected={location.pathname === link.to}
            onClick={() => navigate(link.to)}
          >
            <ListItemText primary={link.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}