export type daily = {
  temperature_2m_min: number[];
  temperature_2m_max: number[];
  time: string[];
  weathercode: number[];
  sunrise: string[];
  sunset: string[]; // date in string
  precipitation_sum: number[]; // in mm
};

export type hourly = {
  apparent_temperature: number[];
  visibility: number[]; // in meters
  windspeed_10m: number[];
  temperature_2m: number[];
  time: string[];
};

export type weather = {
  daily: daily;
  current_weather: currentWeather;
  hourly: hourly;
  updatedAt: Date;
};

export type currentWeather = {
  temperature: number;
  time: string;
  weathercode: number;
};

export type city = {
  label: string;
  value: {
    place_id: string;
    lat: number;
    lng: number;
  };
};

export type chosenDay = {
  id: number;
  temperature: number;
  weathercode: number;
  sunrise: string;
  sunset: string;
  windspeed_10m: number;
  visibility: number;
  apparent_temperature: number;
  precipitation: number;
};
