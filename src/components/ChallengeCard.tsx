import { Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

export type FeaturedCardProps = {
  id: string;
  title: string;
};

export default function ChallengeCard({ id, title }: FeaturedCardProps) {
  return (
    <Link href={`/home/challenges/${id}`}>
      <Card
        sx={{
          width: 200,
          margin: 1,
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Image
          src={`/challenges/${id}.jpg`}
          alt={title}
          height={200}
          width={200}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
