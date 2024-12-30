"use client";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";

import { redirect, useParams } from "next/navigation";
import { getChallengeById } from "@/service/challenge-service";

export default function ChallengePage() {
  const { id } = useParams();

  const challenge = getChallengeById(id as string);

  console.log(challenge);

  if (!challenge) return <p>Challenge not found</p>;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: 2,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Card sx={{ maxWidth: 400, width: "100%", boxShadow: 3 }}>
          <Image
            src={`/challenges/${challenge.id}.jpg`}
            alt={"Test"}
            width={400}
            height={400}
          />
          <CardContent>
            <Typography variant="h4" component="div" gutterBottom>
              {challenge.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {challenge.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 3,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => redirect(`/play/${id}`)}
              >
                Play Alone
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() =>
                  alert(`Play with friends clicked for challenge ${id}`)
                }
              >
                Play with Friends
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
