import { Box, Typography } from '@mui/material'

export default function Home() {
  return (
    <Box>
      <Typography varian'h2'h2"}>Featured</Typography>
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
