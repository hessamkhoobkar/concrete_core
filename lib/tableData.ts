export function caseId(id: number): string {
  return `EV-00${id + 1227}`;
}

const DateOptions: Intl.DateTimeFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};

export function DateFormater(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", DateOptions);
}
