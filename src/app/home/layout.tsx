import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import Link from "next/link";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PeopleIcon from "@mui/icons-material/People";
import AppsIcon from "@mui/icons-material/Apps";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#0D47A1",
      }}
    >
      {/* AppBar */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#0D47A1",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            <Link
              href="/home"
              style={{ textDecoration: "none", color: "white" }}
            >
              Song Guessr
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container
        component="main"
        sx={{
          flex: 1,
          marginTop: 4,
          color: "white",
        }}
      >
        {children}
      </Container>

      {/* Bottom Navigation */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#1565C0",
          boxShadow: "0 -4px 10px rgba(0, 0, 0, 0.4)",
          mt: 4,
        }}
      >
        <BottomNavigation
          showLabels
          sx={{ backgroundColor: "#1565C0", color: "white" }}
        >
          <BottomNavigationAction
            label="All Artists"
            icon={<PeopleIcon />}
            sx={{ color: "white" }}
          />
          <BottomNavigationAction
            label="All Collections"
            icon={<AppsIcon />}
            sx={{ color: "white" }}
          />
        </BottomNavigation>
      </Box>
    </Box>
  );
}
