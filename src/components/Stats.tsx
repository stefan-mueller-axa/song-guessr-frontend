import { SinglePlayerGame } from "@/service/singe-player-game-service";
import { Typography } from "@mui/material";
import Link from "next/link";

export default function Stats({ game }: { game: SinglePlayerGame }) {
  const { stats } = game;
  if (!stats) {
    return <p>Error: Stats not found</p>;
  }

  return (
    <>
      {game.stats && (
        <>
          <Typography variant={"h2"}>Stats</Typography>

          <Typography variant={"body1"}>Total Points</Typography>
          <Typography variant={"body1"} sx={{ fontWeight: "bold" }}>
            {game.stats?.totalPoints}
          </Typography>

          <Typography variant={"body2"}>Percentage Correct</Typography>
          <Typography variant={"body2"} sx={{ fontWeight: "bold" }}>
            {game.stats?.percentageGuessedCorrect}
          </Typography>

          <Typography variant={"body2"}>Average Time To Guess</Typography>
          <Typography variant={"body2"} sx={{ fontWeight: "bold" }}>
            {game.stats?.averageTimeToGuessInMilliseconds}
          </Typography>

          <Link href="/home">Home</Link>
          <Link href={`/home/challenges/${game.challengeId}`}>Retry</Link>
        </>
      )}
    </>
  );
}
