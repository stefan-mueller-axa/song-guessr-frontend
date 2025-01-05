import {
  createNextGuessingRound,
  makeGuessAndReturnIsCorrect,
  SinglePlayerGame,
} from "@/service/singe-player-game-service";
import {
  Box,
  Button,
  Input,
  InputLabel,
  Typography,
  keyframes,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { getSongById, Song } from "@/service/song-service";
import Countdown from "@/components/countdown";
import RandomGif, { getRandomGifName } from "@/components/RandomGif";
import { getChallengeById } from "@/service/challenge-service";

// Define the shake animation
const shakeAnimation = keyframes`
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    50% { transform: translateX(10px); }
    75% { transform: translateX(-10px); }
`;

type Props = {
  game: SinglePlayerGame;
  setGame: (game: SinglePlayerGame) => void;
  onInitializeNextStep: () => void;
};

const correctAudio = new Audio("/sound-effects/correct.m4a");
const incorrectAudio = new Audio("/sound-effects/incorrect.m4a");
const alarmAudio = new Audio("/sound-effects/alarm.m4a");

export default function Guessing({
  game,
  setGame,
  onInitializeNextStep,
}: Props) {
  const [currentSong, setCurrentSong] = useState<Song | undefined>();
  const [currentGuess, setCurrentGuess] = useState("");
  const [playingAudio, setPlayingAudio] = useState<HTMLAudioElement>();
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(
    null,
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFirstBox, setFirstBox] = useState(true);
  const [timeLimitReached, setTimeLimitReached] = useState(false);
  const [gif, setGif] = useState("");

  const nextRound = useCallback(() => {
    playingAudio?.pause();
    const updatedGame = createNextGuessingRound(game);

    const isLastRound = updatedGame === "ALL_ROUNDS_FINISHED";
    const isFirstRound =
      updatedGame !== "ALL_ROUNDS_FINISHED" &&
      updatedGame.guessing?.currentRound?.number === 0;

    if (isLastRound) {
      onInitializeNextStep();
      return;
    }

    if (isFirstRound) {
      setFirstBox(true);
    } else {
      setFirstBox(false);
    }

    setIsTransitioning(true); // Start transition animation
    setTimeout(
      () => {
        setGame(updatedGame);
        setCurrentSong(
          getSongById(updatedGame.guessing?.currentRound?.songId ?? ""),
        );
        setCurrentGuess("");
        setFeedback(null); // Reset feedback
        setIsTransitioning(false); // End transition animation
        setTimeLimitReached(false);
        setGif(getRandomGifName());
      },
      isFirstRound ? 0 : 500,
    ); // Match transition duration
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

  useEffect(() => {
    if (timeLimitReached) {
      alarmAudio.play();
      setTimeout(() => nextRound(), 1000);
    }
  }, [nextRound, timeLimitReached]);

  const handleGuess = useCallback(() => {
    if (currentGuess) {
      const guessResult = makeGuessAndReturnIsCorrect({
        game,
        guessedSongTitle: currentGuess,
      });
      setGame(guessResult.game);
      if (guessResult.isCorrect) {
        setFeedback("correct");
        correctAudio.play();
        setTimeout(nextRound, 500); // Proceed to next round after feedback
      } else {
        setFeedback("incorrect");
        incorrectAudio.play();
        setTimeout(() => setFeedback(null), 500); // Reset feedback
      }
    }
  }, [currentGuess, game, nextRound, setGame]);

  return (
    <Box
      sx={{
        position: "relative",
        background: "white",
        borderRadius: 4,
        border:
          feedback === "incorrect"
            ? "solid red 4px"
            : feedback === "correct"
              ? "solid green 4px"
              : "inherit",
        padding: 3,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)", // Black shadow
        width: 400,
        margin: "auto",
        textAlign: "center",
        transition: "scale 0.5s",
        scale: isTransitioning && !isFirstBox ? 0 : 1,
        animation: feedback === "incorrect" ? `${shakeAnimation} 0.5s` : "none", // Apply shake animation for incorrect guess
        color: "white", // White text
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "black" }}>
        {getChallengeById(game.challengeId)?.title ?? ""}
      </Typography>
      <Typography variant={"subtitle1"} sx={{ color: "black", mb: 2 }}>
        Song{" "}
        {game.guessing?.currentRound?.number
          ? game.guessing?.currentRound?.number + 1
          : 1}{" "}
        out of 10
      </Typography>
      <RandomGif gifName={gif} />

      {!isTransitioning && (
        <Countdown
          duration={30}
          onComplete={() => setTimeLimitReached(true)}
        ></Countdown>
      )}
      {timeLimitReached && (
        <Typography variant={"body1"} sx={{ color: "red" }}>
          Time limit reached!
        </Typography>
      )}
      {!timeLimitReached && (
        <>
          <InputLabel sx={{ color: "black" }}>Your Guess</InputLabel>
          <Input
            fullWidth
            disableUnderline={true}
            disabled={timeLimitReached}
            sx={{
              border: "2px solid #0D47A1",
              borderRadius: 2,
              padding: 1,
              fontSize: "1.1rem",
              mb: 2,
              color: "black",
              transition: "border-color 0.3s",
            }}
            onChange={(e) => setCurrentGuess(e.target.value)}
            value={currentGuess}
          />
          <Button
            variant="contained"
            sx={{
              background: "#0D47A1",
              color: "white",
              fontWeight: "bold",
              fontSize: "1rem",
              px: 3,
              py: 1,
              ":hover": {
                background: "#1565C0",
              },
            }}
            onClick={handleGuess}
          >
            Submit
          </Button>
        </>
      )}
    </Box>
  );
}
