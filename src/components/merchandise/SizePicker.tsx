import { SIZES } from '../../data/merchandise';

export function SizePicker({ value, onChange }: { value: string; onChange: (size: string) => void }) {
  return (
    <div className="field">
      <label>Size</label>
      <div className="size-picker">
        {SIZES.map((s) => (
          <label key={s} className={`chip${value === s ? ' selected' : ''}`}>
            <input type="radio" name="size" value={s} checked={value === s} onChange={() => onChange(s)} required />
            {s}
          </label>
        ))}
      </div>
    </div>
  );
}
