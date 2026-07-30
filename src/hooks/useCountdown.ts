import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  reached: boolean;
}

function computeTimeLeft(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    reached: diff <= 0,
  };
}

export function useCountdown(targetDate: string) {
  const target = new Date(targetDate).getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => computeTimeLeft(target));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(computeTimeLeft(target)), 1000);
    return () => clearInterval(timer);
  }, [target]);

  return timeLeft;
}
