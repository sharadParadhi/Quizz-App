// File: src/components/Timer.tsx
import React, { useEffect, useState } from 'react';

interface Props {
  duration: number; // seconds
  onTimeUp: () => void;
  onTick?: (remaining: number) => void;
}

const Timer: React.FC<Props> = ({ duration, onTimeUp, onTick }) => {
  const [timeLeft, setTimeLeft] = useState<number>(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (duration <= 0) return;

    let remaining = duration;
    setTimeLeft(remaining);

    const id = setInterval(() => {
      remaining -= 1;
      setTimeLeft(remaining);
      if (onTick) onTick(remaining);

      if (remaining <= 0) {
        clearInterval(id);
        onTimeUp();
      }
    }, 1000);

    return () => clearInterval(id);
  }, [duration]);

  const format = (s: number) => {
    const mm = Math.floor(s / 60)
      .toString()
      .padStart(2, '0');
    const ss = (s % 60).toString().padStart(2, '0');
    return `${mm}:${ss}`;
  };

  return (
    <div className="font-mono text-lg text-red-600 bg-white/20 px-3 py-1 rounded-xl shadow-inner">
      ⏱ {format(Math.max(0, timeLeft))}
    </div>
  );
};

export default Timer;
