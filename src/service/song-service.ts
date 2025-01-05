export type Song = {
  id: string;
  title: string;
  artist: string;
};

const songs: Song[] = [
  {
    id: "0a34e782-2528-4fee-bbe1-a4b88d6f781a",
    title: "Gold Digger",
    artist: "Kanye West",
  },
  {
    id: "8e57e42e-96ae-4cbc-aaa7-a32d1407661e",
    title: "Glamorous",
    artist: "Rihanna",
  },
  {
    id: "1fabec50-d08f-412b-b4fb-a9d4d830b591",
    title: "In Da Club",
    artist: "50 Cent",
  },
  {
    id: "c19be42d-75c8-45c6-9b5a-d19f5b5f6b6b",
    title: "Pokerface",
    artist: "Lady Gaga",
  },
  {
    id: "fb58d8a7-f7b9-4a10-8e90-df8912067e17",
    title: "Hey Ya!",
    artist: "OutKast",
  },
  {
    id: "ff839348-dc82-4c15-bdaf-f874963c620e",
    title: "Paper Planes",
    artist: "M.I.A",
  },
  {
    id: "bf86ebf2-51d9-4510-8d5d-48a7df554021",
    title: "Seven Nation Army",
    artist: "The White Stripes",
  },
  {
    id: "1dfa616f-09b6-4c01-b353-32bcbcc30eea",
    title: "Stan",
    artist: "Eminem",
  },
  {
    id: "bef1fa3c-08e2-402a-8b25-e8335a09f6d5",
    title: "Yellow",
    artist: "Coldplay",
  },
  {
    id: "b316d3ca-7164-498c-a2e3-70635b2825f0",
    title: "Stronger",
    artist: "Kanye West",
  },
];

export function getSongs() {
  return songs;
}

export function getSongById(id: string) {
  const foundSong = songs.filter((song) => song.id === id);
  if (foundSong.length > 0) {
    return foundSong[0];
  } else {
    throw new Error("Song not found!");
  }
}
