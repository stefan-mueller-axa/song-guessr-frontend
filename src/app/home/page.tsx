import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import Link from "next/link";
import { getFeaturedChallenges } from "@/service/challenge-service";

export default function Home() {
  const featuredThemes = getFeaturedChallenges().theme;
  const featuredArtists = getFeaturedChallenges().artist;

  return (
    <Box
      sx={{
        backgroundColor: "#0D47A1",
        minHeight: "100vh",
        color: "white",
        padding: 4,
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 4,
        }}
      >
        Welcome Back!
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {[
          { title: "Featured Themes", items: featuredThemes },
          { title: "Your Artists", items: featuredArtists },
        ].map((section, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              {section.title}
            </Typography>
            <Grid container spacing={2}>
              {section.items.map((challenge) => (
                <Grid item xs={12} sm={6} md={4} key={challenge.id}>
                  <Card
                    sx={{
                      background: "white",
                      borderRadius: 4,
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
                      transition: "transform 0.3s",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={`/challenges/${challenge.id}.jpg`}
                      alt={challenge.title}
                    />
                    <CardContent>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: 16,
                          color: "black",
                          fontWeight: "bold",
                        }}
                      >
                        {challenge.title}
                      </Typography>
                      <Link href={`/home/challenges/${challenge.id}`} passHref>
                        <Button
                          variant="contained"
                          sx={{
                            marginTop: 2,
                            backgroundColor: "#0D47A1",
                            color: "white",
                            fontWeight: "bold",
                            ":hover": {
                              backgroundColor: "#1565C0",
                            },
                          }}
                          fullWidth
                        >
                          Explore
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
