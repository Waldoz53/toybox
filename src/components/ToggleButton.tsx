'use client';

import '@/styles/components/toggleButton.css';

type Props = {
  label: string;
  name: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

export default function ToggleButton({ label, name, checked, onChange }: Props) {
  return (
    <label className="toggle-wrapper">
      <span>{label}</span>
      <div className="toggle-container">
        <input
          type="checkbox"
          name={name}
          className="toggle-input"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="toggle-slider" />
      </div>
    </label>
  );
}
