export function capitalizeFirstLetter(text) {
  return text[0].toUpperCase() + text.slice(1);
}


export function formatTime(hours, minutes) {
  return hours + ':' + (minutes < 10 && '0') + minutes;
}
