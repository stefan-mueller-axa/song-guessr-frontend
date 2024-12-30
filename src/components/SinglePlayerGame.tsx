import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import { createSinglePlayerGame, initializeNextStep } from '@/service/singe-player-game-service'
import Guessing from '@/components/Guessing'

type Props = {
  challengeId: string;
};

export default function SinglePlayerGame({ challengeId }: Props) {
  const [game] = useState(createSinglePlayerGame(challengeId));

  const onInitializeNextStep = () => {
    initializeNextStep(game.id);
  };

  return (
    <Box>
      <Typography>{game.title}</Typography>
      {game.ste'INTRO'INTRO" && (
        <Intro game={game} onInitializeNextStep={onInitializeNextStep} />
      )}
      {game.step === 'GUESSING' && <Guessing />}
    </Box>
  );
}
