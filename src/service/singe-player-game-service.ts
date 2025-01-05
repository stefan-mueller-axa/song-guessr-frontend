import {
  getChallengeById,
  getRandomSongFromChallenge,
} from "@/service/challenge-service";
import { v4 as uuidv4 } from "uuid";
import { getSongById } from "@/service/song-service";

// const GUESSING_DURATION_IN_SECONDS = 15;
// const INTRO_DURATION_IN_SECONDS = 10;
const NUMBER_OF_ROUNDS = 10;
export const TIME_LIMIT_IN_MILLISECONDS = 1500;

export type SinglePlayerGame = {
  id: string;
  challengeId: string;
  title: string;
  numberOfRounds: number;
  step: "INTRO" | "GUESSING" | "STATS";
  intro?: Intro;
  guessing?: Guessing;
  stats?: Stats;
};

type Intro = {
  timeStarted: Date;
};

type Guessing = {
  currentRound: {
    number: number;
    songId: string;
    timeStarted: Date;
    guessedAt: Date | null;
    tries: number;
  } | null;
  pastRounds: {
    number: number;
    songId: string;
    timeUntilGuessed: number | "TIMER_EXPIRED";
    tries: number;
  }[];
};

type Stats = {
  totalPoints: number;
  percentageGuessedCorrect: number;
  averageTimeToGuessInMilliseconds: number;
  guessesStats: {
    timeUntilGuessed: number | "TIMER_EXPIRED";
    tries: number;
    points: number;
  }[];
};

const activeSingePlayerGames: SinglePlayerGame[] = [];

export function createSinglePlayerGame(challengeId: string) {
  const challenge = getChallengeById(challengeId);

  if (!challenge) {
    throw new Error("Challenge not found.");
  }

  const newGame: SinglePlayerGame = {
    id: uuidv4(),
    challengeId: challenge.id,
    step: "INTRO",
    title: challenge.title,
    numberOfRounds: NUMBER_OF_ROUNDS,
    intro: {
      timeStarted: new Date(),
    },
  };

  activeSingePlayerGames.push(newGame);

  return newGame;
}

export function initializeNextStep(game: SinglePlayerGame) {
  console.log(game);
  switch (game.step) {
    case "INTRO": {
      game.step = "GUESSING";
      game.guessing = {
        currentRound: null,
        pastRounds: [],
      };
      break;
    }
    case "GUESSING": {
      game.step = "STATS";
      calculateAndSetStats(game);
      break;
    }
    default:
      alert("Not Implemented");
  }
}

export function createNextGuessingRound(game: SinglePlayerGame) {
  const { guessing } = game;

  if (!guessing) {
    throw new Error("Game not in GUESSING Step!");
  }

  const { currentRound } = guessing;

  let nextRoundNumber = 0;
  if (currentRound !== null) {
    // Save last round
    const timeUntilGuessed: number | "TIMER_EXPIRED" = currentRound.guessedAt
      ? Math.round(
          currentRound.guessedAt.getTime() - currentRound.timeStarted.getTime(),
        ) / 1000
      : "TIMER_EXPIRED";

    const pastRound = {
      number: currentRound.number,
      songId: currentRound.songId,
      timeUntilGuessed: timeUntilGuessed,
      tries: currentRound.tries,
    };
    game.guessing?.pastRounds.push(pastRound);
    nextRoundNumber = pastRound.number + 1;
  }

  // Create new round
  if (nextRoundNumber >= NUMBER_OF_ROUNDS) {
    return "ALL_ROUNDS_FINISHED";
  }

  guessing.currentRound = {
    number: nextRoundNumber,
    songId: getRandomSongFromChallenge({
      id: game.challengeId,
      excludeSongsIds: guessing.pastRounds.map((pastRound) => pastRound.songId),
    }),
    timeStarted: new Date(),
    guessedAt: null,
    tries: 0,
  };

  return { ...game };
}

export function makeGuessAndReturnIsCorrect({
  game,
  guessedSongTitle,
}: {
  game: SinglePlayerGame;
  guessedSongTitle: string;
}) {
  if (game.guessing === undefined || game.guessing.currentRound === null) {
    throw new Error("Game not in GUESSING Step or no currentRound!");
  }

  const song = getSongById(game.guessing.currentRound.songId);

  if (!song) {
    throw new Error("Song not found!");
  }

  game.guessing.currentRound.tries += 1;
  if (guessedSongTitle === song.title) {
    game.guessing.currentRound.guessedAt = new Date();
    return { game, isCorrect: true };
  } else {
    return { game, isCorrect: false };
  }
}

function calculateAndSetStats(game: SinglePlayerGame): void {
  if (!game.guessing) {
    throw new Error(
      "The guessing attribute must be defined to calculate stats.",
    );
  }

  const { pastRounds } = game.guessing;

  if (!pastRounds || pastRounds.length === 0) {
    throw new Error("No past rounds available to calculate stats.");
  }

  let totalPoints = 0;
  let totalTimeToGuess = 0;
  let correctGuesses = 0;

  const guessesStats = pastRounds.map((round) => {
    const { timeUntilGuessed, tries } = round;
    let points = 0;

    if (timeUntilGuessed !== "TIMER_EXPIRED") {
      points = Math.max(1000 - timeUntilGuessed, 0); // Example points calculation based on time
      totalTimeToGuess += timeUntilGuessed;
      correctGuesses++;
    }

    totalPoints += points;
    return {
      timeUntilGuessed,
      tries,
      points,
    };
  });

  const averageTimeToGuessInMilliseconds =
    correctGuesses > 0 ? totalTimeToGuess / correctGuesses : 0;

  const percentageGuessedCorrect = (correctGuesses / pastRounds.length) * 100;

  game.stats = {
    totalPoints,
    percentageGuessedCorrect,
    averageTimeToGuessInMilliseconds,
    guessesStats,
  };
}
