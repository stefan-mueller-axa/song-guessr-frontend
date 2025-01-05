import { Box, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  createSinglePlayerGame,
  initializeNextStep,
} from "@/service/singe-player-game-service";
import Guessing from "@/components/Guessing";
import Intro from "@/components/Intro";
import Stats from "@/components/Stats";
import Link from "next/link";
import { getChallengeById } from "@/service/challenge-service";

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
        position: "relative", // Position for the back button
      }}
    >
      {/* Back Button */}
      <Link
        href={
          getChallengeById(game.challengeId)?.id
            ? `/home/challenges/${getChallengeById(game.challengeId)?.id}`
            : "/"
        }
      >
        <ArrowBackIcon
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            color: "white",
          }}
        />
      </Link>

      {/* Game Steps */}
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
