export default function Dial({ value, range }) {
  return (
    <p className="dial">
      <span>{value}</span>
      <span>/</span>
      <span>{range}</span></p>
  );
}
