import { Box, Typography } from "@mui/material";
import FeaturedChallenges from "@/components/FeaturedChallenges";
import { getFeaturedChallenges } from "@/service/challenge-service";

export default function Home() {
  return (
    <Box>
      <Typography variant={"h2"}>Featured</Typography>
      <FeaturedChallenges
        title={"Themes"}
        href={"home/challenges/themes"}
        featuredCards={getFeaturedChallenges().theme}
      />
      <FeaturedChallenges
        title={"Artists"}
        href={"home/challenges/artists"}
        featuredCards={getFeaturedChallenges().artist}
      />
    </Box>
  );
}
