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
    <Box sx={{ padding: 2 }}>
      <Link href={href}>
        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: "bold",
            marginBottom: 2,
          }}
        >
          {title}
        </Typography>
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
