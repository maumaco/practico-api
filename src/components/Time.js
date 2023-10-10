export default function Time({ title, date, time }) {
  return (
    <article id="time">
      <h3>{title}</h3>
      <p>{date}, {time}</p>
    </article>
  );
}
