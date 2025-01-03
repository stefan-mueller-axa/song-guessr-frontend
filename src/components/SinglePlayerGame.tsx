import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  createSinglePlayerGame,
  initializeNextStep,
} from "@/service/singe-player-game-service";
import Guessing from "@/components/Guessing";
import Intro from "@/components/Intro";

type Props = {
  challengeId: string;
};

export default function SinglePlayerGame({ challengeId }: Props) {
  const [game, setGame] = useState(createSinglePlayerGame(challengeId));
  const [step, setStep] = useState<"INTRO" | "GUESSING" | "STATS">("INTRO");

  const onInitializeNextStep = () => {
    initializeNextStep(game);
    setStep(game.step);
  };

  return (
    <Box>
      <Typography>{game.title}</Typography>
      {step === "INTRO" && (
        <Intro game={game} onInitializeNextStep={onInitializeNextStep} />
      )}
      {step === "GUESSING" && (
        <Guessing
          game={game}
          setGame={setGame}
          onInitializeNextStep={onInitializeNextStep}
        />
      )}
    </Box>
  );
}
