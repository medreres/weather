export function getDay(date: string, lang?: string) {
  const time = new Date(date).toLocaleString(lang ? lang : "en", {
    weekday: "long",
  });

  return time;
}

export function normalizeTemp(value: number) {
  return Math.trunc(value);
}

interface normalizeDateInterface {
  (date: string, lang: string): string;
}

export const normalizeDate: normalizeDateInterface = (date: string, lang: string) => {
  return `${getDay(date, lang)}, ${new Date(date).getDate()}`;
};

export const getTime = (date: string, lang: string) => {
  return new Date(date).toLocaleString(lang, {
    hour: "2-digit",
    minute: "2-digit",
  });
};
