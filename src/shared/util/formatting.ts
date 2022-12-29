export function getDay(date: string) {
  const time = new Date(date).toLocaleString(navigator.language, {
    weekday: "long",
  });

  return time;
}

export function normalizeTemp(value: number) {
  return Math.trunc(value);
}
