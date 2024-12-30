import { Box, Typography } from '@mui/material'

export default function Home() {
  return (
    <Box>
      <Typography varian'h2'h2"}>Featured</Typography>
      <FeaturedChallenges
        titl'Themes'es"}
        hre'home/challenges/themes'es"}
        featuredCards={getFeaturedChallenges().theme}
      />
      <FeaturedChallenges
        titl'Artists'ts"}
        hre'home/challenges/artists'ts"}
        featuredCards={getFeaturedChallenges().artist}
      />
    </Box>
  );
}
