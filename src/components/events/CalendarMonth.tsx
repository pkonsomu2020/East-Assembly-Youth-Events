import { useCalendarMarks } from '../../hooks/useCalendarMarks';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export function CalendarMonth({
  year,
  month,
  eventDays,
}: {
  year: number;
  month: number;
  eventDays: Record<number, string>;
}) {
  const { marked, toggle } = useCalendarMarks(year, month);
  const first = new Date(year, month, 1);
  const startDow = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: React.ReactNode[] = [];
  for (let i = 0; i < startDow; i++) {
    cells.push(<div key={`empty-${i}`} className="cal-day empty" />);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const isEvent = Boolean(eventDays[d]);
    const isMarked = marked.includes(d);
    cells.push(
      <div
        key={d}
        className={`cal-day${isEvent ? ' event' : ''}${isMarked ? ' marked' : ''}`}
        onClick={isEvent ? () => toggle(d) : undefined}
      >
        {d}
        {isEvent && <span className="dot" />}
      </div>,
    );
  }

  return (
    <div style={{ marginBottom: 28 }}>
      <div className="cal-head">
        <h3 style={{ margin: 0 }}>{MONTH_NAMES[month]} {year}</h3>
      </div>
      <div className="cal-grid">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={i} className="cal-dow">{d}</div>
        ))}
        {cells}
      </div>
    </div>
  );
}
