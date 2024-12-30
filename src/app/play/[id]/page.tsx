"use client";
import { useParams, useSearchParams } from "next/navigation";
import { getChallengeById } from "@/service/challenge-service";
import SinglePlayerGame from "@/components/SinglePlayerGame";

export default function Play() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const mode: "SINGLE_PLAYER" | "MULTI_PLAYER" =
    (searchParams.get("mode") as "SINGLE_PLAYER" | "MULTI_PLAYER") ??
    "SINGLE_PLAYER";

  const challenge = getChallengeById(id + "");

  if (!challenge) return <p>Challenge not found</p>;

  if (mode === "SINGLE_PLAYER") {
    return <SinglePlayerGame challengeId={challenge.id} />;
  } else if (mode === "MULTI_PLAYER") {
    return <p>Not implemented</p>;
  }
}
