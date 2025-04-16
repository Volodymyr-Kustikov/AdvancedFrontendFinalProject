export interface Month {
  name: string;
  days: number;
}

export interface Post {
  title: string;
  note: string;
  date: string;
}

export interface DayInfo {
  day: number;
  month: string;
  dayOfWeek: string;
}