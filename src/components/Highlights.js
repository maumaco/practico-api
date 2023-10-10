export default function Highlights({ title, children }) {
  return (
    <article>
      <h3>{title}</h3>
      {children}
    </article>
  );
}
