import {
  createNextGuessingRound,
  initializeNextStep,
  makeGuessAndReturnIsCorrect,
  SinglePlayerGame,
} from "@/service/singe-player-game-service";
import { Button, Input, InputLabel, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { getSongById, Song } from "@/service/song-service";

type Props = {
  game: SinglePlayerGame;
  setGame: (game: SinglePlayerGame) => void;
  onInitializeNextStep: () => void;
};

export default function Guessing({
  game,
  setGame,
  onInitializeNextStep,
}: Props) {
  const [currentSong, setCurrentSong] = useState<Song | undefined>();
  const [currentGuess, setCurrentGuess] = useState("");
  const [playingAudio, setPlayingAudio] = useState<HTMLAudioElement>();

  const nextRound = useCallback(() => {
    playingAudio?.pause();
    const updatedGame = createNextGuessingRound(game);

    if (updatedGame === "ALL_ROUNDS_FINISHED") {
      onInitializeNextStep();
      return;
    }

    setGame(updatedGame);

    setCurrentSong(
      getSongById(updatedGame.guessing?.currentRound?.songId ?? ""),
    );
  }, [game, onInitializeNextStep, playingAudio, setGame]);

  useEffect(() => {
    if (!game.guessing) {
      throw new Error("Game not in Guessing state!");
    }

    const { guessing } = game;
    // Start first round
    if (!guessing.currentRound) {
      nextRound();
    }
  }, [game, nextRound, setGame]);

  useEffect(() => {
    if (currentSong) {
      const audio = new Audio(`/songs/${currentSong.id}.mp3`);
      audio.play();
      setPlayingAudio(audio);
    }
  }, [currentSong]);

  const handleGuess = useCallback(() => {
    if (currentGuess) {
      const guessResult = makeGuessAndReturnIsCorrect({
        game,
        guessedSongTitle: currentGuess,
      });
      setGame(guessResult.game);
      if (guessResult.isCorrect) {
        nextRound();
      }
    }
  }, [currentGuess, game, setGame]);

  return (
    <>
      {game.guessing?.currentRound && (
        <>
          <Typography>{"Guess The Song!"}</Typography>

          <Typography>{currentSong?.title}</Typography>
          <InputLabel>Your guess</InputLabel>
          <Input
            type={"text"}
            onChange={(e) => {
              setCurrentGuess(e.target.value);
            }}
          ></Input>
          <Button onClick={handleGuess}>Submit</Button>
        </>
      )}
    </>
  );
}
