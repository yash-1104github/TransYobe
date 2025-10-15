import { useState, useEffect } from "react";

export default function GeneratingMessage()  {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 5 ? prev + "." : ""));
    }, 500); 
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="font-medium  text-muted-foreground">
      Generating <span className="font-bold">{dots}</span>
    </span>
  );
};
