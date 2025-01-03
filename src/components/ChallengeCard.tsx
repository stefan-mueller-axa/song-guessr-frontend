import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import Link from "next/link";

export type FeaturedCardProps = {
  id: string;
  title: string;
};

export default function ChallengeCard({ id, title }: FeaturedCardProps) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
        transition: "transform 0.3s",
        "&:hover": { transform: "scale(1.05)" },
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={`/challenges/${id}.jpg`}
        alt={title}
      />
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
          {title}
        </Typography>
        <Link href={`/home/challenges/${id}`} passHref>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#0D47A1",
              color: "white",
              fontWeight: "bold",
              marginTop: 2,
              ":hover": { backgroundColor: "#1565C0" },
            }}
            fullWidth
          >
            Explore
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
