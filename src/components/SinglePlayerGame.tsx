import { Box } from "@mui/material";
import React, { useState } from "react";
import {
  createSinglePlayerGame,
  initializeNextStep,
} from "@/service/singe-player-game-service";
import Guessing from "@/components/Guessing";
import Intro from "@/components/Intro";
import Stats from "@/components/Stats";

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
    <Box
      sx={{
        background: "#0D47A1",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        color: "white",
      }}
    >
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
      {step === "STATS" && <Stats game={game} />}
    </Box>
  );
}
