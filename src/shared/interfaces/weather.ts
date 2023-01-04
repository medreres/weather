export type daily = {
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
  daily: daily;
  current_weather: currentWeather;
  hourly: hourly;
};

export type currentWeather = {
  temperature: number;
  time: string;
  weathercode: number;
};

export type city = {
  label: string;
  value: {
    description: string;
    place_id: string
    lat: number;
    lng : number;
  };
};
