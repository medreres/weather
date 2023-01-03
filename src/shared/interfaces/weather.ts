export type Daily = {
  temperature_2m_min: number[];
  temperature_2m_max: number[];
  time: string[];
  weathercode: number[];
};

export type hourly = {
  temperature_2m: number[];
  time: string[];
};

export type weather = {
  daily: Daily;
  current_weather: currentWeather;
  hourly: hourly;
};

export type currentWeather = {
  temperature: number;
  time: string;
  weathercode: number;
};
