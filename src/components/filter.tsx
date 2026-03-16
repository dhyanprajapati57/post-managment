interface Props {
  tag: string;
  onChange: (tag: string) => void;
}

const tags = [
  "history",
  "crime",
  "magical",
  "mystery",
  "classic",
  "american",
  "english",
  "fiction"
];

const Filter = ({ tag, onChange }: Props) => {
  return (
    <select
      value={tag}
      onChange={(e) => onChange(e.target.value)}
      className="h-10 min-w-40 px-3 rounded-md border border-gray-300  bg-gray-100 text-sm cursor-pointer focus:outline-none focus:border-sky-400"
    >
      <option value="">Filter by tag</option>

      {tags.map((t) => (
        <option key={t} value={t}>
          {t}
        </option>
      ))}
    </select>
  );
};

export default Filter;