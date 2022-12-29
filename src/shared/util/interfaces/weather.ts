export type Daily = {
  temperature_2m_min: number[];
  temperature_2m_max: number[];
  time: string[];
  weathercode: number[];
};

export type Hourly = {
  temperature_2m: number[];
  time: string[];
};

export type Weather = {
  daily: Daily;
  current_weather: CurrentWeather;
  hourly: Hourly;
};

export type CurrentWeather = {
  temperature: number;
  time: string;
  weathercode: number;
};
