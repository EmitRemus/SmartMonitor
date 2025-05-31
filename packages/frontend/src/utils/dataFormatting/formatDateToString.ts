export function formatDateToString(value: Date): string {
  const day = value.getDate();
  const month = value.toLocaleString('default', { month: 'short' });
  const year = value.getFullYear();

  const hours = String(value.getHours()).padStart(2, '0');
  const minutes = String(value.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}, ${day} ${month} ${year}`;
}
