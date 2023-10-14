import {
  MAX_TEMPERATURE_HEADING,
  MIN_TEMPERATURE_HEADING
} from '../constants/textNodes.js';


export default function TemperatureRange({ title, max, maxUnit, min, minUnit }) {
  return (
    <article id="temperature-range">
      <h3>{title}</h3>

      <h4>{MAX_TEMPERATURE_HEADING}</h4>
      <p><span className="value">{max}</span> {maxUnit}</p>

      <h4>{MIN_TEMPERATURE_HEADING}</h4>
      <p><span className="value">{min}</span> {minUnit}</p>
    </article>
  );
}
