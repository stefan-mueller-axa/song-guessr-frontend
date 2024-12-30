"use client";
import ChallengeCard from "@/components/ChallengeCard";
import { Box, Container, Typography } from "@mui/material";
import React from "react";
import Link from "next/link";
import { Challenge } from "@/service/challenge-service";

export type FeaturedCardsSectionProps = {
  title: string;
  href: string;
  featuredCards: Challenge[];
};

export default function FeaturedChallenges({
  title,
  href,
  featuredCards,
}: FeaturedCardsSectionProps) {
  return (
    <Box sx={{ overflow: "hidden", padding: 2 }}>
      <Link href={href}>
        <Typography variant={"h5"}>{title}</Typography>
      </Link>
      <Container>
        {featuredCards.map((item, index) => (
          <Box key={index} sx={{ display: "inline-block" }}>
            <ChallengeCard id={item.id} title={item.title} />
          </Box>
        ))}
      </Container>
    </Box>
  );
}

export const sampleData = [
  { id: "1", title: "Card 1", image: "https://via.placeholder.com/200x140" },
  { id: "1", title: "Card 2", image: "https://via.placeholder.com/200x140" },
  { id: "1", title: "Card 3", image: "https://via.placeholder.com/200x140" },
  { id: "1", title: "Card 4", image: "https://via.placeholder.com/200x140" },
  { id: "1", title: "Card 5", image: "https://via.placeholder.com/200x140" },
];
