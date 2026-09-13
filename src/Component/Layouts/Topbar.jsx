
import { AppBar, Toolbar, Box, Button , Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { IconButton } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";
import { useThemeMode } from "../../context/ThemeContext";




export default function Topbar() {
  const { logout ,role } = useAuth();
  const navigate = useNavigate();
  const { mode, toggleTheme } = useThemeMode();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <IconButton onClick={toggleTheme} sx={{ mr: 2 }} >
          {mode === "light" ? <DarkMode /> : <LightMode />}
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />
         <Typography variant="body2" sx={{ mr: 2 }}>
          {role}
         </Typography>
        <Button variant="outlined" onClick={handleLogout}>
          Log out
        </Button>
      </Toolbar>
    </AppBar>
  );
}