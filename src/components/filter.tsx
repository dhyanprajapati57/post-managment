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
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Filter;    