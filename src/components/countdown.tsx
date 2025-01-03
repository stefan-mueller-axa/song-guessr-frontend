import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

type CountdownProps = {
  duration: number; // Countdown duration in seconds
  onComplete: () => void; // Callback when countdown is complete
};

export default function Countdown({ duration, onComplete }: CountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState<number>(duration);
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (!hasCompleted) {
      const interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            if (!hasCompleted) {
              setHasCompleted(true); // Ensure onComplete is called only once
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval); // Cleanup on unmount
    } else {
      onComplete();
    }
  }, [onComplete, hasCompleted]);

  return (
    <Typography
      sx={{
        mt: 2,
        fontSize: "2rem",
        color: timeRemaining === 0 ? "red" : "#0D47A1",
      }}
    >
      {timeRemaining}
    </Typography>
  );
}
