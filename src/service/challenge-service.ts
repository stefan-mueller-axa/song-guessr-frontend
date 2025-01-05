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
      'Step back into the unforgettable era of flip phones, MySpace, and iconic pop anthems! The "00s Hits" challenge is your ticket to reliving the biggest chart-toppers and hidden gems of the 2000s. Can you name them all? 🎶✨',
    availableSongs: [
      "0a34e782-2528-4fee-bbe1-a4b88d6f781a",
      "8e57e42e-96ae-4cbc-aaa7-a32d1407661e",
      "1fabec50-d08f-412b-b4fb-a9d4d830b591",
      "c19be42d-75c8-45c6-9b5a-d19f5b5f6b6b",
      "fb58d8a7-f7b9-4a10-8e90-df8912067e17",
      "ff839348-dc82-4c15-bdaf-f874963c620e",
      "bf86ebf2-51d9-4510-8d5d-48a7df554021",
      "1dfa616f-09b6-4c01-b353-32bcbcc30eea",
      "bef1fa3c-08e2-402a-8b25-e8335a09f6d5",
      "b316d3ca-7164-498c-a2e3-70635b2825f0",
    ],
    featured: true,
  },
  {
    id: "d2e4bf68-8f25-4b27-9d3d-68cb4c68e7b3",
    title: "Classic Rock",
    type: "Theme",
    description:
      'Turn up the volume and channel your inner rockstar! The "Classic Rock" challenge features legendary guitar riffs, powerful ballads, and timeless tracks from the golden age of rock. Are you ready to rock? 🎸🔥',
    availableSongs: [
      "f834e782-1234-4fcb-bbe1-a4b88d6f123a",
      "0a45e12f-96ae-4cbc-aaa7-a32d1409876b",
      "1fabc999-d08f-412b-b4fb-a9d4d987c876",
    ],
    featured: true,
  },
  {
    id: "f71a4678-4eb1-45f7-8a12-ef7a3b6b45b8",
    title: "One-Hit Wonders",
    type: "Theme",
    description:
      "Celebrate the fleeting but unforgettable hits that dominated the charts once and left a mark forever. Can you identify these iconic one-hit wonders? 🌟🎶",
    availableSongs: [
      "a12d7865-4528-4fee-bbe1-a5c99d2fbc45",
      "b3d4e42f-7645-4cbc-aaa7-c44d1409877c",
      "c8def450-d08f-412b-b4fb-d999d830123a",
    ],
    featured: true,
  },
  {
    id: "874cdef6-99e3-4fa8-aeb4-1f4d8309e76c",
    title: "90s Nostalgia",
    type: "Theme",
    description:
      "Relive the magic of grunge, boy bands, and the best dance tracks of the 90s. This challenge will transport you back to the golden age of MTV and Tamagotchis! 🎤💿",
    availableSongs: [
      "5ab4e782-3628-4fee-bbe1-a8c99d6f782b",
      "9e65f32e-98ae-4cbc-aaa7-b33d1409865f",
      "2fabc345-d08f-412b-b4fb-b6d4d850987c",
    ],
    featured: true,
  },
  {
    id: "c19be42d-75c8-45c6-9b5a-d19f5b5f6b6b",
    title: "Top Hits of 2020",
    type: "Theme",
    description:
      "The year 2020 brought its own unforgettable soundtracks. From viral TikTok hits to chart-topping anthems, see if you can guess the biggest songs of this unique year. 🎧🌟",
    availableSongs: [
      "7abc1234-9628-4fee-bbe1-b3c99d6f345f",
      "4e57f42e-76ae-4cbc-aaa7-c44d1408765d",
      "3fabd456-d08f-412b-b4fb-b9d4d830987b",
    ],
    featured: true,
  },
  {
    id: "3320ad7b-4599-4cfc-93ad-25c8a14dcd08",
    title: "Taylor Swift",
    type: "Artist",
    description:
      "The year 2020 brought its own unforgettable soundtracks. From viral TikTok hits to chart-topping anthems, see if you can guess the biggest songs of this unique year. 🎧🌟",
    availableSongs: [
      "7abc1234-9628-4fee-bbe1-b3c99d6f345f",
      "4e57f42e-76ae-4cbc-aaa7-c44d1408765d",
      "3fabd456-d08f-412b-b4fb-b9d4d830987b",
    ],
    featured: true,
  },
  {
    id: "46edcc99-be7e-4454-916f-628d7c0e6f76",
    title: "Kanye West",
    type: "Artist",
    description:
      "The year 2020 brought its own unforgettable soundtracks. From viral TikTok hits to chart-topping anthems, see if you can guess the biggest songs of this unique year. 🎧🌟",
    availableSongs: [
      "7abc1234-9628-4fee-bbe1-b3c99d6f345f",
      "4e57f42e-76ae-4cbc-aaa7-c44d1408765d",
      "3fabd456-d08f-412b-b4fb-b9d4d830987b",
    ],
    featured: true,
  },
];

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
