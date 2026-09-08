
import { AppBar, Toolbar, Box, Button , Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function Topbar() {
  const { logout ,role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
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