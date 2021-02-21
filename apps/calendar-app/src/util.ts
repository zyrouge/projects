export interface IEvent {
  title: string;
  description: string;
  addedOn: number;
  checked: boolean;
}

export interface IMonthEvents {
  events: Record<string, IEvent[]>;
}

export module Database {
  export const get = (key: string): IMonthEvents | null => {
    const data = localStorage.getItem(key);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch (err) {
      throw err;
    }
  };

  export const set = (key: string, value: IMonthEvents): void => {
    try {
      const data = JSON.stringify(value);
      return localStorage.setItem(key, data);
    } catch (err) {
      throw err;
    }
  };

  export const dm = (key: string): void => {
    return localStorage.removeItem(key);
  };
}

export const Constants = {
  days: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};
