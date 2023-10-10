export default function HighlightedItem({ title, children }) {
  return (
    <article>
      <h4>{title}</h4>
      {children}
    </article>
  );
}
