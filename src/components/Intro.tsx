import { SinglePlayerGame } from "@/service/singe-player-game-service";
import { Box, Typography } from "@mui/material";
import Countdown from "@/components/countdown";
import Image from "next/image";

const COUNTDOWN = 5;
type Props = {
  game: SinglePlayerGame;
  onInitializeNextStep: () => void;
};

export default function Intro({ game, onInitializeNextStep }: Props) {
  return (
    <Box
      sx={{
        textAlign: "center",
        background: "white",
        borderRadius: 4,
        padding: 3,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)", // Black shadow
        maxWidth: 400,
        margin: "auto",
        color: "white", // Ensure text is visible
      }}
    >
      <Image
        src={`/challenges/${game.challengeId}.jpg`}
        alt={"Challenge Cover"}
        width={400}
        height={400}
      />
      <Typography
        variant="h4"
        sx={{ mb: 2, fontWeight: "bold", color: "black" }} // White text
      >
        Ready Up!
      </Typography>
      <Typography variant="h6" sx={{ color: "black" }}>
        {game.numberOfRounds} Rounds
      </Typography>
      <Countdown duration={COUNTDOWN} onComplete={onInitializeNextStep} />
    </Box>
  );
}
