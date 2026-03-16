import type { ChangeEvent } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: Props) => {
  return (
    <input
      type="text"
      placeholder="Search posts..."
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
     className="flex-1 min-w-55 h-10 px-3 rounded-md border border-gray-300 bg-gray-100 text-sm outline-none focus:border-sky-400 focus:bg-white"
    />
  );
};

export default SearchBar;
