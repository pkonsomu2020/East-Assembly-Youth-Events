import { useState } from 'react';
import { CalendarMonth } from './CalendarMonth';
import { EVENTS } from '../../data/events';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function getEventDaysForMonth(year: number, month: number): Record<number, string> {
  const days: Record<number, string> = {};
  for (const event of EVENTS) {
    if (!event.dateISO) continue;
    const [y, m, d] = event.dateISO.split('-').map(Number);
    if (y === year && m - 1 === month) days[d] = event.name;
  }
  return days;
}

export function EventCalendar() {
  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  function shiftMonth(delta: number) {
    setCursor(({ year, month }) => {
      const total = year * 12 + month + delta;
      return { year: Math.floor(total / 12), month: ((total % 12) + 12) % 12 };
    });
  }

  const eventDays = getEventDaysForMonth(cursor.year, cursor.month);

  return (
    <div className="calendar">
      <div className="cal-head">
        <button type="button" className="cal-nav-btn" aria-label="Previous month" onClick={() => shiftMonth(-1)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#101C33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h3 style={{ margin: 0 }}>{MONTH_NAMES[cursor.month]} {cursor.year}</h3>
        <button type="button" className="cal-nav-btn" aria-label="Next month" onClick={() => shiftMonth(1)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 6L15 12L9 18" stroke="#101C33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <CalendarMonth year={cursor.year} month={cursor.month} eventDays={eventDays} />
      <div className="cal-legend">
        <span><span className="legend-dot" style={{ background: 'var(--sky)' }} /> Event date</span>
        <span><span className="legend-dot" style={{ background: 'var(--flame)' }} /> Marked by you</span>
      </div>
    </div>
  );
}
