import type { ChangeEvent } from "react";
import "../assets/Input.css";

interface Props {
  tag: string;
  onChange: (tag: string) => void;
}

const Filter = ({ tag, onChange }: Props) => {
  return (
    <input
      type="text"
      placeholder="Filter by tag..."
      value={tag}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      className="input-field"
    />
  );
};

export default Filter;