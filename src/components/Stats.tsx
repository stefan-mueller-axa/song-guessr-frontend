import { SinglePlayerGame } from "@/service/singe-player-game-service";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

export default function Stats({ game }: { game: SinglePlayerGame }) {
  const { stats } = game;
  if (!stats) {
    return <Typography>Error: Stats not found</Typography>;
  }

  return (
    <Box
      sx={{
        textAlign: "center",
        background: "white",
        borderRadius: 4,
        padding: 4,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
        maxWidth: 600,
        margin: "auto",
        color: "white",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "black",
          mb: 2,
        }}
      >
        🎉 Your Stats 🎉
      </Typography>

      <Typography variant={"subtitle1"} sx={{ color: "black" }}>
        Played {game.numberOfRounds} Rounds
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mt: 3,
        }}
      >
        <Box
          sx={{
            background: "rgba(255, 255, 255, 0.1)",
            padding: 2,
            borderRadius: 2,
            flex: "1 1 45%",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography variant="body1" sx={{ color: "black" }}>
            Total Points
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#0D47A1" }}
          >
            {Math.floor(stats.totalPoints)}
          </Typography>
        </Box>

        <Box
          sx={{
            background: "rgba(255, 255, 255, 0.1)",
            padding: 2,
            borderRadius: 2,
            flex: "1 1 45%",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography variant="body1" sx={{ color: "black" }}>
            Percentage Correct
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#0D47A1" }}
          >
            {Math.round(stats.percentageGuessedCorrect * 100) / 100}%
          </Typography>
        </Box>

        <Box
          sx={{
            background: "rgba(255, 255, 255, 0.1)",
            padding: 2,
            borderRadius: 2,
            flex: "1 1 45%",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography variant="body1" sx={{ color: "black" }}>
            Average Time To Guess
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#0D47A1" }}
          >
            {Math.round(stats.averageTimeToGuessInMilliseconds * 100) / 100}s
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mt: 4,
        }}
      >
        <Link href={`/home/challenges/${game.challengeId}`}>
          <Button
            variant="contained"
            sx={{
              background: "#0D47A1",
              color: "white",
              fontWeight: "bold",
              ":hover": { background: "#1565C0" },
            }}
          >
            Retry
          </Button>
        </Link>
        <Link href="/home">
          <Button
            variant="contained"
            sx={{
              background: "#0D47A1",
              color: "white",
              fontWeight: "bold",
              ":hover": { background: "#1565C0" },
            }}
          >
            Home
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
