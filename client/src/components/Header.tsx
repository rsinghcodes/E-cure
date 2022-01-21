import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ color: "#000000DE", bgcolor: "#ffffff" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            E-Cure
          </Typography>
          <Button color="inherit">Login as Doctor</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
