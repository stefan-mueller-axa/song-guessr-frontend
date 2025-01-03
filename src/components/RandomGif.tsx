import Image from "next/image";

const availableGifs = [
  "alien",
  "cat",
  "cow",
  "dog",
  "kanye",
  "man",
  "shaggy",
  "skeleton",
  "spongebob",
  "yoda",
];

export const getRandomGifName = () =>
  availableGifs[Math.floor(Math.random() * availableGifs.length)];

export default function RandomGif({ gifName }: { gifName: string }) {
  console.log(gifName);
  return (
    <Image
      src={`/dancing-gifs/${gifName}.gif`}
      width={200}
      height={200}
      alt={"Dancing Object"}
    ></Image>
  );
}
