export default function HighlightedValue({ value, unit }) {
  return (
    <p>
      <span className="value">{value}</span>
      {unit && ' '}
      {unit && <span className="unit">{unit}</span>}
    </p>
  );
}
