import {
  faCloudBolt,
  faCloudShowersHeavy,
  faCloudSun,
  faSmog,
  faSnowflake,
  faSun,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

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
      return "Clear sky";

    case 1:
    case 2:
    case 3:
      return "Mainly clear, partly cloudy, and overcast";

    case 45:
    case 48:
      return "Fog and depositing rime fog";

    case 51:
    case 53:
    case 55:
      return "Drizzle: Light, moderate, and dense intensity";

    case 56:
    case 57:
      return "Freezing Drizzle: Light and dense intensity";

    case 61:
    case 63:
    case 65:
      return "Rain: Slight, moderate and heavy intensity";

    case 66:
    case 67:
      return "Freezing Rain: Light and heavy intensity";

    case 71:
    case 73:
    case 75:
      return "Snow fall: Slight, moderate, and heavy intensity";

    case 77:
      return "Snow grains";

    case 80:
    case 81:
    case 82:
      return "Rain showers: Slight, moderate, and violent";

    case 85:
    case 86:
      return "Snow showers slight and heavy";

    case 95:
      return "Thunderstorm: Slight or moderate";

    case 96:
    case 99:
      return "Thunderstorm with slight and heavy hail";

    default:
      return "not defined";
  }
}
