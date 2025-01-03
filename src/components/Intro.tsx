import { SinglePlayerGame } from "@/service/singe-player-game-service";
import { Typography } from "@mui/material";
import Countdown from "@/components/countdown";

const COUNTDOWN = 1;
type Props = {
  game: SinglePlayerGame;
  onInitializeNextStep: () => void;
};

export default function Intro({ game, onInitializeNextStep }: Props) {
  return (
    <>
      <Typography>{"Ready Up!"}</Typography>
      <Typography>{game.numberOfRounds} Rounds</Typography>
      <Countdown duration={COUNTDOWN} onComplete={onInitializeNextStep} />
    </>
  );
}
