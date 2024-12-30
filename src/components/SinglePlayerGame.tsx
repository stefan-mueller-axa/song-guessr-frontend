import { Box } from "@mui/material";
import { useState } from "react";
import {
  createSinglePlayerGame,
  initializeNextStep,
} from "@/service/singe-player-game-service";
import Intro from "@/components/Intro";

type Props = {
  challengeId: string;
};

export default function SinglePlayerGame({ challengeId }: Props) {
  const [game] = useState(createSinglePlayerGame(challengeId));

  const onInitializeNextStep = () => {
    initializeNextStep(game.id);
  };

  let stepComponent = <></>;
  switch (game.step) {
    case "INTRO":
      stepComponent = (
        <Intro game={game} onInitializeNextStep={onInitializeNextStep} />
      );
      break;
  }

  return <Box>{stepComponent}</Box>;
}
