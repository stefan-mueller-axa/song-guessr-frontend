import { SinglePlayerGame } from "@/service/singe-player-game-service";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

const COUNTDOWN = 5;
type Props = {
  game: SinglePlayerGame;
  onInitializeNextStep: () => void;
};

export default function Intro({ game, onInitializeNextStep }: Props) {
  const [countDown, setCountDown] = useState<number>(COUNTDOWN);

  useEffect(() => {
    const interval = setInterval(() => {
      if (game.intro && game.intro.timeStarted) {
        const remainingTime = Math.ceil(
          COUNTDOWN - (Date.now() - game.intro.timeStarted.getTime()) / 1000,
        );
        console.log(remainingTime);

        if (remainingTime <= 0) {
          clearInterval(interval);
          onInitializeNextStep();
        } else {
          setCountDown(() => remainingTime); // Update state with the latest remaining time
        }
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [game.intro, onInitializeNextStep]); // Removed `countDown` from dependencies

  return (
    <>
      <Typography>{"Ready Up!"}</Typography>
      <Typography>{game.numberOfRounds} Rounds</Typography>
      <Typography>{countDown}</Typography>
    </>
  );
}
