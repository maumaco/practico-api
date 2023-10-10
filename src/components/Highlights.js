export default function Highlights({ title, children }) {
  return (
    <article id="highlights">
      <h3>{title}</h3>
      {children}
    </article>
  );
}
