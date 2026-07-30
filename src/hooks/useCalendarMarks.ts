import { useState } from 'react';

export function useCalendarMarks(year: number, month: number) {
  const key = `cal-marked-${year}-${month}`;
  const [marked, setMarked] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(key) ?? '[]');
    } catch {
      return [];
    }
  });

  function toggle(day: number) {
    setMarked((prev) => {
      const next = prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day];
      localStorage.setItem(key, JSON.stringify(next));
      return next;
    });
  }

  return { marked, toggle };
}
