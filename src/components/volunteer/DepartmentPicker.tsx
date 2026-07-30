const DEPARTMENTS = [
  { emoji: '🎥', label: 'Media' },
  { emoji: '🎤', label: 'Worship' },
  { emoji: '🚪', label: 'Ushers' },
  { emoji: '🤝', label: 'Hospitality' },
  { emoji: '📣', label: 'Evangelism' },
  { emoji: '📸', label: 'Photography' },
];

export function DepartmentPicker({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (dept: string) => void;
}) {
  return (
    <div className="field">
      <label>Choose Your Team(s)</label>
      <div className="flex gap-8" style={{ flexWrap: 'wrap' }}>
        {DEPARTMENTS.map((d) => (
          <label key={d.label} className={`badge-dept${selected.includes(d.label) ? ' selected' : ''}`}>
            {d.emoji}{' '}
            <input
              type="checkbox"
              checked={selected.includes(d.label)}
              onChange={() => onToggle(d.label)}
            />
            {d.label}
          </label>
        ))}
      </div>
    </div>
  );
}
