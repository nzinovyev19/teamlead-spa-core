export function formatDates(date: number, pattern: string): string {
  const times = new Date(date);
  switch (pattern) {
    case 'DD.MM.YYYY': {
      const day = times.getDate() > 9 ? times.getDate() : `0${times.getDate()}`;
      const month = times.getMonth() > 9 ? times.getMonth() : `0${times.getMonth()}`;
      const year = times.getFullYear();
      return `${day}.${month}.${year}`;
    }
    case 'DD.MM.YYYY hh:mm': {
      const day = times.getDate() > 9 ? times.getDate() : `0${times.getDate()}`;
      const month = times.getMonth() > 9 ? times.getMonth() : `0${times.getMonth()}`;
      const year = times.getFullYear();
      const hours = times.getHours() > 9 ? times.getHours() : `0${times.getHours()}`;
      const minutes = times.getMinutes() > 9 ? times.getMinutes() : `0${times.getMinutes()}`;
      return `${day}.${month}.${year} ${hours}:${minutes}`;
    }
    default: return '';
  }
}
