"use client";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";

import { redirect, useParams } from "next/navigation";
import { getChallengeById } from "@/service/challenge-service";

export default function ChallengePage() {
  const { id } = useParams();

  const challenge = getChallengeById(id as string);

  if (!challenge) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#0D47A1",
          color: "white",
        }}
      >
        <Typography variant="h4">Challenge not found</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        backgroundColor: "#0D47A1",
        color: "white",
      }}
    >
      <Card
        sx={{
          maxWidth: 400, // Increased width
          width: "100%",
          borderRadius: 4,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
        }}
      >
        <Image
          src={`/challenges/${challenge.id}.jpg`}
          alt={challenge.title}
          width={400}
          height={400}
          style={{
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
        />
        <CardContent
          sx={{
            backgroundColor: "white",
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{ fontWeight: "bold", color: "#0D47A1", marginBottom: 2 }}
          >
            {challenge.title}
          </Typography>
          <Typography variant="body1" sx={{ color: "#555", marginBottom: 3 }}>
            {challenge.description}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 3, // Adjusted gap for spacing
              marginTop: 3,
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#0D47A1",
                color: "white",
                fontWeight: "bold",
                paddingX: 4,
                ":hover": {
                  backgroundColor: "#1565C0",
                },
              }}
              onClick={() => redirect(`/play/${id}`)}
            >
              Play Alone
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#0D47A1",
                color: "#0D47A1",
                fontWeight: "bold",
                paddingX: 4,
                ":hover": {
                  backgroundColor: "#1565C0",
                  color: "white",
                },
              }}
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
  );
}
