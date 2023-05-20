"use client";

import { Button, useAlert } from "lib";

export default function Home() {
  const alert = useAlert();

  const handleClick = () =>
    alert.error("Time's up, dummy", {
      icon: "🧨",
      duration: 1500,
    });

  return (
    <main>
      <Button type="button" onClick={handleClick}>
        Show Alert
      </Button>
    </main>
  );
}
