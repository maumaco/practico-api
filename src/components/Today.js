export default function Today({ title, mainAxisValues, crossAxisValues }) {
  return (
    <article>
      <h3>{title}</h3>
      <ul>
        {mainAxisValues.map((mainAxisValue, i) =>
          <li key={i}>
            <span>{mainAxisValue}</span>
            <span> | </span>
            <span>{crossAxisValues[i]}</span>
          </li>
        )}
      </ul>
    </article>
  );
}
