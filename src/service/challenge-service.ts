export type Challenge = {
  id: string;
  title: string;
  type: "Theme" | "Artist";
  description: string;
  availableSongs: string[];
  featured: boolean;
};

const challenges: Challenge[] = [
  {
    id: "666cbed9-88f3-4fda-8c64-0b08cfa11233",
    title: "00s Hits",
    type: "Theme",
    description:
      'Step back into the unforgettable era of flip phones, MySpace, and iconic pop anthems! The "00s Hits" challenge is your ticket to reliving the biggest chart-toppers and hidden gems of the 2000s. From soulful ballads to dancefloor bangers, test your knowledge of the songs that defined a decade. Can you name them all? Play alone to prove you\'re the ultimate 00s music expert, or challenge your friends and settle who rules the playlist once and for all! 🎶✨',
    availableSongs: [
      "0a34e782-2528-4fee-bbe1-a4b88d6f781a",
      "8e57e42e-96ae-4cbc-aaa7-a32d1407661e",
      "1fabec50-d08f-412b-b4fb-a9d4d830b591",
    ],
    featured: true,
  },
];

export function getChallenges() {
  return challenges;
}

export function getChallengeById(id: string) {
  const foundChallenge = challenges.filter((challenge) => challenge.id === id);
  if (foundChallenge.length > 0) {
    return foundChallenge[0];
  } else {
    return null;
  }
}

export function getFeaturedChallenges() {
  const featuredChallenges = challenges.filter(
    (challenge) => challenge.featured,
  );

  return {
    theme: featuredChallenges.filter((challenge) => challenge.type === "Theme"),
    artist: featuredChallenges.filter(
      (challenge) => challenge.type === "Artist",
    ),
  };
}

export function getRandomSongFromChallenge({
  id,
  excludeSongsIds,
}: {
  id: string;
  excludeSongsIds: string[];
}) {
  const challenge = getChallengeById(id);
  if (!challenge) {
    throw new Error("Challenge not found.");
  }

  const filteredSongs = challenge.availableSongs.filter(
    (song) => !excludeSongsIds.includes(song),
  );

  if (filteredSongs.length === 0) {
    throw new Error("No songs available after exclusions.");
  }

  const randomIndex = Math.floor(Math.random() * filteredSongs.length);
  return filteredSongs[randomIndex];
}
