export default function Temperature({ title, temperature, unit }) {
  return (
    <article id="temperature">
      <h3>{title}</h3>
      <p><span className="value">{temperature}</span> <span className="unit">{unit}</span></p>
    </article>
  );
}
