export default function HighlightedValue({ value, unit }) {
  return (
    <p>{value}{unit && ' ' + unit}</p>
  );
}
