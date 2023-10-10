export default function Today({ title, mainAxisValues, crossAxisValues }) {
  return (
    <article id="today">
      <h3>{title}</h3>
      <ul>
        {mainAxisValues.map((mainAxisValue, i) =>
          <li key={i}>
            <span className="main-axis-value">{mainAxisValue}</span>
            <span className="separator"> | </span>
            <span className="cross-axis-value">{crossAxisValues[i]}</span>
          </li>
        )}
      </ul>
    </article>
  );
}
