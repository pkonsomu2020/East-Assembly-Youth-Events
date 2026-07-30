import { CalendarMonth } from './CalendarMonth';

export function EventCalendar() {
  return (
    <div className="calendar" style={{ maxWidth: 420, margin: '0 auto' }}>
      <CalendarMonth year={2026} month={7} eventDays={{ 16: 'Youth Worship Experience' }} />
      <CalendarMonth year={2026} month={9} eventDays={{ 10: 'Youth Dinner' }} />
      <div className="cal-legend">
        <span><span className="legend-dot" style={{ background: 'var(--sky)' }} /> Event date</span>
        <span><span className="legend-dot" style={{ background: 'var(--flame)' }} /> Marked by you</span>
      </div>
    </div>
  );
}
