import { useCountdown } from '../../hooks/useCountdown';

export function CountdownTimer({ targetDate }: { targetDate: string }) {
  const { days, hours, minutes, seconds, reached } = useCountdown(targetDate);

  if (reached) {
    return <p className="countdown-reached">Camp Ignite 2026 is here!</p>;
  }

  const units = [
    { value: days, label: 'Days' },
    { value: hours, label: 'Hours' },
    { value: minutes, label: 'Min' },
    { value: seconds, label: 'Sec' },
  ];

  return (
    <div className="countdown">
      {units.map((unit) => (
        <div key={unit.label} className="countdown-box">
          <span className="countdown-value">{unit.value}</span>
          <span className="countdown-label">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
