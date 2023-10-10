import { WEEK_DAYS } from '../constants/textNodes.js';


export function capitalizeFirstLetter(text) {
  return text[0].toUpperCase() + text.slice(1);
}


export function formatTime(hours, minutes) {
  // h:mm
  return hours + ':' + (minutes < 10 ? '0' : '') + minutes;
}


export function getDayName(index) {
  return WEEK_DAYS[index];
}


export function getHourAndMinutes(date) {
  // h:mm
  return formatTime(date.getHours(), date.getMinutes());
}


export function reduceArrayByDivider(array, divider) {
  return array.filter((e, index) => index % divider === 0);
}
