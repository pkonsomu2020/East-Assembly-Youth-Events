import { COLORS } from '../../data/merchandise';

export function ColorPicker({ value, onChange }: { value: string; onChange: (color: string) => void }) {
  return (
    <div className="field">
      <label>Color</label>
      <div className="color-picker">
        {COLORS.map((c) => (
          <label
            key={c.name}
            className={`color-dot${value === c.name ? ' selected' : ''}`}
            style={{ background: c.hex, ...(c.name === 'White' ? { border: '1.5px solid #ccc' } : {}) }}
            title={c.name}
          >
            <input type="radio" name="color" value={c.name} checked={value === c.name} onChange={() => onChange(c.name)} required />
          </label>
        ))}
      </div>
    </div>
  );
}
