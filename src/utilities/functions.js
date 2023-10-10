import {
  EUROPEAN_AQI_POLLUTION_LEVEL_SCALE,
  UV_INDEX_RISK_SCALE,
  WEEK_DAYS
} from '../constants/textNodes.js';


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


export function getEuropeanAQIPollutionLevel(europeanAQI) {
  let index;

  if (europeanAQI < 51) {
    index = 0;
  }
  else if (europeanAQI < 101) {
    index = 1;
  }
  else if (europeanAQI < 151) {
    index = 2;
  }
  else if (europeanAQI < 201) {
    index = 3;
  }
  else if (europeanAQI < 301) {
    index = 4;
  }
  else {
    index = 5;
  }

  return capitalizeFirstLetter(EUROPEAN_AQI_POLLUTION_LEVEL_SCALE[index]);
}


export function getUVIndexRisk(UVIndex) {
  let index;

  if (UVIndex < 3) {
    index = 0;
  }
  else if (UVIndex < 6) {
    index = 1;
  }
  else if (UVIndex < 8) {
    index = 2;
  }
  else if (UVIndex < 11) {
    index = 3;
  }
  else {
    index = 4;
  }

  return capitalizeFirstLetter(UV_INDEX_RISK_SCALE[index]);
}


export function reduceArrayByDivider(array, divider) {
  return array.filter((e, index) => index % divider === 0);
}
