export default function Temperature({ title, temperature, unit }) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{temperature} {unit}</p>
    </article>
  );
}
