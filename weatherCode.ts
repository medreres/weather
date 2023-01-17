import { TRANSLATION } from "./src/shared/lang/translation";
import {
  faCloudBolt,
  faCloudShowersHeavy,
  faCloudSun,
  faSmog,
  faSnowflake,
  faSun,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import sunny from './src/assets/icons/sun.png'

const WEATHER_CODE = new Map();

addMapping([0, 1], faSun);
addMapping([2], faCloudSun);
addMapping([3], faCloudSun);
addMapping([45, 48], faSmog);
addMapping(
  [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
  faCloudShowersHeavy
);
addMapping([71, 73, 75, 77, 85, 86], faSnowflake);
addMapping([95, 96, 99], faCloudBolt);

function addMapping(values: number[], icon: IconDefinition) {
  values.forEach((value) => {
    WEATHER_CODE.set(value, icon);
  });
}

export function getIcon(code: number): IconDefinition {
  return WEATHER_CODE.get(code);
}

export function getDescription(code: number): string {
  switch (code) {
    case 0:
      return TRANSLATION.CLEAR_SKY;

    case 1:
    case 2:
    case 3:
      return TRANSLATION.MAINLY_CLEAR;

    case 45:
    case 48:
      return TRANSLATION.FOG;

    case 51:
    case 53:
    case 55:
      return TRANSLATION.DRIZZLE;

    case 56:
    case 57:
      return TRANSLATION.FREEZING_DRIZZLE;

    case 61:
    case 63:
    case 65:
      return TRANSLATION.RAIN_SLIGHT;

    case 66:
    case 67:
      return TRANSLATION.RAIN_FREEZING;

    case 71:
    case 73:
    case 75:
      return TRANSLATION.SNOW_FALL;

    case 77:
      return TRANSLATION.SNOW_GRAINS;

    case 80:
    case 81:
    case 82:
      return TRANSLATION.RAIN_SHOWERS_SLIGHT;

    case 85:
    case 86:
      return TRANSLATION.SNOW_SHOWERS;

    case 95:
      return TRANSLATION.THUNDERSTORM;

    case 96:
    case 99:
      return TRANSLATION.THUNDERSTORM_HAIL;

    default:
      return "";
  }
}
