export default function Time({ title, date, time }) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{date}, {time}</p>
    </article>
  );
}
