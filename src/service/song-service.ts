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
